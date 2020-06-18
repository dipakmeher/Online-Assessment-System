<template>
  <v-main>
     <v-container class="container">
         <v-app-bar class="yellow lighten-4 smallnav">
           <p class="ma-2 font-weight-medium subtitle-1">Total User:-<p class=" ma-1 display-1 font-weight-bold"> {{user}}</p>
        </v-app-bar>
        <v-card class="scrollmenu hidden-sm-and-down" height="300px" flat>
            <v-list>
              <v-row>
                <v-list-item
                  v-for="(Questions,index) in projects"
                  :key="index"
                >
                  <v-col cols="5">
                  <v-list-item-content>
                    <v-list-item-title class="text-h6"> {{index}}</v-list-item-title>
                  </v-list-item-content>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="3" >
                   <v-list-item-content class="ml-5">
                      <v-list-item-title v-if="Questions === true">
                        <v-chip class="success darken-2" text-color="white"> admin  </v-chip>
                      </v-list-item-title>
                    <v-list-item-title v-else>
                      <v-chip class="red" text-color="white">Not admin</v-chip>  
                    </v-list-item-title>
                  </v-list-item-content>
                  </v-col>
                 
                  <v-divider vertical></v-divider>
                  <v-col cols="4" >
                   <v-list-item-content class="ml-2">  
                    <v-btn depressed class="red lighten-1 white--text" v-if="Questions === true" @click="removeAdmin(index)">Remove Admin</v-btn>
                    <v-btn depressed class="success darken-2" v-else @click="addadmin(index)">Make Admin</v-btn>
                  </v-list-item-content>
                  </v-col>
                </v-list-item>
              </v-row>
              <!-- </v-list-item-group> -->
              
            </v-list>
        </v-card> 

        <!-- For Small Screen -->
        <v-card class="scrollmenu yellow lighten-4 hidden-md-and-up" height="300px" flat>
            <v-list>
              <v-row>
                <v-list-item
                  v-for="(Questions,index) in projects"
                  :key="index"
                >
                  <!-- <v-col cols="5"> -->
                  <v-list-item-content>
                    <v-list-item-title class="text-center text-sm-h5 text-subtitle-1 font-weight-bold"> {{index}}:</v-list-item-title>
                    <v-list-item-title class="text-center">
                      <v-chip v-if="Questions === true" class="success darken-2" text-color="white"> admin  </v-chip>
                      <v-chip v-else class="red" text-color="white">Not admin</v-chip>  
                   
                    <v-btn depressed class="red lighten-1 white--text" v-if="Questions === true" @click="removeAdmin(index)">Remove Admin</v-btn>
                    <v-btn depressed class="success darken-2" v-else @click="addadmin(index)">Make Admin</v-btn>
                     </v-list-item-title>
                  </v-list-item-content>
                  <!-- </v-col> -->
                </v-list-item>
              </v-row>
              <!-- </v-list-item-group> -->
              
            </v-list>
        </v-card> 
     </v-container>
  </v-main>
</template>

<script>
import { functions } from "@/plugins/firebase";
import { auth } from "@/plugins/firebase";
import Cookie from "js-cookie";
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
export default {
   layout:'adminlayout',
data(){
  return{
      snackbar: false,
      timeout: 3000,
      isError: false,
      errMsg: "",
      adminemail:"",
      rules:{
        name:[val=> !!val || "Enter Email Please"]
      },
      item: 1,
  }
},
computed:{
  ...mapGetters({
      projects:'makeadmin/get',
      user:'makeadmin/getUser',
  }),
},
methods: {
    admin(e){
         e.preventDefault();
        const adminEmail = this.adminemail;
        const setFalseClaim = functions.httpsCallable('setFalseClaim');
        setFalseClaim({ email: adminEmail }).then(result => {
          console.log("message",result);
        },err=>{
            console.log("err:-", err);          
        })
     
    },
    removeAdmin(index){
      this.$store.commit("makeadmin/removeadmin",index);
      this.$store.dispatch("makeadmin/removeAdmin",index);
    },
    addadmin(index){
      this.$store.commit("makeadmin/addadmin",index);
      this.$store.dispatch("makeadmin/addAdmin",index);
    },
    listUser(){
        const listUser = functions.httpsCallable('listUser');
        listUser().then(result => {
          console.log("message after listUser",result);
        })
        .catch(err => {
          this.isError = true;
          this.errMsg = err.code;
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        });   
    }

  }
}
</script>

<style>
  .smallnav{
      width:70%;
      top:0;
  }
  .scrollmenu {
      width:70%;
      overflow: auto;
  }  
  .container{
    /* width:70%; */
    margin-left: 50px;
    height: 30px;
    margin-top: 20px;
    position: fixed;
  } 
</style>