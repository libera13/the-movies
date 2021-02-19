import { axiosInstance } from "@/services/axiosInstance";

export const sendNewUserWithLikedMovies = async (userName, movieId) => {
  const newMovies = [movieId];
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

export const putToUserNewLikedMovies = async (userName, newId, data) => {
  let newMovies;
  const likedMoviesIds = data[0].likedMovies;
  // add movie
  if (!likedMoviesIds.includes(newId)) {
    newMovies = [...likedMoviesIds, newId];
  }
  // delete movie
  else {
    newMovies = likedMoviesIds.filter(id => id !== newId);
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
