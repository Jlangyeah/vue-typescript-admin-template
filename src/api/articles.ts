import request from '@/utils/request'
import { IArticleData, ToDoData, ProcessData, AuditData } from './types'

export const defaultArticleData: IArticleData = {
  id: 0,
  status: 'draft',
  title: '',
  fullContent: '',
  abstractContent: '',
  sourceURL: '',
  imageURL: '',
  timestamp: '',
  platforms: ['a-platform'],
  disableComment: false,
  importance: 0,
  author: '',
  reviewer: '',
  type: '',
  pageviews: 0,
  CRM_CODE: '',
  CRM_TYPE: '',
  CCY_CODE: '',
  CRM_VALUE_ORI: 0,
  CRM_CP_TYPE: '',
  CRM_CPC: '',
  CRM_ST_RATING: '',
  CRM_LT_RATING: '',
  CRM_CP_RATING: '',
  START_DT: new Date(),
  MAT_DT: new Date()
}

export const defaultToDoData: ToDoData = {
  id: 0,
  PRO_NAME: '',
  PRO_NODE_NAME: '',
  LAST_UPDATE_DATE: new Date()
}
export const defaultProcessData: ProcessData = {
  insOperStatus: '',
  insOperUserName: '',
  insOperTime: new Date(),
  insOperComments: ''
}

export const defaultAuditData: AuditData = {
  USER_NAME: '',
  BRANCH_NAME: '',
  LOG_LEVEL: '',
  FUNC_LEVEL3_NAME: '',
  LOG_TYPE: '',
  LOG_DATE: new Date(),
  IP: '',
  LOG_DESCRIPTION: '',
  LOG_RESULT: ''
}

export const optionsTypeObj = {
  CRM_TYPE: ['银行秉兑汇票(非特别授权)(ZY030106)', '质押-现金{CASH_CLAT}'],
  CCY_CODE: ['人民币(CNY)', '美元(USD)', '日元(JPY)', '欧元(EUR)'],
  CRM_CP_TYPE: ['商品银行(BANK)', '一般公司(CORP)'],
  CRM_CPC: ['中华人民共和国(CHN)', '美利坚合众国(USA)', '日本国(JPN)'],
  CRM_ST_RATING: ['A-1', 'A-2', 'A-3', 'B-1', 'N/A'],
  CRM_LT_RATING: ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'C', 'N/A'],
  CRM_CP_RATING: ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'C', 'N/A']
}

export const todoOptionsObj = {
  PRO_NAME: ['数据补录审批流程', '新增审批流程', '修改审批流程'],
  PRO_NODE_NAME: ['数据补录审批', '修改审批', '新增审批']
}

export const getArticles = (params: any) =>
  request({
    url: '/articles',
    method: 'get',
    params
  })

export const getTodoArticles = (params: any) =>
  request({
    url: '/process_logs',
    method: 'get',
    params
  })

export const getAudit = (params: any) =>
  request({
    url: '/searchAudit',
    method: 'get',
    params
  })

export const getProcessLogs = (params: any) =>
  request({
    url: '/process',
    method: 'get',
    params
  })

export const getArticle = (id: number, params: any) =>
  request({
    url: `/articles/${id}`,
    method: 'get',
    params
  })

export const createArticle = (data: any) =>
  request({
    url: '/articles',
    method: 'post',
    data
  })

export const updateArticle = (id: number, data: any) =>
  request({
    url: `/articles/${id}`,
    method: 'put',
    data
  })

export const deleteArticle = (id: number) =>
  request({
    url: `/articles/${id}`,
    method: 'delete'
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
