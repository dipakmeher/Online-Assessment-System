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
                <v-form>

                  <v-text-field label="Name" name="name" prepend-icon="person" type="text"/>
                  <v-text-field id="password" label="Password" name="password" prepend-icon="lock" type="password"  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />

                <v-btn color="primary" style="width:100%;" id="login">Login</v-btn>
                
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
    props: {
      source: String,
    },
  }
</script>   