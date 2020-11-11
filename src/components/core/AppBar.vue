<template>
  <v-container class="app-bar" fluid>
    <v-row no-gutters class="app-bar-list" rows="12">
      <v-col cols="4" class="d-flex align-center">
        <v-btn icon color="white"><v-icon>mdi-dots-grid</v-icon></v-btn>
        <v-text-field
          append-icon="mdi-magnify"
          solo
          auto-grow
          min-width="200"
          hide-details
          class="text flex-grow-0"
        >
        </v-text-field>
      </v-col>
      <v-col cols="4" class="d-flex align-center justify-center">
        <v-img
          max-width="100"
          src="https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png"
          alt="logo"
          class="logo"
        ></v-img>
      </v-col>
      <v-col cols="4" class="d-flex align-center justify-end">
        <v-btn depressed color="white" icon><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn depressed color="white" icon
          ><v-icon>mdi-alert-circle-outline</v-icon></v-btn
        >
        <v-btn depressed icon color="white"
          ><v-icon>mdi-bell-outline</v-icon></v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AppBar',
};
</script>

<style lang="scss" scoped>
.app-bar {
  background-color: #1a3540;
}
</style>
