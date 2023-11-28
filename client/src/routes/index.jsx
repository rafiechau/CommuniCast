import MainLayout from '@layouts/MainLayout';
import ForgotPassword from '@pages/ForgotPassword';
import DetailPost from '@pages/DetailPost';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import Detail from '@pages/Detail';
import ResetPassword from '@pages/ResetPassword';

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
