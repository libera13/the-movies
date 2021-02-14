<template>
  <div>
    <v-btn
      v-if="!bottomBar"
      color="primary"
      class="text-capitalize play-button"
      :ripple="false"
      @click="toggleDialog"
    >
      <v-icon left>mdi-play</v-icon>
      Play Trailer
    </v-btn>

    <v-btn v-if="bottomBar && !isTrailerDialog" icon @click="toggleDialog">
      <v-icon size="28">mdi-play</v-icon>
    </v-btn>

    <v-btn v-if="bottomBar && isTrailerDialog" icon disabled>
      <v-icon size="28">mdi-play</v-icon>
    </v-btn>

    <v-dialog
      v-model="isTrailerDialog"
      dark
      :width="videoWidth"
      @click:outside="stop"
    >
      <v-card>
        <div v-if="trailerId">
          <youtube
            :video-id="trailerId"
            :player-vars="{ autoplay: 1 }"
            @ready="ready"
            :player-height="videoHeight"
            :player-width="videoWidth"
          ></youtube>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="stop">
            Zamknij
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "TrailerDialog",
  props: {
    trailerId: {
      type: String,
      required: false
    },
    bottomBar: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return { isTrailerDialog: false };
  },
  computed: {
    videoWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "350";
        case "sm":
          return "600";
        case "md":
          return "1000";
        case "lg":
          return "1250";
        case "xl":
          return "1250";
        default:
          return "1000";
      }
    },
    videoHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "196";
        case "sm":
          return "336";
        case "md":
          return "560";
        case "lg":
          return "700";
        case "xl":
          return "700";
        default:
          return "560";
      }
    }
  },
  methods: {
    toggleDialog() {
      this.isTrailerDialog = !this.isTrailerDialog;
    },
    ready(event) {
      this.player = event.target;
    },
    stop() {
      this.player.stopVideo();
      this.toggleDialog();
    }
  }
};
</script>

<style scoped>
.play-button::before {
  background-color: transparent !important;
}
.play-button:hover {
  color: lightgrey !important;
}
</style>
