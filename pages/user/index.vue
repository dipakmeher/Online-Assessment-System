<template>
  <v-app>  
    <v-app-bar app>
    <h1>Home</h1>
    </v-app-bar>
    <v-content>
      <v-container>
        <h1>Welcome to Online Assessment Portal</h1>
        <nuxt-link to="assessment"><v-btn type="submit" class="btn btn-primary"  color="primary" style="width:100%;" id="login"> Take Assessment</v-btn></nuxt-link>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {

}
</script> 

<style>

</style>