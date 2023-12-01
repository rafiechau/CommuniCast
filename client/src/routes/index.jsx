import MainLayout from '@layouts/MainLayout';
import ForgotPassword from '@pages/ForgotPassword';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import Detail from '@pages/Detail';
import ResetPassword from '@pages/ResetPassword';
import Profile from '@pages/Profile';
import EditProfile from '@pages/EditProfile';
import MyPost from '@pages/MyPost';
import Message from '@pages/Message';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: true,
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
  {
    path: '/forgotPassword',
    name: 'Forgot Password',
    protected: false,
    component: ForgotPassword,
  },
  {
    path: '/:token/resetPassword',
    name: 'Reset Password',
    protected: false,
    component: ResetPassword,
  },
  {
    path: '/profile',
    name: 'Profile',
    protected: true,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/profile/edit',
    name: 'Edit Profile',
    protected: true,
    component: EditProfile,
    layout: MainLayout,
  },
  {
    path: '/myPost',
    name: 'My Posts',
    protected: true,
    component: MyPost,
    layout: MainLayout,
  },
  {
    path: '/message',
    name: 'chat',
    protected: true,
    component: Message,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
  { path: '/post/:postId', name: 'Detail', component: Detail, layout: MainLayout, protected: false },
];

export default routes;
