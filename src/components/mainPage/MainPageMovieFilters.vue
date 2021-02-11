<template>
  <div class="filters-card">
    <h3>Filtry</h3>
    <div class="filters">
      <!--      query-->
      <v-text-field
        placeholder="tytuł"
        @input="debounceInput($event, 'query')"
      ></v-text-field>
      <!--      year-->
      <v-text-field
        placeholder="rok"
        type="number"
        @input="debounceInput($event, 'year')"
      ></v-text-field>
      <!--      includeAdult-->
      <v-checkbox
        @change="debounceInput($event, 'includeAdult')"
        label="dla dorosłych"
      />
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
        includeAdult: true,
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

<style scoped>
.filters {
  display: grid;
  padding: 1rem;
  min-width: 180px;
}
</style>
