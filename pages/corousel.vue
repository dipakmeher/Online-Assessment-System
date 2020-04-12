
<template>
    <v-content>
        <!-- <v-card class="mb-4">
        <v-card-text>
            <v-select
            v-model="steps"
            :items="[2, 3, 4, 5, 6]"
            label="# of steps"
            ></v-select>
        </v-card-text>
        </v-card> -->
        
        <v-stepper v-model="e1">
        <v-stepper-header>
          <template v-for="(Questions,index) in projects">
            <v-stepper-step
          :key="Questions.Question"
          :complete="e1 > index"
          :step="index+1"
          editable
        >
          Step {{ index +1 }}
        </v-stepper-step>

        <v-divider
          v-if="index+1 !== steps"
          :key="index"
        ></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <!-- <div > -->
            <v-stepper-content
            v-for="(Questions,index) in projects" :key="index"
            :b="counter"
            :step="index+1"
            >
            <br>
            <v-card class="mx-auto" max-width="100%" raised >
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

            <v-btn
                color="primary"
                @click="nextStep(index+1)"
            >
                Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
        
            </v-stepper-content>
         
            <v-btn depressed small color="primary" class="ma-5" @click="Firestoreupdate()">Submit</v-btn>

        </v-stepper-items>
        </v-stepper>
    </v-content>
</template>
<script>
import db from '../plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

  export default {
    data () {
      return {
        e1: 1,
        chosen:[],
        counter:1,
        step:1
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
      }
    },
    created() {
        this.$store.dispatch("fetchCategories"); 
    }
  }
</script>