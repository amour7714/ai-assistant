# 经销商 `Dealer`

- 分组：渠道
- 父类：无

## 说明

公司销售和营销费用业务中的销售客户，按销售范围识别。所属、服务、配送、售达、送达及考核方是不同参与身份，不因名称相同而合并。销售范围编码、客户C编码和SAP编码属于不同标识体系；当前客户主数据不能替代交易发生时归属。

## 指出的关系

- 归属办事处 → 办事处 `Dealer_office`
  销售客户主数据中的org_code、org_name表示经销商当前所属办事处。
- 归属大区 → 大区 `Dealer_district`
  销售客户主数据直接记录经销商当前所属大区；不替代交易或费用事实中的历史归属。
- 上级经销商 → 经销商 `Dealer_parent_dealer`
  p_dealer_range_code引用当前经销商的上级销售客户，不把组织上下级关系套用于客户。
- 负责主任 → 主任 `Dealer_supervisor`
  销售客户资料的p_emp_code、p_emp_name记录负责该经销商的主任。
- 当前所属事业部 → 事业线 `Dealer_business_line`
  经销商当前所属的事业部，由v_dim_chl_dealer中同一dealer_range_code主体记录的bns_code直接引用，复用Dealer_business_line_code属性。仅表达销售客户当前主数据归属，不以子门店、人员、目标或费用记录的事业部代替，也不覆盖交易发生时的历史归属。本关系不证明bns_code与其他来源bsn_code逐值等价或字段可以互换。

## 指入的关系

- 子门店 → 所属销售客户 `StoreScope_owned_by_dealer`
  dealer_range_code记录子门店所属经销商；当前维表取当前归属，月度来源与同一行ym配套，不与服务或配送身份合并。
- 子门店 → 服务销售客户 `StoreScope_served_by_dealer`
  serv_dealer_range_code记录为子门店提供服务的经销商，不以所属经销商字段替代。
- 子门店 → 配送销售客户 `StoreScope_delivered_by_dealer`
  dlv_dealer_range_code记录承担子门店配送的经销商，与所属、服务经销商分别保留。
- 经销商 → 上级经销商 `Dealer_parent_dealer`
  p_dealer_range_code引用当前经销商的上级销售客户，不把组织上下级关系套用于客户。
- 分销订单行 → 当时所属销售客户 `DistributionOrderLine_original_dealer`
  dealer_range_code_orgn及其配套字段记录交易当时所属销售客户。
- 分销订单行 → 当时服务销售客户 `DistributionOrderLine_original_service_dealer`
  serv_dealer_range_code_orgn及其配套字段记录交易当时服务销售客户，与当时所属客户分别保留。
- 分销订单行 → 记录所属销售客户 `DistributionOrderLine_current_dealer`
  分销订单商品行在来源资料中直接记录的所属销售客户。历史分销明细v_trd_dist_ord_dtl由非orgn的dealer_range_code及配套客户字段记录这一归属；异常检查资料v_ai_sus_ord_inspect_detail由dealer_range_code、dealer_name记录虚假分销订单商品行的所属经销商，限定于该资料的dist_ord_no、cmdt_code记录范围。两来源沿用同一所属联系，但分别保留历史明细与认定记录的属性和来源值，不认定客户编码逐值相等、实例已匹配或字段可以互换。取值时点尚未明确，不将这些记录所附值宣称为查询当日的当前归属；订单当时所属及当时服务销售客户仍由各自关系表达。
- 分销订单行 → 明细附带服务客户 `DistributionOrderLine_current_service_dealer`
  历史分销订单商品行直接附带的服务销售客户，由v_trd_dist_ord_dtl同一行非orgn的serv_dealer_range_code及配套服务客户字段记录。保留该订单商品行、子门店及服务参与身份的对应，取值时点尚未明确，不宣称为查询当日的当前归属，也不以所属客户补值。订单当时服务销售客户仍由serv_dealer_range_code_orgn及其独立关系表达，两种来源范围不相互覆盖。
- 实际销售考核明细 → 考核方 `SalesAssessment_assessed_dealer`
  ass_dealer_sap_code_orgn、ass_dealer_name_orgn及dealer_range_code按考核方身份解释；无值占位不作为客户，不以售达方补齐。
- 实际销售考核明细 → 售达方 `SalesAssessment_sold_to_dealer`
  dealer_sap_code_orgn和dealer_name_orgn记录销售售达方，与考核方和送达方分别保留。
- 实际销售考核明细 → 送达方 `SalesAssessment_ship_to_dealer`
  send_dealer_sap_code_orgn和send_dealer_name_orgn记录销售送达方，不因名称相同而并入售达方身份。
- 经销商销售目标 → 目标经销商 `DealerSalesTarget_dealer`
  dealer_range_code记录承担本月、本目标类型及项目销售目标的经销商。
- 月度分销目标 → 经销商目标主体 `DistributionTarget_dealer`
  仅经销商分销目标适用，dealer_range_code记录承担本月分销目标的销售客户。
- 门店月度稽查结果 → 记录所属销售客户 `StoreInspectionMonth_dealer`
  dealer_range_code记录该月检查结果所附所属销售客户。
- 门店月度稽查结果 → 记录服务销售客户 `StoreInspectionMonth_service_dealer`
  serv_dealer_range_code记录该月检查结果所附服务销售客户，保留服务身份。
- 活动计划明细 → 关联销售客户 `ActivityPlanDetail_dealer`
  dealer_range_code记录本计划明细直接关联的销售客户；是否为执行对象还须结合execute_object_grain解释。
- 陈列签约 → 所属销售客户 `DisplaySigning_dealer`
  dealer_range_code记录签约资料所属销售客户，与服务和上游客户分别保留。
- 陈列签约 → 服务经销商 `DisplaySigning_service_dealer`
  serv_dealer_range_code记录签约资料中的服务经销商。
- 陈列签约 → 上游销售客户 `DisplaySigning_upstream_dealer`
  p_dealer_range_code直接记录签约资料所指上游客户，不由当前客户主数据推导替代。
- 套餐门店执行费用 → 执行销售客户 `PackageExecutionCost_dealer`
  dealer_range_code是该套餐门店商品费用事实的经销商维度。
- 月度陈列项检查结果 → 记录销售客户 `DisplayItemInspection_dealer`
  dealer_range_code直接记录该检查结果所附销售客户。
- 门店陈列执行统计 → 记录销售客户 `DisplayExecutionSummary_dealer`
  dealer_range_code记录执行统计所附销售客户。
- 营销费用预算项 → 预算经销商主体 `ExpenseBudgetItem_dealer`
  仅budget_view_code为DEALER时，dealer_range_code标识预算主体，不把其他视图附带客户字段当成经销商预算。
- 客户自有计划额度 → 计划额度客户 `CustomerPlanQuota_dealer`
  PLAN行dealer_range_code与事业线、费用类型及执行月共同识别客户自有计划额度。
- 客户自有核销额度 → 核销额度客户 `CustomerVerificationQuota_dealer`
  VERIFY行dealer_range_code与事业线、费用来源共同识别核销额度，不附加流水记账月等值条件。
- 费用钱包 → 钱包归属客户 `ExpenseWallet_dealer`
  钱包实际提供的dealer_range_code记录归属经销商；预留账户不因相关钱包有客户字段就获得客户额度维度。
- 钱包分录 → 分录钱包归属客户 `WalletEntry_wallet_dealer`
  分录dealer_range_code直接记录加工快照中的钱包客户，与event_dealer_range_code事件客户分开；空值不表示无费用。
- 营销费用业务事件 → 事件归属客户 `ExpenseEvent_dealer`
  event_dealer_range_code记录事件客户，与钱包归属客户分别保留，不强制相等或互相补值。
- 营销费用业务事件 → 事件上游客户 `ExpenseEvent_upstream_dealer`
  event_parent_dealer_code直接记录事件所指上游客户，不由当前客户层级替代。
- 费用包 → 分配销售客户 `ExpensePackage_dealer`
  dealer_range_code记录费用包所属或分配的销售客户，按本包类型、期间及来源解释。
- 统案客户分配 → 获得分配的客户 `UnifiedCustomerAllocation_dealer`
  dealer_range_code记录接受本条统案支持分配的销售客户，不把活动主题名称当客户。
- 虚假重复客资认定 → 主门店经销商 `DuplicateStoreFinding_primary_dealer`
  dealer_range_code与本认定主门店及ym配套，不应用到另一配对门店。
- 虚假重复客资认定 → 配对门店经销商 `DuplicateStoreFinding_duplicate_dealer`
  dup_dealer_range_code与本认定dup_cust_code及ym配套。
- 虚假陈列认定 → 记录销售客户 `FalseDisplayFinding_dealer`
  dealer_range_code记录本次认定所附销售客户，不推定为费用已付款方。
- 经销商商品库存 → 库存销售客户 `DealerInventory_dealer`
  dealer_range_code记录库存所属客户；未发库存按材料规定的原始送达方口径解释。
- 搭赠下沉明细 → 执行经销商 `GiftSinkDetail_dealer`
  dealer_range_code记录本搭赠活动下沉的执行销售客户，是额度及订单追踪范围的一部分。
- 计划门店拜访 → 计划所属销售客户 `PlannedStoreVisit_dealer`
  dealer_range_code直接记录本计划安排中门店所属销售客户。
- 门店拜访 → 所属销售客户 `StoreVisit_dealer`
  dealer_range_code直接记录本次拜访所附所属销售客户。
- 门店拜访 → 服务销售客户 `StoreVisit_service_dealer`
  serv_dealer_range_code直接记录本次拜访所附服务销售客户，不与所属客户合并。

## 属性

### 销售范围编码 `Dealer_sales_range_code`

- 类型：string
- 字段：`v_dim_chl_dealer.dealer_range_code`、`v_dim_chl_dealer.p_dealer_range_code`、`v_dim_chl_sub_cust_df.dealer_range_code`、`v_dim_chl_sub_cust_df.serv_dealer_range_code`、`v_dim_chl_sub_cust_df.dlv_dealer_range_code`、`v_trd_dist_ord_dtl.dealer_range_code_orgn`、`v_trd_dist_ord_dtl.serv_dealer_range_code_orgn`、`v_trd_dist_ord_dtl.dealer_range_code`、`v_trd_dist_ord_dtl.serv_dealer_range_code`、`v_trd_sales_adjust_df.dealer_range_code`、`v_trd_sales_target_dealer_mi.dealer_range_code`、`v_trd_dist_target_dealer_df.dealer_range_code`、`v_chl_jc_cust_mi.dealer_range_code`、`v_chl_jc_cust_mi.serv_dealer_range_code`、`v_mkt_market_actv_plan_verify_cost.dealer_range_code`、`v_mkt_actv_inspect_result.dealer_range_code`、`v_mkt_dsp_actv_info_mi.dealer_range_code`、`v_mkt_dsp_actv_info_mi.serv_dealer_range_code`、`v_mkt_dsp_actv_info_mi.p_dealer_range_code`、`v_mkt_package_cust_cost_mi.dealer_range_code`、`v_mkt_dsp_execute_mi.dealer_range_code`、`v_dim_chl_sub_cust_indct_mi.dealer_range_code`、`v_mkt_budget_snapshot_df.dealer_range_code`、`v_fin_expense_quota_balance_df.dealer_range_code`、`v_fin_expense_wallet_df.dealer_range_code`、`v_fin_expense_wallet_change_dtl_mi.dealer_range_code`、`v_fin_expense_wallet_change_dtl_mi.event_dealer_range_code`、`v_fin_expense_wallet_change_dtl_mi.event_parent_dealer_code`、`v_mkt_cost_package_df.dealer_range_code`、`v_mkt_unity_apply_alloc_df.dealer_range_code`、`v_ai_sus_ord_inspect_detail.dealer_range_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.dealer_range_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.dup_dealer_range_code`、`v_ads_ai_chl_sus_display_fee_detail.dealer_range_code`、`v_inv_dealer_cmdt_di.dealer_range_code`、`v_mkt_shdz_sink_dtl_df.dealer_range_code`、`v_chl_route_plan_cust_cnt_1d_df.dealer_range_code`、`v_chl_visit_dtl.dealer_range_code`、`v_chl_visit_dtl.serv_dealer_range_code`
- 口径：在销售范围内识别经销商的编码，以dealer_range_code为主要标识。其他来源直接记录的所属、服务、配送、考核或上游客户引用值，只标识各自对应的参与方。历史引用与当前引用分别解释，不等同客户C编码、SAP编码，也不以另列但含义关系尚未明确的dealer_sale_range_code替换。

### 客户C编码 `Dealer_customer_c_code`

- 类型：string
- 字段：`v_dim_chl_dealer.dealer_code`、`v_dim_chl_sub_cust_df.dealer_code`、`v_dim_chl_sub_cust_df.serv_dealer_code`、`v_dim_chl_sub_cust_df.dlv_dealer_code`
- 口径：销售客户使用的C编码，属于不同于销售范围编码和SAP编码的标识体系。主数据和子门店引用分别保留实际参与方，不声明不同编码体系可以直接互换。

### SAP客户编码 `Dealer_sap_code`

- 类型：string
- 字段：`v_dim_chl_dealer.sap_code`、`v_trd_dist_ord_dtl.dealer_sap_code_orgn`、`v_trd_dist_ord_dtl.serv_dealer_sap_code_orgn`、`v_trd_dist_ord_dtl.dealer_sap_code`、`v_trd_dist_ord_dtl.serv_dealer_sap_code`、`v_trd_sales_adjust_df.ass_dealer_sap_code_orgn`、`v_trd_sales_adjust_df.dealer_sap_code_orgn`、`v_trd_sales_adjust_df.send_dealer_sap_code_orgn`、`v_chl_jc_cust_mi.sap_code`、`v_chl_jc_cust_mi.serv_sap_code`、`v_mkt_dsp_actv_info_mi.dealer_sap_code`、`v_mkt_dsp_execute_mi.dealer_sap_code`、`v_dim_chl_sub_cust_indct_mi.dealer_sap_code`、`v_inv_dealer_cmdt_di.dealer_sap_code`、`v_mkt_shdz_sink_dtl_df.dealer_sap_code`、`v_chl_visit_dtl.dealer_sap_code`、`v_chl_visit_dtl.serv_dealer_sap_code`
- 口径：经销商在SAP客户标识体系中的编码。所属、服务、考核、售达及送达等角色的编码只属于各自参与方，不能互相补齐；历史记录与当前主数据分别解释。无值占位不作为真实客户编码。

### 经销商名称 `Dealer_name`

- 类型：string
- 字段：`v_dim_chl_dealer.dealer_name`、`v_dim_chl_sub_cust_df.dealer_name`、`v_dim_chl_sub_cust_df.serv_dealer_name`、`v_dim_chl_sub_cust_df.dlv_dealer_name`、`v_trd_dist_ord_dtl.dealer_name_orgn`、`v_trd_dist_ord_dtl.serv_dealer_name_orgn`、`v_trd_dist_ord_dtl.dealer_name`、`v_trd_dist_ord_dtl.serv_dealer_name`、`v_trd_sales_adjust_df.ass_dealer_name_orgn`、`v_trd_sales_adjust_df.dealer_name_orgn`、`v_trd_sales_adjust_df.send_dealer_name_orgn`、`v_trd_sales_target_dealer_mi.dealer_range_name`、`v_trd_dist_target_dealer_df.dealer_name`、`v_chl_jc_cust_mi.dealer_name`、`v_chl_jc_cust_mi.serv_dealer_name`、`v_mkt_market_actv_plan_verify_cost.dealer_name`、`v_mkt_actv_inspect_result.dealer_name`、`v_mkt_dsp_actv_info_mi.dealer_name`、`v_mkt_dsp_actv_info_mi.serv_dealer_range_name`、`v_mkt_dsp_actv_info_mi.p_dealer_range_name`、`v_mkt_package_cust_cost_mi.dealer_name`、`v_mkt_dsp_execute_mi.dealer_name`、`v_dim_chl_sub_cust_indct_mi.dealer_name`、`v_mkt_budget_snapshot_df.dealer_range_name`、`v_fin_expense_quota_balance_df.dealer_range_name`、`v_fin_expense_wallet_df.dealer_range_name`、`v_fin_expense_wallet_change_dtl_mi.dealer_range_name`、`v_fin_expense_wallet_change_dtl_mi.event_dealer_range_name`、`v_mkt_cost_package_df.dealer_name`、`v_mkt_unity_apply_alloc_df.dealer_name`、`v_ai_sus_ord_inspect_detail.dealer_name`、`v_inv_dealer_cmdt_di.dealer_name`、`v_mkt_shdz_sink_dtl_df.dealer_name`、`v_chl_visit_dtl.dealer_name`、`v_chl_visit_dtl.serv_dealer_name`
- 口径：资料直接记录的销售客户名称。名称必须与同一来源、同一参与身份的客户编码配套使用；历史业务记录中的名称不由当前名称覆盖，也不因同名而认定所属、服务、配送、考核、售达、送达或上游客户是同一实例。

### 经销商简称 `Dealer_short_name`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.dealer_short_name`
- 口径：库存资料直接记录的销售客户简称，按对应库存日期记录解释，不从经销商全称自行截取或生成。

### 销售客户类型编码 `Dealer_type_code`

- 类型：string
- 字段：`v_dim_chl_dealer.dealer_type_code`、`v_mkt_dsp_actv_info_mi.dealer_type_code`、`v_inv_dealer_cmdt_di.dealer_type_code`、`v_mkt_shdz_sink_dtl_df.dealer_type_code`、`v_chl_visit_dtl.dealer_type`、`v_chl_visit_dtl.serv_dealer_type`
- 口径：资料直接记录的经销商类型编码，与同一来源、同一客户身份的类型名称配套。主数据为当前类型，业务记录为其记录范围内的类型；不把事件客户角色、稽查分类或尚未明确参与方的新财年分类字段混入本属性。

### 销售客户类型 `Dealer_type_name`

- 类型：string
- 字段：`v_dim_chl_dealer.dealer_type_name`、`v_trd_dist_ord_dtl.dealer_type_name_orgn`、`v_trd_dist_ord_dtl.serv_dealer_type_name_orgn`、`v_trd_dist_ord_dtl.dealer_type_name`、`v_trd_dist_ord_dtl.serv_dealer_type_name`、`v_chl_jc_cust_mi.dealer_type_name`、`v_chl_jc_cust_mi.serv_dealer_type_name`、`v_mkt_dsp_actv_info_mi.dealer_type_name`、`v_mkt_dsp_execute_mi.dealer_type_name`、`v_dim_chl_sub_cust_indct_mi.dealer_type_name`、`v_fin_expense_quota_balance_df.dealer_type_name`、`v_inv_dealer_cmdt_di.dealer_type_name`、`v_mkt_shdz_sink_dtl_df.dealer_type_name`、`v_chl_visit_dtl.dealer_type_name`、`v_chl_visit_dtl.serv_dealer_type_name`
- 口径：销售客户的类型名称。不同来源按各自记录的客户身份和期间使用，保留交易当时类型与明细附带类型的区别；历史分销非orgn类型字段的取值时点尚未明确，不认定为当前类型。真正来自当前客户主数据的类型仍按当前口径解释。它不同于信用等级、市场级别、稽查分类、合作模式和费用事件中的客户角色。

### 主数据销售范围编码 `Dealer_sales_scope_code`

- 类型：string
- 字段：`v_dim_chl_dealer.dealer_sale_range_code`
- 口径：客户主数据另列的销售客户销售范围编码，与同一客户行的销售范围名称配套。资料未说明它与标识客户的dealer_range_code之间的业务层级和对应关系，因此保留原字段含义，不声明为客户身份编码的替代来源。

### 主数据销售范围名称 `Dealer_sales_scope_name`

- 类型：string
- 字段：`v_dim_chl_dealer.dealer_sale_range_name`
- 口径：客户主数据另列的销售客户销售范围名称，与dealer_sale_range_code在同一客户行配套，不作为经销商名称使用，也不擅自解释为已确认的客户类型分类。

### 库存记录客户类型范围 `Dealer_inventory_type_scope_name`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.dealer_sale_range_name`
- 口径：库存资料直接记录的销售客户类型范围原始值，限定在相应库存日期记录中。虽然字段名与客户主数据销售范围名称相同，资料给出的含义不同，暂不合并为同一属性。

### 客户状态编码 `Dealer_status_code`

- 类型：string
- 字段：`v_dim_chl_dealer.dealer_status`
- 口径：销售客户主数据记录的当前客户状态原始编码，与状态名称配套。它不是分销订单状态、活动审批状态或终端门店合作状态。

### 客户状态 `Dealer_status_name`

- 类型：string
- 字段：`v_dim_chl_dealer.dealer_status_name`、`v_inv_dealer_cmdt_di.dealer_status_name`
- 口径：资料直接记录的销售客户状态名称。客户主数据表示当前状态；库存资料表示对应库存记录所附的客户状态，不能据此补造完整状态历史，也不与门店或订单状态混用。

### 公司类型 `Dealer_company_type`

- 类型：string
- 字段：`v_dim_chl_dealer.comp_type`
- 口径：销售客户主数据记录的经销商公司类型原始值，不与销售客户类型或合作模式合并，资料未提供的类型枚举不自行补充。

### 信用等级编码 `Dealer_credit_level_code`

- 类型：string
- 字段：`v_dim_chl_dealer.credit_level`
- 口径：销售客户主数据中的当前信用等级编码，不等同事业部客户等级、市场级别或授信类型。

### TOP客户标记 `Dealer_top_customer_flag`

- 类型：string
- 字段：`v_dim_chl_dealer.is_top`
- 口径：客户主数据用于表示是否为TOP客户的原始标记。资料没有提供取值编码及空值含义，因此按字符串保留，不猜测为1、0或直接转换成布尔值。

### 事业部客户等级编码 `Dealer_business_line_level_code`

- 类型：string
- 字段：`v_dim_chl_dealer.bns_level`
- 口径：客户主数据记录的事业部客户等级编码，与事业部客户等级名称配套，不等同信用等级或市场级别。

### 事业部客户等级 `Dealer_business_line_level_name`

- 类型：string
- 字段：`v_dim_chl_dealer.bns_level_name`
- 口径：客户主数据记录的事业部客户等级名称，与同一客户行的等级编码配套。

### 授信类型编码 `Dealer_credit_type_code`

- 类型：string
- 字段：`v_dim_chl_dealer.credit_type`
- 口径：客户主数据记录的当前授信类型编码，与授信类型名称配套。授信类型不表示实际授信金额、可用信用余额或信用等级。

### 授信类型 `Dealer_credit_type_name`

- 类型：string
- 字段：`v_dim_chl_dealer.credit_type_name`
- 口径：客户主数据记录的当前授信类型名称，不据此推算授信额度。

### 当前事业部编码 `Dealer_business_line_code`

- 类型：string
- 字段：`v_dim_chl_dealer.bns_code`
- 口径：销售客户主数据直接记录的当前所属事业部编码。它是客户记录自身的归属引用，不以费用、钱包、目标或事件的事业线编码反向补入。

### 当前办事处编码 `Dealer_current_office_code`

- 类型：string
- 字段：`v_dim_chl_dealer.org_code`
- 口径：客户主数据记录的经销商当前所属办事处引用编码。交易、目标、检查或费用记录的办事处是各自事实的归属，不能直接作为本当前归属属性的来源。

### 当前大区编码 `Dealer_current_district_code`

- 类型：string
- 字段：`v_dim_chl_dealer.dis_code`
- 口径：客户主数据直接记录的经销商当前所属大区引用编码，不由交易发生时大区或费用归属大区覆盖。

### 行政组织编码路径 `Dealer_administrative_organization_code_path`

- 类型：string
- 字段：`v_dim_chl_dealer.org_code_path`
- 口径：客户主数据记录的行政组织编码路径，用于保留客户当前行政归属的路径信息。路径的分隔方式和层级排列未说明，不把它直接当作单个组织编码或自行拆出历史归属。

### 当前负责主任编码 `Dealer_current_supervisor_code`

- 类型：string
- 字段：`v_dim_chl_dealer.p_emp_code`
- 口径：销售客户主数据直接记录的当前负责主任引用编码。其他业务记录中的主任或一般上级有各自参与身份和期间，不反向补为本客户当前主任。

### 客户市场级别 `Dealer_market_level`

- 类型：string
- 字段：`v_dim_chl_dealer.mkt_level`、`v_chl_jc_cust_mi.dealer_mkt_level`、`v_chl_jc_cust_mi.ser_dealer_mkt_level`
- 口径：销售客户自身的市场级别原始值，不是终端门店的市场层级或行政区划类别。主数据取当前级别，稽查来源取对应月度记录中相应所属或服务客户的级别；未说明的编码尺度不自行转换。

### 销售客户稽查分类 `Dealer_inspection_category_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.dealer_jc_group_name`
- 口径：月度稽查门店结果直接附带的销售客户稽查分类，用于按该分类解释检查结果。分类与同一行ym及所属客户保持对应，不当作客户永久类别或通用销售客户类型。

### 乡镇编码 `Dealer_township_code`

- 类型：string
- 字段：`v_dim_chl_dealer.town_code`
- 口径：销售客户主数据记录的客户乡镇编码，与乡镇名称配套；不按字段惯例改解释为区县编码，也不从门店地址反推。

### 乡镇名称 `Dealer_township_name`

- 类型：string
- 字段：`v_dim_chl_dealer.town_name`
- 口径：销售客户主数据记录的客户乡镇名称，与乡镇编码配套，不替代其所服务门店的地理位置。

### 城市编码 `Dealer_city_code`

- 类型：string
- 字段：`v_dim_chl_dealer.city_code`
- 口径：销售客户主数据记录的客户城市编码，与城市名称配套，不使用门店或其他参与对象的城市编码作为来源。

### 城市名称 `Dealer_city_name`

- 类型：string
- 字段：`v_dim_chl_dealer.city_name`
- 口径：销售客户主数据记录的客户城市名称，不等同其全部服务门店覆盖的城市清单。

### 省份编码 `Dealer_province_code`

- 类型：string
- 字段：`v_dim_chl_dealer.prov_code`
- 口径：销售客户主数据记录的客户省份编码，与省份名称配套，不与销售大区编码混用。

### 省份名称 `Dealer_province_name`

- 类型：string
- 字段：`v_dim_chl_dealer.prov_name`
- 口径：销售客户主数据记录的客户省份名称，不表示公司的销售大区或经销商全部服务范围。

### 合作模式代码 `Dealer_cooperation_mode_code`

- 类型：string
- 字段：`v_dim_chl_dealer.cooperation_mode`
- 口径：销售客户主数据记录的当前合作模式代码，与合作模式名称配套。资料未给出模式枚举及具体规则对应，不从其他类型或费用金额反推模式。

### 合作模式 `Dealer_cooperation_mode_name`

- 类型：string
- 字段：`v_dim_chl_dealer.cooperation_mode_name`
- 口径：销售客户主数据记录的当前合作模式名称，与同一客户行的合作模式代码配套，不等同销售客户类型。

### 当前上级经销商编码 `Dealer_parent_sales_range_code`

- 类型：string
- 字段：`v_dim_chl_dealer.p_dealer_range_code`
- 口径：当前经销商主数据记录的上级销售客户引用编码，用于保留本客户与上级客户的对应。它不是本客户自身编码；签约或费用事件直接引用的上游客户有各自业务身份，不据此反向覆盖当前客户层级。
