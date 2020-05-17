<template>
  <v-app>  
    <v-app-bar app color="primary darken-4" dark >
    <span class="display-1 font-weight-bold">Online Assessment Portal</span>

    <v-spacer></v-spacer>
    <v-btn text color="white darken-1" @click="logout" v-if="accounts"> Logout </v-btn>
    <v-dialog v-model="dialog" persistent max-width="400" v-if="accounts">
      <template v-slot:activator="{ on }">
        <v-btn text color="white darken-1" dark v-on="on"> <v-icon left>mdi-account</v-icon> Account</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Logged in:- </v-card-title>
        <v-card-title v-if="accounts">{{accounts.email}}</v-card-title>
        <v-card-text v-if="claim">You are admin.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Ok</v-btn>
          <v-btn text color="green darken-1" @click="logout"> Logout </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-app-bar>
     
    <nuxt />  
        
    <v-footer app class="primary darken-4" dark >
       <v-col
        class="text-center"
        cols="12"
      >
      Hare Krishna &copy; 2020
      </v-col>
    </v-footer>
  
  </v-app>
</template>

<script>
import db from '../plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import { auth } from "@/plugins/firebase";
import Cookie from "js-cookie";
 export default {
    data () {
      return {
        dialog: false,
      }
    },
    
     computed:{
    ...mapGetters({
        accounts:'users/get',
        claim:'users/getClaim',
    }),
    },
    methods:{
      async logout() {
        await auth.signOut();
        await Cookie.remove("access_token");
        location.href = "/";
      }
    }
  }
</script>
<style scoped>

</style>