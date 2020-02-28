import Vue from 'vue'
import VueRouter from 'vue-router'
import NowPlaying from '@/views/NowPlaying.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NowPlaying',
    component: NowPlaying
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
