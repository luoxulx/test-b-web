<template>
  <div class="app-container">
    <el-container>
      <el-header height="30">
        <el-button type="default" size="mini" @click="refreshList">刷新</el-button>
        <el-button type="danger" size="mini" @click="batchDelete">批量删除</el-button>
        <el-button type="primary" size="mini">
          <router-link :to="{path: '/blog/article/create'}">Create</router-link>
        </el-button>
      </el-header>
      <el-main>
        <el-table v-loading="loadingIcon" :data="articleList" :element-loading-text="loadingText" tooltip-effect="dark" element-loading-spinner="el-icon-loading" border style="width: 100%" size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="id" label="ID" width="50" />
          <el-table-column prop="category_name" label="Category" width="80" show-overflow-tooltip />
          <el-table-column prop="user_name" label="User" width="80" show-overflow-tooltip />
          <el-table-column prop="title" label="Title" width="200" show-overflow-tooltip />
          <el-table-column label="Description" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="点击打开预览" placement="left">
                <p @click="showArticleContent(scope.row)">{{ scope.row.description }}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="is_draft" label="草稿" width="50" />
          <el-table-column prop="updated_at" label="Update At" width="150" />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="warning" size="mini">
                <router-link :to="{path: '/blog/article/edit/'+scope.row.id}">Edit</router-link>
              </el-button>
              <el-button type="danger" size="mini" @click="deleteArticle(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer height="0">
        <el-pagination :total="listTotal" :current-page.sync="listCurrent" :page-sizes="listPageSelect" :page-size.sync="listPerPage" layout="total, sizes, prev, pager, next, jumper" background prev-text="上一页" next-text="下一页" @size-change="clickChangePerPage" @current-change="clickChangeCurrentPage" />
      </el-footer>
    </el-container>
    <!--预览 content-->
    <el-dialog title="预览" :visible.sync="articleContentVisible">
      <div v-html="articleContentValue" />
      <span slot="footer" class="dialog-footer"><el-button type="primary" size="mini" @click="articleContentVisible = false">关 闭</el-button></span>
    </el-dialog>
  </div>
</template>

<script>
import { articleList, articleDelete, batchDeleteArticle, articleDetail } from '@/api'
export default {
  name: 'ArticleIndex',
  data() {
    return {
      loadingIcon: true,
      loadingText: '数据加载中...',
      articleList: [],
      multipleSelected: [],
      listTotal: 0,
      listCurrent: 1,
      listPageSelect: [10, 20, 50, 100, 200],
      listPerPage: 10,
      articleContentVisible: false,
      articleContentValue: ''
    }
  },
  created() {
    this.loadingIcon = true
    this.articlePageList()
  },
  methods: {
    refreshList() {
      this.loadingIcon = true
      this.articlePageList()
    },
    articlePageList() {
      const params = { per_page: this.listPerPage, page: this.listCurrent }
      articleList(params).then(response => {
        if (response.status === true) {
          this.articleList = response.data
          this.listTotal = response.meta.pagination.total
          this.listCurrent = response.meta.pagination.current_page
          this.listPerPage = response.meta.pagination.per_page
        }
        this.loadingIcon = false
      }).catch(error => {
        console.error(error)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelected = []
      for (var i in val) {
        this.multipleSelected.push(val[i].id)
      }
    },
    batchDelete() {
      if (this.multipleSelected.length === 0) {
        this.$message.warning('Please select at least one row. ')
        return false
      }
      batchDeleteArticle({ ids: this.multipleSelected }).then(response => {
        if (response.status === true) {
          this.$message.success('successful')
          this.refreshList()
        }
      }).catch(() => {
        return true
      })
    },
    deleteArticle(row) {
      this.$confirm('Confirm Delete', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleDelete(row.id).then((response) => {
          if (response.status === true) {
            const index = this.articleList.indexOf(row)
            this.articleList.splice(index, 1)
            this.$message.success('Delete Successful')
          }
        })
      }).catch(() => {
        return true
      })
    },
    clickChangePerPage(val) {
      this.listPerPage = val
      this.refreshList()
    },
    clickChangeCurrentPage(val) {
      this.listCurrent = val
      this.refreshList()
    },
    showArticleContent(row) {
      articleDetail(row.id).then(response => {
        this.articleContentVisible = true
        this.articleContentValue = response.data.content
      })
    }
  }
}
</script>
