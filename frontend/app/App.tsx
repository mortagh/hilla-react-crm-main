import React from 'react';
import {AppLayout, DrawerToggle} from 'react-vaadin-components';
import {NavLink, Outlet} from "react-router-dom";

function App() {

  return (
    <AppLayout>

      <header slot="navbar" className="flex gap-m items-center">
        <DrawerToggle />
        <h1 className="m-0 text-l">Hilla + React CRM</h1>
      </header>

      <nav slot="drawer">
        <ul className="list-none">
          <li><NavLink to="/">Contacts</NavLink></li>
          <li><NavLink to="/graphique">Graphique</NavLink></li>
          <li><NavLink to="/materiel">Matériel</NavLink></li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        </ul>
      </nav>

      <Outlet/>
      
    </AppLayout>
  );
}

export default App;
