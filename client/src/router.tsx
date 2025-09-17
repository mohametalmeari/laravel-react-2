import { createBrowserRouter } from "react-router";
import { NotFound } from "./views/NotFound";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { GuestLayout } from "./layouts/GuestLayout";
import { Signup } from "./views/Signup";
import { Signin } from "./views/Signin";
import { Home } from "./views/Home";
import { Categories } from "./views/Categories";
import { Products } from "./views/Products";
import { Product } from "./views/Product";
import { Category } from "./views/Category";
import { CategoryForm } from "./views/CategoryForm";
import { ProductForm } from "./views/ProductForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/categories", element: <Categories /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <Product /> },
      { path: "/products/new", element: <ProductForm /> },
      { path: "/products/:id/edit", element: <ProductForm /> },
      { path: "/categories/:id", element: <Category /> },
      { path: "/categories/new", element: <CategoryForm /> },
      { path: "/categories/:id/edit", element: <CategoryForm /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
