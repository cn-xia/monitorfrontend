import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CrawlerPanel from '@/pages/CrawlerPanel'
import Search from '@/pages/Search'
import NotFound from '@/pages/NotFound'
Vue.use(Router)

export default new Router({
  mode: 'history',  
  routes: [
    {
      path:'/',
      redirect:'/crawlerpanel'
    },
    {
      path: '/crawlerpanel',
      name: 'CrawlerPanel',
      component: CrawlerPanel
    },
    {
      path:'/search',
      name:'Search',
      component:Search
    },
    {
      path: '/404',
      component: NotFound,
      name: 'NotFound',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
