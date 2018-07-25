import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const mutations={
  userImageGet(state,image){
    if(image){
      state.userImage = image;
    }else if(image == null){
      state.userImage = null;
    }
  },
  userInfoGet(state,userinfo){
    state.userInfo.birthday = userinfo.birthday;
    state.userInfo.email = userinfo.email;
    state.userInfo.realname = userinfo.realname;
    state.userInfo.sex = userinfo.sex;
    state.userInfo.sign = userinfo.sign;
  },
  userNtf(state,isntf){
    state.isntf = isntf;
  },
  userMessage_flag(state,isntf){
    state.message_flag = isntf;
  },
  userPercent(state,percent){
    state.storepercentage = percent;
  },
  userStoresize(state,size){
    state.storesize = size;
  }
};
const getters={
  userImage(state){
    return state.userImage;
  },
  userInfo(state){
    return state.userInfo;
  }
};
const actions={
  setImage({commit},image){
    commit("userImageGet",image)
  },
  setUserInfo({commit},userinfo){
    commit('userInfoGet',userinfo)
  },
};

export default new Vuex.Store({
  state:{
    userImage:'',
    username:'',
    userInfo:{},
    isntf:false,
    message_flag:false,
    storepercentage:0,
    storesize:0
  },
  mutations,
  actions,
  getters
})
