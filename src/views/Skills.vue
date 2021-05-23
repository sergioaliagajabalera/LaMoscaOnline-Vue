<template>
    <v-container style="margin:0px; padding:0%; border:0%" fluid grid-list-lg text-lg-left >
        <v-btn icon v-on:click="dialogskill=true" style="margin:0%">
            <v-icon>mdi-account-box</v-icon>
        </v-btn>
        <!--Dialog error-->
        <v-dialog  max-width="374" v-model="dialogskill">
            <v-card class="mx-auto" max-width="374" style="margin:0">
                <v-toolbar color="indigo" dark>
                    <img :src="'https://www.countryflags.io/'+showskillsprofile.player.country+'/shiny/64.png'">
                    <v-toolbar-title>Skills: {{username}}</v-toolbar-title>
                </v-toolbar>
                <v-container fluid>
                    <v-row >
                        <v-col class="text-md-center" >
                            <v-badge style="margin:2%" color="green" :content="showskillsprofile.skills.wins">
                                <v-icon>mdi-trophy</v-icon>
                            </v-badge>
                            <v-badge style="margin:2%" color="red" :content="showskillsprofile.skills.losses">
                                <v-icon>mdi-trophy-broken</v-icon>
                            </v-badge>
                            <v-badge style="margin:2%" color="#26C6DA" :content="showskillsprofile.skills.percent+'%'">
                                <v-icon>mdi-percent</v-icon>
                            </v-badge>
                            <v-badge style="margin:2%" color="#4A148C" :content="showskillsprofile.skills.xp+'xp'">
                                <v-icon>mdi-star-four-points</v-icon>
                            </v-badge>  
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
props: ['username',],   
data () {
    return {
     //dialogs
     dialogskill:false,
     //general
     showskillsprofile:{},
   }
  }, 
  name: "skills",
  
  methods:{
    getSkills() { 
        axios.get('http://localhost:4000/showskillsandprofile/?username='+this.username).then((response)=>{
            if(response.data.status==2) console.log(response.data.data);
            else if(response.data.status==0) console.log(response.data.data); 
            else{
                this.showskillsprofile=response.data.data;
            }
        })
    }
  },

  mounted(){
    this.getSkills();//call method for recover the user skills
 }

}
</script>

<style>

</style>