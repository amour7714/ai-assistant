---
name: mkt-ontology
description: 查营销费用本体的类、关系、指标口径和 db_ontology_mkt 字段。用户问门店、经销商、业代、陈列、费用钱包、分销订单、稽查、5水、虚假客资，或要写这些主题的 SQL、解释字段含义时使用。
---

# 营销费用本体

口径以本体说明为准，不另造公式。资料由 `ontology-studio/build_catalog.py` 从 `ontology/营销费用本体-20261106.json` 和 `db_ontology_mkt` 的视图结构生成。

## 先读哪份

1. 先看 `references/overview.md` 里的建模说明、类和关系。
2. 问某个业务对象时，只打开 `references/classes/` 下对应的一个文件，例如门店是 `Store.md`。
3. 问某个字段时，在 `references/datasets.md` 里搜字段名。不要把整份字段说明读进上下文。
4. 交互式查看用 `./ontology-studio/serve.sh`，打开 http://127.0.0.1:8765/ 。

## 查数

- 库是 `db_ontology_mkt`，只查这个库里的视图。
- 用视图上已经挂好的字段。属性说明里的表和字段就是来源。
- 先写筛选和 `LIMIT`。这批视图背后的明细很大。
- 整数和小数属性是指标，口径就是该属性的说明。说明里没有聚合公式时，不要补一个。
- 三张视图还没有挂到这版本体：`v_dim_hr_emp_with_org`、`v_market_activity_inspire_expense_df`、`v_mkt_media_plan_dtl_df`。用它们之前要说明这一点。

## 不要做的事

- 不把连接串、口令、token 写进回答或文件。
- 不改生产库。
- 类说明之间冲突时，先引用说明里的原句，再告诉用户冲突在哪里，不自行选边。
