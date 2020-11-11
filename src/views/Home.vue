<template>
  <div class="home">
    <CoreAppBar />
    <CoreView />
    <IssueDetail />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    CoreAppBar: () => import('../components/core/AppBar.vue'),
    CoreView: () => import('../components/core/View.vue'),
    IssueDetail: () => import('@/components/main/IssueDetail.vue'),
  },
};
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100vh;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #1a3540;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0;
}
.v-text-field__details {
  min-height: none;
}
</style>
