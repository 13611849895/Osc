import Vue from 'vue'
import Router from 'vue-router'
import Create from '../components/Create/create.vue'
import Wallet from '../components/Wallet/wallet.vue'
// import Swap from '../components/Swap/swap.vue'
import Transaction from '../components/Transaction/transaction.vue'
import Loging from '../components/Create/login.vue'
import TransactionLogin from '../components/Transaction/Tlogin.vue'
import loginInner from '../components/loginInner.vue'
import Help from '../components/help.vue'
import Created from '../components/created.vue'
import Service from '../components/helpList/service1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/created'
    },
    {
      path: '/transactionlogin',
      name: 'transactionLogin',
      component: TransactionLogin
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/wallet/:id',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/login',
      name: 'login',
      component: Loging
    },
    {
      path: '/transaction/:id',
      name: 'transaction',
      component: Transaction
    },
    {
      path: '/inner/:id',
      name: 'inner',
      component: loginInner
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/created',
      name: 'created',
      component: Created
    },
    {
      path: '/service',
      name: 'service',
      component: Service
    },
  ]
})
