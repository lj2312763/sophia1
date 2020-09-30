<template>
	<div class="echarts-list-box" :id="id"></div>
</template>

<script>
import $echarts from 'echarts'
export default {
	props: ["barEchartsData","id"],
	data () {
		return {
			myBarChart: null,
			loaded: false
		}
	},
    mounted() {
        	this.initEcharts();
    },
	methods: {
		initEcharts() {
			let _option = this.defaultOption();
			if(!this.myBarChart) {
				this.myBarChart = $echarts.init(document.getElementById(this.id));
			}
			this.myBarChart.setOption(_option);
		},
		defaultOption() {
			let option = {
				    // dataset: {
				    //     source: this.barEchartsData.value
				    // },
				    grid: {
				    	left: 40,
				    	right: 20,
				    	top: 20,
				    	bottom: 30
				    },
				    tooltip: {
				        trigger: 'axis',
				    },
					color: "#03A971",
				    xAxis: {
						type: "category",
						data: this.barEchartsData.category,
						axisLine: {
							symbol: ["none", "arrow"],
							symbolSize: [5, 5]
						}
				    },
				    yAxis: {
						type: "value",
						axisLine: {
							symbol: ["none", "arrow"],
							symbolSize: [5, 5]
						}
				    },
				    series: {
						type: 'bar',
						data:this.barEchartsData.value,
			            // encode: {
			            //     x: 'count',
			            //     y: 'name'
			            // },
						//barCategoryGap: '50%',
			    		// label: {
			    		// 	show: true,
			    		// 	distance: 10,
			    		// 	position: 'right',
			    		// 	color: '#ccc',
	                    //     letterSpacing: 0
			    		// }
			        }
				}
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

