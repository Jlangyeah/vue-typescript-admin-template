import faker from 'faker'
import { Response, Request } from 'express'
import { IArticleData, ToDoData, ProcessData, AuditData } from '../src/api/types'

const articleList: IArticleData[] = []
const articleCount = 100
const mockFullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

const todoList: ToDoData[] = []
const todoCount = 100

const processList: ProcessData[] = []
const processCount = 5

const auditList: AuditData[] = []
const auditCount = 5

for (let i = 0; i < auditCount; i++) {
  auditList.push({
    USER_NAME: 'admin(' + faker.datatype.number({ min: 1, max: 9 }) + ')',
    BRANCH_NAME: '全行汇总(' + faker.datatype.number({ min: 10000, max: 99999 }) + ')',
    LOG_LEVEL: faker.random.arrayElement(['低', '中', '高']),
    FUNC_LEVEL3_NAME: faker.random.arrayElement(['数据预处理>数据质量检查', '数据预处理>数据质量修改', '数据预处理>数据质量删除']),
    LOG_TYPE: faker.random.arrayElement(['查看', '编辑', '删除', '更新', '导入', '导出', '执行']),
    LOG_DATE: faker.date.soon(),
    IP: faker.internet.ip(),
    LOG_DESCRIPTION: faker.commerce.productDescription(),
    LOG_RESULT: faker.random.arrayElement(['开始处理', '处理结束'])
  })
}

// faker.setLocale('zh_CN')
for (let i = 0; i < processCount; i++) {
  processList.push({
    insOperStatus: faker.random.arrayElement(['提交审批', '撤回修改', '审批通过', '驳回修改']),
    insOperUserName: faker.random.arrayElement(['系统管理员A', '系统管理员B', '系统管理员C', '系统管理员D', '系统管理员E']),
    insOperTime: faker.date.soon(),
    insOperComments: faker.finance.transactionDescription()
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
  const { page = 1, limit = 10, PRO_NAME, PRO_NODE_NAME } = req.query

  const mockList = todoList.filter(item => {
    // if (CRM_TYPE && item.CRM_TYPE.indexOf(CRM_TYPE as string) < 0) return false
    // if (CCY_CODE && item.CCY_CODE !== CCY_CODE) return false
    // if (CRM_ST_RATING && item.CRM_ST_RATING !== CRM_ST_RATING) return false
    if (PRO_NAME && item.PRO_NAME.indexOf(PRO_NAME as string) < 0) return false
    if (PRO_NODE_NAME && item.PRO_NODE_NAME !== PRO_NODE_NAME) return false

    return true
  })

  const pageList = mockList.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))

  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

export const getAudit = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      auditList
    }
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
