import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Feed from '../views/Feed.vue'
import Users from '../views/Users.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Welcome from '../components/Welcome.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile/:id',
    name: 'Account',
    component: Account,
  },
  {
    path: '/Users',
    name: 'Users',
    component: Users
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
