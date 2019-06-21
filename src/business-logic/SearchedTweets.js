import {getSearch} from '@/services/twitterapi';
import router from '@/router';
export default{
    namespaced: true,
    state: {
        results:null,
        resultsFromQuery:null,
        retweeted: undefined,
        verified: undefined,
        timelineRendered:false,
    },
    actions: {
        isTimeline({commit}, {value}){
            commit('timelineUrl', value)
        },
        filterTweets({commit}, {filters}){
            debugger;
            commit('filterTweets', filters);
        },
        searchTweetsFromQuery({commit}, {query}){
            debugger;
            return getSearch(query).then(
                function(resultsFromQuery){
                    commit('setResultsFromQuery', resultsFromQuery);
                }
            )
        },
        searchTweets({commit}, {query}){
            debugger;
            return getSearch(query).then(
                function(results){
                    commit('setResults', results);
                }
            )
        }
    },
    mutations:{
        timelineUrl: function(state,value){
            state.timelineRendered=value;
        },
        setResults: function(state, results){
            debugger;
            state.results= results;
            router.push({name:'trendingtweets'})
            //router.push({name:'timeline'})
        },
        setResultsFromQuery: function(state,results){
            debugger;
            state.resultsFromQuery=results;
            router.push({name: 'searched'})
        },
        filterTweets: function(state, filters){
            debugger;
            state.retweeted=filters[0];
            state.verified=filters[1];
        }

    }
}