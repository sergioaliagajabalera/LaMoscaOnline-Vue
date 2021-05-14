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
        <v-container style="margin:5% 0% ; background:#FFFCF8" fluid grid-list-lg text-lg-left >
        <v-container style="width:100%; margin:0%" >  
              <v-row>
                <v-list-item-group color="primary" style="margin:0% 0% 5% 0%" v-for="(player, index) in players"  v-bind:key="player" >
                  <v-row v-if="index%2==0" >
                    <v-icon v-text="player.icon" >mdi-account-box</v-icon>
                    <v-list-item-title v-text="player.player"></v-list-item-title>
                    <v-container style="background:green;">
                        <div style="float:left;" v-for='card in players[index].cards'  v-bind:key='card' class=''>
                          <img draggable @dragend='endDrag($event,card)' @dragstart='startDrag($event, card)' style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                        </div>
                  </v-container>
                  </v-row>
                </v-list-item-group>
                
              </v-row>
            </v-container>
            <v-container style="width:100%;background-size: cover; margin:0%" :style="{ backgroundImage: `url(${map})`}" no-repeat center fixed !important >  
               <v-row align="center" justify="center" style="width:20%;">
                  <v-col class="">
                    <div 
                    class='drop-zone'
                      @drop='onDrop($event)' 
                      @dragover.prevent
                      @dragenter.prevent 
                    >
                     
                    </div>
                  </v-col>
               </v-row>
            </v-container>
            <v-container style="width:100%;margin:0%" >  
              <v-row>
                <v-list-item-group color="primary" style="margin:5% 0% 0% 0%" v-for="(player, index) in players"  v-bind:key="player" >
                  <v-row v-if="index %2">
                    <v-icon v-text="player.icon" >mdi-account-box</v-icon>
                    <v-list-item-title v-text="player.player"></v-list-item-title>
                    <v-container style="background:green;">
                        <div style="float:left; margin:0; padding:0; border:0" v-for='card in players[index].cards'  v-bind:key='card' class=''>
                          <img style="width:35px;" :src="server + '/images/cards/generic/trasera.png'">
                        </div>
                  </v-container>
                  </v-row>
                </v-list-item-group>
                
              </v-row>
            </v-container>
        </v-container>
        <p id="hola">hola</p>
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
      server:"http://localhost:4000",
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
        this.players=result.game.players;    
    },
   startDrag(evt, item){//drag and drop, this function is call when element or item is drag for the player
     console.log(item.name)
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.name)
    },
    onDrop (evt) {//drag and drop, this function is call when element or item is end drag to other element ondrop for the player
      const itemID = evt.dataTransfer.getData('itemID')
      console.log(itemID)
    },
    endDrag (evt) {//drag and drop, this function is call when element or item is end drag for the player
     //const itemID = evt.dataTransfer.getData('itemID')
      evt.dataTransfer.clearData('itemID');
      console.log("dejado");
    }
    
  },
  sockets:{//sockets listening for call methods
    getstatussuccessful:function (data) {this.getstatussuccessful(data)},
  },
  mounted(){//one emit for get status game
    let form = {'player':this.player,'roomcode':this.room};
    this.$socket.emit('getstatusGame', form);
    document.getElementById('hola').innerHTML="ho";
  }
}
</script>

<style>
.drop-zone {
    background-color: #eee;
    margin-bottom: 10px;
    padding: 10px;
  }
</style>