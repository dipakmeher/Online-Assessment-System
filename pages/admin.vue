<template>
  <v-app id="inspire">
    <v-app-bar app color="indigo" dark >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar> 

    <div class="text-center " >
      <nuxt-link to="/addques"><v-btn rounded color="primary" dark>Create</v-btn></nuxt-link>
      <v-btn rounded color="primary" dark>Delete</v-btn>
      <v-btn rounded color="primary" dark>Read</v-btn>
      <v-btn rounded color="primary" dark>Update</v-btn>
    </div>

    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>