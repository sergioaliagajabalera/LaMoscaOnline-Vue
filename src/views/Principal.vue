<template>
    <v-container style="margin:0% padding:0%; border:0%" fluid grid-list-lg text-lg-left >
        <v-toolbar white prominent>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>La Mosca Online</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon v-on:click="logout()">
            <v-icon>mdi-export</v-icon>
        </v-btn>
        </v-toolbar>
        <v-carousel>
            <v-carousel-item 
            v-for="(item,i) in items" :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition">
            <div class="display-3">Slide {{ i + 1 }}</div>
            </v-carousel-item>
        </v-carousel>
        <v-container style="margin:0% padding:0%; border:0%">
        <p>{{username}}</p>
        <p>{{rol}}</p>
        <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" height="200px" src="https://images.unsplash.com/photo-1619869300502-ac8d409e7635?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80">
            </v-img>
            <v-card-title class="text--primary ">Juega con tus amigos</v-card-title>
            <v-card-subtitle class="pb-0">La Mosca Online</v-card-subtitle>
            <v-card-actions>
                <v-btn color="orange" text>JUGAR</v-btn>
            </v-card-actions>
        </v-card>
        </v-container>
    </v-container>
</template>

<script>
import axios from "axios";
export default {
data () {
    return {
      axios:axios,
      username: localStorage.getItem('username'),
      rol: localStorage.getItem('rol'),
      items:[
          {src:'https://images.pexels.com/photos/262333/pexels-photo-262333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
         {src:'https://images.pexels.com/photos/1831114/pexels-photo-1831114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'} ]
    }
  },
  name: "Principal",
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