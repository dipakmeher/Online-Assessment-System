<template>
  <v-content>
    <v-card class="evaluate-btn text-center" max-height="50px" max-width="110px">
      <v-card-title>Results</v-card-title> 
    </v-card>
    <v-container class="container">
         <v-app-bar class="yellow lighten-4 smallnav">
           <p class="ma-2 font-weight-medium subtitle-1"><p class=" ma-1 display-1 font-weight-bold"> </p>
        </v-app-bar>
        <v-card class="scrollmenu" height="300px" flat>
            <v-list>
              <v-row>
                <v-list-item
                  v-for="(Questions,index) in projects"
                  :key="index"
                >
                  <v-col cols="6">
                  <v-list-item-content>
                    <v-list-item-title> {{index}}</v-list-item-title>
                  </v-list-item-content>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="3" >
                   <v-list-item-content class="ml-5">
                    <v-list-item-title v-if="Questions.score <= 1">
                      <v-chip class="red" text-color="white">{{Questions.score}}</v-chip>  
                    </v-list-item-title>
                    <v-list-item-title v-else-if="Questions.score <= 2">
                      <v-chip class="yellow" text-color="primary darken-4">{{Questions.score}}</v-chip>  
                    </v-list-item-title>
                    <v-list-item-title v-else>
                      <v-chip class="green darken-4" text-color="white">{{Questions.score}}</v-chip>  
                    </v-list-item-title>
                  </v-list-item-content>
                  </v-col>
                 
                  <v-divider vertical></v-divider>
                  <v-col cols="3" >
                   <v-list-item-content class="ml-2">  
                    <v-list-item-title v-if="Questions.nature === 'Ignorance'">
                        <v-chip class="red" text-color="white">{{Questions.nature}}</v-chip>  
                    </v-list-item-title>
                    <v-list-item-title v-else-if="Questions.nature === 'Passion'">
                        <v-chip class="yellow" text-color="primary darken-4">{{Questions.nature}}</v-chip>  
                    </v-list-item-title>
                    <v-list-item-title v-else>
                        <v-chip class="green darken-4" text-color="white">{{Questions.nature}}</v-chip>  
                    </v-list-item-title>
                  </v-list-item-content>
                  </v-col>
                </v-list-item>
              </v-row>
              <!-- </v-list-item-group> -->
              
            </v-list>
        </v-card> 
     </v-container>
  </v-content>
</template>

<script>
import db from '@/plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
export default {
    layout:'adminlayout',
    created(){
      this.$store.dispatch("assessment/showResult");
    },
    // methods:{
    //     evaluation(){
    //         this.$store.dispatch("assessment/showResult");
    //         // this.$store.dispatch("assessment/fetchSubAns").then(()=>{
    //         //     // this.$store.dispatch("assessment/showResult");
    //         // });
    //     }
    // },
    computed:{
        ...mapGetters({
            projects:'assessment/getresult',
        }),
    },

}
</script>

<style>
.evaluate-btn{
    margin-left:380px;
    margin-top:20px;
}
.container{
  position: auto;
}
</style>