import * as fb from "firebase";

class Order {
    constructor(name, phone, adId, done=false, id=null){
        this.name=name;
        this.phone=phone;
        this.adId=adId;
        this.done=done;
        this.id=id;
    }
}

export default {
    state:{
        orders:[]
    },
    mutations:{
        loadOrders(state, payload){
            state.orders=payload;
        }
    },
    actions:{
        async createOrder({commit}, {name, phone, adId, ownerId}){
            const order = new Order(name, phone, adId);
            try {
                commit('clearLoading');
                await fb.database().ref(`/users/${ownerId}/orders`).push(order)

            }catch (error) {
                commit('setError', error.message);
                throw error
            }
        },
        async fetchOrders({commit, getters}){
            commit('setLoading', true);
            commit('clearError');
            const resultOrder=[];
            try {
                const fbValue = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value');
                window.console.log(getters.user.id+ ' from order');
                const orders = fbValue.val();
                Object.keys(orders).forEach(key=>{
                    const order= orders[key];
                    resultOrder.push(new Order(order.name, order.phone ,order.adId, order.done, key));
                })
                commit('loadOrders', resultOrder);
                window.console.log(resultOrder);
                commit('setLoading', false);

            }catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
            }
        },
        async markOrderDone({commit, getters}, payload){
            commit('clearError');
            try {
                await fb.database().ref(`users/${getters.user.id}/orders`).child(payload).update({done:true});
            }catch (error) {
                commit('setError', error.message);
                throw error
            }
        }
    },
    getters:{
        doneOrders (state) {
            return state.orders.filter(o => o.done)
        },
        undoneOrders (state) {
            return state.orders.filter(o => !o.done)
        },
        orders(state, getters){
            return getters.undoneOrders.concat(getters.doneOrders);
        },

    },

}