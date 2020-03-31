<template>
  <v-app>  
    <v-app-bar app>

      <!-- <nuxt-link to="/">
        <v-btn outlined>Home</v-btn>
      </nuxt-link>
        
      <nuxt-link to="/display">
        <v-btn outlined>Contacts</v-btn>
      </nuxt-link> -->  
    <h1>Online Assessment</h1>
    </v-app-bar>
    <v-content class="white">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  
    <v-footer app>
      <span> Hare Krishna &copy; 2020</span>
    </v-footer>
  
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>
<style scoped>
</style>