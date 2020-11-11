<template>
  <v-overlay :value="isDetailShow" class="issue-detail">
    <div class="scroll-y">
      <v-card light class="issue-wrapper px-2 py-1">
        <div class="issue-header">
          <v-btn icon><v-icon color="#1a3540">mdi-inbox-full</v-icon></v-btn>
          <h2>{{ currentIssue.title }}</h2>
          <p class="ml-9 mb-1">In list {{ currentIssue.title }}</p>
          <v-spacer></v-spacer>
          <v-btn icon class="close-btn" @click="closeDetail"
            ><v-icon color="#1a3540">mdi-close</v-icon></v-btn
          >
        </div>
        <v-row no-gutters>
          <v-col cols="8" class="left">
            <DueDate
              :init-date="currentIssue.dueDate"
              @change-date="changeDate"
            />
            <Description
              :init-descr="currentIssue.description"
              @change-descr="changeDescr"
            />
            <CheckList
              :tasks="currentIssue.checklist"
              @add-task-item="addTaskItem"
              @del-task-item="delTaskItem"
              @del-all-task="delAllTask"
            />
            <Activity
              :activities="currentIssue.activities"
              @add-comment="addComment"
              @edit-comment="editComment"
              @delete-comment="deleteComment"
            />
          </v-col>
          <v-col cols="4" class="right">
            <Actions />
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-overlay>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';
export default {
  name: 'IssueDetail',
  components: {
    DueDate: () => import('@/components/issue_detail/DueDate.vue'),
    Description: () => import('@/components/issue_detail/Description.vue'),
    CheckList: () => import('@/components/issue_detail/CheckList.vue'),
    Activity: () => import('@/components/issue_detail/Activity.vue'),
    Actions: () => import('@/components/issue_detail/Actions.vue'),
  },
  computed: { ...mapState(['isDetailShow', 'currentIssue', 'issues']) },
  methods: {
    closeDetail() {
      this.$store.commit('toggleIsDetailShow');
    },
    changeDate(date) {
      console.log(date);
      this.$store.commit('changeDate', {
        id: this.currentIssue.id,
        dueDate: date,
      });
    },
    changeDescr(text) {
      let clone = _.cloneDeep(this.currentIssue);
      clone.description = text;
      this.$store.commit('editIssue', clone);
    },
    addTaskItem(item) {
      let clone = _.cloneDeep(this.currentIssue);
      clone.checklist.push(item);
      this.$store.commit('editIssue', clone);
    },
    delTaskItem(id) {
      let clone = _.cloneDeep(this.currentIssue);
      let targetIndex = clone.checklist.findIndex((el) => el.id === id);
      clone.checklist.splice(targetIndex, 1);
      this.$store.commit('editIssue', clone);
    },
    delAllTask(id) {
      let clone = _.cloneDeep(this.currentIssue);
      clone.checklist.splice(id);
      this.$store.commit('editIssue', clone);
    },
    addComment(comment) {
      let clone = _.cloneDeep(this.currentIssue);
      clone.activities.push(comment);
      this.$store.commit('editIssue', clone);
    },
    editComment(comment) {
      let clone = _.cloneDeep(this.currentIssue); //클론 생성, 원본 데이터 보존
      let target = clone.activities.find((el) => el.id === comment.id);
      //{ text: this.editedComment, id: id } 받아온 데이터의 id와 동일한 객체를 리턴
      target.text = comment.text; //타겟의 text를 받아온 데이터의 text로 대체
      this.$store.commit('editIssue', clone); //변경된 내용을 store에 커밋
    },
    deleteComment(id) {
      let clone = _.cloneDeep(this.currentIssue); //클론 생성, 원본 데이터 보존
      let targetIndex = clone.activities.findIndex((el) => el.id === id);
      //comment.id와 동일한 객체의 index를 리턴
      clone.activities.splice(targetIndex, 1); //targetIndex로부터 하나 삭제
      this.$store.commit('editIssue', clone); //변경된 내용을 store에 커밋
    },
  },
};
</script>

<style lang="scss" scoped>
.issue-wrapper {
  width: 800px;
  min-height: 80vh;
}
.scroll-y {
  max-height: 80vh;
  overflow-y: auto;
}
.issue-header {
  position: relative;
  h2 {
    display: inline-block;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
