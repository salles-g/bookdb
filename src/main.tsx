import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Read, {
  loader as readLoader,
  action as readAction,
} from "./routes/read";
import EditRead, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";
import ReadsProvider from "./context/ReadsProvider";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={
        <ReadsProvider>
          <Root />
        </ReadsProvider>
      }
      errorElement={<ErrorPage />}
      loader={rootLoader}
      action={rootAction}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} loader={rootLoader} />
        <Route
          path="reads/:readId"
          element={<Read />}
          loader={readLoader}
          action={readAction}
        />
        <Route
          path="reads/:readId/edit"
          element={<EditRead />}
          loader={readLoader}
          action={editAction}
        />
        <Route path="reads/:readId/destroy" action={destroyAction} />
      </Route>
    </Route>,
  ])
);

window.$ = (selector: string) => document.querySelector(selector);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
