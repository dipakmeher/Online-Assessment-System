<template >
  <v-app>
    <v-row no-gutters>
      <v-col cols="3">
        <!-- <v-container class="purple" > -->
           <v-card tile flat height="640px" class="navcard" >
            <v-navigation-drawer permanent min- width="320px" color="blue-grey lighten-5">

              <v-list rounded dense  >
                <v-list-item  >
                  <v-list-item-content >
                    <v-list-item-title class="title">
                      Welcome User 
                    </v-list-item-title>
                    <br><br>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-subheader>Pages</v-subheader>
                <!-- groups -->
                <v-list-item-group color="primary darken-2">
                    <v-list-item to="/user" @click="item='Home'">
                      <v-list-item-icon >
                        <v-icon > home</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                     <v-list-item to="/user/instruction" @click="item='Assessment'">
                       <v-list-item-icon>
                        <v-icon> open_in_browser</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Take Assessment</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/user/result" @click="item='Results'">
                       <v-list-item-icon>
                        <v-icon> settings_ethernet</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Your Results</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
           </v-card>
        <!-- </v-container> -->
      </v-col>
      <v-col cols="9" class="">
        
        <v-app-bar class="blue-grey lighten-5" flat>
          <span class="display-1 font-weight-bold ">{{item}}</span>

          <v-spacer></v-spacer>
          <v-btn text color="black darken-4" @click="logout" v-if="accounts"> Logout </v-btn>
          <v-dialog v-model="dialog" persistent max-width="400" v-if="accounts">
            <template v-slot:activator="{ on }">
              <v-btn text color="black darken-4" dark v-on="on"> <v-icon left>mdi-account</v-icon> Account</v-btn>
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

        <v-card class="ma-5 primary darken-4 main" min-height="80%" min-width="72%">
          <nuxt />
        </v-card>
    
      </v-col>
    </v-row>
  <v-footer class="footer" color="blue-grey lighten-5">
  Hare Krishna &copy; 2020
  </v-footer>
  </v-app>
</template>
<script>
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
import { auth } from "@/plugins/firebase";
import Cookie from "js-cookie";

  export default {
    data () {
      return {
        item:"User Page",
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
.footer{
  position: fixed;
  bottom:0;
  width:100%;
}
.navcard{
  position: fixed;
  left:0;
  overflow:auto;
}
.main{
  position: fixed;
  overflow: auto;
}
</style>