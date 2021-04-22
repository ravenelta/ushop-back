<template>
  <el-table
    :data="cateList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    default-expand-all
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="ID" width="180"> </el-table-column>
    <el-table-column prop="img" label="分类图片">
      <template slot-scope="scope">
        <img class="img" :src="$imgBaseUrl+scope.row.img" alt="">
      </template>
    </el-table-column>
    <el-table-column prop="catename" label="分类名称"> </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
        <el-tag type="warning" v-else>禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="abc">
        <el-button @click="edit(abc.row)" type="primary" size="small"><i class="el-icon-edit"></i></el-button>
        <el-button @click="del(abc.row.id)" type="danger" size="small"><i class="el-icon-delete"></i></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { delCate } from "../../request/cate";
export default {
  props:['info'],
  data() {
    return {};
  },
  created() {
    this.getCateListAction();
  },
  computed: {
    ...mapState({ cateList: (state) => state.cate.cateList }),
  },
  methods: {
    ...mapActions("cate", ["getCateListAction"]),
    edit(val) {
      this.info.isShow = true;
      this.info.isAdd = false;
      // 传递给父组件
      this.$emit('sendData',val)
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除
          delCate(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
            //   刷新列表
            this.getCateListAction();
            } else {
                this.$message({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  components: {},
};
</script>
<style scoped>
.img {
  width: 100px;
}
</style>