<template>
  <div class="app-container">
    <el-container>
      <el-header height="30">
        <el-button type="default" size="mini" @click="refreshList">刷新</el-button>
        <el-button-group>
          <el-button icon="el-icon-arrow-left" size="mini" @click="getPrevOrNext(prevUrl, 'Prev')">prev</el-button>
          <el-button icon="el-icon-arrow-right" size="mini" @click="getPrevOrNext(nextUrl, 'Next')">next</el-button>
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
            <el-collapse accordion style="padding-left: 10px;" @change="handleSystemLogList">
              <el-collapse-item v-for="logfile in logFiles" :key="logfile" :title="logfile" :name="logfile">
                <span>Size: {{ size }}</span>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog title="Trace" :visible.sync="exceptionDialog" width="80%">
      <div style="white-space: pre-line;background: #1a1243;color: #def5e5; padding: 5px;">
        <pre class="line-numbers"><code class="language-json" style="white-space: pre-line">{{ exceptionTrace }}</code></pre>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="exceptionDialog = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="exceptionDialog = false">确 定</el-button>
      </span>
    </el-dialog>
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
      levelColors: [],
      exceptionDialog: false,
      exceptionTrace: ''
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
    getSystemLogList(file, offset) {
      this.loadingIcon = true

      systemLogList(file, offset).then(response => {
        this.loadingIcon = false
        if (response.status === true) {
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
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('server error')
        this.loadingIcon = false
      })
    },
    getPrevOrNext(uri, tag) {
      if (uri === false) {
        this.$message.warning('Already at \'' + tag + '\'first')
      } else {
        this.loadingIcon = true
        logPageUrl(uri).then(response => {
          this.loadingIcon = false
          if (response.status === true) {
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
          }
        }).catch(error => {
          this.$message.error('server error')
          console.log(error)
          this.loadingIcon = false
        })
      }
    },
    getTraceDetail(uri) {
      logTraceDetail(uri).then(response => {
        console.log(response)
      })
    },
    showException(row) {
      this.exceptionDialog = true
      this.exceptionTrace = row.trace
    },
    handleSystemLogList(val) {
      if (val) {
        this.getSystemLogList(val)
      }
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
