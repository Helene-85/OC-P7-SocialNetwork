import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Feed from '../views/Feed.vue'
import Users from '../views/Users.vue'
import Header from '../components/Header.vue'
import Login from '../components/Login.vue'
import Message from '../components/Message.vue'
import NewMessage from '../components/NewMessage.vue'
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
    component: Account
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
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/NewMessage',
    name: 'NewMessage',
    component: NewMessage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/header',
    name: 'Header',
    component: Header
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
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
