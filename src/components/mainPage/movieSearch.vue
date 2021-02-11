<template>
  <div class="head__text">
    <h1>tytuł</h1>
    <p>{{ filters }}</p>
    <p>{{ movies }}</p>
    <!-- <input v-model="current" type="text" name="" class="searchContent" /> -->
    <MainPageFilters @update-filters="updateFilters" />
    <div class="inputWrapper">
      <v-autocomplete
        required
        v-model="currentId"
        :items="searchData"
        item-text="full_name"
        item-value="id"
        return-object
        :loading="loading"
        :placeholder="current"
        append-outer-icon="mdi-magnify"
        @click:append-outer="redirect"
        :search-input.sync="search"
      >
        <!--        <template v-slot:item="data">-->
        <!--          <template>-->
        <!--            <v-list-item-content>-->
        <!--              <v-list-item-title-->
        <!--                  v-html="data.item.full_name"-->
        <!--              ></v-list-item-title>-->
        <!--              <v-list-item-subtitle-->
        <!--                  v-html="data.item.prettyName"-->
        <!--              ></v-list-item-subtitle>-->
        <!--            </v-list-item-content>-->
        <!--          </template>-->
        <!--        </template>-->
      </v-autocomplete>
    </div>
    <v-container v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular indeterminate :size="150" :width="8" color="green">
        </v-progress-circular>
      </div>
    </v-container>

    <v-container v-else-if="noData">
      <div class="text-xs-center">
        <h2>No movies with this search</h2>
      </div>
    </v-container>

    <v-container v-else grid-list-xl>
      <v-layout wrap>
        <v-flex
          xs4
          v-for="(item, index) in movies.results"
          :key="'mainPanel-movie' + index"
          mb-2
        >
          <v-card>
            <v-img :src="getMovieImage(item)" aspect-ratio="1"></v-img>

            <v-card-title primary-title>
              <div>
                <h2>{{ item.title }}</h2>
                <div>Rok: {{ item.release_date }}</div>
                <div>Ocena: {{ item.vote_average }}</div>
              </div>
            </v-card-title>

            <v-card-actions class="justify-center">
              <!--              <v-btn color="green" @click="singleMovie(item.imdbID)"-->
              <!--                >View</v-btn-->
              <!--              >-->
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { autocompleteExampleNames } from "./mainPageUtils";
import { axiosInstance } from "@/services/axiosInstance";
import { Component, Vue } from "vue-property-decorator";
import MainPageFilters from "@/components/mainPage/MainPageMovieFilters.vue";
import { MovieSearchFilters } from "@/components/mainPage/mainPageI";
@Component({
  components: { MainPageFilters }
})
export default class MovieSearch extends Vue {
  private dataFetched = false;
  private placeholderWorks = false;
  private current = "";
  private noData = false;
  private search = "";
  private searchData = [];
  private movies = [];
  private filters: MovieSearchFilters | Record<string, any> = {};
  private currentId = null;
  private loading = false;
  private autocompleteExampleNames = autocompleteExampleNames;

  //Sizes: w300, w780, w1280, original
  private IMAGE_SIZE = "w1280";

  // w92, w154, w185, w342, w500, w780, original
  private POSTER_SIZE = "w500";

  mounted() {
    // this.getMovies();
  }

  public redirect() {
    if (this.currentId) {
      this.$router.push({
        // path: `/${this.currentId.redirect}/${this.currentId.id}`
      });
    }
  }
  public async searchValue(val: string) {
    if (val && val.split(" ").length < 2) {
      if (val.length > 2) {
        this.loading = true;
        const { data } = await axiosInstance.get(
          `/search/?searched_phrase=${val}`
        );
        console.log("data", data);
        this.loading = false;
      }
    }
  }
  private async getMovies() {
    const baseQuery = `${process.env.VUE_APP_API_URL}search/movie?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`;
    const userQuery = this.getUserQuery();
    const endpoint = baseQuery + userQuery;
    try {
      this.loading = true;
      const { data } = await axiosInstance.get(endpoint);
      this.noData = data.length <= 0;
      this.movies = data;
    } catch (e) {
      this.noData = true;
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
    if (includeAdult) userQuery += `&include_adult=${includeAdult}`;
    return userQuery;
  }
  private getMovieImage(item: MovieSearchResult) {
    return item.poster_path
      ? `${process.env.VUE_APP_IMAGE_BASE_URL}${this.POSTER_SIZE}${item.poster_path}`
      : null;
  }
}
</script>

<style scoped></style>
