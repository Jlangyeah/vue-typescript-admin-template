<template>
  <div class="body">
    <!-- 待办任务 -->
    <el-table :data="todoList" border fit style="width: 100%" element-loading-text="拼命加载中" :header-cell-style="{background: '#dcdcdc'}">
      <el-table-column :label="$t('table.PRO_NAME')" align="center" prop="PRO_NAME"></el-table-column>
      <el-table-column prop="PRO_NODE_NAME" :label="$t('table.PRO_NODE_NAME')" align="center"></el-table-column>
      <el-table-column prop="LAST_UPDATE_DATE" :label="$t('table.LAST_UPDATE_DATE')" align="center" class-name="" :formatter="formatDate">
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="180">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleProcess(scope.row)">
            {{$t('table.PRO_INSTANCE_ID')}}</el-button> -->
          <div class="processBtn" @click="handleProcess(scope.row)">{{$t('table.PRO_INSTANCE_ID')}}</div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="loadTodoList" :page-sizes="[5, 10, 20, 30]" />

    <!-- 审批日志 -->
    <el-dialog title="日志查询" :visible="ProcessDiaVisible" width="70%" @close="ProcessDiaVisible = false">
      <el-table :data="processList" fit highlight-current-row style="width: 100%" element-loading-text="拼命加载中" :header-cell-style="{background: '#dcdcdc'}">
        <el-table-column :label="$t('table.insOperStatus')" align="center" prop="insOperStatus"></el-table-column>
        <el-table-column prop="insOperUserName" :label="$t('table.insOperUserName')" align="center"></el-table-column>
        <el-table-column prop="insOperTime" :label="$t('table.insOperTime')" align="center" :formatter="formatDate">
        </el-table-column>
        <el-table-column prop="insOperComments" :label="$t('table.insOperComments')" align="center" class-name=""></el-table-column>
      </el-table>
      <div class="confirmBtn">
        <el-button type="primary" @click="ProcessDiaVisible = false">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTodoArticles, getProcessLogs } from '@/api/articles'
import Pagination from '@/components/Pagination/index.vue'
export default {
  components: {
    pagination: Pagination
  },
  created() {
    this.loadTodoList()
  },
  data() {
    return {
      // 待办列表
      todoList: [],
      listLoading: false,
      // 总记录条数
      total: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      // 审批对话框的显示与隐藏
      ProcessDiaVisible: false,
      // 审批列表
      processList: []
    }
  },
  methods: {
    // 加载待办列表
    async loadTodoList() {
      this.listLoading = true
      const { data } = await getTodoArticles()
      console.log(data)
      this.todoList = data.todoList
      this.total = this.todoList.length
    },
    // 监听审批
    async handleProcess() {
      this.ProcessDiaVisible = true
      // console.log(row);
      const { data } = await getProcessLogs(this.listQuery)
      console.log(data)
      this.processList = data.processList
    },
    // 加载审批日志
    // loadProcessLogs(processInstanceId) {},
    // 修改每页显示的多少条数据
    handleSizeChange(newSize) {
      this.pageSize = newSize
    },
    // 修改当前的页数
    handleCurrentChange(newPage) {
      this.pageNum = newPage
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
.processBtn {
  cursor: pointer;
  color: #1890ff;
}
.confirmBtn {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
