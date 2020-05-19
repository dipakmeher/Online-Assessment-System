<template>
  <v-content>
      <v-card class="main-card" min-width="60%" min-height="50%"> 
        <v-toolbar color="primary darken-2" dark flat>
          <v-toolbar-title class="addquestion display-1 font-weight-medium">Add Question</v-toolbar-title> 
        </v-toolbar>
              
        <v-form ref="form" style="color:black;" class="ma-6">
          <v-text-field light :counter="10" v-model="question" label="Question" prepend-icon="question_answer" required></v-text-field>

          <v-select v-model="variant" prepend-icon="double_arrow" :items="items" clearable label="Type of Question" light></v-select>
          <v-expansion-panels class="white" light >
            <v-expansion-panel id="Choice" v-if= "variant === 'Objective'">
              <v-expansion-panel-header>Fill 4 choices</v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="3">
                    <v-text-field light single-line outlined v-model="c1" label="c1" class="t1" required></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field light single-line outlined v-model="c2" label="c2" class="t1" required></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field light single-line outlined v-model="c3" label="c3" class="t1" required></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field light single-line outlined v-model="c4" label="c4" class="t1" required></v-text-field>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-if= "variant === 'Subjective'" style="display:none;" id="Text" light> 
              <v-expansion-panel-header>Textual Answers</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field light v-model="youranswer" label="Your Answer" required></v-text-field>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-text-field light :counter="10" v-model="answer" label="Answer" prepend-icon="library_books" required></v-text-field>
          <v-btn class="primary darken-2 add-btn" @click="addData()">Add Question</v-btn>
        </v-form>
     </v-card>
  </v-content>
</template>

<script>
import db from '@/plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
import { uuid } from 'vue-uuid';
export default {
  layout:'adminlayout',
  data() {
    return {
        name: '',
        nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      question:'',
      c1:'',c2:'',c3:'',c4:'',youranswer:'',
      answer:'',
      items: [
        'Subjective',
        'Objective',
      ],
      variant: ' '
    }
  },
  methods:{
    addData(){   
      if(this.$refs.form.validate()){
        if(this.variant === "Objective"){
          var newquestion={
            [uuid.v1()]:{
              Question:this.question,
              type:this.variant,
              Qid:uuid.v1(),
              Choices:{
                c1:this.c1,
                c2:this.c2,
                c3:this.c3,
                c4:this.c4
              },
              Answer:this.answer
            }
          }
        }else if(this.variant === "Subjective"){
          var newquestion={
            [uuid.v1()]:{
              Question:this.question,
              Qid:uuid.v1(),
              type:this.variant,
              Answer:""
            }
          }
        }
      db.collection("Master-Bank").doc("Master-Bank").get().then(querySnapshot => {
        if (querySnapshot.empty) {
          //this.$router.push('/HelloWorld')
        } else {
          var xyz = JSON.stringify(querySnapshot.data());
          var abc = xyz.substr(0, xyz.length - 1); 
          var newarray= abc.concat(",");
          var que = JSON.stringify(newquestion);
          que = que.substring(1);
          var newarray1 = newarray.concat(que);
           //console.log(que);
          db.collection("Master-Bank").doc("Master-Bank").set(JSON.parse(newarray1))
          .then(()=>{ 
            alert("Form Submitted");
             this.$refs.form.reset();
          })
        }
      })
    }
  }
}
}   
</script>

<style>
.main-card{
  margin-left: 80px;
  margin-top: 20px;
  position: fixed;
  overflow: auto;
}
.add-btn{
  margin-left: 38%;
}
.t1{
  width: 150px;
}
</style>