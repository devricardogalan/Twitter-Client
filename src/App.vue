<template>
 <div id="app">

  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-card
    class="mx-auto"
    color="#9000B3"
    dark
    max-width="400"
  >
    <v-card-title>
      <span class="title font-weight-light">You</span>
      <v-spacer></v-spacer>
              <v-btn
              
        icon
        v-if="isTimeline"
        @click="showFilter"> <v-icon
        large right>fas fa-filter</v-icon> </v-btn>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      Learning Vue.js
    </v-card-text>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>Ricardo</v-list-tile-title>
          

        </v-list-tile-content>

        <v-layout
          align-center
          justify-end
        >
        <div  @click="showDialogFriends" class="pointer">
          <v-icon>fas fa-user-friends</v-icon>
          <span class="subheading mr-2">{{friendsNumber}}</span>
        </div>  
      <router-link class="routerlink" :to="{ name: 'favs' }">
          <v-icon class="mr-1">fas fa-star</v-icon>
          <span class="subheading">{{favsNumber}}</span>
        </router-link>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
  </v-card>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon
            large
            left>
            fas fa-stream
            </v-icon>
          </v-list-tile-action>
          
          <v-list-tile-content>
            <router-link class="routerlink" :to="{ name: 'timeline' }">Your Timeline</router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> 
      <TrendingComponent></TrendingComponent>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="banner">Twitter</v-toolbar-title>
      <v-spacer></v-spacer>

      <SearchBarComponent></SearchBarComponent>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <router-view/>
          </v-flex>
            <DialogFriends
           v-if="isDialogVisible"                 
           v-show="isDialogVisible"
           @close="closeDialogFriends"
           :friends="friendsList">
           </DialogFriends>
           <DialogFavs
           v-if="isDialogFavsVisible"
           v-show="isDialogFavsVisible"
           @close="closeDialogFavs"
           :favs="favsList">
           </DialogFavs>
           <FilterComponent
            v-if="isFilterVisible"
            v-show="isFilterVisible"
            @close="closeFilter"
           >
           </FilterComponent>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; Ricardo Galán</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import HelloWorld from './components/HelloWorld';
import TrendingComponent from './components/Trending';
import SearchBarComponent from './components/SearchBarComponent';
import DialogFriends from './components/DialogFriends';
import DialogFavs from './components/DialogFavs';
import FilterComponent from './components/FilterComponent';
import {getFriends, getFavs} from './services/twitterapi';

export default {
  el: '#app',

  data: () => ({
    drawer: true,
    isDialogVisible: false,
    isDialogFavsVisible: false,
    isFilterVisible: false,
    friendsList: [],
    friendsNumber:0,
    favsNumber:0,
    isTimeline:false,
  }),
  created(){
    this.loadFriends();
    this.loadFavs();
         this.$store.watch(
      state => {
          debugger;
        return [state.SearchedTweets.timelineRendered];
      },
      (newValue, oldValue) => {
          debugger;
          this.isTimeline=newValue
      },
      {
        deep: true
      }
    );  
  }, 
  components: {
    TrendingComponent,
    SearchBarComponent,
    DialogFriends,
    DialogFavs,
    FilterComponent
  },

  methods:{
    showDialogFriends(){
      debugger;
      this.isDialogVisible=true;
    },
    closeDialogFriends(){
      debugger;
      this.isDialogVisible=false;
    },
    showDialogFavs(){
      debugger;
      this.isDialogFavsVisible=true;
    },
    closeDialogFavs(){
      debugger;
      this.isDialogFavsVisible=false;
    },
    showFilter(){
      debugger;
      this.isFilterVisible=true;
    },
    closeFilter(){
      this.isFilterVisible=false;
    },
    loadFriends: function(){
      return Promise.all([
        getFriends()
      ]).then(
        function(results){
          debugger;
          this.friendsNumber=results[0].users.length;
        }.bind(this)
      )
    },
            loadFavs: function(){
            this.busy = true;
            return Promise.all([
                getFavs()
            ]).then(
                function(results){
                    this.favsNumber=results[0].length;
                }.bind(this)
            );

        },
    close(){
      this.$emit('close');
    }
  },
  props: {
    source: String
  }
}
</script>
<style>
.routerlink{
  text-decoration: none;
  color: white;
  font-size:16px;
  font-weight:400px;
}
@media only screen and (max-width: 400px) {
  .banner {
    display: none
  }
}
</style>

