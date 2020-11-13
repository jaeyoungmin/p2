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
        <v-list-item
          v-for="(item, i) in lists"
          :key="i"
          @click="moveIssue(item)"
        >
          <v-list-item-title> {{ item.title }}</v-list-item-title>
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
        <v-list-item
          v-for="(item, i) in lists"
          :key="i"
          @click="copyIssue(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      block
      elevation="0"
      color="#eaecef"
      class="action"
      v-if="!isDelete"
      @click="isDelete = true"
      ><v-icon style="margin-right:10px;">mdi-delete</v-icon>Delete
      <v-spacer></v-spacer
    ></v-btn>
    <v-fade-transition>
      <v-card class="delete-card mt-1" max-width="344" v-show="isDelete">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              Delete Card?
            </v-list-item-title>

            <v-divider></v-divider>
            <p>
              All actions will be removed from the activity feed and you won't
              be able to re-open. thire is no undo.
            </p>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn color="red" dark min-width="150" @click="deleteIssue">
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="isDelete = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-fade-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Actions',
  data() {
    return {
      isDelete: false,
      isHover: false,
    };
  },
  computed: { ...mapState(['lists']) },
  methods: {
    moveIssue(item) {
      this.$emit('move-issue', item);
    },
    copyIssue(item) {
      this.$emit('copy-issue', item);
    },
    deleteIssue() {
      this.$emit('delete-issue');
    },
    mouseOver() {
      this.isHover = true;
    },
    mouseleave() {
      this.isHover = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
