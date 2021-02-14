<template>
  <div>
    <DialogUserName v-model="isDialogUserName" />
    <v-container v-if="loading">
      <div>
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </div>
    </v-container>

    <template v-else>
      <v-container v-if="movies.results && movies.results.length > 0">
        <div class="masonry">
          <v-card
            v-for="(item, index) in movies.results"
            dark
            :key="'mainPanel-movie' + index"
            class="card"
          >
            <!-- TODO: highlight already liked or not liked-->
            <div>
              <v-img
                @click="handleDetailsClick(item.id)"
                :src="getMovieImage(item)"
                class="clickable"
                aspect-ratio="1"
              ></v-img>

              <v-card-title>
                {{ item.title }}
              </v-card-title>
              <v-card-text>
                <div>
                  <div>Rok: {{ item.release_date }}</div>
                  <div>Ocena: {{ item.vote_average }}</div>
                </div>
              </v-card-text>
            </div>
            <v-card-actions>
              <v-btn
                v-if="isLiked(item.id)"
                color="primary"
                small
                depressed
                @click="toggleToLiked(item)"
              >
                <v-icon left>mdi-check</v-icon>
                Watchlist
              </v-btn>
              <v-btn v-else small depressed @click="toggleToLiked(item)">
                <v-icon left>mdi-plus</v-icon>
                Watchlist
              </v-btn>
              <v-btn
                small
                depressed
                class="view-button"
                @click="handleDetailsClick(item.id)"
                >View</v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </v-container>
      <v-container v-else>
        <div class="text-xs-center">
          <h2>No movies</h2>
        </div>
      </v-container>
    </template>
  </div>
</template>

<script>
import DialogUserName from "@/components/Commons/DialogUserName";
import { toggleToLikedMixin } from "@/mixins/toogleToLikedMixin";

export default {
  name: "MoviesList",
  components: { DialogUserName },
  mixins: [toggleToLikedMixin],
  props: {
    movies: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDialogUserName: false,
      //Sizes: w300, w780, w1280, original
      IMAGE_SIZE: "w1280",
      // w92, w154, w185, w342, w500, w780, original
      POSTER_SIZE: "w185"
    };
  },
  mounted() {
    this.getLikedMovies();
  },
  methods: {
    handleDetailsClick(movieId) {
      this.$router.push({ path: `/movie/${movieId}` });
    },
    getMovieImage(item) {
      // TODO: give some placeholder foto
      return item.poster_path
        ? `${process.env.VUE_APP_IMAGE_BASE_URL}${this.POSTER_SIZE}${item.poster_path}`
        : null;
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
.masonry {
  --auto-grid-min-size: 12rem;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--auto-grid-min-size), 1fr)
  );
  grid-gap: 1rem;
}
.view-button {
  color: #5799ef;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
