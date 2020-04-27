<template>
  <v-content>
         
      <v-container
       >
         <v-app-bar class="white smallnav red lighten-5">

            <p class="ma-2 font-weight-medium subtitle-1">Total Questions:- <p class=" ma-1 display-1 font-weight-bold"> {{noofque}}</p></p>
        
         </v-app-bar>
    
    <div  class="scrollmenu" id="cafelist">
      <v-card  
        class="ma-4 maincards"
         v-for="(Questions,index) in projects" :key="index+1"
         :id="index"
        >
         <v-btn class="outlined child" v-on:click="Delete(index)">x</v-btn>
        <div class="questiondiv headline font-weight-bold">
        {{Questions.Question}}
        </div>
        <br>

        <div class="options">
        <div class="radio radio-primary" v-if="Questions.type === 'Objective'"> 
                    <label v-for="(choice,index1) in Questions.Choices" v-bind:key="index1"  class="title font-weight-bold">
                      <input type="radio" :name="Questions.Question" :id=" 'radio-' + index" :value='choice' v-model="chosen[Questions.Question]"  />
                      {{choice}}
                      <br/>
                    </label>
                  </div>
                  <div v-else>
                    <v-textarea
                      label="Write your answer here"
                      auto-grow
                      outlined
                      rows="1"
                      row-height="10"
                      shaped
                      v-model="chosen[Questions.Question]"
                    ></v-textarea>
                  </div> 
                </div>   
      </v-card>
      </div>
      </v-container>
  </v-content>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex' 
export default {
    layout:'adminlayout',
    data() {
    return {
        chosen:[],
        id:'',
        noofque:this.$store.state.projectlen
    }
  },
  created() {
    this.$store.dispatch("fetchCategories"); 
  },
  computed:{
      ...mapGetters({
          projects: 'get',
          length:'getlen'
      }),
      Quecount(){
        return noofque;
      }
  },
  methods:{
      Delete(index){
      this.$store.dispatch("DeleteQuestion",index).then(()=>{
        this.noofque--;
      });

    }
  }
}
</script>

<style>
.scrollmenu {
    height: 450px;
    width:83%;
    margin-left:30px;
  background-color:
#880E4F;
  overflow: auto;
  white-space: nowrap;
}   
.maincards{
  width: 300px;
  height:340px ;
 display: inline-block;
  color: white;

  padding: 14px;
  text-decoration: none;
}
.child {
	position: absolute;
	width: 30px;
	height: 30px;
	top: 0;
	right: 0;
}
.smallnav{
    height: 450px;
    width:83%;
    top:0;
    margin-left:30px;
}
.options{
  text-align: left; 
}
.questiondiv{
  margin-top: 30px;
}
</style>