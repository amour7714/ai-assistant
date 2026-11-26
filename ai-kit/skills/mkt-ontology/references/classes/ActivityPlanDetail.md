# 活动计划明细 `ActivityPlanDetail`

- 分组：活动
- 父类：无

## 说明

营销活动在执行月面向指定执行对象、费用项目及相关商品形成的计划明细，是计划、实施、考核、确认、待核销、核销和清算金额的共同业务主体。以execute_ym与plan_dtl_id等记录范围保持对应，不把plan_dtl_id当活动头标识，也不把dim_group_id当通用单据主键。待核销字段按业务定义是财务确认后结合承担比例和系数形成的金额，不擅自改为待核销减已核销的余额。核销与返还折扣、门店实发不同；高效经营经销商适用的陈列清算是按实际系数和承担比例核对差额的二次核销。

## 指出的关系

- 所属活动计划 → 营销活动 `ActivityPlanDetail_activity`
  plan_id、plan_code、plan_name记录明细所属营销活动计划，与plan_dtl_id层次区分。
- 关联销售客户 → 经销商 `ActivityPlanDetail_dealer`
  dealer_range_code记录本计划明细直接关联的销售客户；是否为执行对象还须结合execute_object_grain解释。
- 关联门店 → 门店 `ActivityPlanDetail_store`
  cust_code直接记录本活动明细所涉及的门店，不因另有子门店引用而省略。
- 关联子门店 → 子门店 `ActivityPlanDetail_store_scope`
  cust_range_code记录明细涉及的门店经营范围，不从cust_code任意选择子门店。
- 涉及商品 → 商品 `ActivityPlanDetail_product`
  cmdt_code直接记录活动计划明细涉及的商品，金额仍按明细实际粒度解释。
- 涉及SKU → SKU `ActivityPlanDetail_sku`
  sku_code直接记录明细涉及的SKU，不据关联商品数量重复分配计划金额。
- 涉及品类 → 品类 `ActivityPlanDetail_category`
  ctg_code、ctg_name直接记录本活动明细的品类范围。
- 约定陈列项 → 陈列项 `ActivityPlanDetail_display_item`
  仅陈列活动适用，sub_item_code、sub_item_name记录陈列项，不把其他活动子项一律当作陈列项。
- 钱包归属预留账户 → 预留费用账户 `ActivityPlanDetail_reserved_account`
  acct_code记录本计划费用所附钱包归属预留账户，不与费用账户expen_src_code互相补值。
- 计划归属办事处 → 办事处 `ActivityPlanDetail_office`
  off_code、off_name直接记录该执行月计划明细的办事处归属。
- 计划归属大区 → 大区 `ActivityPlanDetail_district`
  dis_code、dis_name直接记录该计划明细的大区归属。
- 支持部门 → 公司组织 `ActivityPlanDetail_supporting_department`
  supt_dpmt_code、supt_dpmt_name记录支持本计划明细的部门，与行政归属组织区分。
- 计划归属区域 → 公司组织 `ActivityPlanDetail_region`
  活动计划明细在对应执行月直接记录的公司销售管理区域，由v_mkt_market_actv_plan_verify_cost同一行reg_code、reg_name引用，复用ActivityPlanDetail_region_code和ActivityPlanDetail_region_name。区域编码与名称保留同一行execute_ym、plan_dtl_id及实际费用维度的对应，不作为活动计划头的永久归属，也不从下层套餐执行费用反向汇总区域。不沿大区当前所属区域替代直接引用，不认定跨来源组织编码已经等价或实例已经匹配。

## 指入的关系

- 套餐门店执行费用 → 对应计划明细 `PackageExecutionCost_plan_detail`
  套餐门店执行费用通过v_mkt_package_cust_cost_mi同一行的plan_dtl_id直接引用对应的活动计划明细，复用PackageExecutionCost_plan_detail_identifier，并保留execute_ym及该费用事实的dealer_range_code、cust_code、cmdt_code范围。plan_dtl_id表示计划明细，不表示套餐活动头；执行套餐另由PackageExecutionCost_package通过plan_code、plan_name引用。不将计划明细ID与套餐ID、渠道活动ID互换，也不据此认定不同来源的计划编码等价。比较计划明细费用与门店商品执行费用时须保留各自粒度，不将两层金额重复累计。

## 属性

### 计划明细标识 `ActivityPlanDetail_detail_identifier`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_dtl_id`、`v_mkt_package_cust_cost_mi.plan_dtl_id`
- 口径：plan_dtl_id表示活动计划明细身份，与plan_id表示的活动计划头区分。须结合执行月及原记录范围使用；在套餐门店商品费用中，它是被引用的计划明细标识，不是该费用行的唯一标识。

### 执行年月 `ActivityPlanDetail_execution_month`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.execute_ym`、`v_mkt_package_cust_cost_mi.execute_ym`
- 口径：本明细及费用金额所属execute_ym，不用费用确认日期或核销日期所在月替代。

### 执行对象粒度 `ActivityPlanDetail_execution_object_grain`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.execute_object_grain`、`v_mkt_package_cust_cost_mi.execute_object_grain`
- 口径：execute_object_grain规定execute_object_code所指对象的类别，不能把该编码统一当成门店或经销商外键。

### 执行对象编码 `ActivityPlanDetail_execution_object_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.execute_object_code`、`v_mkt_package_cust_cost_mi.execute_object_code`
- 口径：本计划明细指定执行对象的引用编码，须由同一记录的execute_object_grain解释对象类别。不能用关联销售客户编码、门店编码或子门店编码无条件替代。

### 费用财年 `ActivityPlanDetail_financial_year`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.fin_year`
- 口径：本计划明细费用记录所属的财年。业务财年为上年12月至本年11月，取记录提供的财年，不以活动创建日期的自然年替代。

### 所属计划标识 `ActivityPlanDetail_plan_identifier`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_id`
- 口径：本明细直接引用的活动计划头唯一标识，表示所属计划，不表示计划明细身份。

### 所属计划编码 `ActivityPlanDetail_plan_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_code`、`v_mkt_package_cust_cost_mi.plan_code`
- 口径：本明细所属活动计划的业务编码，与计划头标识、计划名称配套；不与计划明细标识混用。

### 所属计划名称 `ActivityPlanDetail_plan_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_name`、`v_mkt_package_cust_cost_mi.plan_name`
- 口径：本明细记录的所属活动计划名称，用于解释计划引用，不单独作为唯一标识。

### 活动类型编码 `ActivityPlanDetail_activity_type_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.actv_type_code`、`v_mkt_package_cust_cost_mi.actv_type_code`
- 口径：本明细所属活动的类型编码，用于解释计划、实施、确认等金额的活动适用口径，不表示核销状态。

### 活动类型名称 `ActivityPlanDetail_activity_type_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.actv_type_name`、`v_mkt_package_cust_cost_mi.actv_type_name`
- 口径：本明细记录的活动类型名称。指标材料将经销商套餐、统案套餐、业代套餐作为特殊金额口径范围；陈列活动、达成、超额等取值分别用于选取陈列及返利计划范围，不应将这些范围的金额重复相加。

### 所属活动开始时间 `ActivityPlanDetail_activity_start_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.start_date`、`v_mkt_package_cust_cost_mi.start_date`
- 口径：本明细记录所附所属活动的开始时间，用于理解活动适用期间，不是费用执行月或费用确认时间。

### 所属活动结束时间 `ActivityPlanDetail_activity_end_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.end_date`、`v_mkt_package_cust_cost_mi.end_date`
- 口径：本明细记录所附所属活动的结束时间，与活动终止日期分别解释，不用来替代本费用记录的执行年月。

### 所属活动终止日期 `ActivityPlanDetail_activity_termination_date`

- 类型：date
- 字段：`v_mkt_market_actv_plan_verify_cost.termination_date`、`v_mkt_package_cust_cost_mi.termination_date`
- 口径：本明细记录所附所属活动的终止日期，不等同约定结束时间，也不表示本笔费用已经核销或清算。

### 记录活动阶段 `ActivityPlanDetail_activity_stage_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.actv_stage_name`
- 口径：本计划费用记录所附的活动阶段名称，不等同钱包分录记账时的事件阶段，也不能替代审批、计划有效性或核销状态。

### 费用类型编码 `ActivityPlanDetail_expense_type_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.expen_type_code`
- 口径：本计划明细记录的费用类型编码，与费用类型名称配套。不能将费用包中同名字段的D自有、U预留含义套用于本字段。

### 费用类型名称 `ActivityPlanDetail_expense_type_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.expen_type_name`
- 口径：本计划明细记录的费用类型名称，与费用类型编码共同解释费用范围，不作为自有或预留费用模式的替代字段。

### 营销类型编码 `ActivityPlanDetail_marketing_type_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.mkting_type_code`
- 口径：本费用记录的营销类型编码，资料明确3表示市场费用、5表示水专项费用；不等同活动类型、费用出处或自有预留分类。

### 营销类型名称 `ActivityPlanDetail_marketing_type_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.mkting_type_name`
- 口径：本费用记录的营销类型名称，与营销类型编码配套。

### 核销关联分组标识 `ActivityPlanDetail_dimension_group_identifier`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.dim_group_id`
- 口径：本计划费用记录用于关联主活动维度分组或核销业务范围的dim_group_id。它不是计划头、计划明细或通用单据的唯一标识，同组可以涉及多条业务记录。

### 费用账户引用编码 `ActivityPlanDetail_expense_account_reference_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.expen_src_code`
- 口径：本计划费用记录的expen_src_code，原表明确标注为费用账户编码。其对象是否与费用来源配置相同尚未明确，不与钱包归属预留账户acct_code合并或互相补值。

### 钱包归属预留账户编码 `ActivityPlanDetail_reserved_account_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.acct_code`
- 口径：本计划费用记录直接引用的钱包归属预留账户编码，不表示钱包编码或现金账户，也不等同费用账户引用expen_src_code。

### 活动项目 `ActivityPlanDetail_project_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.project_name`
- 口径：本计划费用记录的活动项目或项目名称，与费用项目科目分别解释。

### 费用科目编码 `ActivityPlanDetail_subject_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.subject_code`
- 口径：本计划明细所针对的费用项目或科目编码，是解释费用归属和统计范围的记录引用。

### 费用科目名称 `ActivityPlanDetail_subject_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.subject_name`
- 口径：本计划明细记录的费用项目或科目名称，不等同活动项目名称。

### 支持部门编码 `ActivityPlanDetail_supporting_department_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.supt_dpmt_code`
- 口径：本计划明细直接记录的支持部门引用编码，表示支持身份，不等同计划归属办事处或大区。

### 支持部门名称 `ActivityPlanDetail_supporting_department_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.supt_dpmt_name`
- 口径：本计划明细记录的支持部门名称，与支持部门编码配套。

### 审批状态编码 `ActivityPlanDetail_approval_status_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.aprv_status_code`
- 口径：本计划明细记录所附的审批状态编码，不等同计划是否有效，也不能据此判断费用是否已经核销。

### 审批状态名称 `ActivityPlanDetail_approval_status_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.aprv_status_name`
- 口径：本计划明细记录所附的审批状态名称，与审批状态编码配套使用。

### 审批流程标识 `ActivityPlanDetail_approval_process_identifier`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.aprv_id`
- 口径：本计划明细记录引用的流程审批标识，用于识别其所附审批流程，不是审批状态值或活动计划标识。

### 计划有效性编码 `ActivityPlanDetail_plan_status_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_status_code`
- 口径：本记录所附计划的有效性编码，1表示有效、0表示无效。有效计划不自动表示审批通过、执行完成或费用已核销。

### 计划有效性名称 `ActivityPlanDetail_plan_status_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_status_name`
- 口径：本记录所附计划的有效性名称，与计划有效性编码配套；不作为核销状态名称使用。

### 应发确认时间 `ActivityPlanDetail_payable_confirmation_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.payable_confirm_datetime`
- 口径：本计划明细费用记录的应发确认日期时间，与费用确认时间范围及核销时间范围分别解释。存在应发确认时间不表示门店已经收到费用。

### 最早费用确认时间 `ActivityPlanDetail_first_expense_confirmation_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.confirm_datetime_min`
- 口径：本计划明细费用记录提供的最早费用确认日期时间，用于描述确认时间范围，不作为费用执行月的替代。

### 最晚费用确认时间 `ActivityPlanDetail_last_expense_confirmation_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.confirm_datetime_max`
- 口径：本计划明细费用记录提供的最晚费用确认日期时间，与最早费用确认时间构成同一记录的确认时间范围。

### 最早核销时间 `ActivityPlanDetail_first_verification_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.verify_datetime_min`
- 口径：本计划明细费用记录提供的最早核销日期时间，不是活动开始时间或费用确认时间。

### 最晚核销时间 `ActivityPlanDetail_last_verification_time`

- 类型：dateTime
- 字段：`v_mkt_market_actv_plan_verify_cost.verify_datetime_max`
- 口径：本计划明细费用记录提供的最晚核销日期时间，与最早核销时间共同描述本记录的核销时间范围，不表示折扣返还或门店实发时间。

### 关联销售客户编码 `ActivityPlanDetail_dealer_range_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.dealer_range_code`
- 口径：本计划明细直接关联的销售客户销售范围编码。该客户是否就是指定执行对象还须结合执行对象粒度及编码解释，不把它认作付款方或SAP客户编码。

### 关联销售客户名称 `ActivityPlanDetail_dealer_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.dealer_name`
- 口径：本计划明细记录的关联销售客户名称，与该记录销售范围编码配套，不以名称相同认定客户身份相同。

### 关联门店编码 `ActivityPlanDetail_customer_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.cust_code`
- 口径：本计划明细直接涉及的终端客户编码，表示实际门店，不等同子门店经营范围编码。

### 关联门店名称 `ActivityPlanDetail_customer_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.cust_name`
- 口径：本计划明细记录的关联门店名称，与门店编码配套，不单独作为唯一身份。

### 关联子门店编码 `ActivityPlanDetail_customer_scope_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.cust_range_code`
- 口径：本计划明细直接涉及的终端客户经营范围编码，表示子门店服务范围。一个门店可以有多个经营范围，不能仅凭门店编码任取一个子门店。

### 记录渠道编码 `ActivityPlanDetail_channel_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.chl_code`
- 口径：本计划明细记录的渠道编码，与渠道名称配套。资料未明确本列渠道层级，不自动认作子渠道、生动化渠道或渠道群编码。

### 记录渠道名称 `ActivityPlanDetail_channel_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.chl_name`
- 口径：本计划明细记录的渠道名称，按本记录渠道范围解释，不因名称相似而认定与其他渠道层级等价。

### 涉及商品编码 `ActivityPlanDetail_product_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.cmdt_code`
- 口径：本计划明细直接涉及的商品引用编码。金额是否已按商品拆分须遵守本表实际记录粒度，不能因出现商品编码就重复分配计划金额。

### 涉及商品名称 `ActivityPlanDetail_product_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.cmdt_name`
- 口径：本计划明细记录所附的商品名称，与该记录商品编码配套，不用当前商品主数据名称无条件覆盖记录值。

### 涉及SKU编码 `ActivityPlanDetail_sku_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.sku_code`
- 口径：本计划明细直接记录的SKU引用编码，SKU与商品不是同一粒度，不用商品编码替代。

### 涉及SKU名称 `ActivityPlanDetail_sku_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.sku_name`
- 口径：本计划明细记录的SKU名称，与本记录SKU编码配套。

### 记录规格 `ActivityPlanDetail_specification`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.spec_code`
- 口径：本计划明细spec_code记录的规格值。资料仅标注为规格，未说明编码体系，不据字段名认定它等于商品包装规格、SKU编码或陈列规格数量。

### 涉及品类编码 `ActivityPlanDetail_category_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.ctg_code`
- 口径：本计划明细直接记录的产品品类引用编码，不等同活动类型、商品类目或合同品类。

### 涉及品类名称 `ActivityPlanDetail_category_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.ctg_name`
- 口径：本计划明细记录的产品品类名称，与品类编码配套，不由活动名称或商品名称推断。

### 统案引用标识 `ActivityPlanDetail_unified_reference_identifier`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.unity_alloc_id`
- 口径：本活动计划明细费用记录直接保存的统案引用标识，来源字段为unity_alloc_id，原表标注为统案ID。资料尚未明确其引用的业务层级，因此保留原值，不将其确定为统案活动头或客户分配标识，也不沿用钱包事件同名字段的引用规则。

### 我司计划承担比例 `ActivityPlanDetail_planned_company_bearing_ratio`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_cmpy_bear_ratio`
- 口径：本计划明细配置的我司计划费用承担比例，与实际承担比例区分。指标材料对三类套餐将plan_amt作为已包含我司承担的计划金额，其他活动的我司承担计划金额按计划全额乘本比例解释；比例存储尺度未明确，不自行追加或取消百分数换算。

### 我司实际承担比例 `ActivityPlanDetail_actual_company_bearing_ratio`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.actul_cmpy_bear_raito`
- 口径：本计划明细在对应执行月记录的我司实际费用承担比例。非陈列活动表示营销费用核销时的承担比例；陈列活动表示可以由经销商自有额度承担的费用金额占比，超出部分由经销商毛利承担，不表示公司实际现金付款比例。陈列选档使用市场销售达成率：当月市场达成率＝当月市场达成基数÷当月销售目标金额×100%，年累市场达成率＝年累市场达成基数÷年累销售目标金额×100%。当月市场达成基数由业务人员在业务系统的营销费用销量板块导入，销售目标金额采用销售客户合同约定的目标；不能用普通销售考核金额与预算目标计算的销售达成率替代。对同一经销商，取当月与年累市场达成率中的较高值确定当月承担比例，不追溯调整以前月份。KA、低温和母婴经销商按以下规则选档：达成率＞100%时为原承担比例增加5个百分点；90%≤达成率≤100%时维持原比例；60%≤达成率＜90%时为原比例减少5个百分点；达成率＜60%时为0。原承担比例指活动配置时的我司承担比例；上述三类经销商原比例已经为10%时，不执行加减档，达成率≥60%仍为10%，低于60%为0。其他经销商按六档确定比例：达成率≥110%为85%；100%≤达成率＜110%为80%；90%≤达成率＜100%为75%；80%≤达成率＜90%为70%；60%≤达成率＜80%为50%；达成率＜60%为0。核销状态未确认时由数据平台计算，确认后取中台结果。本属性直接读取业务已提供的实际比例，不用计划比例补空，不重新选档。规则中的百分比不证明源字段的实际存储尺度已明确；本轮没有实际市场达成基数和合同销售目标的字段来源，因此这些说明仅用于解释适用规则，不提供可重算的市场达成率或承担比例。

### 记录计划金额 `ActivityPlanDetail_recorded_plan_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.plan_amt`
- 口径：本计划明细plan_amt保存的计划金额。非套餐活动按提报计划或签约计划金额解释，陈列活动为协议中的门店计划合作费用；指标材料明确经销商套餐、统案套餐、业代套餐的本字段按我司承担计划金额使用，套餐计划全额需按计划承担比例还原。因此本属性保留原字段口径，不宣称各活动类型均为统一计划全额。陈列计划、达成返利计划、超额返利计划分别通过活动类型筛选，不另加到本字段总额。

### 记录实施金额 `ActivityPlanDetail_recorded_implementation_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.impl_amt`
- 口径：本计划明细impl_amt保存的实施阶段金额。非陈列活动的业务含义为活动实际发生后录入的实施金额；三类套餐的本字段在指标材料中按我司承担实施金额使用，套餐实施全额按实际承担比例优先、为空时取计划比例还原，并被解释为含税赠品金额。陈列实施金额在材料中存在计划金额与陈列核销价金额两种解释，暂保留原值，不任选一种，也不直接用陈列签约或执行费用金额替代。

### 市场考核金额 `ActivityPlanDetail_market_assessment_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.ass_amt`
- 口径：本计划明细记录的市场考核金额。指标材料定义为市场确认金额乘核销系数，非陈列活动核销系数默认100%，陈列活动的确认金额在核销价基础上形成。它不是公司销售调整表的销售考核金额，也未包含再乘我司实际承担比例后的待核销口径。

### 营销费用预估金额 `ActivityPlanDetail_estimated_expense_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.estm_amt`
- 口径：本计划明细提供的营销费用预估金额。指标材料分别参照市场营销费用合计和渠道营销费用预估口径，具体加工算法未完整提供，因此采用现有结果，不用计划、实施或核销金额无条件替代。

### 记录确认金额 `ActivityPlanDetail_recorded_confirmation_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.confirm_amt`
- 口径：本计划明细confirm_amt保存的费用确认金额，业务上是财务根据费用管理制度及核销资料要求调整后的金额。指标材料对非套餐直接采用本字段，对三类套餐将本字段作为已包含我司承担的确认金额，确认全额按实际承担比例还原。它不是门店账单应发金额；非套餐我司承担确认金额选用计划比例还是实际优先比例存在资料冲突，不据此另行计算。

### 待核销金额 `ActivityPlanDetail_waiting_verification_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.wait_verify_amt`
- 口径：本计划明细财务确认后结合我司承担比例、核销系数或达成系数确定的待核销金额，包含适用的预留或自有额度承担部分。市场活动按市场考核金额乘我司实际承担比例解释，渠道活动按我司承担确认金额乘渠道达成率系数解释。本字段不是待核销减已核销后的剩余余额，不能自行扣除verify_amt改写。

### 额度不足未核销金额 `ActivityPlanDetail_insufficient_quota_unverified_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.non_verify_amt`
- 口径：本计划明细中因额度不足而未核销的市场待核销金额部分。它是特定原因下的未核销金额，不等于所有未核销费用，也不能用待核销金额减核销金额普遍替代。

### 核销金额 `ActivityPlanDetail_verification_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.verify_amt`
- 口径：本计划明细费用完成核销后形成的金额。材料中的适用核销范围包括已核销未返还、已返还、已核销未返还至大区、已返还至大区及已核销状态。本字段与清算金额分别保存，不等同折扣已经返还，更不等同门店陈列实发金额。

### 返还折扣金额 `ActivityPlanDetail_returned_discount_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.retn_discount_amt`
- 口径：本计划明细市场费用核销后实际返还到销售客户的折扣金额。材料说明其对应费用核销页面导入的SAP金额，只有产品支付才有此类返还折扣金额。它不是全部支付方式的付款金额，也不等于核销金额或门店实发金额。

### 陈列清算金额 `ActivityPlanDetail_settlement_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.check_verify_amt`
- 口径：高效经营经销商适用的陈列支付清算差额，是二次核销金额。当月提前发放陈列费时先按100%核销系数及系统配置承担比例核销，材料规定次月7日生成清算，按实际核销系数和实际承担比例核对差额。它不是再次计入的完整陈列费用，也不能由本字段是否有值反向确定经销商经营类别。

### 核销金额含清算 `ActivityPlanDetail_verification_with_settlement_amount`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.verify_amt`、`v_mkt_market_actv_plan_verify_cost.check_verify_amt`
- 口径：本计划明细核销金额与清算金额相加得到的核销总金额，即verify_amt加check_verify_amt。沿用指标材料逐记录相加的表达，任一输入缺失时结果为空，不自行将缺失清算金额当作0。使用此结果时不再另外加核销金额或清算金额。

### 核销完成率 `ActivityPlanDetail_verification_completion_rate`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.verify_amt`、`v_mkt_market_actv_plan_verify_cost.wait_verify_amt`
- 口径：本计划明细核销金额占对应待核销金额的比例，按verify_amt除以wait_verify_amt计算；待核销金额不是剩余余额。任一输入为空或分母为0时结果未定义。汇总分析应在一致费用范围内先分别汇总核销金额和待核销金额再相除，不对各明细完成率求平均。计算结果为比值，展示为百分比时乘100。

### 套餐折扣力度 `ActivityPlanDetail_package_discount_rate`

- 类型：decimal
- 字段：`v_mkt_market_actv_plan_verify_cost.discount_rate`
- 口径：经销商套餐、统案套餐、业代套餐适用的折扣力度。指标材料定义为套餐含税赠品金额除以套餐含税分销金额与含税赠品金额之和；本属性直接采用业务提供的discount_rate，不用缺少的套餐结果金额列重算，也不对不同套餐的力度直接求和或平均。

### 陈列签约类型编码 `ActivityPlanDetail_display_signing_type_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.sign_type_code`
- 口径：本计划明细在陈列业务中记录的签约类型编码，不等同活动类型或陈列项编码。资料未给出完整类型枚举，不自行翻译或与其他表签约类型逐值等同。

### 活动子项编码 `ActivityPlanDetail_sub_item_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.sub_item_code`
- 口径：本计划明细记录的活动子项编码。仅在陈列活动中明确表示约定陈列项编码，其他活动的子项不能一律解释为陈列项。

### 活动子项名称 `ActivityPlanDetail_sub_item_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.sub_item_name`
- 口径：本计划明细记录的活动子项名称；陈列活动中为陈列项名称，与具体签约身份或设备实例区分。

### 计划归属办事处编码 `ActivityPlanDetail_office_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.off_code`
- 口径：本执行月计划明细直接记录的归属办事处引用编码，不由经销商当前主数据归属覆盖。

### 计划归属办事处名称 `ActivityPlanDetail_office_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.off_name`
- 口径：本执行月计划明细记录的归属办事处名称，与本记录办事处编码配套。

### 计划归属大区编码 `ActivityPlanDetail_district_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.dis_code`
- 口径：本执行月计划明细直接记录的归属大区引用编码，不仅由办事处当前组织层级反推。

### 计划归属大区名称 `ActivityPlanDetail_district_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.dis_name`
- 口径：本执行月计划明细记录的归属大区名称，与大区编码配套，不无条件替换为当前组织名称。

### 计划归属区域编码 `ActivityPlanDetail_region_code`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.reg_code`
- 口径：本执行月计划明细直接记录的归属区域组织编码，区域为销售管理组织范围，不表示省市行政区划。

### 计划归属区域名称 `ActivityPlanDetail_region_name`

- 类型：string
- 字段：`v_mkt_market_actv_plan_verify_cost.reg_name`
- 口径：本执行月计划明细记录的归属区域组织名称，与区域编码配套。
