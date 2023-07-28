import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          meta: { background: '/img/common/img_bg_home.jpg' }, // 設定該頁面的背景圖路徑
          component: () => import('../views/front/HomeView.vue')
        },
        {
          path: 'viewpoints',
          name: 'viewpoints',
          meta: { background: '/img/common/img_bg_allPage.jpg' }, // 設定該頁面的背景圖路徑
          component: () => import('../views/front/ViewpointsView.vue')
        },
        {
          path: 'viewpoint/:id',
          name: 'viewpoint',
          meta: { background: '/img/common/img_bg_allPage.jpg' }, // 設定該頁面的背景圖路徑
          component: () => import('../views/front/ProductView.vue')
        },
        {
          path: 'restaurants',
          name: 'restaurants',
          meta: { background: '/img/common/img_bg_allPage.jpg' }, // 設定該頁面的背景圖路徑
          component: () => import('../views/front/RestaurantsView.vue')
        },
        {
          path: 'restaurant/:id',
          name: 'restaurant',
          meta: { background: '/img/common/img_bg_allPage.jpg' }, // 設定該頁面的背景圖路徑
          component: () => import('../views/front/ProductView.vue')
        },
        {
          path: 'feedbackForm',
          name: 'feedbackForm',
          meta: { background: '/img/common/img_bg_allPage.jpg' }, // 設定該頁面的背景圖路徑
          component: () => import('../views/front/FeedbackFormView.vue')
        },
        {
          path: 'login',
          name: 'login',
          meta: { background: '/img/common/img_bg_allPage.jpg' }, // 設定該頁面的背景圖路徑
          component: () => import('../views/front/loginView.vue')
        },
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/BackLayout.vue'),
      children: [
        {
          path: 'adminRestaurants',
          name: 'adminRestaurants',
          component: () => import('../views/back/AdminRestaurants.vue')
        },
        {
          path: 'adminViewpoints',
          name: 'adminViewpoints',
          component: () => import('../views/back/AdminViewpoints.vue')
        }
      ]
    }
  ]
})

export default router
