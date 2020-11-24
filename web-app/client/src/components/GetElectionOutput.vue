<template>
    <div>
    <h2>Title</h2>

         <chart class="chart" :options="chartOptionsBar"></chart>
    </div>
</template>



<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
import { Bar, mixins } from 'vue-chartjs';
import Constant from "../constant";

 

  //Exporting this so it can be used in other components
  export default {

    extends: Bar,
    props: ["chartOptionBar"],
    
    data () {
      return {
        xAxisData: [],
        yAxisData: [],
        chartOptionsBar: null,
        
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },

    created() {
           

    },
    
    methods: {
        async getCurrentStanding() {
            this.response = null;
            
            // this.runSpinner();

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
                // this.xAxisData[i] = apiResponse.data[i].Key; 
                // this.yAxisData[i] = apiResponse.data[i].Record.count;
            }

            this.xAxisData = currentStandName;
            this.yAxisData = currentStanding;

            this.chartOptionsBar = {
                labels: this.xAxisData,
                
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    //Data to be represented on y-axis
                    data: this.yAxisData
                    }
                ],
            };


            console.log('Label:');
            console.log(this.chartOptionsBar.labels);



            this.$store
                    .dispatch(Constant.ELECTION_BAR, {
                        xAxis: this.xAxisData,
                        yAxis: this.yAxisData
                    })
            },

            


    },
    
    mounted () {
      //renderChart function renders the chart with the datacollection and options object.
      this.getCurrentStanding();
      
      //this.renderChart(this.datacollection, this.options);
       this.renderChart(this.chartOptionsBar, this.options);
      console.log('End:');
      //console.log(this.datacollection.datasets.data);
    }
  }
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
.bar-chart {
  overflow: hidden;
}
</style>