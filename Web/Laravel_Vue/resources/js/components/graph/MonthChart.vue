<template>
    <div>
        <chart-header></chart-header>
        <v-container 
        fluid grid-list-lg 
        class="my-1">
        <v-layout 
            justify-center 
            fill-height 
            wrap class="pa-5"
            >
            <v-flex>
            <line-chart
                :width="300"
                :height="100"
                :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                :datasets="displayedDatasets"
                :options="$options.options"
                v-if="loaded"
            ></line-chart>
            </v-flex>
            <v-flex xs12 sm12 md12 xl11 class="center_card">
            <v-layout row wrap justify-center style=" font-family : 'MapoPeacefull';">
                <div class="col-md-12 verify">
                    <form>
                        <fieldset>
                            <input type="checkbox" :value="1" v-model="selectAyo"/>
                            <label>カロリー&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="2" v-model="selectAyo"/>
                            <label>炭水化物&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="3" v-model="selectAyo"/>
                            <label>たんぱく質&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="4" v-model="selectAyo"/>
                            <label>脂肪&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="5" v-model="selectAyo"/>
                            <label>コレステロール&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="6" v-model="selectAyo"/>
                            <label>カリウム&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" :value="7" v-model="selectAyo"/>
                            <label>ナトリウム&nbsp;&nbsp;&nbsp;</label>
                            <!-- <input type="checkbox" :value="8" v-model="selectAyo"/>
                            <label>식이섬유&nbsp;&nbsp;&nbsp;</label> -->
                        </fieldset>
                    </form>
                </div>
            </v-layout>
            </v-flex>
        </v-layout>
        </v-container>
    </div>
</template>

<script>
import LineChart from './LineChart.vue'
import ChartHeader from './ChartHeader.vue'
import axios from 'axios'

const datasets = {
        1: {
            label: 'カロリー(kcal)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)', // blue
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'blue',
            // data: [2000, 2300, 2130, 2220, 1890, 1500, 1800, 1780, 2000, 2300, 1200, 2140],
            data: [0],
            backgroundColor: 'transparent',
        },
        2: {
            label: '炭水化物(g)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)', // red
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'red',
            // data: [530, 440, 220, 190, 300, 200, 140, 800, 210, 540, 670, 400],
            data: [0],
            backgroundColor: 'transparent',
        },
        3: {
            label: 'たんぱく質(g)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)', // orange
            pointBackgroundColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'green',
            // data: [1, 3, 2, 12, 34, 22, 33, 12, 21, 34, 47, 34],
            data: [0],
            backgroundColor: 'transparent',
        },
        4: {
            label: '脂肪(g)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)', // green
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'green',
            // data: [500, 440, 200, 120, 340, 220, 333, 120, 212, 340, 470, 340],
            data: [0],
            backgroundColor: 'transparent',
        },
        5: {
            label: 'コレステロール(mg)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)', // yellow
            pointBackgroundColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'green',
            // data: [500, 440, 200, 120, 340, 220, 333, 120, 212, 340, 470, 340],
            data: [0],
            backgroundColor: 'transparent',
        },
        6: {
            label: 'カリウム(mg)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(108, 63, 61, 1)', // brown
            pointBackgroundColor: 'rgba(108, 63, 61, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'red',
            // data: [530, 440, 220, 190, 300, 200, 140, 800, 210, 540, 670, 400],
            data: [0],
            backgroundColor: 'transparent',
        },
        7: {
            label: 'ナトリウム(mg)',
            // backgroundColor:'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(113, 113, 123, 1)', // grey
            pointBackgroundColor: 'rgba(113, 113, 123, 1)',
            borderWidth: 1,
            // pointedBorderColor: 'red',
            // data: [530, 440, 220, 190, 300, 200, 140, 800, 210, 540, 670, 400],
            data: [0],
            backgroundColor: 'transparent',
        },
        // 8: {
        //     label: '식이섬유(g)',
        //     // backgroundColor:'rgba(255, 0, 0, 0.2)',
        //     borderColor: 'rgba(153, 102, 255, 1)', // purple
        //     pointBackgroundColor: 'rgba(153, 102, 255, 1)',
        //     borderWidth: 1,
        //     // pointedBorderColor: 'green',
        //     // data: [500, 440, 200, 120, 340, 220, 333, 120, 212, 340, 470, 340],
        //     data: [0],
        //     backgroundColor: 'transparent',
        // },

};

export default {
    name: 'month-chart',
    datasets,
    components:{
        ChartHeader,
        LineChart
    },
    data() {
        return {
        // Select both years by default.
        selectAyo: [1],
        loaded: false,
        };
    },
    computed: {
        // The datasets to display.
        displayedDatasets() {
        return this.selectAyo.map(ayo => datasets[ayo]);
        }
    },
    mounted() {
        this.daysData();

    },
    /* created() {
        this.daysData();
    }, */
    methods: {
        daysData() {
            axios.get('/graph_months').then(res=> {
                // console.log(res);
                if (res.data == "False") {
                    window.location.href='/';
                }
                // console.log(res.data.calorie); 
                // console.log('----------');
                // console.log(datasets[1].data);
                // console.log('----------');
                datasets[1].data = res.data.calorie;
                datasets[2].data = res.data.carbohydrate;
                datasets[3].data = res.data.protein;
                datasets[4].data = res.data.fat;
                datasets[5].data = res.data.cholesterol;
                datasets[6].data = res.data.kamium;
                datasets[7].data = res.data.salt;
                // console.log(datasets);
                this.loaded = true
            })
            .catch(err=>console.error(err));
        }
    }
} 

</script>

<style scoped>
@font-face { font-family: 'MapoPeacefull'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff') format('woff'); font-weight: normal; font-style: normal; }

fieldset {
  display: block;
  margin-left: 2px;
  margin-right: 2px;
  padding-top: 0.35em;
  padding-bottom: 0.625em;
  padding-left: 0.75em;
  padding-right: 0.75em;
  border: 2px groove (internal value);
}
</style>

