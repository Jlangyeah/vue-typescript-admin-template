<template>
  <div>
    <el-table :data="list" fit highlight-current-row style="width: 100%">
      <el-table-column type=index prop="CRM_CODE" :label="$t('table.CRM_CODE')" align="center" width="95"></el-table-column>
      <el-table-column prop="CRM_TYPE" :label="$t('table.CRM_TYPE')" align="center" class-name="" width="110"></el-table-column>
      <el-table-column prop="CCY_CODE" :label="$t('table.CCY_CODE')" align="center"></el-table-column>
      <el-table-column prop="CRM_VALUE_ORI" :label="$t('table.CRM_VALUE_ORI')" align="center"></el-table-column>
      <el-table-column prop="CRM_CP_TYPE" :label="$t('table.CRM_CP_TYPE')" align="center"></el-table-column>
      <el-table-column prop="CRM_CPC" :label="$t('table.CRM_CPC')" align="center" width="180"></el-table-column>
      <el-table-column prop="CRM_ST_RATING" :label="$t('table.CRM_ST_RATING')" align="center"></el-table-column>
      <el-table-column prop="CRM_LT_RATING" :label="$t('table.CRM_LT_RATING')" align="center"></el-table-column>
      <el-table-column :label="$t('table.actions')" width="180">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="updateDialogClosed(scope.row)">
          {{$t('table.update')}}</el-button>
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
              <el-option v-for="item in CRM_TYPE" :key="item"  :label="item"
      :value="item">
              </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.startDate')" required label-width='150px'>
              <el-date-picker  v-model="startDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.endDate')" required>
              <el-date-picker v-model="endDate"  type="date" placeholder="选择日期">
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
              <el-option v-for="item in CCY_CODE" :key="item"  :label="item"
      :value="item"></el-option>
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
                <el-option v-for="item in CRM_CP_TYPE" :key="item"  :label="item"
      :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CPC')" required label-width='150px'>
              <el-select v-model="form.CRM_CPC">
                <el-option v-for="item in CRM_CPC" :key="item"  :label="item"
      :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CP_RATING')">
              <el-select v-model="form.CRM_CP_RATING">
                <el-option v-for="item in CRM_CP_RATING" :key="item"  :label="item"
      :value="item"></el-option>
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
                <el-option v-for="item in CRM_ST_RATING" :key="item"  :label="item"
      :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_LT_RATING')" label-width='150px'>
              <el-select v-model="form.CRM_LT_RATING">
                <el-option v-for="item in CRM_LT_RATING" :key="item"  :label="item"
      :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getArticles, optionsTypeObj } from '@/api/articles'
export default {
  data() {
    return {
      updateReleaseDia: false,
      releaseData: [
        {
          CRM_CODE: '',
          CRM_TYPE: '银行秉兑汇票(非特别授权)(ZY030106)',
          CCY_CODE: '人民币(CNY)',
          CRM_VALUE_ORI: '1000',
          CRM_CP_TYPE: '商品银行(BANK)',
          CRM_CPC: '中华人民共和国(CHN)',
          CRM_ST_RATING: '',
          CRM_LT_RATING: ''
        },
        {
          CRM_CODE: '',
          CRM_TYPE: '银行秉兑汇票(非特别授权)(ZY030106)',
          CCY_CODE: '人民币(CNY)',
          CRM_VALUE_ORI: '1000',
          CRM_CP_TYPE: '商品银行(BANK)',
          CRM_CPC: '中华人民共和国(CHN)',
          CRM_ST_RATING: '',
          CRM_LT_RATING: ''
        },
        {
          CRM_CODE: '',
          CRM_TYPE: '银行秉兑汇票(非特别授权)(ZY030106)',
          CCY_CODE: '人民币(CNY)',
          CRM_VALUE_ORI: '1000',
          CRM_CP_TYPE: '商品银行(BANK)',
          CRM_CPC: '中华人民共和国(CHN)',
          CRM_ST_RATING: '',
          CRM_LT_RATING: ''
        }
      ],
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
      form: {
      },
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
</style>
