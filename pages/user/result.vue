<template>
  <v-main>
    <!-- <v-card class="evaluate-btn text-center" max-height="50px" max-width="110px">
      <v-card-title>Results</v-card-title> 
    </v-card> -->
    <v-container class="container">
        <v-app-bar class="yellow lighten-4 smallnav">
          <v-toolbar-title class="text-center display-1 font-weight-bold">Results</v-toolbar-title>
        </v-app-bar>
        <v-card class="scrollmenu hidden-sm-and-down" height="100px" flat>
            <v-list>
                <v-row>
                    <v-col cols="6">
                        <v-card flat class="text-center hidden-sm-and-down">
                        <p class="text-h5 font-weight-bold">Name</p>
                        </v-card>
                        <v-card flat class="text-center hidden-md-and-up">
                        <p class="title-1 font-weight-bold">Name</p>
                        </v-card>
                        <v-divider horizontal></v-divider>
                    </v-col>
                
                    <v-col cols="3">
                        <v-card flat class="text-center hidden-sm-and-down">
                        <p class="text-h5 font-weight-bold">Score</p>
                        </v-card>
                        <v-divider horizontal></v-divider>
                    </v-col>
                    <v-col cols="3">
                         <v-card flat class="text-center hidden-sm-and-down">
                        <p class="text-h5 font-weight-bold">Nature</p>
                        </v-card>
                        <v-divider horizontal></v-divider>
                    </v-col>
                
                </v-row>
                <v-row>
                    <v-list-item
                    v-for="(Questions,index) in projects"
                    :key="index"
                    >
                        <v-col cols="6">
                            <v-list-item-content>
                                <v-list-item-title class="text-center"> {{Questions.displayName}}</v-list-item-title>
                            </v-list-item-content>
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col cols="3" >
                            <v-list-item-content class="ml-5">
                                <v-list-item-title v-if="Questions.score <= 1" class="text-center">
                                <v-chip class="red" text-color="white">{{Questions.score}}</v-chip>  
                                </v-list-item-title>
                                <v-list-item-title v-else-if="Questions.score <= 2" class="text-center">
                                <v-chip class="yellow" text-color="primary darken-4">{{Questions.score}}</v-chip>  
                                </v-list-item-title>
                                <v-list-item-title v-else class="text-center">
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
                            <v-list-item-title v-else-if="Questions.nature === 'Goodness'">
                                <v-chip class="green darken-4" text-color="white">{{Questions.nature}}</v-chip>  
                            </v-list-item-title>
                            <v-list-item-title v-else>
                                <v-chip class="primary lighten-1" text-color="white">{{Questions.nature}}</v-chip>  
                            </v-list-item-title>
                        </v-list-item-content>
                        </v-col>

                    </v-list-item>
                </v-row>
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
                  <v-list-item-title class="text-center text-sm-h5 text-subtitle-1"> {{Questions.displayName}}</v-list-item-title>
                  <v-list-item-title class="text-center">
                  <v-chip class="red" v-if="Questions.score <= 1" text-color="white">Score = {{Questions.score}}</v-chip>  
                  <v-chip class="yellow" v-else-if="Questions.score <= 2" text-color="primary darken-4"> Score = {{Questions.score}}</v-chip>  
                  <v-chip v-else class="green darken-4" text-color="white">Score = {{Questions.score}}</v-chip>

                  <v-chip class="red" v-if="Questions.nature === 'Ignorance'" text-color="white">Nature = {{Questions.nature}}</v-chip>  
                  <v-chip class="yellow" v-else-if="Questions.nature === 'Passion'" text-color="primary darken-4">Nature = {{Questions.nature}}</v-chip>  
                  <v-chip class="green darken-4" v-else-if="Questions.nature === 'Goodness'" text-color="white">Nature = {{Questions.nature}}</v-chip>  
                  <v-chip class="primary lighten-1  " v-else text-color="white">Nature = {{Questions.nature}}</v-chip>  
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
    layout:'userlayout',
    created(){
      this.$store.dispatch("assessment/showUserResult");
    },
    computed:{
        ...mapGetters({
            projects:'assessment/getuserresult',
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
    margin-left: 50px;
    margin-top: 20px;
    position: fixed;
}
.smallnav{
  width:70%;
}
.scrollmenu{
  width:70%;
}
</style>