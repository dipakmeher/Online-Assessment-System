<template>
  <v-app>  
    <v-app-bar app>
    <h1>Online Assessment Portal</h1>

<v-spacer></v-spacer>
    <v-btn @click="logout" v-if="accounts"> Logout </v-btn>
    <v-dialog v-model="dialog" persistent max-width="290" >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">User is:- </v-card-title>
        <v-card-text id="textemail" v-if="accounts">{{accounts.email}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
    </v-app-bar>

        <nuxt />  

    <v-footer app>
      <span> Hare Krishna &copy; 2020</span>
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
        accounts:'users/get'
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