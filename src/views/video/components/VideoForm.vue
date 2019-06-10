<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="default" size="mini" @click="refreshPage">刷新</el-button>
        <el-button type="primary" size="mini">
          <router-link :to="{path: '/video/index'}">BackList</router-link>
        </el-button>
      </el-header>
      <el-main>
        <el-form ref="videoFormRef" :model="videoForm" :rules="videoFormRule" size="mini" label-width="170px">
          <el-form-item prop="original_name" label="Name">
            <el-input v-model="videoForm.original_name" required />
          </el-form-item>
          <el-form-item prop="media_pic" label="Media Pic">
            <el-input v-model="videoForm.media_pic" required />
          </el-form-item>
          <el-form-item prop="media_url" label="Media Url">
            <el-input v-model="videoForm.media_url" required />
          </el-form-item>
          <el-form-item prop="description" label="Description">
            <el-input v-model="videoForm.description" type="textarea" rows="4" />
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-button v-loading="submitLoading" @click="submitVideoForm">{{ submitButton }}</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { videoUpdate, videoCreate, videoDetail } from '@/api'
const defaultVideoForm = {
  id: undefined,
  original_name: '',
  media_pic: '',
  media_url: '',
  description: ''
}
export default {
  name: 'VideoForm',
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    submitButton: {
      type: String,
      default: 'Create'
    }
  },
  data() {
    return {
      submitLoading: false,
      submitLoadingText: '数据提交中...',
      videoForm: {},
      videoFormRule: {
        // trigger: 'change'
        media_pic: [{ required: true, trigger: 'blur' }],
        media_url: [{ required: true, trigger: 'blur' }],
        original_name: [{ required: true, trigger: 'blur' }, { max: 225, trigger: 'change' }]
      }
    }
  },
  created() {
    this.videoForm = Object.assign({}, defaultVideoForm)
    if (this.isEdit === true) {
      const id = this.$route.params && this.$route.params.id
      this.fetchVideoData(id)
    }
  },
  methods: {
    submitVideoForm() {
      this.$refs.videoFormRef.validate(valid => {
        if (valid) {
          this.submitLoading = true
          if (this.isEdit === true) {
            videoUpdate(this.videoForm).then(response => {
              this.videoForm = Object.assign({}, defaultVideoForm)
              if (response.sattus === false) {
                return false
              } else {
                this.$message.success('update successful')
                this.$router.push('/video/index')
              }
            }).catch(error => {
              console.error(error)
              return false
            })
          } else {
            videoCreate(this.videoForm).then(response => {
              if (response.sattus === false) {
                return false
              } else {
                this.$message.success('create successful')
                this.$router.push('/video/index')
              }
            })
          }
          this.submitLoading = false
        } else {
          return false
        }
      })
    },
    fetchVideoData(id) {
      videoDetail(id).then(response => {
        this.videoForm = Object.assign(defaultVideoForm, response.data)
      })
    },
    refreshPage() {
      window.location.reload()
    }
  }
}
</script>
