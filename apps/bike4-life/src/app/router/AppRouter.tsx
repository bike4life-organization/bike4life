import React from 'react'
import Login from '../pages/login/Login';
import SignUp from '../pages/sign-up/SignUp';
import NebulaMap from '../components/nebula-map/NebulaMap';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


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
      element: <NebulaMap />
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
