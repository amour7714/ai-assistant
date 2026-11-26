# 营销活动 `MarketingActivity`

- 分组：活动
- 父类：无

## 说明

在一定期间面向特定对象安排的营销方案或活动计划，包括资料明确记录的一般活动计划、陈列活动、分销套餐、统案活动和随货搭赠活动。活动本身不同于执行月的计划明细、具体门店签约、费用包或钱包分录。活动类别用于解释费用阶段和承担口径，不能把所有活动金额统一认定为现金支付。

## 指出的关系

无

## 指入的关系

- 分销订单行 → 参与渠道活动 `DistributionOrderLine_channel_activity`
  行内渠道活动标识、编码和名称直接记录所参与活动；并非所有渠道活动都已证明为分销套餐。水套餐术语在相应问数口径下限定商品为水且渠道活动名称非空。
- 活动计划明细 → 所属活动计划 `ActivityPlanDetail_activity`
  plan_id、plan_code、plan_name记录明细所属营销活动计划，与plan_dtl_id层次区分。
- 营销费用业务事件 → 事件涉及活动 `ExpenseEvent_activity`
  仅事件业务组合将event_object_code明确解释为活动、计划或套餐时，引用相应营销活动；不能把费用包、签约等所有对象编码统一连到活动。
- 统案客户分配 → 关联执行计划 `UnifiedCustomerAllocation_execution_plan`
  客户分配资料中的plan_code、plan_name记录其关联的后续活动计划；一个分配可对应多个计划，分配与计划金额分别统计。

## 属性

### 活动编码 `MarketingActivity_activity_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_code`、`v_mkt_package_cust_cost_mi.plan_code`、`v_trd_dist_ord_dtl.chl_actv_code`、`v_mkt_dsp_actv_info_mi.actv_code`、`v_mkt_dsp_execute_mi.zx_actv_code`、`v_mkt_unity_apply_alloc_df.actv_code`、`v_mkt_unity_apply_alloc_df.plan_code`、`v_mkt_cost_package_df.unity_plan_code`、`v_mkt_shdz_sink_dtl_df.gwdlv_code`、`v_mkt_shdz_sink_dtl_df.package_code`、`v_fin_expense_wallet_change_dtl_mi.event_object_code`
- 口径：原业务记录用于引用营销活动或活动计划的编码，包括计划编码、渠道活动编码、陈列活动编码、统案活动编码、随货搭赠编号及分销套餐编码。不同来源的编码体系分别保留，不认定同值编码必然表示同一活动，也不将活动头ID、计划明细ID、陈列签约ID或费用包编码当作本属性。统案活动编码与其后续执行计划编码指向不同参与对象。

### 活动名称 `MarketingActivity_activity_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_name`、`v_mkt_package_cust_cost_mi.plan_name`、`v_trd_dist_ord_dtl.chl_actv_name`、`v_ai_sus_ord_inspect_detail.chl_actv_name`、`v_mkt_dsp_actv_info_mi.actv_name`、`v_mkt_unity_apply_alloc_df.actv_name`、`v_mkt_unity_apply_alloc_df.plan_name`、`v_mkt_cost_package_df.unity_plan_name`、`v_mkt_shdz_sink_dtl_df.gwdlv_name`、`v_mkt_shdz_sink_dtl_df.package_name`、`v_fin_expense_wallet_change_dtl_mi.event_object_name`
- 口径：业务记录直接记载或引用的营销活动、活动计划名称。名称用于展示和辅助核对，不是跨来源实例匹配键；同名不证明同一活动。统案名称、后续执行计划名称、随货搭赠名称和承接下沉的套餐名称分别对应各自活动对象。

### 活动类型 `MarketingActivity_activity_type_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.actv_type_name`、`v_mkt_package_cust_cost_mi.actv_type_name`、`v_trd_dist_ord_dtl.chl_actv_type_name`、`v_ai_sus_ord_inspect_detail.chl_actv_type_name`、`v_mkt_dsp_actv_info_mi.actv_code`、`v_mkt_dsp_execute_mi.zx_actv_code`、`v_mkt_unity_apply_alloc_df.actv_code`、`v_mkt_cost_package_df.unity_plan_code`、`v_mkt_shdz_sink_dtl_df.gwdlv_code`、`v_mkt_shdz_sink_dtl_df.package_code`
- 口径：活动的业务类型，用于区别陈列活动、经销商套餐、统案套餐、业代套餐、统案活动、随货搭赠活动及其他实际记录类型。有直接类型名称字段的来源保留原值；专属业务来源未提供类型名称时，可依据实际活动引用及资料明确的对象类别计算类型名称。各来源的分类细度可能不同，不将统案套餐与统案活动认定为同义，也不把费用包类型、门店执行统计类型或钱包记账阶段作为活动类型。套餐类别影响计划、实施和确认金额的承担口径，不能将各类活动金额统一解释为现金支付。

### 活动开始时间 `MarketingActivity_start_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.start_date`、`v_mkt_package_cust_cost_mi.start_date`、`v_mkt_dsp_actv_info_mi.start_date`、`v_mkt_unity_apply_alloc_df.actv_start_date`、`v_mkt_shdz_sink_dtl_df.begin_date`
- 口径：活动或活动计划规定的开始日期或时间，保留来源实际提供的精度。它限定活动本身的开展期间，不是执行月、门店签约日期、订单创建时间或下沉统计月；同一来源中的开始与结束值须对应同一个活动对象。

### 活动结束时间 `MarketingActivity_end_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.end_date`、`v_mkt_package_cust_cost_mi.end_date`、`v_mkt_dsp_actv_info_mi.end_date`、`v_mkt_unity_apply_alloc_df.actv_end_date`、`v_mkt_shdz_sink_dtl_df.end_date`
- 口径：活动或活动计划规定的结束日期或时间，保留来源实际提供的精度，并与同一活动的开始时间配套。计划结束时间不同于提前终止日期、费用确认或核销时间；随货搭赠活动的结束时间也不同于下沉截止时间，不能互相替代。
