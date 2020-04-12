<template>
  <div>
    <v-row >
      <!--Column 1-->
      <v-col cols="3" class="col-1 grey lighten-3" height="100%"></v-col>

      <!--Column 2-->
      <v-col cols="6" class="col-2 white">
        <v-container fluid v-for="(Questions,index) in projects" :key="index">
          <v-card class="mx-auto" max-width="800" >
            <v-card-text>
              <p class="display-1 text--primary">
                {{index}} <br>{{Questions.Question}}
              </p>          
              <div class="radio radio-primary"> 
                <label v-for="(choice,index1) in Questions.Choices" v-bind:key="index1">
                  <input type="radio" :name="Questions.Question" :id=" 'radio-' + index" :value='choice' v-model="chosen[index]"  />
                  {{choice}}
                  <br/>
                </label>
              </div>
              <!-- <v-btn depressed small color="primary" class="  " @click="remind = null">Clear Response</v-btn> --> 
              </v-card-text>
            <!-- <v-btn depressed small color="primary" class="ma-5" @click="Firestoreupdate">Submit</v-btn> -->
          </v-card>
          </v-container>
        </v-col>

      <!--Column 3-->
      <v-col cols="3" class="col-3 grey lighten-3">
            <!-- <v-btn depressed small color="primary" class="ma-5" @click="Firestoreupdate">Submit</v-btn> -->
            <v-btn depressed small color="primary" class="ma-5" @click="Firestoreupdate()">Submit</v-btn>

      </v-col>
    </v-row>
  </div>
</template>

<script>
//import firebase from '../plugins/firebase'
import db from '../plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

export default {
  data() {
    return {
        chosen:[]
    }
  },
  computed:{
      ...mapGetters({
          projects: 'get'
          
      }),
  },
  methods:{
    Firestoreupdate(){
      this.$store.dispatch("UpdateAnswers", this.chosen);
      this.$refs.form.reset();
       //window.location.href = "http://localhost:3000/submit";
    }
   },
  created() {
    this.$store.dispatch("fetchCategories"); 
  }
}//default ends
</script>

<style scoped>
.col-1,.col-2,.col-3{
    height:auto;
}
.radio{
  background: "#212121";
}
</style>
