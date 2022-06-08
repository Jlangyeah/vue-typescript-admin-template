<!--
 * @Descripttion: Element Ui Table 表格二次封装
 * @version:
 * @Author: sueRimn
 * @Date: 2020-05-10 23:07:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-23 13:59:04
 -->
<template>
  <div>
    <el-table
      ref="dataTable"
      :data="tableData"
      border
      style="width: 100%"
      size="mini"
      stripe
      :height="height"
      highlight-current-row
      @selection-change="selectLine"
    >
      <!-- 多选框 -->
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
        :align="align"
      ></el-table-column>
      <!-- 文本数据渲染 -->
      <template v-for="item in tableHead">
        <el-table-column
          v-if="item.columnType === 'slot'"
          :prop="item.field"
          :label="item.label"
          :key="item.field"
          :width="item.width"
          :align="align"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.field"
          :label="item.label"
          :key="item.field"
          :width="item.width"
          :align="align"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'e-table',
  components: {},
  /**
   * @name:
   * @test: test font
   * @msg:
   * @param {
   *  接收参数:
   *      tableHeadConfig           列的名称、接收值     |     Array
   *        label         列的名称                      |     String
   *        field         列的对应值                    |     String
   *        columnType    定义当前列为插槽    |   slot   |     String
   *        slotName      定义当前列插槽的名字           |     String
   *        width         定义当前列的宽度               |     String
   *  示例：配置
   *      tableHeadConfig:[
   *              {
   *                label       : "缩略图",
   *                field       : "skuName",
   *                columnType  : "slot",
   *                slotName    : "thumbnail",
   *                width       : 240
   *              }
   *            ]
   *
   *      tableLoadData     异步获取的table文本数据信息
   *      align             表格单元格内容排列顺序      left|center|right
   *      selection         表格是否可多选
   *      height            表格默认撑开高度
   *  事件：
   *      获取当前选中行
   *      调用页面用  @selectLine="xxx" 进行监听处理
   * }
   * @return:
   */
  props: {
    tableHeadConfig: {
      type: Array,
      default: () => {
        return [
          {
            label: 'skuId',
            field: 'skuId'
          },
          {
            label: '商品名称',
            field: 'skuName'
          },
          {
            label: '缩略图',
            columnType: 'slot',
            slotName: 'thumbnail'
          },
          {
            label: '库存数量',
            field: 'onStockNum'
          },
          {
            label: '码类型',
            field: 'hasUniCode'
          },
          {
            label: '状态',
            field: 'status',
            columnType: 'slot',
            slotName: 'status'
          },
          {
            label: '操作',
            columnType: 'slot',
            slotName: 'operation'
          }
        ]
      }
    },
    tableLoadData: {
      type: Array,
      default: () => {
        return [
          {
            skuId: '111',
            skuName: '222'
          }
        ]
      }
    },
    align: {
      type: String,
      default: 'center'
    },
    selection: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: 600
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    selectLine() {
      if (
        this.$refs.dataTable.selection &&
        this.$refs.dataTable.selection.length > 0
      ) {
        this.$emit('selectLine', this.$refs.dataTable.selection)
      }
    }
  },
  computed: {
    tableData() {
      return this.tableLoadData
    },
    tableHead() {
      return this.tableHeadConfig
    }
  }
}
</script>
<style lang="scss" scope>
// 点击的时候添加的class样式
.el-table__body tr.current-row > td {
  // background-color: #69A8EA !important;
  background-color: #1f2d3da1 !important;
  color: #fff;
}
</style>
