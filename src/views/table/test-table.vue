<template>
  <div>
    <el-table :data="releaseData" fit highlight-current-row style="width: 100%">
      <el-table-column type=index prop="CRM_CODE" :label="$t('table.CRM_CODE')" align="center" width="95"></el-table-column>
      <el-table-column prop="CRM_TYPE" :label="$t('table.CRM_TYPE')" align="center" class-name="" width="110"></el-table-column>
      <el-table-column prop="CCY_CODE" :label="$t('table.CCY_CODE')" align="center"></el-table-column>
      <el-table-column prop="CRM_VALUE_ORI" :label="$t('table.CRM_VALUE_ORI')" align="center"></el-table-column>
      <el-table-column prop="CRM_CP_TYPE" :label="$t('table.CRM_CP_TYPE')" align="center"></el-table-column>
      <el-table-column prop="CRM_CPC" :label="$t('table.CRM_CPC')" align="center" width="180"></el-table-column>
      <el-table-column prop="CRM_ST_RATING" :label="$t('table.CRM_ST_RATING')" align="center"></el-table-column>
      <el-table-column prop="CRM_LT_RATING" :label="$t('table.CRM_LT_RATING')" align="center"></el-table-column>
      <el-table-column :label="$t('table.actions')" width="180">
        <el-button type="warning" size="mini" @click="updateReleaseDia = true">{{$t('table.update')}}</el-button>
      </el-table-column>
    </el-table>

    <!-- 修改缓释品对话框 -->
    <el-dialog title="新增缓释品" :visible="updateReleaseDia" width="85%" @close="updateDialogClosed">
      <el-form inline label-width='110px' label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_TYPE')" required>
              <el-select></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.startDate')" required label-width='180px'>
              <el-date-picker v-model="value1" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.endDate')" required>
              <el-date-picker v-model="value1" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form inline label-width='110px' label-position="left">
        <el-col :span="8">
          <el-form-item :label="$t('table.CCY_CODE')" required>
            <el-select></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item :label="$t('table.CRM_VALUE_ORI')" required label-width='180px'>
            <el-input type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <el-form inline label-width='110px' label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CP_TYPE')" required>
              <el-select></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CPC')" required label-width='180px'>
              <el-select></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_CP_RATING')">
              <el-select></el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form inline label-width='110px' label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_ST_RATING')">
              <el-select></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.CRM_LT_RATING')" label-width='180px'>
              <el-select></el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
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
      ]
    }
  },
  methods: {
    // 监听修改缓释品对话框的关闭事件
    updateDialogClosed() {
      this.updateReleaseDia = !this.updateReleaseDia
    }
    //  private tempArticleData = defaultArticleData
  }
}
</script>

<style scoped>
.el-table {
  padding: 20px;
}
</style>
