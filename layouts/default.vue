<template>
  <v-app>  
    <v-app-bar app color="primary darken-4" dark >
     <v-app-bar-nav-icon @click="drawer = true" class="hidden-sm-and-up" v-if="accounts"></v-app-bar-nav-icon>
    <v-flex class="display-1 font-weight-bold hidden-sm-and-down">Online Assessment Portal</v-flex>
    <v-flex class="headline font-weight-bold hidden-md-and-up">Online Assessment Portal</v-flex>
    <v-spacer></v-spacer>
    <v-btn text color="white darken-1" class="hidden-xs-only" @click="logout" v-if="accounts"> Logout </v-btn>
    <v-dialog v-model="dialog" persistent max-width="400" v-if="accounts">
      <template v-slot:activator="{ on }">
        <v-btn text color="white darken-1" class="hidden-xs-only" dark v-on="on"> <v-icon left>mdi-account</v-icon> Account</v-btn>
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
     <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
        >
          <v-list rounded dense  >
            <v-list-item  >
              <v-list-item-content >
                <v-list-item-title class="title">
                  Welcome Admin 
                </v-list-item-title>
                <br><br>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-subheader>Pages</v-subheader>
            <!-- groups -->
            <v-list-item-group color="primary darken-2">
               <v-list-item to="/admin" v-if="claim==true" @click="item='Home'">
                  <v-list-item-icon >
                    <v-icon > home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/user" v-if="claim==false" @click="item='Home'">
                  <v-list-item-icon >
                    <v-icon > home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
               <v-list-item @click="dialog=true">
                  <v-list-item-icon>
                    <v-icon> mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Accounts</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-icon>
                    <v-icon> power_settings_new</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                
              </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
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
        drawer:false,
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