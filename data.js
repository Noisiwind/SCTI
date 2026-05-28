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
// 应届生题库（12题，每种类型恰好出现8次）
// ============================================================
const QUESTIONS_FRESH = [
  {
    id: 1,
    text: '你看到一组复杂数据时，第一反应是什么？',
    options: [
      { text: '先看整体趋势和关键异常，判断哪里不对劲', type: TYPES.DATA },
      { text: '先看目标有没有达成，差距来自需求、资源还是节奏', type: TYPES.PLANNER },
      { text: '先看成本、价格和外部条件有没有出现变化', type: TYPES.PROCUREMENT },
      { text: '先看事项流转状态，哪个环节出现了卡顿或遗漏', type: TYPES.LOGISTICS }
    ]
  },
  {
    id: 2,
    text: '你平时更容易被哪类信息吸引？',
    options: [
      { text: '一件事的整体节奏和先后安排是否合理', type: TYPES.PLANNER },
      { text: '某个东西到底值不值、有没有更好的选择', type: TYPES.PROCUREMENT },
      { text: '某个流程或操作有没有可以提升效率的地方', type: TYPES.MANUFACTURE },
      { text: '谁负责什么、有没有人在跟进、有没有出现卡点', type: TYPES.PROJECT }
    ]
  },
  {
    id: 3,
    text: '遇到一个复杂问题，没有标准答案，你更倾向于？',
    options: [
      { text: '把问题拆开，找出关键变量，一层一层推导', type: TYPES.PLANNER },
      { text: '梳理整件事的流转路径，找出哪个节点卡住了', type: TYPES.LOGISTICS },
      { text: '直接动手试一个方案，在实践中找答案', type: TYPES.MANUFACTURE },
      { text: '找相关人一起讨论，整合多方视角再决策', type: TYPES.PROJECT }
    ]
  },
  {
    id: 4,
    text: '和朋友一起组织一次旅行，你最容易主动承担哪块？',
    options: [
      { text: '把出发时间、住宿、行程节奏排成一个完整方案', type: TYPES.PLANNER },
      { text: '搜几个酒店和交通选项，比较价格和服务是否划算靠谱', type: TYPES.PROCUREMENT },
      { text: '做一个共享文档，把预算、路线、待办和风险都列清楚', type: TYPES.DATA },
      { text: '收集所有人的时间和偏好，推动大家拍板决定', type: TYPES.PROJECT }
    ]
  },
  {
    id: 5,
    text: '朋友说想开一家小店，你的第一反应更接近哪种？',
    options: [
      { text: '先看租金、原料、人力和毛利，判断这门生意赚不赚钱', type: TYPES.PROCUREMENT },
      { text: '先想每天货怎么进、怎么存、怎么卖，流转能不能跑顺', type: TYPES.LOGISTICS },
      { text: '先研究周边同类店的情况，找出市场机会和差异化方向', type: TYPES.DATA },
      { text: '先做一个开店推进表，明确选址、装修、试营业的节点', type: TYPES.PROJECT }
    ]
  },
  {
    id: 6,
    text: '你在选择一份实习/工作机会时，最先看什么？',
    options: [
      { text: '这个岗位能不能训练系统性地思考和安排事情的能力', type: TYPES.PLANNER },
      { text: '这个岗位是不是流程清晰、事情具体，能快速上手', type: TYPES.LOGISTICS },
      { text: '这个岗位能不能接触一线操作，解决真实运转中的问题', type: TYPES.MANUFACTURE },
      { text: '这个岗位能不能接触到数据，让我从中发现规律和问题', type: TYPES.DATA }
    ]
  },
  {
    id: 7,
    text: '活动现场突发状况（设备坏了/场地有问题），你的第一反应是？',
    options: [
      { text: '快速找外部替代方案或资源，让现场继续运转', type: TYPES.PROCUREMENT },
      { text: '直接上手看能不能解决，先让现场稳下来', type: TYPES.MANUFACTURE },
      { text: '先判断影响范围有多大，决定要不要升级处理', type: TYPES.DATA },
      { text: '立刻通知相关人各就各位，明确分工各自处理', type: TYPES.PROJECT }
    ]
  },
  {
    id: 8,
    text: '小组作业分工后，有人突然说完不成自己的部分，你会？',
    options: [
      { text: '重新评估整体进度，看哪些地方需要调整节奏', type: TYPES.PLANNER },
      { text: '先确认手头已有的内容，看能不能接过来先跑', type: TYPES.LOGISTICS },
      { text: '先看他的进度到哪了，评估差距有多大再决定怎么处理', type: TYPES.DATA },
      { text: '召集大家快速对齐，重新分工确保按时交付', type: TYPES.PROJECT }
    ]
  },
  {
    id: 9,
    text: '团队任务卡住了，几个人意见不统一，你更可能做什么？',
    options: [
      { text: '分析几种方案各自的成本和代价，帮大家做取舍', type: TYPES.PROCUREMENT },
      { text: '先把大家已经完成的部分整理清楚，找到可以继续推进的地方', type: TYPES.LOGISTICS },
      { text: '直接动手先推进一个方向，边做边调整', type: TYPES.MANUFACTURE },
      { text: '召集大家开个短会，把各方诉求说清楚，推动达成共识', type: TYPES.PROJECT }
    ]
  },
  {
    id: 10,
    text: '活动马上开始，你最容易反复确认什么？',
    options: [
      { text: '整体时间节奏和各环节衔接有没有问题', type: TYPES.PLANNER },
      { text: '外部资源和物资有没有全部到位', type: TYPES.PROCUREMENT },
      { text: '现场的设备、布置和操作流程准备好了没有', type: TYPES.MANUFACTURE },
      { text: '报名人数、预期到场率和反馈渠道是否正常', type: TYPES.DATA }
    ]
  },
  {
    id: 11,
    text: '你做完一件事，最后一步通常会做什么？',
    options: [
      { text: '对照最初的目标，看结果有没有达到预期', type: TYPES.PLANNER },
      { text: '核算这次的投入和产出，值不值、有没有可优化的地方', type: TYPES.PROCUREMENT },
      { text: '确认每个步骤都按顺序完成了，有没有遗漏', type: TYPES.LOGISTICS },
      { text: '检查最终结果，有没有质量问题或可以改进的地方', type: TYPES.MANUFACTURE }
    ]
  },
  {
    id: 12,
    text: '如果让你负责一个社团或小团队的物资管理，你会先做什么？',
    options: [
      { text: '规划领取、存放、归还的流程，保证每次进出有记录', type: TYPES.LOGISTICS },
      { text: '把常用物资分类整理，确保需要时能快速找到', type: TYPES.MANUFACTURE },
      { text: '做一个表格，记录库存数量、使用情况和异常', type: TYPES.DATA },
      { text: '先和各组确认他们的需求，再统一规划采购和管理方式', type: TYPES.PROJECT }
    ]
  }
];

// ============================================================
// 社招题库（15题，每种类型恰好出现10次）
// ============================================================
const QUESTIONS_CAREER = [
  {
    id: 1,
    text: '你收到一份供应链月度数据报告，第一眼会看什么？',
    options: [
      { text: '整体趋势和关键异常，判断哪里出现了明显偏移', type: TYPES.DATA },
      { text: '供需平衡和计划达成，看节奏和预测有没有偏差', type: TYPES.PLANNER },
      { text: '外部资源侧的变化，价格走势或合作方的稳定性', type: TYPES.PROCUREMENT },
      { text: '货物流转的时效和异常，哪个环节出现了卡顿', type: TYPES.LOGISTICS }
    ]
  },
  {
    id: 2,
    text: '日常工作中，你更容易主动关注哪类信息？',
    options: [
      { text: '需求、库存、产能三者有没有出现失衡的信号', type: TYPES.PLANNER },
      { text: '市场上有没有更好的资源条件或供应替代方案', type: TYPES.PROCUREMENT },
      { text: '生产现场的效率、质量或操作是否有可以改进的地方', type: TYPES.MANUFACTURE },
      { text: '各项目进展有没有延误，各方有没有对齐在同一节奏上', type: TYPES.PROJECT }
    ]
  },
  {
    id: 3,
    text: '面对一个跨部门的复杂问题，你的切入点是？',
    options: [
      { text: '先把整体逻辑和时间节点梳理清楚，找到核心约束', type: TYPES.PLANNER },
      { text: '跟着货物或信息的流动路径走一遍，找出哪个节点卡住了', type: TYPES.LOGISTICS },
      { text: '到现场看，先搞清楚实际操作是怎么运转的', type: TYPES.MANUFACTURE },
      { text: '梳理各方目标和诉求，找到推进共识的路径', type: TYPES.PROJECT }
    ]
  },
  {
    id: 4,
    text: '收到一个模糊的业务需求，你的第一步是？',
    options: [
      { text: '先评估外部能不能满足这个需求，以及需要什么条件', type: TYPES.PROCUREMENT },
      { text: '先判断这个需求对现有流转和仓储运作有什么影响', type: TYPES.LOGISTICS },
      { text: '先找数据，把需求的实际规模和优先级说清楚', type: TYPES.DATA },
      { text: '先和提需求的人对齐目标，确认优先级和可接受的边界', type: TYPES.PROJECT }
    ]
  },
  {
    id: 5,
    text: '需要在几种方案中做决策，但信息不完整。你会？',
    options: [
      { text: '评估各方案对供需节奏的影响，找出约束最少的路径', type: TYPES.PLANNER },
      { text: '从执行可行性出发，判断哪个方案现场能跑通', type: TYPES.MANUFACTURE },
      { text: '用现有数据快速分析，缩小不确定性再决策', type: TYPES.DATA },
      { text: '召集相关人，把每种方案的风险和收益对齐一遍再拍板', type: TYPES.PROJECT }
    ]
  },
  {
    id: 6,
    text: '参与一个供应链降本项目，你最自然的切入点是？',
    options: [
      { text: '先看外部资源有没有更优的选择，或者现有条件能不能优化', type: TYPES.PROCUREMENT },
      { text: '优化货物流转路线或作业频次，减少不必要的流转成本', type: TYPES.LOGISTICS },
      { text: '分析现场操作，找出物料损耗或无效工序的根源', type: TYPES.MANUFACTURE },
      { text: '先建成本分析模型，找出单位成本最高的环节在哪里', type: TYPES.DATA }
    ]
  },
  {
    id: 7,
    text: '老板说明年要"提升效率、控制成本"。你最先想到的是？',
    options: [
      { text: '优化供需平衡策略，减少过量备货和紧急补货带来的浪费', type: TYPES.PLANNER },
      { text: '重新审视资源结构，看有没有更优的替代方案或合作条件', type: TYPES.PROCUREMENT },
      { text: '先对效率和成本数据做一次全面分析，找出最大的优化空间', type: TYPES.DATA },
      { text: '把改善目标拆解成项目，拉各部门共同制定行动计划', type: TYPES.PROJECT }
    ]
  },
  {
    id: 8,
    text: '生产线突然停机，今天发货目标可能完不成，你先做什么？',
    options: [
      { text: '协调运力和仓库，看能不能用备用方案保住最紧急的订单', type: TYPES.LOGISTICS },
      { text: '到现场了解停机原因，判断能最快恢复的时间节点', type: TYPES.MANUFACTURE },
      { text: '查系统，评估已完工的货物能覆盖哪些订单', type: TYPES.DATA },
      { text: '快速拉相关方对齐影响范围，决定是否需要对客户预警', type: TYPES.PROJECT }
    ]
  },
  {
    id: 9,
    text: '核心物料供应商通知断货三周，你的应对思路是？',
    options: [
      { text: '重新计算未来三周的生产计划，评估影响范围，重排优先级', type: TYPES.PLANNER },
      { text: '立刻联系备用资源，评估能否快速切换或紧急补货', type: TYPES.PROCUREMENT },
      { text: '调查在途库存和其他仓库是否有调拨可能', type: TYPES.LOGISTICS },
      { text: '到工厂了解实际缺料影响，看能否调整生产顺序减少损失', type: TYPES.MANUFACTURE }
    ]
  },
  {
    id: 10,
    text: '跨部门项目推进总是在对齐上卡壳，你的做法是？',
    options: [
      { text: '把整体计划和各节点依赖关系画清楚，让大家看到卡在哪', type: TYPES.PLANNER },
      { text: '从执行层面切入，先把能落地的部分推动起来', type: TYPES.LOGISTICS },
      { text: '用数据说明当前的卡点带来了多大的业务影响', type: TYPES.DATA },
      { text: '建立固定对齐机制，让推进节奏固定下来', type: TYPES.PROJECT }
    ]
  },
  {
    id: 11,
    text: '公司推一个改善项目，但大家都很忙，参与度低。你会？',
    options: [
      { text: '把改善对成本节省的潜力量化出来，让利益可见', type: TYPES.PROCUREMENT },
      { text: '从一线操作出发，先解决一个具体问题让人看到变化', type: TYPES.MANUFACTURE },
      { text: '用数据说明现在的问题有多严重，制造改变的紧迫感', type: TYPES.DATA },
      { text: '把项目正式立项，明确责任人和里程碑，让推进有依据', type: TYPES.PROJECT }
    ]
  },
  {
    id: 12,
    text: '某个操作流程里有个步骤频繁出错。你会？',
    options: [
      { text: '分析这个错误对下游计划和交付的影响，评估改善优先级', type: TYPES.PLANNER },
      { text: '看这个步骤有没有涉及外部资源，从源头能否解决', type: TYPES.PROCUREMENT },
      { text: '重新梳理这个步骤的操作规范，设计防错机制', type: TYPES.LOGISTICS },
      { text: '召集相关人把根因找出来，制定改善方案并推动落地', type: TYPES.PROJECT }
    ]
  },
  {
    id: 13,
    text: '月末复盘，一个关键指标没达成，你最想搞清楚什么？',
    options: [
      { text: '计划在哪个环节出了偏差，预测和实际为什么差这么多', type: TYPES.PLANNER },
      { text: '外部配合侧有没有问题，有没有影响最终结果', type: TYPES.PROCUREMENT },
      { text: '现场执行哪里出了问题，是操作失误还是流程本身有缺陷', type: TYPES.MANUFACTURE },
      { text: '数据上有没有早期预警信号，当时为什么没有被发现和响应', type: TYPES.DATA }
    ]
  },
  {
    id: 14,
    text: '公司要推一个战略项目，你被要求参与。你最自然承担的角色是？',
    options: [
      { text: '把项目对供需端的影响评估清楚，确保计划层面可行', type: TYPES.PLANNER },
      { text: '负责物流和仓储的配套落地，保证实物端能跟上', type: TYPES.LOGISTICS },
      { text: '负责工厂/产线侧的配合，确保生产端能执行', type: TYPES.MANUFACTURE },
      { text: '主导整个项目的推进，把各方资源和节点协调到位', type: TYPES.PROJECT }
    ]
  },
  {
    id: 15,
    text: '公司要提升供应链响应速度，你的切入点是？',
    options: [
      { text: '建立更灵活的资源合作机制，缩短关键物料的响应周期', type: TYPES.PROCUREMENT },
      { text: '优化仓储布局和物流节点，减少货物实际流动时间', type: TYPES.LOGISTICS },
      { text: '精简现场换线和物料准备流程，提升产线响应能力', type: TYPES.MANUFACTURE },
      { text: '建立预警和监控机制，让问题在恶化之前被发现并处理', type: TYPES.DATA }
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
