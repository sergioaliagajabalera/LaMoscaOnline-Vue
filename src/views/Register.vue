<template>
  <v-container style="margin:0%; padding:0%;" class="text-md-center" fluid grid-list-lg >
    <img style="width:35%; margin-top:2%" src="logo.png">
    <v-row>
    <v-col md="6">
      <v-form v-model="valid" style="margin-top:10%; margin-bottom:2%" >
        <v-container>
          <h1>REGISTER</h1>
          <v-text-field  v-model="username" :rules="usernameRules" :counter="25" label="Username" required></v-text-field>
          <v-text-field  type="password" id="password" v-model="password" :rules="passwordRules" :counter="25" label="Password" required></v-text-field> 
          <v-text-field  id="email" v-model="email" :rules="emailRules" label="example@gmail.com" required></v-text-field>
          <v-select v-model="country" :items="countries" :rules="[(v) => !!v || 'Country is required']" label="Country" required >
            <template v-slot:item="{ item }">
              <img :src="'https://www.countryflags.io/'+item+'/shiny/64.png'">{{ item }}
            </template>
          </v-select>
        </v-container>
         <v-btn  style color="black" width="100%" class="mr-4 white--text" v-on:click="formSubmit()">
            REGISTER
          </v-btn>
      </v-form>
      <p v-if="errorform!=false" class="red--text">{{errorform}}</p>
      <v-btn to="/" >I already have a account</v-btn>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col md="6" class="text-md-center" >
        <v-container style="margin-top:10%;">
          <h1>FOLLOW US</h1>
          <a href="https://twitter.com/">
            <img  style="width:45%" src="https://www.webxpro.es/wp-content/uploads/2014/11/twitter.jpg"/>
          </a> <br>
          <a href="https://www.instagram.com/">
            <img  style="width:45%; border-radius:200" max-width="250" src="https://hardwareviews.com/wp-content/uploads/2019/02/Instagram-Banner-Logo-de-Instagram-vector-logo-instagram-sin-fondo-1000x480.gif"/>
          </a>
        </v-container>
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
      email: '',
      country: '',
      //form and rules
      errorform:false,
      valid: false,
      usernameRules: [
        v => !!v || 'Field is required',
        v => v.length >= 4 || 'Field must be more than 4 characters',
      ],
      passwordRules: [
        v => !!v || 'Field is required',
        v => v.length >= 8 || 'Field must be more than 8 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      countries:['ar','br','cn','de','es','fr','gr','it','jp','kr','mx','nl','pt','ro','ru','sa','se','th','tr','us','uy','za']
    }
  },
  name: "Register",

  components: {
    
  },

  methods:{
    hello() {
      this.axios
      .get('http://localhost:4000/hello')
      .then(response => console.log(response.data))
    },

    formSubmit() { 
      console.log(this.country);
     if(this.valid){
      var form={
        username:this.username,
        password:this.password,
        email:this.email,
        country:this.country,
        role:'user'
      }
      axios.post('http://localhost:4000/register',
        form,
      ).then((response)=>{
        if(response.data.status==3) this.errorform=response.data.data;
        else if(response.data.status==0) console.log(response.data.data); 
        else{
          location.replace('/');
        }
      })
     };
    } 
  }
};
</script>

