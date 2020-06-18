<template>
  <v-main>
    <!-- <v-card class="evaluate-btn text-center" max-height="50px" max-width="110px">
      <v-card-title>Results</v-card-title> 
    </v-card> -->
    <v-container class="container">
        <v-app-bar class="yellow lighten-4 smallnav">
          <v-toolbar-title class="text-center display-1 font-weight-bold">Results</v-toolbar-title>
        </v-app-bar>
        <v-card class="scrollmenu hidden-sm-and-down" height="300px" flat>
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

        <!--for small screen  -->
        <v-card class="scrollmenu hidden-md-and-up" height="300px" flat>
          <v-list>
            <v-row>
              <v-list-item
                v-for="(Questions,index) in projects"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-center text-sm-h5 text-subtitle-1"> {{index}}</v-list-item-title>
                  <v-list-item-title class="text-center">
                  <v-chip class="red" v-if="Questions.score <= 1" text-color="white">Score = {{Questions.score}}</v-chip>  
                  <v-chip class="yellow" v-else-if="Questions.score <= 2" text-color="primary darken-4"> Score = {{Questions.score}}</v-chip>  
                  <v-chip v-else class="green darken-4" text-color="white">Score = {{Questions.score}}</v-chip>
                  <v-chip class="red" v-if="Questions.nature === 'Ignorance'" text-color="white">Nature = {{Questions.nature}}</v-chip>  
                  <v-chip class="yellow" v-else-if="Questions.nature === 'Passion'" text-color="primary darken-4">Nature = {{Questions.nature}}</v-chip>  
                  <v-chip class="green darken-4" v-else text-color="white">Nature = {{Questions.nature}}</v-chip>  
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-row>
            <!-- </v-list-item-group> -->
            
          </v-list>
        </v-card>
        <!--for small screen  -->
     </v-container>
  </v-main>
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
  position: relative;
}
.smallnav{
  width:90%;
}
.scrollmenu{
  width:90%;
}
</style>