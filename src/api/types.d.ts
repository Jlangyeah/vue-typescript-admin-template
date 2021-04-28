export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
  CRM_CODE: string
  CRM_TYPE: string
  CCY_CODE: string
  CRM_VALUE_ORI: number
  CRM_CP_TYPE: string
  CRM_CPC: string
  CRM_ST_RATING: string
  CRM_LT_RATING: string
  CRM_CP_RATING: string
  START_DT: Date
  MAT_DT: Date
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}
