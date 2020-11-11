<template>
  <v-container class="check-wrap py-1">
    <v-row class="check-title align-center flex-grow-1" no-gutters>
      <v-icon class="ico">
        mdi-checkbox-marked-outline
      </v-icon>
      <h4 class="ml-6">Checklist</h4>
      <v-spacer></v-spacer>
      <v-btn
        height="30"
        color="rgba(9,30,66,.04)"
        class="pa-0"
        depressed
        @click="delAllTask(tasks.id)"
        >delete</v-btn
      >
    </v-row>
    <v-row class="check-item my-3" align="center" no-gutters>
      <span class="percent">{{ progress ? progress : '0' }}%</span>
      <v-col cols="11">
        <v-progress-linear
          rounded
          height="6"
          :value="progress"
          color="rgba(26,53,64)"
          class="ml-8"
        ></v-progress-linear>
      </v-col>
    </v-row>
    <div
      class="checkbox-list-wrapper my-3 d-flex align-center"
      v-for="(task, i) in tasks"
      :key="i"
    >
      <v-checkbox
        hide-details
        v-model="task.complete"
        :label="task.title"
        class="check-list-item pa-0 ma-0"
      >
      </v-checkbox>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-0 pa-0"
        ><v-icon @click="deleteTask(task.id)">mdi-close</v-icon></v-btn
      >
    </div>
    <div class="btn-wrapper ml-6">
      <v-btn
        class="mx-0 my-3 py-0"
        color="rgba(9,30,66,.04)"
        depressed
        @click="isEdit = true"
        v-if="!isEdit"
        small
      >
        Add an item</v-btn
      >
      <div class="addtask" v-else>
        <v-textarea
          flat
          solo
          outlined
          v-model="newItem"
          @keyup.enter="addTask"
          auto-grow
          class="d-flex align-center my-3"
          rows="1"
          hide-details
          placeholder="Add an item"
        ></v-textarea>
        <v-btn color="green" dark depressed small @click="addTask">Add</v-btn>
        <v-btn icon depressed small @click="isEdit = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'CheckList',
  props: ['tasks'],
  data() {
    return {
      isEdit: false,
      newItem: '',
    };
  },
  methods: {
    addTask() {
      this.$emit('add-task-item', {
        id: this.newTaskId,
        title: this.newItem,
        complete: false,
      });
      this.newItem = '';
    },
    deleteTask(id) {
      this.$emit('del-task-item', id);
    },
    delAllTask(id) {
      this.$emit('del-all-task', id);
    },
  },
  computed: {
    progress() {
      let completeNum = this.tasks.filter((el) => el.complete).length;
      return Math.round((completeNum / this.tasks.length) * 100);
    },
    newTaskId() {
      return (
        this.tasks.reduce((acc, cur) => {
          acc = Math.max(acc, cur.id);
          return acc;
        }, 0) + 1
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.check-title {
  position: relative;
  .ico {
    position: absolute;
    left: 0;
  }
}
.check-item {
  position: relative;
  .percent {
    position: absolute;
    left: 0;
    font-size: 13px;
  }
}
</style>
