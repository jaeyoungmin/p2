<template>
  <v-card width="350" class="list-box">
    <v-row
      class="box-header pl-2 align-center justify-space-between"
      no-gutters
    >
      <div class="header-txt flex-grow-1">
        <h4 v-if="!isEdit" @click="isEdit = true">{{ list.title }}</h4>
        <v-text-field
          v-model="listTitle"
          class="list-title-input my-2"
          flat
          outlined
          hide-details
          append-icon="mdi-check "
          @click:append="changeListTitle"
          @keyup.enter="changeListTitle"
          v-else
        ></v-text-field>
      </div>
      <v-menu transition="slide-y-transition" absolute>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon>
              mdi-dots-horizontal
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list class="pa-0 action">
            <v-list-item @click="deleteList">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-row>
    <div class="list-box-item" ref="grid">
      <IssueCard
        :id="'issue-card-' + issue.id"
        v-for="(issue, i) in issueSameId"
        :key="i"
        class="issue-card"
        :issue="issue"
      />
    </div>
    <div class="list-box-add" v-if="!isAddCard">
      <v-btn text small @click="isAddCard = true"
        ><v-icon>mdi-plus</v-icon>Add a list
      </v-btn>
    </div>
    <div class="mx-3 py-3" v-else>
      <v-textarea
        v-model="newCardTitle"
        placeholder="Enter a title for this card..."
        solo
        auto-grow
        rows="2"
        hide-details
        @keyup.enter="addCard"
        class="elevation-0 mb-3"
      ></v-textarea>
      <v-btn color="green" dark @click="addCard">Add card</v-btn>
      <v-btn icon @click="isAddCard = false"><v-icon>mdi-close</v-icon></v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ListBox',
  components: {
    IssueCard: () => import('@/components/issue_detail/IssueCard.vue'),
  },

  data() {
    return {
      isEdit: false,
      isAddCard: false,
      newCardTitle: '',
      listTitle: '',
      myMuuri: {},
    };
  },
  computed: {
    ...mapState(['issues', 'isActionMenu']),
    issueSameId() {
      return this.issues.filter((el) => el.listId === this.list.id);
    },
    newIssueId() {
      return (
        this.issues.reduce((acc, cur) => {
          acc = Math.max(acc, cur.id);
          return acc;
        }, 0) + 1
      );
    },
  },
  methods: {
    changeListTitle() {
      if (this.listTitle) {
        this.$emit('change-list-title', {
          id: this.list.id,
          title: this.listTitle,
        });
      } else {
        this.listTitle = this.list.title;
      }
      this.isEdit = false;
    },
    addCard() {
      let defaultIssueForm = {
        id: this.newIssueId,
        listId: this.list.id,
        title: this.newCardTitle,
        description: '',
        dueDate: '',
        checklist: [],
        activities: [],
      };
      this.$store.commit('addIssue', defaultIssueForm);
      this.newCardTitle = '';
    },
    deleteList() {
      this.$store.commit('deleteList', { id: this.list.id });
    },
  },

  props: ['list'],
};
</script>

<style lang="scss" scoped>
.list-box {
  margin: 10px;
  background: #d9d9d9;
  .list-box-title {
    padding: 5px 10px;
  }
  .list-box-item {
    padding: 0 10px;
  }
  .list-box-add {
    padding: 5px 0;
  }
}
.action:hover {
  cursor: pointer;
}
.item-title-wrap:hover {
  background: teal;
  color: #fff;
}
</style>
