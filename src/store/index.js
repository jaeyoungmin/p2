import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDetailShow: false,
    currentIssue: [],
    lists: [
      {
        id: 0,
        title: 'todo',
      },
      {
        id: 1,
        title: 'doing',
      },
      {
        id: 2,
        title: 'done',
      },
    ],
    issues: [
      {
        id: 0,
        listId: 0,
        title: 'page',
        description: ' make log in page',
        dueDate: '2020-10-20',
        checklist: [
          { id: 0, title: 'layout', complete: true },
          { id: 1, title: 'function', complete: false },
        ],
        activities: [
          {
            id: 0,
            imgSrc:
              'https://crhscountyline.com/wp-content/uploads/2020/03/Capture.png',
            name: 'nickname',
            text: 'hi my name is nick',
            createdAt: '2020-10-27T08:09:34.435Z',
          },
          {
            id: 1,
            imgSrc:
              'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/UVBJZL3RXAB36BDSHVM3MW2WNY.jpg',
            name: 'yourNickname',
            text: 'hi my name is you',
            createdAt: '2020-10-27T08:05:34.435Z',
          },
        ],
      },
      {
        id: 1,
        listId: 1,
        title: 'login',
        description: ' make log in page',
        dueDate: '2020-10-20',
        checklist: [
          { id: 0, title: 'layout', complete: true },
          { id: 1, title: 'function', complete: false },
        ],
        activities: [
          {
            id: 0,
            imgSrc:
              'https://crhscountyline.com/wp-content/uploads/2020/03/Capture.png',
            name: 'nickname',
            text: 'hi my name is nick',
            createdAt: '2020-10-27T08:09:34.435Z',
          },
          {
            id: 1,
            imgSrc:
              'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/UVBJZL3RXAB36BDSHVM3MW2WNY.jpg',
            name: 'yourNickname',
            text: 'hi my name is you',
            createdAt: '2020-10-27T08:05:34.435Z',
          },
        ],
      },
      {
        id: 1,
        listId: 1,
        title: 'Hungry',
        description: ' make log in page',
        dueDate: '2020-10-20',
        checklist: [
          { id: 0, title: 'layout', complete: true },
          { id: 1, title: 'function', complete: false },
        ],
        activities: [
          {
            id: 0,
            imgSrc:
              'https://crhscountyline.com/wp-content/uploads/2020/03/Capture.png',
            name: 'nickname',
            text: 'hi my name is nick',
            createdAt: '2020-10-27T08:09:34.435Z',
          },
          {
            id: 1,
            imgSrc:
              'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/UVBJZL3RXAB36BDSHVM3MW2WNY.jpg',
            name: 'yourNickname',
            text: 'hi my name is you',
            createdAt: '2020-10-27T08:05:34.435Z',
          },
        ],
      },
    ],
  },
  mutations: {
    toggleIsDetailShow(state) {
      state.isDetailShow = !state.isDetailShow;
    },
    setCurrentIssue(state, payload) {
      state.currentIssue = payload;
    },
  },
  actions: {},
  modules: {},
});
