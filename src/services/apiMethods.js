import { axiosInstance } from "@/services/axiosInstance";

export const sendNewUserWithLikedMovies = async (userName, item) => {
  const newMovies = [item];
  try {
    await axiosInstance.post(`http://localhost:5000/users`, {
      user: userName,
      likedMovies: newMovies
    });
    return newMovies;
  } catch (e) {
    console.log(e);
  }
};

export const putToUserNewLikedMovies = async (userName, item, data) => {
  let newMovies = [];
  // add movie
  const likedMoviesIds = data[0].likedMovies.map(x => x.id);
  if (!likedMoviesIds.includes(item.id)) {
    newMovies = [...data[0].likedMovies, item];
  }
  // delete movie
  else {
    newMovies = data[0].likedMovies.filter(
      likedMovie => likedMovie.id !== item.id
    );
  }
  try {
    await axiosInstance.put(`http://localhost:5000/users/${data[0].id}`, {
      user: userName,
      likedMovies: newMovies
    });
    return newMovies;
  } catch (e) {
    console.log(e);
  }
};
