import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app/App';
import './index.css';
import 'react-vaadin-components/dist/css/core.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Contacts from "./features/contacts/Contacts";
import Dashboard from "./features/dashboard/Dashboard";
import {store} from "Frontend/app/store";
import {Provider} from "react-redux";
import {initFromServer} from "Frontend/features/contacts/contactsSlice";
import ChartView from './features/chart/ChartView';

const container = document.getElementById('root');
const root = createRoot(container!);

store.dispatch(initFromServer());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route path="" element={<Contacts/>}/>
            <Route path="graphique" element={<ChartView/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
