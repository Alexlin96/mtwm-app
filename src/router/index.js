import Vue from 'vue';
import Router from 'vue-router';
import index from '../components/index';
import search from '../components/search';
import meishi from '../components/meishi';
import shop from '../components/shop';
import shuiguo from '../components/shuiguo';
import meituanzhuansong from '../components/meituanzhuansong';
import kuaishijiancan from '../components/kuaishijiancan';
import breakfast from '../components/breakfast';
import tandianyinpin from '../components/tandianyinpin';
import jiachangcai from '../components/jiachangcai';
import order from '../components/order';
import my from '../components/my';
import login from '../components/common/login';
import list from '../components/list';
import logingo from '../components/common/login-go';
import loginregister from '../components/common/login-register';
import map from '../components/common/map';
import detail from "../components/detail";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },  
    {
      path: '/meishi',
      name: 'meishi',
      component: meishi
    },
    
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    
    {
      path: '/shuiguo',
      name: 'shuiguo',
      component: shuiguo
    },
    
    {
      path: '/meituanzhuansong',
      name: 'meituanzhuansong',
      component: meituanzhuansong
    },
    
    {
      path: '/kuaishijiancan',
      name: 'kuaishijiancan',
      component: kuaishijiancan
    },
    
    {
      path: '/breakfast',
      name: 'breakfast',
      component: breakfast
    },
    
    {
      path: '/tandianyinpin',
      name: 'tandianyinpin',
      component: tandianyinpin
    },
    
    {
      path: '/jiachangcai',
      name: 'jiachangcai',
      component: jiachangcai
    },

    {
      path:"/detail/:id",
      name:"kerwindetail",
      component:detail
    },
    
    {
      path: '/order',
      name: 'order',
      component: order
    },
    
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      children:[
        {
          path: 'login-go',
          name: 'login-go',
          component: logingo, 
        },
        {
          path: 'login-register',
          name: 'login-register',
          component: loginregister, 
        }
      ]
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
    	path:"*",
    	redirect:"/index"
    }
  ]
})
