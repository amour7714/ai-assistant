# 办事处 `SalesOffice`

- 分组：组织
- 父类：Organization

## 说明

承担区域销售管理的办事处级组织，是组织销售目标和组织分销目标的最细组织主体，也是费用预算、客户和业务事实的重要归属单位。

## 指出的关系

- 所属大区 → 大区 `SalesOffice_district`
  组织及业务资料中的办事处与配套大区构成管理归属；历史目标汇总采用该目标期间记录的归属。

## 指入的关系

- 子门店 → 归属办事处 `StoreScope_office`
  off_code、off_name记录子门店所属办事处，当前和月度来源按各自期间解释。
- 经销商 → 归属办事处 `Dealer_office`
  销售客户主数据中的org_code、org_name表示经销商当前所属办事处。
- 分销订单行 → 当时所属办事处 `DistributionOrderLine_original_office`
  off_name_orgn表示订单当时所属办事处，按交易归属使用。
- 分销订单行 → 当时服务办事处 `DistributionOrderLine_service_office`
  serv_off_name_orgn记录当时服务销售客户对应办事处，不与所属办事处混用。
- 分销订单行 → 记录办事处 `DistributionOrderLine_current_office`
  分销订单商品行在来源资料中直接记录的办事处归属。历史分销明细v_trd_dist_ord_dtl由非orgn的off_code、off_name记录所附办事处；异常检查资料v_ai_sus_ord_inspect_detail由off_name记录虚假分销订单商品行所附办事处，限定于该资料的dist_ord_no、cmdt_code记录范围。两来源沿用同一联系，仍分别保留历史明细与认定记录的来源值，不认定名称相同就表示同一实例，也不以历史明细off_code补出认定资料未提供的编码。取值时点尚未明确，不宣称为查询当日的当前归属；订单当时所属和当时服务办事处的关系保持独立。
- 实际销售考核明细 → 当期考核办事处 `SalesAssessment_assessment_office`
  ass_org_code、ass_org_name记录当期考核归属，与当期财务期间配套，也是销售和目标对齐的组织口径。
- 实际销售考核明细 → 同期对齐办事处 `SalesAssessment_comparison_office`
  yty_org_code、yty_org_name记录同期对齐组织，与yty期间和标记配套，不沿用原ass_org归属。
- 实际销售考核明细 → 当期考核销售办事处 `SalesAssessment_sales_office`
  ass_sales_off_name表示ass_sales组织口径的办事处，不与ass_org_name或售达方办事处互换。
- 实际销售考核明细 → 同期销售办事处 `SalesAssessment_comparison_sales_office`
  yty_sales_off_name记录同期销售组织口径的办事处，与同期考核办事处yty_org_name区分。
- 实际销售考核明细 → 售达方销售办事处 `SalesAssessment_sold_to_office`
  dealer_sales_off_name表示本笔销售售达方的销售办事处，不替代考核组织。
- 实际销售考核明细 → 送达方销售办事处 `SalesAssessment_ship_to_office`
  send_sales_off_name直接记录本笔销售送达方的销售办事处。
- 经销商销售目标 → 目标归属办事处 `DealerSalesTarget_office`
  目标行off_code、off_name记录目标当期办事处归属，不按当前客户主数据重写。
- 组织销售目标 → 目标办事处 `OfficeSalesTarget_office`
  组织目标采用off_code，销售调整预算行采用ass_org_code；两者均表示对应来源的目标办事处，不据此认定跨来源目标相同。
- 月度分销目标 → 办事处目标主体 `DistributionTarget_office_subject`
  仅组织分销目标适用，off_code记录目标办事处；其他主体目标所附办事处是归属关系。
- 月度分销目标 → 目标归属办事处 `DistributionTarget_attribution_office`
  人员、经销商和子门店目标行记录的办事处表示相应月份管理归属，与办事处作为目标主体的关系区分。
- 门店月度稽查结果 → 月度办事处 `StoreInspectionMonth_office`
  off_code、off_name记录月度检查归属办事处，与now_off_name当前口径区分。
- 门店月度稽查结果 → 当前办事处 `StoreInspectionMonth_current_office`
  now_off_name记录结果所附当前办事处，不表示稽查月当时归属。
- 活动计划明细 → 计划归属办事处 `ActivityPlanDetail_office`
  off_code、off_name直接记录该执行月计划明细的办事处归属。
- 陈列签约 → 行政办事处 `DisplaySigning_office`
  off_code、off_name记录签约资料的行政办事处。
- 套餐门店执行费用 → 执行归属办事处 `PackageExecutionCost_office`
  费用行off_code、off_name直接记录该执行范围的办事处。
- 月度陈列项检查结果 → 记录办事处 `DisplayItemInspection_office`
  off_code、off_name记录月度检查结果所属办事处。
- 门店陈列执行统计 → 记录办事处 `DisplayExecutionSummary_office`
  off_code、off_name直接记录执行统计所属办事处。
- 营销费用预算项 → 预算办事处主体 `ExpenseBudgetItem_office_subject`
  仅budget_view_code为OFFICE时，off_code标识预算办事处主体。
- 营销费用预算项 → 预算归属办事处 `ExpenseBudgetItem_attribution_office`
  非办事处主体预算若实际记录off_code，表示该预算的办事处归属，不改变budget_view_code指定的主体。
- 预留费用账户 → 账户行政办事处 `ReservedExpenseAccount_office`
  RESERVED余额行实际记录的off_code表示账户行政归属，不据此虚构经销商归属。
- 客户自有计划额度 → 计划额度办事处 `CustomerPlanQuota_office`
  PLAN行off_code记录该累计截止月额度所附行政办事处。
- 客户自有核销额度 → 核销额度办事处 `CustomerVerificationQuota_office`
  VERIFY行off_code记录当前来源额度的行政办事处，不表示所选统计月末历史快照。
- 费用钱包 → 钱包行政办事处 `ExpenseWallet_office`
  off_code、off_name记录钱包所附行政办事处。
- 钱包分录 → 分录钱包办事处 `WalletEntry_wallet_office`
  分录off_code直接记录加工快照中的钱包行政办事处，不表示记账发生时组织。
- 费用包 → 费用包办事处 `ExpensePackage_office`
  off_code、off_name直接记录费用包归属办事处。
- 统案支持费用项 → 记录办事处 `UnifiedSupportItem_office`
  费用项对应行的off_code记录其组织范围；在当前分层形态未核定前不把所有该字段都称为独立组织分配对象。
- 统案客户分配 → 记录办事处 `UnifiedCustomerAllocation_office`
  客户分配对应记录的off字段表示其办事处范围，不能因后续计划展开而复制分配金额。
- 虚假陈列认定 → 记录办事处 `FalseDisplayFinding_office`
  off_name直接记录虚假陈列认定所属办事处。
- 经销商商品库存 → 记录办事处 `DealerInventory_recorded_office`
  org_code、org_name记录库存资料所附办事处，与明确标注当时的off_name区分。
- 经销商商品库存 → 当时办事处 `DealerInventory_original_office`
  off_name明确记录库存业务当时办事处，不由org_name覆盖。
- 搭赠下沉明细 → 下沉归属办事处 `GiftSinkDetail_office`
  off_code、off_name直接记录本条下沉追踪的办事处归属。
- 计划门店拜访 → 计划办事处 `PlannedStoreVisit_office`
  org_code直接记录计划安排的办事处。
- 门店拜访 → 当时办事处 `StoreVisit_original_office`
  off_code、off_name记录拜访发生时办事处。
- 门店拜访 → 另附办事处 `StoreVisit_current_office`
  cur_off_code、cur_off_name直接记录本次拜访资料另附的办事处引用。其取值时点及归属口径尚未明确，不仅凭cur前缀认定为当前归属；与off_code、off_name明确记录的拜访发生时办事处分别保留，不互相覆盖。

## 属性

### 组织编码 `Organization_code`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.org_code`、`v_dim_hr_emp.org_code`、`v_dim_chl_dealer.org_code`、`v_dim_chl_sub_cust_df.off_code`、`v_trd_dist_ord_dtl.off_code`、`v_trd_sales_adjust_df.ass_org_code`、`v_trd_sales_adjust_df.yty_org_code`、`v_trd_sales_target_dealer_mi.off_code`、`v_trd_sales_target_org_mi.off_code`、`v_trd_dist_ord_target_mgr_1m_df.off_code`、`v_trd_dist_ord_target_emp_1m_df.off_code`、`v_trd_dist_target_dealer_df.off_code`、`v_trd_dist_target_org_df.off_code`、`v_chl_jc_cust_mi.off_code`、`v_mkt_market_actv_plan_verify_cost.off_code`、`v_mkt_actv_inspect_result.off_code`、`v_mkt_dsp_actv_info_mi.off_code`、`v_mkt_package_cust_cost_mi.off_code`、`v_mkt_dsp_execute_mi.off_code`、`v_dim_chl_sub_cust_indct_mi.off_code`、`v_mkt_budget_snapshot_df.off_code`、`v_fin_expense_quota_balance_df.off_code`、`v_fin_expense_wallet_df.off_code`、`v_fin_expense_wallet_change_dtl_mi.off_code`、`v_mkt_cost_package_df.off_code`、`v_mkt_unity_apply_alloc_df.off_code`、`v_inv_dealer_cmdt_di.org_code`、`v_mkt_shdz_sink_dtl_df.off_code`、`v_chl_route_plan_cust_cnt_1d_df.org_code`、`v_chl_visit_dtl.off_code`、`v_chl_visit_dtl.cur_off_code`
- 口径：当前组织主数据或业务记录直接记载的单个组织编码，包括办事处、大区、区域和部门等组织的编码。每个来源按其字段所指的组织、参与身份和期间解释，与同一来源的配套名称保持对应；同一行的多个组织引用不能合并为一个组织。来源之间不默认编码等价，销售组织范围编码、组织编码路径和AC组织清单不直接作为本属性的单值来源。拜访资料的cur_off_code表示另附办事处引用，取值时点尚未明确，不作为已确认的当前归属。

### 组织名称 `Organization_name`

- 类型：string，继承自 Organization
- 字段：`v_dim_hr_org.org_name`、`v_dim_hr_emp.org_name`、`v_dim_chl_dealer.org_name`、`v_dim_chl_sub_cust_df.off_name`、`v_trd_dist_ord_dtl.off_name_orgn`、`v_trd_dist_ord_dtl.serv_off_name_orgn`、`v_trd_dist_ord_dtl.off_name`、`v_trd_sales_adjust_df.ass_org_name`、`v_trd_sales_adjust_df.yty_org_name`、`v_trd_sales_adjust_df.ass_sales_off_name`、`v_trd_sales_adjust_df.yty_sales_off_name`、`v_trd_sales_adjust_df.dealer_sales_off_name`、`v_trd_sales_adjust_df.send_sales_off_name`、`v_trd_sales_target_dealer_mi.off_name`、`v_trd_sales_target_org_mi.off_name`、`v_trd_dist_ord_target_mgr_1m_df.off_name`、`v_trd_dist_ord_target_emp_1m_df.off_name`、`v_trd_dist_target_dealer_df.off_name`、`v_trd_dist_target_org_df.off_name`、`v_chl_jc_cust_mi.off_name`、`v_chl_jc_cust_mi.now_off_name`、`v_mkt_market_actv_plan_verify_cost.off_name`、`v_mkt_actv_inspect_result.off_name`、`v_mkt_dsp_actv_info_mi.off_name`、`v_mkt_package_cust_cost_mi.off_name`、`v_mkt_dsp_execute_mi.off_name`、`v_dim_chl_sub_cust_indct_mi.off_name`、`v_mkt_budget_snapshot_df.off_name`、`v_fin_expense_quota_balance_df.off_name`、`v_fin_expense_wallet_df.off_name`、`v_fin_expense_wallet_change_dtl_mi.off_name`、`v_mkt_cost_package_df.off_name`、`v_mkt_unity_apply_alloc_df.off_name`、`v_ai_sus_ord_inspect_detail.off_name`、`v_ads_ai_chl_sus_display_fee_detail.off_name`、`v_inv_dealer_cmdt_di.org_name`、`v_inv_dealer_cmdt_di.off_name`、`v_mkt_shdz_sink_dtl_df.off_name`、`v_chl_visit_dtl.off_name`、`v_chl_visit_dtl.cur_off_name`
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
