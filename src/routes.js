import React from 'react';
import Gateway from "./views/gateways/details/Details";
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Gateways = React.lazy(() => import('./views/gateways/list/List'));

// routes path
export const GATEWAYS = '/gateways';
export const GATEWAYS_CREATE = '/create';
export const GATEWAYS_DETAIL = '/detail/:gateway';
export const GATEWAYS_UPDATE = '/update/:gateway';
export const GATEWAYS_REMOVE = '/remove/:gateway';

const routes = [
  {path: '/', exact: true, name: 'Home'},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  // gateways
  {path: GATEWAYS, exact: true, name: 'Gateways', component: Gateways, breadcrumb: 'Gateways'},
  // {
  //   path: GATEWAYS_CREATE,
  //   exact: true,
  //   name: 'Create category',
  //   component: CategoryCreate,
  // },
  {
    path: GATEWAYS_DETAIL,
    exact: true,
    name: 'Gateway Details',
    component: Gateway,
  },
  // {
  //   path: GATEWAYS_UPDATE,
  //   exact: true,
  //   name: 'Update category',
  //   component: CategoryUpdate,
  // },
  // {
  //   path: GATEWAYS_UPDATE,
  //   exact: true,
  //   name: 'Update category',
  //   component: GATEWAYS_REMOVE,
  // },
];

export default routes;
