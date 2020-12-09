import Home from './components/Home'
import Account from './components/Account'
import Users from './components/Users'
import Feed from './components/Feed'
import Message from './components/Message.vue'
import Login from './components/Login.vue'
import Signin from './components/Signin.vue'

export default [
    {path: '/', component: Home},
    {path: '/Account', component: Account},
    {path: '/Users', component: Users},
    {path: '/feed', component: Feed},
    {path: '/message', component: Message},
    {path: '/login', component: Login},
    {path: '/signin', component: Signin},
]