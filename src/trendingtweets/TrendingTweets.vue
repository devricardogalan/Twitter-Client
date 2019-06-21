<template id="dialog">
        <div>
            <ul>
                                <v-progress-circular
                v-if="busy"
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
            <div 
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="busy"
                    infinite-scroll-distance="limit">
                    <li
                    v-for="result in results"
                    v-bind:key="result.id"
                    style='list-style:none'
                    data-aos="slide-up"
                    data-aos-offset="100"
                    data-aos-="ease-out-back">
                       
                <v-card
                    class="mx-auto"
                    color="#26c6da"
                    dark
                    max-width="800"
                    @click="showModal(result.id)"
                >
                  <v-card-title>
                     <v-icon
                        large
                        left
                     >
                       mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">Twitter</span>
                  </v-card-title>
  
                <v-card-text class="headline font-weight-bold">
                    {{result.text}}
                </v-card-text>
  
                <v-card-actions>
                    <v-list-tile class="grow">
                        <v-list-tile-avatar color="grey darken-3 avatarSize">
                            <v-img
                                class="elevation-6"
                                :src="result.user.profile_image_url_https"
                            ></v-img>
                        </v-list-tile-avatar>
  
                        <v-list-tile-content>
                            <v-list-tile-title>{{result.user.name}}</v-list-tile-title>
                        </v-list-tile-content>
  
                        <v-layout
                            align-center
                            justify-end
                        >
                            <span><i class="fas fa-heart"></i></span>
                            <span class="subheading mr-2">{{result.favorite_count}}</span>
                            <span class="mr-1">·</span>
                            <span><i class="fas fa-retweet"></i></span>
                            <span class="subheading">{{result.retweet_count}}</span>
                        </v-layout>
                    </v-list-tile>
                 </v-card-actions>
                </v-card>

                </li>
                <DialogPage v-show="isModalVisible"
                @close="closeModal" :tweet="arrayModal">
                <template v-slot:header="{tweet}" >
                    {{tweet.user.name}}
                </template>
                <template v-slot:body="{tweet}">
                    <p>{{tweet.text}}</p>
                </template>
                <template v-slot:footer="{tweet}">
                    <span>{{dateFormat(tweet.created_at)}}</span>
                    <span><i class="fas fa-heart"></i></span>
                    <span>{{tweet.favorite_count}}</span>
                    <span><i class="fas fa-retweet"></i></span>
                    <span>{{tweet.retweet_count}}</span>
                </template>    
                </DialogPage>
            </div>
            </ul>
        </div>        
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getTimeline } from '@/services/twitterapi';
import infiniteScroll from 'vue-infinite-scroll';
import DialogPage from '@/components/DialogPage';


export default {
    name: 'trendingtweets',
    directives: {infiniteScroll},
    components: {
        DialogPage
    },

    computed: {
        ...mapState('SearchedTweets', ['results'])
    },

    data: function(){
       return{
        name:'',
        tweettext:'',
        limit: 10,
        busy:false,
        dialog:false,
        results: [],
        arrayModal: null,
        dateModal: '',
        isModalVisible: false,
        isTrendChange: false,
       }
    },
    created(){ 
        debugger;
      
    this.$store.watch(
      state => {
          debugger;
        return state.SearchedTweets.results;
      },
      (newValue, oldValue) => {
          debugger;
          if(newValue){
              this.isTrendChange=true;
          }
     //   this.results=newValue;
        this.loadMore(newValue);
      },
      {
        deep: true
      }
    );  
  /*  }else{
    this.loadMore(this.$store.state.SearchedTweets.results); 
    }*/

    },
    methods: {
        ...mapActions('SearchedTweets', ['isTimeline']),
        showModal(param){
            debugger;
            this.isModalVisible=true;
            //INVESTIGAR MAÑANA
           let index=this.results.findIndex(i=> i.id==param)
           this.arrayModal=this.results[index];
        },
        closeModal(){
            this.isModalVisible=false
        },
        dateFormat(date){
            let dateToFormat= new Date(date).toString();
            let dateToShow=dateToFormat.substring(0,15);
            return dateToShow;
        },
        loadMore: function(){
            this.isTimeline({value:false});
            let results=this.$store.state.SearchedTweets.results;
            debugger;
            console.log("Adding 10 more data results");
            this.busy = true;

            if(this.isTrendChange){
                console.log('Added new ones');
                this.results.length=0;
            }
                    const append= results.statuses.slice(
                        this.results.length,
                        this.results.length + this.limit
                    );
                    this.results=this.results.concat(append);
                    this.busy=false;
                    this.isTrendChange=false;
                }
            

        }
}

</script>
<style>
.mx-auto{
    margin-bottom: 1%
}
@media only screen and (max-width: 400px) {
  .avatarSize {
    display: none
  }
}
</style>