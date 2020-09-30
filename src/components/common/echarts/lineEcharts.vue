<template> 
    <div class="echarts-list-box" :id="id"></div>
</template>

<script>
import $echarts from 'echarts'
export default {
    props: ["lineEchartsData","id"],
    data () {
		return {
			myLineChart: null,
		}
    },
    mounted() {
        console.log(this.lineEchartsData)
            this.initEcharts();
    },
    methods: {
        initEcharts() {
            let _option = this.defaultOption();
            console.log(_option)
            if (!this.myLineChart) {
                this.myLineChart = $echarts.init(document.getElementById(this.id));
            }
            this.myLineChart.setOption(_option);
        },
        // dealData() {
        //     let arr = [];
        //     this.lineEchartsData.map(item => {
        //         arr.push(item.count);
        //     });
        //     return arr;
        // },
        defaultOption() {
            let option = {
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: this.lineEchartsData.legend,
                    bottom: 10,
                },
                grid:{
                    left: 60,
                    right: 20,
                    top:20
                },
                xAxis: {
                    type: 'category',
                    data: this.lineEchartsData.category,
                    axisLine: {
                        symbol: ["none", "arrow"],
                        symbolSize: [5, 5]
                    }
                },
                yAxis:  {
                    type: 'value',
                    axisLine: {
                        symbol: ["none", "arrow"],
                        symbolSize: [5, 5]
                    }
                },
                series: this.lineEchartsData.value 
                // {
                //     type: 'line',
                //     smooth: true,
                //     color: '#37ba7b',
                //     lineStyle: {
                //         color: '#37ba7b',
                //         width: 1
                //     },
                //     markLine: {
                //         symbol: 'circle'
                //     },
                //     label: {
                //         normal: {
                //             show: true,
                //             position: 'top'
                //         }
                //     },
                //     areaStyle: {
                //         color: 'rgba(55, 186, 123, .1)'
                //     },
                    
                // }
            };
            return option;
        }
    }
}
</script>
<style lang="less" scoped>
.echarts-list-box{
    width: 100%;
    height:100%;
}
</style>
