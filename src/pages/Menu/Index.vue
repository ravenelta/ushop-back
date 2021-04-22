<template>
  <el-card>
    <el-button @click="add" type="primary" icon="el-icon-circle-plus-outline"
      >新增</el-button
    >
    <el-divider></el-divider>
    <!-- 列表 -->
    <List :info="info" @sendData="sendData" />
    <!-- 弹框 -->
    <Model :info="info" ref="model" />
  </el-card>
</template>

<script>
import List from './List'
import Model from './Model'
export default {
  data() {
    return {
        info:{
            // 如果是true 显示 false隐藏
            isShow:false,
            // 如果是true代表添加，false代表编辑
            isAdd:true
        }
    };
  },
  created() {
  },
  computed:{
  },
  methods: {
      add(){
          this.info.isShow = true
          this.info.isAdd = true
      },
      sendData(obj){
        // console.log(obj);
        //调用子组件的model方法
        this.$refs.model.sendData(obj)
      }
  },
  components: {
      List,Model
  },
};
</script>
<style scoped>
</style>