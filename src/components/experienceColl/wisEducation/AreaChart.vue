<template>
  <div>

    <div>
      <div id="myChart" :style="{ height, width }"></div>
      <p class="title">伦敦金</p>
      <p class="percent1">{{percent1}}.00%</p>
      <p class="percent2">{{percent2}}.00%</p>
      <p class="time">数据更新时间：{{year}}&nbsp;{{time}}</p>
    </div>

  </div>
</template>

<script>
  /**
   * 数据格式，除了time字段，其余字段都会被作为一条线显示处理
   */
  // data = [
  //   { time: '周一', '邮件营销': 120, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
  //   { time: '周二' , '邮件营销':  60 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
  //   { time: '周三', '邮件营销':  2 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
  //   { time: '周四', '邮件营销':  3 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
  //   { time: '周五', '邮件营销': 4 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
  //   { time: '周六', '邮件营销':  5 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
  //   { time: '周日', '邮件营销':  6 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
  // ]
  export default {
    props: {
      height: {
        default: '300px'
      },
      width: {
        default: '500px'
      },
      title: ''
    },
    components: {
    },
    data() {
      return {
        percent1: 30,
        percent2: 70,
        year: "2018-10-20",
        time: "10:05:03"
      };
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine(data = []) {
        data = [
          { time: '周一', '邮件营销': 120, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
          { time: '周二' , '邮件营销':  60 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
          { time: '周三', '邮件营销':  2 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
          { time: '周四', '邮件营销':  3 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
          { time: '周五', '邮件营销': 4 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
          { time: '周六', '邮件营销':  5 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
          { time: '周日', '邮件营销':  6 * 60, '联盟广告': 150, '视频广告': 100, '直接访问': 130, '搜索引擎': 180,},
        ]
        let names = []
        let xAxis = []
        let temp = {}
        if(data.length){
          const key = Object.keys(data[0]).filter(e=>!['id', 'time'].includes(e));
          names = [].concat(key)
          data.forEach((item)=>{
            key.forEach(e=>{
              if(!temp[e]){
                temp[e] = []
              }
              temp[e].push(item[e])
            })
            xAxis.push(item.time)
          })

        }
        const series = []
        Object.keys(temp).forEach((it)=>{
          series.push({
            name: it,
            type: 'line',
            stack: '总量',
            areaStyle: {},
            smooth: true,
            data: temp[it]
          })
        })
        console.log(temp)
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        // 绘制图表
        myChart.setOption({
          title: {
            text: this.title
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: names,
            right: 10,
            top: 30,
            icon: 'roundRect',
            orient: 'vertical'
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: 150,
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: xAxis
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series,
        });
      }
    }
  };
</script>

<style lang="less" scoped>
</style>
