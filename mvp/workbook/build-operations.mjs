import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = path.resolve("..", "..");
const outputDir = path.join(root, "outputs", "mvp-20260724");
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const dashboard = workbook.worksheets.add("Dashboard");
const funnel = workbook.worksheets.add("Funnel");
const customers = workbook.worksheets.add("Customers");
const experiments = workbook.worksheets.add("Experiments");
const updates = workbook.worksheets.add("Updates");
const assumptions = workbook.worksheets.add("Assumptions");

const ink = "#13211C";
const paper = "#F3F0E8";
const acid = "#D9FF43";
const coral = "#FF6B4A";
const muted = "#66716C";
const pale = "#E9E7DF";
const input = "#FFF5BF";

for (const sheet of [dashboard, funnel, customers, experiments, updates, assumptions]) {
  sheet.showGridLines = false;
}

assumptions.getRange("A1:D1").merge();
assumptions.getRange("A1").values = [["MVP判定条件"]];
assumptions.getRange("A3:D10").values = [
  ["指標", "GO基準", "PIVOT基準", "単位"],
  ["診断完了", 20, 5, "件"],
  ["有料購入", 3, 1, "社"],
  ["Day 7完了", 2, 1, "社"],
  ["測定可能な成果", 1, 0, "件"],
  ["1販売あたり人的時間", 90, 120, "分以下"],
  ["検証期間", 30, 30, "日"],
  ["MVP価格", 4980, null, "円"],
];
assumptions.getRange("A12:D15").values = [
  ["ステータス候補", "顧客段階", "実験判断", "更新種別"],
  ["未接触", "診断", "採用", "PATCH"],
  ["接触済", "購入", "改善", "MINOR"],
  ["完了", "完了", "不採用", "MAJOR"],
];

funnel.getRange("A1:H1").merge();
funnel.getRange("A1").values = [["獲得・販売ファネル"]];
funnel.getRange("A3:H3").values = [[
  "日付", "チャネル", "企業/識別子", "案内", "診断開始", "診断完了", "購入", "売上",
]];
const funnelRows = Array.from({ length: 100 }, () => [null, null, null, 0, 0, 0, 0, 0]);
funnel.getRange("A4:H103").values = funnelRows;
funnel.getRange("A4:A103").format.numberFormat = "yyyy-mm-dd";
funnel.getRange("H4:H103").format.numberFormat = '¥#,##0';
funnel.getRange("B4:B103").dataValidation = {
  rule: { type: "list", values: ["直接営業", "支援者紹介", "SEO", "SNS", "その他"] },
};
for (const range of ["D4:D103", "E4:E103", "F4:F103", "G4:G103"]) {
  funnel.getRange(range).dataValidation = {
    rule: { type: "list", values: [0, 1] },
  };
}
funnel.tables.add("A3:H103", true, "FunnelTable");
funnel.freezePanes.freezeRows(3);

customers.getRange("A1:I1").merge();
customers.getRange("A1").values = [["顧客管理（必要最小限）"]];
customers.getRange("A3:I3").values = [[
  "顧客ID", "購入日", "商品版", "価格", "チャネル", "進行状況", "更新期限", "通知", "備考",
]];
customers.getRange("A4:I53").values = Array.from({ length: 50 }, () => [
  null, null, null, null, null, null, null, null, null,
]);
customers.getRange("B4:B53").format.numberFormat = "yyyy-mm-dd";
customers.getRange("D4:D53").format.numberFormat = '¥#,##0';
customers.getRange("G4:G53").format.numberFormat = "yyyy-mm-dd";
customers.getRange("F4:F53").dataValidation = {
  rule: { type: "list", values: ["購入", "Day 0", "Day 3", "Day 7", "完了", "返金"] },
};
customers.getRange("H4:H53").dataValidation = {
  rule: { type: "list", values: ["未通知", "通知済", "不要"] },
};
customers.tables.add("A3:I53", true, "CustomersTable");
customers.freezePanes.freezeRows(3);

experiments.getRange("A1:O1").merge();
experiments.getRange("A1").values = [["7日実験結果"]];
experiments.getRange("A3:O3").values = [[
  "顧客ID", "対象業務", "開始日", "Day 7完了", "実験前時間", "実験後時間",
  "時間削減率", "前手戻り", "後手戻り", "前品質", "後品質", "判断",
  "人的支援分", "レビュー", "再利用可能な学び",
]];
experiments.getRange("A4:O53").values = Array.from({ length: 50 }, () => [
  null, null, null, 0, null, null, null, null, null, null, null, null, null, 0, null,
]);
experiments.getRange("G4").formulas = [["=IF(OR(E4=\"\",F4=\"\",E4=0),\"\",(E4-F4)/E4)"]];
experiments.getRange("G4:G53").fillDown();
experiments.getRange("C4:C53").format.numberFormat = "yyyy-mm-dd";
experiments.getRange("G4:G53").format.numberFormat = "0.0%";
experiments.getRange("B4:B53").dataValidation = {
  rule: { type: "list", values: ["問い合わせ返信", "議事録・タスク", "見積・提案文"] },
};
experiments.getRange("D4:D53").dataValidation = { rule: { type: "list", values: [0, 1] } };
experiments.getRange("L4:L53").dataValidation = {
  rule: { type: "list", values: ["採用", "改善", "不採用"] },
};
experiments.getRange("N4:N53").dataValidation = { rule: { type: "list", values: [0, 1] } };
experiments.tables.add("A3:O53", true, "ExperimentsTable");
experiments.freezePanes.freezeRows(3);
experiments.getRange("G4:G53").conditionalFormats.add("colorScale", {
  colors: ["#FFD7CE", "#FFF5BF", "#D9FF43"],
  thresholds: ["min", "50%", "max"],
});

updates.getRange("A1:H1").merge();
updates.getRange("A1").values = [["商品更新履歴"]];
updates.getRange("A3:H3").values = [[
  "日付", "バージョン", "種別", "変更内容", "根拠", "影響範囲", "通知状況", "次回確認",
]];
updates.getRange("A4:H33").values = Array.from({ length: 30 }, () => [
  null, null, null, null, null, null, null, null,
]);
updates.getRange("A4:H4").values = [[
  new Date("2026-07-24"), "0.1.0", "MINOR", "MVP初版", "DA-0001 / DA-0002",
  "全体", "未通知", new Date("2026-08-24"),
]];
updates.getRange("A4:A33").format.numberFormat = "yyyy-mm-dd";
updates.getRange("H4:H33").format.numberFormat = "yyyy-mm-dd";
updates.getRange("C4:C33").dataValidation = {
  rule: { type: "list", values: ["PATCH", "MINOR", "MAJOR"] },
};
updates.getRange("G4:G33").dataValidation = {
  rule: { type: "list", values: ["未通知", "通知済", "不要"] },
};
updates.tables.add("A3:H33", true, "UpdatesTable");
updates.freezePanes.freezeRows(3);

dashboard.getRange("A1:H1").merge();
dashboard.getRange("A1").values = [["1業務7日ラボ｜30日MVPダッシュボード"]];
dashboard.getRange("A2:H2").merge();
dashboard.getRange("A2").values = [["入力は黄色セル。顧客の生データや秘密情報は保存しない。"]];
dashboard.getRange("A4:H4").values = [[
  "診断完了", null, "購入", null, "Day 7完了", null, "売上", null,
]];
dashboard.getRange("A5").formulas = [["=SUM('Funnel'!F4:F103)"]];
dashboard.getRange("C5").formulas = [["=SUM('Funnel'!G4:G103)"]];
dashboard.getRange("E5").formulas = [["=SUM('Experiments'!D4:D53)"]];
dashboard.getRange("G5").formulas = [["=SUM('Funnel'!H4:H103)"]];
dashboard.getRange("G5").format.numberFormat = '¥#,##0';

dashboard.getRange("A7:H7").merge();
dashboard.getRange("A7").values = [["30日判定"]];
dashboard.getRange("A8:B12").values = [
  ["指標", "実績"],
  ["診断完了", null],
  ["有料購入", null],
  ["Day 7完了", null],
  ["測定成果", null],
];
dashboard.getRange("B9:B12").formulas = [
  ["=A5"],
  ["=C5"],
  ["=E5"],
  ["=COUNTIF('Experiments'!G4:G53,\">0\")"],
];
dashboard.getRange("D8:F12").values = [
  ["判定基準", "基準", "状態"],
  ["診断完了", null, null],
  ["有料購入", null, null],
  ["Day 7完了", null, null],
  ["測定成果", null, null],
];
dashboard.getRange("E9:E12").formulas = [
  ["='Assumptions'!B4"],
  ["='Assumptions'!B5"],
  ["='Assumptions'!B6"],
  ["='Assumptions'!B7"],
];
dashboard.getRange("F9:F12").formulas = [
  ['=IF(B9>=E9,"達成","未達")'],
  ['=IF(B10>=E10,"達成","未達")'],
  ['=IF(B11>=E11,"達成","未達")'],
  ['=IF(B12>=E12,"達成","未達")'],
];
dashboard.getRange("A14:H14").merge();
dashboard.getRange("A14").values = [["ファネル"]];
dashboard.getRange("A15:D19").values = [
  ["段階", "件数", "前段階比", "目標"],
  ["案内", null, null, null],
  ["診断開始", null, null, null],
  ["診断完了", null, null, 20],
  ["購入", null, null, 3],
];
dashboard.getRange("B16:B19").formulas = [
  ["=SUM('Funnel'!D4:D103)"],
  ["=SUM('Funnel'!E4:E103)"],
  ["=SUM('Funnel'!F4:F103)"],
  ["=SUM('Funnel'!G4:G103)"],
];
dashboard.getRange("C17").formulas = [["=IF(B16=0,\"\",B17/B16)"]];
dashboard.getRange("C17:C19").fillDown();
dashboard.getRange("C17:C19").format.numberFormat = "0.0%";

dashboard.getRange("F15:H19").values = [
  ["運営指標", "実績", "上限"],
  ["平均人的支援分", null, 90],
  ["レビュー率", null, "40%"],
  ["Day 7完了率", null, "50%"],
  ["現在判定", null, null],
];
dashboard.getRange("G16").formulas = [["=IF(C5=0,0,SUM('Experiments'!M4:M53)/C5)"]];
dashboard.getRange("G17").formulas = [["=IF(C5=0,0,SUM('Experiments'!N4:N53)/C5)"]];
dashboard.getRange("G18").formulas = [["=IF(C5=0,0,E5/C5)"]];
dashboard.getRange("G19").formulas = [[
  '=IF(AND(B9>=E9,B10>=E10,B11>=E11,B12>=E12,G16<=90),"GO",IF(OR(B9>=5,B10>=1),"PIVOT","検証中"))',
]];
dashboard.getRange("G17:G18").format.numberFormat = "0.0%";
dashboard.getRange("H17:H18").format.numberFormat = "0%";

const titleRanges = [
  [dashboard, "A1:H1"], [funnel, "A1:H1"], [customers, "A1:I1"],
  [experiments, "A1:O1"], [updates, "A1:H1"], [assumptions, "A1:D1"],
];
for (const [sheet, range] of titleRanges) {
  sheet.getRange(range).format = {
    fill: ink,
    font: { bold: true, color: "#FFFFFF", size: 16 },
    rowHeight: 32,
    verticalAlignment: "center",
  };
}

for (const [sheet, range] of [
  [funnel, "A3:H3"], [customers, "A3:I3"], [experiments, "A3:O3"],
  [updates, "A3:H3"], [assumptions, "A3:D3"],
]) {
  sheet.getRange(range).format = {
    fill: ink,
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
    rowHeight: 30,
  };
}

dashboard.getRange("A4:H4").format = {
  fill: pale,
  font: { bold: true, color: muted },
  horizontalAlignment: "center",
};
for (const cell of ["A5", "C5", "E5", "G5"]) {
  dashboard.getRange(cell).format = {
    fill: acid,
    font: { bold: true, color: ink, size: 22 },
    horizontalAlignment: "center",
    rowHeight: 42,
  };
}
for (const range of ["A7:H7", "A14:H14"]) {
  dashboard.getRange(range).format = {
    fill: coral,
    font: { bold: true, color: ink },
    rowHeight: 26,
  };
}
for (const range of ["A8:B8", "D8:F8", "A15:D15", "F15:H15"]) {
  dashboard.getRange(range).format = {
    fill: ink,
    font: { bold: true, color: "#FFFFFF" },
  };
}
dashboard.getRange("F9:F12").conditionalFormats.add("containsText", {
  text: "達成", format: { fill: acid, font: { bold: true, color: ink } },
});
dashboard.getRange("F9:F12").conditionalFormats.add("containsText", {
  text: "未達", format: { fill: "#FFD7CE", font: { bold: true, color: ink } },
});
dashboard.getRange("G19").conditionalFormats.add("containsText", {
  text: "GO", format: { fill: acid, font: { bold: true, color: ink } },
});
dashboard.getRange("G19").conditionalFormats.add("containsText", {
  text: "PIVOT", format: { fill: "#FFF5BF", font: { bold: true, color: ink } },
});

for (const sheet of [funnel, customers, experiments, updates]) {
  const used = sheet.getUsedRange();
  used.format.font = { name: "Yu Gothic", size: 10, color: ink };
  used.format.verticalAlignment = "center";
}

funnel.getRange("A4:H103").format.fill = input;
customers.getRange("A4:I53").format.fill = input;
experiments.getRange("A4:O53").format.fill = input;
experiments.getRange("G4:G53").format.fill = pale;
updates.getRange("A4:H33").format.fill = input;
assumptions.getRange("B4:B10").format.fill = input;

dashboard.getRange("A1:H20").format.font = { name: "Yu Gothic", color: ink };
dashboard.getRange("A2:H2").format = {
  fill: paper,
  font: { italic: true, color: muted, size: 9 },
  rowHeight: 22,
};

const widths = [
  [dashboard, "A:H", 16],
  [funnel, "A:H", 15],
  [customers, "A:I", 16],
  [experiments, "A:O", 15],
  [updates, "A:H", 18],
  [assumptions, "A:D", 18],
];
for (const [sheet, range, width] of widths) {
  sheet.getRange(range).format.columnWidth = width;
}
dashboard.getRange("A:A").format.columnWidth = 20;
dashboard.getRange("D:D").format.columnWidth = 20;
dashboard.getRange("F:F").format.columnWidth = 20;
experiments.getRange("O:O").format.columnWidth = 34;
updates.getRange("D:F").format.columnWidth = 28;
customers.getRange("I:I").format.columnWidth = 28;

// Reapply hierarchy after body-level font settings.
for (const [sheet, range] of titleRanges) {
  sheet.getRange(range).format = {
    fill: ink,
    font: { bold: true, color: "#FFFFFF", size: 16, name: "Yu Gothic" },
    rowHeight: 32,
    verticalAlignment: "center",
  };
}
for (const [sheet, range] of [
  [funnel, "A3:H3"], [customers, "A3:I3"], [experiments, "A3:O3"],
  [updates, "A3:H3"], [assumptions, "A3:D3"],
]) {
  sheet.getRange(range).format = {
    fill: ink,
    font: { bold: true, color: "#FFFFFF", name: "Yu Gothic" },
    wrapText: true,
    rowHeight: 30,
  };
}

const inspect = await workbook.inspect({
  kind: "table",
  range: "Dashboard!A1:H20",
  include: "values,formulas",
  tableMaxRows: 20,
  tableMaxCols: 8,
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

for (const sheetName of ["Dashboard", "Funnel", "Customers", "Experiments", "Updates", "Assumptions"]) {
  const preview = await workbook.render({
    sheetName,
    autoCrop: "all",
    scale: 1,
    format: "png",
  });
  await fs.writeFile(
    path.join(outputDir, `${sheetName.toLowerCase()}-preview.png`),
    new Uint8Array(await preview.arrayBuffer()),
  );
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(path.join(outputDir, "AI-7daylab-operations.xlsx"));
