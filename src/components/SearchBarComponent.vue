<template>
  <v-card
    color="#212121"
    class="searchbar"
  >
    <v-card-text>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="Description"
        item-value="API"
        label="Search"
        placeholder="Search for tweets"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="model" class="red lighten-3">
        <v-list-tile
          v-for="(field, i) in fields"
          :key="i"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="field.value"></v-list-tile-title>
            <v-list-tile-sub-title v-text="field.key"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-expand-transition>
 <!--   <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!model"
        color="grey darken-3"
        @click="model = null"
      >
        Clear
        <v-icon right>mdi-close-circle</v-icon>
      </v-btn>
    </v-card-actions>-->
  </v-card>
</template>

<script>
import {getSearch, getTimeline} from '@/services/twitterapi';
import { mapState, mapActions } from 'vuex';
  export default {
    name:'SearchBarComponent',
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      isBusy:false
    }),

    computed: {
      ...mapState('SearchedTweets', ['resultsFromQuery']),    
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a'
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

          return Object.assign({}, entry, { Description })
        })
      }
    },
    watch: {
    
      search (val){ 
        setTimeout(function(){
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true
        debugger;
        // Lazily load input items
        this.doQuery(val);        
    }.bind(this), 500);

      }
        
    },
    methods:{
        ...mapActions('SearchedTweets', ['searchTweetsFromQuery']),
                doQuery: function(query){
                    this.isLoading = false
            debugger;
                this.searchTweetsFromQuery({query});
            
            
        }
    }
  }
</script>
<style>
.searchbar{
  height:64px;
  border:none;
}
</style>

