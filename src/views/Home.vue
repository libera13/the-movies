<template>
  <div class="home">
    <movie-search />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MovieSearch from "@/components/MainPage/MovieSearch.vue"; // @ is an alias to /src

@Component({
  components: {
    MovieSearch
  }
})
export default class Home extends Vue {}
</script>
