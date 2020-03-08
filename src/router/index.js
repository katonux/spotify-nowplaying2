import Vue from 'vue'
import VueRouter from 'vue-router'
import NowPlaying from '@/views/NowPlaying.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NowPlaying',
    component: NowPlaying,
    props: (route) => {
      if (route.hash) {
        router.push(route.fullPath.replace('#', '?'))
      }
      return { params: route.query }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
