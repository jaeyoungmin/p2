<template>
  <v-fade-transition class="View">
    <router-view></router-view>
  </v-fade-transition>
</template>

<script>
export default { name: 'CoreView' };
</script>

<style lang="scss" scoped>
.view {
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
    .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
