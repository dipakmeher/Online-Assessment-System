<template>
  <v-sheet
    class="mx-auto"
    elevation="8"
    max-width="800"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      active-class="success"
      show-arrows
      id="cafelist"
    >
      <v-slide-item
        
        v-slot:default="{ active, toggle }"
        v-for="(Questions,index) in projects" :key="index+1" :id="index+1"
      >
   
        <v-card
          :color="active ? undefined : 'grey lighten-1'"
          class="ma-4"
          height="200"
          width="400"
          @click="toggle" 
        >
         <v-btn class="outlined child" v-on:click="Delete(index+1)">x</v-btn>
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
          {{Questions.Question}}


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

        
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>

          </v-row>
        </v-card>
    
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
import adminlayoutVue from '../layouts/adminlayout.vue'
import db from '../plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
  export default {
      layout:'adminlayout',
    data: () => ({
        id:'',
      model: [],
      chosen:[],
    }),
     created() {
    this.$store.dispatch("fetchCategories"); 
  },
      computed:{
    ...mapGetters({
        projects: 'getValue',
        steps:'getlen'
    }),
    },
    methods:{
        Delete(index){
          this.$store.dispatch("DeleteQuestion",index);
          }
    }
  }
</script>
