<template>
  <div class="app-container">
    <el-container>
      <el-header height="30">
        <el-button type="default" size="mini" @click="refreshList">刷新</el-button>
        <el-button-group>
          <el-button icon="el-icon-arrow-left" size="mini" @click="getPrevOrNext(prevUrl)">prev</el-button>
          <el-button icon="el-icon-arrow-right" size="mini" @click="getPrevOrNext(nextUrl)">next</el-button>
        </el-button-group>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <el-table v-loading="loadingIcon" :data="logs" :element-loading-text="loadingText" tooltip-effect="dark" element-loading-spinner="el-icon-loading" border style="width: 100%" size="small">
                <el-table-column label="Level" width="85">
                  <template slot-scope="scope">
                    <el-tag type="info">{{ scope.row.level }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="env" label="Env" width="85" />
                <el-table-column prop="time" label="Time" width="135" />
                <el-table-column prop="info" label="Info" />
                <el-table-column fixed="right" label="Exception" width="105">
                  <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="showException(scope.row)">Exception</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>Files</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <ul>
                  <li v-for="logfile in logFiles" :key="logfile" class="text item"><span>{{ logfile }}</span></li>
                </ul>
              </el-card>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>Info</span>
                </div>
                <ul>
                  <li class="text item">Size: {{ size }}</li>
                </ul>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { systemLogList, logPageUrl, logTraceDetail } from '@/api'
export default {
  name: 'Logs',
  data() {
    return {
      loadingIcon: true,
      loadingText: 'loading...',
      logs: [],
      logFiles: [],
      fileName: '',
      end: undefined,
      tailPath: '',
      prevUrl: '',
      nextUrl: '',
      filePath: '',
      size: '',
      levelColors: []
    }
  },
  created() {
    this.loadingIcon = true
    this.getSystemLogList()
  },
  methods: {
    refreshList() {
      this.getSystemLogList()
    },
    getSystemLogList() {
      this.loadingIcon = true
      const file = ''
      const offset = ''

      systemLogList(file, offset).then(response => {
        this.logs = response.data.logs
        this.logFiles = response.data.logFiles
        this.fileName = response.data.fileName
        this.end = response.data.end
        this.tailPath = response.data.tailPath
        this.prevUrl = response.data.prevUrl
        this.nextUrl = response.data.nextUrl
        this.filePath = response.data.filePath
        this.size = response.data.size
        this.levelColors = response.data.levelColors
        this.loadingIcon = false
      })
    },
    getPrevOrNext(uri) {
      logPageUrl(uri).then(response => {
        console.log(response)
      })
    },
    getTraceDetail(uri) {
      logTraceDetail(uri).then(response => {
        console.log(response)
      })
    },
    showException(row) {
      console.log(row)
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    list-style: none;
    margin-bottom: 10px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 85%;
    margin-left: 10px;
  }
  .box-card ul {
    padding: 0;
  }
</style>
