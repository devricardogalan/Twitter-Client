<template>
<div>

  <v-layout row justify-center> 
      <div class="modal-backdrop modalClass" @click="close">
                 <div 
                 class="modal"
         scrollable
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalDescription" @click.stop>
<!--<v-dialog  v-model="dialog" scrollable max-width="300px"> -->
 
  <li
  v-for="friend in friendsList"
  v-bind:key="friend.id"
  style='list-style:none'
  >
        <v-card 
        class="mx-auto"
        color="#26c6da"
        max-width="800">
        <v-card-title>
          <v-avatar
          
          color="grey lighten-4"
        >
          <v-img
          :src="friend.profile_image_url">
          </v-img>
          </v-avatar>
          <span>
          {{friend.name}}
          </span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text  
         class="dialogfriends headline font-weight-bold">
            {{'@'+friend.screen_name}}
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
  </li>
<!--      </v-dialog> -->
</div>
      </div>
   </v-layout>
</div>    
</template>

<script>
import { getFavs } from '@/services/twitterapi';
export default {
    name: "DialogFavs",
    props: ["favsList"],
    data () {
    return {
      dialogm1: '',
      favsList: []
    }
  },
  created(){
   this.loadFavs();
  },
  methods: {
    loadFavs: function(){
      return Promise.all([
        getFavs()
      ]).then(
        function(results){
          debugger;
          this.favsList=results[0].users;
        }.bind(this)
      )
    },
    close(){
      this.$emit('close');
    }
  }
}
</script>
<style>
.ul{
  list-style: none;
  padding-left: 0px;
}
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    max-height:400px;
    max-width: 800px;
    background-color: rgb(38, 198, 218);
    border-color: rgb(38, 198, 218);
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    overflow-y:scroll;
    display: flex;
    flex-direction: column;
  }
</style>
