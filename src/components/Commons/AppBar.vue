<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <h2>The movies</h2>
      </div>
      <v-spacer></v-spacer>
      <p>{{ userName }}</p>
    </v-app-bar>
    <v-navigation-drawer app dark disable-resize-watcher v-model="drawer">
      <div class="navigation-btn">
        <v-btn text depressed @click="drawer = !drawer">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-list class="navigation-list" nav dense>
        <v-list-item-group active-class="primary">
          <v-list-item to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/watchlist">
            <v-list-item-title>Watchlist</v-list-item-title>
          </v-list-item>

          <!--          <v-list-item to="/add-partner">-->
          <!--            <v-list-item-title>Add Partner</v-list-item-title>-->
          <!--          </v-list-item>-->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { USERNAME } from "@/constants";

export default {
  name: "AppBar",
  data: () => ({
    drawer: false
  }),
  computed: {
    userName() {
      return localStorage.getItem(USERNAME);
    }
  }
};
</script>

<style scoped>
.navigation-btn {
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 0 0;
}
.navigation-list {
  margin-top: 10px;
}
</style>
