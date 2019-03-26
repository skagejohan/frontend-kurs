import React, { useState } from 'react';
import './App.css';
import { Card, List } from './Components';
import * as Layout from './Layout';
import { RemoteData, RemoteDataStatus } from './remoteData';
import { User, get } from './data';

const UserList: React.SFC<{
  users: RemoteData<User[]>;
  onLinkClick: (e: React.FormEvent<HTMLAnchorElement>) => void;
}> = ({ users, onLinkClick }) => {
  switch (users.status) {
    case RemoteDataStatus.Success:
      const items = users.data.map(u => (
        <a href={`/users/${u.id}`} onClick={onLinkClick}>
          <Layout.Column>
            <span>{u.full_name}</span>
            <span className="text-muted">{u.company}</span>
          </Layout.Column>
        </a>
      ));

      return <List items={items} />;

    case RemoteDataStatus.Loading:
      return <span>Loading</span>;

    case RemoteDataStatus.NotAsked:
      return <span>NotAsked</span>;

    default:
      return <span>Trouble</span>;
  }
};

const App: React.SFC<{}> = () => {
  const [currentRoute, setRoute] = useState(document.location.pathname);
  const [users, setUsers] = useState<RemoteData<User[]>>({
    status: RemoteDataStatus.NotAsked
  });
  const path = currentRoute.split('/');
  const selectedUser = path[1] === 'users' ? path[2] : null;

  const onLinkClick = (e: React.FormEvent<HTMLAnchorElement>) => {
    history.replaceState({}, 'User details', e.currentTarget.pathname);
    setRoute(e.currentTarget.pathname);
    e.preventDefault();
  };

  if (users.status === RemoteDataStatus.NotAsked) {
    get(u => {
      console.log('update', u);
      setUsers(u);
    });
  }

  return (
    <div className="app">
      <Layout.Row>
        <Card>
          <Layout.Column>
            <h1>Robotic Workforce Directory</h1>
          </Layout.Column>
          <Layout.Scrollable>
            <UserList users={users} onLinkClick={onLinkClick} />
          </Layout.Scrollable>
        </Card>
        {selectedUser && <Card>Selected user is: {selectedUser}</Card>}
      </Layout.Row>
    </div>
  );
};

export default App;
