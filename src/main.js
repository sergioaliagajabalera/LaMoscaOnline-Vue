import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import './styles/styles.css';
import socket from './socket';
//import VueSocketIO from 'vue-socket.io'
//import SocketIO from 'socket.io-client'


Vue.config.productionTip = false;

/* Establish Connection */
//const socketConnection = SocketIO('http://localhost:8888');

//Vue.use();

new Vue({
  router,
  store,
  vuetify,
  /*socket:new VueSocketIO({
    debug: true,
    connection:socketConnection
  }),*/
  socket,
  render: (h) => h(App),
}).$mount("#app");
