<template>
  <div class="app-container">
    <el-container>
      <el-header height="30">
        <el-button type="default" size="mini" @click="refreshList">刷新</el-button>
        <el-button type="danger" size="mini" @click="batchDelete">批量删除</el-button>
        <el-button type="primary" size="mini">
          <router-link :to="{path: '/video/create'}">Create</router-link>
        </el-button>
      </el-header>
      <el-main>
        <el-table v-loading="loadingIcon" :data="videoList" :element-loading-text="loadingText" tooltip-effect="dark" element-loading-spinner="el-icon-loading" border style="width: 100%" size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="id" label="ID" width="50" />
          <el-table-column prop="view_count" label="View" width="60" />
          <el-table-column prop="size" label="Size" width="80" />
          <el-table-column prop="category_name" label="Category" width="120" show-overflow-tooltip />
          <el-table-column prop="user_name" label="User" width="95" show-overflow-tooltip />
          <el-table-column label="Name" width="95">
            <template slot-scope="scope">
              <span @click="playThisVideo(scope.row)">{{ scope.row.original_name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="media_pic" label="Media Poster" show-overflow-tooltip />
          <el-table-column prop="media_url" label="Media" show-overflow-tooltip />
          <el-table-column prop="description" label="Video Description" show-overflow-tooltip />
          <el-table-column prop="updated_at" label="Update At" width="150" />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="warning" size="mini">
                <router-link :to="{path: '/video/edit/'+scope.row.id}">Edit</router-link>
              </el-button>
              <el-button type="danger" size="mini" @click="deleteVideo(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer height="0">
        <el-pagination :total="listTotal" :current-page.sync="listCurrent" :page-sizes="listPageSelect" :page-size.sync="listPerPage" layout="total, sizes, prev, pager, next, jumper" background prev-text="上一页" next-text="下一页" @size-change="clickChangePerPage" @current-change="clickChangeCurrentPage" />
      </el-footer>
    </el-container>

    <el-dialog title="Video" :visible.sync="playVideo">
      <div>
        <video controls autoplay>
          <source :src="videoSrc" type="video/mp4" />
          您的浏览器不支持 video 标签。
        </video>
      </div>
      <span slot="footer" class="dialog-footer"><el-button type="primary" @click="playVideo = false">确 定</el-button></span>
    </el-dialog>
  </div>
</template>

<script>
import { videoList, videoDelete, batchDeleteVideo } from '@/api'
export default {
  name: 'VideoIndex',
  data() {
    return {
      playVideo: false,
      videoSrc: '',
      loadingIcon: true,
      loadingText: '数据加载中...',
      videoList: [],
      multipleSelected: [],
      listTotal: 0,
      listCurrent: 1,
      listPageSelect: [10, 20, 50, 100, 200],
      listPerPage: 10
    }
  },
  created() {
    this.loadingIcon = true
    this.videoPageList()
  },
  methods: {
    refreshList() {
      this.loadingIcon = true
      this.videoPageList()
    },
    videoPageList() {
      const params = { per_page: this.listPerPage, page: this.listCurrent }
      videoList(params).then(response => {
        this.videoList = response.data
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
      batchDeleteVideo({ ids: this.multipleSelected }).then(response => {
        this.$message.success('successful')
        this.refreshList()
      }).catch(() => {
        return true
      })
    },
    deleteVideo(row) {
      this.$confirm('Confirm Delete', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        videoDelete(row.id).then(() => {
          const index = this.videoList.indexOf(row)
          this.videoList.splice(index, 1)
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
    },
    playThisVideo(row) {
      this.playVideo = true
      this.videoSrc = row.media_url
    }
  }
}
</script>
