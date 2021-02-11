<template>
  <div class="head__text">
    <h1>tytuł</h1>
    <p>{{ movies }}</p>
    <!-- <input v-model="current" type="text" name="" class="searchContent" /> -->
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
  </div>
</template>

<script lang="ts">
import { autocompleteExampleNames } from "./mainPageUtils";
import { axiosInstance } from "@/services/axiosInstance";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class MovieSearch extends Vue {
  private dataFetched = false;
  private placeholderWorks = false;
  private current = "";
  private search = "";
  private searchData = [];
  private movies = [];
  private currentId = null;
  private loading = false;
  private autocompleteExampleNames = autocompleteExampleNames;

  mounted() {
    this.getMovies();
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
    const endpoint = `${process.env.VUE_APP_API_URL}movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`;
    const { data } = await axiosInstance.get(endpoint);
    this.movies = data;
  }
}
</script>

<style scoped></style>
