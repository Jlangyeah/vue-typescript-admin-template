import faker from 'faker'
import { Response, Request } from 'express'
import { IArticleData, ToDoData, ProcessData } from '../src/api/types'

const articleList: IArticleData[] = []
const articleCount = 100
const mockFullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

const todoList: ToDoData[] = []
const todoCount = 100

const processList: ProcessData[] = []
const processCount = 3

for (let i = 0; i < processCount; i++) {
  processList.push({
    insOperStatus: faker.random.arrayElement(['提交审批', '撤回审批', '新增审批']),
    insOperUserName: faker.random.arrayElement(['系统管理员A', '系统管理员B', '系统管理员C']),
    insOperTime: faker.date.soon(),
    insOperComments: faker.lorem.sentence(3, 5)
  })
}

for (let i = 0; i < todoCount; i++) {
  todoList.push({
    id: i,
    PRO_NAME: faker.random.arrayElement(['数据补录审批流程', '修改审批流程', '新增审批流程']),
    PRO_NODE_NAME: faker.random.arrayElement(['数据补录审批', '修改审批', '新增审批']),
    LAST_UPDATE_DATE: faker.date.soon()
  })
}

for (let i = 0; i < articleCount; i++) {
  articleList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft']),
    title: faker.lorem.sentence(6, 10),
    abstractContent: faker.lorem.sentences(2),
    fullContent: mockFullContent,
    sourceURL: faker.internet.url(),
    imageURL: faker.image.imageUrl(),
    timestamp: faker.date.past().getTime(),
    platforms: [faker.random.arrayElement(['a-platform', 'b-platform', 'c-platform'])],
    disableComment: faker.datatype.boolean(),
    importance: faker.datatype.number({ min: 1, max: 3 }),
    author: faker.name.findName(),
    reviewer: faker.name.findName(),
    type: faker.random.arrayElement(['CN', 'US', 'JP', 'EU']),
    pageviews: faker.datatype.number({ min: 300, max: 500 }),
    CRM_CODE: String(faker.datatype.number({ min: 10000, max: 15000 })),
    CRM_TYPE: faker.random.arrayElement(['银行秉兑汇票(非特别授权)(ZY030106)', '质押-现金(CASH_CLAT)']),
    CCY_CODE: faker.random.arrayElement(['人民币(CNY)', '美元(USD)', '日元(JPY)', '欧元(EUR)']),
    CRM_VALUE_ORI: faker.datatype.number({ min: 500, max: 4000 }),
    CRM_CP_TYPE: faker.random.arrayElement(['商品银行(BANK)', '一般公司(CORP)']),
    CRM_CPC: faker.random.arrayElement(['中华人民共和国(CHN)', '美利坚合众国(USA)', '日本国(JPN)']),
    CRM_ST_RATING: faker.random.arrayElement(['A-1', 'A-2', 'A-3', 'B-1', 'N/A']),
    CRM_LT_RATING: faker.random.arrayElement(['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'C', 'N/A']),
    CRM_CP_RATING: faker.random.arrayElement(['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'C', 'N/A']),
    START_DT: faker.date.soon(),
    MAT_DT: faker.date.soon()
  })
}

export const getArticles = (req: Request, res: Response) => {
  const { importance, type, title, page = 1, limit = 20, sort, CRM_TYPE, CCY_CODE, CRM_ST_RATING } = req.query

  let mockList = articleList.filter(item => {
    if (importance && item.importance !== +importance) return false
    if (type && item.type !== type) return false
    if (title && item.title.indexOf(title as string) < 0) return false
    if (CRM_TYPE && item.CRM_TYPE.indexOf(CRM_TYPE as string) < 0) return false
    if (CCY_CODE && item.CCY_CODE !== CCY_CODE) return false
    if (CRM_ST_RATING && item.CRM_ST_RATING !== CRM_ST_RATING) return false

    return true
  })

  if (sort === '-id') {
    mockList = mockList.reverse()
  }

  const pageList = mockList.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))

  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

export const getArticle = (req: Request, res: Response) => {
  const { id } = req.params
  for (const article of articleList) {
    if (article.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          article
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Article not found'
  })
}

export const getTodoArticles = (req: Request, res: Response) => {
  // for (const article of todoList) {
  // if (true) {
  return res.json({
    code: 20000,
    data: {
      todoList
    }
  })
  // }
  // }
  return res.json({
    code: 70001,
    message: 'Article not found'
  })
}

export const getProcessLogs = (req: Request, res: Response) => {
  // for (const article of processList) {
  // if (true) {
  return res.json({
    code: 20000,
    data: {
      processList
    }
  })
  // }
  // }
  return res.json({
    code: 70001,
    message: 'Article not found'
  })
}

export const createArticle = (req: Request, res: Response) => {
  const { article } = req.body
  return res.json({
    code: 20000,
    data: {
      article
    }
  })
}

export const updateArticle = (req: Request, res: Response) => {
  const { id } = req.params
  const { article } = req.body
  for (const v of articleList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          article
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Article not found'
  })
}

export const deleteArticle = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const getPageviews = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      pageviews: [
        { key: 'PC', pageviews: 1024 },
        { key: 'Mobile', pageviews: 1024 },
        { key: 'iOS', pageviews: 1024 },
        { key: 'Android', pageviews: 1024 }
      ]
    }
  })
}
