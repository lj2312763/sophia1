<template>
	<div class="echarts-list-box" id="echarts-box"></div>
</template>

<script>
import $echarts from 'echarts'
export default {
	data () {
		return {
			myBarChart:null
		}
	},
    mounted() {
        	this.initEcharts();
    },
	methods: {
		initEcharts() {
			let _option = this.defaultOption();
			if(!this.myBarChart) {
				this.myBarChart = $echarts.init(document.getElementById('echarts-box'));
			}
			this.myBarChart.setOption(_option);
		},
		defaultOption() {
			var years = [
				"1999",
				"2000",
				"2001",
				"2002",
				"2003",
				"2004",
				"2005",
				"2006",
				"2007",
				"2008",
				"2009",
				"2010",
				"2011",
				"2012",
				"2013",
				"2014",
				"2015",
				"2016",
				"2017",
				];
			var jdData = [
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
				[
					"hebei","beijing","tianjin","shanxi","neimenggu","jilin","liaoning","guangxi","shandong","shanghai","jiangsu","zhejiang","anhui","jiangx","fujian","guangxi","guangdong","henan","hubewi","hunan","hannan","chongqing","sichuang","guangxi","yunnan","xizang","gansu","qinghai","ningxia","xinjiang","ali"
				],
			]
			var data = [
				[6849,21397,15405,5230,5861,10086,6382,7578,27071,10695,12214,4495,10323,4402,8673,4831.5,5452.5,4933,11415,4444,6293.7,5207,4540,2545,4558,4180,4415,3778.5,4662,4900,6443],
				[7592,24122,17353,5722,6502,11177,7351,8294,30047,11765,13416,4779,11194,4851,9555,5449.7,6293.4,5425,12736,4652,6797.8,5616,4956,2759,4770,4572,4968,4129.4,5087,5376,7372],
				[8251,26998,19141,6226,7216,12015,7893,8900,32333,12882,14713,5313,11892,5221,10465,5959.1,6867,6120,13852,5058,7314.6,6219,5376,3000,5015,5324,5506,4385.6,5735,6039,7945],
				[8960,30840,21387,7082,8162,13000,8714,9541,35445,14396,16978,5736,12938,5829,11645,6487,7436.6,6734,15365,5558,8040.8,7052,5890,3257,5366,6117,6145,4768.1,6426,6647,8457],
				[10251,34892,25544,8641,10039,14270,9854,10638,40130,16830,20444,6375,14333,6624,13661,7375.9,8378,7589,17798,6169,8849,8091,6623,3701,5870,6893,7028,5429.4,7277,7734,9828],
				[12487,41099,30575,10741,12767,15835,11537,12449,46755,20223,24352,7681,16469,8097,16925,9200.6,9897.6,9165,20876,7461,10067.4,9624,7895,4317,7012,8103,8587,6566.1,8606,9199,1133],
				[14782,45444,35783,12495,16331,18983,13348,14434,52060,24560,27703,8670,18646,9440,20096,11346.5,11431,10426,24438,8788,10997.9,10982,9060,5052,7835,9114,10161,7476.5,10045,10239,1310],
				[16752,50407,41022,14011,20264,21788,15720,16228,57695,28814,31874,10026,21385,10798,23794,13172,13296,11950,28284,10296,12403,12316,10546,5759,8970,10430,12138,8757,11724,11847,1500],
				[19877,58204,46122,16945,25393,25729,19383,18478,66367,33928,37411,12045,25908,12633,27807,16012,16206,14492,33151,12555,14555,14660,12893,6915,10540,12109,14607,10346,14257,14649,1695],
				[22986,64491,58656,21506,34869,31739,23521,21740,66932,40014,41405,14448,29755,15900,32936,19181,19858,18147,37638,14652,17691,20490,15495,9855,12570,13588,19700,12421,18421,19609,1979],
				[24581,66940,62574,21522,39735,35149,26595,22447,69165,44253,43842,16408,33437,17335,35894,20597,22677,20428,39436,16045,19254,22920,17339,10971,13539,15008,21947,13269,19454,21777,1994],
				[28668,73856,72994,26283,47347,42355,31599,27076,76074,52840,51711,20888,40025,21253,41106,24446,27906,24719,44736,20219,23831,27596,21182,13119,15752,17027,27133,16113,24115,26860,2503],
				[33969,81658,85213,31357,57974,50760,38460,32819,82560,62290,59249,25659,47377,26150,47335,28661,34197,29880,50807,25326,28898,34500,26133,16413,19265,20077,33464,19595,29522,33043,3008],
				[36584,87475,93173,33628,63886,56649,43415,35711,85373,68347,63374,28792,52763,28800,51768,31499,38572,33480,54095,27952,32377,38914,29608,19710,22195,22936,38564,21978,33181,36394,3379],
				[38909,94648,100105,34984,67836,61996,47428,37697,90993,75354,68805,32001,58145,31930,56885,34211,42826,36943,58833,30741,35663,43223,32617,23151,25322,26326,43117,24539,36875,39613,3755],
				[39984,99995,105231,35070,71046,65201,50160,39226,97370,81874,73002,34425,63472,34674,60879,37072,47145,40271,63469,33090,38924,47850,35128,26437,27264,29252,46929,26433,39671,41834,4064],
				[40255,106497,107960,34919,71101,65354,51086,39462,103796,87995,77644,35997,67966,36724,64168,39123,50654,42754,67503,35190,40818,52321,36775,29847,28806,31999,47626,26165,41252,43805,4003],
				[43062,118198,115053,35532,72064,50791,53868,40432,116562,96887,84916,39561,74707,40400,68733,42575,55665,46382,74016,38027,44347,58502,40003,33246,31093,35184,51015,27643,43531,47194,4056],
				[45387,128994,118944,42060,63764,53527,54838,41916,126634,107150,92057,43401,82677,43424,72807,46674,60199,49558,80932,38102,48430,63442,44651,37956,34221,39267,57266,28497,44047,50765,4494],
			];

			var option = {
				baseOption: {
					timeline: {
						data: years,
						axisType: 'category',
						autoPlay: true,
						playInterval: 850,
						left: '10%',
						right: '10%',
						bottom: '0%',
						width: '80%',
						//  height: null,
						label: {
							normal: {
								textStyle: {
									color: '#ff8800',
								}
							},
							emphasis: {
								textStyle: {
									color: '#fff'
								}
							}
						},
						symbolSize: 10,
						lineStyle: {
							color: '#555'
						},
						checkpointStyle: {
							borderColor: '#777',
							borderWidth: 2
						},
						controlStyle: {
							showNextBtn: true,
							showPrevBtn: true,
							normal: {
								color: '#ff8800',
								borderColor: '#ff8800'
							},
							emphasis: {
								color: '#aaa',
								borderColor: '#aaa'
							}
						},

					},
					title: {
						text: '',
						right: '15%',
						bottom: '25%',
						textStyle: {
							fontSize: 50,
							color: '#666'
						}
					},
					tooltip: {
						'trigger': 'axis'
					},
					calculable: true,
					grid: {
						left: '2%',
						right: '2%',
						bottom: '6%',
						top: '0%',
						containLabel: true
					},
					label: {
						normal: {
							textStyle: {
								color: '#fff'
							}
						}
					},
					yAxis: [{
						// offset: '15',
						'type': 'category',
						data: '',
						nameTextStyle: {
							color: '#fff'
						},
						axisLabel: {
							//rotate:45,
							textStyle: {
								fontSize: 12,
								color: '#333',
							},
							interval: 0
						},
						axisLine: {
							lineStyle: {
								color: '#333'
							},
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: '#333'
							}
						},

					}],
					xAxis: [{
						'type': 'value',
						'name': '',

						splitNumber: 8,
						nameTextStyle: {
							color: '#333'
						},
						axisLine: {
							lineStyle: {
								color: '#333'
							}
						},
						axisLabel: {
							formatter: '{value} '
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: '#ccc'
							}
						},
					}],
					series: [{
						'name': '',
						'type': 'bar',
						markLine: {
							label: {
								normal: {
									show: false
								}
							},
							lineStyle: {
								normal: {
									color: 'red',
									width: 3
								}
							},
						},
						barWidth: '50%',
						label: {
							normal: {
								show: true,
								position: 'right',
								formatter:(params)=>{
									return params.value
									// return this.increase(params.value,(val)=>{
									// 		return params.value
									// 	})
									
								}
							}
						},
						itemStyle: {
							normal: {
								color: function(params) {
									var colorList = [
										'#74CBED;', '#F8D2CE', '#E96C5C', '#FCECBD',
										'#F6C02C', ' #D0D6E0', '#657798', '#D0F4E5',
										'#65DAAB', '#D0DFFD', '#6395F9', '#FFE2EF',
										'#FF9EC6', '#BFE0DF', '#309999', '#FEE2CA',
										'#FF9D50', '#E0D1EB', '#9967BD', '#D6EFF9',
										'#74CBED', '#F8D2CE', '#E96C5C', '#FCECBD',
										'#F6C02C', '#D0D6E0', '#657798', '#D0F4E5',
										'#65DAAB', '#D0DFFD', '#6395F9', 
									];
									return colorList[params.dataIndex]
								},

							}
						},
					}],
					animationDurationUpdate: 800,
					animationEasingUpdate: 'quinticInOut'
				},
				options: []
			};
			for (var n = 0; n < years.length; n++) {
				var res = [];
				for (var j = 0; j < data[n].length; j++) {
					res.push({
						name: jdData[n][j],
						value: data[n][j]
					});

				}

				res.sort(function(a, b) {
					return b.value - a.value;
				}).slice(0, 6);

				res.sort(function(a, b) {
					return a.value - b.value;
				});
				var res1 = [];
				var res2 = [];
				//console.log(res);
				for (var t = 0; t < res.length; t++) {
					res1[t] = res[t].name;
					res2[t] = res[t].value;
				}
				// console.log(res1);
				// console.log("----------------");
				// console.log(jdData[n]);
				option.options.push({
					title: {
						text: years[n] + '年'
					},
					yAxis: {
						data: res1,
					},
					series: [{
						data: res2
					}]
				});
			}
			return option;
		},
		increase(val,callback){
			var time = 1000, //总时间--毫秒为单位  
	          finalNum = val, //要显示的真实数值  
	          regulator =  45, //调速器，调节数字改变的速度  
	          step = finalNum / (time / regulator),/*每30ms增加的数值--*/  
	          count = 0;//计数器  
		      var timer = setInterval(()=>{  
		          count = count + Math.floor(step);  
		          if(count >= finalNum) {  
		             clearInterval(timer);  
		             count = finalNum;  
		          }  
		//           var t = Math.floor(count);
					// params.value=count; 
					callback(count);
		      }, 30);  
}
	}
}
</script>
<style lang="less" scoped>
.echarts-list-box{
    width: 1200px;
	height:600px;
	margin:auto;
	margin-top:80px;
	margin-bottom: 30px;
}
</style>

