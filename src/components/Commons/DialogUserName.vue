<template>
  <v-row justify="center">
    <v-dialog dark v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form v-model="valid" @submit.prevent="submit" ref="form">
          <v-card-title>
            <span class="headline">Fill fields to continue</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  label="user name*"
                  v-model="name"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-row>
            </v-container>
            <small>*required fields</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="primary" :disabled="!valid" text @click="submit">
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { USERNAME } from "@/constants";

export default {
  name: "DialogUserName",
  props: {
    value: Boolean
  },
  data: () => ({
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Pole jest wymagane",
      v => v.length <= 10 || "Nazwa nie może być dłuższa niż 10 znaków"
    ]
  }),
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        localStorage.setItem(USERNAME, this.name);
        this.dialog = false;
      }
    }
  }
};
</script>

<style scoped></style>
