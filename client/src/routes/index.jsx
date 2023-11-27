import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Detail from '@pages/Detail';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
  { path: '/detail', name: 'Detail', component: Detail, layout: MainLayout, protected: false },
];

export default routes;
