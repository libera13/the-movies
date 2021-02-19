import { USERNAME } from "@/constants";
import { axiosInstance } from "@/services/axiosInstance";
import {
  putToUserNewLikedMovies,
  sendNewUserWithLikedMovies
} from "@/services/apiMethods";

export const toggleToLikedMixin = {
  data() {
    return {
      likedMovies: [],
      isDialogUserName: false
    };
  },
  methods: {
    async toggleToLiked(item) {
      const userName = localStorage.getItem(USERNAME);

      if (userName) {
        const { data } = await axiosInstance.get(
          `${process.env.VUE_APP_API_JSON_SERVE_URL}users?user=${userName}`
        );
        // add if user exits in db
        if (data[0]) {
          this.likedMovies = await putToUserNewLikedMovies(
            userName,
            item,
            data
          );
        }
        // add if user not exists in db
        else {
          this.likedMovies = await sendNewUserWithLikedMovies(userName, item);
        }
      } else {
        this.isDialogUserName = true;
      }
    },
    async getLikedMovies() {
      const userName = localStorage.getItem(USERNAME);
      if (userName) {
        const { data } = await axiosInstance.get(
          `${process.env.VUE_APP_API_JSON_SERVE_URL}users?user=${userName}`
        );
        this.likedMovies = data[0].likedMovies;
        return data[0].likedMovies;
      }
    },
    isLiked(id) {
      return this.likedMovies.map(x => x.id).includes(id);
    }
  }
};
