<template>
  <div class="app-container">
    <el-container>
      <el-header height="30">
        <el-button type="default" size="mini" @click="refreshList">刷新</el-button>
        <el-button type="danger" size="mini" @click="batchDelete">批量删除</el-button>
        <el-button type="primary" size="mini">
          <router-link :to="{path: '/blog/link/create'}">Create</router-link>
        </el-button>
      </el-header>
      <el-main>
        <el-table v-loading="loadingIcon" :data="linkList" :element-loading-text="loadingText" tooltip-effect="dark" element-loading-spinner="el-icon-loading" border style="width: 100%" size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="id" label="ID" width="50" />
          <el-table-column prop="name" label="Link Name" width="125" show-overflow-tooltip />
          <el-table-column prop="url" label="Link Url">
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="Link Description" show-overflow-tooltip />
          <el-table-column prop="updated_at" label="Update At" width="150" />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="warning" size="mini">
                <router-link :to="{path: '/blog/link/edit/'+scope.row.id}">Edit</router-link>
              </el-button>
              <el-button type="danger" size="mini" @click="deleteLink(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { linkList, linkDelete } from '@/api'
export default {
  name: 'LinkIndex',
  data() {
    return {
      loadingIcon: true,
      loadingText: '数据加载中...',
      linkList: [],
      multipleSelected: []
    }
  },
  created() {
    this.loadingIcon = true
    this.linkPageList()
  },
  methods: {
    refreshList() {
      this.loadingIcon = true
      this.linkPageList()
    },
    linkPageList() {
      linkList().then(response => {
        this.linkList = response.data
        this.loadingIcon = false
      }).catch(error => {
        this.loadingIcon = false
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
      this.$message.warning('Forbidden')
    },
    deleteLink(row) {
      this.$confirm('Confirm Delete', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        linkDelete(row.id).then(() => {
          const index = this.linkList.indexOf(row)
          this.linkList.splice(index, 1)
          this.$message.success('Delete Successful')
        })
      }).catch(() => {
        return true
      })
    }
  }
}
</script>
