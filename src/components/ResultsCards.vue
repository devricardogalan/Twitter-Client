<template>
  <div id="app-twitter-card">
  <v-app id="inspire">
      <slot :tweet="tweet"></slot>
  </v-app>
</div>  
</template>

<script>
export default{
    name:'ResultsCards',
    props: ['tweets'],
    methods:{
        cardClick: function(id){
            this.$emit('cardclick', id);
        }
    }
}
</script>

