"use client";

import { useMemo, useState } from "react";

const questions = [
  {
    label: "同じ形式の文章や記録を、週3回以上作っていますか？",
    hint: "問い合わせ返信、議事録、見積・提案文など",
  },
  {
    label: "1回の作業に15分以上かかりますか？",
    hint: "確認や修正の時間も含めてください",
  },
  {
    label: "完成物を人が確認できる業務ですか？",
    hint: "AIに最終判断を任せないことが前提です",
  },
  {
    label: "機密情報を伏せても実験できますか？",
    hint: "個人情報、契約情報、未公開情報を入力しません",
  },
  {
    label: "7日間、作業時間と手戻りを記録できますか？",
    hint: "成果ではなく、判断材料を作るための実験です",
  },
];

type Answer = "yes" | "no" | null;

export default function Home() {
  const [answers, setAnswers] = useState<Answer[]>(Array(questions.length).fill(null));
  const [copied, setCopied] = useState(false);

  const answered = answers.filter(Boolean).length;
  const yes = answers.filter((answer) => answer === "yes").length;
  const result = useMemo(() => {
    if (answered < questions.length) return null;
    if (answers[2] === "no" || answers[3] === "no") {
      return {
        status: "stop",
        eyebrow: "今回は試さない",
        title: "安全に検証できる条件が足りません。",
        body: "人による確認、または機密情報を除く方法を整えてから再判定してください。購入はおすすめしません。",
      };
    }
    if (yes >= 4) {
      return {
        status: "go",
        eyebrow: "7日実験に適合",
        title: "小さく試す価値があります。",
        body: "対象業務を1つに絞り、実験前後の時間・品質・手戻りを比較できます。",
      };
    }
    return {
      status: "hold",
      eyebrow: "条件を整えて再判定",
      title: "いま買う必要はありません。",
      body: "頻度、所要時間、記録方法のいずれかを確認してから、もう一度診断してください。",
    };
  }, [answered, answers, yes]);

  function choose(index: number, value: Answer) {
    setAnswers((current) => current.map((answer, i) => (i === index ? value : answer)));
    setCopied(false);
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(
      `1業務7日ラボ 診断結果\n${result.eyebrow}\n${result.title}\n${result.body}`,
    );
    setCopied(true);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="1業務7日ラボ トップ">
          <span className="brand-mark">7</span>
          <span>1業務7日ラボ</span>
        </a>
        <a className="nav-link" href="#diagnosis">無料診断</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">AIを導入する前に、投資判断をつくる。</p>
          <h1>
            その業務、
            <br />
            <em>AI化しない</em>ほうが
            <br />
            いいかもしれない。
          </h1>
          <p className="hero-lead">
            1つの業務を7日だけ試し、時間・品質・手戻りを記録。
            「続ける・直す・やめる」を、雰囲気ではなく数字で決める実験キットです。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#diagnosis">3分で適合診断</a>
            <a className="text-link" href="#method">仕組みを見る <span>↘</span></a>
          </div>
        </div>

        <aside className="decision-card" aria-label="7日間の流れ">
          <div className="card-top">
            <span>DECISION / 07</span>
            <span className="live-dot">実験型</span>
          </div>
          <div className="big-seven">7</div>
          <ol>
            <li><b>Day 0</b><span>実験前を測る</span></li>
            <li><b>Day 3</b><span>手順を1回だけ直す</span></li>
            <li><b>Day 7</b><span>採用・改善・不採用</span></li>
          </ol>
          <p>成果が出なかった実験も、正しい経営判断です。</p>
        </aside>
      </section>

      <section className="signal-strip" aria-label="商品の特徴">
        <span>講座ではない</span>
        <span>プロンプト集ではない</span>
        <span>全社導入ではない</span>
        <strong>1業務の投資判断</strong>
      </section>

      <section className="method section" id="method">
        <div className="section-heading">
          <p className="kicker">METHOD</p>
          <h2>小さく測り、早く捨てる。</h2>
          <p>AIを使うことではなく、使い続ける根拠を作ることが目的です。</p>
        </div>
        <div className="steps">
          <article>
            <span>01</span>
            <h3>業務を1つ選ぶ</h3>
            <p>頻度・時間・確認可能性から、実験対象を絞ります。</p>
          </article>
          <article>
            <span>02</span>
            <h3>前後を同じ尺度で測る</h3>
            <p>作業時間、手戻り、品質確認の3点だけを記録します。</p>
          </article>
          <article>
            <span>03</span>
            <h3>Decision Memoを残す</h3>
            <p>採用だけでなく、不採用の理由も再利用可能な資産にします。</p>
          </article>
        </div>
      </section>

      <section className="diagnosis section" id="diagnosis">
        <div className="diagnosis-intro">
          <p className="kicker">FREE DIAGNOSIS</p>
          <h2>3分で、試す価値を判定。</h2>
          <p>
            全5問。入力内容はこのページ内だけで計算され、送信・保存されません。
          </p>
          <div className="progress" aria-label={`${answered}/5問回答済み`}>
            <span style={{ width: `${(answered / questions.length) * 100}%` }} />
          </div>
          <small>{answered} / {questions.length} 回答済み</small>
        </div>

        <div className="question-list">
          {questions.map((question, index) => (
            <article className="question" key={question.label}>
              <div className="question-copy">
                <span>Q{index + 1}</span>
                <div>
                  <h3>{question.label}</h3>
                  <p>{question.hint}</p>
                </div>
              </div>
              <div className="choice" role="group" aria-label={question.label}>
                <button
                  className={answers[index] === "yes" ? "selected" : ""}
                  onClick={() => choose(index, "yes")}
                  type="button"
                >
                  はい
                </button>
                <button
                  className={answers[index] === "no" ? "selected no" : ""}
                  onClick={() => choose(index, "no")}
                  type="button"
                >
                  いいえ
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className={`result ${result ? `show ${result.status}` : ""}`} aria-live="polite">
          {result ? (
            <>
              <p className="kicker">{result.eyebrow}</p>
              <h3>{result.title}</h3>
              <p>{result.body}</p>
              <div className="result-actions">
                {result.status === "go" ? (
                  <button className="button primary" type="button" disabled title="販売ページ接続前">
                    MVP販売準備中
                  </button>
                ) : (
                  <button className="button secondary" type="button" onClick={() => setAnswers(Array(questions.length).fill(null))}>
                    もう一度診断
                  </button>
                )}
                <button className="text-button" type="button" onClick={copyResult}>
                  {copied ? "コピーしました" : "結果をコピー"}
                </button>
              </div>
            </>
          ) : (
            <p>5問すべてに回答すると、ここに判定が表示されます。</p>
          )}
        </div>
      </section>

      <section className="contents section">
        <div className="section-heading">
          <p className="kicker">MVP CONTENTS</p>
          <h2>迷わず終わる、7日分。</h2>
        </div>
        <div className="content-grid">
          {[
            ["業務選定シート", "試す業務を15分で1つに絞る"],
            ["安全チェック", "入力しない情報を実験前に確認"],
            ["3つの実験手順", "返信・議事録・見積提案に対応"],
            ["7日記録シート", "時間・品質・手戻りだけを記録"],
            ["Decision Memo", "続ける・直す・捨てるを決定"],
            ["90日間の更新", "軽微修正と機能追加を無償提供"],
          ].map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="price section">
        <div>
          <p className="kicker">MONITOR PRICE</p>
          <h2>初期10社だけ、<br />一緒に完成させる。</h2>
          <p>レビューではなく、実験データをください。誇張された成功事例は作りません。</p>
        </div>
        <div className="price-card">
          <p>MVPモニター</p>
          <strong><small>税込</small> ¥4,980</strong>
          <ul>
            <li>買い切り</li>
            <li>90日間アップデート</li>
            <li>匿名フィードバック特典</li>
          </ul>
          <button className="button primary" disabled type="button">販売ページ接続待ち</button>
          <small>販売基盤の審査・接続後に有効化します。</small>
        </div>
      </section>

      <section className="safety section">
        <p className="kicker">BOUNDARIES</p>
        <h2>できないことを、先に書く。</h2>
        <div>
          <p>本商品は法務・情報セキュリティ・業務品質を保証するものではありません。</p>
          <p>個人情報、契約情報、営業秘密、未公開情報を生成AIへ入力しない実験を前提とします。</p>
          <p>AIの出力は必ず人が確認し、最終判断を自動化しません。</p>
        </div>
      </section>

      <footer>
        <div className="brand">
          <span className="brand-mark">7</span>
          <span>1業務7日ラボ</span>
        </div>
        <p>AIを入れる会社ではなく、AI投資を判断できる会社へ。</p>
        <small>© 2026 AI Operating Company / MVP v0.1</small>
      </footer>
    </main>
  );
}
