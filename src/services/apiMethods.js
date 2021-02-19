import { axiosInstance } from "@/services/axiosInstance";

export const sendNewUserWithLikedMovies = async (userName, item) => {
  const newMovies = [item.id];
  try {
    await axiosInstance.post(`${process.env.VUE_APP_API_JSON_SERVE_URL}users`, {
      user: userName,
      likedMovies: newMovies
    });
    return newMovies;
  } catch (e) {
    console.log(e);
  }
};

export const putToUserNewLikedMovies = async (userName, item, data) => {
  let newMovies;
  // add movie
  const likedMoviesIds = data[0].likedMovies.map(x => x.id);
  if (!likedMoviesIds.includes(item.id)) {
    newMovies = [likedMoviesIds, item.id];
  }
  // delete movie
  else {
    newMovies = likedMoviesIds.filter(likedMovieId => likedMovieId !== item.id);
  }
  try {
    await axiosInstance.put(
      `${process.env.VUE_APP_API_JSON_SERVE_URL}users/${data[0].id}`,
      {
        user: userName,
        likedMovies: newMovies
      }
    );
    return newMovies;
  } catch (e) {
    console.log(e);
  }
};
