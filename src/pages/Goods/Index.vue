<template>
  <el-card>
    <el-button @click="add" type="primary" icon="el-icon-circle-plus-outline"
      >新增</el-button
    >
    <el-divider></el-divider>
    <!-- 列表 -->
    <List :info="info" @sendData="sendData" :params="params"/>
    <!-- 弹窗 -->
    <Model :info="info" ref="model" :params="params"/>
  </el-card>
</template>

<script>
import List from "./List";
import Model from "./Model";
export default {
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true,
      },
      params:{
        page:1,
        size:10
      }
    };
  },
  created() {},
  methods: {
    add() {
      this.info.isShow = true
      this.info.isAdd = true
    },
    sendData(obj){
      this.$refs.model.sendData(obj)
    }
  },
  components: {
    List,
    Model,
  },
};
</script>
<style scoped>
</style>