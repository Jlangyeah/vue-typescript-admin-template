<template>
  <div class="body">
    <!-- 系统审计 -->
    <div class="filter-container">
      <el-row>
        <el-input placeholder="请输入用户名ID" label="用户"></el-input>
        <el-input placeholder="请输入机构号/机构名称" label="机构"></el-input>
        <el-input placeholder="管控级别" label="管控级别"></el-input>
        <el-select>
          <el-option>

          </el-option>
        </el-select>
        <el-input placeholder="请输入功能模块" label="功能模块"></el-input>
      </el-row>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="RESULT_LIST" border fit highlight-current-row style="width: 100%" element-loading-text="拼命加载中" :header-cell-style="{background: '#dcdcdc'}">
      <el-table-column :label="$t('table.USER_NAME')" align="center" prop="USER_NAME" width="80px"></el-table-column>
      <el-table-column prop="BRANCH_NAME" :label="$t('table.BRANCH_NAME')" align="center"></el-table-column>
      <el-table-column prop="LOG_LEVEL" :label="$t('table.LOG_LEVEL')" align="center" width="80px"></el-table-column>
      <el-table-column prop="FUNC_LEVEL3_NAME" :label="$t('table.FUNC_LEVEL3_NAME')" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="LOG_TYPE" :label="$t('table.LOG_TYPE')" align="center"></el-table-column>
      <el-table-column prop="LOG_DATE" :label="$t('table.LOG_DATE')" align="center" :formatter="formatDate"></el-table-column>
      <el-table-column prop="IP" :label="$t('table.IP')" align="center"></el-table-column>
      <el-table-column prop="LOG_DESCRIPTION" :label="$t('table.LOG_DESCRIPTION')" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="LOG_RESULT" :label="$t('table.LOG_RESULT')" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAudit } from '@/api/articles'
export default {
  created() {
    this.loadSelectData()
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
        // USER_NAME: undefined,
        // BRANCH_NAME: undefined,
      },
      RESULT_LIST: []
    }
  },
  methods: {
    async loadSelectData() {
      const { data } = await getAudit()
      console.log(data)
      this.RESULT_LIST = data.auditList
    },
    // 搜索过滤
    handleFilter() {
      this.listQuery.page = 1
      this.loadTodoList()
    },
    // 替换表格时间格式
    formatDate(row, column) {
      // 获取单元格数据
      const date = row[column.property]
      if (date) {
        return this.transformDate(date)
      } else {
        return ''
      }
    },
    // 标准时间格式转yyyy-MM-dd HH:mm:ss
    transformDate(date) {
      if (date) {
        const dt = new Date(date)
        return (
          dt.getFullYear() +
          '-' +
          (dt.getMonth() + 1 < 10
            ? '0' + (dt.getMonth() + 1)
            : dt.getMonth() + 1) +
          '-' +
          (dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate()) +
          ' ' +
          (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) +
          ':' +
          (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()) +
          ':' +
          (dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds())
        )
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.body {
  padding: 20px;
}
</style>
