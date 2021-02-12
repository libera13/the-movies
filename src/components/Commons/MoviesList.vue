<template>
  <div>
    <v-container v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular indeterminate :size="150" :width="8" color="green">
        </v-progress-circular>
      </div>
    </v-container>

    <template v-else>
      <v-container
        v-if="movies.results && movies.results.length > 0"
        grid-list-xl
      >
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
      <v-container v-else>
        <div class="text-xs-center">
          <h2>No movies with this search</h2>
        </div>
      </v-container>
    </template>
  </div>
</template>

<script>
export default {
  name: "MoviesList",
  props: ["movies", "loading"],
  data() {
    return {
      //Sizes: w300, w780, w1280, original
      IMAGE_SIZE: "w1280",

      // w92, w154, w185, w342, w500, w780, original
      POSTER_SIZE: "w500"
    };
  },

  methods: {
    getMovieImage(item) {
      // TODO: give some placeholder foto
      return item.poster_path
        ? `${process.env.VUE_APP_IMAGE_BASE_URL}${this.POSTER_SIZE}${item.poster_path}`
        : null;
    }
  }
};
</script>

<style scoped></style>
