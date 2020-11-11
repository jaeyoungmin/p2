<template>
  <v-container class="py-1">
    <v-row class="due-date ml-6" no-gutters>
      <v-col>
        <h4>DUE DATE</h4>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="btn-wrap d-flex align-center" no-gutters>
              <v-checkbox></v-checkbox>
              <v-btn
                class="date-btn"
                small
                v-bind="attrs"
                v-on="on"
                elevation="1"
              >
                {{ date }}
              </v-btn>
            </div>
          </template>
          <v-date-picker v-model="date" no-title @input="menu = false">
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DueDate',
  props: ['initDate'],
  data() {
    return {
      date: this.initDate,
      menu: false,
    };
  },
  watch: {
    date(newValue) {
      this.$emit('change-date', newValue);
    },
  },
};
</script>

<style lang="scss" scoped></style>
