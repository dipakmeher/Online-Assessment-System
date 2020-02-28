<template>
  <div>
    <h1>Thank You for giving exam.</h1>
    <h3>Your Score is:- </h3>
    <h1  v-for="(Questions,index) in CorrectAnswer" :key="index"> 
        {{Questions.correct}}
    </h1>
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
    }
    
}
</script>

<style>

</style>