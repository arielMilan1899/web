import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const Offers = React.lazy(() => import('./views/offers/list/ListContainer'));
const Offer = React.lazy(() => import('./views/offers/details/DetailsContainer'));
const OfferCreate = React.lazy(() => import('./views/offers/create/CreateContainer'));
const OfferUpdate = React.lazy(() => import('./views/offers/update/UpdateContanier'));
const Categories = React.lazy(() => import('./views/categories/list/List'));
const Category = React.lazy(() => import('./views/categories/details/DetailsContainer'));
const CategoryCreate = React.lazy(() => import('./views/categories/create/CreateContainer'));
const CategoryUpdate = React.lazy(() => import('./views/categories/update/UpdateContanier'));
const Materials = React.lazy(() => import('./views/materials/list/List'));
const ContactInfo = React.lazy(() => import('./views/contactInfo/Details/DetailsContainer'));
const Messages = React.lazy(() => import('./views/messages/list/List'));
const Manufacturers = React.lazy(() => import('./views/manufacturers/list/List'));

// routes path
export const CATEGORIES = '/categories';
export const CATEGORY_CREATE = '/create';
export const CATEGORY_DETAIL = '/detail/:category';
export const CATEGORY_UPDATE = '/update/:category';

export const SUBCATEGORY_CREATE = '/create/:category';
export const SUBCATEGORY_DETAIL = '/detail/:category/:subcategory';
export const SUBCATEGORY_UPDATE = '/update/:category/:subcategory';

export const OFFERS = '/offers';
export const OFFERS_CREATE = '/offers/create';

export const OFFER_CREATE = '/create/:category/:subcategory';
export const OFFER_DETAIL = '/detail/:category/:subcategory/:offer';
export const OFFER_UPDATE = '/update/:category/:subcategory/:offer';

export const MATERIALS = '/materials';

export const MESSAGES = '/messages';

export const CONTACTS = '/contacts';

export const MANUFACTURERS = '/manufacturers';

const routes = [
  {path: '/', exact: true, name: 'Home'},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/theme', name: 'Theme', component: Colors, exact: true},
  {path: '/theme/colors', name: 'Colors', component: Colors},
  {path: '/theme/typography', name: 'Typography', component: Typography},
  {path: '/base', name: 'Base', component: Cards, exact: true},
  {path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs},
  {path: '/base/cards', name: 'Cards', component: Cards},
  {path: '/base/carousels', name: 'Carousel', component: Carousels},
  {path: '/base/collapses', name: 'Collapse', component: Collapses},
  {path: '/base/forms', name: 'Forms', component: BasicForms},
  {path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons},
  {path: '/base/list-groups', name: 'List Groups', component: ListGroups},
  {path: '/base/navbars', name: 'Navbars', component: Navbars},
  {path: '/base/navs', name: 'Navs', component: Navs},
  {path: '/base/paginations', name: 'Paginations', component: Paginations},
  {path: '/base/popovers', name: 'Popovers', component: Popovers},
  {path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar},
  {path: '/base/switches', name: 'Switches', component: Switches},
  {path: '/base/tables', name: 'Tables', component: Tables},
  {path: '/base/tabs', name: 'Tabs', component: Tabs},
  {path: '/base/tooltips', name: 'Tooltips', component: Tooltips},
  {path: '/buttons', name: 'Buttons', component: Buttons, exact: true},
  {path: '/buttons/buttons', name: 'Buttons', component: Buttons},
  {path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns},
  {path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups},
  {path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons},
  {path: '/charts', name: 'Charts', component: Charts},
  {path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons},
  {path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons},
  {path: '/icons/flags', name: 'Flags', component: Flags},
  {path: '/icons/brands', name: 'Brands', component: Brands},
  {path: '/notifications', name: 'Notifications', component: Alerts, exact: true},
  {path: '/notifications/alerts', name: 'Alerts', component: Alerts},
  {path: '/notifications/badges', name: 'Badges', component: Badges},
  {path: '/notifications/modals', name: 'Modals', component: Modals},
  {path: '/notifications/toaster', name: 'Toaster', component: Toaster},
  {path: '/widgets', name: 'Widgets', component: Widgets},
  {path: '/users', exact: true, name: 'Users', component: Users},
  {path: '/users/:id', exact: true, name: 'User Details', component: User},
  // subcategories
  {
    path: SUBCATEGORY_DETAIL,
    exact: true,
    name: 'Subcategory Details',
    component: Category,
    breadcrumb: 'Detalle de subcategoría'
  },
  {
    path: SUBCATEGORY_CREATE,
    exact: true,
    name: 'Create subcategory',
    component: CategoryCreate,
    breadcrumb: 'Crear subcategoría'
  },
  {
    path: SUBCATEGORY_UPDATE,
    exact: true,
    name: 'Update subcategory',
    component: CategoryUpdate,
    breadcrumb: 'Actualizar subcategoría'
  },
  // categories
  {path: CATEGORIES, exact: true, name: 'Categories', component: Categories, breadcrumb: 'Categorías'},
  {
    path: CATEGORY_CREATE,
    exact: true,
    name: 'Create category',
    component: CategoryCreate,
    breadcrumb: 'Crear categoría'
  },
  {
    path: CATEGORY_DETAIL,
    exact: true,
    name: 'Category Details',
    component: Category,
    breadcrumb: 'Detalle de categoría'
  },
  {
    path: CATEGORY_UPDATE,
    exact: true,
    name: 'Update category',
    component: CategoryUpdate,
    breadcrumb: 'Actualizar categoría'
  },
  // offers
  {path: OFFERS, exact: true, name: 'Offers', component: Offers, breadcrumb: 'Ofertas'},
  {
    path: OFFERS_CREATE,
    exact: true,
    name: 'Offers create',
    component: OfferCreate,
    breadcrumb: 'Crear oferta'
  },
  {
    path: OFFER_CREATE,
    exact: true,
    name: 'Offer create',
    component: OfferCreate,
    breadcrumb: 'Crear oferta'
  },
  {
    path: OFFER_DETAIL,
    exact: true,
    name: 'Offer details',
    component: Offer,
    breadcrumb: 'Detalle de oferta'
  },
  {
    path: OFFER_UPDATE,
    exact: true,
    name: 'Offer update',
    component: OfferUpdate,
    breadcrumb: 'Actualizar oferta'
  },
  // materials
  {
    path: MATERIALS,
    exact: true,
    name: 'Materials',
    component: Materials,
    breadcrumb: 'Materiales'
  },
  // contacts
  {
    path: CONTACTS,
    exact: true,
    name: 'Contacts',
    component: ContactInfo,
    breadcrumb: 'Contactos'
  },
  // messages
  {
    path: MESSAGES,
    exact: true,
    name: 'Messages',
    component: Messages,
    breadcrumb: 'Mensajes'
  },
  // manufacturers
  {
    path: MANUFACTURERS,
    exact: true,
    name: 'Manufacturers',
    component: Manufacturers,
    breadcrumb: 'Fabricantes'
  },
];

export default routes;
