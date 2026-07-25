# Notion Sync Map

Updated: 2026-07-24

## Workspace

- Workspace: 花井メルさんのスペース
- COO HQ: https://app.notion.com/p/3a6edaab164781a79184c7ffd98c3241
- Root page ID: `3a6edaab-1647-81a7-9184-c7ffd98c3241`

## Databases

| Entity | Database URL | Data source ID |
|---|---|---|
| Products | https://app.notion.com/p/fc43f67fdad24b10b463448d5e7ca779 | `66697d49-cb12-4b0f-a52c-59697e65afa5` |
| Tasks | https://app.notion.com/p/fc9601d8c0de42cd99613f634671d9c3 | `fa5ac385-5cc3-400c-8e8b-019fda8329e8` |
| Decision Assets | https://app.notion.com/p/8cb89dec60a34cbbb72174bd8dae39ed | `a16efe74-0e16-4f50-81c3-c8c240fb0c39` |
| KPI | https://app.notion.com/p/2084742ef5c24627930eaa6db99e179f | `37f4d759-0799-4e52-8f4d-9d3d0f53aa37` |
| Daily Reports | https://app.notion.com/p/e446b7c1b55b4cbb986d52b200c68b18 | `f0440dad-11b0-4d89-8907-9a972ecc313c` |
| Inbox | https://app.notion.com/p/d4ecefe9c8af4697800355bc0c38801b | `689e267d-dbbe-434f-8e6c-5a25b9e32bee` |

## Source-of-truth rule

- Notion is the supervisor-facing operating surface for status, approval, KPI and reports.
- Local Markdown and structured data are the AI-facing source of truth for implementation, history and reusable assets.
- Every material decision is recorded in both a local Decision Asset and the Notion Decision Assets database.
- Product status, blockers and KPI are synchronized at the end of each operating day.
- Raw ideas enter Inbox and must be converted, triaged or archived within 24 hours.

## Write routing

| New information | Destination |
|---|---|
| Product value, price or lifecycle change | Products |
| Concrete next action | Tasks |
| Approval, rejection, success, failure or reusable learning | Decision Assets |
| Numeric target or observation | KPI |
| Conversation input not yet classified | Inbox |
| End-of-day summary | Daily Reports |

