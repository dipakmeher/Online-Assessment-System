<template>
  <v-app id="inspire">
    <v-content >
      <v-container class="fill-height white" fluid>
        <v-row align="center" justify="center">
          <v-snackbar
            top
            v-model="snackbar"
            :timeout="timeout"
            v-if="signupvalue"
            color="success"
          >
            Successfully Registered. Login Now.
          </v-snackbar>
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary darken-2" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title> </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login" @submit.enter="login">

                  <v-text-field
                    v-model="account.email"
                      id="nuxtfire-email"
                      type="email"
                      class="form-control"
                      placeholder="E-mail address"
                      prepend-icon="person"
                  ></v-text-field>
                  <v-text-field
                    v-model="account.password"
                      id="nuxtfire-password"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      prepend-icon="lock"
                  ></v-text-field> 
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn  @click="login" type="submit" class="btn btn-primary primary darken-2"  color="primary" style="width:100%;" id="login">Login</v-btn>
                </v-card-actions>
                <v-card-actions >
                  <v-alert  v-if="isError" type="error" class="alert alert-danger">
                    <p class="mb-0">{{ errMsg }}</p>
                  </v-alert>
                  <!-- <v-alert  v-if="snackbar" type="success" class="alert alert-danger">
                    <p class="mb-0">Successfully Registered. Login Now.</p>
                  </v-alert> -->
                </v-card-actions>    
              <v-card-text class="text-center">Create an Account?
                 <nuxt-link to="/signup" id="signup">
                   <button @click="$store.commit('users/signupalert',false)" text class="body-2"> SignUp</button>
                </nuxt-link>
              </v-card-text> 
              
            </v-card>
            <div>

            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'

export default {
  data: () => ({
    account: {
      email: "",
      password: ""
    },
    isError: false,
    errMsg: "",
     snackbar: true,
      text: 'My timeout is set to 2000.',
      timeout: 3000,
  }),
  computed:{
    ...mapGetters({
      signupvalue:'users/getSnackbar'
    }),
    },
  methods: {
    login(e) {
      e.preventDefault();
      // TODO: add parsing of data.
      this.$store
        .dispatch("users/login", this.account)
        .then(() => { 
          // this.$router.push("/admin");
        })
        .catch(error => {
          this.isError = true;
          this.errMsg = error.code;
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        });
    }
  }
};

</script>
<style scoped>  
.alert{
  width:100%;
}
</style>