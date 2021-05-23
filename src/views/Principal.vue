<template>
    <v-container style="margin:0% padding:0%; border:0%;" fluid grid-list-lg text-lg-left >
        <headerm></headerm>
        <v-carousel style="margin:0% 0% 0% 0.8%; width:98.4%">
            <v-carousel-item 
            v-for="(item,i) in items" :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition">
            </v-carousel-item>
        </v-carousel>
        <v-container style="margin:0% padding:0%; border:0%">     
        <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" height="200px" src="https://images.unsplash.com/photo-1619869300502-ac8d409e7635?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80">
            </v-img>
            <v-card-title class="text--primary ">It play with your friends</v-card-title>
            <v-card-subtitle class="pb-0">La Mosca Online</v-card-subtitle>
            <v-card-actions>
                <v-btn color="indigo" v-on:click="playFriends()" text>Play</v-btn>
            </v-card-actions>
        </v-card>
        </v-container>
    </v-container>
</template>

<script>
import axios from "axios";
import Headerm from './Headermosca';


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
  components: {
    Headerm
  },
  methods:{
    playFriends() {         
        location.replace('/Room');    
    }, 
  }
}
</script>

<style>

</style>