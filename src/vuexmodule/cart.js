const cartVuex = {
    namespaced: true,
    state: {
        cartArr:[],
    },
    mutations: {
        addData(state,obj){
            state.cartArr.push(obj)
        }
    },
    actions: {
    },
    getters: {

    },
}

export default cartVuex;