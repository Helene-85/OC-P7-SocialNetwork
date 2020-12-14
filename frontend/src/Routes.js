import Home from './components/Home'
import Account from './components/Account'
import Users from './components/Users'
import Feed from './components/Feed'
import Message from './components/Message'
import Login from './components/Login'
import Signin from './components/Signin'
import Welcome from './components/Welcome.vue'

export default [
    {path: '/', component: Home},
    {path: '/Account', component: Account},
    {path: '/Users', component: Users},
    {path: '/feed', component: Feed},
    {path: '/message', component: Message},
    {path: '/login', component: Login},
    {path: '/signin', component: Signin},
    {path: '/welcome', component: Welcome}
]