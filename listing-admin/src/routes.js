import Login from './views/Login.jsx'
import Category from './views/Category.jsx'
import Ads from './views/Ads'
import Configuration from './views/Configuration'
import Users from './views/Users'
import ResetPassword from './views/ForgotPassword'
import Dashboard from './views/Dashboard'
import SubCategory from './views/SubCategory'
import Zones from './views/Zone'
import Notification from './views/Notification'

var routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'ni ni-tv-2',
    component: Dashboard,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/category',
    name: 'Category',
    icon: 'ni ni-chart-pie-35',
    component: Category,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/sub-category',
    name: 'Sub Category',
    icon: 'ni ni-chart-bar-32',
    component: SubCategory,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/ads',
    name: 'Ads',
    icon: 'ni ni-shop',
    component: Ads,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'ni ni-single-02',
    component: Users,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/configuration',
    name: 'Configuration',
    icon: 'ni ni-settings',
    component: Configuration,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/zone',
    name: 'Zone',
    icon: 'ni ni-square-pin',
    component: Zones,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'ni ni-bell-55',
    component: Notification,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
    appearInSidebar: false
  },
  {
    path: '/reset',
    name: 'ResetPassword',
    icon: 'ni ni-key-25 text-info',
    component: ResetPassword,
    layout: '/auth',
    appearInSidebar: false
  }
]
export default routes
