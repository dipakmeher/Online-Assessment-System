<template>
  <v-content class="primary" style="position:relative;">
    <v-app-bar app>
      <v-card flat class="navbar text-center display-1 font-weight-bold"  >
            <p class="ma-1">Gita Contest</p>
      </v-card>
    </v-app-bar>
    <v-stepper class="stepper" v-model="e1">
    <v-row>
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
            Step {{ index }}
          </v-stepper-step>

        </template>
      </v-stepper-header>
        </v-card>
        </v-col>
    </v-row>
    <!-- Bottom Button Card -->
      <v-card width="60%" flat style="bottom:10px;position:absolute;">
        <v-btn depressed color="primary" class=" submit" @click="overlay1=!overlay1">Submit</v-btn>
      </v-card>  
     </v-stepper>
     <v-overlay :value="overlay" :opacity="opacity" :absolute="absolute">
      <v-card raised light class="mx-auto white text--black" max-height="800px">
        <v-card-text>
          <span class="title indigo--text">Thank you very much... <br> Results will be announced soon</span>   
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <nuxt-link to="/thankyou"><v-btn outlined @click="Firestoreupdate()" class="primary white--text ml-2 mr-2">Click here to submit the test</v-btn></nuxt-link>
        </v-card-actions>
      </v-card>
    </v-overlay>

    <v-overlay :value="overlay1" :opacity="opacity" :absolute="absolute">
      <v-card raised light class="mx-auto white text--black" max-height="800px">
        <v-card-text>
          <span class="title indigo--text">Are you surely want to submit the test?</span>   
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <nuxt-link to="/thankyou"><v-btn outlined @click="Firestoreupdate()" class="primary white--text ml-4">Yes</v-btn></nuxt-link>
          <v-btn outlined @click="overlay1=false" class="primary white--text ml-4">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-content>
</template>
<script>
import db from '../plugins/firebase'
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
      opacity:1
      }
    },
     created() {
    this.$store.dispatch("fetchCategories");
    this.timeLimit = this.$store.state.assessment.time;
  },
  mounted() {
    this.startTimer();
  },
    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
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
        this.$store.dispatch("UpdateAnswers", this.chosen).then(()=>{
        // this.$store.dispatch("assessment/fetchSubAns");
      });
    },
      startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
        console.log("Timer Interval",this.timePassed);
    }
    },
    computed:{
    ...mapGetters({
        projects: 'getValue',
        steps:'getlen'
    }),
    timeLeft() {
      return this.timeLimit - this.timePassed
    },

    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      if(timeLeft == 0){
        clearInterval(this.timerInterval);
        // this.overlay = !this.overlay;
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
.submit{
  position: absolute;
    bottom: 0px;
    right: 0px; 
    margin-right: 80px;
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
  /* .timer-card{
    position: fixed;
  } */
.question-no{
  position: fixed;
}
</style>