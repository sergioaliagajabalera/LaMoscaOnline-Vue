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
        <v-container style="margin:0% padding:0%; border:0%; background:#FFFCF8" fluid grid-list-lg text-lg-left >
        <v-row style color="success" >
            
            <v-col md="6">
                <v-form v-model="valid">
                    <h1>Configuration Room</h1>
                    <v-carousel hide-delimiters style="width:100%; height:300px; background:black;">
                        <v-carousel-item style="width:100%;"
                        v-for="(item,i) in maps" :key="i"
                        reverse-transition="fade-transition"
                        transition="fade-transition">
                        <div class="display-3">MAPAS</div>
                        <v-img :src="item.src" style="width:100%;height:auto;">
                            <v-btn style color="black" class="mr-4 white--text" v-on:click="map=item.src" >SELECTED</v-btn>
                        </v-img>
                        </v-carousel-item>
                    </v-carousel>
                    <v-select
                    v-model="select"
                    :items="sizes"
                    :rules="[v => !!v || 'Size is required']"
                    label="Size"
                    required
                    ></v-select>
                    <v-btn  style color="black" width="100%" class="mr-4 white--text" v-on:click="formSubmit()">
                        Create Game
                    </v-btn>
                    <v-divider 
                        horizontal
                    ></v-divider> 
                    <v-raw>
                    <v-col md="10">
                        <v-text-field v-model="codejoinroom" :rules="nameRules" :counter="100" label="Code join" required></v-text-field>
                        <v-btn style color="black"  class="mr-4 white--text" v-on:click="formSubmit()" >Game Join</v-btn>
                    </v-col>
                    </v-raw>
                </v-form>
            </v-col>
            <v-divider
                vertical
            ></v-divider>
            <v-col md="6">
                <h1 >SALA</h1>
                <v-card class="mx-auto" max-width="300" tile>
                    <v-list flat>
                        <v-subheader>PLAYERS</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="primary">
                            <v-list-item
                            v-for="(item, i) in players"
                            :key="i"
                            >
                            <v-list-item-icon>
                                <v-icon v-text="item.icon">mdi-account-box</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item"></v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-container>
</template>

<script>
import axios from "axios";
export default {
data () {
    return {
      //general
      axios:axios,
      username: localStorage.getItem('username'),
      rol: localStorage.getItem('rol'),
      codejoinroom:'',
        maps:[
          {src:'https://images.pexels.com/photos/262333/pexels-photo-262333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
         {src:'https://images.pexels.com/photos/1831114/pexels-photo-1831114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'} ],
      //form
      sizes:[2,3,4,5,6],
      map:'',
      players:['sergio','sergio2','aliaga'],
    }
  },
  name: "Room",
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

  //communications web Sockets
  
}
</script>

<style>

</style>