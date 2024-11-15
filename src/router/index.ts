import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetails from '../components/PostDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/Post/:id',
      component: PostDetails,
      props: true
    }
  ],
})

export default router
