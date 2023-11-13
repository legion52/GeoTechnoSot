import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux'
import { store } from './app/store';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PrimeReactProvider value={{ unstyled: false, }}>
      <App />
    </PrimeReactProvider>
  </Provider>
);
