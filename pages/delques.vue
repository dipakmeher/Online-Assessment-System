<template>
  <div>
    <v-row >
      <!--Column 1-->
      <v-col cols="3" class="col-1 grey lighten-3" height="100%"></v-col>

      <!--Column 2-->
      <v-col cols="6" class="col-2 white">
        <div id="cafelist">
          <v-container fluid v-for="(Questions,index) in projects" :key="index" :id='index'>
              <v-card class="mx-auto" max-width="800">
                <v-card-text class="parent">
                  <v-btn class="outlined child" v-on:click="Delete(index)">x</v-btn>
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
         </div>
        </v-col>

      <!--Column 3-->
      <v-col cols="3" class="col-3 grey lighten-3">
            <!-- <v-btn depressed small color="primary" class="ma-5" @click="Firestoreupdate">Submit</v-btn> -->
            <v-btn depressed small color="primary" class="ma-5" @click="Firestoreupdate()">Submit</v-btn>
            <nuxt-link to="/addques"><v-btn depressed small color="primary" class="ma-5">Add Question</v-btn></nuxt-link> 
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
        chosen:[],
        id:''
    }
  },
  computed:{
      ...mapGetters({
          projects: 'delques/get'
      }),
  },
  methods:{
    Firestoreupdate(){
      this.$store.dispatch("delques/UpdateAnswers", this.chosen);
      this.$refs.form.reset();
       //window.location.href = "http://localhost:3000/submit";
    },
    Delete(index){
      this.$store.dispatch("delques/DeleteQuestion",index);
    }
  },
  created() {
    this.$store.dispatch("delques/fetchCategories"); 
  }
}//default ends
</script>

<style scoped>
.parent {
	position: relative;
}
.child {
	position: absolute;
	width: 30px;
	height: 30px;

	top: 0;
	right: 0;
}
.col-1,.col-2,.col-3{
    height:auto;
}
.radio{
  background: "#212121";
}
</style>
