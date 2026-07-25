from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output" / "pdf"
OUT.mkdir(parents=True, exist_ok=True)
OUTPUT = OUT / "1-work-7-day-lab-mvp-v0.1.0.pdf"

FONT_CANDIDATES = [
    Path(r"C:\Windows\Fonts\YuGothR.ttc"),
    Path(r"C:\Windows\Fonts\meiryo.ttc"),
    Path(r"C:\Windows\Fonts\msgothic.ttc"),
]
FONT_BOLD_CANDIDATES = [
    Path(r"C:\Windows\Fonts\YuGothB.ttc"),
    Path(r"C:\Windows\Fonts\meiryob.ttc"),
    Path(r"C:\Windows\Fonts\msgothic.ttc"),
]

regular = next((p for p in FONT_CANDIDATES if p.exists()), None)
bold = next((p for p in FONT_BOLD_CANDIDATES if p.exists()), regular)
if regular is None:
    raise RuntimeError("Japanese font was not found.")

pdfmetrics.registerFont(TTFont("JP", str(regular)))
pdfmetrics.registerFont(TTFont("JP-Bold", str(bold)))

INK = colors.HexColor("#13211C")
PAPER = colors.HexColor("#F3F0E8")
ACID = colors.HexColor("#D9FF43")
CORAL = colors.HexColor("#FF6B4A")
MUTED = colors.HexColor("#65716B")
LINE = colors.HexColor("#D3D1C9")
WHITE = colors.white

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="JPBody",
        fontName="JP",
        fontSize=9.5,
        leading=16,
        textColor=INK,
        spaceAfter=7,
        wordWrap="CJK",
    )
)
styles.add(
    ParagraphStyle(
        name="JPSmall",
        fontName="JP",
        fontSize=7.5,
        leading=12,
        textColor=MUTED,
        wordWrap="CJK",
    )
)
styles.add(
    ParagraphStyle(
        name="JPTitle",
        fontName="JP-Bold",
        fontSize=27,
        leading=37,
        textColor=INK,
        spaceAfter=14,
        wordWrap="CJK",
    )
)
styles.add(
    ParagraphStyle(
        name="JPH1",
        fontName="JP-Bold",
        fontSize=20,
        leading=28,
        textColor=INK,
        spaceAfter=12,
        wordWrap="CJK",
    )
)
styles.add(
    ParagraphStyle(
        name="JPH2",
        fontName="JP-Bold",
        fontSize=12.5,
        leading=19,
        textColor=INK,
        spaceBefore=10,
        spaceAfter=7,
        wordWrap="CJK",
    )
)
styles.add(
    ParagraphStyle(
        name="Kicker",
        fontName="JP-Bold",
        fontSize=7,
        leading=10,
        textColor=CORAL,
        spaceAfter=8,
        tracking=1.2,
    )
)
styles.add(
    ParagraphStyle(
        name="Center",
        parent=styles["JPBody"],
        alignment=TA_CENTER,
    )
)
styles.add(
    ParagraphStyle(
        name="TableHead",
        fontName="JP-Bold",
        fontSize=7.5,
        leading=11,
        textColor=WHITE,
        alignment=TA_LEFT,
        wordWrap="CJK",
    )
)
styles.add(
    ParagraphStyle(
        name="TableCell",
        fontName="JP",
        fontSize=7.5,
        leading=11,
        textColor=INK,
        wordWrap="CJK",
    )
)


def P(text, style="JPBody"):
    return Paragraph(text, styles[style])


def table(headers, rows, widths=None, row_heights=None):
    data = [[P(str(x), "TableHead") for x in headers]]
    for row in rows:
        data.append([P(str(x), "TableCell") for x in row])
    t = Table(data, colWidths=widths, rowHeights=row_heights, repeatRows=1, hAlign="LEFT")
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def callout(title, body, color=ACID):
    t = Table(
        [[P(title, "JPH2"), P(body, "JPBody")]],
        colWidths=[42 * mm, 112 * mm],
    )
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), color),
                ("BOX", (0, 0), (-1, -1), 0.8, INK),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return t


def header_footer(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(INK)
    canvas.rect(0, height - 13 * mm, width, 13 * mm, fill=1, stroke=0)
    canvas.setFont("JP-Bold", 8)
    canvas.setFillColor(WHITE)
    canvas.drawString(20 * mm, height - 8.5 * mm, "1業務7日ラボ")
    canvas.setFillColor(ACID)
    canvas.drawRightString(width - 20 * mm, height - 8.5 * mm, "MVP v0.1.0")
    canvas.setStrokeColor(LINE)
    canvas.line(20 * mm, 13 * mm, width - 20 * mm, 13 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("JP", 7)
    canvas.drawString(20 * mm, 8 * mm, "AIを導入する前に、投資判断をつくる。")
    canvas.drawRightString(width - 20 * mm, 8 * mm, str(doc.page))
    canvas.restoreState()


doc = BaseDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    leftMargin=20 * mm,
    rightMargin=20 * mm,
    topMargin=24 * mm,
    bottomMargin=19 * mm,
    title="1業務7日ラボ MVP v0.1.0",
    author="AI Operating Company",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="content", frames=[frame], onPageEnd=header_footer)])

story = []

story += [
    Spacer(1, 26 * mm),
    P("DECISION / 07", "Kicker"),
    P("AIを導入する前に、<br/>投資判断をつくる。", "JPTitle"),
    P(
        "1つの業務を7日だけ試し、時間・品質・手戻りを記録。"
        "「続ける・直す・やめる」を、雰囲気ではなく数字で決める実験キットです。"
    ),
    Spacer(1, 10 * mm),
    callout(
        "成果が出ない実験も成功",
        "AI化しない方がよいと判断できれば、無駄な契約・教育・運用を避けられます。",
    ),
    Spacer(1, 24 * mm),
    P("DAY 0  →  DAY 3  →  DAY 7", "JPH1"),
    P("測る　　　 1カ所直す　　 判断する"),
    Spacer(1, 18 * mm),
    P("対象: 従業員5〜50人・専任DX担当者がいない企業", "JPSmall"),
    P("2026-07-24 / AI Operating Company", "JPSmall"),
    PageBreak(),
]

story += [
    Spacer(1, 18 * mm),
    P("START HERE", "Kicker"),
    P("この順番だけで進める", "JPH1"),
    table(
        ["順番", "やること", "完了条件"],
        [
            ["1", "安全チェック", "全項目が「はい」"],
            ["2", "業務選定", "対象業務を1つに固定"],
            ["3", "Day 0計測", "AIなしの基準値を取得"],
            ["4", "Day 1〜2", "手順を変えずに実験"],
            ["5", "Day 3", "問題を1つだけ修正"],
            ["6", "Day 4〜6", "変更後を計測"],
            ["7", "Day 7", "Decision Memoを確定"],
        ],
        [18 * mm, 66 * mm, 70 * mm],
    ),
    Spacer(1, 9 * mm),
    callout(
        "途中で別業務へ変えない",
        "複数の要素を同時に変えると、何が結果に影響したか分からなくなります。",
        PAPER,
    ),
    P("3つの対象業務", "JPH2"),
    P("問い合わせ返信 / 議事録・タスク整理 / 定型的な見積・提案文"),
    P("このMVPでは、上記以外の業務へ転用しません。", "JPSmall"),
    PageBreak(),
]

story += [
    P("SAFETY", "Kicker"),
    P("実験前の安全チェック", "JPH1"),
    P("1つでも「いいえ」があれば、そのまま開始しないでください。"),
    table(
        ["確認", "はい/いいえ", "いいえの場合"],
        [
            ["個人を特定できる情報を除ける", "", "仮名・架空データへ置換"],
            ["契約・価格・顧客・未公開計画等の秘密を除ける", "", "公開情報だけで試す"],
            ["AIの出力を確認する担当者がいる", "", "最終確認者を決める"],
            ["間違っても顧客へ自動送信されない", "", "下書き専用工程にする"],
            ["AIサービスの社内利用が許可されている", "", "責任者へ確認"],
            ["実験をいつでも停止できる", "", "自動実行を使わない"],
        ],
        [91 * mm, 27 * mm, 42 * mm],
    ),
    P("即時停止条件", "JPH2"),
    P("実データを誤入力した / 未確認の出力を送信した / 差別的・攻撃的・虚偽の内容が出た / 根拠を確認できない / 担当者が危険と判断した"),
    callout(
        "保証しないもの",
        "本商品は法務・情報セキュリティ・業務品質を保証するものではありません。",
        colors.HexColor("#FFD7CE"),
    ),
    PageBreak(),
]

story += [
    Spacer(1, 18 * mm),
    P("SELECTION", "Kicker"),
    P("15分で、業務を1つ選ぶ", "JPH1"),
    P("0: 当てはまらない / 1: 一部当てはまる / 2: 明確に当てはまる"),
    table(
        ["候補業務", "週3回", "15分", "型あり", "確認可", "機密除外", "合計"],
        [["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""]],
        [45 * mm, 18 * mm, 18 * mm, 19 * mm, 19 * mm, 24 * mm, 17 * mm],
        [None, 16 * mm, 16 * mm, 16 * mm],
    ),
    P("選定ルール", "JPH2"),
    P("1. 「人が確認可能」「機密を除ける」のどちらかが0点なら対象外"),
    P("2. 残った候補で合計が最も高い業務を選ぶ"),
    P("3. 同点なら、1回の所要時間が長い方を選ぶ"),
    P("4. 実験中に別の業務へ変更しない"),
    Spacer(1, 8 * mm),
    table(
        ["記入項目", "内容"],
        [["選んだ業務", ""], ["実験責任者", ""], ["確認担当者", ""], ["実験開始日", ""]],
        [45 * mm, 115 * mm],
        [None, 13 * mm, 13 * mm, 13 * mm, 13 * mm],
    ),
    PageBreak(),
]

for label, title, target, excluded, prompt, checks in [
    (
        "PROTOCOL 01",
        "問い合わせ返信",
        "営業時間、サービス範囲、一般的な手続き等、公開情報で回答できる問い合わせの下書き。",
        "苦情、返金、契約解釈、個人情報、緊急対応。",
        "以下の公開情報だけを根拠に、200字以内で返信案を作成してください。情報が不足する場合は推測せず「確認が必要」と明記してください。返金、契約、法的判断、個人情報には触れないでください。これは下書きであり送信しません。",
        "質問へ直接回答 / 公開情報と矛盾なし / 不可能な約束なし / 顧客を責めない",
    ),
    (
        "PROTOCOL 02",
        "議事録・タスク整理",
        "機密を除いたメモから、決定事項と担当タスクを整理する作業。",
        "人事評価、健康情報、未公開取引、顧客情報を含む会議。",
        "以下のメモだけを使い、決定事項、未決事項、担当タスク、期限に分類してください。書かれていない情報は推測せず「記載なし」としてください。各項目の後ろに根拠となったメモの短い語句を付けてください。",
        "原文にない決定なし / 担当と期限を推測しない / 未決を決定にしない",
    ),
    (
        "PROTOCOL 03",
        "見積・提案文",
        "承認済みの商品情報と架空条件を使った、定型的な提案文の下書き。",
        "価格決定、値引き承認、契約条件、納期確約、顧客固有の秘密情報。",
        "以下の承認済み情報だけを使い、提案文の下書きを作成してください。金額、納期、提供範囲は変更・補完しないでください。不明点は「要確認」と表示してください。構成は課題、提案、提供範囲、対象外、次の行動の順にしてください。",
        "金額・納期・範囲が一致 / 未承認の値引きなし / 成果保証なし / 対象外を明記",
    ),
]:
    protocol_story = ([Spacer(1, 18 * mm)] if label == "PROTOCOL 02" else []) + [
        P(label, "Kicker"),
        P(title, "JPH1"),
        P("対象", "JPH2"),
        P(target),
        P("対象外", "JPH2"),
        P(excluded),
        P("共通指示文", "JPH2"),
        callout("COPY", prompt, PAPER),
        P("品質確認", "JPH2"),
        P(checks),
        P("必ず人が確認し、AIから直接送信・確定しません。", "JPSmall"),
    ]
    story += [KeepTogether(protocol_story), PageBreak()]

story += [
    Spacer(1, 18 * mm),
    P("DAY 0", "Kicker"),
    P("AIを使わない基準値", "JPH1"),
    P("同じ種類の作業を1〜3件測ります。品質は、作業者とは別の確認担当者が評価します。"),
    table(
        ["件", "作業時間（分）", "手戻り（回）", "品質（1〜5）", "備考"],
        [["1", "", "", "", ""], ["2", "", "", "", ""], ["3", "", "", "", ""]],
        [13 * mm, 35 * mm, 31 * mm, 30 * mm, 51 * mm],
        [None, 17 * mm, 17 * mm, 17 * mm],
    ),
    Spacer(1, 10 * mm),
    P("Day 1〜2: 手順を変えずに試す", "JPH2"),
    table(
        ["日", "件数", "合計時間", "手戻り", "品質", "事故・懸念"],
        [["1", "", "", "", "", ""], ["2", "", "", "", "", ""]],
        [12 * mm, 20 * mm, 30 * mm, 24 * mm, 21 * mm, 53 * mm],
        [None, 17 * mm, 17 * mm],
    ),
    Spacer(1, 10 * mm),
    callout("この段階では改善しない", "最初から手順を直すと、基準値と比較できなくなります。", PAPER),
    PageBreak(),
]

story += [
    P("DAY 3", "Kicker"),
    P("問題を1カ所だけ直す", "JPH1"),
    table(
        ["記入項目", "内容"],
        [["変更前の問題", ""], ["変更した1カ所", ""], ["他を変えなかった理由", ""]],
        [52 * mm, 108 * mm],
        [None, 28 * mm, 28 * mm, 28 * mm],
    ),
    Spacer(1, 12 * mm),
    P("Day 4〜6: 変更後を測る", "JPH2"),
    table(
        ["日", "件数", "合計時間", "手戻り", "品質", "事故・懸念"],
        [["4", "", "", "", "", ""], ["5", "", "", "", "", ""], ["6", "", "", "", "", ""]],
        [12 * mm, 20 * mm, 30 * mm, 24 * mm, 21 * mm, 53 * mm],
        [None, 17 * mm, 17 * mm, 17 * mm],
    ),
    Spacer(1, 12 * mm),
    callout("速さだけで採用しない", "品質低下・手戻り増加・安全上の懸念があれば採用しません。", ACID),
    PageBreak(),
]

story += [
    Spacer(1, 18 * mm),
    P("DAY 7", "Kicker"),
    P("数字を比較する", "JPH1"),
    table(
        ["指標", "実験前", "実験後", "差"],
        [["1件あたり時間（分）", "", "", ""], ["1件あたり手戻り（回）", "", "", ""], ["品質（1〜5）", "", "", ""]],
        [64 * mm, 32 * mm, 32 * mm, 32 * mm],
        [None, 18 * mm, 18 * mm, 18 * mm],
    ),
    Spacer(1, 12 * mm),
    P("判断", "JPH2"),
    table(
        ["選択", "意味"],
        [
            ["□ 採用", "同じ条件で4週間続ける"],
            ["□ 改善", "条件を1つ変えて再実験する"],
            ["□ 不採用", "この業務では使わない"],
        ],
        [38 * mm, 122 * mm],
    ),
    Spacer(1, 10 * mm),
    P("判断理由（3行以内）", "JPH2"),
    table(["1", "2", "3"], [["", "", ""]], [53 * mm, 53 * mm, 54 * mm], [None, 28 * mm]),
    PageBreak(),
]

story += [
    P("DECISION MEMO", "Kicker"),
    P("経営判断として残す", "JPH1"),
    table(
        ["項目", "記入"],
        [
            ["対象業務 / 期間", ""],
            ["使用AI / 責任者 / 確認者", ""],
            ["結論", "□ 採用　□ 改善　□ 不採用"],
            ["時間", "実験前 ___分 → 実験後 ___分"],
            ["手戻り", "実験前 ___回 → 実験後 ___回"],
            ["品質", "実験前 ___/5 → 実験後 ___/5"],
            ["実験総時間 / 確認時間", ""],
            ["継続条件", ""],
            ["停止条件", ""],
            ["次回確認日", ""],
            ["再利用可能な学び", ""],
        ],
        [53 * mm, 107 * mm],
        [None, 12 * mm, 12 * mm, 12 * mm, 12 * mm, 12 * mm, 12 * mm, 12 * mm, 20 * mm, 20 * mm, 12 * mm, 26 * mm],
    ),
    Spacer(1, 8 * mm),
    P("再利用可能な学びには、顧客名・個人名・秘密情報を書きません。次回に使えるルールとして1文で残します。", "JPSmall"),
    PageBreak(),
]

story += [
    Spacer(1, 36 * mm),
    P("REVIEW", "Kicker"),
    P("レビューではなく、改善データを返す", "JPH1"),
    P("以下を匿名化して提供すると、次回の業種別プロトコル改善に使われます。回答は任意です。"),
    table(
        ["項目", "回答"],
        [
            ["対象業務", ""],
            ["Day 7まで完了した", "はい / いいえ"],
            ["時間差", ""],
            ["品質差", ""],
            ["判断", "採用 / 改善 / 不採用"],
            ["分かりにくかった箇所", ""],
            ["追加してほしい業務", ""],
            ["公開可能な匿名コメント", ""],
        ],
        [55 * mm, 105 * mm],
        [None, 13 * mm, 13 * mm, 13 * mm, 13 * mm, 13 * mm, 24 * mm, 20 * mm, 24 * mm],
    ),
    Spacer(1, 10 * mm),
    callout("90日更新", "購入日から90日間、PATCHおよびMINOR更新を追加料金なしで提供します。", ACID),
    P("v0.1.0 / 2026-07-24", "JPSmall"),
]

doc.build(story)
print(OUTPUT)
