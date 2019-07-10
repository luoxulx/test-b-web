<template>
  <div class="app-container">
    <el-container>
      <el-header height="30">
        <el-button type="default" size="mini" @click="refreshList">刷新</el-button>
      </el-header>
      <el-main>
        <el-table v-loading="loadingIcon" :data="feedbackList" :element-loading-text="loadingText" tooltip-effect="dark" element-loading-spinner="el-icon-loading" border style="width: 100%" size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="id" label="ID" width="50" />
          <el-table-column prop="nickname" label="昵称" show-overflow-tooltip />
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip />
          <el-table-column prop="content" label="内容" show-overflow-tooltip />
          <el-table-column prop="created_at" label="创建时间" width="135" />
          <el-table-column fixed="right" label="操作" width="66">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteOneFeedback(scope.row)">删除</el-button>
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
import { feedbackList, deleteFeedback } from '@/api'
export default {
  name: 'Files',
  data() {
    return {
      loadingIcon: true,
      loadingText: '数据加载中...',
      feedbackList: [],
      multipleSelected: [],
      listTotal: 0,
      listCurrent: 1,
      listPageSelect: [10, 20, 50, 100, 200],
      listPerPage: 20
    }
  },
  created() {
    this.loadingIcon = true
    this.filePageList()
  },
  methods: {
    refreshList() {
      this.loadingIcon = true
      this.filePageList()
    },
    filePageList() {
      const params = { per_page: this.listPerPage, page: this.listCurrent }
      feedbackList(params).then(response => {
        this.loadingIcon = false
        if (response.status === true) {
          this.feedbackList = response.data
          this.listTotal = response.meta.pagination.total
          this.listCurrent = response.meta.pagination.current_page
          this.listPerPage = response.meta.pagination.per_page
        }
      }).catch(() => {
        this.loadingIcon = false
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
    deleteOneFeedback(row) {
      this.$confirm('Confirm Delete This Picture ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFeedback(row.id).then((response) => {
          if (response.status === true) {
            const index = this.feedbackList.indexOf(row)
            this.feedbackList.splice(index, 1)
            this.$message.success('Delete Successful')
          }
        })
      }).catch(() => {
        return true
      })
    },
    handleSelectionChange(val) {
      const tempIds = []
      for (const i in val) {
        tempIds.push(val[i].id)
      }
      this.multipleSelected = tempIds
    }
  }
}
</script>
