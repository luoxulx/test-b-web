<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <div class="dashboard-text">Name: {{ name }}</div>
      </el-header>
      <el-main>
        <el-row :gutter="24">
          <el-col :span="24">
            x
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBingPicture } from '@/api'
export default {
  name: 'Dashboard',
  data() {
    return {
      bingPics: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    // this.getBingPictures()
  },
  methods: {
    getBingPictures() {
      const param = {}
      const idxArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      const index = Math.floor(Math.random() * 16)
      param.format = 'js'
      param.n = 8
      param.idx = idxArray[index]
      getBingPicture(param).then(response => {
        const tempList = response.data.images
        for (const i in tempList) {
          const temp = { index: i, url: tempList[i].real_url, copyright: tempList[i].copyright }
          this.bingPics.push(temp)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>
