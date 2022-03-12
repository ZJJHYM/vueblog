<template>
  <div>
    <Header></Header>
    <div class="m-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class=""
      >
        <el-form-item label="股票代码" prop="stock">
          <el-input v-model="ruleForm.stock"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="markdown-body" v-html="final_res"></div>
    </div>
  </div>
</template>



<script>
import Header from "../components/Header";
import "github-markdown-css/github-markdown.css";
export default {
  name: "Stock.vue",
  components: {
    Header,
  },
  data() {
    return {
      final_res: "# ddd",
      ruleForm: {
        id: "",
        stock: "",
      },
      rules: {
        stock: [
          { required: true, message: "请输入股票代码", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          _this.final_res = "稍等一下，马上就来。。。";
          _this.$axios
            .post("http://localhost:8082/stock", this.ruleForm)
            .then((res) => {
              // console.log("进来了");
              // console.log(res)
              _this.final_res = res.data.replace(/\n/g, '<br>');
              // console.log(_this.final_res);
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
  created() {
    const _this = this;
    var MarkdownIt = require("markdown-it");
    var md = new MarkdownIt();
    var result = md.render(_this.final_res);
    _this.final_res = result;
  },
};
</script>

<style>
.m-content {
  max-width: 960px;
  text-align: center;
  margin: 0 auto;
}
</style>