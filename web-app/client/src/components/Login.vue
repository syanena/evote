<template>
  <div class="login">
      <h1 class="logo">
          <!-- <img src='../assets/logo.png' alt="로고 교체"> -->
      </h1>
      <div class="login-bottom">
          <strong>ICRAFT-BDT Token </strong>
          <p> Welcome, please login.</p>
          <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
            <v-text-field
            v-model="voterId"
            :rules="[rules.required]"
            
            hint="사원 번호를 입력하세요."
            label="사원번호"
            clearable
            required
            v-on:keyup.enter="onSubmit"
            
            ></v-text-field>
            <v-text-field
            v-model="pwd"
            :type="'password'"
            :rules="[rules.required]"
            hint="비밀번호를 입력하세요."
            label="비밀번호"
            clearable
            required
            v-on:keyup.enter="onSubmit"
            ></v-text-field>
            <v-btn class="login-btn" @click.stop="onSubmit"><v-icon style="">launch</v-icon></v-btn>
            <v-btn class="signup-btn" @click.stop="onSignUp">SignUp</v-btn>
      </div>
    <footer> © iCraft21 </footer>   
    <transition>
        <div class="alert-modal">
          <v-alert
            :value="successModal"
            type="success"
          > 
         {{loginResponse.data}}
          </v-alert>
          <v-alert
          :value="errorModal"
          type="error"
          >
          {{loginResponse.data}}
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
  name: "response",
  data() {
    return {
        voterId: "",
        pwd: "",
        errors: [],
        successModal: false,
        errorModal: false,
        loginResponse: {
        data: ""
        },
        rules: {
            required: value => !!value || "입력해주세요",
            counter: value => value.length <= 20 || "Max 20 characters",
            voterId: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "사원번호를 입력해주세요";
            },
            pwd: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "비밀번호를 입력해주세요";
            }
        }
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {    
    async onSignUp() {
      this.$router.push("signUp");
    },
    async onSubmit() {
      this.runSpinner();
        if(!this.voterId) {
            console.log("!thisVoterId");
            let response = 'Please enter a VoterId';
            this.loginResponse.data = response;
            this.errorModal = true;

        }
        else if(!this.pwd){
            console.log("!thisPWD");
            let response = "Please enter a PASSWORD";
            this.loginResponse.data = response;
            this.errorModal = true;
        }
        else {
            const apiResponse = await PostsService.loginVoter(
                this.voterId,
                this.pwd
            );
            console.log("apiResponse");
            console.log(apiResponse.data);

            if(apiResponse.data.error){
                console.log(apiResponse.data.error);
                this.loginResponse.data = apiResponse.data.error;
                this.errorModal = true;
            }
            else {
                this.$store
                    .dispatch(Constant.LOG_IN, {
                      voterId: apiResponse.data.voterId,
                      password: apiResponse.data.pwd,
                      role: apiResponse.data.role
                    })
                    
                    .then(resp => {
                      console.log('Response View: ');
                      console.log(resp);
                      if(resp.status == 200) {
                        console.log('Store VoterId: ');
                        console.log(this.$store.state.user.voterId);
                        this.loginResponse.data = "로그인이 완료 되었습니다.";
                        this.successModal = true;

                        this.$router.push({name: "ListView"});
                      }
                    })
            }
             console.log(apiResponse);
            this.loginReponse = apiResponse;
        }
        this.hideSpinner();
    },

    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
};
</script>


<style lang="scss">
$primary-color: #175749;
.login {
  width: 600px;
  height: 400px;
  position: absolute;
  top: 45%;
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
  .login-bottom {
    background-color: #fff;
    margin-bottom: 30px;
    padding: 40px 50px;
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

    .signup-btn {

      background-color: $primary-color;
      //color: #fff;
      float: left !important;
      margin: 0;
      font-size: 18px;
      position: absolute;
      bottom: 30px;
      //right: 20px;
    }
    
    .login-btn {
      background-color: $primary-color;
      //color: #fff;
      float: right !important;
      margin: 0;
      font-size: 18px;
      position: absolute;
      bottom: 30px;
      right: 50px;
    }
  }
  footer {
    color: #999999;
    font-size: 15px;
    letter-spacing: -1px;
  }
}
.alert-modal {
  position: absolute;
  top: -4px;
  left: 0;
  width: 100%;
  height: 65px;
}
.v-alert.error {
  background-color: #ff5252;
  height: 100%;
}
.v-alert.success {
  background-color: #4caf50;
  height: 100%;
}
</style>