<template>
  <div class="filters-card">
    <div class="filters">
      <!--      query-->
      <p>By wyszukać wpisz tytuł</p>
      <div class="filters-inputs">
        <v-text-field
          dark
          placeholder="tytuł"
          @input="debounceInput($event, 'query')"
        ></v-text-field>
        <!--      year-->
        <v-text-field
          dark
          placeholder="rok"
          type="number"
          @input="debounceInput($event, 'year')"
        ></v-text-field>
        <!--      includeAdult-->
        <v-checkbox
          dark
          @change="debounceInput($event, 'includeAdult')"
          label="dla dorosłych"
        />
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "MainPageFilters",
  data() {
    return {
      filters: {
        includeAdult: false,
        title: "",
        query: "",
        year: null
      }
    };
  },
  methods: {
    debounceInput: debounce(function(e, param) {
      this.filters[param] = e;
      this.$emit("update-filters", this.filters);
    }, 500)
  }
};
</script>

<style scoped lang="scss">
@import "./src/scss/media-queries";

.filters {
  display: grid;
  padding: 1rem;
  min-width: 180px;
  background-color: darkslateblue;
}
.filters-inputs {
  max-width: 800px;
  margin: auto;
  display: grid;
  grid-template-columns: 60% 20% 20%;
  grid-gap: 1rem;
  @include mobile-only {
    grid-template-columns: 60% 20%;
  }
}
</style>
