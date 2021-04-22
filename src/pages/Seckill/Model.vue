<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="上级" label-width="80px" prop="pid">
        <el-select v-model="form.pid" placeholder="请选择上级菜单">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" label-width="80px" prop="catename">
        <el-input v-model="form.catename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类图片" label-width="80px" prop="img" v-show="form.pid!=0">
        <el-upload
          class="avatar-uploader"
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="change"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="地址"
        label-width="80px"
        prop="url"
        v-show="form.type == 2"
      >
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" label-width="80px" v-show="form.type == 1">
        <el-input v-model="form.icon" autocomplete="off"></el-input>
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
import { addCate, editCate } from "../../request/cate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      rules: {
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
        catename: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      imageUrl: "",
    };
  },
  computed: {
    ...mapState({ cateList: (state) => state.cate.cateList }),
  },
  created() {},
  methods: {
    ...mapActions("cate", ["getCateListAction"]),
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          let fd = new FormData();
          for (let k in this.form) {
            fd.append(k, this.form[k]);
          }
          if (this.info.isAdd) {
            addCate(fd).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getCateListAction();
              }
            });
          } else {
            editCate(fd).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getCateListAction();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imageUrl = ''
    },
    sendData(obj) {
      this.form = { ...obj };
      this.imageUrl = this.$imgBaseUrl + this.form.img
    },
    //
    change(res, file) {
      // console.log(res)
      // console.log(file)
      // URL.createObjectURL 把文件对象转换为可显示的地址
      this.imageUrl = URL.createObjectURL(res.raw);
      this.form.img = res.raw;
    },
  },
  components: {},
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #409eff;
  border-radius: 10px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>