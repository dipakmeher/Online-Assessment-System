<template>
  <div>
    <v-row >
      <!--Column 1-->
      <v-col cols="3" class="col-1 grey lighten-3" height="100%">Hare Krishna</v-col>

      <!--Column 2-->
      <v-col cols="6" class="col-2 white">
        <v-container fluid v-for="Questions in projects" :key="Questions.Question">
          <v-card class="mx-auto" max-width="800" >
            <v-card-text>
              <p class="display-1 text--primary">
                {{Questions.Question}}
              </p>          
              <div class="radio radio-primary"> 
                <label v-for="choice in Questions.Choices" v-bind:key="choice['c1']">
                  <input type="radio" :name="
                  Questions.Question" id="radio" :value="choice" v-model="selectedrole"/>
                  {{choice}}
                  <br/>
                </label>                          
              </div>
              <!-- <span>Picked: {{ picked  }}</span> -->
            </v-card-text>
            <!-- <v-btn depressed small color="primary" class="ma-5" @click="Firestoreupdate">Submit</v-btn> -->
          </v-card>
        </v-container>
      </v-col>

      <!--Column 3-->
      <v-col cols="3" class="col-3 grey lighten-3"></v-col>
    </v-row>
  </div>
  <!-- <v-radio-group :mandatory="false" v-model="picked">
                <v-radio v-for="choice in Questions.Choices" :key="choice['c1']" v-bind:label="choice" v-bind:value="choice" color="white" v-on:click="addRadio(Questions)"></v-radio>
              </v-radio-group>
                    <input type="radio" :name= "Questions" id="radio" :value= choice v-on:click="update" v-model="selectedrole"/>
 -->
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
             selectedrole:""
    }
  },
  computed:{
      ...mapGetters({
          projects: 'get'
      })
      // ...mapState([
      //   'projects'
      // ])
  },
  methods:{
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
