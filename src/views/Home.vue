<template  >
  <v-container style="margin:0%; padding:0%;" class="text-md-center" fluid grid-list-lg>
    <img style="width:35%; margin-top:2%" src="logo.png"/>
    <v-row style="margin:0%"  >
    <v-col md="6">
      <v-form v-model="valid" style="margin-top:10%; margin-bottom:2%" >
        <v-container>
          <h1>LOGIN</h1>
          <v-text-field  v-model="username" :rules="nameRules" :counter="25" label="Username" required></v-text-field>
          <v-text-field  type="password" id="password" v-model="password" :rules="nameRules" :counter="25" label="Password" required></v-text-field> 
        </v-container>
         <v-btn  style color="black" width="100%" class="mr-4 white--text" v-on:click="formSubmit()">
            LOGIN
          </v-btn>
      </v-form>
      <p v-if="errorform!=false" class="red--text">{{errorform}}</p>
      <v-btn to="/register" >Create account</v-btn>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col md="6" class="text-md-center" >
        <v-container style="margin-top:10%;" >
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
      username:'',
      password: '',
      //form
      errorform:false,
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
        password:this.password,
      }
      if(localStorage.getItem('username')==this.username || localStorage.getItem('username')==null){
        axios.post('http://localhost:4000/login',
          form,
        ).then((response)=>{
          if(response.data.status==3) this.errorform=response.data.data;
          else if(response.data.status==0) console.log(response.data.data); 
          else{
            localStorage.setItem('username', response.data.data[0].username);
            localStorage.setItem('role',response.data.data[0].rol);
            console.log(response.data.data[0]);
            location.replace('/principal');
          }
        })
      }else this.errorform='Session open with another user, try go into with the user of the last time';
    },
  },
  created(){
      console.log("hola")
      if(localStorage.getItem('username')!=null) this.username=localStorage.getItem('username');
    }
};
</script>
