<template>
    <div>
        <template>
    <v-layout row>
        <v-flex  sm8 >
        <v-list>
            <v-list-group>
            <template v-slot:activator>
              <v-list-tile>
                    <v-icon
                        large
                        left
                     >
                      fas fa-hashtag
                    </v-icon>
                <v-list-tile-content>
                  <v-list-tile-title>Trending</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="trend in trends"
              :key="trend.name"
              @click="doQuery(trend.name)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ trend.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            </v-list-group>
        </v-list>
            </v-flex>
  </v-layout>    
        </template>    
<!--        <v-list-tile-content v-bind:key="trend.name" v-for="trend in trends">
            <v-list-tile-title>{{trend.name}}</v-list-tile-title>
        </v-list-tile-content> -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getTrending, getSearch } from '@/services/twitterapi';

export default{
    name:"TrendingComponent",
    data: function(){
        return{
        trends: null,
        limit: 10
        }
    },
    computed: {
        ...mapState('SearchedTweets', ['results'])
    },
    created: function(){
           this.loadTrends();
    },
    methods:{
        ...mapActions('SearchedTweets', ['searchTweets']),

        loadTrends: function(){
            return Promise.all([
                getTrending()
            ]).then(
                function(results){
                    debugger;
                    let trendingtop=results[0].trends.slice(0,this.limit);
                    this.trends=trendingtop;
                }.bind(this)
            )
        },
        doQuery: function(query){
            debugger;
                this.searchTweets({query});
            
            
        }
    }
    
}
</script>
