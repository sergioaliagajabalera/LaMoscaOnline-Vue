<template>
<v-app>
  <v-container style="margin:5% 10%; padding:5%"  >
    <v-row>
    <v-col md="6">
      <v-form v-model="valid">
        <v-container>
          <h1>LOGIN</h1>
          <v-text-field v-model="firstname" :rules="nameRules" :counter="25" label="Username" required></v-text-field>
          <v-text-field v-model="lastname" :rules="nameRules" :counter="25" label="Password" required></v-text-field>  
        </v-container>
         <v-btn  style color="black" width="100%" class="mr-4 white--text"  @click="submit">
            LOGIN
          </v-btn>
      </v-form>
      <v-btn to="/about" >Crear Cuenta</v-btn>
    </v-col>
    <v-divider
  vertical
></v-divider>
    <v-col md="6">
      <v-form v-model="valid">
        <v-container>
          <h1 >GOOGLE</h1>
          <v-text-field v-model="firstname" :rules="nameRules" :counter="25" label="Username" required></v-text-field>
          <v-text-field v-model="lastname" :rules="nameRules" :counter="25" label="Password" required></v-text-field>  
        </v-container>
         <v-btn  style color="black" width="100%" class="mr-4 white--text"  @click="submit">
            LOGIN
          </v-btn>
      </v-form>
    </v-col>
    </v-row>
    
  </v-container>
</v-app>
</template>

<script>
export default {
  name: "Home",

  components: {
    
  },

  
};
</script>
