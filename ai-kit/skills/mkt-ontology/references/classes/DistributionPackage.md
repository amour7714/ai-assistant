# 分销套餐 `DistributionPackage`

- 分组：活动
- 父类：MarketingActivity

## 说明

通过套餐本品、赠品或折扣安排推动门店分销的营销活动，包括经销商套餐、统案套餐和业代套餐。套餐活动不同于为其分配资金的套餐费用包。计划核销费用中的套餐计划、实施和确认字段按材料可能已经包含我司承担比例，不能沿用其他活动的金额计算方式。

## 指出的关系

无

## 指入的关系

- 套餐门店执行费用 → 执行套餐 `PackageExecutionCost_package`
  套餐门店执行费用通过v_mkt_package_cust_cost_mi同一行的plan_code、plan_name直接引用所执行的分销套餐活动，复用PackageExecutionCost_plan_code和PackageExecutionCost_plan_name。联系保留该费用事实的execute_ym、dealer_range_code、cust_code、cmdt_code范围；名称用于解释编码，不单独作为唯一标识。plan_dtl_id仅用于PackageExecutionCost_plan_detail关系中的计划明细引用，不作为套餐活动头标识。本联系不表示计划明细ID、套餐ID、渠道活动ID或不同来源的计划编码可以互换，也不证明跨来源套餐实例已匹配。
- 搭赠下沉明细 → 下沉套餐 `GiftSinkDetail_package`
  package_id、package_code、package_name直接记录承接下沉的分销套餐，不是费用包标识。

## 属性

### 套餐内部标识 `DistributionPackage_internal_identifier`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_id`、`v_trd_dist_ord_dtl.actv_id`、`v_mkt_shdz_sink_dtl_df.package_id`
- 口径：业务记录直接记载或引用的分销套餐活动内部标识。计划头标识、渠道活动ID和下沉追踪的套餐ID分别保留各自来源体系，不认定它们可以逐值互换；活动计划明细plan_dtl_id和费用包package_id不属于本属性。

### 套餐类型编码 `DistributionPackage_activity_type_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.actv_type_code`、`v_mkt_package_cust_cost_mi.actv_type_code`
- 口径：业务来源记录的套餐活动类型编码，与同一记录的活动类型名称配套，用于识别经销商套餐、统案套餐和业代套餐等已明确类别。不根据编码外观推断类别，也不与费用包类型SALES或费用事件的分类编码互换。

### 套餐终止日期 `DistributionPackage_termination_date`

- 类型：date
- 字段：`v_mkt_market_actv_plan_verify_cost.termination_date`、`v_mkt_package_cust_cost_mi.termination_date`
- 口径：业务记录所载的套餐活动终止日期，用于区别规定的活动结束时间与终止安排。不以执行月末、费用确认日期或核销日期替代，也不仅凭本字段为空判断套餐仍有效。

### 套餐活动阶段 `DistributionPackage_stage_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.actv_stage_name`
- 口径：来源记录所载的套餐活动业务阶段，用于解释活动进展。它不同于钱包费用事件在记账时的stage_code，也不能据此推断所有门店商品费用均处于相同核销状态；执行年月本身不证明该阶段是当月历史状态。

### 套餐计划状态编码 `DistributionPackage_plan_status_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_status_code`
- 口径：套餐计划有效性的原始状态编码，资料规定1为有效、0为无效。计划有效性不同于审批是否通过、活动是否到期或费用是否已核销，不由这些其他状态反推。

### 套餐计划状态 `DistributionPackage_plan_status_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_status_name`
- 口径：业务记录直接记载的套餐计划状态名称，与计划状态编码配套，资料将其解释为有效或无效。名称用于解释和展示，不代替审批状态或活动阶段。

### 套餐审批状态编码 `DistributionPackage_approval_status_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.aprv_status_code`
- 口径：套餐计划所关联审批流程的状态编码，与同一记录中的审批状态名称和流程审批ID对应。审批状态不等于计划有效性、套餐活动阶段或费用核销状态；资料未给出完整枚举，不猜补状态含义。

### 套餐审批状态 `DistributionPackage_approval_status_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.aprv_status_name`
- 口径：套餐计划所关联审批流程的状态名称，与同一记录的审批状态编码配套。保留业务来源的原始名称，不将计划有效或存在执行费用解释为已经审批通过。

### 关联审批流程标识 `DistributionPackage_approval_process_identifier`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.aprv_id`
- 口径：套餐计划记录直接引用的流程审批ID，用于识别上述审批状态所属的流程。它不是套餐活动标识、计划明细标识或核销明细标识；本轮不据此扩展审批步骤和审批流水。

### 套餐创建时间 `DistributionPackage_created_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.create_datetime`
- 口径：业务记录直接记载的套餐活动创建时间，用于解释活动建立时间，不是订单创建时间、执行年月、费用确认时间或下沉追踪更新时间。

### 套餐创建人 `DistributionPackage_created_by`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.create_user`
- 口径：业务记录直接记载的套餐活动创建人原始值，与该活动创建时间配套。资料未说明它采用姓名、账号还是员工编码，不将其直接解释为可关联人员主数据的员工编码。

### 活动编码 `MarketingActivity_activity_code`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_code`、`v_mkt_package_cust_cost_mi.plan_code`、`v_trd_dist_ord_dtl.chl_actv_code`、`v_mkt_shdz_sink_dtl_df.package_code`、`v_fin_expense_wallet_change_dtl_mi.event_object_code`
- 口径：原业务记录用于引用营销活动或活动计划的编码，包括计划编码、渠道活动编码、陈列活动编码、统案活动编码、随货搭赠编号及分销套餐编码。不同来源的编码体系分别保留，不认定同值编码必然表示同一活动，也不将活动头ID、计划明细ID、陈列签约ID或费用包编码当作本属性。统案活动编码与其后续执行计划编码指向不同参与对象。

### 活动名称 `MarketingActivity_activity_name`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_name`、`v_mkt_package_cust_cost_mi.plan_name`、`v_trd_dist_ord_dtl.chl_actv_name`、`v_ai_sus_ord_inspect_detail.chl_actv_name`、`v_mkt_shdz_sink_dtl_df.package_name`、`v_fin_expense_wallet_change_dtl_mi.event_object_name`
- 口径：业务记录直接记载或引用的营销活动、活动计划名称。名称用于展示和辅助核对，不是跨来源实例匹配键；同名不证明同一活动。统案名称、后续执行计划名称、随货搭赠名称和承接下沉的套餐名称分别对应各自活动对象。

### 活动类型 `MarketingActivity_activity_type_name`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_market_actv_plan_verify_cost.actv_type_name`、`v_mkt_package_cust_cost_mi.actv_type_name`、`v_trd_dist_ord_dtl.chl_actv_type_name`、`v_ai_sus_ord_inspect_detail.chl_actv_type_name`、`v_mkt_shdz_sink_dtl_df.package_code`
- 口径：活动的业务类型，用于区别陈列活动、经销商套餐、统案套餐、业代套餐、统案活动、随货搭赠活动及其他实际记录类型。有直接类型名称字段的来源保留原值；专属业务来源未提供类型名称时，可依据实际活动引用及资料明确的对象类别计算类型名称。各来源的分类细度可能不同，不将统案套餐与统案活动认定为同义，也不把费用包类型、门店执行统计类型或钱包记账阶段作为活动类型。套餐类别影响计划、实施和确认金额的承担口径，不能将各类活动金额统一解释为现金支付。

### 活动开始时间 `MarketingActivity_start_time`

- 类型：dateTime，继承自 MarketingActivity
- 字段：`v_mkt_market_actv_plan_verify_cost.start_date`、`v_mkt_package_cust_cost_mi.start_date`
- 口径：活动或活动计划规定的开始日期或时间，保留来源实际提供的精度。它限定活动本身的开展期间，不是执行月、门店签约日期、订单创建时间或下沉统计月；同一来源中的开始与结束值须对应同一个活动对象。

### 活动结束时间 `MarketingActivity_end_time`

- 类型：dateTime，继承自 MarketingActivity
- 字段：`v_mkt_market_actv_plan_verify_cost.end_date`、`v_mkt_package_cust_cost_mi.end_date`
- 口径：活动或活动计划规定的结束日期或时间，保留来源实际提供的精度，并与同一活动的开始时间配套。计划结束时间不同于提前终止日期、费用确认或核销时间；随货搭赠活动的结束时间也不同于下沉截止时间，不能互相替代。
