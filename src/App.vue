<template>
  <div id="app">
    <v-app>
      <AppBar />
      <v-main>
        <router-view :key="$route.fullPath" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppBar from "@/components/Commons/AppBar";
export default {
  components: { AppBar }
};
</script>

<style lang="scss">
@import "./src/scss/variables";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: $c-light-dark;
}
</style>
