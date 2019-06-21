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
                <template v-slot:header="{tweet}" id="modalTweetHeader">
                        <v-list-tile-avatar color="grey darken-3">
                            <v-img
                                class="elevation-6"
                                :src="tweet.user.profile_image_url_https"
                            ></v-img>
                        </v-list-tile-avatar>
                    {{tweet.user.name}}
                </template>
                <template v-slot:body="{tweet}">
                    <p>{{tweet.text}}</p>
                </template>
                <template v-slot:footer="{tweet}" class="footerModal">
                    <span>{{dateFormat(tweet.created_at)}}</span>
                    <span><i class="fas fa-heart"></i></span>
                    <span> </span>
                    <span>{{tweet.favorite_count}}</span>
                    <span> </span>
                    <span><i class="fas fa-retweet"></i></span>
                    <span> </span>
                    <span>{{tweet.retweet_count}}</span>
                </template>    
                </DialogPage>
            </div>
            </ul>
        </div>        
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ResultsCards from '@/components/ResultsCards';
import { getTimeline } from '@/services/twitterapi';
import infiniteScroll from 'vue-infinite-scroll';
import DialogPage from '@/components/DialogPage';


export default {
    name: 'TimeLinePage',
    directives: {infiniteScroll},
    components: {
        DialogPage
    },

    computed: {
        ...mapState('SearchedTweets', ['results','favorited', 'retweeted', 'verified']),
    },

    data: function(){
       return{
        name:'',
        tweettext:'',
        limit: 10,
        busy:false,
        dialog:false,
        results: [],
        filteredResults:[],
        filters:[],
        arrayModal: null,
        dateModal: '',
        isModalVisible: false
       }
    },
    created(){
     this.$store.watch(
      state => {
          debugger;
        return [state.SearchedTweets.retweeted, state.SearchedTweets.verified];
      },
      (newValue, oldValue) => {
          debugger;
          this.filters=newValue;
          this.results.length=0
          this.loadMore();
      },
      {
        deep: true
      }
    );  
    this.loadMore(); 
    this.timelineRendered();
    },
    methods: {
        ...mapActions('SearchedTweets', ['isTimeline']),
        timelineRendered(){
              
                this.isTimeline({value:true});
        },
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
            debugger;
            console.log("Adding 10 more data results");
            this.busy = true;
            return Promise.all([
                getTimeline()
            ]).then(
                function(results){
                    debugger;
                    this.filterTweets(results[0]);
                    
                /*    const append= results[0].slice(
                        this.results.length,
                        this.results.length + this.limit
                    );*
                    this.results=this.results.concat(append);
                    */
                   debugger;
                   const append=this.filteredResults.slice(
                       this.results.length,
                       this.results.length+this.limit
                   );
                   this.results=this.results.concat(append);
                    this.busy=false;
                }.bind(this)
            );

        },
        filterTweets: function(results){
            debugger;
            this.filteredResults=results;
            if(this.filters){
                if(this.filters[0]!=undefined){
                    this.filteredResults=this.filteredResults.filter(result=>{return result.retweeted_status!=undefined})
                    this.results.length=0;
                }
                if(this.filters[1]!=undefined){
                    this.filteredResults=this.filteredResults.filter(result=>{return result.user.verified==true})
                    this.results.length=0;
                }
            }
        }
    
    }
    
}

</script>
<style>
.mx-auto{
    margin-bottom: 1%
}
#modalTitle{
    justify-content: left;
    font-size:30px
}
span:before{
    content:" "; 
    display:inline-block; 
    width:5px;
}
@media only screen and (max-width: 400px) {
  .avatarSize {
    display: none
  }
}
</style>


