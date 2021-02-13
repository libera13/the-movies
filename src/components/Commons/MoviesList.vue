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
              <!-- TODO: highlight already liked or not liked-->
              <v-img :src="getMovieImage(item)" aspect-ratio="1"></v-img>

              <v-card-title primary-title>
                <div>
                  <h2>{{ item.title }}</h2>
                  <div>Rok: {{ item.release_date }}</div>
                  <div>Ocena: {{ item.vote_average }}</div>
                  <v-btn
                    @click="addToLiked(item)"
                    :color="isLiked(item.id) ? 'primary' : ''"
                    >Liked</v-btn
                  >
                  <v-btn @click="addToNotLiked">Not liked</v-btn>
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
    <DialogUserName v-model="isDialogUserName" />
  </div>
</template>

<script>
import { axiosInstance } from "@/services/axiosInstance";
import DialogUserName from "@/components/Commons/DialogUserName";
import { USERNAME } from "@/constants";

export default {
  name: "MoviesList",
  components: { DialogUserName },
  props: ["movies", "loading"],
  data() {
    return {
      isDialogUserName: false,
      likedMoviesIds: [],
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
    },
    async addToLiked(item) {
      const userName = localStorage.getItem(USERNAME);

      if (userName) {
        console.log("userName", userName);
        const { data } = await axiosInstance.get(
          `http://localhost:5000/users?user=${userName}`
        );
        // add if user exits
        if (data[0]) {
          let newMoviesIds = [];
          this.likedMoviesIds = data[0].likedMoviesId;
          // add movie
          if (!this.likedMoviesIds?.includes(item.id)) {
            newMoviesIds = [...this.likedMoviesIds, item.id];
          }
          // delete movie
          else {
            newMoviesIds = this.likedMoviesIds.filter(
              likedMovie => likedMovie !== item.id
            );
          }
          await axiosInstance.put(`http://localhost:5000/users/${data[0].id}`, {
            user: userName,
            likedMoviesId: newMoviesIds
          });
        }
        // add if user not exists
        else {
          const newMoviesIds = [item.id];
          await axiosInstance.post(`http://localhost:5000/users`, {
            user: userName,
            likedMoviesId: newMoviesIds
          });
        }
      } else {
        this.isDialogUserName = true;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    addToNotLiked() {},
    isLiked(id) {
      return this.likedMoviesIds.includes(id);
    }
  }
};
</script>

<style scoped></style>
