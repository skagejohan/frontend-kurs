import * as express from 'express';
import * as users from './MOCK_DATA.json';

// General Lib
const chain = (...fns) => initialValue =>
  fns.reduce((prevRes, next) => next(prevRes), initialValue);
const map = fn => value => fn(value);
const lmap = fn => list => list.map(fn);
const maybe = (just, nothing) => maybeValue =>
  maybeValue != null ? just(maybeValue) : nothing();
const maybeWithDefault = (just, defaultValue) =>
  maybe(just, () => defaultValue);

const debug = x => {
  console.log('DEBUG', x);
  return x;
};

// Express Lib
const use = middleware => app => app.use(middleware);
const get = (path, fn) => app => app.get(path, fn);

const withParam = (param, fn) => (req, res) => fn(req.params[param])(req, res);
const send = value => (_, res) => res.send(value);
const notFound = send(404);
const start = port => app =>
  app.listen(port, () => console.log(`Api running on port ${port}`));

// Routes
const getRegisteredRoutes = path => app =>
  get(
    path,
    send(
      chain(
        a =>
          a._router.stack
            .filter(r => r.route && r.route.path)
            .map(r => r.route.path)
            .map(p => `<li><a href="${p}" />${p}</a></li>`)
            .join(''),
        paths => `           
          <span>Kurs-API</span>
          <ul>
          ${paths}
          </ul>          
        `
      )(app)
    )
  )(app);

const getRawStack = path => app => get(path, send(app._router.stack))(app);

const app = chain(
  use(express.json()),
  get(
    '/users',
    send(
      lmap(u => ({
        id: u.id,
        full_name: `${u.first_name} ${u.last_name}`,
        company: u.company
      }))(users)
    )
  ),
  get(
    '/users/:id',
    withParam(
      'id',
      chain(id => users.find(u => u.id == id), maybeWithDefault(send, notFound))
    )
  ),
  getRegisteredRoutes('/'),
  getRawStack('/raw'),
  get('*', notFound),
  start(3001)
);

app(express());
