<template>
  <v-content>
    <v-container>
     <v-btn @click="transfer" class="primary">Transfer Document</v-btn>
    </v-container>
  </v-content>
</template>

<script>
// import * as firebase from 'firebase/app'
// import 'firebase/auth'
import { functions } from "@/plugins/firebase";
import { auth } from "@/plugins/firebase";
import Cookie from "js-cookie";
export default {
  layout:'adminlayout',
  methods: {
    transfer(){
      this.$store.dispatch("assessment/fetchSubAns");
    },
    async logout() {
      await auth.signOut();
      await Cookie.remove("access_token");
      location.href = "/";
    },
    admin(){
      const adminForm = document.querySelector('.admin-actions');
      adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const adminEmail = document.querySelector('#admin-email').value;
        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({ email: adminEmail }).then(result => {
          console.log("Firebase funtion invoked from index.vue");
        });
      });
    }
  }
};
</script>
