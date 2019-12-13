<template>
  <div class="app-container">
    <el-container>
      <el-header height="30">
        <el-button type="default" size="mini" @click="refreshList">刷新</el-button>
        <el-button type="danger" size="mini" @click="batchDelete">批量删除</el-button>
      </el-header>
      <el-main>
        <el-table v-loading="loadingIcon" :data="commentList" :element-loading-text="loadingText" tooltip-effect="dark" element-loading-spinner="el-icon-loading" border style="width: 100%" size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="id" label="ID" width="50" type="xxx" sortable />
          <el-table-column prop="article_title" label="Article" width="145" show-overflow-tooltip />
          <el-table-column prop="nickname" label="Nickname" width="135" show-overflow-tooltip />
          <el-table-column prop="content" label="Comment Content" show-overflow-tooltip />
          <el-table-column prop="origin" label="Origin" width="200" show-overflow-tooltip />
          <el-table-column prop="user_agent" label="Agent" width="125" show-overflow-tooltip />
          <el-table-column prop="created_at" label="Created At" width="150" sortable />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="success" size="mini">查看回复</el-button>
              <el-button type="warning" size="mini">
                <router-link :to="{path: '/blog/comment/edit/'+scope.row.id}">Edit</router-link>
              </el-button>
              <el-button type="danger" size="mini" @click="deleteComment(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer height="0">
        <el-pagination :total="listTotal" :current-page.sync="listCurrent" :page-sizes="listPageSelect" :page-size.sync="listPerPage" layout="total, sizes, prev, pager, next, jumper" background prev-text="上一页" next-text="下一页" @size-change="clickChangePerPage" @current-change="clickChangeCurrentPage" />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { commentList, commentDelete, batchDeleteComment } from '@/api'
export default {
  name: 'CommentIndex',
  data() {
    return {
      loadingIcon: true,
      loadingText: '数据加载中...',
      commentList: [],
      multipleSelected: [],
      listTotal: 0,
      listCurrent: 1,
      listPageSelect: [10, 20, 50, 100, 200],
      listPerPage: 10
    }
  },
  created() {
    this.loadingIcon = true
    this.commentPageList()
  },
  methods: {
    refreshList() {
      this.loadingIcon = true
      this.commentPageList()
    },
    commentPageList() {
      const params = { per_page: this.listPerPage, page: this.listCurrent }
      commentList(params).then(response => {
        this.commentList = response.data
        this.listTotal = response.meta.pagination.total
        this.listCurrent = response.meta.pagination.current_page
        this.listPerPage = response.meta.pagination.per_page
        this.loadingIcon = false
      }).catch(error => {
        console.error(error)
      })
    },
    handleSelectionChange(val) {
      const tempIds = []
      for (var i in val) {
        tempIds.push(val[i].id)
      }
      this.multipleSelected = tempIds
    },
    batchDelete() {
      if (this.multipleSelected.length === 0) {
        this.$message.warning('Please select at least one row. ')
        return false
      }
      batchDeleteComment({ ids: this.multipleSelected }).then(response => {
        this.$message.success('successful')
        this.refreshList()
      }).catch(() => {
        return true
      })
    },
    deleteComment(row) {
      this.$confirm('Confirm Delete', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commentDelete(row.id).then(() => {
          const index = this.commentList.indexOf(row)
          this.commentList.splice(index, 1)
          this.$message.success('Delete Successful')
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
    }
  }
}
</script>
