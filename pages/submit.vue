<template>
  <div class="grey lighten-3">
    <v-row >
      <!--Column 1-->
      <v-col cols="3" class="col-1 grey lighten-3" height="100%"></v-col>

      <!--Column 2-->
      <v-col cols="6" class="col-2 white black--text">
        <br>
        <p class="display-1">Thank you for giving the exam.</p>
        <span class="display-1">Your Score is 
          <h1 v-for="(Questions,index) in CorrectAnswer" :key="index" class="display-4">
            {{Questions.correct}}
          </h1>
        </span>
      </v-col>

      <!--Column 3-->
      <v-col cols="3" class="col-3 grey lighten-3">
            <!-- <v-btn depressed small color="primary" class="ma-5" @click="Firestoreupdate">Submit</v-btn> -->
            <nuxt-link to="/"><v-btn depressed small color="primary" class="ma-5">Exam Page</v-btn></nuxt-link>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import db from '../plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

export default {
    computed:{
        ...mapGetters({
          CorrectAnswer: 'submit/getCorrectAns'
        }),
    },
    methods:{
        JustChecking(){
            console.log();
        }
    },
    created() {
     this.$store.dispatch("submit/fetchScore");
    //  alert("Created Invoked");
    },
    beforeDestroy() {
     this.$store.dispatch("submit/clearList");
    }
    // destroyed() {
    //   alert("Destroyed invoked");
    // }
    
}
</script>

<style>

</style>