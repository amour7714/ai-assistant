# 陈列活动 `DisplayActivity`

- 分组：活动
- 父类：MarketingActivity

## 说明

围绕门店陈列要求开展的营销活动，形成具体门店陈列签约，并按执行检查和适用考核规则确定费用。其计划、签约、核销价和门店应发实发金额属于不同业务口径，不因均称陈列费而互换。

## 指出的关系

无

## 指入的关系

- 陈列签约 → 签约活动 `DisplaySigning_activity`
  actv_code、actv_name记录本签约所属陈列活动；活动编码不与dsp_id混用。
- 门店陈列执行统计 → 执行专项活动 `DisplayExecutionSummary_special_activity`
  zx_actv_code有实际专项活动引用时，表示本统计对应的陈列专项活动；不从常规统计类型反造活动实例。

## 属性

### 计划头标识 `DisplayActivity_plan_identifier`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_id`
- 口径：陈列活动以活动计划方式记录时，计划头的唯一标识。它不同于活动计划编码、计划明细标识plan_dtl_id和具体陈列签约标识dsp_id；同一计划头随执行月或明细出现，不因此成为多个活动。

### 活动类型编码 `DisplayActivity_type_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.actv_type_code`
- 口径：活动计划记录中表示陈列活动业务类型的原始编码，与继承的活动类型名称配套。不使用陈列签约类型、陈列项类型、费用包类型或钱包事件阶段代替。

### 计划活动阶段 `DisplayActivity_plan_stage_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.actv_stage_name`
- 口径：陈列活动计划记录附带的活动阶段名称。它描述活动计划的开展阶段，不是具体签约的检查结果，也不是钱包分录记账时的事件阶段；资料未提供阶段生效时间，不能把费用执行月解释为该阶段的历史观察月。

### 活动终止日期 `DisplayActivity_termination_date`

- 类型：date
- 字段：`v_mkt_market_actv_plan_verify_cost.termination_date`
- 口径：陈列活动计划记录的终止日期，与活动规定的结束时间分别解释，不能用终止日期覆盖原定结束时间，也不由结束时间自行推断终止日期。

### 计划有效状态编码 `DisplayActivity_plan_status_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_status_code`
- 口径：陈列活动计划记录附带的有效状态编码，资料定义1为有效、0为无效。计划有效性不同于审批是否通过、签约业务状态和陈列执行是否合格；本字段未提供状态变更历史。

### 计划有效状态名称 `DisplayActivity_plan_status_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_status_name`
- 口径：陈列活动计划记录附带的有效状态名称或展示值，与同一记录的计划有效状态编码配套。它不是陈列签约的正常、审批中等业务状态。

### 计划审批状态编码 `DisplayActivity_plan_approval_status_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.aprv_status_code`
- 口径：陈列活动计划记录附带的审批状态原编码，与该计划的审批流程标识及审批状态名称配套。不把计划有效标记或门店签约业务状态当作本审批状态，也不据此还原执行月末的历史审批状态。

### 计划审批状态名称 `DisplayActivity_plan_approval_status_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.aprv_status_name`
- 口径：陈列活动计划记录附带的审批状态名称，与同一计划记录的审批状态编码对应。计划审批结果不能替代具体陈列签约的业务状态或执行检查结果。

### 计划审批流程标识 `DisplayActivity_plan_approval_identifier`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.aprv_id`
- 口径：陈列活动计划直接引用的审批流程标识，用于识别该计划对应的审批流程。它不是活动头标识、计划明细标识或费用核销关联标识；有流程引用不表示审批已经通过。

### 计划创建时间 `DisplayActivity_plan_creation_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.create_datetime`
- 口径：陈列活动以活动计划方式记录时，计划头的创建时间。它不同于活动规定的开始时间、门店签约日期和费用执行月，不能据计划创建时间认定门店已经签约或活动已经开始。

### 计划创建人 `DisplayActivity_plan_creator`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.create_user`
- 口径：陈列活动计划记录直接记载的创建人值，与计划创建时间配套。它不是具体门店的签约业代或执行检查人；资料未说明本字段采用员工编码、域账号还是姓名，保留原值，不将其当作已确认的人员关联键。

### 活动编码 `MarketingActivity_activity_code`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_code`、`v_mkt_dsp_actv_info_mi.actv_code`、`v_mkt_dsp_execute_mi.zx_actv_code`
- 口径：原业务记录用于引用营销活动或活动计划的编码，包括计划编码、渠道活动编码、陈列活动编码、统案活动编码、随货搭赠编号及分销套餐编码。不同来源的编码体系分别保留，不认定同值编码必然表示同一活动，也不将活动头ID、计划明细ID、陈列签约ID或费用包编码当作本属性。统案活动编码与其后续执行计划编码指向不同参与对象。

### 活动名称 `MarketingActivity_activity_name`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_name`、`v_mkt_dsp_actv_info_mi.actv_name`
- 口径：业务记录直接记载或引用的营销活动、活动计划名称。名称用于展示和辅助核对，不是跨来源实例匹配键；同名不证明同一活动。统案名称、后续执行计划名称、随货搭赠名称和承接下沉的套餐名称分别对应各自活动对象。

### 活动类型 `MarketingActivity_activity_type_name`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_market_actv_plan_verify_cost.actv_type_name`、`v_mkt_dsp_actv_info_mi.actv_code`、`v_mkt_dsp_execute_mi.zx_actv_code`
- 口径：活动的业务类型，用于区别陈列活动、经销商套餐、统案套餐、业代套餐、统案活动、随货搭赠活动及其他实际记录类型。有直接类型名称字段的来源保留原值；专属业务来源未提供类型名称时，可依据实际活动引用及资料明确的对象类别计算类型名称。各来源的分类细度可能不同，不将统案套餐与统案活动认定为同义，也不把费用包类型、门店执行统计类型或钱包记账阶段作为活动类型。套餐类别影响计划、实施和确认金额的承担口径，不能将各类活动金额统一解释为现金支付。

### 活动开始时间 `MarketingActivity_start_time`

- 类型：dateTime，继承自 MarketingActivity
- 字段：`v_mkt_market_actv_plan_verify_cost.start_date`、`v_mkt_dsp_actv_info_mi.start_date`
- 口径：活动或活动计划规定的开始日期或时间，保留来源实际提供的精度。它限定活动本身的开展期间，不是执行月、门店签约日期、订单创建时间或下沉统计月；同一来源中的开始与结束值须对应同一个活动对象。

### 活动结束时间 `MarketingActivity_end_time`

- 类型：dateTime，继承自 MarketingActivity
- 字段：`v_mkt_market_actv_plan_verify_cost.end_date`、`v_mkt_dsp_actv_info_mi.end_date`
- 口径：活动或活动计划规定的结束日期或时间，保留来源实际提供的精度，并与同一活动的开始时间配套。计划结束时间不同于提前终止日期、费用确认或核销时间；随货搭赠活动的结束时间也不同于下沉截止时间，不能互相替代。
