<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.displayName+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate(updateReleaseDia = true)">
        {{ $t('table.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>
    </div>
    <el-table :data="list" fit highlight-current-row style="width: 100%">
      <el-table-column type=index prop="CRM_CODE" :label="$t('table.CRM_CODE')" align="center" width="95"></el-table-column>
      <el-table-column prop="CRM_TYPE" :label="$t('table.CRM_TYPE')" align="center" class-name="" width="110"></el-table-column>
      <el-table-column prop="CCY_CODE" :label="$t('table.CCY_CODE')" align="center"></el-table-column>
      <el-table-column prop="CRM_VALUE_ORI" :label="$t('table.CRM_VALUE_ORI')" align="center" width="120"></el-table-column>
      <el-table-column prop="CRM_CP_TYPE" :label="$t('table.CRM_CP_TYPE')" align="center" width="120"></el-table-column>
      <el-table-column prop="CRM_CPC" :label="$t('table.CRM_CPC')" align="center" width="180"></el-table-column>
      <el-table-column prop="CRM_ST_RATING" :label="$t('table.CRM_ST_RATING')" align="center" width="110"></el-table-column>
      <el-table-column prop="CRM_LT_RATING" :label="$t('table.CRM_LT_RATING')" align="center" width="110"></el-table-column>
      <el-table-column :label="$t('table.actions')" width="180">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="updateDialogClosed(scope.row)">
            {{$t('table.update')}}</el-button>
          <el-button type="danger" size="mini" @click="deleteRow(scope.$index)">
            {{$t('table.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改缓释品对话框 -->
    <el-dialog title="新增缓释品" :visible="updateReleaseDia" width="100%" @close="updateReleaseDia = false">
      <el-form inline v-model="form" label-width='130px' label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_TYPE')" required>
              <el-select v-model="form.CRM_TYPE">
                <el-option v-for="item in CRM_TYPE" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.startDate')" required label-width='150px'>
              <el-date-picker v-model="startDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.endDate')" required>
              <el-date-picker v-model="endDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form inline label-width='130px' label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.CCY_CODE')" required>
              <el-select v-model="form.CCY_CODE">
                <el-option v-for="item in CCY_CODE" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item :label="$t('table.CRM_VALUE_ORI')" required label-width='150px'>
              <el-input type="number" v-model="form.CRM_VALUE_ORI"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form inline label-width='130px' label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CP_TYPE')" required>
              <el-select v-model="form.CRM_CP_TYPE">
                <el-option v-for="item in CRM_CP_TYPE" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CPC')" required label-width='150px'>
              <el-select v-model="form.CRM_CPC">
                <el-option v-for="item in CRM_CPC" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CP_RATING')">
              <el-select v-model="form.CRM_CP_RATING">
                <el-option v-for="item in CRM_CP_RATING" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form inline label-width='130px' label-position="left">
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
        <el-button @click=" updateReleaseDia = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="confirmUpdate(form)">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getArticles, optionsTypeObj } from '@/api/articles'
export default {
  data() {
    return {
      updateReleaseDia: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
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
      CRM_CP_RATING: optionsTypeObj.CRM_CP_RATING
    }
  },
  methods: {
    // 监听修改缓释品对话框的关闭事件
    updateDialogClosed(row) {
      this.form = row
      this.updateReleaseDia = !this.updateReleaseDia
    },
    //  private tempArticleData = defaultArticleData
    async getList() {
      const { data } = await getArticles(this.listQuery)
      console.log(data)
      this.list = data.items
      this.total = data.total
    },
    confirmUpdate() {
      this.updateReleaseDia = false
      this.$notify({
        title: '成功',
        message: '修改成功',
        type: 'success',
        duration: 2000
      })
    },
    deleteRow(index) {
      this.list.splice(index, 1)
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
    }
  },
  created() {
    this.getList()
    this.startDate = new Date()
    this.endDate = new Date()
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
