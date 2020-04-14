
<template>
    <v-content class="primary"  style="position:relative;">
     <v-app-bar app>
    <h1>Gita Contest</h1>
    </v-app-bar>
      <v-stepper class="" v-model="e1" style="width:100%;height:90%;position:absolute;">
      <v-row class="parent"> 
        <v-col cols="7">

 <v-stepper-items>
          <!-- <div > -->
            <v-stepper-content
            v-for="(Questions,index) in projects" :key="index"
            :b="counter"
            :step="index+1"
            >
            <br>
            <v-card class="mx-auto" max-width="100%" flat >
              <v-card-text>
                <p class="display-1 text--primary">
                  {{index}} <br>{{Questions.Question}}
                </p>
                  <div class="radio radio-primary" v-if="Questions.type === 'Objective'"> 
                    <label v-for="(choice,index1) in Questions.Choices" v-bind:key="index1">
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
                    rows="1 "
                    row-height="10"
                    shaped
                    v-model="chosen[Questions.Question]"
                  ></v-textarea>
                </div>
                </v-card-text>
            </v-card>

            </v-stepper-content>
        </v-stepper-items>
        
        </v-col>  
        <v-col cols="5">
          <v-card outlined class="ma-10" style="height:30%"> 
            <p class="display-2 text-center" style="">{{ formattedTimeLeft }}</p>
          </v-card>
          <v-card flat class="ma-10 my-auto" style="position:absolute;">
           <v-stepper-header style="height:100%">
          <template v-for="(Questions,index) in projects">
            <v-stepper-step
          :key="Questions.Question"
          :complete="e1 > index"
          :step="index+1"
          editable
        >
          Step {{ index +1 }}
        </v-stepper-step>
          </template>
        </v-stepper-header>
        </v-card>
        </v-col>
        
      </v-row>
    <v-card width="60%" flat style="bottom:10px;position:absolute;">
          
            <v-btn depressed color="primary" class="continue" @click="nextStep(index+1)">Continue</v-btn>
            <v-btn depressed color="primary" class=" submit" @click="Firestoreupdate()">Submit</v-btn>
        </v-card>  
    </v-stepper>
    </v-content>
</template>
<script>
import db from '../plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

  export default {
    layout:'blog',
    data () {
      return {
        e1: 1,
        chosen:[],
        counter:1,
        step:1,
        timeLimit:10,
        timePassed: 0,
        timerInterval: null,
      }
    },

    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
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
        console.log("FormattedTime Ran");
        const timeLeft = this.timeLeft;
        if(timeLeft == 0){
            clearInterval(this.timerInterval);
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
        // if (minutes < 10) {
        //     minutes = `0${minutes}`
        // }
        // if (hours < 10) {
        //     hours = `0${hours}`
        // }
        // The output in MM:SS format
        return `${hours}:${minutes}:${seconds}`
        }
    },

    methods: {
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
      Firestoreupdate(){
        this.$store.dispatch("UpdateAnswers", this.chosen);
      },
      check(){
        console.log(this.state);
      },
      updatecounter(val){
         if(val <= this.steps){
          console.log("counter",this.counter);
          return this.counter++;
         }else{
           return this.counter == this.steps ;
         }
      },
      startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
        console.log("Timer Interval",this.timePassed);

    }
    },
    created() {
        this.$store.dispatch("fetchCategories"); 
    },
    mounted() {
    this.startTimer();
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
</style>