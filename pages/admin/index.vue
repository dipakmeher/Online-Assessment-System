<template>
  <v-content>
    <v-container>
      <!-- <h1>Admin route</h1>
      <a @click="logout">Logout</a>
      <form class="center-align admin-actions admin" style="margin: 40px auto; max-width: 300px;">
        <input type="email" placeholder="User email" id="admin-email" required />
        <button class="btn-small yellow darken-2 z-depth-0" v-on:click="admin">Make admin</button>
      </form> -->
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
  // layout:'adminlayout',
  methods: {
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