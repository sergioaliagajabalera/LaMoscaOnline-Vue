<template >
<div id="app">
  <v-app>
   <v-content class="indigo lighten-5">
      <router-view></router-view>
   </v-content>
  </v-app>
</div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>