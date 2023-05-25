import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import CreateUser from './pages/CreateUser';
import CreateLoan from './pages/CreateLoan';
import FetchUser from './pages/FetchUser';
import FetchLoan from './pages/FetchLoan';
import ShareLoan from './pages/ShareLoan';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "create-user",
    element: <CreateUser />,
  },
  {
    path: "create-loan",
    element: <CreateLoan />,
  },
  {
    path: "fetch-user",
    element: <FetchUser />,
  },
  {
    path: "fetch-loan",
    element: <FetchLoan />,
  },
  {
    path: "share-loan",
    element: <ShareLoan />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
