import Constant from "../constant";


export default {
    [Constant.LOG_OUT]: store => {
        store.commit(Constant.LOG_OUT);
    },

     [Constant.LOG_IN](store, payload) {
        if(payload){
            console.log("store: ");
            console.log(store);
            console.log("Payload: ");
            console.log(payload);
            store.commit(Constant.LOG_IN,payload);
            console.log('Result Store: ');
            console.log(store);
            let result = {status: "200", voterId: payload.voterId, role: payload.role};
            return result;
        }
        
    },

    [Constant.ELECTION_BAR](store, payload) {
        if(payload) {
            console.log('Payload: ');
            console.log(payload);
            store.commit(Constant.ELECTION_BAR, payload);
        }
    }
}