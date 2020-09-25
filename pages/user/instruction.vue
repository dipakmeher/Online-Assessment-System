<template>
  <v-main class="container">
    <v-container >
      <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <h1>Instruction 1</h1>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
               <h1>Instruction 2</h1>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text>
               <h1>Ready for exam??</h1>
                <nuxt-link to="/user/assessment"><v-btn> Take Assessment</v-btn></nuxt-link>
            </v-card-text>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            :disabled="step === 1"
            text
            @click="step--"
          >
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="step === 3"
            color="primary"
            depressed
            @click="step++"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>  
  </v-main>
</template>
<script>
import db from '@/plugins/firebase'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
  export default {
    data: () => ({
      step: 1,
    }),
    async created(){
    await this.$store.dispatch("randomPicker").then(async ()=>{
      alert("random picker");
      await this.$store.dispatch("fetchCategories");
      alert("Fetch Categories");
    });
    },
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Instruction 1'
          case 2: return 'Instruction 2'
          default: return 'Take Assessment'
        }
      },
    },
  }
</script>
<style scoped>
.container{
  margin-top:40px;
}
@media only screen and (max-width: 960px) {
  .container{
    margin-top:40px;
    margin-left:2px;
    margin-right:2px;
  }
}
</style>