<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
    :close-on-click-modal="false"
    :fullscreen="true"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item label="一级分类" label-width="80px" prop="first_cateid">
            <el-select
              v-model="form.first_cateid"
              placeholder="请选择一级分类"
              @change="cateChange"
            >
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="二级分类"
            label-width="80px"
            prop="second_cateid"
          >
            <el-select
              v-model="form.second_cateid"
              placeholder="请选择二级分类"
            >
              <el-option
                v-for="item in secondCateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" label-width="80px" prop="goodsname">
            <el-input v-model="form.goodsname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" label-width="80px" prop="img">
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
          <el-form-item label="零售价格" label-width="80px" prop="price">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="市场价格" label-width="80px" prop="market_price">
            <el-input v-model="form.market_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品规格" label-width="80px" prop="specsid">
            <el-select
              v-model="form.specsid"
              placeholder="请选择商品规格"
              @change="specsChange"
            >
              <el-option
                v-for="item in specsList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性" label-width="80px" prop="specsattr">
            <el-select
              v-model="form.specsattr"
              placeholder="请选择规格属性值"
              multiple
            >
              <el-option
                v-for="(item, index) in secondSpecsList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否新品" label-width="80px" prop="isnew">
            <el-tooltip
              :content="form.isnew == 1 ? '是' : '否'"
              placement="top"
            >
              <el-switch
                v-model="form.isnew"
                :active-value="1"
                :inactive-value="2"
              >
              </el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="是否热卖" label-width="80px" prop="ishot">
            <el-radio-group v-model="form.ishot">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" label-width="80px" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="second">
        <vueWangeditor
          id="editor"
          ref="editor"
          style="width: 100%; margin-bottom: 50px"
        />
      </el-tab-pane>
    </el-tabs>

    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { addGoods, editGoods } from "../../request/goods";
import vueWangeditor from "vue-wangeditor";
export default {
  props: ["info", "params"],
  data() {
    return {
      activeName: "first",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      secondCateList: [],
      secondSpecsList: [],
      imageUrl: "",
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入零售价", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
        isnew: [{ required: true, message: "请选择是否新品", trigger: "blur" }],
        ishot: [{ required: true, message: "请选择是否热卖", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({
      cateList: (state) => state.cate.cateList,
      specsList: (state) => state.specs.specsList,
    }),
  },
  created() {
    this.getCateListAction();
    this.getSpecsListAction();
  },
  methods: {
    ...mapActions("cate", ["getCateListAction"]),
    ...mapActions("specs", ["getSpecsListAction"]),
    ...mapActions("goods", ["getGoodsListAction"]),
    reset() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imageUrl = "";
      this.$refs.editor.setHtml("");
    },
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.form.description = this.$refs.editor.getHtml();
          this.form.specsattr = this.form.specsattr.join(",");
          let fd = new FormData();
          for (let k in this.form) {
            fd.append(k, this.form[k]);
          }
          if (this.info.isAdd) {
            addGoods(fd).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getGoodsListAction(this.params);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editGoods(fd).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getGoodsListAction(this.params);
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
    cateChange() {
      // 根据一级分类id获取index下标
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      // 根据下标获取数组中对应的数据，获取二级分类children
      this.secondCateList = this.cateList[index].children;
      this.form.second_cateid = "";
    },
    change(res, file) {
      this.imageUrl = URL.createObjectURL(res.raw);
      this.form.img = res.raw;
    },
    specsChange() {
      let index = this.specsList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.secondSpecsList = this.specsList[index].attrs;
      this.form.specsattr = "";
    },
    sendData(obj) {
      this.activeName = "first";
      this.form = { ...obj };
      //   this.$delete 删除对象中的属性
      this.$delete(this.form, "firstcatename");
      this.$delete(this.form, "secondcatename");
      this.imageUrl = this.$imgBaseUrl + this.form.img;
      let index1 = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateList = this.cateList[index1].children;
      this.form.specsattr = this.form.specsattr.split(",");
      let index2 = this.specsList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.secondSpecsList = this.specsList[index2].attrs;

      //   延迟执行
      setTimeout(() => {
        this.$refs.editor.setHtml(this.form.description);
      }, 500);
    },
  },
  components: {
    vueWangeditor,
  },
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