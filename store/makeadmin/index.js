import { functions } from "@/plugins/firebase";
import db from '@/plugins/firebase';
import { time } from "@tensorflow/tfjs";
const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");

export const state = () => ({
  projects:[],
  user:0,
  random:[]
});

export const getters = {
  get (state) {
    return state.projects["0"];
  },
  getUser (state) {
    return state.user;
  }
}
export const mutations = {
    setCategories(state, val) {
        state.projects = val; 
    },
    setRandom(state, val) {
      this.state.random = val; 
      console.log("set random");
     },
    removeadmin(state,payload){
        state.projects["0"][payload]=false;
    },
    addadmin(state,payload){
        state.projects["0"][payload]=true;
    },
    setlen(state,payload){
        state.user = payload;
    }
};

export const actions = {
  async fetchCategories({ commit }) {
  var len=0;
    db.collection("Question-Paper").doc("Emails").get().then(querySnapshot => {
        if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
        } else {
        var categories = [];
        categories.push(querySnapshot.data());
        commit("setCategories", categories);  
        for (const [key, value] of Object.entries(categories["0"])) {
          len = len + 1;
        }
          commit("setlen",len);
      }
    });
  },  
  async removeAdmin({ commit },index) {
      const setFalseClaim = functions.httpsCallable('setFalseClaim');
      await setFalseClaim({ email: index}).then(result => {
        console.log("message",result);
      });

      console.log("account",account); 
  },
  async addAdmin({ commit },index) {
      const addAdminRole = functions.httpsCallable('addAdminRole');
      await addAdminRole({ email: index }).then(result => {
        console.log("message",result);
      },err=>{
          console.log("err:-", err);
      })
  },
}