<template>
  <div class="login-container">
    <div class="login-box">
      <h3>小U商城后台管理系统</h3>
      <el-form
        :model="loginInfo"
        :rules="rules"
        ref="formRef"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input type="text" v-model="loginInfo.username" autocomplete="off">
            <template slot="prepend"
              ><i class="el-icon-user-solid"></i
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginInfo.password"
            autocomplete="off"
            show-password
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入方法
import { userLogin } from "../request/user";
export default {
  data() {
    return {
      // 登录请求体对象
      loginInfo: {
        username: "admin",
        password: "admin888",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          userLogin(this.loginInfo).then((res) => {
            if (res.code === 200) {
              //  1.弹出成功提示
              this.$message({
                message: res.msg,
                type: "success",
              });
              //  2.存储localStorage
              localStorage.setItem("userInfo", JSON.stringify(res.list));
              //  3.跳转到布局页面
              this.$router.push("/");
            } else {
              //  1.弹出失败提示
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  components: {},
};
</script>
<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/img/skyback.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 20px;
}
.login-box h3 {
  color: #409eff;
  text-align: center;
  margin: 35px 0;
}
.btn {
  width: 100%;
}
</style>