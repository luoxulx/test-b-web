<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="default" size="mini" @click="refreshPage">刷新</el-button>
        <el-button type="primary" size="mini">
          <router-link :to="{path: '/blog/link'}">BackList</router-link>
        </el-button>
      </el-header>
      <el-main>
        <el-form ref="linkFormRef" :model="linkForm" :rules="linkFormRule" size="mini" label-width="100px">
          <el-form-item prop="name" label="Link Name">
            <el-input v-model="linkForm.name" required />
          </el-form-item>
          <el-form-item prop="url" label="Link Url">
            <el-input v-model="linkForm.url" required />
          </el-form-item>
          <el-form-item prop="desc" label="Description">
            <el-input v-model="linkForm.desc" type="textarea" rows="3" />
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-button v-loading="submitLoading" @click="submitLinkForm">{{ submitButton }}</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { linkUpdate, linkCreate, linkDetail } from '@/api'
const defaultLinkForm = {
  id: undefined,
  name: '',
  url: '',
  desc: ''
}
export default {
  name: 'LinkForm',
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
      linkForm: {},
      linkFormRule: {
        // trigger: 'change'
        name: [{ required: true, trigger: 'blur' }, { max: 225, trigger: 'change' }],
        url: [{ required: true, trigger: 'blur' }, { max: 225, trigger: 'change' }]
      }
    }
  },
  created() {
    this.linkForm = Object.assign({}, defaultLinkForm)
    if (this.isEdit === true) {
      const id = this.$route.params && this.$route.params.id
      this.fetchLinkData(id)
    }
  },
  methods: {
    submitLinkForm() {
      this.$refs.linkFormRef.validate(valid => {
        if (valid) {
          this.submitLoading = true
          if (this.isEdit === true) {
            linkUpdate(this.linkForm).then(response => {
              this.linkForm = Object.assign({}, defaultLinkForm)
              if (response.sattus === false) {
                return false
              } else {
                this.$message.success('update successful')
                this.$router.push('/blog/link')
              }
            }).catch(error => {
              console.error(error)
              return false
            })
          } else {
            linkCreate(this.linkForm).then(response => {
              if (response.sattus === false) {
                return false
              } else {
                this.$message.success('create successful')
                this.$router.push('/blog/link')
              }
            })
          }
          this.submitLoading = false
        } else {
          return false
        }
      })
    },
    fetchLinkData(id) {
      linkDetail(id).then(response => {
        this.linkForm = Object.assign(defaultLinkForm, response.data)
      })
    },
    refreshPage() {
      window.location.reload()
    }
  }
}
</script>
