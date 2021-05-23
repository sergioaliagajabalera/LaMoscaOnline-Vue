<template>
  <v-container style="margin:0% padding:0%; border:0%;" fluid grid-list-lg text-lg-left >
        <headerm></headerm>
        <v-container style="margin:0% padding:0%; border:0%;" fluid grid-list-lg text-lg-left >
        <v-row style color="success" >
            
            <v-col md="6">
                <v-form  style="margin:0%" v-model="valid">
                    <h1>Configuration Room</h1>
                    <v-carousel hide-delimiters style="width:100%; height:300px; background:black;">
                        <v-carousel-item style="width:100%;"
                        v-for="(item,i) in maps" :key="i"
                        reverse-transition="fade-transition"
                        transition="fade-transition">
                        <div class="display-3"  >MAPS</div>
                        <v-img :src="item.src" style="width:100%;height:auto;">
                            <v-btn style color="black" class="mr-4 white--text" v-on:click="map=item.src" >SELECTED</v-btn>
                        </v-img>
                        </v-carousel-item>
                    </v-carousel>
                    <v-select
                    v-model="size"
                    :items="sizes"
                    :rules="[v => !!v || 'Size is required']"
                    label="Size"
                    required
                    ></v-select>
                    <v-btn  style color="black" width="100%" class="mr-4 white--text" v-on:click="creategame()">
                        Create Game
                    </v-btn>
                    <v-divider 
                        horizontal
                    ></v-divider> 
                    <v-raw>
                    <v-col md="10">
                        <v-text-field v-model="codejoinroom" :rules="nameRules" :counter="100" label="Code join" required></v-text-field>
                        <v-btn style color="black"  class="mr-4 white--text" v-on:click="joingame()" >Game Join</v-btn>
                    </v-col>
                    </v-raw>
                </v-form>
            </v-col>
            <v-divider
                vertical
            ></v-divider>
            <v-col md="6" class="text-md-center" >
                <h1 >ROOM {{room}}</h1>
                <v-card class="mx-auto" max-width="300" tile>
                    <v-list flat>
                        <v-subheader dark class="indigo" >PLAYERS</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="primary">
                            <v-list-item
                            v-for="(item, i) in players"
                            :key="i"
                            >
                            <v-list-item-icon>
                                <skills :username='item'></skills>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item"></v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
                <div v-if="size==sizeROOMtemp">Sí</div>
                <v-btn style color="indigo"  class="mr-4 white--text" v-on:click="startgame()" >Start Game</v-btn>
            </v-col>
        </v-row>
        </v-container>
    </v-container>
</template>
<script src="https://cdn.socket.io/4.0.2/socket.io.min.js" integrity="sha384-Bkt72xz1toXkj/oEiOgkQwWKbvNYxTNWMqdon3ejP6gwq53zSo48nW5xACmeDV0F" crossorigin="anonymous"></script>
<script>
import axios from "axios";
import Skills from './Skills.vue';
import Headerm from './Headermosca';

export default {
data () {
    return {
      //general
      axios:axios,
      username: localStorage.getItem('username'),
      rol: localStorage.getItem('rol'),
        maps:[
          {src:'https://images.pexels.com/photos/262333/pexels-photo-262333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
         {src:'https://images.pexels.com/photos/1831114/pexels-photo-1831114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'} ],
      //form
      sizes:[2,3,4,5,6],
      size:null,
      map:'',
      players:[],
      room:'',
      codejoinroom:'',
      //enable and disable elements doom
      sizeROOMtemp: null,
    }
  },
  name: "Room",
  components: {
    Skills,
    Headerm
  },
  methods:{
    //emits web Sockets	
    creategame(){
        console.log(this.$router);
        const form = { 'player': this.username, 'map': this.map, 'size':this.size };
        this.$socket.emit('createGame', form);
    },
    joingame(){
        const form = { 'player': this.username, 'roomcode': this.codejoinroom };
        this.$socket.emit('joinGame', form);
    },
    startgame(){
        const form = {'playerlenght':this.players.length, 'roomcode':this.room};
        this.$socket.emit('startGame', form);
    },
    //methods sockets.on
    createsuccessful(roomcode) {
        console.log(roomcode);
        this.players=[this.username];
        this.room=roomcode;
    },
    joinsuccessful(players) { 
        console.log(players);
        this.players=players;
        console.log(this.players[0]);
        if(this.username!=this.players[0])this.room=this.codejoinroom;
    },
    startsuccessful(value) { 
        console.log(value);
        localStorage.setItem('roomcode',this.room);
        location.replace('/Game');
    }
  },
  sockets:{//sockets listening for call methods
    createsuccessful:function (data) {this.createsuccessful(data)},
    joinsuccessful:function (data) {this.joinsuccessful(data)},
    startsuccessful:function (data) {this.startsuccessful(data)},
  },
  wacth:{//is not computed, because in this case is not necessary optimized this code because not intervene more of a data property
      players: function (val) {
      this.sizeROOMtemp = val.lenght
    },
  }
 
}

</script>

<style>

</style>