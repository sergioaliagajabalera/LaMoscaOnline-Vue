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
        <v-container style="margin:10% ; background:#FFFCF8">
        <v-container style="width:70%;" >  
              <v-row>
                <v-list-item-group color="primary" style="margin:0% 0% 5% 20%" v-for="(player, index) in players"  v-bind:key="player" >
                  <v-row v-if="!index%2">
                    <v-icon v-text="player.icon" >mdi-account-box</v-icon>
                    <v-list-item-title v-text="player"></v-list-item-title>
                  </v-row>
                </v-list-item-group>
                
              </v-row>
            </v-container>
            <v-container style="width:70%;background-size: cover;" :style="{ backgroundImage: `url(${map})`}" no-repeat center fixed !important >  
               <v-row align="center" justify="center" style="width:40%">
                  <v-col class="">
                    <v-card
                      class="pa-2"
                      outlined
                      tile
                    >
                      One of three columns
                    </v-card>
                  </v-col>
               </v-row>
            </v-container>
            <v-container style="width:70%;" >  
              <v-row>
                <v-list-item-group color="primary" style="margin:5% 0% 0% 20%" v-for="(player,index) in players"  v-bind:key="player" >
                  <v-row v-if="index%2" >
                    <v-icon v-text="player.icon" >mdi-account-box</v-icon>
                    <v-list-item-title v-text="player"></v-list-item-title>
                  </v-row>
                </v-list-item-group>
              </v-row>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
//import axios from "axios";


export default {
data () {
    return {
      username: localStorage.getItem('username'),
      rol: localStorage.getItem('rol'),
      room:localStorage.getItem('roomcode'),
      //game properties
      map:'',
      players:[]
    }
  },
  name: "Game",

  methods:{
    getstatussuccessful(result){
        console.log(result);
        this.map=result.game.map;
        this.players=result.players;
    }
    
  },
  sockets:{//sockets listening for call methods
    getstatussuccessful:function (data) {this.getstatussuccessful(data)},
  },
  mounted(){//one emit for get status game
    let form = {'player':this.player,'roomcode':this.room};
    this.$socket.emit('getstatusGame', form);
  }
}
</script>

<style>

</style>