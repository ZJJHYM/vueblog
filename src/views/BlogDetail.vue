<template>
  <div>
    <Header></Header>
    <div class="mblog">
      <h2>{{ blog.title }}</h2>

      <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }"
        ><el-button type="primary" icon="el-icon-edit" v-if="ownBlog"
          >编辑</el-button
        ></router-link
      >

      <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import "github-markdown-css/github-markdown.css";
export default {
  name: "BlogDetail.vue",
  components: {
    Header,
  },
  data() {
    return {
      blog: {
        id: "",
        title: "",
        content: "",
      },
      ownBlog: false
    };
  },
  created() {
    const blogId = this.$route.params.blogId;
    console.log(blogId);
    const _this = this;
    this.$axios.get("/blog/" + blogId).then((res) => {
      const blog = res.data.data;
      _this.blog.id = blog.id;
      _this.blog.title = blog.title;
      // markdown格式渲染
      var MarkdownIt = require("markdown-it");
      var md = new MarkdownIt();
      var result = md.render(blog.content);

      _this.blog.content = result;
      _this.ownBlog = (blog.userId == _this.$store.getters.getUser.id)
    });
  },
};
</script>

<style>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 20px;
}
</style>