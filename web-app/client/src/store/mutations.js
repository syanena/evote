import Constant from "../constant";
//import axios from "axios";

export default {
    [Constant.LOG_IN]: (state, payload) => {
        console.log('Before');
        console.log(state);
        console.log("PayLoad");
        console.log(payload);
        state.user.voterId = payload.voterId;
        state.user.role = payload.role;
        console.log(state.voterId);
        console.log("Mutation Success!");
    },

    [Constant.LOG_OUT]: state => {
        state.user = {
            voterId: -1,
            role: -1
        }
    } ,  
    
    [Constant.ELECTION_BAR]: (state, payload) => {
        state.electionBar.xAxis = payload.xAxis;
        state.electionBar.yAxis = payload.yAxis;
    }


}