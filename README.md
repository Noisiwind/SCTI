# SCTI · 供应链岗位适配测试

**Supply Chain Type Indicator** — 3分钟测出你适合供应链哪个方向

🔗 **在线体验：** [noisiwind.github.io/SCTI](https://noisiwind.github.io/SCTI)

---

## 是什么

SCTI 是一个面向供应链求职者的职业倾向测试工具，帮助用户快速判断自己在供应链六大方向中最适合的定位。

区别于市面上的 MBTI 类泛性格测试，SCTI 专注于**供应链职业场景下的行为偏好**，每道题都是真实工作/生活情境，通过第一反应判断底层思维模式，而非让用户主动选择"我想从事哪个职位"。

---

## 六种类型

| 类型 | 英文 | 核心特质 |
|------|------|---------|
| 计划大脑型 | Supply Chain Planner | 逻辑推演、供需建模、预测规划 |
| 采购谈判型 | Procurement / Sourcing | 商业判断、资源获取、成本优化 |
| 物流履约型 | Logistics / Fulfillment | 节点管控、流程执行、准时交付 |
| 制造运营型 | Manufacturing / Operations | 现场响应、效率改善、瓶颈突破 |
| 数据洞察型 | Supply Chain Analytics | 数据驱动、根因分析、可视化决策 |
| 项目变革型 | Supply Chain PM / PMO | 跨部门协调、里程碑推进、变革落地 |

---

## 功能特性

- **双题库**：应届生（生活场景）/ 有工作经验（职场场景）各12题
- **加权计分**：主类型 +2 分，复合维度副类型 +1 分，结果更精准
- **雷达图分析**：六维能力可视化（数据敏感度、逻辑推演力、商业判断力、现场执行力、协同推进力、流程细节力）
- **次要倾向**：显示第二高分类型，呈现复合特质
- **分享卡**：一键生成截图友好的分享卡片，含人物插图
- **探索全部类型**：测完可自由浏览其余5种类型的完整结果
- **上一题导航**：可回退修改答案
- **性别插图**：每种类型配有男女版人物插图

---

## 技术栈

- 纯原生 HTML / CSS / JavaScript，无框架依赖
- [ECharts 5](https://echarts.apache.org/) 雷达图可视化
- Google Fonts（Noto Serif SC / Noto Sans SC / DM Sans）
- 部署于 GitHub Pages

---

## 本地运行

```bash
git clone https://github.com/Noisiwind/SCTI.git
cd SCTI
# 用任意静态服务器打开，例如：
npx serve .
# 或直接用浏览器打开 index.html
```

---

## 文件结构

```
SCTI/
├── index.html       # 主页面，包含所有页面结构
├── app.js           # 交互逻辑、计分、雷达图
├── data.js          # 题库数据 + 6种类型结果数据
├── style.css        # 样式系统
└── *.png            # 人物插图（12张，每种类型男女各一）
```

---

## 设计者

[@Noisiwind](https://xhslink.com/m/8VBWpXIrnSA) · 小红书

对结果有疑问或想进一步探讨职业方向，欢迎来找我。
