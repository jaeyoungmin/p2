import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDetailShow: false,
    isActionMenu: undefined,
    currentIssue: {},
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
        id: 2,
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
    changeDate(state, payload) {
      let target = state.issues.find((el) => el.id === payload.id);
      target.dueDate = payload.dueDate;
    },
    editIssue(state, payload) {
      let target = state.issues.find((el) => el.id === payload.id);
      Object.assign(target, payload);
    },
    changeDescr(state, payload) {
      let target = state.issues.find((el) => el.id === payload.id);
      target.description = payload.descr;
    },
    deleteTask(state, payload) {
      let targetIndex = state.issues.checklist.findIndex(
        (el) => el.id === payload
      );
      state.issues.splice(targetIndex, 1);
    },
    toggleIsActionMenu(state, payload) {
      state.isActionMenu = payload;
    },
    changeListTitle(state, payload) {
      let target = state.lists.find((el) => el.id === payload.id);
      target.title = payload.title;
    },
    addIssue(state, payload) {
      state.issues.push(payload);
    },
    addList(state, payload) {
      state.lists.push(payload);
    },
    deleteList(state, payload) {
      let target = state.lists.findIndex((el) => el.id === payload.id);
      state.lists.splice(target, 1);
    },
    copyIssue(state, payload) {
      state.issues.push(payload);
    },
    deleteIssue(state, payload) {
      let target = state.issues.findIndex((el) => el.id === payload);
      state.issues.splice(target, 1);
      state.isDetailShow = false;
    },
  },
  actions: {},
  modules: {},
});
