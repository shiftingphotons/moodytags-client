<template>
  <div id="app">
    <v-app id="inspire">
      <div class="d-flex">
        <div class="logo-container">
          <img class="logo" src="../assets/logo.png" width="64" height="64">
          <h1 class="text-center">
            <span id="moody">Moody</span><span id="tags">tags</span>
          </h1>
        </div>
      </div>
    </v-app>
  </div>
</template>


<script>

import 'vuetify/dist/vuetify.min.css';

export default {
	name: 'Landing',
  data () {
    return { }
  },
  components: {
  }
}

</script>

<style scoped>
#app {
    margin: 0 auto;
    font-family: Roboto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #343534;
}
.logo-container {
  width: 250px;
}
.logo {
  display: block;
  margin: 0 auto;
}
#moody {
  color: #997b6f;
}
# tags {
  color: #00bea6;
}
</style>

