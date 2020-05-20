<template>
  <v-content>
    <v-container>
     
    </v-container>
  </v-content>
</template>

<script>
 export default{
   layout:'userlayout',
  created() {
    this.$store.dispatch("fetchCategories");
  },
   async destroyed(){
    await this.$store.dispatch("assessment/fetchTime");
  },
 }
</script>

<style>

</style>