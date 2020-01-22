<template>
  <div>
    <v-row >
      <!--Column 1-->
      <v-col cols="3" class="col-1 grey lighten-3"></v-col>

      <!--Column 2-->
      <v-col cols="6" class="col-2 white">
        <v-container fluid v-for="project in projects" :key="project.id">
          <v-card class="mx-auto" max-width="800" >
            <v-card-text>
              <p class="display-1 text--primary">
                {{project.Question1.Question}}
              </p>          
              <v-radio-group :mandatory="false" v-model="picked">
                <v-radio v-for="choice in project.Question1.Choices" :key="choice" v-bind:label="choice" v-bind:value="choice" color="white"></v-radio>
              </v-radio-group>
              <span>Picked: {{ picked }}</span>
            </v-card-text>
            <v-btn depressed small color="primary" class="ma-5" @click="Firestoreupdate">Submit</v-btn>
          </v-card>
        </v-container>
      </v-col>
      <!--Column 3-->
      <v-col cols="3" class="col-3 grey lighten-3"></v-col>
    </v-row>
  </div>
</template>

<script>
//import firebase from '../plugins/firebase'
import db from '../plugins/firebase'
export default {
  data() {
    return {
      projects: [],
      picked:''
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
  },
  methods:{
    Firestoreupdate(){
      console.log(this.projects);
      console.log(this.projects[0].Question1.Question);

        db.collection('Assessment').doc('Book-Distribution').update({
          "Question1":{
            "Answer": this.picked,
            "Choices": this.projects[0].Question1.Choices,
            "Question":this.projects[0].Question1.Question
        }
      });
    }
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
    height:1000px;
}
.radio{
  background: "#212121";
}
</style>