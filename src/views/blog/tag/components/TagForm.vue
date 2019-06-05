<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="default" size="mini" @click="refreshPage">刷新</el-button>
        <el-button type="primary" size="mini">
          <router-link :to="{path: '/blog/tag'}">BackList</router-link>
        </el-button>
      </el-header>
      <el-main>
        <el-form ref="tagFormRef" :model="tagForm" :rules="tagFormRule" size="mini" label-width="100px">
          <el-form-item prop="name" label="Tag Name">
            <el-input v-model="tagForm.name" required />
          </el-form-item>
          <el-form-item prop="color" label="Tag Color">
            <el-color-picker v-model="tagForm.color" />
          </el-form-item>
          <el-form-item prop="style" label="Tag Style">
            <el-input v-model="tagForm.style" required />
          </el-form-item>
          <el-form-item prop="description" label="Description">
            <el-input v-model="tagForm.description" type="textarea" rows="3" />
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-button v-loading="submitLoading" @click="submitTagForm">{{ submitButton }}</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { tagUpdate, tagCreate, tagDetail } from '@/api'
const defaultTagForm = {
  id: undefined,
  name: '',
  color: '#6006D5',
  style: '',
  description: ''
}
export default {
  name: 'TagForm',
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
      tagForm: {},
      tagFormRule: {
        // trigger: 'change'
        name: [{ required: true, trigger: 'blur' }, { max: 225, trigger: 'change' }]
      }
    }
  },
  created() {
    this.tagForm = Object.assign({}, defaultTagForm)
    if (this.isEdit === true) {
      const id = this.$route.params && this.$route.params.id
      this.fetchTagData(id)
    }
  },
  methods: {
    submitTagForm() {
      this.$refs.tagFormRef.validate(valid => {
        if (valid) {
          this.submitLoading = true
          if (this.isEdit === true) {
            tagUpdate(this.tagForm).then(response => {
              this.tagForm = Object.assign({}, defaultTagForm)
              if (response.sattus === false) {
                return false
              } else {
                this.$message.success('update successful')
                this.$router.push('/blog/tag')
              }
            }).catch(error => {
              console.error(error)
              return false
            })
          } else {
            tagCreate(this.tagForm).then(response => {
              if (response.sattus === false) {
                return false
              } else {
                this.$message.success('create successful')
                this.$router.push('/blog/tag')
              }
            })
          }
          this.submitLoading = false
        } else {
          return false
        }
      })
    },
    fetchTagData(id) {
      tagDetail(id).then(response => {
        this.tagForm = Object.assign(defaultTagForm, response.data)
      })
    },
    refreshPage() {
      window.location.reload()
    }
  }
}
</script>
