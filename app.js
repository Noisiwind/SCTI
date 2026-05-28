// ============================================================
// SCTI 供应链岗位适配测试 — 交互逻辑 v3
// 新增：雷达图维度计算、第二名类型显示
// ============================================================

let userIdentity = null;
let userGender = null;
let currentQuestion = 0;
let scores = [0, 0, 0, 0, 0, 0];
let activeQuestions = [];
let radarChart = null;

// ==================== 雷达图维度权重矩阵 ====================
// 每种类型（PLANNER=0, PROCUREMENT=1, LOGISTICS=2, MANUFACTURE=3, DATA=4, PROJECT=5）
// 对6个维度的贡献分数
// 维度顺序：[数据敏感度, 逻辑推演力, 商业判断力, 现场执行力, 协同推进力, 流程细节力]
const DIMENSION_WEIGHTS = [
  [2, 4, 2, 0, 1, 2], // PLANNER
  [0, 1, 4, 0, 2, 0], // PROCUREMENT
  [1, 0, 0, 3, 1, 3], // LOGISTICS
  [0, 0, 0, 4, 0, 3], // MANUFACTURE
  [4, 3, 1, 0, 0, 1], // DATA
  [0, 2, 0, 2, 4, 0]  // PROJECT
];

const DIMENSION_LABELS = ['数据\n敏感度', '逻辑\n推演力', '商业\n判断力', '现场\n执行力', '协同\n推进力', '流程\n细节力'];

// ==================== 页面切换 ====================

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(pageId);
  el.classList.add('active');
  el.scrollTop = 0;
}

function goToIdentity() { showPage('page-gender'); }

function selectGender(gender) {
  userGender = gender;
  document.querySelectorAll('.gender-card').forEach(c => c.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  setTimeout(() => showPage('page-identity'), 300);
}

function selectIdentity(identity) {
  userIdentity = identity;
  document.querySelectorAll('.identity-card').forEach(c => c.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  setTimeout(startQuiz, 300);
}

// ==================== 答题流程 ====================

function startQuiz() {
  currentQuestion = 0;
  scores = [0, 0, 0, 0, 0, 0];
  activeQuestions = userIdentity === 'fresh' ? QUESTIONS_FRESH : QUESTIONS_CAREER;
  renderQuestion();
  showPage('page-quiz');
}

function renderQuestion() {
  const q = activeQuestions[currentQuestion];
  const total = activeQuestions.length;

  document.getElementById('progress-current').textContent = currentQuestion + 1;
  document.getElementById('progress-total').textContent = total;
  document.getElementById('progress-fill').style.width = (currentQuestion / total * 100) + '%';
  document.getElementById('question-text').textContent = q.text;

  const list = document.getElementById('options-list');
  list.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
      <span class="option-text">${opt.text}</span>
    `;
    btn.addEventListener('click', () => selectOption(opt.type, btn));
    list.appendChild(btn);
  });
}

function selectOption(typeIndex, clickedBtn) {
  if (clickedBtn.classList.contains('selected')) return;
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('selected');
    btn.disabled = true;
  });
  clickedBtn.classList.add('selected');
  scores[typeIndex] += 1;
  setTimeout(() => {
    currentQuestion++;
    currentQuestion < activeQuestions.length ? renderQuestion() : showResult();
  }, 380);
}

// ==================== 维度得分计算 ====================

function calcDimensionScores() {
  const dim = [0, 0, 0, 0, 0, 0];
  activeQuestions.forEach((q, qi) => {
    const chosen = scores; // 我们遍历每道题的所有选项权重
  });

  // 逐题重算：遍历所有题目，找出用户选了哪个 type
  // 因为 scores 只记录了每种类型的总次数，需要反推维度
  // 实际方法：按 scores 中每种类型被选中的次数 × 该类型对各维度的权重
  for (let t = 0; t < 6; t++) {
    for (let d = 0; d < 6; d++) {
      dim[d] += scores[t] * DIMENSION_WEIGHTS[t][d];
    }
  }

  // 归一化到 0-100
  const max = Math.max(...dim);
  if (max === 0) return [50, 50, 50, 50, 50, 50];
  return dim.map(v => Math.round((v / max) * 85 + 10)); // 保底10，最高95
}

// ==================== 结果展示 ====================

function showResult() {
  const maxScore = Math.max(...scores);
  const resultIndex = scores.indexOf(maxScore);
  const result = RESULTS[resultIndex];

  // 找第二名
  const scoresCopy = [...scores];
  scoresCopy[resultIndex] = -1;
  const secondIndex = scoresCopy.indexOf(Math.max(...scoresCopy));
  const secondResult = RESULTS[secondIndex];

  // 头部
  document.getElementById('result-header').style.backgroundColor = '';
  document.documentElement.style.setProperty('--theme', result.color);
  document.documentElement.style.setProperty('--theme-light', result.lightColor);

  document.getElementById('result-type-name').textContent = result.name;
  document.getElementById('result-english-name').textContent = result.englishName;
  document.getElementById('result-tagline').textContent = result.tagline;

  // 人物插图（有 avatar 字段的类型才显示）
  const avatarCard = document.getElementById('result-avatar-card');
  const avatarEl = document.getElementById('result-avatar');
  if (result.avatar) {
    avatarEl.src = userGender === 'female' ? result.avatar.female : result.avatar.male;
    avatarCard.style.display = 'block';
  } else {
    avatarCard.style.display = 'none';
  }

  // 第二名标签
  const badge = document.getElementById('result-second-badge');
  badge.textContent = `次要倾向：${secondResult.name}`;

  // 内容
  document.getElementById('result-description').textContent = result.description;
  document.getElementById('result-risk').textContent = result.risk;

  document.getElementById('result-positions').innerHTML = result.positions
    .map(p => `<span class="tag" style="background:${result.lightColor};color:${result.color}">${p}</span>`)
    .join('');

  document.getElementById('result-strengths').innerHTML = result.strengths
    .map(s => `<li>${s}</li>`).join('');

  document.getElementById('result-keywords').innerHTML = result.keywords
    .map(k => `<span class="keyword-tag">${k}</span>`).join('');

  const adviceTitleEl = document.getElementById('advice-title');
  const adviceEl = document.getElementById('result-advice');
  if (userIdentity === 'fresh') {
    adviceTitleEl.textContent = '给应届生的建议';
    adviceEl.textContent = result.advice.fresh;
  } else {
    adviceTitleEl.textContent = '给想换方向的你';
    adviceEl.textContent = result.advice.career;
  }

  // advice卡片边框色
  const adviceCard = document.querySelector('.result-card--advice');
  if (adviceCard) adviceCard.style.borderColor = result.color;

  showPage('page-result');

  // 延迟渲染雷达图（等DOM进入视口）
  setTimeout(() => renderRadar(result.color), 150);
}

// ==================== ECharts 雷达图 ====================

function renderRadar(themeColor) {
  const el = document.getElementById('radar-chart');
  if (!el) return;

  if (radarChart) {
    radarChart.dispose();
    radarChart = null;
  }

  radarChart = echarts.init(el, null, { renderer: 'svg' });
  const dimScores = calcDimensionScores();

  const option = {
    backgroundColor: 'transparent',
    radar: {
      indicator: DIMENSION_LABELS.map((name, i) => ({
        name: name.replace('\n', ' '),
        max: 100
      })),
      center: ['50%', '50%'],
      radius: '62%',
      startAngle: 90,
      splitNumber: 3,
      axisName: {
        color: '#777',
        fontSize: 11,
        fontFamily: 'DM Sans, PingFang SC, sans-serif',
        lineHeight: 16
      },
      splitLine: {
        lineStyle: { color: '#e2e2de', width: 1 }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.03)']
        }
      },
      axisLine: { lineStyle: { color: '#e2e2de' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: dimScores,
        name: '能力维度',
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: themeColor, width: 2 },
        areaStyle: {
          color: themeColor,
          opacity: 0.12
        },
        itemStyle: { color: themeColor }
      }],
      animation: true,
      animationDuration: 800,
      animationEasing: 'cubicOut'
    }]
  };

  radarChart.setOption(option);

  // 响应窗口 resize
  window.addEventListener('resize', () => {
    if (radarChart) radarChart.resize();
  });
}

// ==================== 重新测试 ====================

function restartQuiz() {
  userIdentity = null;
  userGender = null;
  currentQuestion = 0;
  scores = [0, 0, 0, 0, 0, 0];
  activeQuestions = [];
  if (radarChart) { radarChart.dispose(); radarChart = null; }
  showPage('page-welcome');
}
