<template>
<v-content>
  <div class="text-center">
    <v-btn
      color="deep-purple accent-4"
      class="white--text"
      @click="overlay = !overlay"
    >
      Launch Application
      <v-icon right>mdi-open-in-new</v-icon>
    </v-btn>

    <v-overlay :value="overlay"  :absolute="absolute">
      <v-card raised light class="mx-auto white text--black" max-height="800px">
          <v-card-text>
            <span class="title indigo--text">Thank you very much... <br> Results will be announced soon</span>   
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn outlined @click="nextpage" class="primary white--text ml-4">Click here to submit the test</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
  </v-content>
</template>
<script>
  export default {
    data: () => ({
      absolute: true,
      overlay: false,
    }),

    // watch: {
    //   overlay (val) {
    //     val && setTimeout(() => {
    //       this.overlay = false
    //     }, 3000)
    //   },
    // },
    methods:{
        nextpage(){
            this.$router.push("/");
        }
    }
  }
</script>