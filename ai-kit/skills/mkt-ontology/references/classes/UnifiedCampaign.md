# 统案活动 `UnifiedCampaign`

- 分组：活动
- 父类：MarketingActivity

## 说明

统一申请支持费用并向组织或销售客户分配的营销活动。其活动主题区分总部、大区和经销商等范围；支持申请费用项、客户分配和后续执行计划分别识别，不能把各层金额叠加为活动总费用。

## 指出的关系

无

## 指入的关系

- 费用包 → 关联统案活动 `ExpensePackage_unified_campaign`
  unity_plan_code、unity_plan_name明确引用费用包所关联统案活动，不把费用包本身视为活动子类。
- 统案支持费用项 → 所属统案 `UnifiedSupportItem_campaign`
  actv_id、actv_code记录支持费用项所属统案活动，保留明细与列表层次。
- 统案客户分配 → 所属统案活动 `UnifiedCustomerAllocation_campaign`
  客户分配资料直接记录actv_code及活动身份；钱包事件引用时还须与该活动和执行月配套。

## 属性

### 统案活动标识 `UnifiedCampaign_activity_identifier`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_id`
- 口径：统案活动头的原生ID，与活动编码、活动明细ID、支持费用列表ID和客户分配ID分别识别。按来源实际事业线及同步范围解释身份，不仅凭同值ID跨事业线合并活动。

### 活动描述 `UnifiedCampaign_content`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_content`
- 口径：业务记录记载的统案活动内容说明，描述统案本身，不是客户分配关联的后续执行计划描述。

### 活动简述 `UnifiedCampaign_short_content`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_short_content`
- 口径：业务记录为统案活动提供的简要说明，与活动描述分别保留，不将其解释为另一项活动或后续计划。

### 活动主题编码 `UnifiedCampaign_theme_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_agent_code`
- 口径：统案活动主题的编码，用于识别总部、大区、经销商等业务范围。资料明确编码2表示经销商主题，该主题下的大区支持金额属于具体客户分配；其他主题编码不猜补。活动主题不同于活动类型，也不是组织或经销商实例的编码。

### 活动主题名称 `UnifiedCampaign_theme_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_agent_name`
- 口径：统案活动主题的名称，表示总部、大区、经销商等业务范围，与活动主题编码对应。它不表示具体支持部门、分配大区或接受分配的销售客户名称。

### 活动分类 `UnifiedCampaign_classification_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_classify_name`
- 口径：统案业务记录给出的活动分类名称。保留来源分类，不自动将其等同活动主题或继承属性中的活动类型，也不据此推导费用承担方式。

### 审批状态编码 `UnifiedCampaign_approval_status_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.aprv_status_code`
- 口径：统案申请流程的审批状态编码，与对应审批状态名称配套。审批状态不等于活动有效状态、费用确认状态或支付状态；申请支持金额的指标材料没有限定仅统计审批通过的申请。

### 审批状态 `UnifiedCampaign_approval_status_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.aprv_status_name`
- 口径：统案申请流程审批状态的名称，表示申请所处的审批状态，不表示支持费用已分配、后续计划已执行或费用已核销。

### 活动创建时间 `UnifiedCampaign_creation_time`

- 类型：dateTime
- 字段：`v_mkt_unity_apply_alloc_df.create_datetime`
- 口径：统案活动建立的日期或时间，保留来源提供的精度。它不同于活动开始时间、支持费用执行月和后续计划创建时间。

### 活动创建人 `UnifiedCampaign_creator`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.create_user`
- 口径：业务记录记载的统案活动创建人原值。资料未说明该值采用姓名、编码还是账号体系，因此不直接将其当作员工编码或域账号。

### 活动编码 `MarketingActivity_activity_code`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_unity_apply_alloc_df.actv_code`、`v_mkt_cost_package_df.unity_plan_code`、`v_fin_expense_wallet_change_dtl_mi.event_object_code`
- 口径：原业务记录用于引用营销活动或活动计划的编码，包括计划编码、渠道活动编码、陈列活动编码、统案活动编码、随货搭赠编号及分销套餐编码。不同来源的编码体系分别保留，不认定同值编码必然表示同一活动，也不将活动头ID、计划明细ID、陈列签约ID或费用包编码当作本属性。统案活动编码与其后续执行计划编码指向不同参与对象。

### 活动名称 `MarketingActivity_activity_name`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_unity_apply_alloc_df.actv_name`、`v_mkt_cost_package_df.unity_plan_name`、`v_fin_expense_wallet_change_dtl_mi.event_object_name`
- 口径：业务记录直接记载或引用的营销活动、活动计划名称。名称用于展示和辅助核对，不是跨来源实例匹配键；同名不证明同一活动。统案名称、后续执行计划名称、随货搭赠名称和承接下沉的套餐名称分别对应各自活动对象。

### 活动类型 `MarketingActivity_activity_type_name`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_unity_apply_alloc_df.actv_code`、`v_mkt_cost_package_df.unity_plan_code`
- 口径：活动的业务类型，用于区别陈列活动、经销商套餐、统案套餐、业代套餐、统案活动、随货搭赠活动及其他实际记录类型。有直接类型名称字段的来源保留原值；专属业务来源未提供类型名称时，可依据实际活动引用及资料明确的对象类别计算类型名称。各来源的分类细度可能不同，不将统案套餐与统案活动认定为同义，也不把费用包类型、门店执行统计类型或钱包记账阶段作为活动类型。套餐类别影响计划、实施和确认金额的承担口径，不能将各类活动金额统一解释为现金支付。

### 活动开始时间 `MarketingActivity_start_time`

- 类型：dateTime，继承自 MarketingActivity
- 字段：`v_mkt_unity_apply_alloc_df.actv_start_date`
- 口径：活动或活动计划规定的开始日期或时间，保留来源实际提供的精度。它限定活动本身的开展期间，不是执行月、门店签约日期、订单创建时间或下沉统计月；同一来源中的开始与结束值须对应同一个活动对象。

### 活动结束时间 `MarketingActivity_end_time`

- 类型：dateTime，继承自 MarketingActivity
- 字段：`v_mkt_unity_apply_alloc_df.actv_end_date`
- 口径：活动或活动计划规定的结束日期或时间，保留来源实际提供的精度，并与同一活动的开始时间配套。计划结束时间不同于提前终止日期、费用确认或核销时间；随货搭赠活动的结束时间也不同于下沉截止时间，不能互相替代。
