import Vue from 'vue'
import Vuex from 'vuex'
import SearchedTweets from '@/business-logic/SearchedTweets'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    SearchedTweets
  }
})
