// ============================================================
// SCTI 供应链岗位适配测试 — 数据层 v2
// 双题库（应届生12题 / 社招15题）+ 6种类型结果
// ============================================================

const TYPES = {
  PLANNER:     0,  // 计划大脑型
  PROCUREMENT: 1,  // 采购谈判型
  LOGISTICS:   2,  // 物流履约型
  MANUFACTURE: 3,  // 制造运营型
  DATA:        4,  // 数据洞察型
  PROJECT:     5   // 项目变革型
};

// ============================================================
// 应届生题库（12题）
// 计分规则：主类型 +2，副类型（subtype）+1
// 分布：Q1:PR,M,D,PJ / Q2:PR,L,D,PJ / Q3:PR,L,M,PJ / Q4:PR,L,M,P(+D)
//       Q5:P,M,D,PJ  / Q6:P,L,D,PJ  / Q7:P,L,M,PJ  / Q8:P,L,M,D
//       Q9:P,PR,M(+L),PJ / Q10:P,PR,M,D / Q11:P,PR,L,PJ / Q12:P,PR,L,D
// ============================================================
const QUESTIONS_FRESH = [
  {
    id: 1,
    text: '群里有人提议明天一起出去玩，大家开始刷屏，你脑子里第一个念头是？',
    options: [
      { text: '先确认预算、人均和大概玩法，不然后面很容易超支', type: TYPES.PROCUREMENT },
      { text: '先定一个集合时间和地点，其他细节路上再调整', type: TYPES.MANUFACTURE },
      { text: '先看有几个人真的能去，不然聊半天也组不起来', type: TYPES.DATA },
      { text: '先把大家的意见收一收，赶紧定一个可执行方案', type: TYPES.PROJECT }
    ]
  },
  {
    id: 2,
    text: '你在找兼职，看到一个描述很模糊的招聘帖，你最先想搞清楚的是？',
    options: [
      { text: '薪资怎么结，有没有押金、扣钱或隐藏条件', type: TYPES.PROCUREMENT },
      { text: '工作地点、排班方式、每天具体做什么', type: TYPES.LOGISTICS },
      { text: '有没有真实评价、过往反馈，和同类岗位比靠谱吗', type: TYPES.DATA },
      { text: '团队怎么带人，遇到问题有没有人能对接', type: TYPES.PROJECT }
    ]
  },
  {
    id: 3,
    text: '开学搬进新宿舍，你最先做的是什么？',
    options: [
      { text: '先和室友说清公共用品怎么分摊，避免后面算不清', type: TYPES.PROCUREMENT },
      { text: '先规划床铺、桌面、柜子和公共区怎么放最顺手', type: TYPES.LOGISTICS },
      { text: '先把箱子打开整理起来，缺什么边收拾边补', type: TYPES.MANUFACTURE },
      { text: '先聊聊大家作息和习惯，减少后面互相打扰', type: TYPES.PROJECT }
    ]
  },
  {
    id: 4,
    text: '组员临时有事，把他的任务丢给你，你第一步做什么？',
    options: [
      { text: '先确认这部分最终要交付什么，别接过来才发现方向错了', type: TYPES.PROCUREMENT },
      { text: '先把他留下的文件、聊天记录和版本整理清楚', type: TYPES.LOGISTICS },
      { text: '先接住最急的部分，保证小组进度别断掉', type: TYPES.MANUFACTURE },
      { text: '先判断这块还差多少工作量，会不会影响整体节奏', type: TYPES.PLANNER, subtype: TYPES.DATA }
    ]
  },
  {
    id: 5,
    text: '期末，几门课的作业和考试全挤在同一周，你的第一反应是？',
    options: [
      { text: '先按截止日期和难度排优先级，避免所有事一起爆', type: TYPES.PLANNER },
      { text: '先挑最难、最卡人的那门开始做，别拖到最后', type: TYPES.MANUFACTURE },
      { text: '先看每门课占分比例和自己薄弱点，判断哪里最值得花时间', type: TYPES.DATA },
      { text: '约几个同学分工整理资料，互相补缺口', type: TYPES.PROJECT }
    ]
  },
  {
    id: 6,
    text: '寒假才发现高铁直达票全卖完了，你的第一反应是？',
    options: [
      { text: '把高铁、飞机、大巴、中转都拉出来，比哪个整体最稳', type: TYPES.PLANNER },
      { text: '先看中转时间、换乘站距离和行李能不能赶得上', type: TYPES.LOGISTICS },
      { text: '查候补成功率和历史出票情况，判断要不要继续等', type: TYPES.DATA },
      { text: '问问同学有没有同路的，能不能一起拼车或换方案', type: TYPES.PROJECT }
    ]
  },
  {
    id: 7,
    text: '小组展示前一小时，负责演讲的人说嗓子哑了，你的第一反应是？',
    options: [
      { text: '先判断还剩多久、谁最适合顶上、要改多少内容', type: TYPES.PLANNER },
      { text: '先把稿子、PPT备注和演讲顺序交接清楚', type: TYPES.LOGISTICS },
      { text: '先把最关键的部分接过来，保证展示能正常完成', type: TYPES.MANUFACTURE },
      { text: '立刻拉大家对齐，重新分配演讲和答辩部分', type: TYPES.PROJECT }
    ]
  },
  {
    id: 8,
    text: '接到一个完全没做过的任务，不知道从哪里下手，你会？',
    options: [
      { text: '先把任务拆成几个步骤，确定先做哪一步、后做哪一步', type: TYPES.PLANNER },
      { text: '先找模板、流程或往年版本，照着标准框架搭起来', type: TYPES.LOGISTICS },
      { text: '先做最确定能做的部分，边做边把问题暴露出来', type: TYPES.MANUFACTURE },
      { text: '先搜案例和方法，对比哪种路径最靠谱', type: TYPES.DATA }
    ]
  },
  {
    id: 9,
    text: '社团要下个月办一次校外活动，现在什么都没准备，你第一步做什么？',
    options: [
      { text: '倒推时间线，拆出场地、人员、物料、宣传各自要多久', type: TYPES.PLANNER },
      { text: '先确认预算、规模和底线，判断活动能做到什么程度', type: TYPES.PROCUREMENT },
      { text: '先锁最关键的场地和资源，避免后面想做也做不了', type: TYPES.MANUFACTURE, subtype: TYPES.LOGISTICS },
      { text: '先开个短会，把负责人和下一步动作定下来', type: TYPES.PROJECT }
    ]
  },
  {
    id: 10,
    text: '要独立规划一次出行，但完全没去过那个地方，你最先做什么？',
    options: [
      { text: '先定总天数和大致路线，避免行程前后接不上', type: TYPES.PLANNER },
      { text: '先算预算上限，判断这个目的地值不值得去', type: TYPES.PROCUREMENT },
      { text: '先把最难抢的票和酒店查起来，能订就先锁住', type: TYPES.MANUFACTURE },
      { text: '先看几篇攻略和评价，对比不同路线的坑和亮点', type: TYPES.DATA }
    ]
  },
  {
    id: 11,
    text: '你被临时拉进一个陌生小组，下周要一起交作业，你第一步做什么？',
    options: [
      { text: '先确认截止时间和剩余周期，判断还能怎么排', type: TYPES.PLANNER },
      { text: '先搞清楚作业要求和完成标准，避免方向跑偏', type: TYPES.PROCUREMENT },
      { text: '先把已有材料、版本和分工记录理清楚', type: TYPES.LOGISTICS },
      { text: '先了解大家擅长什么，再重新对齐分工方式', type: TYPES.PROJECT }
    ]
  },
  {
    id: 12,
    text: '你发现一门课的成绩比预期低很多，不知道为什么，你最先做什么？',
    options: [
      { text: '先回顾每次作业、考试和复习节点，判断问题从哪里开始偏了', type: TYPES.PLANNER },
      { text: '去问清评分标准和扣分点，看看是不是理解错了要求', type: TYPES.PROCUREMENT },
      { text: '把提交记录、反馈和作业版本都翻出来，从细节里找原因', type: TYPES.LOGISTICS },
      { text: '把自己的分数、平均分和各部分占比拉出来，看差距主要在哪', type: TYPES.DATA }
    ]
  }
];

// ============================================================
// 社招题库（12题）
// 计分规则：主类型 +2，副类型（subtype）+1
// 分布：Q1:PR,M,D,PJ / Q2:PR(+D),L,D,PJ / Q3:PR,L,M,PJ / Q4:PR,L,M,D
//       Q5:P,M,D(+PR),PJ / Q6:P,L,D,PJ   / Q7:P,L,M,PJ  / Q8:P,L,M,D
//       Q9:P,PR,M,PJ     / Q10:P,PR,M,D   / Q11:P,PR,L,PJ / Q12:P,PR,L,D
// ============================================================
const QUESTIONS_CAREER = [
  {
    id: 1,
    text: '刚到一家新公司，还没摸清楚状况，你第一个月最想搞清楚的是？',
    options: [
      { text: '哪些事情最影响业务结果，哪些资源投入最不划算', type: TYPES.PROCUREMENT },
      { text: '先跟着一件真实业务跑完，看它实际是怎么转起来的', type: TYPES.MANUFACTURE },
      { text: '关键数据、系统口径和报表入口分别在哪里', type: TYPES.DATA },
      { text: '谁和谁协作、谁拍板、问题通常卡在哪一层', type: TYPES.PROJECT }
    ]
  },
  {
    id: 2,
    text: '拿到一份供应链月报，你第一眼会看什么？',
    options: [
      { text: '成本、库存或损耗有没有异常，和上期相比变化大不大', type: TYPES.PROCUREMENT, subtype: TYPES.DATA },
      { text: '订单、库存、运输这些关键节点有没有卡住', type: TYPES.LOGISTICS },
      { text: '哪些指标偏离正常范围，背后可能是什么原因', type: TYPES.DATA },
      { text: '跨部门承诺有没有兑现，哪些事项还没闭环', type: TYPES.PROJECT }
    ]
  },
  {
    id: 3,
    text: '跨部门项目推进卡住了，你的第一反应是？',
    options: [
      { text: '先判断这个卡点值不值得继续耗，能不能换资源或换路径', type: TYPES.PROCUREMENT },
      { text: '顺着流程往前追，看是哪一段交接没有说清楚', type: TYPES.LOGISTICS },
      { text: '去现场看一遍，确认流程设计和实际操作差在哪', type: TYPES.MANUFACTURE },
      { text: '把相关人拉齐，先把各自的卡点和责任边界说清楚', type: TYPES.PROJECT }
    ]
  },
  {
    id: 4,
    text: '一个操作步骤最近频繁出错，你最先做什么？',
    options: [
      { text: '先判断这个错误会带来多大损失，值不值得立刻改规则', type: TYPES.PROCUREMENT },
      { text: '把流程从头走一遍，看是哪一步交接或输入不清楚', type: TYPES.LOGISTICS },
      { text: '到现场看实际怎么操作，和标准动作差在哪里', type: TYPES.MANUFACTURE },
      { text: '统计出错频率、时间段和人员分布，看有没有规律', type: TYPES.DATA }
    ]
  },
  {
    id: 5,
    text: '老板说明年要提效降本，你的第一个念头是？',
    options: [
      { text: '先拆目标和时间轴，看每个阶段该推进什么', type: TYPES.PLANNER },
      { text: '先去一线盘一圈，把明显浪费和低效点找出来', type: TYPES.MANUFACTURE },
      { text: '先做一张成本和效率分布图，看问题集中在哪', type: TYPES.DATA, subtype: TYPES.PROCUREMENT },
      { text: '先和各部门对齐，确认哪些动作真的能推动落地', type: TYPES.PROJECT }
    ]
  },
  {
    id: 6,
    text: '核心供应商通知断货三周，你的第一步是？',
    options: [
      { text: '先推演未来三周生产和交付会从哪一天开始受影响', type: TYPES.PLANNER },
      { text: '先查在途、库存、替代仓和调拨路径能不能接上', type: TYPES.LOGISTICS },
      { text: '把消耗速度、历史备货和库存水位拉出来，算还能撑多久', type: TYPES.DATA },
      { text: '马上拉采购、计划、生产一起对齐风险和决策动作', type: TYPES.PROJECT }
    ]
  },
  {
    id: 7,
    text: '生产线临时停机，今天的发货可能完不成，你先做什么？',
    options: [
      { text: '先看已完工、在制和待发订单，重新排保供优先级', type: TYPES.PLANNER },
      { text: '先协调仓库和运输，保证最急的订单能先发出去', type: TYPES.LOGISTICS },
      { text: '去现场判断停机原因和最快恢复时间', type: TYPES.MANUFACTURE },
      { text: '同步相关方影响范围，决定要不要提前通知客户', type: TYPES.PROJECT }
    ]
  },
  {
    id: 8,
    text: '月末复盘，一个关键指标没达成，你最想搞清楚什么？',
    options: [
      { text: '计划是从哪个节点开始偏离目标的', type: TYPES.PLANNER },
      { text: '哪个流转节点、交接环节或履约动作拖慢了结果', type: TYPES.LOGISTICS },
      { text: '现场执行有没有出现异常，是否影响了实际产出', type: TYPES.MANUFACTURE },
      { text: '数据上有没有早期信号，当时为什么没被识别出来', type: TYPES.DATA }
    ]
  },
  {
    id: 9,
    text: '公司要上一个新系统，你被拉进项目组，你最先关注什么？',
    options: [
      { text: '上线时间、试点节奏和各阶段里程碑怎么排', type: TYPES.PLANNER },
      { text: '供应商、预算、接口采购和后续维护成本是否可控', type: TYPES.PROCUREMENT },
      { text: '先选一个真实业务场景试跑，看看系统能不能跑通', type: TYPES.MANUFACTURE },
      { text: '推进卡在哪、谁能拍板、哪些部门必须配合', type: TYPES.PROJECT }
    ]
  },
  {
    id: 10,
    text: '你发现某个流程在执行层面和设计层面完全脱节，你会怎么做？',
    options: [
      { text: '先画出现有流程和理想流程，找出差异发生在哪几个节点', type: TYPES.PLANNER },
      { text: '先判断这个脱节到底影响成本、效率还是风险，值不值得改', type: TYPES.PROCUREMENT },
      { text: '先到执行现场跑一遍，验证真正卡人的地方在哪里', type: TYPES.MANUFACTURE },
      { text: '把差异造成的异常次数、耗时和损失量化出来', type: TYPES.DATA }
    ]
  },
  {
    id: 11,
    text: '参与一个降本项目，大家参与度很低，你会怎么推？',
    options: [
      { text: '先把项目节奏和关键交付节点定清楚', type: TYPES.PLANNER },
      { text: '把能省多少钱、影响什么指标算出来，让价值可见', type: TYPES.PROCUREMENT },
      { text: '先把执行动作拆成清单，让每个部门知道具体要交什么', type: TYPES.LOGISTICS },
      { text: '把项目正式立项，定责任人、里程碑和复盘机制', type: TYPES.PROJECT }
    ]
  },
  {
    id: 12,
    text: '公司要做一个战略项目，你被拉进来，你最自然会先从哪里切入？',
    options: [
      { text: '把目标拆成阶段路径，明确每个阶段的关键节点和风险', type: TYPES.PLANNER },
      { text: '判断项目背后的投入产出、资源约束和商业优先级', type: TYPES.PROCUREMENT },
      { text: '梳理从需求到交付的执行链路，确认哪些环节需要配套落地', type: TYPES.LOGISTICS },
      { text: '搭一套数据分析框架，用数据支撑方向和决策', type: TYPES.DATA }
    ]
  }
];

// ============================================================
// 6种类型结果数据
// ============================================================
const RESULTS = [
  {
    id: TYPES.PLANNER,
    name: '计划大脑型',
    englishName: 'Supply Chain Planner',
    tagline: '别人看到乱，你看到的是还没排好的计划。',
    color: '#4F6EF7',
    lightColor: '#EEF1FF',
    avatar: { male: '计划大脑男.png', female: '计划大脑女.png' },
    emoji: '🧠',
    rarity: '约占所有测试者 18%',
    description: '你天生喜欢把复杂的供需关系变成清晰可执行的计划。遇到问题第一反应是拆解约束、找规律、建模型。你的价值在于让混乱变得有章可循，让决策有数字支撑。',
    positions: ['供应链计划 Supply Chain Planner', '需求计划 Demand Planner', 'S&OP 计划', '主计划 MPS / IBP', '物料计划 Material Planner'],
    strengths: ['逻辑强，能把复杂约束拆解成可执行的计划', '对供需信号敏感，能提前预判风险', '抗模糊能力强，不怕不确定性'],
    risk: '简历容易只写"执行计划"，没有体现你对业务结果的实际影响。',
    keywords: ['需求预测', 'S&OP', '库存优化', '计划达成率', 'MPS'],
    advice: {
      fresh: '优先找有完整 S&OP 流程的外资或新能源车企，实习阶段主动接触预测建模，哪怕只是维护一张预测表，也要能说出"这张表影响了什么决策"。',
      career: '如果你现在做运营或物流，横向切入计划的路径是先做好跨部门数据对接——让别人看到你能把数字说清楚，再谈转岗。'
    }
  },
  {
    id: TYPES.PROCUREMENT,
    name: '采购谈判型',
    englishName: 'Procurement / Sourcing',
    tagline: '别人谈崩了叫失败，你谈崩了叫摸清了底线。',
    color: '#E85D3A',
    lightColor: '#FFF0ED',
    avatar: { male: '采购男.png', female: '采购女.png' },
    emoji: '🎯',
    rarity: '约占所有测试者 16%',
    description: '你天生有谈判欲，能感受到资源背后的利益结构。你不怕周旋，不怕冲突，享受从对方手里拿到更好条件的过程。你的价值在于替公司用最低成本拿到最好资源。',
    positions: ['采购 Buyer / Procurement', '战略采购 Strategic Sourcing', '供应商管理 GSM', '品类采购 Commodity Manager', '供应商质量 SQE'],
    strengths: ['商业敏感，能快速判断资源价值和成本结构', '沟通强，能在多方利益中找到出路', '结果导向，关注实际节省和业务影响'],
    risk: '新人阶段接触不到核心谈判，容易做打杂的事，还不知道怎么把这些经历写进简历。',
    keywords: ['供应商开发', '降本 / TCO', 'RFQ / 比价', '谈判', '成本分析'],
    advice: {
      fresh: '优先找有 RFQ 流程的制造业或消费品公司，主动参与比价项目，哪怕只是整理报价表，也要能算出"这次比价节省了多少"。',
      career: '从运营或计划转采购，先积累供应商打交道的经历——催货、协调交期都算——再把这些经历用"供应商管理"的语言重新包装。'
    }
  },
  {
    id: TYPES.LOGISTICS,
    name: '物流履约型',
    englishName: 'Logistics / Fulfillment',
    tagline: '货到了没人说谢谢，货没到第一个被问的是你。',
    color: '#2BAE8A',
    lightColor: '#E8FBF5',
    avatar: { male: '物流调度男.png', female: '物流调度女.png' },
    emoji: '🚚',
    rarity: '约占所有测试者 14%',
    description: '你是行动派，不喜欢停在分析层面，现场感极强。你的价值在执行：能在变量极多的环境下保持节奏，让货准时到、不出错。你对流程和节点的掌控让团队踏实。',
    positions: ['物流运营 Logistics Operations', '仓储管理 Warehouse / WMS', '履约计划 Fulfillment Planner', '运输管理 Transportation', '配送网络 Distribution'],
    strengths: ['执行力强，现场问题能快速处理', '流程意识好，能建立稳定的作业节奏', '对物流节点熟悉，操作经验扎实'],
    risk: '如果只做执行、不积累数字化或成本分析的经历，晋升路径会越来越窄。',
    keywords: ['准时交付 / OTIF', '仓配管理', '运费优化', '3PL 管理', 'SLA 达成'],
    advice: {
      fresh: '电商、新能源、快消供应链都需要物流执行人才，优先找有自建仓或自建物流的公司，能见到更多真实场景。',
      career: '做久了执行想往上走，需要补两块短板：成本分析（能算清楚每单物流成本）和供应链全局视角（能说清楚物流在整个链路里的位置）。'
    }
  },
  {
    id: TYPES.MANUFACTURE,
    name: '制造运营型',
    englishName: 'Manufacturing / Operations',
    tagline: '别人还在会议室讨论，你已经在现场解决了。',
    color: '#E67E22',
    lightColor: '#FFF3E8',
    avatar: { male: '生产运营男.png', female: '生产运营女.png' },
    emoji: '🏭',
    rarity: '约占所有测试者 20%',
    description: '你在工厂现场如鱼得水，对产线、效率和质量有天然的敏感度。你的价值在于发现并解决真实的运营瓶颈，让生产更稳、更快、更省。',
    positions: ['生产控制 Production Control', 'NPI 导入计划 NPI Planner', '精益工程师 IE / Lean', '产能计划 Capacity Planner', '运营管理 Operations Manager'],
    strengths: ['现场感强，能快速定位实际问题', '执行力强，能推动一线问题快速闭环', '对流程和质量有执念，不放过细节'],
    risk: '如果只专注现场执行，缺少供应链全局视角和数据能力，往管理层晋升会遇到瓶颈。',
    keywords: ['生产计划 / 排产', 'NPI / Ramp-up', '精益 / Kaizen', '产能利用率', 'OEE'],
    advice: {
      fresh: '汽车、电子、半导体、消费品制造业都有大量这类岗位，优先找有规范 NPI 流程的公司，接触从研发到量产的完整链路。',
      career: '往上走需要补供应链全局视角（计划、采购、物流的逻辑）和数据能力（能用数字说明你的改善带来了什么结果）。'
    }
  },
  {
    id: TYPES.DATA,
    name: '数据洞察型',
    englishName: 'Supply Chain Analytics',
    tagline: '别人觉得数据枯燥，你觉得里面藏着所有答案。',
    color: '#9B59B6',
    lightColor: '#F5EDFF',
    avatar: { male: '数据分析男.png', female: '数据分析女.png' },
    emoji: '📊',
    rarity: '约占所有测试者 12%',
    description: '你对数字和工具有天然亲近感，不只是会做表，你喜欢把数据变成洞察和决策依据。你的价值在于让模糊的问题变得可见、可量化，一张好图能改变整个会议室的方向。',
    positions: ['供应链分析 SC Analyst', 'BI 分析师 BI Analyst', '数字化供应链 Digital SC', '计划系统专员 Planning System', 'AI 供应链产品 AI SC Product'],
    strengths: ['数据能力强，能从混乱数字里找规律', '逻辑严谨，分析有结构有结论', '工具学习快，Excel / SQL / Python 都能上手'],
    risk: '容易做纯报表、没有业务影响，简历看起来像"工具人"而不是"分析师"。',
    keywords: ['数据可视化', 'SQL / Python', '供应链看板', '根因分析', '预测模型'],
    advice: {
      fresh: '自学 SQL + Power BI 或 Tableau 是优先级最高的投入，项目经历要体现"分析之后推动了什么决策或改变"，而不只是"我做了一个看板"。',
      career: '从传统供应链转数字化方向，重点包装"用数据解决过什么具体业务问题"，不是"会什么工具"——工具是手段，业务影响才是卖点。'
    }
  },
  {
    id: TYPES.PROJECT,
    name: '项目变革型',
    englishName: 'Supply Chain PM / PMO',
    tagline: '你不是最懂技术的人，但你是让技术最终落地的人。',
    color: '#27AE60',
    lightColor: '#E8F8EE',
    avatar: { male: '项目管理男.png', female: '项目管理女.png' },
    emoji: '🚀',
    rarity: '约占所有测试者 20%',
    description: '你是典型的"没有你事情就会卡住"的人。擅长跨部门协调，能把混乱的目标拆解成清晰的节点，推进到结束。你的价值在于让多方行动起来，让复杂项目有结果。',
    positions: ['供应链 PM Supply Chain PM', 'NPI 项目管理 NPI PM', '供应链 PMO SC PMO', '变革管理 Transformation', '数字化转型 PM Digital PM'],
    strengths: ['协调能力强，能在多方利益中找到推进路径', '逻辑清晰，能把模糊目标变成可执行的节点', '推进到底，执行闭环不烂尾'],
    risk: '经验少时缺乏技术深度，容易被认为是"打杂的协调员"而不是项目管理专家。',
    keywords: ['项目管理 / PMO', 'NPI / EVT / DVT', '里程碑管理', '跨部门协调', '变革推进'],
    advice: {
      fresh: '找有完整 NPI 流程的制造业公司，主动参与从立项到量产的全流程项目，哪怕只负责一个模块，也要能说出"我推进了什么，结果是什么"。',
      career: '积累 PMP 或 CPIM 认证作为背书，把过去跨部门推进的经历用项目管理语言重新包装：不是"我协调了 XX 部门"，而是"我主导了 XX 项目，节点准时达成率 X%"。'
    }
  }
];
