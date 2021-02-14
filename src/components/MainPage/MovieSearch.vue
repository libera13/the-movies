<template>
  <div class="head__text">
    <MainPageFilters @update-filters="updateFilters" />
    <BannerCarousel v-show="!filters.query" :movies="popularMovies" />
    <MoviesList :loading="loading" v-show="filters.query" :movies="movies" />
  </div>
</template>

<script lang="ts">
import { axiosInstance } from "@/services/axiosInstance";
import { Component, Vue } from "vue-property-decorator";
import MainPageFilters from "@/components/MainPage/MainPageMovieFilters.vue";
import { MovieSearchFilters } from "@/components/MainPage/mainPageI";
import MoviesList from "@/components/Commons/MoviesList.vue";
import BannerCarousel from "@/components/MainPage/BannerCarousel.vue";
@Component({
  components: { BannerCarousel, MoviesList, MainPageFilters }
})
export default class MovieSearch extends Vue {
  private movies = { results: [] };
  private popularMovies = [];
  private filters: MovieSearchFilters | Record<string, any> = {};
  private loading = false;

  mounted() {
    Promise.allSettled([this.getPopularMovies()]);
  }

  private async getPopularMovies() {
    const { data } = await axiosInstance.get(
      `${process.env.VUE_APP_API_URL}movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`
    );
    this.popularMovies = data.results;
  }
  private async getMovies() {
    const baseQuery = `${process.env.VUE_APP_API_URL}search/movie?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`;
    const userQuery = this.getUserQuery();
    const endpoint = baseQuery + userQuery;
    try {
      this.loading = true;
      const { data } = await axiosInstance.get(endpoint);
      this.movies = data;
    } catch (e) {
      console.log(e);
      //  TODO: notyfikacja o błędzie
    } finally {
      this.loading = false;
    }
  }
  private updateFilters(payload: MovieSearchFilters) {
    this.filters = payload;
    this.getMovies();
  }
  private getUserQuery() {
    const { query, year, includeAdult } = this.filters;
    let userQuery = "";
    if (query) userQuery += `&query=${query}`;
    if (year) userQuery += `&year=${year}`;
    userQuery += `&include_adult=${includeAdult}`;
    return userQuery;
  }
}
</script>

<style scoped></style>
