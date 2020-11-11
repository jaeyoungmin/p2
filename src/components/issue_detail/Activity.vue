<template>
  <v-container class="activity-module">
    <v-row class="activity-header align-center mb-2" no-gutters>
      <v-icon class="ico">
        mdi-format-list-bulleted-square
      </v-icon>
      <div class="activity-title d-flex flex-grow-1 align-center ml-6">
        <h4>Activity</h4>
      </div>
    </v-row>
    <v-row class="activity-list-wrapper align-center mb-3" no-gutters>
      <v-avatar class="mr-4"><v-img :src="profileImg"></v-img></v-avatar>
      <v-text-field
        outlined
        class="comment-text-field"
        placeholder="Write a comments..."
        hide-details
        v-model="newComment"
        @keyup.enter="save"
      >
        <template v-slot:append
          ><v-btn text small color="green" height="24" @click="save"
            >Save</v-btn
          ></template
        >
      </v-text-field>
    </v-row>
    <v-row
      v-for="(comment, i) in orderedActivities"
      :key="i"
      class="mb-3"
      no-gutters
    >
      <v-avatar class="mr-4"><v-img :src="comment.imgSrc"></v-img></v-avatar>
      <div class="comment-container flex-grow-1">
        <p>
          <strong class="mr-2">{{ comment.name }}</strong>
          <span class="date-text">{{ formatDate(comment.createdAt) }}</span>
        </p>
        <div class="text-wrapper">
          <div class="comment-input-wrapper" v-if="isEdit !== i">
            <p class="comment-txt">
              {{ comment.text }}
            </p>
          </div>
          <div class="comment-input-wrapper-editing" v-else>
            <v-text-field
              class="comment-input mb-2"
              v-model="editedComment"
              :dark="isEdit === i"
              rows="1"
              auto-grow
              solo
              hide-details
            ></v-text-field>
          </div>
          <div class="activity-actions" v-if="isEdit !== i">
            <button class="mr-2" @click="toEdit(comment.text, i)">
              Edit
            </button>
            <button @click="deleteComment(comment.id)">Delete</button>
          </div>
          <div class="btn-edit-wrapper" v-if="isEdit === i">
            <v-btn color="green" dark text @click="edit(comment.id)"
              >save</v-btn
            >
            <v-btn icon @click="isEdit = undefined">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
export default {
  name: 'Activity',
  data() {
    return {
      isEdit: undefined,
      profileImg:
        'https://lh3.googleusercontent.com/proxy/gBot-OyuCfJdyTHsCAzqiYchBpfmd201vi13UtcOqorR__0NEoPZgZR5vqQTjm1HBuCOmq2GkQoP8vAmm2xWEpPuZwTzBUZZhDhnVw6O90IMoSTa0yUXhfdoeMSYdJN4Aiu8UMrcQBoBYF5QIh66LS7orImXVCj1SBx-a7iufdlPkewiA2TXF10AWFH1dp_AtbIeFCVOXl7-qvhtwHOZgDIRLYf4weAQEVIdUxBv70OtueL99oO7Fqd5BBR1drrytNsiA1ulw1wCJw',
      editedComment: '',
      newComment: '',
    };
  },
  props: ['activities'],
  methods: {
    save() {
      this.$emit('add-comment', {
        id: this.newCommentId,
        text: this.newComment,
        name: 'ME',
        createdAt: moment().toISOString(),
        imgSrc: this.profileImg,
      });
      this.newComment = '';
    },
    toEdit(comment, index) {
      this.isEdit = index;
      this.editedComment = comment;
    },
    formatDate(date) {
      let created = moment(date);
      return created.format('MMMM Do ddd [at] HH:mm a');
    },
    edit(id) {
      this.$emit('edit-comment', { text: this.editedComment, id: id });
      this.isEdit = undefined;
    },
    deleteComment(id) {
      this.$emit('delete-comment', id);
    },
  },
  computed: {
    newCommentId() {
      return (
        this.activities.reduce((acc, cur) => {
          return Math.max(acc, cur.id);
        }, 0) + 1
      );
    },
    orderedActivities() {
      let clone = _.cloneDeep(this.activities);
      return clone.sort(
        (a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-module {
  .activity-header {
    position: relative;
    .ico {
      position: absolute;
    }
    .activity-title {
      padding-top: 2px;
    }
  }
  .activity-list-wrapper {
    .comment-text-field {
      max-width: calc(100% - 64px);
    }
  }
  .comment-container {
    max-width: calc(100% - 64px);
  }

  .date-text {
    font-size: 0.75rem;
    opacity: 0.8;
  }
  p {
    margin: 0;
  }
  .comment-input-wrapper {
    display: inline-block;
    background: #fff;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .activity-actions {
    button {
      font-size: 14px;
      text-decoration: underline;
    }
  }
}
</style>
