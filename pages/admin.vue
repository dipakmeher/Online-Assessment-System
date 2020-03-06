<template>
  <div class="grey lighten-3">
    <v-row >
      <!--Column 1-->
      <v-col cols="3" class="col-1 grey lighten-3" height="100%">
        <h1>Col1</h1>
      </v-col>

      <!--Column 2-->
      <v-col cols="6" class="col-2 white">

        <v-form ref="form" style="color:black;">
          <v-text-field light :counter="10" :rules="nameRules" questionno="questionno" label="Question-No" required></v-text-field>
          <v-text-field light :counter="10" :rules="nameRules" question ="question" label="Question" required></v-text-field>
         
         <label for="Choice">Choices(please double click the following options, to fill respective answers) </label>
          <div style="margin-left:10px;">
            <label @click="chooseForm()">
            <input type="radio" id="choice" value="choice" v-model="picked"  >
            Choices</label>
            <br>
            <label @click="chooseForm()">
            <input type="radio" id="text" value="text" v-model="picked">
            Text</label> 
            <br>
            <!-- <span>Picked: {{ picked }}</span> -->
          </div>
         <br>
          <v-expansion-panels class="white" light>

            <v-expansion-panel id="Choice" style="display:none;">
              <v-expansion-panel-header>Filled 4 choices</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="3">
                    <v-text-field light single-line outlined c1="c1" label="c1" required></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field light single-line outlined c2="c2" label="c2" required></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field light single-line outlined c3="c3" label="c3" required></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field light single-line outlined c4="c4" label="c4" required></v-text-field>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

              <v-expansion-panel id="Text" style="display:none" light> 
                <v-expansion-panel-header>Textual Answers</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field light youranswer="youranswer" label="Your Answer" required></v-text-field>
                </v-expansion-panel-content>
               </v-expansion-panel>
          </v-expansion-panels>

          <br>
          <v-text-field light :counter="10" :rules="nameRules" answer="answer" label="Answer" required></v-text-field>

        </v-form>
      </v-col>

      <!--Column 3-->
      <v-col cols="3" class="col-3 grey lighten-3">
        <v-btn depressed small color="primary" class="ma-5" @click="addData()">Add Data</v-btn>
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
  data() {
    return {
        disabled: 1,
        picked:'',
        name: '',
        nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      questionno:'',
      question:'',
      c1:'',c2:'',c3:'',c4:'',youranswer:'',
      answer:''
    }
  },
  methods:{
    chooseForm(){
      var choice = document.getElementById("Choice");
     var text = document.getElementById("Text");

      console.log();
      if(this.picked == 'choice'){
        
      console.log("Function run");

      // console.log(choice);
      if(choice.style.display == "none"){
        choice.style.display = "block";
        text.style.display = "none";      }

      }else if(this.picked == 'text'){
        console.log("text fuction run");
      // console.log(choice);
      if(text.style.display == "none"){
        text.style.display = "block";
        choice.style.display = "none";      }
      }
    },
    addData(){
      //  if(this.$refs.form.validate()){
      //     const project = {
      //       Question:this.name,
      //       contactnumber:this.number
      //     }
    }

  }
}
</script>

<style>
.col-1,.col-2,.col-3{
    height:auto;
}
</style>