<template>
  <v-content style="position:relative;">
    <v-stepper class="stepper" v-model="e1">
    <v-row>
        <v-col cols="7">
      <v-stepper-items id="cafelist" >
        <v-stepper-content
          v-for="(Questions,index) in projects" :key="index+1"
          :step="index+1"
           :id="index+1"
        >
      
           <v-card class="mx-auto" max-width="100%" flat  >
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
          <v-btn small depressed color="primary" @click="Delete(index+1);created();">
            Delete
          </v-btn> 

          <v-btn small depressed class="primary" @click="clearResponse(Questions.Question)">Clear Response</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-col>
    </v-row>
    <!-- Bottom Button Card -->
      <v-card width="60%" flat style="bottom:10px;position:absolute;">
        <v-btn depressed color="primary" class=" submit" @click="overlay1=!overlay1">Submit</v-btn>
      </v-card>  
     </v-stepper>
  </v-content>
</template>
<script>
import db from '../plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
  export default {
      layout:'adminlayout',
    data () {
      return {
        e1: 1,  
        id:'',
        a:'',
        chosen:[],
      counter:1,
      timeLimit:30,
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
         Delete(index){
          this.$store.dispatch("DeleteQuestion",index);
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
        this.$store.dispatch("assessment/fetchSubAns");
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
  height:70%;
  width:67%;
  position: fixed;
  overflow: auto;
}
.navbar{
  text-align: center;
  width:100%;
}
.question-no{
  overflow: auto;
  position:fixed;
}
</style>