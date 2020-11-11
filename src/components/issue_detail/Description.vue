<template>
  <v-container class="descr-wrap py-1">
    <v-row class="descr-title align-center flex-grow-1" no-gutters>
      <v-icon class="ico">
        mdi-text-subject
      </v-icon>
      <h4 class="ml-6">Description</h4>
      <v-spacer></v-spacer>
      <v-btn
        height="30"
        color="rgba(9,30,66,.04)"
        class="pa-0"
        depressed
        @click="isEdit = true"
      >
        Edit
      </v-btn>
    </v-row>
    <v-row class="descr-text mt-2 ml-6 pr-3">
      <p style="width:100%" v-if="!isEdit">{{ descr }}</p>
      <div class="btn-edit-wrap flex-grow-1 mt-2" v-else>
        <v-textarea
          solo
          auto-grow
          rows="1"
          hide-details
          class="d-flex pa-0 mb-2"
          v-model="descr"
        ></v-textarea>
        <v-btn
          depressed
          elevation="0"
          dark
          color="green"
          height="30"
          @click="save"
          >Save</v-btn
        >
        <v-btn small icon @click="(isEdit = false), (descr = initDescr)"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Description',
  props: ['initDescr'],
  data() {
    return {
      descr: this.initDescr,
      isEdit: false,
      editText: '',
    };
  },
  methods: {
    save() {
      this.$emit('change-descr', this.descr);
      this.isEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.descr-wrap {
  .descr-title {
    position: relative;
  }
  .ico {
    position: absolute;
    left: 0;
  }
}
</style>
