// import vue from 'vue';
// import Vuex from 'vuex';
// vue.use(Vuex);
export default new Vuex.Store({
    state:{
        username:''
    },
    mutations:{
        setUserName(state,newState){
            state.username = newState;
        },
        cleanUserName(state,newState){
            state.username = newState;
        }
    }
});