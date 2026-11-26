# 陈列项 `DisplayItem`

- 分组：活动
- 父类：无

## 说明

约定或检查的陈列项目种类，例如冰柜、水堆、货架等，由陈列项编码和名称识别。它是可被多个活动、门店签约和检查结果引用的项目，不是一台设备或某一次执行。不同来源的dsp_code、dsp_form_code和活动sub_item_code保留各自引用范围。

## 指出的关系

无

## 指入的关系

- 活动计划明细 → 约定陈列项 `ActivityPlanDetail_display_item`
  仅陈列活动适用，sub_item_code、sub_item_name记录陈列项，不把其他活动子项一律当作陈列项。
- 陈列签约 → 签订陈列项 `DisplaySigning_item`
  dsp_code、dsp_name记录本签约约定的陈列项目种类，多个签约可以引用同一项目。
- 月度陈列项检查结果 → 检查陈列项 `DisplayItemInspection_item`
  dsp_code记录本月检查次数对应的陈列项目，不表示唯一签约。
- 门店陈列执行统计 → 执行陈列项 `DisplayExecutionSummary_item`
  dsp_form_code、dsp_form_name记录本执行统计引用的陈列项，编码对应未确认时仍保留业务联系。
- 虚假陈列认定 → 涉及陈列项 `FalseDisplayFinding_item`
  dsp_code、dsp_name直接记录认定涉及的项目种类，与具体签约身份区分。

## 属性

### 陈列项编码 `DisplayItem_item_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_code`、`v_mkt_actv_inspect_result.dsp_code`、`v_ads_ai_chl_sus_display_fee_detail.dsp_code`、`v_mkt_dsp_execute_mi.dsp_form_code`、`v_mkt_market_actv_plan_verify_cost.sub_item_code`
- 口径：业务资料中用于识别或引用陈列项目种类的编码，不是具体签约标识dsp_id。签约、检查及虚假陈列认定使用dsp_code，执行统计使用dsp_form_code，陈列活动计划子项使用sub_item_code；保留各来源的引用范围，不据此认定这些字段可以逐值互换。

### 陈列项名称 `DisplayItem_item_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_name`、`v_mkt_actv_inspect_result.dsp_name`、`v_ads_ai_chl_sus_display_fee_detail.dsp_name`、`v_mkt_dsp_execute_mi.dsp_form_name`、`v_mkt_market_actv_plan_verify_cost.sub_item_name`
- 口径：业务资料记录的陈列项目种类名称。名称与同一来源记录的陈列项编码配套使用，表示该记录所引用的项目，不是活动名称、门店名称或具体设备名称；名称相同不单独证明跨来源项目身份相同。

### 陈列类目编码 `DisplayItem_classification_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_clfc_code`
- 口径：签约资料记录的陈列项所属陈列类目编码，与同一记录的陈列类目名称配套。它不是陈列项自身编码，也不是产品品类编码ctg_code。

### 陈列类目名称 `DisplayItem_classification_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_clfc_name`、`v_mkt_dsp_execute_mi.dsp_clfc_name`
- 口径：签约或执行统计资料记录的陈列项所属陈列类目名称，按相应业务记录的分类口径解释。检查结果另有stat_main_group分类，资料未说明两者可直接替换。

### 检查陈列项分类 `DisplayItem_inspection_group`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.stat_main_group`
- 口径：活动执行检查结果中用于对陈列项分组的分类值，资料列出的分类包括冰柜、水堆、货架。该值限定于检查来源的分类口径，不将其直接等同于其他来源的陈列类目或陈列项类型。

### 签约陈列项类型 `DisplayItem_signing_item_type_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_type_name`
- 口径：签约资料记录的所签陈列项类型名称，用于解释该资料所引用陈列项的类型。保留字段原有含义，不从类型名称反推陈列项编码、检查条件或费用规则。
