<template>
  <v-container style="margin:5% 10%; padding:5%"  >
    <v-row>
    <v-col md="6">
      <v-form v-model="valid">
        <v-container>
          <h1>LOGIN</h1>
          <v-text-field  v-model="username" :rules="nameRules" :counter="25" label="Username" required></v-text-field>
          <v-text-field  type="password" id="password" v-model="password" :rules="nameRules" :counter="25" label="Password" required></v-text-field> 
        </v-container>
         <v-btn  style color="black" width="100%" class="mr-4 white--text" v-on:click="formSubmit()">
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
</template>

<script>
import axios from "axios";

export default {
 data () {
    return {
      axios:axios,
      username: '',
      password: '',
    }
  },
  name: "Home",

  components: {
    
  },

  methods:{
    hello() {
      this.axios
      .get('http://localhost:4000/hello')
      .then(response => console.log(response.data))
    },

    formSubmit() { 
      var form={
        username:this.username,
        password:this.password
      }
      axios.post('http://localhost:4000/login',
        form,
      ).then((response)=>{
        if(response.data.status==3) console.log(response.data.data);
        else if(response.data.status==0) console.log(response.data.data); 
        else{
          console.log('holl');
          localStorage.setItem('username', response.data.data[0].username);
          localStorage.setItem('rol',response.data.data[0].rol);
          console.log(response.data.data[0]);
          location.replace('/principal');
        }
      })
    } 
  }
};
</script>
