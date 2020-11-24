<template>

  <div class="signUp">
      <h1 class="logo">
          <!-- <img src='../assets/logo.png' alt="로고 교체"> -->
      </h1>
      <div class="signUp-bottom">
          <strong>ICRAFT-BDT Token </strong>
          <p> Please sign up your ID</p>
        <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
        <v-text-field
        v-model="voterId"
        :rules="[rules.required]"
        hint="사원 번호를 입력하세요."
        label="사원번호"
        required
        v-on:keyup.enter="onSubmit"
        ></v-text-field>

        <v-text-field 
        v-model="name"
        hint="이름을 입력하세요."
        label="이름"        
        required
        v-on:keyup.enter="onSubmit"
        ></v-text-field>

        <v-text-field
        v-model="pwd"
        :type="'password'"
        :rules="[rules.required]"
        hint="비밀번호를 입력하세요."
        label="비밀번호"        
        required
        v-on:keyup.enter="onSubmit"
        ></v-text-field>
        
        <v-text-field
        v-model="email"
        :rules="[rules.required]"
        hint="사내메일을 입력하세요."
        label="사내메일"        
        required
        v-on:keyup.enter="onSubmit"
        ></v-text-field>            

       <v-btn class="signUp-btn" @click.stop="onSubmit">Submit</v-btn>
      </div>
    <footer> © iCraft21 </footer>   
    <transition>
        <div class="alert-modal">
          <v-alert
            :value="successModal"
            type="success"
          > 
          회원가입이 완료 되었습니다.
          </v-alert>
          <v-alert
          :value="errorModal"
          type="error"
          >
          회원가입 실패! 입력정보를 다시 확인해 주세요!
          </v-alert>
        </div>
    </transition>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
        voterId: "",
        pwd: "",
        name: "",
        email: "",
        errors: [],
        successModal: false,
        errorModal: false,
        signUpResponse: {
        data: ""
        },
        rules: {
            required: value => !!value || "입력해주세요",
            counter: value => value.length <= 20 || "Max 20 characters",
            voterId: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "아이디를 입력해주세요";
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
     async onSubmit() {
        this.runSpinner();

        const apiResponse = await PostsService.signUpVoter(
          this.voterId,
          this.pwd,
          this.name,
          this.email,
          1
        );

        console.log('Api Response; ');
        console.log(apiResponse.data);

         if (apiResponse.data.error) {
           console.log('Client Error Response:');
          console.log(apiResponse.data.error);
          this.signUpResponse = apiResponse.data.error;
        } else {
          console.log('Client Success Response:');
          this.successModal = true;
          this.$router.push("login");
        }
        console.log('Client Response:');
        console.log(apiResponse);
        this.signUpResponse = apiResponse;

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
.signUp {
  width: 600px;
  height: 600px;
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
  .signUp-bottom {
    background-color: #fff;
    margin-bottom: 30px;
    padding: 40px 50px;
    height: 490px;
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
    
    .signUp-btn {
      background-color: #175749;
      
      color: #175749;
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