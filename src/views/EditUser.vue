<template>
  <v-container style="margin:0% padding:0%; border:0%;" fluid grid-list-lg text-lg-left class="text-md-center">
    <headerm ref="headerm" ></headerm>
    <v-row style="margin:0%"  >
      <v-col md="6">
        <v-form v-model="valid" style="margin-top:10%; margin-bottom:2%" >
          <v-container>
            <h1>Edit account</h1>
            <v-text-field  id="email" v-model="email" :rules="emailRules" label="example@gmail.com" required></v-text-field>
            <v-select v-model="country" :items="countries" :rules="[(v) => !!v || 'Country is required']" label="Country" required >
              <template v-slot:item="{ item }">
                <img :src="'https://www.countryflags.io/'+item+'/shiny/64.png'">{{ item }}
              </template>
            </v-select>
          </v-container>
          <v-btn style color="indigo" width="100%" class="mr-4 white--text" v-on:click="formeditUser()">
            EDIT
          </v-btn>
            <p v-if="errorform!=false" class="red--text">{{errorform}}</p>
            <v-btn v-on:click="dialogdeletealert=true" class="mr-4 white--text" color="error" >Delete Account</v-btn>
        </v-form>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col md="6">
        <v-form v-model="valid2" style="margin-top:10%; margin-bottom:2%" >
          <v-container>
            <h1>Change password</h1>
            <v-text-field  type="password" id="password" v-model="password" :rules="passwordRules" :counter="25" label="Password" required></v-text-field> 
            <v-text-field  type="password" id="passwordr" v-model="passwordr" :rules="passwordrRules" :counter="25" label="Repeat password" required></v-text-field> 
          </v-container>
          <v-btn  style color="indigo" width="100%" class="mr-4 white--text" v-on:click="formchangepasswordUser()">
              Change
            </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <!-- POP UPS-->
    <!--Dialog Exit!!!-->
      <v-dialog scrollable max-width="290"  v-model="dialogdeletealert">
        <v-card dark color="error" max-width="290">
          <v-card-title class="headline">
            Are you sure of delete account?
          </v-card-title>
          <v-card-text>
            This action is irreversible 
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialogdeletealert = false">
              Cancel :)
            </v-btn>
            <v-btn text @click="deleteUser()">
              Yes :(
            </v-btn>
          </v-card-actions>
        </v-card>    
      </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import Headerm from './Headermosca';
import { bus } from '../main';
export default {
data () {
    return {
      //dialogs
      dialogdeletealert: false,
      //general
      axios:axios,
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
      password: '',
      passwordr:'',
      email: '',
      country: '',
      //form and rules
      errorform:false,
      valid: false,
      valid2: false,
      passwordRules: [
        v => !!v || 'Field is required',
        v => v.length >= 8 || 'Field must be more than 8 characters',
      ],
      passwordrRules: [
        v => !!v || 'Field is required',
        v => v == this.password || 'Second password is not the same that firts',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      countries:['ar','br','cn','de','es','fr','gr','it','jp','kr','mx','nl','pt','ro','ru','sa','se','th','tr','us','uy','za']
    }
  },
  name: "edituser",
  components: {
    Headerm
  },
  methods:{
    formeditUser() { 
     if(this.valid){
      var form={
        username:this.username,
        email:this.email,
        country:this.country,
      }
      axios.post('http://localhost:4000/editUser',
        form,
      ).then((response)=>{
        if(response.data.status==3) this.errorform=response.data.data;
        else if(response.data.status==0) console.log(response.data.error);
        else{
          bus.$emit('logout');
        }
      })
     };   
    },
    formchangepasswordUser() { 
      if(this.valid){
      var form={
        username:this.username,
        password:this.password,
      }
      axios.post('http://localhost:4000/changepasswordUser',
        form,
      ).then((response)=>{
        if(response.data.status==3) this.errorform=response.data.data;
        else if(response.data.status==0) console.log(response.data.error);
        else{
          bus.$emit('logout');
        }
      })
     };
    },
    deleteUser() { 
      if(this.valid){
      var form={
        username:this.username,
      }
      axios.post('http://localhost:4000/deleteUser',
        form,
      ).then((response)=>{
        if(response.data.status==3) this.errorform=response.data.data;
        else if(response.data.status==0) console.log(response.data.error);
        else{
          bus.$emit('logout');
        }
      })
     };
    },

  },
  beforeCreate() {
    if(!localStorage.getItem('username')) location.replace('/') ;
  },
  mounted(){//get data of the user to edit
    axios.get('http://localhost:4000/getdatauser?username='+this.username,
    ).then((response)=>{
      if(response.data.status==3) this.errorform=response.data.data;
      else if(response.data.status==0) console.log(response.data.data); 
      else{
        this.email=response.data.data.email;
        this.country=response.data.data.country;
      }
    })  
  }

};
</script>

<style>

</style>