import * as React from 'react';

import './layout.css';

export const Column: React.SFC<{}> = ({ children }) => (
  <div className="layout-column">{children}</div>
);

export const Row: React.SFC<{}> = ({ children }) => (
  <div className="layout-row">{children}</div>
);

export const Scrollable: React.SFC<{}> = ({ children }) => (
  <div className="layout-scrollable">{children}</div>
);
