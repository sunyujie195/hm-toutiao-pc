<template>
    <!-- 给根标签该类名-供富文本编辑器样式使用 -->
  <div class="publish-container">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <!-- 使用封装的面包屑组件 -->
        <my-bread>发布文章</my-bread>
      </div>

      <!--------------------------- 表单 -->
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>

        <el-form-item label="内容：">
            <!-- 使用富文本编辑器的配置 -->
            <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>

        <el-form-item label="封面：">
          <!-- 单选框组 -->
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 选择封面的图片按钮 -->
          <div class="imgBtn">
              <img src="../../assets/images/default.png" alt="">
          </div>
        </el-form-item>

        <el-form-item label="频道：">
          <!-- 使用频道组件   父传子值 : v-model === :value @input-->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入富文本编辑器的style样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入组件配置对象
import { quillEditor } from 'vue-quill-editor'

export default {
  // 注册配置对象
  components: { quillEditor },

  data () {
    return {
      // 提交给文章表单数据对象
      articleForm: {
        title: '',
        // 文章内容
        content: '',
        // 封面
        cover: {
          type: 1,
          images: ''
        },
        channel_id: null
      },

      // 富文本配置对象
      editorOption: {
        // text占位符对象，目前null
        placeholder: '',
        // 配置对象
        modules: {
          // 工具栏(多个)
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]

        }
      }

    }
  }
}
</script>

<style lang="less" scoped>
.imgBtn{
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    img{
        width: 100%;
        height: 100%;
        // 让后面的三图成块元素独占一行
        display: block;
    }
}
</style>
