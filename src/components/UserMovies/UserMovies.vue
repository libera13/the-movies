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
            `http://localhost:5000/users?user=${userName}`
          );
          const likedMovies = data[0].likedMovies;
          this.movies = {
            results: likedMovies
          };
        } catch (e) {
          console.log(e);
        } finally {
          this.loading = false;
        }
      } else {
        this.isDialogUserName = true;
      }
    }
  }
};
</script>

<style scoped></style>
