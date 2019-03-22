import * as React from 'react';

import './components.css';

export const Card: React.SFC<{}> = ({ children }) => (
  <div className="card">{children}</div>
);

export const List: React.SFC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="list">
    {items.map(i => (
      <li>{i}</li>
    ))}
  </ul>
);
