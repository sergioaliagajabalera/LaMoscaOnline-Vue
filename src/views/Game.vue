<template >
  <v-container style="margin:0% padding:0%; border:0%;" class="text-md-center" fluid grid-list-lg  >
        <img style="width:20%;" src="logo.png">
        <v-btn icon style="margin:0%" color="indigo" v-on:click="dialogexit=true">
          <v-icon>mdi-exit-run</v-icon>
        </v-btn>
        <v-container style="margin-top:2%;" class="text-md-center" fluid grid-list-lg text-lg-left>
        <v-container style="width:100%; margin:0% 0% 2.5% 0%;">  
              <v-row align="center" justify="center">
                <v-list-item-group color="primary" style="margin:0% 1.5% 0% 0%;" v-for="(player, index) in players"  v-bind:key="player" >
                  <v-row v-if="index%2==0">
                    <skills :username='player.player'/>
                    <v-list-item-title v-if="game.turn==index" style="margin:0%; background-color:#ffd700;" v-text="player.player"></v-list-item-title>
                    <v-list-item-title v-else style="margin:0%;" v-text="player.player"></v-list-item-title>
                    <v-container style="background:green; border:2px solid #3F51B5">
                        <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                          <img :id="index+'|'+index2" draggable @dragend='endDrag($event,index,index2)' @dragstart='startDrag($event,index,index2)' style="width:50px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                        </div>
                        <v-btn style="margin:2%" v-if="!viewtwocard && player.player==username" v-on:click="viewCard(index,0,2);viewCard(index,1,2);" color="success">
                          VIEW CARDS(Once)
                        </v-btn>
                  </v-container>
                  </v-row>
                </v-list-item-group>              
              </v-row>
            </v-container>
            <v-row align="center" justify="center" style="width:100%;" >
            <v-container style="width:45%; height:auto; background-size: cover; margin:0%; border:2px solid #3F51B5"  :style="{ backgroundImage: `url(${map})`}" no-repeat center fixed !important class="text-md-center" fluid grid-list-lg >  
               <v-row align="center" justify="center" style="width:100%; margin-top:10%; margin-bottom:10%" >
                  <v-col class="" style="margin:0%">
                    <div 
                      class="drop-zone" 
                      v-on:click="giveCard()"
                    >
                     <img style="width:50px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                    </div>
                  </v-col>
                  <v-col style="margin:0%">
                    <div 
                    class='drop-zone'
                      @drop='onDrop($event)' 
                      @dragover.prevent
                      @dragenter.prevent 
                    >
                     <img style="width:50px; margin:0%;" :src="server+game.cardsecondlast.image">
                     <img style="width:50px; margin:0%;"  :src="server+game.cardlast.image">
                    </div>
                  </v-col>
                  <v-col class="" style="margin:0%" >
                   <v-btn v-on:click="mosca()" class="mx-1" fab dark large color="purple">
                      <v-icon dark> mdi-bee</v-icon>
                    </v-btn>
                  </v-col>
               </v-row>
            </v-container>
            </v-row>
            <v-container style="width:100%;margin:2.5% 2% 0% 0%" >  
              <v-row align="center" justify="center" >
                <v-list-item-group color="primary" style="margin-right:2%" v-for="(player, index) in players"  v-bind:key="player" >
                  <v-row v-if="index%2!=0" >
                    <v-container style="background:green; border:2px solid #3F51B5">
                        <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                          <img :id="index+'|'+index2" draggable @dragend='endDrag($event,index,index2)' @dragstart='startDrag($event,index,index2)' style="width:50px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                        </div>
                         <v-btn v-if="!viewtwocard && player.player==username" style="margin:2%" v-on:click="viewCard(index,0,2);viewCard(index,1,2);" color="success">
                          VIEW CARDS(Once)
                        </v-btn>
                  </v-container>
                    <v-list-item-title v-if="game.turn==index" style="margin:0%; background-color:#ffd700; " v-text="player.player"></v-list-item-title>
                    <v-list-item-title v-else style="margin:0%;" v-text="player.player"></v-list-item-title>
                    <skills :username='player.player'/>
                  </v-row>
                </v-list-item-group>
                
              </v-row>
            </v-container>
        </v-container>


      <!-- POP UPS--> 
      <!--Dialog winner-->
      <v-dialog transition="dialog-top-transition" scrollable persistent max-width="800" v-model="dialogwinner">
          <v-card max-width="800" class="yellow accent-3" >
            <v-toolbar class="yellow accent-4" max-width="800" white>WINNER!!!</v-toolbar>
            <h1>WINNER!!!</h1>
            <v-list-item-group color="primary"  style="margin:5% 0% 0% 0%" v-for="(winnern) in winner"  v-bind:key="winnern" >
              <v-row >
                <v-expansion-panels>
                  <v-expansion-panel class="yellow accent-4" > 
                    <v-expansion-panel-header>
                    <v-list-item-title v-text="winnern.player"></v-list-item-title>
                    <v-list-item-title v-text="'Award: '+''+winnern.award+' xp'"></v-list-item-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-btn color="success" max-width="200">
                          Points({{winnern.points}})
                        </v-btn>
                        <v-btn  color="success" max-width="200" >
                          Cards.n({{winnern.cardsn}})
                        </v-btn>
                        <v-btn  v-if="winnern.mosca" color="success" max-width="200">
                          MOSCA!!!
                        </v-btn>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </v-list-item-group>
            <v-card-actions class="justify-end" max-width="800">
              <v-btn color="indigo" v-on:click="toprincipal()" text >Return to menu</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      <!--Dialog throw card collected or another card-->
      <v-dialog transition="dialog-top-transition" persistent max-width="800" v-model="dialogcollectcard">
          <v-card max-width="800" class="indigo lighten-5">
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
              <v-btn  depressed color="primary" text width="800" v-on:click="throwCard(username,giveCard2,1,giveCard2)">throw card collected(if you throw this card, you can get special movements)</v-btn>
            </v-card-actions>
            <img  style="width:100px; margin:0%" :src="server +''+giveCard2.image">
          </v-card>
      </v-dialog>

      <!--Dialog view your card movement speciall-->
      <v-dialog transition="dialog-top-transition" persistent max-width="800" v-model="dialogviewyourcardmovementspecial">
          <v-card max-width="800" class="indigo lighten-5">
            <v-toolbar class="yellow accent-4" max-width="800" white>Movement special</v-toolbar>
            <h1>View one card</h1>
            <v-list-item-group color="primary" style="margin:5% 0% 0% 0%" v-for="(player, index) in players"  v-bind:key="player" >
              <v-row v-if="username==player.player" style="margin:0%">
                <v-container style="background:green;margin:0%">
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

      <!--Dialog view card another player movement speciall-->
      <v-dialog transition="dialog-top-transition" persistent max-width="800" v-model="dialogviewcardanotherplayermovementspecial">
          <v-card max-width="800" class="indigo lighten-5" >
            <v-toolbar class="yellow accent-4" max-width="800" white>Movement special</v-toolbar>
            <h1>View card another player</h1>
            <v-list-item-group color="primary" style="margin:5% 0% 0% 0%" v-for="(player, index) in players"  v-bind:key="player" >
              <v-row v-if="username!=player.player && index!=game.playernmosca" >
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
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
      
      <!--Dialog exchange without see movement special-->
      <v-dialog transition="dialog-top-transition" persistent max-width="800" v-model="dialogchangecardwithoutseemovementspecial">
          <v-card max-width="800" class="indigo lighten-5">
            <v-toolbar class="yellow accent-4" max-width="800" white>Movement special</v-toolbar>
            <h1>Exchange without see</h1>
            <v-list-item-group color="primary" style="margin:5% 0% 0% 0%" v-for="(player, index) in players"  v-bind:key="player" >
              <v-row v-if="username!=player.player && index!=game.playernmosca" >
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                    <v-list-item-title v-text="player.player"></v-list-item-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-container style="background:green;">
                        <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                          <img v-if="playerExchange.cardn==index2 && playerExchange.playern==index" v-on:click="playerExchange={playern:index,cardn:index2}" style="width:35px; margin:0%; box-shadow:10px 10px 5px #181733; filter:brightness(120%); transform:scale(1.07); transition:all .3s ease-in-out;" :src="server + '/images/cards/generic/trasera.png'">
                          <img v-else v-on:click="playerExchange={playern:index,cardn:index2}" style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                        </div>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
              <v-row v-else >
                <h1>Select your card</h1>
                <v-container style="background:green;">
                  <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                    <img v-if="playeractionExchange.cardn==index2 && playeractionExchange.playern==index" v-on:click="playeractionExchange={playern:index,cardn:index2}"  style="width:35px; margin:0%; box-shadow:10px 10px 5px #181733; filter:brightness(120%); transform:scale(1.07); transition:all .3s ease-in-out; " :src="server + '/images/cards/generic/trasera.png'">
                    <img v-else v-on:click="playeractionExchange={playern:index,cardn:index2}"  style="width:35px; margin:0%;" :src="server + '/images/cards/generic/trasera.png'">
                  </div>
                </v-container>
              </v-row>
            </v-list-item-group>
            <v-card-actions class="justify-end" max-width="800">
              <v-btn color="primary" text v-on:click="changeCardwithoutsee(1)">EXCHANGE</v-btn>
              <v-spacer></v-spacer>
              <v-btn  color="error" text  v-on:click="changeCardwithoutsee(0)">CANCEL</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      <!--Dialog exchange see movement special-->
      <v-dialog transition="dialog-top-transition" persistent max-width="800" v-model="dialogchangecardseemovementspecial">
          <v-card max-width="800" class="indigo lighten-5" >
            <v-toolbar class="yellow accent-4" max-width="800" white>Movement special</v-toolbar>
            <h1>Exchange see</h1>
            <v-list-item-group color="primary" style="margin:5% 0% 0% 0%" v-for="(player, index) in players"  v-bind:key="player" >
              <v-row v-if="username!=player.player && index!=game.playernmosca">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                    <v-list-item-title v-text="player.player"></v-list-item-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-container style="background:green;">
                        <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                          <img v-if="showCardsExchange && playerExchange.cardn==index2 && playerExchange.playern==index" style="width:35px; margin:0%; box-shadow:10px 10px 5px #181733; filter:brightness(120%); transform:scale(1.07); transition:all .3s ease-in-out;" :src="server + srcshowcardExchange2">
                          <img v-else-if="playerExchange.cardn==index2 && playerExchange.playern==index" style="width:35px; margin:0%; box-shadow:10px 10px 5px #181733; filter:brightness(120%); transform:scale(1.07); transition:all .3s ease-in-out;" :src="server + '/images/cards/generic/trasera.png'">
                          <img v-else-if="showCardsExchange" style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                          <img v-else v-on:click="playerExchange={playern:index,cardn:index2}" style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                        </div>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
              <v-row v-else >
                <h1>Select your card</h1>
                <v-container style="background:green;">
                  <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                    <img v-if="showCardsExchange && playeractionExchange.cardn==index2"  style="width:35px; margin:0%; box-shadow:10px 10px 5px #181733; filter:brightness(120%); transform:scale(1.07); transition:all .3s ease-in-out; " :src="server + srcshowcardExchange1">
                    <img v-else-if="playeractionExchange.cardn==index2 && playeractionExchange.playern==index" style="width:35px; margin:0%; box-shadow:10px 10px 5px #181733; filter:brightness(120%); transform:scale(1.07); transition:all .3s ease-in-out; " :src="server + '/images/cards/generic/trasera.png'">
                    <img v-else-if="showCardsExchange" style="width:35px; margin:0%;" :src="server + '/images/cards/generic/trasera.png'">
                    <img v-else v-on:click="playeractionExchange={playern:index,cardn:index2}"  style="width:35px; margin:0%;" :src="server + '/images/cards/generic/trasera.png'">
                  </div>
                </v-container>
              </v-row>
            </v-list-item-group>
            <v-card-actions class="justify-end" max-width="800">
              <v-btn v-if="showCardsExchange" color="primary" text v-on:click="changeCardwithoutsee(2)">EXCHANGE</v-btn>
              <v-btn v-else color="primary" text v-on:click="showCardschangesee()">SHOW CARDS</v-btn>
              <v-spacer></v-spacer>
              <v-btn  color="error" text  v-on:click="changeCardwithoutsee(0)">CANCEL</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      <!--Dialog give card to another player-->
      <v-dialog transition="dialog-top-transition" persistent max-width="800" v-model="dialoggiveOneCardtoanother">
          <v-card max-width="800" class="indigo lighten-5" >
            <v-toolbar color="#FFFCF8" max-width="800" white>throw card collected  or another card</v-toolbar>
            <h1>choose card you want change</h1>
            <v-list-item-group color="primary" style="margin:5% 0% 0% 0%" v-for="(player, index) in players"  v-bind:key="player" >
              <v-row v-if="username==player.player" >
                <v-container style="background:green;">
                  <div style="float:left;" v-for='(card,index2) in players[index].cards'  v-bind:key='card' class=''>
                      <img v-on:click="giveCardtoanother(index,index2)"  style="width:35px; margin:0%" :src="server + '/images/cards/generic/trasera.png'">
                  </div>
                </v-container>
              </v-row>
            </v-list-item-group>
            <v-card-actions class="justify-end" max-width="800">
            </v-card-actions>
          </v-card>
      </v-dialog>


      <!--Dialog error-->
      <v-dialog transition="dialog-top-transition" max-width="800" v-model="dialogerror">
          <v-card max-width="800" class="red accent-1" >
            <v-toolbar class="red accent-4" max-width="800" white>{{errorsocket}}</v-toolbar>
            <h1>{{errorsocket}}</h1>
            <v-card-actions class="justify-end">
              <v-btn text v-on:click="dialogerror=false">Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      <!--Dialog Exit!!!-->
      <v-dialog scrollable max-width="290"  v-model="dialogexit">
        <v-card dark color="indigo" max-width="290">
          <v-card-title class="headline">
            Are you sure to go out?
          </v-card-title>
          <v-card-text>
            If you to go out, you can't continue play this room
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialogexit = false">
              Cancel :)
            </v-btn>
            <v-btn text @click="dialogexit = false">
              Yes :(
            </v-btn>
          </v-card-actions>
        </v-card>    
      </v-dialog>
      <!--Dialog mosca!!!-->
      <v-dialog scrollable max-width="800" v-model="dialogmosca">
          <img  style="width:100%; margin:0%" :src="server + '/images/mosca/mosca.svg'">         
      </v-dialog>
  

    </v-container>
</template>

<script>
//import axios from "axios";
import Skills from './Skills.vue';

export default {
data () {
    return {
      //dialogs
      dialogcollectcard: false,
      dialogviewyourcardmovementspecial:false,
      dialogviewcardanotherplayermovementspecial:false,
      dialogchangecardwithoutseemovementspecial:false,
      dialogchangecardseemovementspecial:false,
      dialogerror:false,
      dialogmosca:false,
      dialogwinner:false,
      dialogexit:false,
      //general
      username: localStorage.getItem('username'),
      rol: localStorage.getItem('rol'),
      room:localStorage.getItem('roomcode'),
      server:"http://localhost:4000",
      //game properties
      map:'',
      players:[],
      game:null,
      giveCard2:'/images/cards/generic/trasera.png',
      nameplayergiveyourCard:'',
      playeractionExchange:{playern:-1,cardn:-1},
      playerExchange:{playern:-1,cardn:-1},
      showCardsExchange:false,
      srcshowcardExchange1:'/images/cards/generic/trasera.png',
      srcshowcardExchange2:'/images/cards/generic/trasera.png',
      errorsocket:'',
      viewtwocard:false,
      winner:[],
    }
  },
  name: "Game",
  components: {
    Skills
  },
  methods:{
    getstatussuccessful(result){
        console.log(result);
        this.map=result.game.map;
        this.game=result.game;
        console.log(this.map);
        this.players=result.game.players;    
    },
    getcheckturnroundsuccessful(){
        this.viewtwocard=true;
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
        let senditem={playerCardmove:player, cardn:cardn}
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
    toprincipal(){
      location.replace('/principal');
    },
    mosca(){
      this.$socket.emit('mosca');
    },
    giveCard(){
      this.$socket.emit('giveCard');
    },
    throwCard(index,index2,action,index3) {//
      let senditem={playern:index, cardnchange:index2,action:action,card:index3}
      this.$socket.emit('throwCard',senditem);
      this.dialogcollectcard=false;
    },
    viewCard(index,index2,action) {//
    let senditem={};
      if(action!=2) senditem={playern:index, cardn:index2};
      else senditem={playern:index, cardn:index2,action:2};
      this.$socket.emit('viewCard',senditem);
    },
    changeCardwithoutsee(action) {//
      if((this.playeractionExchange.cardn!=-1 && this.playerExchange.cardn!=-1) || action==0){
        console.log("entraaaa aa cambiooo");
        let senditem={playeractionnchange:this.playeractionExchange.playern, cardnactionchange:this.playeractionExchange.cardn,playernchange:this.playerExchange.playern,cardnchange:this.playerExchange.cardn,action:action}
        this.$socket.emit('changeCardwithoutsee',senditem);
        this.dialogchangecardwithoutseemovementspecial=false;
        this.dialogchangecardseemovementspecial=false;
        
        this.playeractionExchange={playern:-1,cardn:-1};
        this.playerExchange={playern:-1,cardn:-1};
        this.showCardsExchange=false;
        this.srcshowcardExchange1='/images/cards/generic/trasera.png';
        this.srcshowcardExchange2='/images/cards/generic/trasera.png';

      }
    },
    showCardschangesee() {//
      if(this.playeractionExchange.cardn!=-1 && this.playerExchange.cardn!=-1){
        let senditem={playeractionnchange:this.playeractionExchange.playern, cardnactionchange:this.playeractionExchange.cardn,playernchange:this.playerExchange.playern,cardnchange:this.playerExchange.cardn}
        this.$socket.emit('showCardschangesee',senditem);
      }
    },
    giveCardtoanother(index,index2) {//
      console.log(this.nameplayergiveyourCard);
      let senditem={playerreceive:this.nameplayergiveyourCard,playern:index,cardn:index2}
      this.$socket.emit('giveCardtoanother',senditem);
    },


    //-----------actions users functions call for sockets on ---------------------------
    moscasuccessful(){
      this.dialogmosca=true;
       setTimeout(function(){
         this.dialogmosca=false;
      }.bind(this), 1000);
    },
    checkwinnerstart(result){
      setTimeout(function(){
        this.$socket.emit('checkwinnerstartinprocess');
      }.bind(this), result.interval);
    },
    winnersuccessful(result){
      this.winner=result.winner;
      this.dialogwinner=true;
    },
    endDragsuccessful(result){
      console.log(result)
      console.log(this.server);

      document.getElementById(result.idCard).setAttribute('src', this.server+'/images/cards/generic/trasera.png');
    },

    showcardsuccessful(result){
        this.viewtwocard=true;
        console.log(result.imageshow);
        let idCard=result.player+'|'+result.cardn;
        document.getElementById(idCard).setAttribute('src', this.server+result.imageshow); 
        
        this.dialogviewyourcardmovementspecial=false;
        this.dialogviewcardanotherplayermovementspecial=false;
        if(result.action==1){
          var server=this.server;
          setTimeout(function(){
            console.log(server);
            document.getElementById(idCard).setAttribute('src', server+"/images/cards/generic/trasera.png");
          }, 7000);
        }
    },
    givecardsuccessful(result){
        this.giveCard2=result.card;
        this.dialogcollectcard=true; 
    },
    viewyourcardmovementspecial(){
        this.dialogviewyourcardmovementspecial=true; 
    },
    viewcardanotherplayermovementspecial(){
        this.dialogviewcardanotherplayermovementspecial=true; 
    },
    changecardwithoutseemovementspecial(){
        this.dialogchangecardwithoutseemovementspecial=true; 
    },
    changecardseemovementspecial(){
        this.dialogchangecardseemovementspecial=true; 
    },
    giveOneCardtoanothermovement(result){
        console.log("hollaaaa394754545");
        this.nameplayergiveyourCard=result.giveCardtoplayer;
        this.dialoggiveOneCardtoanother=true; 
    },
    giveCardtoanothersuccessful(){
        this.nameplayergiveyourCard='';
        this.dialoggiveOneCardtoanother=false; 
    },
    showcardchangesuccessful(result){
      this.srcshowcardExchange1=result.imageshow1;  
      this.srcshowcardExchange2=result.imageshow2; 
      this.showCardsExchange=true;
    },
    errormessagesocket(result){
      this.errorsocket=result.error;  
      this.dialogerror=true;
    },
  },
  sockets:{//sockets listening for call methods
    getstatussuccessful:function (data) {this.getstatussuccessful(data)},
    moscasuccessful:function () {this.moscasuccessful()},
    checkwinnerstart:function (data) {this.checkwinnerstart(data)},
    winnersuccessful:function (data) {this.winnersuccessful(data)},
    getcheckturnroundsuccessful:function () {this.getcheckturnroundsuccessful()},
    endDragsuccessful:function (data) {this.endDragsuccessful(data)},
    showcardsuccessful:function (data) {this.showcardsuccessful(data)},
    givecardsuccessful:function (data) {this.givecardsuccessful(data)},
    viewyourcardmovementspecial:function () {this.viewyourcardmovementspecial()},
    viewcardanotherplayermovementspecial:function () {this.viewcardanotherplayermovementspecial()},
    changecardwithoutseemovementspecial:function () {this.changecardwithoutseemovementspecial()},
    changecardseemovementspecial:function () {this.changecardseemovementspecial()},
    giveOneCardtoanothermovement:function (data) {this.giveOneCardtoanothermovement(data)},
    giveCardtoanothersuccessful:function () {this.giveCardtoanothersuccessful()},
    showcardchangesuccessful:function (data) {this.showcardchangesuccessful(data)},
    errormessagesocket:function (data) {this.errormessagesocket(data)},
  },
  mounted(){//one emit for get status game
    let form = {player:this.username,roomcode:this.room};
    this.$socket.emit('getstatusGame', form);
    this.$socket.emit('getcheckturnround');
  }
}
</script>

<style>
.drop-zone {
    background-color: #eee;
    padding: 2%;
    width: 60%;
    margin: 0%;
    border:2px solid #3F51B5;
  }
</style>