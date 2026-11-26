# 大区 `SalesDistrict`

- 分组：组织
- 父类：Organization

## 说明

管理办事处并承担销售和费用管理的大区级组织。组织目标可以按其所属办事处汇总；AC资料中的distnm按用户确认表示本类组织，不表示省份或城市。

## 指出的关系

- 所属区域 → 公司组织 `SalesDistrict_region`
  组织资料中大区对应reg_code、reg_name所记录的上层区域组织；不将区域解释为省市行政区划。

## 指入的关系

- 子门店 → 归属大区 `StoreScope_district`
  dis_code、dis_name直接记录子门店所属大区，不能仅由当前办事处层级替代历史月度归属。
- 办事处 → 所属大区 `SalesOffice_district`
  组织及业务资料中的办事处与配套大区构成管理归属；历史目标汇总采用该目标期间记录的归属。
- 经销商 → 归属大区 `Dealer_district`
  销售客户主数据直接记录经销商当前所属大区；不替代交易或费用事实中的历史归属。
- 分销订单行 → 当时所属大区 `DistributionOrderLine_original_district`
  dis_name_orgn直接记录订单当时所属大区。
- 分销订单行 → 当时服务大区 `DistributionOrderLine_service_district`
  serv_dis_name_orgn记录当时服务大区，与订单所属大区分别保留。
- 分销订单行 → 记录大区 `DistributionOrderLine_current_district`
  分销订单商品行在来源资料中直接记录的大区归属。历史分销明细v_trd_dist_ord_dtl由非orgn的dis_code、dis_name记录所附大区；异常检查资料v_ai_sus_ord_inspect_detail由dis_name记录虚假分销订单商品行所附大区，限定于该资料的dist_ord_no、cmdt_code记录范围。两来源沿用同一联系，仍分别保留历史明细与认定记录的来源值，不认定名称相同就表示同一实例，不以历史编码或办事处当前层级补出认定记录的大区编码。取值时点尚未明确，不宣称为查询当日的当前归属；订单当时所属和当时服务大区的关系保持独立。
- 实际销售考核明细 → 当期考核大区 `SalesAssessment_assessment_district`
  ass_dis_code、ass_dis_name直接记录当期考核大区，不用考核销售大区或售达方大区替代。
- 实际销售考核明细 → 同期对齐大区 `SalesAssessment_comparison_district`
  yty_dis_code、yty_dis_name记录同期对齐大区，仅在相应同期口径使用。
- 实际销售考核明细 → 当期考核销售大区 `SalesAssessment_sales_district`
  ass_sales_dis_name直接表示ass_sales口径的大区。
- 实际销售考核明细 → 同期销售大区 `SalesAssessment_comparison_sales_district`
  yty_sales_dis_name记录同期销售组织口径的大区。
- 实际销售考核明细 → 售达方销售大区 `SalesAssessment_sold_to_district`
  dealer_sales_dis_name表示售达方销售大区，与送达方及考核归属分别保留。
- 实际销售考核明细 → 送达方销售大区 `SalesAssessment_ship_to_district`
  send_sales_dis_name直接记录本笔销售送达方的销售大区。
- 经销商销售目标 → 目标归属大区 `DealerSalesTarget_district`
  目标行dis_code、dis_name直接记录经销商目标的大区归属。
- 组织销售目标 → 目标大区 `OfficeSalesTarget_district`
  目标来源直接记录的dis或ass_dis字段表示相应目标的大区归属。
- 月度分销目标 → 目标归属大区 `DistributionTarget_attribution_district`
  分销目标来源直接记录的大区用于当月归属及汇总，不把不同主体层级目标累加。
- 门店月度稽查结果 → 月度大区 `StoreInspectionMonth_district`
  dis_name直接记录月度检查归属大区，不由now_dis_name覆盖。
- 门店月度稽查结果 → 当前大区 `StoreInspectionMonth_current_district`
  now_dis_name记录结果所附当前大区，与月度大区分别保留。
- AC月度市场指标 → 统计大区 `ACMarketObservation_district`
  distnm直接记录本条AC指标的大区，采用用户确认含义，不再按省份指标替代大区。
- 活动计划明细 → 计划归属大区 `ActivityPlanDetail_district`
  dis_code、dis_name直接记录该计划明细的大区归属。
- 陈列签约 → 行政大区 `DisplaySigning_district`
  dis_code、dis_name记录签约资料行政大区，与cust_dis字段表示的门店大区区分。
- 陈列签约 → 门店大区 `DisplaySigning_store_district`
  cust_dis_code、cust_dis_name直接记录签约门店大区，不与签约行政大区自动合并。
- 套餐门店执行费用 → 执行归属大区 `PackageExecutionCost_district`
  费用行dis_code、dis_name直接记录该执行范围的大区。
- 月度陈列项检查结果 → 记录大区 `DisplayItemInspection_district`
  dis_code、dis_name直接记录月度检查结果所属大区。
- 门店陈列执行统计 → 记录大区 `DisplayExecutionSummary_district`
  dis_name直接记录执行统计所属大区。
- 营销费用预算项 → 预算归属大区 `ExpenseBudgetItem_district`
  dis_code、dis_name直接记录预算归属大区；总部预算不因附带组织字段而改成大区预算。
- 预留费用账户 → 账户行政大区 `ReservedExpenseAccount_district`
  RESERVED余额行dis_code直接记录账户归属大区；预留与客户计划占用合并分析最细只能到资料允许的大区范围。
- 客户自有计划额度 → 计划额度大区 `CustomerPlanQuota_district`
  PLAN行dis_code直接记录额度行政大区；活动占用可与同范围预留使用合并，但不能再加核销额度已用值。
- 客户自有核销额度 → 核销额度大区 `CustomerVerificationQuota_district`
  VERIFY行dis_code直接记录当前来源额度行政大区。
- 费用钱包 → 钱包行政大区 `ExpenseWallet_district`
  dis_code、dis_name直接记录钱包行政大区。
- 钱包分录 → 分录钱包大区 `WalletEntry_wallet_district`
  分录dis_code直接记录加工快照中的钱包行政大区。
- 费用包 → 费用包大区 `ExpensePackage_district`
  dis_code、dis_name直接记录费用包归属大区。
- 统案支持费用项 → 记录大区 `UnifiedSupportItem_district`
  费用项对应行的dis_code直接记录统案支持组织范围，保留活动主题和明细列表对应。
- 统案客户分配 → 分配大区 `UnifiedCustomerAllocation_district`
  经销商主题客户分配中的dis字段记录作出统案支持分配的大区，dis_supt_amt属于具体客户分配。
- 虚假重复客资认定 → 主门店大区 `DuplicateStoreFinding_primary_district`
  dis_code直接记录本月主门店一方的大区。
- 虚假重复客资认定 → 配对门店大区 `DuplicateStoreFinding_duplicate_district`
  dup_dis_code直接记录本月配对门店一方的大区。
- 虚假陈列认定 → 记录大区 `FalseDisplayFinding_district`
  dis_name直接记录虚假陈列认定所属大区。
- 经销商商品库存 → 记录大区 `DealerInventory_recorded_district`
  p_org_name记录库存资料所附大区，与当时dis_name分别解释。
- 经销商商品库存 → 当时大区 `DealerInventory_original_district`
  dis_name明确记录库存业务当时大区。
- 搭赠下沉明细 → 下沉归属大区 `GiftSinkDetail_district`
  dis_code、dis_name直接记录本条下沉追踪的大区归属。
- 门店拜访 → 当时大区 `StoreVisit_original_district`
  dis_code、dis_name直接记录拜访发生时大区。
- 门店拜访 → 另附大区 `StoreVisit_current_district`
  cur_dis_name直接记录本次拜访资料另附的大区引用，取值时点及归属口径尚未明确，不自动解释为当前大区。与dis_code、dis_name明确记录的拜访发生时大区分别保留；名称引用不证明已完成大区编码匹配。

## 属性

### 组织编码 `Organization_code`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.org_code`、`v_dim_hr_org.dis_code`、`v_dim_hr_emp.org_code`、`v_dim_chl_dealer.dis_code`、`v_dim_chl_sub_cust_df.dis_code`、`v_trd_dist_ord_dtl.dis_code`、`v_trd_sales_adjust_df.ass_dis_code`、`v_trd_sales_adjust_df.yty_dis_code`、`v_trd_sales_target_dealer_mi.dis_code`、`v_trd_sales_target_org_mi.dis_code`、`v_trd_dist_ord_target_mgr_1m_df.dis_code`、`v_trd_dist_ord_target_emp_1m_df.dis_code`、`v_trd_dist_target_dealer_df.dis_code`、`v_trd_dist_target_org_df.dis_code`、`v_mkt_market_actv_plan_verify_cost.dis_code`、`v_mkt_actv_inspect_result.dis_code`、`v_mkt_dsp_actv_info_mi.dis_code`、`v_mkt_dsp_actv_info_mi.cust_dis_code`、`v_mkt_package_cust_cost_mi.dis_code`、`v_dim_chl_sub_cust_indct_mi.dis_code`、`v_mkt_budget_snapshot_df.dis_code`、`v_fin_expense_quota_balance_df.dis_code`、`v_fin_expense_wallet_df.dis_code`、`v_fin_expense_wallet_change_dtl_mi.dis_code`、`v_mkt_cost_package_df.dis_code`、`v_mkt_unity_apply_alloc_df.dis_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.dis_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.dup_dis_code`、`v_mkt_shdz_sink_dtl_df.dis_code`、`v_chl_visit_dtl.dis_code`
- 口径：当前组织主数据或业务记录直接记载的单个组织编码，包括办事处、大区、区域和部门等组织的编码。每个来源按其字段所指的组织、参与身份和期间解释，与同一来源的配套名称保持对应；同一行的多个组织引用不能合并为一个组织。来源之间不默认编码等价，销售组织范围编码、组织编码路径和AC组织清单不直接作为本属性的单值来源。拜访资料的cur_off_code表示另附办事处引用，取值时点尚未明确，不作为已确认的当前归属。

### 组织名称 `Organization_name`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.org_name`、`v_dim_hr_org.dis_name`、`v_dim_hr_emp.org_name`、`v_dim_chl_dealer.dis_name`、`v_dim_chl_sub_cust_df.dis_name`、`v_trd_dist_ord_dtl.dis_name_orgn`、`v_trd_dist_ord_dtl.serv_dis_name_orgn`、`v_trd_dist_ord_dtl.dis_name`、`v_trd_sales_adjust_df.ass_dis_name`、`v_trd_sales_adjust_df.yty_dis_name`、`v_trd_sales_adjust_df.ass_sales_dis_name`、`v_trd_sales_adjust_df.yty_sales_dis_name`、`v_trd_sales_adjust_df.dealer_sales_dis_name`、`v_trd_sales_adjust_df.send_sales_dis_name`、`v_trd_sales_target_dealer_mi.dis_name`、`v_trd_sales_target_org_mi.dis_name`、`v_trd_dist_ord_target_mgr_1m_df.dis_name`、`v_trd_dist_ord_target_emp_1m_df.dis_name`、`v_trd_dist_target_dealer_df.dis_name`、`v_trd_dist_target_org_df.dis_name`、`v_chl_jc_cust_mi.dis_name`、`v_chl_jc_cust_mi.now_dis_name`、`v_chl_ac_nf_sku_mi.distnm`、`v_mkt_market_actv_plan_verify_cost.dis_name`、`v_mkt_actv_inspect_result.dis_name`、`v_mkt_dsp_actv_info_mi.dis_name`、`v_mkt_dsp_actv_info_mi.cust_dis_name`、`v_mkt_package_cust_cost_mi.dis_name`、`v_mkt_dsp_execute_mi.dis_name`、`v_dim_chl_sub_cust_indct_mi.dis_name`、`v_mkt_budget_snapshot_df.dis_name`、`v_fin_expense_quota_balance_df.dis_name`、`v_fin_expense_wallet_df.dis_name`、`v_fin_expense_wallet_change_dtl_mi.dis_name`、`v_mkt_cost_package_df.dis_name`、`v_mkt_unity_apply_alloc_df.dis_name`、`v_ai_sus_ord_inspect_detail.dis_name`、`v_ads_ai_chl_sus_display_fee_detail.dis_name`、`v_inv_dealer_cmdt_di.p_org_name`、`v_inv_dealer_cmdt_di.dis_name`、`v_mkt_shdz_sink_dtl_df.dis_name`、`v_chl_visit_dtl.dis_name`、`v_chl_visit_dtl.cur_dis_name`
- 口径：组织在当前主数据或具体业务记录中直接记载的名称。名称必须与来源记录中的组织身份和期间配套：当时与当前、考核与考核销售、售达方与送达方、行政归属与支持部门等口径分别保留。名称相同不证明组织实例相同，历史记录的名称也不无条件替代当前主数据名称。拜访资料的cur_off_name、cur_dis_name、cur_reg_name表示另附组织引用，其取值时点尚未明确，不认定为已确认的当前名称，并与明确标注当时的组织字段区分。AC的distnm是大区名称，org_names组织清单不能直接作为单个组织名称。

### 组织类型编码 `Organization_type_code`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.org_type`
- 口径：当前组织主数据记录主体的组织类型编码，与组织类型名称配套。只描述由本行org_code识别的组织，不将其赋给同一行引用的大区、区域或部门，也不由历史业务参与身份反推类型。

### 组织类型名称 `Organization_type_name`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.org_type_name`
- 口径：当前组织主数据记录主体的组织类型名称，与组织类型编码配套。它是来源提供的分类名称，不以字段前缀或组织名称关键词代替。

### 组织状态编码 `Organization_status_code`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.org_status`
- 口径：组织在当前组织主数据中的状态编码，与状态名称配套。当前状态不证明该组织在历史交易、目标或费用期间的状态，也不等同员工在职状态或业务单据有效状态。

### 组织状态名称 `Organization_status_name`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.org_status_name`
- 口径：组织在当前组织主数据中的状态名称，与组织状态编码配套。材料未明确状态枚举，不自行补充启用、撤销等编码含义。

### 组织级别编码 `Organization_level_code`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.org_level_code`
- 口径：当前组织主数据为该组织记录的级别编码，与级别名称配套。组织级别与组织类型分别记录，不将二者合并，也不直接把级别编码解释为办事处或大区成员条件。

### 组织级别名称 `Organization_level_name`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.org_level_name`
- 口径：当前组织主数据为该组织记录的级别名称，与级别编码配套。它描述当前主数据主体，不表示同一行所有引用组织处于相同级别。

### 当前架构大区编码 `Organization_current_district_code`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.dis_code`
- 口径：当前组织架构为本组织配套记录的大区引用编码，与当前架构大区名称对应。这里的主体仍是本行org_code组织，值是它在架构中对应的大区引用，不是本组织自身编码；不预设所有组织都具有该引用或该大区就是直接上级。

### 当前架构大区名称 `Organization_current_district_name`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.dis_name`
- 口径：当前组织架构为本组织配套记录的大区名称，与当前架构大区编码属于同一条组织主数据记录。它不是本组织自身org_name，也不替代历史记录中的大区名称。

### 当前架构区域编码 `Organization_current_region_code`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.reg_code`
- 口径：当前组织架构为本组织配套记录的区域组织引用编码，与当前架构区域名称对应。区域是公司组织架构中的区域，不是省、市、区县等行政区划；本属性不规定区域与本组织之间有几层管理关系。

### 当前架构区域名称 `Organization_current_region_name`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.reg_name`
- 口径：当前组织架构为本组织配套记录的区域组织名称，与区域编码保持同一来源记录的对应。当前架构名称不覆盖历史目标、交易、库存或拜访记录中的区域口径。

### 当前架构部门代码 `Organization_current_department_code`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.dept_code`
- 口径：当前组织主数据为本组织配套记录的部门引用代码，与部门名称对应。它保留组织主体与部门引用的区别，不将部门代码当作本组织org_code，也不与活动费用的支持部门身份自动合并。

### 当前架构部门名称 `Organization_current_department_name`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.dept_name`
- 口径：当前组织主数据为本组织配套记录的部门名称，与部门代码属于同一条组织记录。该名称不是活动中承担支持职责的部门名称的默认来源。

### 当前架构公司代码 `Organization_current_company_code`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.comp_code`
- 口径：当前组织主数据为本组织配套记录的公司引用代码，与公司名称对应。它不同于本组织org_code及事业线编码；本轮资料未说明其法人、财务公司或其他公司编码体系，不追加这些含义。

### 当前架构公司名称 `Organization_current_company_name`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.comp_name`
- 口径：当前组织主数据为本组织配套记录的公司名称，与公司代码对应。该名称不替代本组织名称，也不据此补建公司法人档案或推断所属事业线。
