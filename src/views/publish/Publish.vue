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
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>

          <!-- 使用封装的对话框组件    v-model双向绑定使用
            <my-image v-model="test"></my-image>测试使用
            选择不同的[封面类型 cover.type] 去显示不同的图片 == 有2种情况的使用：需要判断
          -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
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
      // 声明test,提供将来要传入的数据，默认为空 -- 给组件内部传入空字符数据
      // test: '',

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
  },

  methods: {
    // 改变radio按钮组事件
    changeType () {
      // 让选中的图片都为空
      this.articleForm.cover.images = []
    }
  }
}
</script>

<style lang="less" scoped>
</style>
