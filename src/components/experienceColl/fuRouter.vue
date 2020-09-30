<template>
  <div>
    <div v-if="oneId==1">
        <div v-if="routeId=='1.1.1'||routeId=='1.1.2'||routeId=='1.1.3'||routeId=='1.2.1'|| routeId=='1.2.2'">
          <yuyin1 :routeId="detailRouteId"></yuyin1>
        </div>
        <div v-else-if="routeId=='1.1.4' || routeId=='1.2.4'">
          <yuyin2 :routeId="detailRouteId"></yuyin2>
        </div>
    </div>
    <div v-if="oneId==2">
        <div v-if="routeId=='2.1.6'||routeId=='2.1.1'||routeId=='2.3.6'||routeId=='2.3.1'||routeId=='2.2.3'||routeId=='2.4.1'||routeId=='2.4.2'||routeId=='2.5.1'||routeId=='2.5.2'||routeId=='2.5.4'||routeId=='2.5.5'||routeId=='2.5.3'||routeId=='2.6.1'||routeId=='2.6.2'||routeId=='2.6.3'||routeId=='2.6.4'||routeId=='2.7.3'">
          <wenzi1 :routeId="detailRouteId"></wenzi1>
        </div>
        <div v-else-if="routeId=='2.1.3'|| routeId=='2.3.2' || routeId=='2.7.2' || routeId=='2.7.1'">
          <wenzi2 :routeId="detailRouteId"></wenzi2>
        </div>
        <div v-else-if="routeId=='2.1.2'||routeId=='2.1.4'||routeId=='2.1.5'||routeId=='2.1.7'||routeId=='2.1.8'||routeId=='2.1.9'||routeId=='2.2.1'||routeId=='2.2.2'||routeId=='2.2.4'||routeId=='2.2.5'||routeId=='2.2.6'||routeId=='2.2.7'||routeId=='2.2.8'||routeId=='2.2.9'||routeId=='2.2.10'||routeId=='2.2.11'||routeId=='2.2.12'||routeId=='2.2.13'">
          <wenzi3 :routeId="detailRouteId"></wenzi3>
        </div>
        <div v-else-if="routeId=='2.3.3'||routeId=='2.3.4'||routeId=='2.3.5'">
          <wenzi4 :routeId="detailRouteId"></wenzi4>
        </div>
    </div>
    <div v-if="oneId==3">
        <div v-if="routeId=='3.4.10'||routeId=='3.4.11'||routeId=='3.4.12'||routeId=='3.4.9'||routeId=='3.4.1'||routeId=='3.4.2'||routeId=='3.4.3'||routeId=='3.4.4'||routeId=='3.4.5'||routeId=='3.4.6'||routeId=='3.4.7'||routeId=='3.1.1'||routeId=='3.1.2'||routeId=='3.1.3'||routeId=='3.1.4'||routeId=='3.1.5'||routeId=='3.1.6'||routeId=='3.1.7'||routeId=='3.1.8'||routeId=='3.1.9'||routeId=='3.1.10'||routeId=='3.1.11'||routeId=='3.1.12'||routeId=='3.1.13'||routeId=='3.1.14'||routeId=='3.1.15'||routeId=='3.1.16'||routeId=='3.1.17'||routeId=='3.1.18'">
          <tuxiang1 :routeId="detailRouteId"></tuxiang1>
        </div>
         <div v-else-if="twoId =='3.2'">
          <tuxiang1 :routeId="detailRoutetwoId"></tuxiang1>
        </div>
        <div v-else-if="routeId=='3.4.15' || routeId == '3.4.17'">
          <tuxiang2 :routeId="detailRouteId"></tuxiang2>
        </div>
        <div v-else-if="routeId=='3.5'||routeId=='3.5.1'||routeId=='3.5.2'||routeId=='3.5.3'||routeId=='3.5.4'||routeId=='3.5.5'||routeId=='3.5.6'||routeId=='3.4.13'||routeId=='3.4.8'||routeId=='3.4.14'||routeId=='3.4.20'">
          <tuxiang3 :routeId="detailRouteId"></tuxiang3>
        </div>        
    </div>
    <div v-if="oneId==4">
        <div v-if="routeId=='1.1.1'||routeId=='1.1.2'">
          <shipin1 :routeId="detailRouteId"></shipin1>
        </div>
        <div v-else-if="twoId =='4.1' || twoId =='4.2' || twoId =='4.3' || twoId =='4.4'">
          <shipin2 :routeId="detailRouteId" :routeTwoId='detailRoutetwoId'></shipin2>
        </div>
    </div>
    <div v-if="oneId==5">
        <div v-if="routeId=='5.1.12'||routeId=='5.2.7'||routeId=='5.2.6'||routeId=='5.2.5'||routeId=='5.2.4'||routeId=='5.2.3'||routeId=='5.2.2'||routeId=='5.1.2'||routeId=='5.1.3'||routeId=='5.1.5'||routeId=='5.1.9'">
          <yuyan1 :routeId="detailRouteId"></yuyan1>
        </div>
        <div v-else-if="routeId=='5.1.1' || routeId=='5.1.4'||routeId=='5.1.6' || routeId=='5.1.8' ||routeId=='5.1.11' || routeId =='5.2.8' || routeId == '5.2.9' || twoId =='5.3' || routeId == '5.4.1' || routeId == '5.4.2' || routeId == '5.1.13'">
          <yuyan2 :routeId="detailRouteId" :routeTwoId='detailRoutetwoId'></yuyan2>
        </div>
    </div>
    <div v-if="oneId==6">
        <div v-if="routeId=='6.1.3' || routeId=='6.1.11'||routeId=='6.2.1'||routeId=='6.2.3'||routeId=='6.2.9'||routeId=='6.4.3'||routeId=='6.4.6'||routeId=='6.1.10'||routeId=='6.1.1'||routeId=='6.1.2' || routeId=='6.1.4'">
          <renlian1 :routeId="detailRouteId"></renlian1>
        </div>
        <div v-else-if="routeId=='6.1.5'|| routeId=='6.1.6'|| routeId=='6.1.7' || routeId=='6.1.8'|| routeId=='6.1.12'">
          <renlian2 :routeId="detailRouteId"></renlian2>
        </div>
        <div v-else-if="routeId=='6.3.1'||routeId=='6.2.2'||routeId=='6.3.2'||routeId=='6.3.7'||routeId=='6.3.4'||routeId=='6.3.5'||routeId=='6.3.6'||routeId=='6.3.8'">
          <renlian3 :routeId="detailRouteId"></renlian3>
        </div>
        <div v-else-if="routeId=='6.4.1'||routeId=='6.4.4'">
          <renlian4 :routeId="detailRouteId"></renlian4>
        </div>
    </div>
    <div v-if="oneId==9">
       <dashuju1></dashuju1>
    </div>
    <div v-if="oneId==10">
       <robot></robot>
    </div>
  </div>
</template>

<script>
import robot from "./robot/experice" ;
import dashuju1 from "./dashuju/experice1" ;
import dashuju2 from "./dashuju/experice2" ;
import renlian1 from "./renlian/experice1" ;
import renlian2 from "./renlian/experice2" ;
import renlian3 from "./renlian/experice3" ;
import renlian4 from "./renlian/experice4" ;
import shipin1 from "./shipin/experice1" ;
import shipin2 from "./shipin/experice2" ;
import tuxiang1 from "./tuxiang/experice1" ;
import tuxiang2 from "./tuxiang/experice2" ;
import tuxiang3 from "./tuxiang/experice3" ;
import yuyin1 from "./yuyin/experice1" ;
import yuyin2 from "./yuyin/experice2" ;
import yuyan1 from "./ziran/experice1" ;
import yuyan2 from "./ziran/experice2" ;
import wenzi1 from "./wenzi/experice1" ;
import wenzi2 from "./wenzi/experice2" ;
import wenzi3 from "./wenzi/experice3" ;
import wenzi4 from "./wenzi/experice4" ;

export default {
  props:['oneId','twoId','routeId'],
  components:{
        robot,
       dashuju1,
       dashuju2,
       renlian1,
       renlian2,
       renlian3,
       renlian4,
       shipin1,
       shipin2,
       tuxiang1,
       tuxiang2,
       tuxiang3,
       yuyin1,
       yuyin2,
       yuyan1,
       yuyan2,
       wenzi1,
       wenzi2,
       wenzi3,
       wenzi4
  },
  data () {
    return {
      detailRouteId:'',
      detailRoutetwoId:''
    }
  },
  created(){
     this.detailRoutetwoId = this.twoId;
     this.detailRouteId = this.routeId;
  },
  watch:{
      routeId(newVal,oldVal){
       this.detailRouteId = newVal;
      },
      twoId(newVal,oldVal){
        this.detailRoutetwoId = newVal;
      }
    },
}
</script>

