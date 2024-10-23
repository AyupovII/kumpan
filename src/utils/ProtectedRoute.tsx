import React from 'react'
import {Navigate, Outlet,} from "react-router-dom"
import { store } from '../store/store';
import { observer } from 'mobx-react-lite';

const ProtectedRoute: React.FC = () => {
  const {isAuth} = store;
  return isAuth ? <Outlet /> : <Navigate to="/auth" />;
};

export default observer(ProtectedRoute);