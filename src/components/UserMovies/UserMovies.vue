<template>
  <div>
    <DialogUserName v-model="isDialogUserName" />
    <MoviesList :movies="movies" :loading="loading" />
  </div>
</template>

<script>
import MoviesList from "@/components/Commons/MoviesList";
import { axiosInstance } from "@/services/axiosInstance";
import { USERNAME } from "@/constants";
import DialogUserName from "@/components/Commons/DialogUserName";
export default {
  name: "UserMovies",
  components: { DialogUserName, MoviesList },
  data() {
    return { movies: {}, loading: false, isDialogUserName: false };
  },
  mounted() {
    this.getLikedMovies();
  },
  methods: {
    async getLikedMovies() {
      const userName = localStorage.getItem(USERNAME);
      if (userName) {
        this.loading = true;
        try {
          const { data } = await axiosInstance.get(
            `${process.env.VUE_APP_API_JSON_SERVE_URL}users?user=${userName}`
          );

          this.movies = {
            results: await this.getLikedMoviesData(data)
          };
        } catch (e) {
          console.log(e);
        } finally {
          this.loading = false;
        }
      } else {
        this.isDialogUserName = true;
      }
    },
    async getLikedMoviesData(data) {
      const promises = [];

      const likedMoviesIds = data[0].likedMovies;

      likedMoviesIds.forEach(movieId =>
        promises.push(
          axiosInstance.get(
            `${process.env.VUE_APP_API_URL}movie/${movieId}?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`
          )
        )
      );

      const results = await Promise.allSettled(promises);

      const likedMovies = results.reduce((preVal, curVal) => {
        if (curVal.status === "fulfilled") {
          return [...preVal, curVal.value.data];
        }
      }, []);

      return likedMovies;
    }
  }
};
</script>

<style scoped></style>
