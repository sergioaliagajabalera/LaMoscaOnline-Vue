<template>
  <v-container style="margin:0% padding:0%; border:0%;" fluid grid-list-lg text-lg-left class="text-md-center">
    <headerm ref="headerm" ></headerm>
    <v-row style="margin:0%"  >
      <v-col md="6">
        <v-form v-model="valid" style="margin-top:10%; margin-bottom:2%" >
        <v-container>
          <h1>New User</h1>
          <v-text-field  v-model="username" :rules="usernameRules" :counter="25" label="Username" required></v-text-field>
          <v-text-field  type="password" id="password" v-model="password" :rules="passwordRules" :counter="25" label="Password" required></v-text-field> 
          <v-text-field  id="email" v-model="email" :rules="emailRules" label="example@gmail.com" required></v-text-field>
          <v-select v-model="country" :items="countries" :rules="[(v) => !!v || 'Country is required']" label="Country" required >
            <template v-slot:item="{ item }">
              <img :src="'https://www.countryflags.io/'+item+'/shiny/64.png'">{{ item }}
            </template>
          </v-select>
          <v-text-field  v-model="role" :rules="roleRules" :counter="25" label="Role" required></v-text-field>
        </v-container>
        <v-btn  style color="indigo" width="100%" class="mr-4 white--text" v-on:click="formSubmit()">
            Create
        </v-btn>
        <p v-if="errorform!=false" class="red--text">{{errorform}}</p>
      </v-form>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col md="6">
        <v-form style="margin-top:10%; margin-bottom:2%" >
          <v-container>
            <h1>Search</h1>
          </v-container>
          <v-text-field  v-model="username" :rules="usernameRules" :counter="25" label="Username" required></v-text-field>
          <v-btn style color="indigo" width="100%" class="mr-4 white--text" v-on:click="search()">
            Search
          </v-btn>
            <p v-if="errorform3!=false" class="red--text">{{errorform3}}</p>
        </v-form>
        <v-form v-model="valid3" style="margin-top:10%; margin-bottom:2%" >
          <v-container>
            <h1>Edit account</h1>
            <v-text-field   v-model="email" :rules="emailRules" label="example@gmail.com" required></v-text-field>
            <v-select v-model="country" :items="countries" :rules="[(v) => !!v || 'Country is required']" label="Country" required >
              <template v-slot:item="{ item }">
                <img :src="'https://www.countryflags.io/'+item+'/shiny/64.png'">{{ item }}
              </template>
            </v-select>
            <v-text-field  v-model="role" :rules="roleRules" :counter="25" label="Role" required></v-text-field>
          </v-container>
          <v-btn style color="indigo" width="100%" class="mr-4 white--text" v-on:click="formeditUser()">
            EDIT
          </v-btn>
            <p v-if="errorform2!=false" class="red--text">{{errorform2}}</p>
        </v-form>
        <v-form v-model="valid2" style="margin-top:10%; margin-bottom:2%" >
          <v-container>
            <h1>Change password</h1>
            <v-text-field  type="password" v-model="password" :rules="passwordRules" :counter="25" label="Password" required></v-text-field> 
            <v-text-field  type="password"  v-model="passwordr" :rules="passwordrRules" :counter="25" label="Repeat password" required></v-text-field> 
          </v-container>
          <v-btn  style color="indigo" width="100%" class="mr-4 white--text" v-on:click="formchangepasswordUser()">
              Change
          </v-btn>
          <v-btn v-on:click="dialogdeletealert=true" class="mr-4 white--text" color="error" >Delete Account</v-btn>
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

export default {
data () {
    return {
      //dialogs
      dialogdeletealert: false,
      //general
      axios:axios,
      username: '',
      role: '',
      password: '',
      passwordr:'',
      email: '',
      country: '',
      //form and rules
      errorform:false,
      errorform2:false,
      errorform3:false,
      valid: false,
      valid2: false,
      valid3: false,
      usernameRules: [
        v => !!v || 'Field is required',
        v => v.length >= 4 || 'Field must be more than 4 characters',
      ],
      roleRules: [
        v => !!v || 'Field is required',
        v => (v=='user' || v=='admin') || 'Role is user or admin',
      ],
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
  name: "managementuser",
  components: {
    Headerm
  },
  methods:{
    formSubmit() { 
      console.log(this.country);
     if(this.valid){
      var form={
        username:this.username,
        password:this.password,
        email:this.email,
        country:this.country,
        role:this.role
      }
      axios.post('http://localhost:4000/register',
        form,
      ).then((response)=>{
        if(response.data.status==3) this.errorform=response.data.data;
        else if(response.data.status==0) console.log(response.data.data); 
        else alert('Create user successful');
      })
     };
    },
    search(){
     axios.get('http://localhost:4000/getdatauserwithoutlogin?username='+this.username,
      ).then((response)=>{
        if(response.data.status==3) this.errorform3=response.data.data;
        else if(response.data.status==0) console.log(response.data.data); 
        else{
            this.email=response.data.data[0].email;
            this.country=response.data.data[0].country;
            this.role=response.data.data[0].rol;
        }
      }) 
    },
    formeditUser() { 
     if(this.valid3){
      var form={
        username:this.username,
        email:this.email,
        country:this.country,
        role:this.role
      }
      axios.post('http://localhost:4000/editUser',
        form,
      ).then((response)=>{
        if(response.data.status==3) this.errorform2=response.data.data;
        else if(response.data.status==0) console.log(response.data.error);
        else alert('Edit user successful');
      })
     };   
    },
    formchangepasswordUser() { 
      if(this.valid2){
      var form={
        username:this.username,
        password:this.password,
      }
      axios.post('http://localhost:4000/changepasswordUser',
        form,
      ).then((response)=>{
        if(response.data.status==3) this.errorform=response.data.data;
        else if(response.data.status==0) console.log(response.data.error);
        else alert('Change password user successful');
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
        else this.dialogdeletealert=false;
      })
     };
    },

  },
  beforeCreate() {
    if(!localStorage.getItem('username') || localStorage.getItem('role')!='admin') location.replace('/') ;
  },

};
</script>

<style>

</style>