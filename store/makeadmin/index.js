import { auth } from "@/plugins/firebase";
import Cookie from "js-cookie";
import { functions } from "@/plugins/firebase";
import db from '@/plugins/firebase';
export const state = () => ({
  projects:[],
  user:0
});

export const getters = {
  get (state) {
    return state.projects["0"];
  }
}
export const mutations = {
    setCategories(state, val) {
        state.projects = val; 
        console.log("admin set categories");
    },
    removeadmin(state,payload){
        state.projects["0"][payload]=false;
        console.log("remove Executed");
    },
    addadmin(state,payload){
        state.projects["0"][payload]=true;
        console.log("add admin Executed");
    },
    setlen(state,payload){
        state.user = payload;
    }
};

export const actions = {
    fetchCategories({ commit }) {
        var len=0;
        db.collection("Assessment").doc("Emails").get().then(querySnapshot => {
            if (querySnapshot.empty) {
            //this.$router.push('/HelloWorld')
            } else {
            var categories = [];
            categories.push(querySnapshot.data());
            commit("setCategories", categories);
            // for (index in this.state.projects['0']) {
            //     console.log("Value:-",index);
            // }
            // console.log("len:- ",len);
            // commit("setlen",len);           
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

};