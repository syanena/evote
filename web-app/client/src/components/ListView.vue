
<template>
    <div class="election">
        <h1 class="logo">
          <!-- <img src='../assets/logo.png' alt="로고 교체"> -->
        </h1>
        <div class="elect-bottom">
           
            <strong>ICRAFT TOKEN Election</strong>
            <p>Please select one</p>
             <br>      
      <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
            <v-card class="tokentile" v-for="item in ballotItems" >
                
                <v-card-text>
                        <input v-model="voteToken" class="tokenlist" type="radio" :value="item.value"> {{item.name}} 
                </v-card-text>
            </v-card>        
        <span v-if="voteToken">
            voteToken: 
            <b> {{voteToken}} </b>
        </span>
        
        
        <v-btn class="election-btn" @click.stop="electionSubmit">투표</v-btn>
        
        </div>
        
        <footer>© iCraft21</footer>
        <transition>
            <div class="alert-modal">
                
                <v-alert
                    :value="successModal"
                    type="success"
                    >
                    {{response}}
                </v-alert>
                <v-alert
                    :value="errorModal"
                    type="error"
                    >
                    {{response}}
                </v-alert>
            </div>

        </transition>
        
    </div>
</template>
<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
import Constant from "../constant";

export default {
    data () {
        return {
        voteToken: null,
        response: null,
        voterId: null,
        response: null,
        successModal: false,
        errorModal: false
        };
    },
    computed: {
		ballotItems() {
			return this.$store.state.ballotItems;
        }
        
    },
    components: {
    VueInstantLoadingSpinner,


      },

    methods: { 
        async runSpinner() {
            this.$refs.Spinner.show();
        },
        async hideSpinner() {
            this.$refs.Spinner.hide();
        },       
        async electionSubmit() {
             this.runSpinner();
            const electionRes = await PostsService.queryWithQueryString('election');
            console.log("Election Query Response: ");
            console.log(electionRes);
            let electionId = electionRes.data[0].Key;
            let voterId = this.$store.state.user.voterId;
            let picked = this.voteToken;
            console.log("Election : ");
            console.log(this.voteToken);
            console.log("VoterID: ");
            console.log(voterId);
            this.response = null;

            //error checking for making sure to vote for a valid party
            if(this.voteToken === null) {
                console.log("Elect NULL");

                let response = "You have to pick a party to vote for!";
                this.response = response;
                this.errorModal = true;

            } else if(voterId === -1) {
                console.log("Voter ID is not defined.");

                let response = "You have to enter your voterId to cast a vote!";
                this.response = response;
                this.errorModal = true;
            } else {
                const apiResponse = await PostsService.castBallot(
                    electionId,
                    voterId,
                    picked
                );

                console.log('ApiResponse: ');
                console.log(apiResponse);

                if(apiResponse.data.error) {
                    this.response = apiResponse.data.error;
                    
                } else if(apiResponse.data.message) {
                    this.response = `Could not find voter with voterId ${voterId}
                        in the state. Make sure you are entering a valid voterId`;
                    this.errorModal = true;
                }
                else {
                    let response  = `Successfully recorded vote for ${this.voteToken} party 
                        for voter with voterId ${apiResponse.data.voterId}. Thanks for 
                        doing your part and voting!`;
                    this.response = response;
                    this.successModal = true;

                    console.log("Cast Ballot!");
                    
                    this.$store
                        .dispatch(Constant.LOG_OUT)
                        console.log('LOG OUT: ');
                        console.log(this.$store.state.user.voterId)
                        this.$router.push("login");
                }
            }
             this.hideSpinner();
        }
       
    }
};
</script>

<style lang="scss">
$primary-color: #175749;
.election {
    width: 600px;
  height: 400px;
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: -300px;
  margin-top: -200px;
  .logo {
    background-color: $primary-color;
    display: inline-block;
    width: 100%;
    padding: 15px 20px;
    img {
      float: left;
    }
  }
  .elect-bottom {
    background-color: #fff;
    margin-bottom: 30px;
    padding: 40px 50px 20px; 
    height: 330px;
    position: relative;
    > * {
      display: block;
      text-align: left;
    }
    > strong {
      color: #646464;
      font-size: 30px;
    }
    > p {
      margin: 5px 0 30px 0;
      color: #646464;
    }

   
   .tokentile {
       margin-bottom: 10px;
       margin-top: 10px;
   }
    
    
    .election-btn {
      background-color: $primary-color;
      //color: #fff;
      float: right !important;
      margin: 0;
      font-size: 18px;
      position: relative;
    //   bottom: 30px;
      margin-top: 30px;
      width: 100%;
      
    }
  }
  footer {
    color: #999999;
    font-size: 15px;
    letter-spacing: -1px;
  }
}

</style>
