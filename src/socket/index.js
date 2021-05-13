import Vue from 'vue'
//import store from '../store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const socketConnection = SocketIO('http://localhost:8888');


const socket= new VueSocketIO({
    debug: true,
    connection:socketConnection
});

Vue.use(socket);
export default socket;