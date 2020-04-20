<template>
  <v-content>
  <div class="grey lighten-3">
    <v-row >
      <!--Column 1-->
      <v-col cols="3" class="col-1 grey lighten-3" height="100%">
        <h1>Col1</h1>
      </v-col>

      <!--Column 2-->
      <v-col cols="6" class="col-2 white">

        <v-form ref="form" style="color:black;">
          <v-text-field light :counter="10" v-model="question" label="Question" required></v-text-field>

          <v-select v-model="variant" :items="items" clearable label="Type of Question" light></v-select>
          <v-expansion-panels class="white" light >
            <v-expansion-panel id="Choice" v-if= "variant === 'Objective'">
              <v-expansion-panel-header>Fill 4 choices</v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="3">
                    <v-text-field light single-line outlined v-model="c1" label="c1" required></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field light single-line outlined v-model="c2" label="c2" required></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field light single-line outlined v-model="c3" label="c3" required></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field light single-line outlined v-model="c4" label="c4" required></v-text-field>
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

          <v-text-field light :counter="10" v-model="answer" label="Answer" required></v-text-field>

        </v-form>
      </v-col>

      <!--Column 3-->
      <v-col cols="3" class="col-3 grey lighten-3">
        <v-btn depressed small color="primary" class="ma-5" @click="addData()">Add Data</v-btn>
        <nuxt-link to="/admin/delques"><v-btn depressed small color="primary" class="ma-5">Delete Question</v-btn></nuxt-link> 
      </v-col>
    </v-row>
  </div>
  </v-content>
</template>

<script>
import db from '@/plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

export default {
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
            [Date.now()]:{
              Question:this.question,
              type:this.variant,
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
            [Date.now()]:{
              Question:this.question,
              type:this.variant,
              Answer:""
            }
          }
        }
      db.collection("Assessment").doc("Question-Paper").get().then(querySnapshot => {
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
          db.collection("Assessment").doc("Master-Bank1").set(JSON.parse(newarray1))
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
.col-1,.col-2,.col-3{
    height:auto;
}
</style>