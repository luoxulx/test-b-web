<template>
  <div>
    <el-upload :action="uploadUrl" :limit="1" :data="extra" list-type="picture-card" :on-preview="picClickPreview" :on-remove="picClickRemove" :on-success="picUploadSuccess" :on-error="picUploadError" :on-progress="picUploadProgress" :before-upload="picBeforeUpload" :before-remove="picBeforeRemove">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="value" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PicUpload',
  props: {
    uploadUrl: {
      type: String,
      default: process.env.VUE_APP_BASE_API + 'file/upload'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      extra: {
        dir: 'thumbnail'
      }
    }
  },
  methods: {
    picClickPreview(file) {
      this.value = file.url
      this.dialogVisible = true
    },
    picClickRemove(file, fileList) {
      console.log(file, fileList)
    },
    picUploadSuccess(res, file, fileList) {
      this.value = res.data.url
      console.log(res, file, fileList)
    },
    picUploadError(res, file, fileList) {
      console.log(res, file, fileList)
    },
    picUploadProgress(event, file, fileList) {
      console.log(event, file, fileList)
    },
    picBeforeUpload(file) {
      console.log(file)
    },
    picBeforeRemove(file, fileList) {
      console.log(file, fileList)
    }
  }
}
</script>

<style scoped>
  .el-upload {
    width: 85px !important;
    height: auto;
  }
</style>
