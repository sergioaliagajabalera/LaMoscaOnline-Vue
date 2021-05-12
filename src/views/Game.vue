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
        GAME
    </v-container>
</template>

<script>
export default {
data () {
    return {
      username: localStorage.getItem('username'),
      rol: localStorage.getItem('rol'),
    }
  },
  name: "Game",

  methods:{
   
    
  }
}
</script>

<style>

</style>