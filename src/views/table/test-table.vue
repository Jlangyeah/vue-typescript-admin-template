<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.CRM_TYPE" :placeholder="$t('table.CRM_TYPE')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.CCY_CODE" :placeholder="$t('table.CCY_CODE')" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in CCY_CODE" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.CRM_ST_RATING" :placeholder="$t('table.CRM_ST_RATING')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in CRM_ST_RATING" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate()">
        {{ $t('table.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>
    </div>
    <el-table :data="list" fit highlight-current-row style="width: 100%">
      <el-table-column :label="$t('table.id')" align="center" width="95" prop="id" sortable="custom"></el-table-column>
      <el-table-column prop="CRM_CODE" :label="$t('table.CRM_CODE')" align="center" width="95"></el-table-column>
      <el-table-column prop="CRM_TYPE" :label="$t('table.CRM_TYPE')" align="center" class-name="" width="110"></el-table-column>
      <el-table-column prop="CCY_CODE" :label="$t('table.CCY_CODE')" align="center"></el-table-column>
      <el-table-column prop="CRM_VALUE_ORI" :label="$t('table.CRM_VALUE_ORI')" align="center" width="120"></el-table-column>
      <el-table-column prop="CRM_CP_TYPE" :label="$t('table.CRM_CP_TYPE')" align="center" width="120"></el-table-column>
      <el-table-column prop="CRM_CPC" :label="$t('table.CRM_CPC')" align="center" width="180"></el-table-column>
      <el-table-column prop="CRM_ST_RATING" :label="$t('table.CRM_ST_RATING')" align="center" width="110"></el-table-column>
      <el-table-column prop="CRM_LT_RATING" :label="$t('table.CRM_LT_RATING')" align="center" width="110"></el-table-column>
      <el-table-column :label="$t('table.actions')" width="180">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="handleUpdate(scope.row)">
            {{$t('table.edit')}}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index)">
            {{$t('table.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 修改缓释品对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible="dialogFormVisible" width="100%" @close="dialogFormVisible = false">
      <el-form label-width='130px' label-position="left" :model="form" ref="dataForm" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_TYPE')" required prop="CRM_TYPE">
              <el-select v-model="form.CRM_TYPE">
                <el-option v-for="item in CRM_TYPE" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.START_DT')" required label-width='150px' prop="START_DT">
              <el-date-picker :picker-options="startDatePicker" v-model="form.START_DT" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.MAT_DT')" required prop="MAT_DT">
              <el-date-picker :picker-options="endDatePicker" v-model="form.MAT_DT" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.CCY_CODE')" required prop="CCY_CODE">
              <el-select v-model="form.CCY_CODE">
                <el-option v-for="item in CCY_CODE" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('table.CRM_VALUE_ORI')" required label-width='150px' prop="CRM_VALUE_ORI">
              <el-input type="number" v-model="form.CRM_VALUE_ORI"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CP_TYPE')" required prop="CRM_CP_TYPE">
              <el-select v-model="form.CRM_CP_TYPE">
                <el-option v-for="item in CRM_CP_TYPE" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CPC')" required label-width='150px' prop="CRM_CPC">
              <el-select v-model="form.CRM_CPC">
                <el-option v-for="item in CRM_CPC" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CP_RATING')" prop="CRM_CP_RATING">
              <el-select v-model="form.CRM_CP_RATING">
                <el-option v-for="item in CRM_CP_RATING" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_ST_RATING')">
              <el-select v-model="form.CRM_ST_RATING">
                <el-option v-for="item in CRM_ST_RATING" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_LT_RATING')" label-width='150px'>
              <el-select v-model="form.CRM_LT_RATING">
                <el-option v-for="item in CRM_LT_RATING" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btnRow">
        <el-button @click=" dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData(form)">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArticles,
  optionsTypeObj,
  defaultArticleData
} from '@/api/articles'
import Pagination from '@/components/Pagination/index.vue'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
export default {
  components: {
    pagination: Pagination
  },
  data() {
    const checkORI = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('CRM_VALUE_ORI is required'))
      }
      // setTimeout(() => {
      if (value < 0) {
        // callback(new Error("Please input number"));
        callback(new Error('CRM_VALUE_ORI must more than 0'))
      } else {
        if (value < 0) {
          callback(new Error('CRM_VALUE_ORI must more than 0'))
        } else {
          callback()
        }
      }
      // }, 1000);
    }
    return {
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id',
        CRM_TYPE: undefined,
        CCY_CODE: undefined,
        CRM_ST_RATING: undefined
      },
      list: [],
      total: null,
      form: {},
      startDate: '',
      endDate: '',
      CRM_TYPE: optionsTypeObj.CRM_TYPE,
      CCY_CODE: optionsTypeObj.CCY_CODE,
      CRM_CP_TYPE: optionsTypeObj.CRM_CP_TYPE,
      CRM_CPC: optionsTypeObj.CRM_CPC,
      CRM_ST_RATING: optionsTypeObj.CRM_ST_RATING,
      CRM_LT_RATING: optionsTypeObj.CRM_LT_RATING,
      CRM_CP_RATING: optionsTypeObj.CRM_CP_RATING,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      dialogStatus: '',
      tempArticleData: defaultArticleData,
      downloadLoading: false,
      // 校验规则
      rules: {
        CRM_TYPE: [
          {
            required: true,
            message: 'CRM_TYPE is required',
            trigger: 'change'
          }
        ],
        START_DT: [
          { required: true, message: 'START_DT is required', trigger: 'blur' }
        ],
        MAT_DT: [
          { required: true, message: 'MAT_DT is required', trigger: 'blur' }
        ],
        CCY_CODE: [
          { required: true, message: 'CCY_CODE is required', trigger: 'blur' }
        ],
        CRM_VALUE_ORI: [
          {
            validator: checkORI,
            trigger: 'blur'
          }
        ],
        CRM_CP_TYPE: [
          {
            required: true,
            message: 'CRM_CP_TYPE is required',
            trigger: 'blur'
          }
        ],
        CRM_CPC: [
          { required: true, message: 'CRM_CPC is required', trigger: 'blur' }
        ]
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate()
    }
  },
  methods: {
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.dialogFormVisible = !this.dialogFormVisible
      // this.$refs.dataForm.reset
    },
    //  private tempArticleData = defaultArticleData
    async getList() {
      const { data } = await getArticles(this.listQuery)
      console.log(data)
      this.list = data.items
      this.total = data.total
    },
    handleDelete(index) {
      this.list.splice(index, 1)
      this.total = this.total - 1
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
    },
    handleCreate() {
      this.resetTempArticleData()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        // (this.$refs.dataForm as Form).clearValidate()
        this.$refs.dataForm.clearValidate()
      })
    },
    resetTempArticleData() {
      // this.form = cloneDeep(defaultArticleData);
      this.form = {}
    },
    createData() {
      this.$refs.dataForm.validate(async(valid) => {
        if (!valid) {
          return console.log('校验失败')
        }
        this.list.unshift(this.form)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateData() {
      const index = this.list.findIndex((v) => v.id === this.form.id)
      this.list.splice(index, 1, this.form)
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '修改成功',
        type: 'success',
        duration: 2000
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      const tHeader = [
        'CRM_TYPE',
        'START_DT',
        'MAT_DT',
        'CCY_CODE',
        'CRM_VALUE_ORI'
      ]
      const filterVal = [
        'CRM_TYPE',
        'START_DT',
        'MAT_DT',
        'CCY_CODE',
        'CRM_VALUE_ORI'
      ]
      const data = formatJson(filterVal, this.list)
      exportJson2Excel(tHeader, data, 'table-list')
      this.downloadLoading = false
    },
    beginDate() {
      const self = this
      return {
        disabledDate(time) {
          if (self.form.MAT_DT) {
            // 如果结束时间不为空，则小于结束时间
            return new Date(self.form.MAT_DT).getTime() < time.getTime()
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          if (self.form.START_DT) {
            // 如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.form.START_DT).getTime() > time.getTime()
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
.el-table {
  padding: 20px;
}
.btnRow {
  display: flex;
  justify-content: flex-end;
}
</style>
