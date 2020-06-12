<template>
  <v-content>
    <v-container>
     
    </v-container>
  </v-content>
</template>

<script>
 export default{
   layout:'userlayout',
   async created() {
    this.$store.dispatch("assessment/fetchTime");
    this.$store.dispatch("fetchMasterBank");
    this.$store.dispatch("makeadmin/fetchCategories");   
  },
 }
</script>

<style>

</style>