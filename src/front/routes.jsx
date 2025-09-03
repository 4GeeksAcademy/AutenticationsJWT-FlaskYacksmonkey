import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { AuthPage } from "./pages/AuthPage";
import { Private } from "./pages/Private";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
  <Route index element={<Home />} />
  <Route path="single/:theId" element={<Single />} />
  <Route path="demo" element={<Demo />} />
  <Route path="auth" element={<AuthPage />} />
  <Route path="private" element={<Private />} />
</Route>

  )
);
