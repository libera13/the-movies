<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-form v-model="valid" @submit.prevent="submit" ref="form">
          <v-card-title>
            <span class="headline">Uzupełnij pola by kontynuować</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  label="Nazwa użytkownika*"
                  v-model="name"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-row>
            </v-container>
            <small>*wymagane pola</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Zamknij
            </v-btn>
            <v-btn color="primary" :disabled="!valid" text @click="submit">
              Zapisz
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DialogUserName",
  data: () => ({
    dialog: false,
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Pole jest wymagane",
      v => v.length <= 10 || "Nazwa nie może być dłuższa niż 10 znaków"
    ]
  }),
  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        console.log(this.name);
        this.dialog = false;
      }
    }
  }
};
</script>

<style scoped></style>
