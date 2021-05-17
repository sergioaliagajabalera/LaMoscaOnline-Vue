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
                        <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                          <img :id="index+'|'+index2" draggable @dragend='endDrag($event,index,index2)' @dragstart='startDrag($event,index,index2)' style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
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
                      class="drop-zone"
                      v-on:click="giveCard()"
                    >
                     <img style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                    </div>
                  </v-col>
                  <v-col class="">
                    <div 
                    class='drop-zone'
                      @drop='onDrop($event)' 
                      @dragover.prevent
                      @dragenter.prevent 
                    >
                     <img style="width:35px; margin:0%" :src="server+game.cardsecondlast.image">
                     <img style="width:35px; margin:0%" :src="server+game.cardlast.image">
                    </div>
                  </v-col>
               </v-row>
            </v-container>
            <v-container style="width:100%;margin:0%" >  
              <v-row>
                <v-list-item-group color="primary" style="margin:5% 0% 0% 0%" v-for="(player, index) in players"  v-bind:key="player" >
                  <v-row v-if="index%2!=0" >
                    <v-icon v-text="player.icon" >mdi-account-box</v-icon>
                    <v-list-item-title v-text="player.player"></v-list-item-title>
                    <v-container style="background:green;">
                        <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                          <img :id="index+'|'+index2" draggable @dragend='endDrag($event,index,index2)' @dragstart='startDrag($event,index,index2)' style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                        </div>
                  </v-container>
                  </v-row>
                </v-list-item-group>
                
              </v-row>
            </v-container>
        </v-container>
        <p id="hola">hola</p>
     



      <!-- POP UPS--> 
      <!--Dialog throw card collected or another card-->
      <v-dialog transition="dialog-top-transition" max-width="800" v-model="dialogcollectcard">
          <v-card max-width="800">
            <v-toolbar color="#FFFCF8" max-width="800" white>throw card collected  or another card</v-toolbar>
            <h1>choose card you want change</h1>
            <v-list-item-group color="primary" style="margin:5% 0% 0% 0%" v-for="(player, index) in players"  v-bind:key="player" >
              <v-row v-if="username==player.player" >
                <v-container style="background:green;">
                  <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                    <img  v-on:click="throwCard(index,index2,0,giveCard2)"  style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                  </div>
                </v-container>
              </v-row>
            </v-list-item-group>
            <h1>OR</h1>
            <v-card-actions class="justify-end" max-width="800">
              <v-btn  depressed color="primary" text width="800" v-on:click="throwCard(username,giveCard2,1,giveCard2)">throw card collected(if you throw this card, you can get special moviments)</v-btn>
            </v-card-actions>
            <img  style="width:100px; margin:0%" :src="server +''+giveCard2.image">
          </v-card>
      </v-dialog>

      <!--Dialog vie your card moviment speciall-->
      <v-dialog transition="dialog-top-transition" max-width="800" v-model="dialogviewyourcardmovimentspecial">
          <v-card max-width="800">
            <v-toolbar class="yellow accent-4" max-width="800" white>Moviment special</v-toolbar>
            <h1>View one card</h1>
            <v-list-item-group color="primary" style="margin:5% 0% 0% 0%" v-for="(player, index) in players"  v-bind:key="player" >
              <v-row v-if="username==player.player" >
                <v-container style="background:green;">
                  <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                    <img  v-on:click="viewCard(index,index2)"  style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                  </div>
                </v-container>
              </v-row>
            </v-list-item-group>
            <v-card-actions class="justify-end" max-width="800">
            </v-card-actions>
          </v-card>
      </v-dialog>

      <!--Dialog vie card another player moviment speciall-->
      <v-dialog transition="dialog-top-transition" max-width="800" v-model="dialogviewcardanotherplayermovimentspecial">
          <v-card max-width="800">
            <v-toolbar class="yellow accent-4" max-width="800" white>Moviment special</v-toolbar>
            <h1>View card another player</h1>
            <v-list-item-group color="primary" style="margin:5% 0% 0% 0%" v-for="(player, index) in players"  v-bind:key="player" >
              <v-row v-if="username!=player.player" >
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                    <v-icon v-text="player.icon" >mdi-account-box</v-icon>
                    <v-list-item-title v-text="player.player"></v-list-item-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-container style="background:green;">
                        <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                          <img  v-on:click="viewCard(index,index2)"  style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                        </div>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </v-list-item-group>
            <v-card-actions class="justify-end" max-width="800">
            </v-card-actions>
          </v-card>
      </v-dialog>
  
    </v-container>
</template>

<script>
//import axios from "axios";


export default {
data () {
    return {
      //dialogs
      dialogcollectcard: false,
      dialogviewyourcardmovimentspecial:false,
      dialogviewcardanotherplayermovimentspecial:false,
      //general
      username: localStorage.getItem('username'),
      rol: localStorage.getItem('rol'),
      room:localStorage.getItem('roomcode'),
      server:"http://localhost:4000",
      //game properties
      map:'',
      players:[],
      game:null,
      giveCard2:'/images/cards/generic/trasera.png'
    }
  },
  name: "Game",

  methods:{
    getstatussuccessful(result){
        console.log(result);
        this.map=result.game.map;
        this.game=result.game;
        console.log(this.map);
        this.players=result.game.players;    
    },

    //drag and drop
    startDrag(evt, item,item2){//drag and drop, this function is call when element or item is drag for the player
      console.log(item+"| "+item2,)
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('player', item);
      evt.dataTransfer.setData('cardn', item2);
      let senditem={playerAction:this.username, playerCardmove:item, cardn:item2}
      this.$socket.emit('startDrag',senditem);
    },
    onDrop(evt) {//drag and drop, this function is call when element or item is end drag to other element ondrop for the player
      let player = evt.dataTransfer.getData('player');
      let cardn = evt.dataTransfer.getData('cardn');
      if(player=='' || cardn=='');
      else{
        console.log("hollaa22");
        let senditem={playerAction:this.username, playerCardmove:player, cardn:cardn}
        this.$socket.emit('onDrop',senditem);
      }
      console.log(player+"|"+cardn);
    },
    endDrag(evt,item,item2) {//drag and drop, this function is call when element or item is end drag for the player
      let idCard=item+"|"+item2;
      let senditem={idCard:idCard};
      this.$socket.emit('endDrag',senditem);
    },
    //events click
    giveCard(){
      this.$socket.emit('giveCard');
    },

    throwCard(index,index2,action,index3) {//
      let senditem={playern:index, cardnchange:index2,action:action,card:index3}
      this.$socket.emit('throwCard',senditem);
      this.dialogcollectcard=false;
    },

    viewCard(index,index2) {//
      let senditem={playern:index, cardn:index2}
      this.$socket.emit('viewCard',senditem);
      this.dialogcollectcard=false;
    },


    //actions users functions call for sockets on
    endDragsuccessful(result){
      console.log(result)
      console.log(this.server);

      document.getElementById(result.idCard).setAttribute('src', this.server+'/images/cards/generic/trasera.png');
    },

    showcardsuccessful(result){
        console.log(result.imageshow);
        let idCard=result.player+'|'+result.cardn;
        document.getElementById(idCard).setAttribute('src', this.server+result.imageshow); 
        
        this.dialogviewyourcardmovimentspecial=false;
        this.dialogviewcardanotherplayermovimentspecial=false;
        if(result.action==1){
          var server=this.server;
          setTimeout(function(){
            console.log(server);
            document.getElementById(idCard).setAttribute('src', server+"/images/cards/generic/trasera.png");
          }, 15000);
        }
    },
    givecardsuccessful(result){
        this.giveCard2=result.card;
        this.dialogcollectcard=true; 
    },
    viewyourcardmovimentspecial(){
        this.dialogviewyourcardmovimentspecial=true; 
    },
    viewcardanotherplayermovimentspecial(){
        console.log("hollaaaa394754545");
        this.dialogviewcardanotherplayermovimentspecial=true; 
    },
    
  },
  sockets:{//sockets listening for call methods
    getstatussuccessful:function (data) {this.getstatussuccessful(data)},
    endDragsuccessful:function (data) {this.endDragsuccessful(data)},
    showcardsuccessful:function (data) {this.showcardsuccessful(data)},
    givecardsuccessful:function (data) {this.givecardsuccessful(data)},
    viewyourcardmovimentspecial:function () {this.viewyourcardmovimentspecial()},
    viewcardanotherplayermovimentspecial:function () {this.viewcardanotherplayermovimentspecial()},
  },
  mounted(){//one emit for get status game
    let form = {player:this.username,roomcode:this.room};
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