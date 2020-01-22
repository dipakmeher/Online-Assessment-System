<template>  
   <div class="projects">
       <v-card class="mx-auto mt-1" max-width="344">
            <v-card-text>
            <p class="display-1 text--primary">
               Contact-Details
            </p>
            </v-card-text>
        </v-card>
        <div id="cafelist">
            <v-card v-for="project in projects" :key="project.id" class="mx-auto mt-1" max-width="344" :id="project.id">
                <v-card-text class="parent">
                <v-btn class="outlined child" v-on:click="Delete(project.id)">x</v-btn>
                <div>Name:- </div>
                <div class="display-1 text--primary">
                    {{project.Question1.Question}}
                </div>
                <div>Contact Number:-</div>
                <div class="text--primary title">
                    {{project.Question1.Choices['c1']}}
                </div>
                <div class="text--primary title">
                    {{project.Question1.Choices['c2']}}
                </div>
                <div class="text--primary title">
                    {{project.Question1.Choices['c3']}}
                </div>    
                </v-card-text>
            </v-card>
        </div>
   </div>
</template>
 
<script>
import db from '../plugins/firebase.js'
// const cafelist = document.querySelector('projects');
export default {
  data() {
    return {
      projects: []
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

  methods: {
    Delete(id){
          // const cafelist = document.querySelector('#cafe-list');
          console.log(id);
          if(confirm('Are you sure? ')){
            db.collection('Assessment').doc(id).delete().then(() => {
              var parent = document.getElementById('cafelist');
              var child = document.getElementById(id);
              parent.removeChild(child);
              console.log("Documents Succesfully Deleted");
             }).catch(function(error){
               console.error("Error Removing Documents: ",error);
             });
          }else{
          }
      },
  }
}

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
</style>