<template>
  <MoviesList :movies="movies" :loading="loading" />
</template>

<script>
import MoviesList from "@/components/Commons/MoviesList";
import { axiosInstance } from "@/services/axiosInstance";
import { USERNAME } from "@/constants";
export default {
  name: "UserMovies",
  components: { MoviesList },
  data() {
    return { movies: {}, loading: false };
  },
  mounted() {
    this.getLikedMovies();
  },
  methods: {
    async getLikedMovies() {
      const userName = localStorage.getItem(USERNAME);
      if (userName) {
        const { data } = await axiosInstance.get(
          `http://localhost:5000/users?user=${userName}`
        );
        const likedMovies = data[0].likedMovies;
        this.movies = {
          results: likedMovies
        };
      } else {
        // TODO: handle no username
      }
    }
  }
};
</script>

<style scoped></style>
