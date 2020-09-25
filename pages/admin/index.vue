<template>
  <v-main>
  </v-main>
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
