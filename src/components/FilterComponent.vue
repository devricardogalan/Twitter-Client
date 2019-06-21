<template>
<transition name="modal-fade">
        <v-layout row justify-center>
          <div class="modal-backdrop modalClass" @click="close">
            <div class="modal"
            aria-labelledby="modalTitle"
            aria-describedby="modalDescription" @click.stop>
          <v-card class="filtro">
            <v-card-title class="subheading">Filters</v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <!-- Categorie -->
              <v-list-tile-content>
                <v-list-tile-title>Categories</v-list-tile-title>
                <v-list-tile-action>
    <!--              <v-item-group multiple v-model="filtro.filtros.categories"> -->
             <keep-alive>
                <v-item-group>    
                    <v-item>
                      <v-chip
                        v-bind:model='retweeted'
                        @click="clickedRetweeted"
                        :color="retweetedColor"
                      >
                        Retweeted
                      </v-chip>
                    </v-item>
                    <v-item>
                      <v-chip
                        @click="clickedVerified"
                        :color="verifiedColor"
                      >
                        Verified
                      </v-chip>
                    </v-item>
                </v-item-group>
             </keep-alive>
                </v-list-tile-action>
              </v-list-tile-content>
              <!-- DDT -->
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="primary" flat @click="saveFilters(false);" v-on:click="close"
                >Cancel</v-btn
              >
              <v-btn color="primary" @click="saveFilters(true);" v-on:click="close">Save</v-btn>
            </v-card-actions>
          </v-card>
          </div>
          </div>
          </v-layout>  
          </transition> 
</template>
<script>
import { mapState, mapActions } from 'vuex';
import {getTimelineFiltered} from '@/services/twitterapi';
export default {
    name: 'FilterComponent',
    props: ['filtros'],
          computed: {
        ...mapState('SearchedTweets', ['results','favorited', 'retweeted', 'verified']),
    },
    data: function(){
        return{
            verifiedColor:'',
            retweetedColor:'',
            favoritedColor:'',
            retweeted:undefined,
            verified: undefined,
            filters:[]
        }
    },

    methods:{
     ...mapActions('SearchedTweets', ['filterTweets']),
        saveFilters(param){
            if(param==true){
               this.filters[0]=this.retweeted;
               this.filters[1]=this.verified;
               let filters=this.filters;
               this.filterTweets({filters});
               
            }else{
              debugger;
            this.verifiedColor='';
            this.retweetedColor='';
            this.filters.length=0;
            let filters=this.filters;
            this.filterTweets({filters});
            }
            
        },
        clickedVerified(){
            debugger;
            if(this.verifiedColor==''){
            this.verifiedColor='primary';
            this.verified=true;
            }else{
              debugger;
                this.verifiedColor='';
                this.verified=false;
            }
        },
        clickedRetweeted(){
            debugger;
             if(this.retweetedColor==''){
            this.retweetedColor='primary';
            this.retweeted=true;
            }else{
              debugger;
                this.retweetedColor='';
                this.retweeted=false;
            }                       
        },
            close(){
      this.$emit('close');
    }
    }
}
</script>

<style>
.filtro .subheading {
  padding: 10px 16px !important;
}
.filtro .v-list__tile__content {
  margin-bottom: 10px;
}
.filtro .v-list__tile__action {
  width: 98%;
}
.filtro {
  max-width: 400px;
}
.modal{
  overflow-y:hidden
}
</style>        
 