<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="default" size="mini" @click="refreshPage">刷新</el-button>
        <el-button type="primary" size="mini">
          <router-link :to="{path: '/blog/category'}">BackList</router-link>
        </el-button>
      </el-header>
      <el-main>
        <el-form ref="categoryFormRef" :model="categoryForm" :rules="categoryFormRule" size="mini" label-width="170px">
          <el-form-item prop="name" label="Category Name">
            <el-input v-model="categoryForm.name" required />
          </el-form-item>
          <el-form-item prop="thumbnail" label="Category thumbnail">
            <el-input v-model="categoryForm.thumbnail" />
          </el-form-item>
          <el-form-item prop="description" label="Description">
            <el-input v-model="categoryForm.description" type="textarea" rows="4" />
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-button v-loading="submitLoading" @click="submitCategoryForm">{{ submitButton }}</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { categoryUpdate, categoryCreate, categoryDetail } from '@/api'
const defaultCategoryForm = {
  id: undefined,
  parent_id: 0,
  name: '',
  thumbnail: '',
  description: ''
}
export default {
  name: 'CategoryForm',
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
      categoryForm: {},
      categoryFormRule: {
        // trigger: 'change'
        parent_id: [{ required: true, trigger: 'blur' }],
        name: [{ required: true, trigger: 'blur' }, { max: 225, trigger: 'change' }]
      }
    }
  },
  created() {
    this.categoryForm = Object.assign({}, defaultCategoryForm)
    if (this.isEdit === true) {
      const id = this.$route.params && this.$route.params.id
      this.fetchCategoryData(id)
    }
  },
  methods: {
    submitCategoryForm() {
      this.$refs.categoryFormRef.validate(valid => {
        if (valid) {
          this.submitLoading = true
          if (this.isEdit === true) {
            categoryUpdate(this.categoryForm).then(response => {
              this.categoryForm = Object.assign({}, defaultCategoryForm)
              if (response.sattus === false) {
                return false
              } else {
                this.$message.success('update successful')
                this.$router.push('/blog/category')
              }
            }).catch(error => {
              console.error(error)
              return false
            })
          } else {
            categoryCreate(this.categoryForm).then(response => {
              if (response.sattus === false) {
                return false
              } else {
                this.$message.success('create successful')
                this.$router.push('/blog/category')
              }
            })
          }
          this.submitLoading = false
        } else {
          return false
        }
      })
    },
    fetchCategoryData(id) {
      categoryDetail(id).then(response => {
        this.categoryForm = Object.assign(defaultCategoryForm, response.data)
      })
    },
    refreshPage() {
      window.location.reload()
    }
  }
}
</script>
