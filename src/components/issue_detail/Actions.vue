<template>
  <div class="actions">
    <h4>ACTION</h4>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          block
          elevation="0"
          color="#eaecef"
          class="action mb-2"
          v-bind="attrs"
          v-on="on"
          ><v-icon style="margin-right:10px;">mdi-arrow-right</v-icon>Move
          <v-spacer></v-spacer
        ></v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          block
          elevation="0"
          color="#eaecef"
          class="action mb-2"
          v-bind="attrs"
          v-on="on"
          ><v-icon style="margin-right:10px;">mdi-content-copy</v-icon>Copy
          <v-spacer></v-spacer
        ></v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          block
          elevation="0"
          color="#eaecef"
          class="action"
          v-bind="attrs"
          v-on="on"
          ><v-icon style="margin-right:10px;">mdi-delete</v-icon>Delete
          <v-spacer></v-spacer
        ></v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'Actions',
};
</script>

<style lang="scss" scoped></style>
