<template>
  <v-content>
    <v-container>
      <nuxt-link to="/slidegroup"><v-btn>Fetch Categories</v-btn></nuxt-link>
      <!-- <v-row>
        <v-col cols="4">
          <v-card class="success" min-height="100px">
            <v-btn @click="transfer">Checking UUID</v-btn>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="primary"></v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="primary"></v-card>
        </v-col>
      </v-row> -->
    </v-container>
  </v-content>
</template>

<script>
// import * as firebase from 'firebase/app'
// import 'firebase/auth'
import { functions } from "@/plugins/firebase";
import { auth } from "@/plugins/firebase";
import Cookie from "js-cookie";
import { uuid } from 'vue-uuid';
export default {
  layout:'adminlayout',
  async created() {
    this.$store.dispatch("assessment/fetchTime");
    this.$store.dispatch("fetchMasterBank");
    this.$store.dispatch("makeadmin/fetchCategories");   
  },
  // async beforeDestroy(){
  //   alert("Before Destroy");
  // },
  methods: {
    transfer(){
     this.$store.dispatch("makeadmin/evaluation");
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
