<template>
  <div class="head__text">
    <h1>tytuł</h1>
    <MainPageFilters @update-filters="updateFilters" />
    <!--    <div class="inputWrapper">-->
    <!--      <v-autocomplete-->
    <!--        required-->
    <!--        v-model="currentId"-->
    <!--        :items="searchData"-->
    <!--        item-text="full_name"-->
    <!--        item-value="id"-->
    <!--        return-object-->
    <!--        :loading="loading"-->
    <!--        :placeholder="current"-->
    <!--        append-outer-icon="mdi-magnify"-->
    <!--        @click:append-outer="redirect"-->
    <!--        :search-input.sync="search"-->
    <!--      >-->
    <!--        &lt;!&ndash;        <template v-slot:item="data">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <template>&ndash;&gt;-->
    <!--        &lt;!&ndash;            <v-list-item-content>&ndash;&gt;-->
    <!--        &lt;!&ndash;              <v-list-item-title&ndash;&gt;-->
    <!--        &lt;!&ndash;                  v-html="data.item.full_name"&ndash;&gt;-->
    <!--        &lt;!&ndash;              ></v-list-item-title>&ndash;&gt;-->
    <!--        &lt;!&ndash;              <v-list-item-subtitle&ndash;&gt;-->
    <!--        &lt;!&ndash;                  v-html="data.item.prettyName"&ndash;&gt;-->
    <!--        &lt;!&ndash;              ></v-list-item-subtitle>&ndash;&gt;-->
    <!--        &lt;!&ndash;            </v-list-item-content>&ndash;&gt;-->
    <!--        &lt;!&ndash;          </template>&ndash;&gt;-->
    <!--        &lt;!&ndash;        </template>&ndash;&gt;-->
    <!--      </v-autocomplete>-->
    <!--    </div>-->
    <MoviesList :loading="loading" :movies="movies" />
  </div>
</template>

<script lang="ts">
import { autocompleteExampleNames } from "./mainPageUtils";
import { axiosInstance } from "@/services/axiosInstance";
import { Component, Vue } from "vue-property-decorator";
import MainPageFilters from "@/components/mainPage/MainPageMovieFilters.vue";
import { MovieSearchFilters } from "@/components/mainPage/mainPageI";
import MoviesList from "@/components/Commons/MoviesList.vue";
@Component({
  components: { MoviesList, MainPageFilters }
})
export default class MovieSearch extends Vue {
  private dataFetched = false;
  private placeholderWorks = false;
  private current = "";
  private search = "";
  private searchData = [];
  private movies = { results: [] };
  private filters: MovieSearchFilters | Record<string, any> = {};
  private currentId = null;
  private loading = false;
  private autocompleteExampleNames = autocompleteExampleNames;

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
