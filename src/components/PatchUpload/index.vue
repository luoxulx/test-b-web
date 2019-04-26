<template>
  <div>
    <div :id="id" class=""></div>
    <div id="thelist" class="uploader-list"></div>
    <div class="btns">
      <div id="picker">选择文件</div>
      <button id="ctlBtn" class="btn btn-default">开始上传</button>
    </div>
  </div>
</template>
<script>
import filePatchUpload from '@/api'
export default {
  name: 'PatchUpload',
  components: {},
  props: {
    id: {
      type: String,
      default: function() {
        return 'patch-upload-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    url: {
      type: String,
      default: ''
    },
    fileLimit: {
      type: Number,
      default: 10
    },
    singleSizeLimit: {
      type: Number,
      default: 204800
    },
    formData: {
      type: Object,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    uploadButtonId: {
      type: String,
      default: ''
    },
    accept: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      uploader: null
    }
  },
  mounted() {},
  methods: {
    initWebuploader() {
      this.uploader = WebUploader.create({
        auto: true,
        swf: '/xxx.swf',
        server: this.url,
        pick: {
          id: this.uploadButtonId,
          multiple: this.multiple,
          label: ''
        },
        accept: this.getAccept(this.accept),
        threads: 3,
        fileNumLimit: this.fileLimit,
        formData: this.formData,
        chunked: true,
        chunkSize: 2048000,
        duplicate: true
      })
      this.uploader.on('uploadProgress', (file, percentage) => {
        this.$emit('progress', file, percentage)
      })
      this.uploader.on('uploadSuccess', (file, response) => {
        this.$emit('success', file, response)
      })
    }
  }
}
</script>
