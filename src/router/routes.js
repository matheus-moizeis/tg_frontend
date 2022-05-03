
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'customer', name: 'Customer', component: () => import('pages/Customer.vue') },
      { path: 'ticket', name: 'Ticket', component: () => import('pages/Ticket.vue') },
      { path: 'employee', name: 'Employee', component: () => import('pages/Employee.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'Login', component: () => import('pages/LoginPage.vue') },
      { path: 'new', name: 'CreateUser', component: () => import('pages/CreateUser') }
    ]
  },
  {
    path: '/customer',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'createCustomer', name: 'CreateCustomer', component: () => import('pages/Customer/CreateCustomer.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
