<template>
  <v-content>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      Time Updated Successfully.
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-card class="main-card" max-width="400px" :elevation="24">
      <v-toolbar color="primary darken-2" dark flat>
        <v-toolbar-title class="addquestion headline font-weight-medium ">Change The Timings</v-toolbar-title> 
      </v-toolbar>

      <v-card-title>
       <v-form  ref="form">
            <v-row >
            <v-col cols="4">
            <v-text-field outlined v-model="hour" label="hours"
             :rules="rules.name"
            ></v-text-field>
            </v-col>
            <v-col cols="4">
            <v-text-field :rules="rules.name" light outlined v-model="minute" label="minute"></v-text-field>
            </v-col>
            <v-col cols="4">
            <v-text-field :rules="rules.name" light outlined v-model="second" label="seconds"></v-text-field>
            </v-col>
             </v-row>
            
            <v-card class="timing" :elevation="24" max-width="210px" v-if="this.hour || this.minute || this.second">
              <v-card-title class="display-1">{{hour}} : {{minute}} : {{second}}</v-card-title>    
            </v-card>
              <v-btn
              class="updatebtn"
              color="primary darken-2"
              outlined
              @click="validate"
            >
              update
            </v-btn>
       </v-form>       
            
      </v-card-title>
    </v-card>
   
  </v-content>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
export default {
layout:'adminlayout',
data(){
  return{
     hour:'',minute:'',second:'',
     rules: {
          name: [
            val => val<60 || 'Enter number <60',
            val => !!val || 'Required'
          ]
     },
      snackbar: false,
      timeout: 3000,
  }
},
methods: {
    validate () {
      if(this.$refs.form.validate()){
        var examtime = (this.hour*60*60)+(this.minute*60)+(this.second);
        //Time will be stored in seconds
        this.$store.dispatch("assessment/changeTime",examtime).then(()=>{
          this.snackbar=true;
          this.$store.dispatch("assessment/fetchTime");

        });
      }
    },
}
}
</script>

<style>
.main-card{
  margin-left: 30%;
  margin-top: 15%;
  }
  .timing{
    margin-top: -6%;
    margin-left: 80px;
  }
  .updatebtn{
    bottom: 0;
    margin-top: 2%;
    margin-left: 37%;
  }
@media only screen and (max-width: 600px) {
  .main-card{
    margin: 5%;
  }
  .timing{
    margin-top: -6%;
    margin-left: 10%;
  }
  .updatebtn{
    bottom: 0;
    margin-top: 2%;
    margin-left: 37%;
  }
}
</style>