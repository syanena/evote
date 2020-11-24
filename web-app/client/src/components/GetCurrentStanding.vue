<template>
  <div class="getCurrentStanding">
    <h1 class="logo">
          <!-- <img src='../assets/logo.png' alt="로고 교체"> -->
    </h1>
    <div class="currentStd-bottom">
      <strong>ICRAFT-BDT Poll Standings </strong>
      <span v-if="response">
        <b>{{ response }}</b>
      </span>
      <br>      
      <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
      <div class="chart-wrapper">
        <chart class="chart" :options="chartOptionsBar"></chart>
        <!-- <GetElectionOutput></GetElectionOutput> -->
      </div>
       
    </div>
    <footer> © iCraft21 </footer>  
  </div>
</template>


<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
import {Bar} from "vue-chartjs";

import GetElectionOutput from './GetElectionOutput';

export default {
   extends: Bar,
  name: "response",

  data() {
    return {
      response: null,
      chartOptionsBar: {},
    };
  },
  components: {
    VueInstantLoadingSpinner,
    GetElectionOutput

  },
  

  methods: {
    async getCurrentStanding() {
      this.response = null;
      
      this.runSpinner();

      // console.log(`this.selected ${this.selected}`);
      const apiResponse = await PostsService.getCurrentStanding();
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
      console.log(apiResponse);
      console.log(apiResponse.data[0].Record);
      let currentStanding = [];
      let currentStandName = [];
      for (let i = 0; i < apiResponse.data.length; i++) {
        currentStanding[i] = apiResponse.data[i].Record.count;
        currentStandName[i] = apiResponse.data[i].Key;
      }
      console.log("curStanding: ");
      console.log(currentStanding);

      console.log("currentName: ");
      console.log(currentStandName);


      this.chartOptionsBar = {
        legend: {
          display: true
        },
        
        maintainAspectRatio:true,
        xAxis: {
          data: currentStandName,
        },
        yAxis: {
          type: "value",
          ticks:{
            beginZero: true,
          }
        },

        series: [
          {
            type: "bar",
            data: currentStanding
          }
        ],
        title: {
          text: "2020 ",
          x: "center",
          textStyle: {
            fontSize: 24
          }
        },
        color: ["#127ac2"]
      };
      this.hideSpinner();
    },
    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  },

   mounted () {
      this.getCurrentStanding();
    }
};
</script>



<style lang="scss">
$primary-color: #175749;
.getCurrentStanding {
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
  .currentStd-bottom {
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
    
    .cuttentStd-btn {
      background-color: #c4c7c7;
      
      color: #175749; 
      // float: right !important;
      margin: 0;
      font-size: 18px;
      text-align: center;
      position: relative;
      width: 60%;
      // bottom: 30px;
      // right: 50px;
    }

    .chart-wrapper {
      width: 100%;
      padding-left: 0px;
      margin-bottom: 30px;

    }
  }
  footer {
    color: #999999;
    font-size: 15px;
    letter-spacing: -1px;
    margin-top: 10px;
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