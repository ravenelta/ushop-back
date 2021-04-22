<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="规格名称" label-width="80px" prop="specsname">
        <el-input v-model="form.specsname" autocomplete="off" placeholder="请输入属性名"></el-input>
      </el-form-item>
      <el-form-item label="规格属性" label-width="80px">
        <div class="box" v-for="(item, index) in list" :key="index">
          <el-input v-model="list[index]" autocomplete="off" placeholder="请输入属性值"></el-input>
          <el-button
            type="success"
            class="btn"
            v-if="index == 0"
            @click="increase(index)"
            >添加</el-button
          >
          <el-button type="danger" class="btn" v-else @click="decrease(index)"
            >删除</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="状态" label-width="80px" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { addSpecs, editSpecs } from "../../request/specs";
export default {
  props: ["info", "params"],
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入属性名", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      list:['']
    };
  },
  computed: {  },
  created() {  },
  methods: {
    ...mapActions("specs", ["getSpecsListAction"]),
    reset() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.list=['']
    },
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //单独处理
          this.form.attrs = this.list.join(',')
          if (this.info.isAdd) {
            addSpecs(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getSpecsListAction(this.params);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editSpecs(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getSpecsListAction(this.params);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    sendData(obj) {
      this.form = JSON.parse(JSON.stringify(obj))
      // this.form = { ...obj }; //浅拷贝不能获取数据就要使用深拷贝
      this.list = this.form.attrs
},
    increase(index){
      this.list.push('')
    },
    decrease(index){
      this.list.splice(index,1)
    }
  },
  components: {},
};
</script>
<style scoped>
.box{
  display: flex;
  margin-bottom: 10px;
}
.box .btn{
  margin-left: 10px;
}
</style>