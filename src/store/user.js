import * as fb from 'firebase'

class User {
    constructor(id){
        this.id = id;
    }
}
export default {
    state:{
        user:null
    },

    mutations: {
        setUser(state, payload){
            state.user = payload;
        },
        logout(state) {
            state.user=null;
        }
    },
    actions: {
        logout({commit}){
            fb.auth().signOut();
            commit('logout');
        },
        async registerUser({commit}, {email, password}){
            commit('clearError');
            commit('setLoading', true);

            try {
                const user = await fb.auth().createUserWithEmailAndPassword(email,password);

                commit('setUser', new  User( user.uid));
                commit('setLoading', false);
            }
            catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }


        },
        async loginUser({commit},{email, password}){
            commit('clearError');
            commit('setLoading', true);

            try {
                 await fb.auth().signInWithEmailAndPassword(email, password);
                commit('setUser', new User(fb.auth().currentUser.uid));
                window.console.log(fb.auth().currentUser.uid);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }
        },
        autoLoginUser({commit}, payload){
            commit('setUser', new User(payload.uid));
        }
    },
    getters: {
        user(state){
            return state.user;
        },
        isUserLoggedIn(state){
            return state.user !== null;
        }
    }

}