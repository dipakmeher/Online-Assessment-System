<template>
  <div>
    <v-row >
      <!--Column 1-->
      <v-col cols="3" class="col-1 grey lighten-3" height="100%"></v-col>

      <!--Column 2-->
      <v-col cols="6" class="col-2 white">
        <v-container fluid v-for="Questions in projects[0]" :key="Questions.Question">
          <v-card class="mx-auto" max-width="800" >
            <v-card-text>
              <p class="display-1 text--primary">
                {{Questions.Question}}
              </p>          
              <div class="radio radio-primary"> 
                <label v-for="choice in Questions.Choices" v-bind:key="choice['c1']">
                  <input type="radio" :name="Questions.Question" id="radio" :value="choice" v-model="selectedrole"/>
                  {{choice}}
                  <br/>
                </label>                          
              </div>
              <!-- <span>Picked: {{ picked  }}</span> -->
            </v-card-text>
            <v-btn depressed small color="primary" class="ma-5" @click="Firestoreupdate">Submit</v-btn>
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
var dict = new Object();
var dict= {};


export default {
  data() {
    return {
      projects: [],
      dict:{},
      selectedrole:""
    }
  },
  methods:{
    Firestoreupdate(){
      db.collection('Assessment').doc('Book-Distribution').update({
          "Question1":{
            "Answer": this.picked,
            "Choices": this.projects[0].Question1.Choices,
            "Question":this.projects[0].Question1.Question
        }
      });
    },
    addRadio(Questions){
      dict[Questions]=this.picked;
      console.log(dict[Questions]);
    }
  },
  created() {
    db.collection('Assessment').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if(change.type === 'added') {  
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }  
      })
    });
    console.log(this.projects);
  }
}
 
          // "Question1":{
          //   "Question":"who is krsna",
          //   "Answer": this.picked,  
          //   "Choices":{
          //     "c1":"SPOG",
          //     "c2":"Just a king",
          //     "c3":"Demigod",
          //     "c4":"None of These"
          //   }
</script>
<style scoped>
.col-1,.col-2,.col-3{
    height:auto;
}
.radio{
  background: "#212121";
}
</style>