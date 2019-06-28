import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/administration',
    component: Layout,
    redirect: 'setting',
    name: 'Administration',
    meta: { title: 'Administration', icon: 'setting0' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/administration/user/index'),
        meta: { title: 'User', icon: 'user0' }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/administration/setting'),
        meta: { title: 'Setting', icon: 'setting' }
      },
      {
        path: 'file',
        name: 'File',
        component: () => import('@/views/administration/file/index'),
        meta: { title: 'File', icon: 'picture' }
      }
    ]
  },

  {
    path: '/blog',
    component: Layout,
    redirect: 'article',
    name: 'Blog',
    meta: { title: 'Blog', icon: 'blogger' },
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/blog/category/index'),
        meta: { title: 'Category', icon: 'category' }
      },
      {
        path: 'category/create',
        name: 'Create Category',
        component: () => import('@/views/blog/category/create'),
        hidden: true
      },
      {
        path: 'category/edit/:id',
        name: 'Edit Category',
        component: () => import('@/views/blog/category/edit'),
        hidden: true
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('@/views/blog/tag/index'),
        meta: { title: 'Tag', icon: 'tag' }
      },
      {
        path: 'tag/create',
        name: 'Create Tag',
        component: () => import('@/views/blog/tag/create'),
        hidden: true
      },
      {
        path: 'tag/edit/:id',
        name: 'Edit Tag',
        component: () => import('@/views/blog/tag/edit'),
        hidden: true
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/blog/article/index'),
        meta: { title: 'Article', icon: 'article' }
      },
      {
        path: 'article/create',
        name: 'Create Article',
        component: () => import('@/views/blog/article/create'),
        hidden: true
      },
      {
        path: 'article/edit/:id',
        name: 'Edit Article',
        component: () => import('@/views/blog/article/edit'),
        hidden: true
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/blog/comment/index'),
        meta: { title: 'Comment', icon: 'comment' }
      },
      // {
      //   path: 'comment/create',
      //   name: 'Create Comment',
      //   component: () => import('@/views/blog/comment/create'),
      //   hidden: true
      // },
      {
        path: 'comment/edit/:id',
        name: 'Edit Comment',
        component: () => import('@/views/blog/comment/edit'),
        hidden: true
      },
      {
        path: 'link',
        name: 'Link',
        component: () => import('@/views/blog/link/index'),
        meta: { title: '链接', icon: 'link' }
      },
      {
        path: 'link/create',
        name: 'Create Link',
        component: () => import('@/views/blog/link/create'),
        hidden: true
      },
      {
        path: 'link/edit/:id',
        name: 'Edit Link',
        component: () => import('@/views/blog/link/edit'),
        hidden: true
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    redirect: 'index',
    // meta: { title: 'Video', 'icon': 'video' },
    children: [
      {
        path: 'index',
        name: 'Video',
        component: () => import('@/views/video/index'),
        meta: { title: 'Video', 'icon': 'video' }
      },
      {
        path: 'create',
        name: 'Create Video',
        component: () => import('@/views/video/create'),
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'Edit Video',
        component: () => import('@/views/video/edit'),
        hidden: true
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    // redirect: 'xxx',
    name: 'External Link',
    meta: { title: 'External Link', icon: 'link' },
    children: [
      {
        path: 'https://tongji.baidu.com/web/25043645/homepage/index',
        meta: { title: '百度统计', icon: 'baidutongji' }
      },
      {
        path: 'https://portal.qiniu.com/insight/nb/favorite',
        meta: { title: 'logkit-pro', icon: 'logs' }
      },
      {
        path: 'https://www.bing.com/webmaster/home/mysites?orde=1&url=https%3A%2F%2Fwww.lnmpa.top%2F',
        meta: { title: 'Bing Website Manager', icon: 'bing' }
      },
      {
        path: 'https://www.youtube.com/luoxulx',
        meta: { title: 'YouTube', icon: 'youtube' }
      },
      {
        path: 'https://www.facebook.com/luoxulx',
        meta: { title: 'Facebook', icon: 'facebook' }
      },
      {
        path: 'https://github.com/luoxulx',
        meta: { title: 'Github', icon: 'github' }
      }
    ]
  },

  {
    path: '/logs',
    component: Layout,
    redirect: '/logs',
    children: [{
      path: 'logs',
      name: 'Logs',
      component: () => import('@/views/logs/index'),
      meta: { title: 'Logs', icon: 'logs' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
