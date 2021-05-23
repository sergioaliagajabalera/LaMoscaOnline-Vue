<template>
  <v-container style="margin:0% padding:0%; border:0%" fluid grid-list-lg text-lg-left >
    <v-toolbar style="margin: 0% 0% 0% 0%" dark prominent color="indigo" >
        <v-toolbar-title><img style="width:40%;" src="logo.png"></v-toolbar-title>
        <v-btn icon style="margin-left:2%; margin-right:2%">
            {{username}} <skills :username='username'></skills>
        </v-btn>
        <v-spacer></v-spacer>
        
        <v-btn icon>
          <router-link to="/principal" style="color:white">
            <v-icon>mdi-home</v-icon>
          </router-link>
        </v-btn>
        <v-btn icon v-on:click="logout()">
            <v-icon>mdi-export</v-icon>
        </v-btn>
        </v-toolbar>
  </v-container>
</template>

<script>
import axios from "axios";
import Skills from './Skills.vue';

export default {
data () {
    return {
      //general
      axios:axios,
      username: localStorage.getItem('username'),
      rol: localStorage.getItem('rol'),
    
    }
  },
  name: "headerm",
  components: {
    Skills
  },
  methods:{
    logout() { 
      console.log("holla");
      var form={
        username:this.username,
      }
      axios.post('http://localhost:4000/logout',
        form,
      ).then((response)=>{
        if(response.data.status==3) console.log(response.data.data);
        else if(response.data.status==0) console.log(response.data.data); 
        else{
          localStorage.removeItem('username');
          localStorage.removeItem('rol');
          location.replace('/');
        }
      })
    } 
  }
}
</script>

<style>

</style>