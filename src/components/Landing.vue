<template>
  <div id="app">
    <v-app id="inspire">
      <v-row class="mb-4">
        <v-col cols="3">
          <div class="ml-6 float-left">
            <img class="logo" src="../assets/logo.png" width="64" height="64"/>
            <h1 class="text-center">
              <span class="brown-text">Moody</span><span class="pl-2 green-text">tags</span>
            </h1>
          </div>
        </v-col>
        <v-col cols="9">
          <img class="app-screenshot" src="../assets/screen-mockup.png"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <div class="ml-6">
            <h1 class="green-text mb-6">A library of your great playlists, made better with tags.</h1>
            <p class="font-weight-medium dark-blue-text">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.<br><br>
              The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            </p>
          </div>
        </v-col>
        <v-col cols="7">
        </v-col>
      </v-row>
      <v-row class="brown-background">
        <v-col cols="6" class="pb-0 mt-6">
          <div class="pt-4">
            <div class="text-center">
              <v-btn
                href="http://localhost:3000/auth/spotify"
                class="mt-2 mb-6 font-weight-bold"
                x-large
                color="success"
                dark
              >
                Login with Spotify
              </v-btn>
            </div>
            <hgroup class="ml-6 mt-6">
              <h1 class="green-text font-weight-black">Free.</h1>
              <h1 class="green-text font-weight-black">Open Source.</h1>
            </hgroup>
          </div>
        </v-col>
      </v-row>
      <v-row align="end" class="brown-background">
        <v-col class="py-0 pb-2 text-center">
          <span class="px-1 brown-text">Made for those with too much playlists to handle.</span><br><span class="px-2 brown-text">Say hi &#128073;</span>
          <a href="https://dimitarralev.net" class="pr-4 font-weight-medium home-link" target="_blank" rel="noopener noreferrer">Dimitar Ralev</a>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>


<script>

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
.logo {
  display: block;
  margin: 0 auto;
}
.brown-text {
  color: #997b6f;
}
.green-text {
  color: #00bea6;
}
.dark-blue-text {
  color: #3c3f66;
}
.brown-background {
  background: #ecdace;
}
.app-screenshot {
  position: absolute;
  width: 52%;
  top: 5%;
  right: 0;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
.home-link {
  color: #67a7e4;
  text-decoration: none;
}
.home-link:hover {
  text-decoration: underline;
}
</style>

