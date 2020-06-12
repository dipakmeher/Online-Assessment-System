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
  }
};
</script>
