<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
const lineChartData = {
  articles: {
    expectedData: [100, 120, 161, 134, 105, 160, 165, 100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145, 100, 120, 161, 134, 105, 160, 165]
  },
  tags: {
    expectedData: [200, 192, 120, 144, 160, 130, 140, 100, 120, 161, 134, 105, 160, 165],
    actualData: [180, 160, 151, 106, 145, 150, 130, 100, 120, 161, 134, 105, 160, 165]
  },
  comments: {
    expectedData: [80, 100, 121, 104, 105, 90, 100, 100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 90, 100, 138, 142, 130, 130, 100, 120, 161, 134, 105, 160, 165]
  },
  users: {
    expectedData: [130, 140, 141, 142, 145, 150, 160, 100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 130, 100, 120, 161, 134, 105, 160, 165]
  }
}
export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.articles
    }
  },
  created() {
    console.log(1)
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
