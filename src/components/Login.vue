<template>
  <div>
    <el-form
      :rules="rules"
      ref="loginFormRef"
      :model="loginForm"
      class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <!--auto-complete="off" 是否补全-->
        <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="normal" type="password" v-model="loginForm.password" auto-complete="off"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox>
      <el-button size="normal" type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123'
      },
      checked: true,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/doLogin', this.$qs.stringify({
          username: this.loginForm.username,
          password: this.loginForm.password
        }))
        // user信息存到sessionStorage  注意吧obj对象转化
        window.sessionStorage.setItem('user', JSON.stringify(res.object))
        // 用replace 不让它返回登录页 push可以返回的 同时判断是不是有redirect字段
        // 有的话表示访问界面时没登陆  登录后给他跳转回去
        const toPath = this.$route.query.redirect
        this.$router.replace((toPath === undefined || toPath === '/') ? '/home' : toPath)
      })
    }
  }
}
</script>

<style>
  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .loginTitle {
    margin: 15px auto 20px auto;
    text-align: center;
    color: #505458;
  }

  .loginRemember {
    text-align: left;
    margin: 0px 0px 15px 0px;
  }
</style>
