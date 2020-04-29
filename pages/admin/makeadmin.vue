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
        Closeoutlined
      </v-btn>
    </v-snackbar>
    <v-card class="main-card" max-width="400px" :elevation="24">
      <v-toolbar color="primary darken-2" dark flat>
        <v-toolbar-title class="addquestion display-1 font-weight-medium">Make Admin</v-toolbar-title> 
      </v-toolbar>
        <v-form ref="form">
            <v-text-field class="ma-3" :rules="rules.name" name="email" outlined v-model="adminemail" label="Enter Email Address" ></v-text-field>
            <v-card-action>
              <v-btn class=" adminbtn primary darken-2 " @click="admin">Make Admin</v-btn>
            </v-card-action>
        </v-form>
    </v-card>
   
  </v-content>
</template>

<script>
import { functions } from "@/plugins/firebase";
import { auth } from "@/plugins/firebase";
import Cookie from "js-cookie";
export default {
layout:'adminlayout',
data(){
  return{
      snackbar: false,
      timeout: 3000,
      isError: false,
      errMsg: "",
      adminemail:"",
      rules:{
        name:[val=> !!val || "Enter Email Please"]
      }
  }
},
methods: {
    admin(e){
        e.preventDefault();
        const adminEmail = this.adminemail;
        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({ email: adminEmail }).then(result => {
          console.log("message",result);
        },err=>{
            console.log("err:-", err);
        })
    },
    listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  auth.listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
}
  }
}
</script>

<style>
.main-card{
  margin-left: 280px;
  margin-top: 120px;
}
.adminbtn{
  bottom: 0;
  margin-top: -30px;
  margin-left: 120px;
}
.addquestion{
  margin-left: 80px;
}
</style>