import MainLayout from '@layouts/MainLayout';
import DetailPost from '@pages/DetailPost';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/post',
    name: 'PostDetail',
    protected: false,
    component: DetailPost,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
