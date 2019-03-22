import React, { useState } from 'react';
import './App.css';
import { Card, List } from './Components';
import * as Layout from './Layout';

const App: React.SFC<{}> = () => {
  const [currentRoute, setRoute] = useState(document.location.pathname);
  const path = currentRoute.split('/');
  const selectedUser = path[1] === 'users' ? path[2] : null;

  const onLinkClick = (e: React.FormEvent<HTMLAnchorElement>) => {
    history.replaceState({}, 'User details', e.currentTarget.pathname);
    setRoute(e.currentTarget.pathname);
    e.preventDefault();
  };

  return (
    <div className="app">
      <Layout.Row>
        <Card>
          <Layout.Column>
            <h1>Robotic Workforce Directory</h1>
          </Layout.Column>
          <List
            items={[
              <a href="/users/1" onClick={onLinkClick}>
                <Layout.Column>
                  <span>John Doe</span>
                  <span className="text-muted">ACME</span>
                </Layout.Column>
              </a>,
              <a href="/users/2" onClick={onLinkClick}>
                <Layout.Column>
                  <span>John Doe</span>
                  <span className="text-muted">ACME</span>
                </Layout.Column>
              </a>,
              <a href="/users/3" onClick={onLinkClick}>
                <Layout.Column>
                  <span>John Doe</span>
                  <span className="text-muted">ACME</span>
                </Layout.Column>
              </a>
            ]}
          />
        </Card>
        {selectedUser && <Card>Selected user is: {selectedUser}</Card>}
      </Layout.Row>
    </div>
  );
};

export default App;
