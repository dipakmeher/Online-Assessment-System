<template>
  <v-content>
         
      <v-container
       >
         <v-app-bar class="white smallnav">
            <p>Total Questions:- {{length}}</p>
         </v-app-bar>
    
    <div  class="scrollmenu" id="cafelist">
      <v-card  
        class="ma-4 maincards"
         v-for="(Questions,index) in projects" :key="index+1"
         :id="index"
        >
         <v-btn class="outlined child" v-on:click="Delete(index)">x</v-btn>

        {{Questions.Question}}
        <br>
        <br>
        
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
        id:''
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
  },
  methods:{
      Delete(index){
      this.$store.dispatch("DeleteQuestion",index);
    }
  }
}
</script>

<style>
.scrollmenu {
    height: 450px;
    width:75%;
    margin-left:30px;
  background-color:#607D8B;
  overflow: auto;
  white-space: nowrap;
}   
.maincards{
    width: 300px;
    height:340px ;
 display: inline-block;
  color: white;
  text-align: center;
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
    width:75%;
    top:0;
    margin-left:30px;
}
</style>