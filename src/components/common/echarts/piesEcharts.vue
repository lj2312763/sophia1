<template>
	<div class="echarts-list-box" :id="id"></div>
</template>

<script>
import $echarts from 'echarts'
export default {
	props: ['pieEchartsData','id'],
	data () {
		return {
			myChart: null,
		}
	},
    mounted() {
    	this.initEcharts();
	},
	watch:{
		pieEchartsData:{
			handler(newName, oldName) {
				this.initEcharts();
			},
			//immediate: true,
            deep: true //
		},
	},
	methods: {
		// 根据窗口大小重新渲染
		initEcharts() {
			let _option = this.defaultOption();
			if(!this.myChart) {
				this.myChart = $echarts.init(document.getElementById(this.id));
			}
			this.myChart.setOption(_option);
		},
		// 饼图右侧展示前5个数据
		legendData() {
			let arr = [];
			if(this.pieEchartsData){
				this.pieEchartsData.map((x, index) => {
					arr.push(x.name);
				});
			}
			return arr;
		},
		formatter2:(params) => {
			let newParamsName = '';// 最终拼接成的字符串
			let paramsNameNumber = params.length;// 实际标签的个数
			let provideNumber = 18;// 每行能显示的字的个数
			let rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
			/**
			 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
			 */
			// 条件等同于rowNumber>1
			if (paramsNameNumber > provideNumber) {
				/** 循环每一行,p表示行 */
				for (let p = 0; p < rowNumber; p++) {
					let tempStr = '';// 表示每一次截取的字符串
					let start = p * provideNumber;// 开始截取的位置
					let end = start + provideNumber;// 结束截取的位置
					// 此处特殊处理最后一行的索引值
					if (p === rowNumber - 1) {
						// 最后一次不换行
						tempStr = params.substring(start, paramsNameNumber);
					} else {
						// 每一次拼接字符串并换行
						tempStr = params.substring(start, end) + '\n';
					}
					newParamsName += tempStr;// 最终拼成的字符串
				}

			} else {
				// 将旧标签的值赋给新标签
				newParamsName = params;
			}
			//将最终的字符串返回
			return newParamsName
		},
        dealData() {
			let arr = [];
			if(this.pieEchartsData){
				this.pieEchartsData.map(x => {
					arr.push({
						name: x.name,
						value: x.value,
						desc:x.desc
					});
				});
			}
           return arr;
        },
		defaultOption() {
			let option = {
              tooltip: {
					trigger: 'item',
					formatter: function(params) {
						return '<div>'+params.name+': <span style="color: #dc8c00;">'+params.value+'</span></div><div>占比: <span style="color: #dc8c00;">'+params.percent+'%</span></div>'
					}
				},
				grid: {
					right: "0%",
					left:"0%"
				},
				legend: {
					show:true,
					icon: "circle",  
					orient: 'vertical',
					left: "40%",
					top:'middle',
					bottom: 40,
					formatter: (name)=>{
						let data=this.pieEchartsData;
						let total = 0;
						let target;
						let desc;
						for (let i = 0, l = data.length; i < l; i++) {
							total += Number(data[i].value);
							if (data[i].name == name) {
								target = Number(data[i].value);
								desc=data[i].desc;
							}
						}
						let arr = [
							'{a|'+name.split('（')[0]+'}{b|'+((target/total)*100).toFixed(2)+'%}',
							'{c|'+this.formatter2(desc)+'}',
						]
						return arr.join('\n')
					},
					textStyle:{
						width: 200,
						rich:{
							a:{
								fontSize:22,
								padding:[10,10,30,0]
							},
							b:{
								fontSize:18,
								padding:[10,200,35,0],
							},
							c:{	
								width: '100%',
								height:60,
								display:"inline-block",
								fontSize:14,
								lineHeight:20,
								padding:[0,50,0,0],
								color:'#3D4966'
							},
						}
					}
				},
              series: [
                {
                  	type:'pie',
					radius: ['45%', '70%'],
					center: ['20%', '48%'],
                  	avoidLabelOverlap: false,
                  	label: {
						normal: {
							show: false,
							position: 'inside',
							color: '#000',
							formatter:function(data){
								return data.percent > 5 ? data.percent.toFixed(1)+'%' : '';
							},
						},
                    emphasis: {
                      show: false,
                      textStyle: {
                        fontSize: '12'
                      }
                    },
                  },
                  labelLine: {
						normal: {
							show: false
						}
					},
                  data: this.dealData()
                }
              ]
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