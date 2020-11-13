<template>
  <div
    class="main-view"
    ref="mainView"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
  >
    <ListBox
      v-for="(list, i) in lists"
      :key="i"
      :list="list"
      @change-list-title="changeListTitle"
      class="list-box"
    />
    <v-btn
      elevation="0"
      width="300"
      class="ma-3"
      @click="isAddList = true"
      v-if="!isAddList"
      ><v-icon class="mr-1">mdi-plus</v-icon> Add another list
      <v-spacer></v-spacer
    ></v-btn>
    <v-card v-else class="add-list-box pa-2 my-3" min-width="300">
      <v-textarea
        v-model="newListTitle"
        placeholder="Enter a title for this card... "
        solo
        flat
        auto-grow
        @keyup.enter="addList"
        hide-details
        class="mb-2 elevation-0"
        rows="1"
      ></v-textarea>
      <v-btn elevation="0" color="green" small dark @click="addList"
        >Add List</v-btn
      >
      <v-btn icon @click="isAddList = false"><v-icon>mdi-close</v-icon></v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Main',
  components: {
    ListBox: () => import('@/components/main/ListBox.vue'),
  },
  data() {
    return {
      isAddList: false,
      newListTitle: '',
      isMouseDown: false,
      errByPoint: {},
      draggingItem: undefined,
    };
  },
  computed: {
    ...mapState(['lists']),
    newListId() {
      return (
        this.lists.reduce((acc, cur) => {
          acc = Math.max(acc, cur.id);
          return acc;
        }, 0) + 1
      );
    },
  },
  methods: {
    changeListTitle(list) {
      this.$store.commit('changeListTitle', list);
    },
    addList() {
      this.$store.commit('addList', {
        id: this.newListId,
        title: this.newListTitle,
      });
      this.newListTitle = '';
    },
    mouseDown(e) {
      console.log('down', e);
      this.isMouseDown = true;
      let targetIssueCard = this.findTargetEl(e);
      if (targetIssueCard) {
        let cln = this.cloneTargetEl(targetIssueCard, e);
        this.setStyleToCloneEl(cln, e, targetIssueCard);
        this.$refs.mainView.appendChild(cln);
      }
    },
    mouseMove(e) {
      if (this.isMouseDown && this.draggingItem) {
        event.preventDefault();
        console.log('move', e.clientX, e.clientY);
        this.draggingItem.style.left = e.clientX - this.errByPoint.x + 'px';
        this.draggingItem.style.top = e.clientY - this.errByPoint.y + 'px';
      }
    },
    mouseUp(e) {
      console.log('up', e);
      this.isMouseDown = false;
      if (this.draggingItem) {
        this.$refs.mainView.removeChild(this.draggingItem);
        this.draggingItem = undefined;
      }
    },
    findMoveToListBoxByMouseUpPosition() {
      let listboxList = Array.prototype.slice.call(
        document.getElementsByClassName('list-box')
      );
      console.log(listboxList);
    },
    findTargetEl(e) {
      return e.path.find((el) => {
        if (el.classList) {
          return el.classList.contains('issue-card');
        }
        return false;
      });
    },
    cloneTargetEl(targetIssueCard, e) {
      let cln = targetIssueCard.cloneNode(true);
      let offsetOfTarget = {
        x: targetIssueCard.getBoundingClientRect().left,
        y: targetIssueCard.getBoundingClientRect().top,
      };
      this.errByPoint = {
        x: e.clientX - offsetOfTarget.x,
        y: e.clientY - offsetOfTarget.y,
      };
      this.draggingItem = cln;
      return cln;
    },
    setStyleToCloneEl(cln, e, targetIssueCard) {
      cln.style.position = 'absolute';
      cln.style.left = e.clientX - this.errByPoint.x + 'px';
      cln.style.top = e.clientY - this.errByPoint.y + 'px';
      cln.style.width = targetIssueCard.clientWidth + 'px';
      cln.style.height = targetIssueCard.clientHeight + 'px';
    },
    //  mouseDown(e) {
    //     console.log('down', e);
    //     this.isMouseDown = true;
    //     let targetIssueCard = e.path.find((el) => {
    //       if (el.classList) {
    //         return el.classList.contains('issue-card');
    //       }
    //       return false;
    //     });
    //     if (targetIssueCard) {
    //       // console.log(targetIssueCard);
    //       let cln = targetIssueCard.cloneNode(true);
    //       cln.style.position = 'absolute';
    //       let offsetOfTarget = {
    //         x: targetIssueCard.getBoundingClientRect().left,
    //         y: targetIssueCard.getBoundingClientRect().top,
    //       };
    //       this.errByPoint = {
    //         x: e.clientX - offsetOfTarget.x,
    //         y: e.clientY - offsetOfTarget.y,
    //       };
    //       // console.log(this.errByPoint);
    //       console.log(e.clientX, e.clientX - offsetOfTarget.x);
    //       cln.style.left = e.clientX - this.errByPoint.x + 'px';
    //       cln.style.top = e.clientY - this.errByPoint.y + 'px';
    //       cln.style.width = targetIssueCard.clientWidth + 'px';
    //       cln.style.height = targetIssueCard.clientHeight + 'px';
    //       this.draggingItem = cln;
    //       this.$refs.mainView.appendChild(cln);
    //     }
    //   },

    //   mouseMove(e) {
    //     if (this.isMouseDown) {
    //       event.preventDefault();
    //       console.log('move', e.clientX, e.clientY);
    //       this.draggingItem.style.left = e.clientX - this.errByPoint.x + 'px';
    //       this.draggingItem.style.top = e.clientY - this.errByPoint.y + 'px';
    //     }
    //   },
    //   mouseUp(e) {
    //     console.log('up', e);
    //     this.isMouseDown = false;
    //     this.$refs.mainView.removeChild(this.draggingItem);
    //   },
  },
};
</script>

<style lang="scss" scoped>
.main-view {
  display: flex;
  flex-flow: row;
  overflow-x: auto;
  align-items: flex-start;
  height: calc(100vh - 60px);

  .list-box {
    flex: 350px 0 0;
  }
}
</style>
