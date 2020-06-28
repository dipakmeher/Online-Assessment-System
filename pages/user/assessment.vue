<template>
  <v-main class="primary" style="position:relative;">
    <v-app-bar app>
      <v-card flat class="navbar text-center display-1 font-weight-bold"  >
            <p class="ma-1">Gita Contest</p>
      </v-card>
    </v-app-bar>
    <v-stepper class="stepper" v-model="e1">
      <v-row class="hidden-sm-and-down">
        <v-col cols="7">
          <v-stepper-items>
            <v-stepper-content
              v-for="(Questions,index) in projects" :key="index+1"
              :step="index+1"
              :id="index+1"
            >
              <v-card class="mx-auto" max-width="100%" flat >
                <v-card-text>
                  <p class="title">Q.{{index+1}}</p>
                  <p class="display-1 text--primary display-1 font-weight-medium">
                    {{Questions.Question}}
                  </p>
                  <br>
                  <div class="radio radio-primary" v-if="Questions.type === 'Objective'"> 
                    <label v-for="(choice,index1) in Questions.Choices" v-bind:key="index1"  class="title font-weight-bold">
                      <input type="radio" :name="Questions.Question" :id=" 'radio-' + index" :value='choice' v-model="chosen[Questions.Question]"  />
                      {{choice}}
                      <br/>
                    </label>
                  </div>
                  <div v-else>
                    <v-textarea
                      label="Write your answer here"
                      auto-grow
                      outlined
                      rows="1"
                      row-height="10"
                      shaped
                      v-model="chosen[Questions.Question]"
                    ></v-textarea>
                  </div>
                </v-card-text>
              </v-card>

              <v-btn small depressed color="primary" @click="nextStep(index+1)">
                Continue
              </v-btn> 

              <v-btn small depressed class="primary" @click="clearResponse(Questions.Question)">Clear Response</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-col>

        <v-col cols="5">
          <!-- Timer Card -->
          <v-card outlined class="ma-10 timer-card" min-height="110px"> 
            <p class="subtitle-2 text-center">Time Left:-</p>
            <p class="display-2 text-center" style="">{{ formattedTimeLeft }}</p>
          </v-card>
          <v-card flat class="ma-10 my-auto question-no">
            <v-stepper-header style="height:100%">
              <template v-for="(Questions,index) in projects">
                <v-stepper-step
                  :key="index+1"
                  :complete="e1 > index"
                  :step="index+1"
                  editable
                >
                  Q.{{ index }}
                </v-stepper-step>

              </template>
            </v-stepper-header>
          </v-card>
        </v-col>
      </v-row>

    <!-- For small screen -->
    <div class="hidden-md-and-up">
      <v-row>
        <v-col cols="12">
        <!-- Timer Card -->
          <v-card outlined class="ma-10 timer-card" min-height="110px"> 
            <p class="subtitle-2 text-center">Time Left:-</p>
            <p class="display-2 text-center" style="">{{ formattedTimeLeft }}</p>
          </v-card>
          <v-card flat class="ma-10 my-auto question-no">
            <v-stepper-header style="height:100%">
              <template v-for="(Questions,index) in projects">
                <v-stepper-step
                  :key="index+1"
                  :complete="e1 > index"
                  :step="index+1"
                  editable
                >
                  Q.{{ index }}
                </v-stepper-step>
              </template>
            </v-stepper-header>
          </v-card>
        <!-- Timer Card Ends -->
          <v-stepper-items>
            <v-stepper-content
              v-for="(Questions,index) in projects" :key="index+1"
              :step="index+1"
              :id="index+1"
            >
              <v-card class="mx-auto" max-width="100%" flat >
                    <v-card-text>
                      <p class="title">Q.{{index+1}}</p>
                      <p class="display-1 text--primary display-1 font-weight-medium">
                        {{Questions.Question}}
                      </p>
                      <br>
                      <div class="radio radio-primary" v-if="Questions.type === 'Objective'"> 
                        <label v-for="(choice,index1) in Questions.Choices" v-bind:key="index1"  class="title font-weight-bold">
                          <input type="radio" :name="Questions.Question" :id=" 'radio-' + index" :value='choice' v-model="chosen[Questions.Question]"  />
                          {{choice}}
                          <br/>
                        </label>
                      </div>
                      <div v-else>
                        <v-textarea
                          label="Write your answer here"
                          auto-grow
                          outlined
                          rows="1"
                          row-height="10"
                          shaped
                          v-model="chosen[Questions.Question]"
                        ></v-textarea>
                      </div>
                    </v-card-text>
                  </v-card>

              <v-btn small depressed color="primary" @click="nextStep(index+1)">
                Continue
              </v-btn> 

              <v-btn small depressed class="primary" @click="clearResponse(Questions.Question)">Clear Response</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-col>
      </v-row>
    </div>
    <!-- Bottom Button Card -->
    <v-card flat class="bottombtncard success" width="10%">
      <v-btn depressed color="primary" class=" submit" @click="overlay1=!overlay;isPaused=!isPaused">Submit</v-btn>
    </v-card> 
      <!-- <v-btn depressed color="primary" class=" submit hidden-md-and-up" @click="overlay1=!overlay;isPaused=!isPaused">Submit</v-btn> -->
    <!-- Bottom Button Card ends -->
     </v-stepper>
     <v-overlay :value="overlay" :opacity="opacity" :absolute="absolute">
      <v-card raised light class="mx-auto white text--black" max-height="800px">
        <v-card-text>
          <span class="title indigo--text">Thank you very much... <br> Results will be announced soon</span>   
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions v-if="claim">
            <nuxt-link to="/admin"><v-btn outlined class="primary white--text ml-2 mr-2">Click here to submit the test</v-btn></nuxt-link>
        </v-card-actions>
         <v-card-actions v-else>
            <nuxt-link to="/user"><v-btn outlined class="primary white--text ml-2 mr-2">Click here to submit the test</v-btn></nuxt-link>
        </v-card-actions>    

      </v-card>
    </v-overlay>

    <v-overlay :value="overlay1" :opacity="opacity" :absolute="absolute">
      <v-card raised light class="mx-auto white text--black" max-height="800px">
        <v-card-text>
          <span class="title indigo--text">Are you surely want to submit the test?</span>   
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions v-if="claim">
          <nuxt-link to="/admin"><v-btn outlined @click="Firestoreupdate()" class="primary white--text ml-4">Yes</v-btn></nuxt-link>
          <v-btn outlined @click="overlay1=false;isPaused=!isPaused" class="primary white--text ml-4">Cancel</v-btn>
        </v-card-actions>
         <v-card-actions v-else>
          <nuxt-link to="/user"><v-btn outlined @click="Firestoreupdate()" class="primary white--text ml-4">Yes</v-btn></nuxt-link>
          <v-btn outlined @click="overlay1=false;isPaused=!isPaused" class="primary white--text ml-4">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-main>
</template>
<script>
import db from '@/plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
  export default {
      layout:'blog',
    data () {
      return {
        e1: 1,  
        id:'',
        chosen:[],
      counter:1,
      timeLimit:0,
      timePassed: 0,
      timerInterval: null,
      absolute: true,
      overlay:false,
      overlay1:false,
      opacity:1,
      isPaused:false,
      }
    },
    async created() {
    // this.$store.dispatch("fetchCategories");
    this.timeLimit = this.$store.state.assessment.time;
   
  },
  mounted() {
    this.startTimer();
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.$store.commit("updateStartTime",time);
  },
    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      }
    },

    methods: {
        clearResponse(name){
            var ele = document.getElementsByName(name);
            for(var i=0;i<ele.length;i++)
                ele[i].checked = false;
        },
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
       Firestoreupdate(){
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.$store.commit("updateEndTime",time);
        this.$store.dispatch("UpdateAnswers", this.chosen).then(()=>{
         //this.$store.dispatch("assessmentFirestoreupdate/fetchSubAns");
      });
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        if(!this.isPaused){
        (this.timePassed += 1)
        }
      }, 1000);
    },
    },
    computed:{
    ...mapGetters({
        projects: 'getValue',
        steps:'getQlen',
        claim:'users/getClaim'
    }),
    timeLeft() {
      return this.timeLimit - this.timePassed
    },

    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      if(timeLeft == 0){
        clearInterval(this.timerInterval);
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.$store.commit("updateEndTime",time);
        this.$store.dispatch("UpdateAnswers", this.chosen)
        this.overlay = !this.overlay;
      }
      const hours = Math.floor(timeLeft /60/60);

      // The largest round integer less than or equal to the result of time divided being by 60.
      const minutes = Math.floor(timeLeft / 60)
      // Seconds are the remainder of the time divided by 60 (modulus operator)
      let seconds = timeLeft % 60
      // If the value of seconds is less than 10,then display seconds with a leading zero
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${hours}:${minutes}:${seconds}`
    }
    }
  }
</script>
<style scoped>
.examfooter{
position: fixed;
  /* margin-top:10%;
  margin-left: 80%; */
}

.continue{
  position: absolute;
    bottom: 0px;
    left: 0px; 
    margin-left: 10px;
}
.stepper{
  margin:30px;
  height:90%;position: relative;
}
.navbar{
  text-align: center;
  width:100%;
}
.question-no{
  position: relative;
}

@media only screen and (min-width: 960px) {
 .submit{
    position: absolute;
    bottom: 0px;
    right: 0px; 
}
  .bottombtncard{
    bottom:10px;
    margin-left: 45%;
    position: absolute;
  }
} 
@media only screen and (max-width: 959px) {
 .submit{
    position: relative;
  }
  .bottombtncard{
    bottom:25px;
    margin-left:35%;
  }
} 
</style>