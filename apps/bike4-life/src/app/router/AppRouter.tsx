import React from 'react'
import Login from '../pages/login/Login';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from '../pages/sign-up/SignUp';

const AppRouter = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/routes',
      element: <p>Rutas</p>
    },
    {
      path: '/sign-up',
      element: <SignUp />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter;
