<template>
  <v-content>
    <v-container class="container">
      <v-app-bar class="yellow lighten-4 smallnav">
        <p class="ma-2 font-weight-medium subtitle-1">Total Questions:- <p class=" ma-1 display-1 font-weight-bold"> {{noofque}}</p>
      </v-app-bar>
      <v-card class="scrollmenu" height="300px" flat>
        <v-list>
          <v-list-item>
            <v-row>
              <v-col cols="8">
                <v-card flat class="text-center hidden-sm-and-down">
                  <p class="text-h5 font-weight-bold">Questions</p>
                </v-card>
                <v-card flat class="text-center hidden-md-and-up">
                  <p class="title-1 font-weight-bold">Questions</p>
                </v-card>
                <v-divider horizontal></v-divider>
              </v-col>
          
              <v-col cols="2">
                <v-card flat class="text-center hidden-sm-and-down">
                  <p class="text-h5 font-weight-bold">Type</p>
                </v-card>
                <v-divider horizontal></v-divider>
              </v-col>
              <v-col cols="2">
                <!-- <v-card flat class="text-center">
                  <p class="subtitle-1">Delete Btn</p>
                </v-card>
                <v-divider horizontal></v-divider> -->
              </v-col>
              
            </v-row>
          </v-list-item>
          <v-row id="cafelist">
            <v-list-item
              v-for="(Questions,index) in projects"
              :key="index"
              :id="index"
            >
              <v-col cols="8">
                <v-card flat>
                  <v-list-item-content>
                    {{Questions.Question}}
                  </v-list-item-content>  
                </v-card>
                <v-divider horizontal></v-divider>
              </v-col>
              <v-col cols="2" class="hidden-sm-and-down">
                <v-card flat>
                  <v-list-item-content>
                    {{Questions.type}}
                  </v-list-item-content>
                  <v-divider horizontal></v-divider>  
                </v-card>
              </v-col>
              <v-col cols="2">
                <v-btn class="outlined child primary" v-on:click="Delete(index)">Delete</v-btn>
              </v-col>
            </v-list-item>
          </v-row>
        </v-list>
      </v-card> 

      <!--For Small Screen-->
      
      <!-- For Small Screen -->
    </v-container>
  </v-content>
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
        id:'',
        noofque:this.$store.state.projectlen
    }
  },
  computed:{
    ...mapGetters({
        projects:'getMasterBank',
    }),
  },
  methods:{
      Delete(index){
      this.$store.dispatch("DeleteQuestion",index).then(()=>{
        this.noofque--; 
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
    white-space: nowrap;
}  
.container{
  /* width:70%; */
  margin: 5%;
  height: 30px;
  margin-top: 20px;
  position: fixed;
} 
</style>