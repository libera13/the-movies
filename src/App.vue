<template>
  <div id="app">
    <v-app>
      <AppBar />
      <v-main>
        <router-view />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
