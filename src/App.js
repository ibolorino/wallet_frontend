import React from "react";
import { NotificationContainer } from 'react-notifications';
import RoutesModule from './routes';

function App() {
  return (
    <React.Fragment>
      <NotificationContainer />      
        <RoutesModule />
    </React.Fragment>
  );
}

export default App;
