<template>
  <div class="app-container">
    <el-container>
      <el-header height="30">
        <el-button type="default" size="mini" @click="refreshList">刷新</el-button>
        <el-button type="danger" size="mini" @click="batchDelete">批量删除</el-button>
        <router-link :to="{path: '/blog/category/create'}"><el-button type="primary" size="mini">创建</el-button></router-link>
      </el-header>
      <el-main>
        <el-table v-loading="loadingIcon" :data="categoryList" :element-loading-text="loadingText" tooltip-effect="dark" element-loading-spinner="el-icon-loading" border style="width: 100%" size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="id" label="ID" width="50" sortable />
          <el-table-column prop="parent_id" label="Pid" width="50" show-overflow-tooltip />
          <el-table-column prop="name" label="Category Name" width="220" show-overflow-tooltip />
          <el-table-column prop="thumbnail" label="Thumbnail" width="200" />
          <el-table-column prop="description" label="Category Description" show-overflow-tooltip />
          <el-table-column prop="updated_at" label="Update At" width="150" />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="warning" size="mini">
                <router-link :to="{path: '/blog/category/edit/'+scope.row.id}">Edit</router-link>
              </el-button>
              <el-button type="danger" size="mini" @click="deleteCategory(scope.row)">删除</el-button>
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
import { categoryList, categoryDelete, batchDeleteCategory } from '@/api'
export default {
  name: 'CategoryIndex',
  data() {
    return {
      loadingIcon: true,
      loadingText: '数据加载中...',
      categoryList: [],
      multipleSelected: [],
      listTotal: 0,
      listCurrent: 1,
      listPageSelect: [10, 20, 50, 100, 200],
      listPerPage: 10
    }
  },
  created() {
    this.loadingIcon = true
    this.categoryPageList()
  },
  methods: {
    refreshList() {
      this.loadingIcon = true
      this.categoryPageList()
    },
    categoryPageList() {
      const params = { per_page: this.listPerPage, page: this.listCurrent }
      categoryList(params).then(response => {
        this.categoryList = response.data
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
      batchDeleteCategory({ ids: this.multipleSelected }).then(response => {
        this.$message.success('successful')
        this.refreshList()
      }).catch(() => {
        return true
      })
    },
    deleteCategory(row) {
      this.$confirm('Confirm Delete', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        categoryDelete(row.id).then(() => {
          const index = this.categoryList.indexOf(row)
          this.categoryList.splice(index, 1)
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
