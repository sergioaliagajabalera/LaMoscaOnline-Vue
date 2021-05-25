<template>
  <v-container style="margin:0% padding:0%; border:0%" fluid grid-list-lg text-lg-left >
    <v-navigation-drawer class="indigo"  dark v-model="sidebar" app >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <img v-on:click="principal()" style="width:100%;" src="logo.png">
          </v-list-item-title>
          <v-list-item-subtitle>
            {{username}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item link>
        <v-list-item-icon>
          <skills :username='username'></skills>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Skills</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-on:click="principal()">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>  
      <v-list-item v-if="this.role=='admin'" v-on:click="managementUser()">
        <v-list-item-icon>
          <v-icon>mdi-account-cowboy-hat</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-on:click="principal()">
          <v-list-item-title>Management users</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item  v-on:click="editUser()">
       <v-list-item-icon>
          <v-icon >mdi-account-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-on:click="principal()">
          <v-list-item-title>Edit user</v-list-item-title>
        </v-list-item-content>
      </v-list-item> 
      <v-list-item  v-on:click="logout()">
       <v-list-item-icon>
          <v-icon >mdi-export</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-on:click="principal()">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item> 
    </v-navigation-drawer>
    
    <v-toolbar style="margin: 0% 0% 0% 0%" dark prominent color="indigo" >
      <v-toolbar-title><img v-on:click="principal()" style="width:40%;" src="logo.png"></v-toolbar-title>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
      <v-btn class="hidden-xs-only" icon style="margin-left:5%; margin-right:2%; float:left">
        {{username}} <skills :username='username'></skills>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="hidden-xs-only" icon v-on:click="principal()">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn class="hidden-xs-only" icon v-if="this.role=='admin'" v-on:click="managementUser()">
        <v-icon>mdi-account-cowboy-hat</v-icon>
      </v-btn>
      <v-btn class="hidden-xs-only" icon v-on:click="editUser()">
        <v-icon >mdi-account-edit</v-icon>
      </v-btn>
      <v-btn class="hidden-xs-only" icon v-on:click="logout()">
        <v-icon >mdi-export</v-icon>
      </v-btn> 
    </v-toolbar>
  </v-container>
</template>

<script>
import axios from "axios";
import Skills from './Skills.vue';
import { bus } from '../main';
export default {
data () {
    return {
      //general
      axios:axios,
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
      sidebar:false,
    }
  },
  name: "headerm",
  components: {
    Skills
  },
  methods:{
    logout() { 
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
    },
    principal(){
      location.replace('/principal');
    }, 
    editUser(){
      location.replace('/edituser');
    },
    managementUser(){
      location.replace('/managementuser');
    }
  },
  mounted(){//
    bus.$on('logout', () => {
      this.logout()
    })
  }

}
</script>

<style>

</style>