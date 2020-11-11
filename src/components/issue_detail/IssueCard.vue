<template>
  <v-card
    elevation="1"
    no-gutters
    class="issue-card card-coulmn-header coulmn-drag-handle"
    @click="openDetail"
  >
    <h4>{{ issue.title }}</h4>
  </v-card>
</template>

<script>
export default {
  name: 'IssueCard',
  props: ['issue'],
  methods: {
    openDetail() {
      this.$store.commit('setCurrentIssue', this.issue);
      this.$store.commit('toggleIsDetailShow');
    },
  },
};
</script>

<style lang="scss" scoped>
.issue-card {
  padding: 10px;
  margin: 5px 0;
  transition: 0.3s ease-in-out;
}
.issue-card:hover {
  background-color: teal;
  cursor: pointer;
  h4 {
    color: #fff;
  }
}
</style>
