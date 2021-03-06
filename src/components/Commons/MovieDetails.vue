<template>
  <section class="movie">
    <v-container class="movie__container" v-if="!loading">
      <template v-if="singleMovie">
        <!--        {{ cast }}-->
        <header
          class="movie__header"
          :class="{ 'movie__header--page': type === 'page' }"
          :style="{ 'background-image': 'url(' + movieBackdropSrc + ')' }"
        >
          <div
            class="movie__wrap movie__wrap--header"
            :class="{ 'movie__wrap--page': type === 'page' }"
          >
            <figure class="movie__poster">
              <img
                v-if="moviePosterSrc"
                class="movie__img"
                src="../../assets/placeholder.png"
                v-img="moviePosterSrc"
                alt="placeholder image"
              />
            </figure>
            <div class="movie__title">
              <h1 class="movie__title-text">
                {{ singleMovie.title }}
                <span v-if="singleMovie.tagline">{{
                  singleMovie.tagline
                }}</span>
              </h1>
            </div>
          </div>
        </header>
        <div class="movie__main">
          <div
            class="movie__wrap movie__wrap--main"
            :class="{ 'movie__wrap--page': type === 'page' }"
          >
            <div class="movie__info">
              <div v-if="singleMovie.overview" class="movie__description">
                {{ singleMovie.overview }}
              </div>
              <div class="movie__details">
                <div
                  v-if="singleMovie.genres && singleMovie.genres.length"
                  class="movie__details-block"
                >
                  <h2 class="movie__details-title">
                    Genres
                  </h2>
                  <div class="movie__details-text">
                    {{ nestedDataToString(singleMovie.genres) }}
                  </div>
                </div>
                <div
                  v-if="singleMovie.release_date"
                  class="movie__details-block"
                >
                  <h2 class="movie__details-title">
                    Release Date
                  </h2>
                  <div
                    class="movie__details-text"
                    v-formatDate="singleMovie.release_date"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="movie__main">
          <!-- Buttons -->
          <v-row justify="center">
            <TrailerDialog
              v-if="trailer"
              :trailerId="trailer.key"
              class="mb-3 mr-3"
            />
            <v-btn
              v-if="isLiked(singleMovie.id)"
              color="primary"
              @click="toggleToLiked(singleMovie.id)"
            >
              <v-icon left>mdi-check</v-icon>
              Watchlist
            </v-btn>
            <v-btn v-else @click="toggleToLiked(singleMovie.id)">
              <v-icon left>mdi-plus</v-icon>
              Watchlist
            </v-btn>
          </v-row>
          <v-row justify="center">
            <v-col
              v-for="value in ['cast', 'crew']"
              :key="value"
              cols="12"
              sm="6"
              class="cards-col"
            >
              <v-card dark elevation="3" min-width="250">
                <div style="margin-left: 40px">
                  <v-card-title>{{ value.toLocaleUpperCase() }}</v-card-title>
                  <v-virtual-scroll
                    :bench="10"
                    :items="cast[value]"
                    height="500"
                    item-height="250"
                  >
                    <template v-slot:default="{ item }">
                      <PersonCard :person="item" :subheading="false" />
                    </template>
                  </v-virtual-scroll>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </template>
      <div v-else>
        No Found
      </div>
    </v-container>
    <div v-else>
      <v-progress-linear
        color="deep-purple accent-4"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </div>
    <dialog-user-name v-model="isDialogUserName" />
  </section>
</template>

<script>
import { axiosInstance } from "@/services/axiosInstance";
import img from "../../directives/v-image.js";
import formatDate from "../../directives/v-formatDate.js";
import PersonCard from "@/components/Commons/PersonCard";
import TrailerDialog from "@/components/Commons/TrailerDialog";
import DialogUserName from "@/components/Commons/DialogUserName";
import { toggleToLikedMixin } from "@/mixins/toogleToLikedMixin";

export default {
  name: "MovieDetails",
  components: { DialogUserName, TrailerDialog, PersonCard },
  mixins: [toggleToLikedMixin],
  props: {
    type: {
      default: "page"
    }
  },
  directives: {
    img: img,
    formatDate: formatDate
  },
  data() {
    return {
      singleMovie: [],
      cast: [],
      trailer: {},
      moviePosterSrc: "",
      movieBackdropSrc: "",
      dialog: false,
      loading: true,
      ratings: ""
    };
  },
  async created() {
    await this.getMovie(this.$route.params.movieId);
    this.getCast(this.$route.params.movieId);
    this.getTrailers(this.$route.params.movieId);
    this.poster();
    this.backdrop();
  },
  methods: {
    poster() {
      if (this.singleMovie.poster_path) {
        this.moviePosterSrc =
          `${process.env.VUE_APP_IMAGE_BASE_URL}w600_and_h900_bestv2` +
          this.singleMovie.poster_path;
      }
    },
    backdrop() {
      if (this.singleMovie.backdrop_path) {
        this.movieBackdropSrc =
          `${process.env.VUE_APP_IMAGE_BASE_URL}w500` +
          this.singleMovie.backdrop_path;
      }
    },
    nestedDataToString(data) {
      const nestedArray = [];
      data.forEach(item => nestedArray.push(item.name));
      return nestedArray.join(", ");
    },
    async getMovie(movieId) {
      const endpoint = `${process.env.VUE_APP_API_URL}movie/${movieId}?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`;
      await this.makeGETRequest(endpoint, "singleMovie");
    },
    getCast(movieId) {
      const endpoint = `${process.env.VUE_APP_API_URL}movie/${movieId}/credits?api_key=${process.env.VUE_APP_API_KEY}`;
      this.makeGETRequest(endpoint, "cast");
    },
    async getTrailers(movieId) {
      const endpoint = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`;
      await this.makeGETRequest(endpoint, "trailers");
      this.trailer = this.trailers.results.find(trailer => {
        return trailer.type === "Trailer";
      });
    },
    async makeGETRequest(endpoint, key) {
      try {
        this.loading = true;
        const { data } = await axiosInstance.get(endpoint);
        this[key] = data;
      } catch (e) {
        console.log(e);
        //  TODO: notyfikacja o błędzie
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";
.movie {
  &__wrap {
    display: flex;
    &--page {
      max-width: 768px;
      position: relative;
      margin: 0 auto;
    }
    &--header {
      align-items: center;
      height: 100%;
    }
    &--main {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      @include tablet-min {
        flex-direction: row;
      }
    }
  }
  &__header {
    height: 250px;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: $c-dark;
    @include tablet-min {
      height: 350px;
      &--page {
        height: 384px;
      }
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: rgba($c-dark, 0.85);
    }
  }
  &__poster {
    display: none;
    @include tablet-min {
      background: $c-dark;
      display: block;
      position: absolute;
      width: calc(45% - 40px);
      top: 40px;
      left: 40px;
    }
  }
  &__img {
    display: block;
    width: 100%;
    opacity: 0;
    transform: scale(0.97) translateZ(0);
    transition: opacity 0.5s ease, transform 0.5s ease;
    &.is-loaded {
      opacity: 1;
      transform: scale(1);
    }
  }
  &__title {
    position: relative;
    padding: 20px;
    color: $c-green;
    text-align: center;
    width: 100%;
    @include tablet-min {
      width: 55%;
      text-align: left;
      margin-left: 45%;
      padding: 30px 30px 30px 40px;
    }
    &-text {
      font-weight: 500;
      line-height: 1.4;
      font-size: 24px;
      @include tablet-min {
        font-size: 30px;
      }
      span {
        display: block;
        font-size: 14px;
        font-weight: 300;
        color: rgba($c-white, 0.7);
        margin-top: 10px;
      }
    }
  }
  &__main {
    background: $c-light-dark;
  }
  &__actions {
    text-align: center;
    width: 100%;
    order: 2;
    padding: 20px;
    border-top: 1px solid rgba($c-dark, 0.05);
    @include tablet-min {
      order: 1;
      width: 45%;
      padding: 185px 0 40px 40px;
      border-top: 0;
    }
    &-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      text-transform: uppercase;
      color: rgba($c-dark, 0.5);
      transition: color 0.5s ease;
      font-size: 11px;
      padding: 10px 0;
      border-bottom: 1px solid rgba($c-dark, 0.05);
      &:hover {
        color: rgba($c-dark, 0.75);
      }
      &.active {
        color: $c-dark;
      }
    }
    &-icon {
      width: 16px;
      height: 16px;
      margin: 0 10px 0 0;
      fill: rgba($c-dark, 0.5);
      transition: fill 0.5s ease, transform 0.5s ease;
      &.waiting {
        transform: scale(0.8, 0.8);
      }
    }
    &-link:hover &-icon {
      fill: rgba($c-dark, 0.75);
    }
    &-link.active &-icon {
      fill: $c-green;
    }
    &-text {
      display: block;
      padding-top: 2px;
    }
  }
  &__info {
    width: 100%;
    padding: 20px;
    order: 1;
    @include tablet-min {
      order: 2;
      padding: 40px;
      width: 55%;
      margin-left: 45%;
    }
  }
  &__actions + &__info {
    margin-left: 0;
  }
  &__description {
    font-weight: 300;
    font-size: 13px;
    line-height: 1.8;
    color: $c-white;
    margin-bottom: 20px;
    @include tablet-min {
      margin-bottom: 30px;
      font-size: 14px;
    }
  }
  &__details {
    &-block:not(:last-child) {
      margin-bottom: 20px;
      @include tablet-min {
        margin-bottom: 30px;
      }
    }
    &-title {
      margin: 0;
      font-weight: 400;
      text-transform: uppercase;
      font-size: 14px;
      color: $c-green;
      @include tablet-min {
        font-size: 16px;
      }
    }
    &-text {
      font-weight: 300;
      font-size: 14px;
      margin-top: 5px;
      color: $c-white;
    }
  }
}
.cards-col {
  display: flex;
  justify-content: center;
  background-color: $c-light-dark;
}
</style>
