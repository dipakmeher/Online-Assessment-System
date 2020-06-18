<template>
  <v-main>
     <v-container class="container">
         <!-- <v-app-bar class="yellow lighten-4 smallnav" >
           <p class="ma-2 font-weight-medium subtitle-1">Total Questions:- <p class=" ma-1 display-1 font-weight-bold"> {{noofque}}</p>
        </v-app-bar>
        <v-card class="scrollmenu" height="300px" flat>
            dipak
        </v-card>  -->
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
  margin-left: 50px;
  height: 30px;
  margin-top: 20px;
  position: fixed;
} 
</style>