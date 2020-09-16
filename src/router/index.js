import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../views/Home/index')
const Metagenome = () => import('../views/Metagenome/index')
const Projects = () => import('../views/Projects/index')
const MetaData = () => import('../views/MetaData/index')
const GlobalSearch = () => import('../views/GlobalSearch/index')
const Concat = () => import('../views/Concat/index')
const General = () => import('../views/General/index')

Vue.use(Router)
const VueRouter = new Router({
//   mode: 'history',
  routes: [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: 'general',
                component: General
            },
            {
                path: 'metagenome',
                component: Metagenome
            },
            {
                path: 'project',
                component: Projects
            },
            {
                path: 'metaData',
                component: MetaData
            },
            {
                path: 'globalSearch',
                component: GlobalSearch
            },
            {
                path: 'contact',
                component: Concat
            }
        ],
        redirect: '/general'
    }
    // DetailA
  ]
})

export default VueRouter

const DOC_TITLE = {
    'meetTrip': '会议议程'
}
VueRouter.afterEach((to, from) => {
})
