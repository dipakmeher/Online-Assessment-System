<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
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
                <v-btn  @click="login" type="submit" class="btn btn-primary"  color="primary" style="width:100%;" id="login">Login</v-btn>
                </v-card-actions>
                <v-card-actions >
                  <v-alert  v-if="isError" type="error" class="alert alert-danger">
                    <p class="mb-0">{{ errMsg }}</p>
                  </v-alert>
                </v-card-actions>    
              <v-card-text class="text-center">Create an Account? <nuxt-link to="addques" id="signup">SignUp</nuxt-link></v-card-text> 
              
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
export default {
  data: () => ({
    account: {
      email: "",
      password: ""
    },
    isError: false,
    errMsg: ""
  }),
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
/* .form-control{
  background:#ecf0f1;
  border: #ccc 1px solid;
  border-bottom: #ccc 2px solid;
  padding: 8px;
  width:90%;
  color:#AAAAAA;
  margin-top:10px;
  font-size:1em;
  border-radius:4px;
} */
.alert{
  width:100%;
}
</style>