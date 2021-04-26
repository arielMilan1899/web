import React from 'react';
import Gateway from "./views/gateways/details/Details";

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Gateways = React.lazy(() => import('./views/gateways/list/List'));
const GatewayCreate = React.lazy(() => import('./views/gateways/create/CreateContainer'));
const GatewayUpdate = React.lazy(() => import('./views/gateways/update/UpdateContanier'));

// routes path
export const GATEWAYS = '/gateways';
export const GATEWAYS_CREATE = '/gateways/create';
export const GATEWAYS_DETAIL = '/gateways/detail/:gateway';
export const GATEWAYS_UPDATE = '/gateways/update/:gateway';
export const GATEWAYS_REMOVE = '/gateways/remove/:gateway';

const routes = [
  {path: '/', exact: true, name: 'Home'},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  // gateways
  {path: GATEWAYS, exact: true, name: 'Gateways', component: Gateways, breadcrumb: 'Gateways'},
  {
    path: GATEWAYS_CREATE,
    exact: true,
    name: 'Create gateway',
    component: GatewayCreate,
  },
  {
    path: GATEWAYS_DETAIL,
    exact: true,
    name: 'Gateway Details',
    component: Gateway,
  },
  {
    path: GATEWAYS_UPDATE,
    exact: true,
    name: 'Update gateway',
    component: GatewayUpdate,
  },
  // {
  //   path: GATEWAYS_UPDATE,
  //   exact: true,
  //   name: 'Update category',
  //   component: GATEWAYS_REMOVE,
  // },
];

export default routes;
