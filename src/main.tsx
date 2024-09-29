import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "antd/dist/reset.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import App from "./App";
import RegistrationPage from "./pages/RegistrationPage";
import TasklistPage from "./pages/TasklistPage";
import { store, StoreContext } from "./store/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={App}>
      <Route index Component={HomePage} />
      <Route path="tasklist/:todolistId" Component={TasklistPage} />
      <Route path="register" Component={RegistrationPage} />
      <Route path="login" Component={LoginPage} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>
);
