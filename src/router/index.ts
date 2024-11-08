import { createMemoryHistory, createRouter, RouteRecordRaw } from "vue-router";

const homeComponent = {
  //default: null,
  impl1: () => import('@views/impl1'),
  impl2: () => import('@views/impl2'),
  impl3: () => import('@views/impl3')
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    components: homeComponent
  }
]
export const viewNames = Object.keys(homeComponent)

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})