import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import regist from '../components/regist'
import checkphone from '../components/checkphone'
import home from '../components/home'
import fogetpassword from '../components/forgetPassword'
import handlefile from '../components/handlefile'
import recycle from '../components/recycle'

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes:[
    {
      path:'/',
      redirect:'/login',     //redirect定向到login页面
      meta:{
        requiresAuth: true,
      }

    },
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['../components/login.vue'],resolve),
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/checkphone',
      name: 'checkphone',
      component: checkphone
    },
    {
      path: '/fogetpassword',
      name: 'fogetpassword',
      component: fogetpassword
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: (resolve) => require(['../components/pdf.vue'],resolve)
    },
    {
      path: '/member',
      name: 'member',
      component: (resolve) => require(['../components/member.vue'],resolve)
    }
  ]
});
export default router

//动态加载路由
export const asyncRouterMap = [
  // user 用户
  {
    path: '/home',
    name: 'home',
    meta:{
      role:1,
      requiresAuth:true,
    },
    component: (resolve) => require(['../components/home.vue'],resolve),
    children:[
      {
        path: 'disk',
        name: 'disk',
        meta:{
          role:1
        },
        component: (resolve) => require(['../components/disk.vue'],resolve),
        children:[
          {
            path: 'handlefile',
            name: 'handlefile',
            meta:{
              role:1
            },
            component: (resolve) => require(['../components/handlefile.vue'],resolve)
          },
          {
            path: 'recycle',
            name: 'recycle',
            meta:{
              role:1
            },
            component: recycle,
          },
          {
            path: 'myshare',
            name: 'myshare',
            meta:{
              role:1
            },
            component: (resolve) => require(['../components/myshare.vue'],resolve)
          }
        ]
      },
      {
        path: 'share',
        name: 'share',
        meta: {
          role: 1
        },
        component: (resolve) => require(['../components/share.vue'], resolve),
      },
      {
        path: 'moreinfo',
        name: 'moreinfo',
        meta: {
          role: 1
        },
        component: (resolve) => require(['../components/moreinfo.vue'], resolve),
      },
      {
        path: 'notification',
        name: 'notification',
        meta: {
          role: 1
        },
        component: (resolve) => require(['../components/notification.vue'], resolve),
      },
      {
        path: 'sharecircle',
        name: 'sharecircle',
        meta: {
          role: 1
        },
        component: (resolve) => require(['../components/sharecircle.vue'], resolve),
      },
      {
        path: 'sharehome',
        name: 'sharehome',
        meta: {
          role: 1
        },
        component: (resolve) => require(['../components/sharehome.vue'], resolve),
        children:[
          {
            path: 'sharehomefile',
            name: 'sharehomefile',
            meta:{
              role:1
            },
            component: (resolve) => require(['../components/sharehomefile.vue'],resolve)
          },
          {
            path: 'sharehomemyconcern',
            name: 'sharehomemyconcern',
            meta:{
              role:1
            },
            component: (resolve) => require(['../components/sharehomemyconcern.vue'],resolve)
          },
          {
            path: 'shareconcernme',
            name: 'shareconcernme',
            meta:{
              role:1
            },
            component: (resolve) => require(['../components/shareconcernme.vue'],resolve)
          },
        ]
      }
    ]
  },
  //该路由组是用户的账号设置页面，打开新的浏览器窗口
  {
    path: '/accountset',
    name: 'accountset',
    redirect:'/accountset/setindex',
    meta:{
      role:1,
    },
    component: (resolve) => require(['../components/accountset.vue'],resolve),
    children:[
      {
        path:'setindex',
        name:'setindex',
        meta:{
          role:1,
        },
        component:(resolve) => require(['../components/setindex.vue'],resolve)
      },
      {
        path:'personaldata',
        name:'personaldata',
        meta:{
          role:1,
        },
        component:(resolve) => require(['../components/personaldata.vue'],resolve)
      },
      {
        path:'/modifyavatar',
        meta:{
          role:1,
          title:'修改头像'
        },
        component:(resolve) => require(['../components/modifyavatar.vue'],resolve)
      },
      {
        path:'/modifypassword',
        meta:{
          role:1,
          title:'修改密码'
        },
        component:(resolve) => require(['../components/modifypassword.vue'],resolve)
      },
    ]
  },

  {
    //该路由组是管理员的路由表
    path:'/adminhome',
    redirect:'/systemindex',
    component:resolve => require(['../components/admin/adminhome.vue'],resolve),
    meta:{
      title:'首页',
      role:0
    },
    children:[
      {
        path:'/systemindex',
        component: resolve => require(['../components/adminpage/systemindex.vue'],resolve),
        meta:{
          title:'系统首页',
          role:0
        }
      },
      {
        path:'/usertable',
        component:resolve => require(['../components/adminpage/usertable.vue'],resolve),
        meta:{
          title:'用户列表',
          role:0
        }
      },
      {
        path:'/diskmessage',
        component:resolve => require(['../components/adminpage/diskmessage.vue'],resolve),
        meta:{
          title:'磁盘详情',
          role:0
        }
      },
      {
        path:'/systemdisklog',
        component:resolve => require(['../components/adminpage/systemdisklog.vue'],resolve),
        meta:{
          title:'Fdfs日志',
          role:0
        }
      },
      {
        path:'/userdisk',
        component:resolve => require(['../components/adminpage/userdisk.vue'],resolve),
        meta:{
          title:'用户磁盘',
          role:0
        }
      },
      {
        path:'/sharemessage',
        component:resolve => require(['../components/adminpage/sharemessage.vue'],resolve),
        meta:{
          title:'分享管理',
          role:0
        }
      },
      {
        path:'/systemMessage',
        component:resolve => require(['../components/adminpage/systemMessage.vue'],resolve),
        meta:{
          title:'系统消息',
          role:0
        }
      },
      {
        path:'/ExceptionLog',
        component:resolve => require(['../components/adminpage/ExceptionLog.vue'],resolve),
        meta:{
          title:'Fdfs异常日志',
          role:0
        }
      },
      {
        path:'/adminmessage',
        component:resolve=>require(['../components/adminpage/adminmessage.vue'],resolve),
        meta:{
          title:'管理员信息',
          role:0
        }
      },
      {
        path:'/login',
        component:resolve=>require(['../components/login.vue'],resolve),
        meta:{
          title:'退出',
          role:0
        }
      },
    ]
  }
];
