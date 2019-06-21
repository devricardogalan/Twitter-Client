import Vue from 'vue'
import Router from 'vue-router'
import TimeLineRoutes from './timeline/routes';
import TrendingRoutes from './trendingtweets/routes';
import SearchRoutes from './search/routes';
import FavRoutes from './favorites/routes'

Vue.use(Router)

export default new Router({
  routes: TimeLineRoutes.concat(TrendingRoutes, SearchRoutes, FavRoutes)
})