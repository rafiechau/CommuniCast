import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import Detail from '@pages/Detail';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
  { path: '/detail', name: 'Detail', component: Detail, layout: MainLayout, protected: false },
];

export default routes;
