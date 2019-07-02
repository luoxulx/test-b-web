<template>
  <div class="upload-container">
    <el-upload class="image-uploader" :action="uploadUrl" :limit="1" :data="extra" list-type="picture-card" :on-success="picUploadSuccess" :on-progress="picUploadProgress" :before-upload="picBeforeUpload" :on-preview="picUploadPreview" :on-remove="picClickRemove">
      <i class="el-icon-plus" />
    </el-upload>
    <el-input v-model="imageUrl" type="text" value="" />
    <el-progress :percentage="uploadPercentage" :text-inside="true" />
    <el-dialog :visible.sync="picDialogVisible">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { deleteQiniuFile, uploadToken, saveFileInfo } from '@/api'
import { parseFileSize } from '@/utils'
export default {
  name: 'PicUpload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cdnHost: 'https://net.lnmpa.top/',
      uploadUrl: '',
      uploadPercentage: 0,
      picDialogVisible: false,
      extra: {
        key: 'thumbnail',
        token: ''
      },
      picPath: {},
      picMime: ''
    }
  },
  computed: {
    imageUrl() {
      if (this.value == null) {
        return ''
      }
      return this.value
    }
  },
  mounted() {
    uploadToken(this.extra).then(res => {
      this.extra.token = res.data.token
      this.extra.key = res.data.key
      this.uploadUrl = res.data.uri
    })
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    picClickRemove(file, fileList) {
      console.log(file, fileList)
      deleteQiniuFile({ key: this.picPath }).then(response => {
        console.log(response)
      })
      this.emitInput('')
    },
    picUploadSuccess(res, file, fileList) {
      const tempData = {
        path: res.key,
        original_name: file.name,
        url: this.cdnHost + res.key + '-pic540',
        size: parseFileSize(file.size),
        mime: this.picMime,
        hash: res.hash
      }

      this.picPath = tempData.path
      this.emitInput(tempData.url)

      saveFileInfo(tempData).then(res2 => {
        console.log(res2)
      })
      // this.picUploadProgress = 100
    },
    picUploadPreview(file) {
      console.log(file)
      this.picDialogVisible = true
    },
    picUploadProgress(event, file, fileList) {
      console.log(event)
      // this.picUploadProgress = Number(event.percent)
    },
    picBeforeUpload(file) {
      // this.picUploadProgress = 10
      this.picMime = file.type || ''
    }
  }
}
</script>

<style>
  .el-upload {
    border: 1px dotted rebeccapurple;
    max-width: 75px;
    max-height: 75px;
    line-height: 75px;
  }
</style>
