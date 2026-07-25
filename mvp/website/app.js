const STORAGE_KEY = "ai-operating-company-v0.1";

const seedData = {
  meta: { version: "0.2.0", companyName: "AI Operating Company", level: 12, xp: 7240, xpGoal: 10000 },
  divisions: [
    { id: "div-enterprise", name: "Enterprise", mission: "企業のAI変革を設計する", color: "#77aaff", budget: 2400000, revenue: 1280000, status: "active" },
    { id: "div-creator", name: "Creator", mission: "知識を売れる資産に変える", color: "#d9ff57", budget: 1200000, revenue: 860000, status: "active" },
    { id: "div-character", name: "Character", mission: "愛されるIPと世界観を育てる", color: "#ff8fc7", budget: 800000, revenue: 340000, status: "active" },
    { id: "div-research", name: "Research", mission: "次の事業機会を探索する", color: "#74e8ba", budget: 600000, revenue: 0, status: "research" }
  ],
  agents: [
    { id: "agt-001", name: "LUMI", role: "CEO Strategist", divisionId: "div-enterprise", status: "working", output: "法人AI導入プラン v2", nextTask: "価格モデルの感度分析", performance: 92 },
    { id: "agt-002", name: "KAI", role: "Product Architect", divisionId: "div-creator", status: "working", output: "Creator Kit プロトタイプ", nextTask: "販売ページの構成設計", performance: 88 },
    { id: "agt-003", name: "MIO", role: "Brand Director", divisionId: "div-character", status: "review", output: "キャラクター世界観ガイド", nextTask: "監督レビューを反映", performance: 84 },
    { id: "agt-004", name: "REI", role: "Research Analyst", divisionId: "div-research", status: "working", output: "AI市場機会レポート #07", nextTask: "競合シグナルを分類", performance: 95 },
    { id: "agt-005", name: "NOVA", role: "Growth Operator", divisionId: "div-creator", status: "idle", output: "販売導線テスト結果", nextTask: "承認待ち", performance: 79 },
    { id: "agt-006", name: "SENA", role: "Sales Agent", divisionId: "div-enterprise", status: "working", output: "商談提案書 3件", nextTask: "見込み客12社へ提案", performance: 87 }
  ],
  products: [
    { id: "PRD-0001", name: "1業務7日ラボ", divisionId: "div-enterprise", stage: "selling", price: 4980, ownerId: "agt-006", progress: 85, sales: 0, salesUrl: "https://one-work-seven-day-lab.hogehoge24.chatgpt.site" },
    { id: "prd-001", name: "AI経営設計 Sprint", divisionId: "div-enterprise", stage: "selling", price: 480000, ownerId: "agt-001", progress: 100, sales: 3 },
    { id: "prd-002", name: "Creator OS Starter Kit", divisionId: "div-creator", stage: "production", price: 19800, ownerId: "agt-002", progress: 68, sales: 0 },
    { id: "prd-003", name: "MIRA Character Pack", divisionId: "div-character", stage: "idea", price: 4800, ownerId: "agt-003", progress: 22, sales: 0 },
    { id: "prd-004", name: "AI Opportunity Radar", divisionId: "div-research", stage: "improvement", price: 9800, ownerId: "agt-004", progress: 82, sales: 17 }
  ],
  kpis: [
    { month: "2026-02", revenue: 1180000, target: 2000000 },
    { month: "2026-03", revenue: 1420000, target: 2200000 },
    { month: "2026-04", revenue: 1670000, target: 2400000 },
    { month: "2026-05", revenue: 1910000, target: 2600000 },
    { month: "2026-06", revenue: 2180000, target: 2800000 },
    { month: "2026-07", revenue: 2480000, target: 3000000 }
  ],
  improvements: [
    { id: "imp-001", title: "高単価商品の成約率を優先改善", detail: "Enterpriseの提案書を業種別に分岐すると、商談から成約への転換率が約14%改善する見込みです。" },
    { id: "imp-002", title: "Creator商品の制作時間を短縮", detail: "共通テンプレートを部品化し、KAIとNOVAの並列作業へ切り替える余地があります。" }
  ],
  decisions: [
    { id: "dec-003", date: "2026-07-23", title: "Creator OSの先行販売を開始", status: "approved", supervisor: "監督", reason: "顧客インタビューで需要が確認でき、最小構成で検証可能なため。" },
    { id: "dec-002", date: "2026-07-20", title: "Character Packの広告出稿", status: "rejected", supervisor: "監督", reason: "世界観と販売ページの整合性を先に高める必要があるため。" },
    { id: "dec-001", date: "2026-07-18", title: "Research週報の自動生成", status: "approved", supervisor: "監督", reason: "探索速度を上げつつ、人間の判断ポイントを保持できるため。" }
  ],
  activities: [
    { time: "09:42", agentId: "agt-002", text: "Creator Kitの第3章を完成しました", type: "output" },
    { time: "09:18", agentId: "agt-006", text: "新規商談候補を12社抽出しました", type: "sales" },
    { time: "08:55", agentId: "agt-004", text: "市場シグナルを4件検知しました", type: "research" },
    { time: "08:31", agentId: "agt-003", text: "監督レビューを申請しました", type: "review" }
  ],
  meetings: []
  ,
  tasks: [
    { id:"TSK-0001", title:"STORES販売導線を開通する", productId:"PRD-0001", priority:"P0", status:"supervisor_review", owner:"監督", due:"", blocker:"販売URLの発行待ち。詳細はPrivateなNotionで管理。", nextAction:"STORESの商品URLを発行し、AI COOへ連携する。" }
  ],
  sync: { source:"Notion", syncedAt:"2026-07-25T00:00:00+09:00", mode:"public-safe-snapshot" },
  memories: [
    {
      id: "mem-sales-email-setup",
      category: "sales",
      title: "営業メール送信前の独自ドメイン設定",
      triggerKeywords: ["営業", "提案", "商談", "見込み客", "販売開始", "メール送信", "アウトバウンド"],
      proposal: "営業メールを送る直前に、contact@aetheratelier.jp の送信環境を有効化してください。受信転送は稼働済みです。",
      checklist: [
        "ImprovMX Lightを契約する（年50ドル・1日25通）",
        "contact@aetheratelier.jp のSMTP Credentialsを作成する",
        "Value DomainへDKIM・DMARCレコードを追加する",
        "Gmailの「他のメールアドレスを追加」でSMTPを設定する",
        "別メールアドレス宛に到達・迷惑メール判定をテストする"
      ],
      priority: "P0",
      status: "active",
      updatedAt: "2026-07-25T23:40:00+09:00"
    }
  ]
};

let state = loadState();
let currentView = "dashboard";

const content = document.querySelector("#app-content");
const dialog = document.querySelector("#entity-dialog");
const form = document.querySelector("#entity-form");
const fields = document.querySelector("#dialog-fields");
const yen = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });
const compactYen = value => value >= 10000 ? `¥${(value / 10000).toFixed(value % 10000 ? 1 : 0)}万` : yen.format(value);
const safe = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const byId = (list, id) => list.find(item => item.id === id);
const divisionOf = id => byId(state.divisions, id) || { name: "未所属", color: "#83948b" };
const agentOf = id => byId(state.agents, id) || { name: "未設定" };

function clone(data) { return JSON.parse(JSON.stringify(data)); }
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return clone(seedData);
    const parsed = JSON.parse(saved);
    const merged = { ...clone(seedData), ...parsed };
    if (!merged.products.some(product => product.id === "PRD-0001")) {
      merged.products.unshift(clone(seedData.products[0]));
    }
    merged.tasks = Array.isArray(parsed.tasks) ? parsed.tasks : clone(seedData.tasks);
    merged.sync = clone(seedData.sync);
    merged.meta = { ...merged.meta, version: seedData.meta.version };
    return merged;
  } catch { return clone(seedData); }
}
function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function toast(message) {
  const el = document.querySelector("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2400);
}
function emptyState() {
  return document.querySelector("#empty-template").innerHTML;
}
function statusLabel(status) {
  return ({ working:"稼働中", review:"レビュー", idle:"待機中", approved:"承認", rejected:"却下", pending:"審議中", selling:"販売中", production:"制作中", idea:"企画中", improvement:"改善中", supervisor_review:"監督確認", paused:"保留", research:"調査中", completed:"完了" })[status] || status;
}
function stageIndex(stage) { return ({ idea:1, production:2, selling:3, improvement:4 })[stage] || 1; }
function recallMemories(context) {
  const normalized = String(context || "").toLowerCase();
  return (state.memories || []).filter(memory =>
    memory.status === "active" &&
    memory.triggerKeywords.some(keyword => normalized.includes(keyword.toLowerCase()))
  );
}
function salesContext() {
  return [
    ...state.products.filter(product => product.stage === "selling").map(product => `${product.name} 販売開始 営業`),
    ...state.agents.map(agent => agent.nextTask),
    ...(state.tasks || []).filter(task => task.status !== "completed").map(task => `${task.title} ${task.nextAction}`)
  ].join(" ");
}
function memoryRecallHtml(memories, sourceLabel) {
  if (!memories.length) return "";
  return `<section class="memory-recall">
    <div class="memory-recall-head">
      <div><span>MEMORY RECALL / ${safe(sourceLabel)}</span><h3>過去の判断から、実行前チェックを呼び出しました</h3></div>
      <span class="badge pending">${memories.length}件</span>
    </div>
    <div class="memory-grid">${memories.map(memory => `<article class="memory-card">
      <div class="memory-card-top"><span class="badge rejected">${safe(memory.priority)}</span><small>${safe(memory.category).toUpperCase()}</small></div>
      <h4>${safe(memory.title)}</h4>
      <p>${safe(memory.proposal)}</p>
      <ol>${memory.checklist.map(item => `<li>${safe(item)}</li>`).join("")}</ol>
      <button class="ghost-button" data-action="memory-to-task" data-memory="${safe(memory.id)}">実行タスクへ追加</button>
    </article>`).join("")}</div>
  </section>`;
}
function sectionIntro(title, description, action, label) {
  return `<div class="view-intro"><div><h2>${title}</h2><p>${description}</p></div>${action ? `<button class="primary-button" data-action="${action}">${label}</button>` : ""}</div>`;
}
function metric(label, value, foot, color = "var(--accent)") {
  return `<article class="metric-card" style="--tone:${color}"><div class="metric-label"><span>${label}</span><i></i></div><div class="metric-value">${value}</div><div class="metric-foot">${foot}</div></article>`;
}

function renderDashboard() {
  const latest = state.kpis.at(-1) || { revenue: 0, target: 0 };
  const attainment = latest.target ? Math.round(latest.revenue / latest.target * 100) : 0;
  const working = state.agents.filter(a => a.status === "working").length;
  const pending = state.decisions.filter(d => d.status === "pending").length;
  const firstTask = state.tasks?.find(task => task.status !== "completed");
  const recalledMemories = recallMemories(salesContext());
  const rooms = state.divisions.map(div => {
    const agents = state.agents.filter(a => a.divisionId === div.id);
    return `<div class="office-room" style="--room-color:${div.color}">
      <div class="room-label"><strong>${safe(div.name).toUpperCase()}</strong><i></i></div>
      <div class="agent-desk-grid">${agents.map(a => `<div class="agent-avatar" title="${safe(a.role)} / ${statusLabel(a.status)}">
        <span class="status-dot status-${a.status}"></span><div class="avatar-orb" style="--avatar-color:${div.color}">${safe(a.name.slice(0,2))}</div><small>${safe(a.name)}</small>
      </div>`).join("") || `<small>配属待ち</small>`}</div>
    </div>`;
  }).join("");
  const activity = state.activities.map(item => {
    const agent = agentOf(item.agentId);
    return `<div class="activity-item"><span class="activity-icon">${item.type === "sales" ? "¥" : item.type === "research" ? "⌁" : item.type === "review" ? "?" : "✓"}</span>
      <p><strong>${safe(agent.name)}</strong> が${safe(item.text)}</p><time>${safe(item.time)}</time></div>`;
  }).join("");
  const divisionProgress = state.divisions.map(div => {
    const rate = div.budget ? Math.min(100, Math.round(div.revenue / div.budget * 100)) : 0;
    return `<div class="progress-row"><div class="progress-copy"><span>${safe(div.name)}</span><strong>${rate}%</strong></div><div class="progress-track"><i style="width:${rate}%;--bar-color:${div.color}"></i></div></div>`;
  }).join("");
  content.innerHTML = `
    ${sectionIntro("会社の現在地", "AI社員の稼働、事業進捗、監督判断をリアルタイムで俯瞰します。")}
    ${memoryRecallHtml(recalledMemories, "LIVE OPERATIONS")}
    <div class="metric-grid">
      ${metric("MONTHLY REVENUE", compactYen(latest.revenue), `<strong>目標の ${attainment}%</strong> / ${compactYen(latest.target)}`)}
      ${metric("ACTIVE AGENTS", `${working}<small> / ${state.agents.length}</small>`, "AI社員が現在稼働中", "var(--accent-2)")}
      ${metric("PRODUCTS", state.products.length, `<strong>${state.products.filter(p => p.stage === "selling").length}件</strong> が販売フェーズ`, "var(--info)")}
      ${metric("DECISIONS", pending, pending ? "監督の判断を待っています" : "<strong>承認待ちはありません</strong>", "var(--warning)")}
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-header"><h3>AI OFFICE / LIVE</h3><small>${working} AGENTS WORKING</small></div><div class="office-floor">${rooms}</div></section>
      <section class="panel"><div class="panel-header"><h3>ACTIVITY STREAM</h3><small>TODAY</small></div><div class="activity-list">${activity || emptyState()}</div></section>
      <section class="panel"><div class="panel-header"><h3>DIVISION PERFORMANCE</h3><small>REVENUE / BUDGET</small></div><div class="progress-section">${divisionProgress}</div></section>
      <section class="panel"><div class="panel-header"><h3>FIRST TASK / NOTION</h3><small>${firstTask ? "ACTION REQUIRED" : "CLEAR"}</small></div>
        ${firstTask ? `<div class="first-task">
          <div class="meeting-meta"><span class="badge rejected">${safe(firstTask.priority)}</span><span class="badge review">${statusLabel(firstTask.status)}</span><small>${safe(firstTask.owner)} / ${safe(firstTask.due || "期限未設定")}</small></div>
          <h3>${safe(firstTask.title)}</h3>
          <p>${safe(firstTask.nextAction)}</p>
          <div class="task-blocker"><strong>依存・阻害</strong><span>${safe(firstTask.blocker)}</span></div>
          ${firstTask.notionUrl ? `<a class="ghost-button notion-link" href="${safe(firstTask.notionUrl)}" target="_blank" rel="noopener">Notionで開く ↗</a>` : `<small>詳細はPrivateなNotionで管理</small>`}
        </div>` : `<div class="suggestion"><strong>未完了タスクはありません</strong><p>次の作戦会議から実行候補を作成してください。</p></div>`}
      </section>
    </div>`;
}

function renderDivisions() {
  content.innerHTML = `${sectionIntro("事業部ポートフォリオ", "ミッション、配属、人員、収益性を事業単位で管理します。", "add-division", "＋ 事業部を追加")}
    <div class="card-grid">${state.divisions.map(div => {
      const agents = state.agents.filter(a => a.divisionId === div.id);
      const products = state.products.filter(p => p.divisionId === div.id);
      const rate = div.budget ? Math.round(div.revenue / div.budget * 100) : 0;
      return `<article class="division-card" style="border-top:2px solid ${div.color}">
        <div class="card-top"><div><p>${safe(div.mission)}</p><h3>${safe(div.name)}</h3></div><span class="badge working">${safe(div.status)}</span></div>
        <div class="card-stats"><div class="mini-stat"><span>AI社員</span><strong>${agents.length}名</strong></div><div class="mini-stat"><span>商品</span><strong>${products.length}件</strong></div><div class="mini-stat"><span>売上</span><strong>${compactYen(div.revenue)}</strong></div><div class="mini-stat"><span>予算比</span><strong>${rate}%</strong></div></div>
        <div class="progress-track"><i style="width:${Math.min(rate,100)}%;--bar-color:${div.color}"></i></div>
      </article>`;
    }).join("") || emptyState()}</div>`;
}

function renderAgents() {
  content.innerHTML = `${sectionIntro("AI社員名簿", "役割、稼働状態、成果物、次のタスクを一つの画面で把握します。", "add-agent", "＋ AI社員を採用")}
    <div class="card-grid">${state.agents.map(agent => {
      const div = divisionOf(agent.divisionId);
      return `<article class="agent-card">
        <div class="card-top"><div class="agent-identity"><div class="large-avatar" style="color:${div.color}">${safe(agent.name.slice(0,2))}</div><div><h3>${safe(agent.name)}</h3><p>${safe(agent.role)}</p></div></div><span class="badge ${agent.status}">${statusLabel(agent.status)}</span></div>
        <div class="card-stats"><div class="mini-stat"><span>所属</span><strong>${safe(div.name)}</strong></div><div class="mini-stat"><span>成果スコア</span><strong>${agent.performance}</strong></div></div>
        <div class="task-line"><span>最新の成果物</span><p>${safe(agent.output)}</p></div>
        <div class="task-line"><span>NEXT TASK</span><p>${safe(agent.nextTask)}</p></div>
      </article>`;
    }).join("") || emptyState()}</div>`;
}

function renderProducts() {
  content.innerHTML = `${sectionIntro("商品パイプライン", "アイデアから改善まで、すべての商品を価値創出の流れで管理します。", "add-product", "＋ 商品を企画")}
    <div class="card-grid">${state.products.map(product => {
      const div = divisionOf(product.divisionId);
      const stage = stageIndex(product.stage);
      return `<article class="product-card">
        <div class="card-top"><div><p>${safe(div.name)} / ${safe(agentOf(product.ownerId).name)}</p><h3>${safe(product.name)}</h3></div><span class="badge ${product.stage}">${statusLabel(product.stage)}</span></div>
        <div class="pipeline">${[1,2,3,4].map(i => `<span class="${i <= stage ? "done" : ""}"></span>`).join("")}</div>
        <div class="pipeline-labels"><span>IDEA</span><span>BUILD</span><span>SELL</span><span>IMPROVE</span></div>
        <div class="card-stats"><div class="mini-stat"><span>価格</span><strong>${yen.format(product.price)}</strong></div><div class="mini-stat"><span>販売数</span><strong>${product.sales}</strong></div></div>
        <div class="progress-row"><div class="progress-copy"><span>進捗</span><strong>${product.progress}%</strong></div><div class="progress-track"><i style="width:${product.progress}%;--bar-color:${div.color}"></i></div></div>
      </article>`;
    }).join("") || emptyState()}</div>`;
}

function renderKpi() {
  const max = Math.max(...state.kpis.map(k => Math.max(k.revenue, k.target)), 1);
  const latest = state.kpis.at(-1) || { revenue: 0, target: 0 };
  const attainment = latest.target ? Math.round(latest.revenue / latest.target * 100) : 0;
  content.innerHTML = `${sectionIntro("KPI コックピット", "月次売上と目標達成率を追い、次に打つ改善案へ接続します。", "add-kpi", "＋ 月次実績を追加")}
    <div class="metric-grid">
      ${metric("LATEST REVENUE", compactYen(latest.revenue), "最新月の確定売上")}
      ${metric("TARGET", compactYen(latest.target), "最新月の目標")}
      ${metric("ATTAINMENT", `${attainment}%`, attainment >= 100 ? "<strong>目標達成</strong>" : `残り ${compactYen(Math.max(0, latest.target-latest.revenue))}`, "var(--warning)")}
      ${metric("IMPROVEMENTS", state.improvements.length, "実行候補の改善提案", "var(--accent-2)")}
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-header"><h3>MONTHLY REVENUE</h3><small>6 MONTH TREND</small></div>
        <div class="chart">${state.kpis.map(k => `<div class="chart-column"><div class="chart-bar" style="height:${k.revenue/max*100}%" data-value="${compactYen(k.revenue)}"></div><small>${safe(k.month.slice(5))}月</small></div>`).join("")}</div>
      </section>
      <section class="panel"><div class="panel-header"><h3>AI IMPROVEMENT PROPOSALS</h3><small>${state.improvements.length} IDEAS</small></div>
        ${state.improvements.map(i => `<div class="suggestion"><strong>${safe(i.title)}</strong><p>${safe(i.detail)}</p></div>`).join("") || emptyState()}
      </section>
    </div>`;
}

function renderDecisions() {
  content.innerHTML = `${sectionIntro("Decision Log", "監督の承認・却下・理由を、AI社員が学べる組織記憶として蓄積します。", "add-decision", "＋ 判断を記録")}
    <div class="table-wrap"><table><thead><tr><th>DATE / ID</th><th>判断事項</th><th>結果</th><th>理由</th><th>監督</th></tr></thead>
    <tbody>${state.decisions.map(d => `<tr><td>${safe(d.date)}<br><span class="reason">${safe(d.id)}</span></td><td class="decision-title">${safe(d.title)}</td><td><span class="badge ${d.status}">${statusLabel(d.status)}</span></td><td class="reason">${safe(d.reason)}</td><td>${safe(d.supervisor)}</td></tr>`).join("") || `<tr><td colspan="5">${emptyState()}</td></tr>`}</tbody></table></div>`;
}

const meetingPerspectives = {
  "CEO Strategist": topic => `「${topic}」を会社目標との整合性で評価します。まず30日以内に検証できる最小単位へ絞り、継続条件と撤退条件を先に決めるべきです。`,
  "Product Architect": topic => `顧客が最初に得る成果を一つに定義しましょう。「${topic}」の最小商品を7日で形にし、利用結果から次の機能を決める案を推します。`,
  "Brand Director": topic => `誰のどんな変化を約束するのかが重要です。「${topic}」を機能ではなく顧客の物語として説明できるか、販売前に言葉と体験を揃えたいです。`,
  "Research Analyst": topic => `判断材料として、顧客の困りごと、既存代替手段、支払意思の3点が不足しています。5件の短いヒアリングで仮説を反証できる状態にします。`,
  "Growth Operator": topic => `制作前に需要を測れます。「${topic}」の告知ページと2種類の訴求を用意し、反応率と相談件数を先行指標にするのが効率的です。`,
  "Sales Agent": topic => `営業現場では、対象顧客、価格、導入後の成果が一文で言えることが必要です。既存の見込み客10社へ直接聞けば、最短で商談化の可能性を確認できます。`
};

function buildMeeting(topic) {
  const seed = [...topic].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const score = (base, offset) => Math.max(45, Math.min(98, base + ((seed + offset) % 11) - 5));
  return {
    id: `mtg-${Date.now()}`,
    topic,
    createdAt: new Date().toISOString(),
    status: "discussing",
    opinions: state.agents.map(agent => ({
      agentId: agent.id,
      text: (meetingPerspectives[agent.role] || (value => `「${value}」について、担当領域から小さく検証できる次の一手を提案します。`))(topic)
    })),
    candidates: [
      { id:"experiment", title:"7日間の最小実験", detail:"対象顧客を絞り、小さな提供物と明確な成功基準で需要を検証する。", scores:{ 売上性:score(76,1), 速度:score(91,2), 戦略性:score(82,3), 安全性:score(88,4) } },
      { id:"sales", title:"既存商品の営業強化", detail:"現在の商品と見込み客を活用し、提案・商談・成約のボトルネックを改善する。", scores:{ 売上性:score(88,5), 速度:score(80,6), 戦略性:score(73,7), 安全性:score(84,8) } },
      { id:"research", title:"顧客調査を先行", detail:"判断に必要な証拠を集め、顧客課題・代替手段・支払意思を確定する。", scores:{ 売上性:score(65,9), 速度:score(72,10), 戦略性:score(91,11), 安全性:score(94,12) } }
    ]
  };
}

function candidateAverage(candidate) {
  const values = Object.values(candidate.scores);
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function renderStrategy() {
  const meeting = state.meetings?.[0];
  const recalledMemories = meeting ? recallMemories(meeting.topic) : [];
  const opinions = meeting?.opinions.map(opinion => {
    const agent = agentOf(opinion.agentId);
    const div = divisionOf(agent.divisionId);
    return `<article class="opinion-card"><div class="opinion-head"><div class="large-avatar" style="color:${div.color}">${safe(agent.name.slice(0,2))}</div><div><strong>${safe(agent.name)}</strong><small>${safe(agent.role)}</small></div></div><p>${safe(opinion.text)}</p></article>`;
  }).join("") || "";
  const ranked = meeting ? [...meeting.candidates].sort((a,b) => candidateAverage(b) - candidateAverage(a)) : [];
  const candidates = ranked.map((candidate, index) => {
    const selected = meeting.selectedOption === candidate.id;
    return `<article class="candidate-card ${index === 0 ? "recommended" : ""}">
      <span class="badge ${selected ? "approved" : index === 0 ? "working" : "idle"}">${selected ? "採用済み" : index === 0 ? "推奨案" : `候補 ${index + 1}`}</span>
      <h4>${safe(candidate.title)}</h4><p>${safe(candidate.detail)}</p>
      <div class="score-list">${Object.entries(candidate.scores).map(([label, value]) => `<div class="score-item"><span>${safe(label)}</span><i style="--score:${value}%"></i><strong>${value}</strong></div>`).join("")}</div>
      ${meeting.status === "decided" ? "" : `<button class="${index === 0 ? "primary-button" : "ghost-button"}" data-action="approve-meeting" data-meeting="${meeting.id}" data-option="${candidate.id}">この案を採用</button>`}
    </article>`;
  }).join("");
  content.innerHTML = `${sectionIntro("Strategy Room", "AI社員の視点を並べ、次に取り組むことを監督と一緒に決めます。")}
    <div class="mode-banner"><div><strong>TEMPLATE MODE / SERVERLESS</strong><p>現在は役割別テンプレートとルールで提案を生成しています。外部AIとの通信やAPI利用はありません。</p></div><span class="badge working">LOCAL ONLY</span></div>
    <form id="meeting-form" class="meeting-form">
      <textarea name="topic" maxlength="240" required placeholder="相談テーマを入力（例：次の30日で最優先すべき事業施策は？）"></textarea>
      <button class="primary-button" type="submit">会議を招集</button>
    </form>
    ${memoryRecallHtml(recalledMemories, "MEETING CONTEXT")}
    ${meeting ? `<section class="panel">
      <div class="meeting-meta"><span class="badge ${meeting.status === "decided" ? "approved" : "review"}">${meeting.status === "decided" ? "決定済み" : "議論中"}</span><small>${new Date(meeting.createdAt).toLocaleString("ja-JP")}</small></div>
      <h3 class="meeting-topic">${safe(meeting.topic)}</h3>
      <div class="panel-header"><h3>AI社員の見解</h3><small>${meeting.opinions.length} PERSPECTIVES</small></div>
      <div class="opinion-grid">${opinions}</div>
    </section>
    <section class="panel" style="margin-top:16px"><div class="panel-header"><h3>実行候補の比較</h3><small>SCORE / 100</small></div><div class="candidate-grid">${candidates}</div>
      ${meeting.status === "decided" ? `<div class="decision-result" style="margin-top:14px"><strong>監督判断をDecision Logへ保存しました</strong><p>選択した案を次の実行計画へ変換する準備ができています。</p></div>` : ""}
    </section>` : `<div class="empty-state"><span>◇</span><h3>最初の作戦会議を始めましょう</h3><p>相談テーマを入力すると、AI社員6名の役割別見解と3つの実行候補を生成します。</p></div>`}`;
}

const views = {
  dashboard: { eyebrow: "COMPANY COMMAND CENTER", title: "おはようございます、監督。", render: renderDashboard },
  divisions: { eyebrow: "BUSINESS PORTFOLIO", title: "事業部を編成する", render: renderDivisions },
  agents: { eyebrow: "AI WORKFORCE", title: "AI社員を指揮する", render: renderAgents },
  products: { eyebrow: "VALUE PIPELINE", title: "商品を市場へ進める", render: renderProducts },
  kpi: { eyebrow: "PERFORMANCE CONTROL", title: "成果を計測し、改善する", render: renderKpi },
  strategy: { eyebrow: "COLLECTIVE STRATEGY", title: "みんなで、次の一手を決める", render: renderStrategy },
  decisions: { eyebrow: "ORGANIZATIONAL MEMORY", title: "判断を会社の知能にする", render: renderDecisions }
};

function render(view = currentView) {
  currentView = view;
  const config = views[view];
  document.querySelector("#view-eyebrow").textContent = config.eyebrow;
  document.querySelector("#view-title").textContent = config.title;
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === view));
  document.querySelector("#company-level").textContent = state.meta.level;
  document.querySelector("#xp-progress").style.width = `${Math.min(100, state.meta.xp / state.meta.xpGoal * 100)}%`;
  document.querySelector("#xp-label").textContent = `${state.meta.xp.toLocaleString()} / ${state.meta.xpGoal.toLocaleString()} XP`;
  config.render();
}

const formConfigs = {
  "add-division": {
    title: "事業部を追加", target: "divisions",
    fields: [
      ["name","事業部名","text","",true], ["mission","ミッション","text","",true],
      ["budget","月次予算","number","0",true], ["color","識別カラー","color","#d9ff57",true]
    ],
    build: d => ({ id:`div-${Date.now()}`, name:d.name, mission:d.mission, budget:+d.budget, revenue:0, color:d.color, status:"active" })
  },
  "add-agent": {
    title: "AI社員を採用", target: "agents",
    fields: [
      ["name","名前","text","",true], ["role","役割","text","",true],
      ["divisionId","所属事業部","select","divisions",true], ["status","状態","select:working,review,idle","",true],
      ["output","最初の成果物","text","未着手",false], ["nextTask","次のタスク","textarea","オンボーディングを開始",true]
    ],
    build: d => ({ id:`agt-${Date.now()}`, ...d, performance:50 })
  },
  "add-product": {
    title: "商品を企画", target: "products",
    fields: [
      ["name","商品名","text","",true], ["divisionId","担当事業部","select","divisions",true],
      ["ownerId","オーナー","select","agents",true], ["stage","フェーズ","select:idea,production,selling,improvement","",true],
      ["price","販売価格","number","0",true], ["progress","進捗（%）","number","10",true]
    ],
    build: d => ({ id:`prd-${Date.now()}`, ...d, price:+d.price, progress:Math.min(100,+d.progress), sales:0 })
  },
  "add-kpi": {
    title: "月次実績を追加", target: "kpis",
    fields: [["month","対象月","month","",true],["revenue","売上","number","0",true],["target","目標","number","0",true]],
    build: d => ({ month:d.month, revenue:+d.revenue, target:+d.target })
  },
  "add-decision": {
    title: "監督判断を記録", target: "decisions",
    fields: [
      ["title","判断事項","text","",true], ["status","結果","select:approved,rejected,pending","",true],
      ["supervisor","監督","text","監督",true], ["date","日付","date",new Date().toISOString().slice(0,10),true],
      ["reason","判断理由","textarea","",true]
    ],
    build: d => ({ id:`dec-${Date.now()}`, ...d })
  }
};

function fieldHtml([name, label, type, value, required]) {
  const full = type === "textarea" || name === "mission" ? " full" : "";
  if (type === "textarea") return `<div class="field${full}"><label for="field-${name}">${label}</label><textarea id="field-${name}" name="${name}" ${required ? "required" : ""}>${safe(value)}</textarea></div>`;
  if (type === "select") {
    const list = state[value];
    const options = list.map(item => `<option value="${item.id}">${safe(item.name)}</option>`).join("");
    return `<div class="field${full}"><label for="field-${name}">${label}</label><select id="field-${name}" name="${name}" ${required ? "required" : ""}>${options}</select></div>`;
  }
  if (type.startsWith("select:")) {
    const options = type.split(":")[1].split(",").map(v => `<option value="${v}">${statusLabel(v)}</option>`).join("");
    return `<div class="field${full}"><label for="field-${name}">${label}</label><select id="field-${name}" name="${name}">${options}</select></div>`;
  }
  return `<div class="field${full}"><label for="field-${name}">${label}</label><input id="field-${name}" name="${name}" type="${type}" value="${safe(value)}" ${required ? "required" : ""}></div>`;
}

function openForm(action) {
  const config = formConfigs[action];
  form.dataset.action = action;
  document.querySelector("#dialog-title").textContent = config.title;
  document.querySelector("#dialog-eyebrow").textContent = action.replace("add-", "NEW ").toUpperCase();
  fields.innerHTML = config.fields.map(fieldHtml).join("");
  dialog.showModal();
}

document.querySelector("#primary-nav").addEventListener("click", e => {
  const button = e.target.closest("[data-view]");
  if (button) render(button.dataset.view);
});
content.addEventListener("click", e => {
  const button = e.target.closest("[data-action]");
  if (!button) return;
  if (button.dataset.action === "approve-meeting") {
    const meeting = state.meetings.find(item => item.id === button.dataset.meeting);
    const candidate = meeting?.candidates.find(item => item.id === button.dataset.option);
    if (!meeting || !candidate) return;
    meeting.status = "decided";
    meeting.selectedOption = candidate.id;
    state.decisions.unshift({
      id:`dec-${Date.now()}`, date:new Date().toISOString().slice(0,10), title:meeting.topic,
      status:"approved", supervisor:"監督", reason:`Strategy Roomで「${candidate.title}」を採用。${candidate.detail}`
    });
    persist();
    renderStrategy();
    toast("監督判断を保存しました");
    return;
  }
  if (button.dataset.action === "memory-to-task") {
    const memory = (state.memories || []).find(item => item.id === button.dataset.memory);
    if (!memory) return;
    const existing = (state.tasks || []).find(task => task.memoryId === memory.id && task.status !== "completed");
    if (existing) {
      toast("このメモリはすでに実行タスクへ追加されています");
      return;
    }
    state.tasks ||= [];
    state.tasks.unshift({
      id: `TSK-${Date.now()}`,
      title: memory.title,
      productId: "",
      priority: memory.priority,
      status: "paused",
      owner: "監督",
      due: "",
      blocker: "営業メール送信の開始判断待ち",
      nextAction: memory.checklist.join(" → "),
      memoryId: memory.id
    });
    persist();
    render();
    toast("メモリから実行タスクを作成しました");
    return;
  }
  openForm(button.dataset.action);
});
content.addEventListener("submit", e => {
  if (e.target.id !== "meeting-form") return;
  e.preventDefault();
  const topic = new FormData(e.target).get("topic")?.trim();
  if (!topic) return;
  state.meetings ||= [];
  state.meetings.unshift(buildMeeting(topic));
  persist();
  renderStrategy();
  toast("作戦会議を開始しました");
});
form.addEventListener("submit", e => {
  e.preventDefault();
  const action = form.dataset.action;
  const config = formConfigs[action];
  const values = Object.fromEntries(new FormData(form));
  const record = config.build(values);
  if (config.target === "kpis") {
    state.kpis.push(record);
    state.kpis.sort((a, b) => a.month.localeCompare(b.month));
  } else {
    state[config.target].unshift(record);
  }
  persist();
  dialog.close();
  render();
  toast("記録を保存しました");
});
document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
document.querySelector("#dialog-cancel").addEventListener("click", () => dialog.close());
document.querySelector("#export-button").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = Object.assign(document.createElement("a"), { href:url, download:`ai-company-${new Date().toISOString().slice(0,10)}.json` });
  anchor.click();
  URL.revokeObjectURL(url);
  toast("JSONを書き出しました");
});
document.querySelector("#import-button").addEventListener("click", () => document.querySelector("#file-input").click());
document.querySelector("#file-input").addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const required = ["divisions","agents","products","kpis","decisions"];
    if (!required.every(key => Array.isArray(data[key]))) throw new Error("schema");
    state = { ...clone(seedData), ...data };
    persist();
    render();
    toast("JSONを読み込みました");
  } catch {
    toast("読み込めないJSON形式です");
  } finally { e.target.value = ""; }
});

function updateClock() {
  const now = new Date();
  document.querySelector("#current-date").textContent = new Intl.DateTimeFormat("ja-JP", { year:"numeric", month:"2-digit", day:"2-digit", weekday:"short" }).format(now);
  document.querySelector("#current-time").textContent = now.toLocaleTimeString("ja-JP", { hour:"2-digit", minute:"2-digit" });
}
updateClock();
setInterval(updateClock, 30000);
render();
