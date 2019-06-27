<template>
  <div class="upload-container">
    <el-upload class="image-uploader" :action="uploadUrl" :limit="1" :data="extra" :headers="headers" :show-file-list="false" :on-success="picUploadSuccess" :on-error="picUploadError" :on-progress="picUploadProgress" :before-upload="picBeforeUpload">
      <i class="el-icon-plus" />
      <div class="el-upload__text"><em>点击上传</em></div>
    </el-upload>
    <div v-show="imageUrl.length>1" class="image-preview">
      <div class="image-preview-wrapper">
        <img :src="imageUrl" alt="">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="picClickRemove" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { batchDeletePicture } from '@/api'
export default {
  name: 'PicUpload',
  props: {
    uploadUrl: {
      type: String,
      default: process.env.VUE_APP_BASE_API + 'pic/upload'
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
        dir: 'thumbnail',
        resize: true // 开启压缩,且 width=640
      },
      headers: {
        Authorization: getToken()
      }
    }
  },
  computed: {
    imageUrl() {
      if (this.value == null) {
        return []
      }
      return this.value
    }
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    picClickRemove(file, fileList) {
      console.log(file, fileList)
      batchDeletePicture().then()
      this.emitInput('')
    },
    picUploadSuccess(res, file, fileList) {
      this.emitInput(res.data.url)
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/mixin.scss";
  .upload-container {
    width: 100%;
    position: relative;
    @include clearfix;
    .image-uploader {
      width: 35%;
      float: left;
    }
    .image-preview {
      width: 150px;
      height: auto;
      position: relative;
      border: 1px dashed #d9d9d9;
      .image-preview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 16px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s;
        cursor: pointer;
        text-align: center;
        line-height: 75px;
        .el-icon-delete {
          font-size: 24px;
        }
      }
      &:hover {
        .image-preview-action {
          opacity: 1;
        }
      }
    }
  }
</style>
