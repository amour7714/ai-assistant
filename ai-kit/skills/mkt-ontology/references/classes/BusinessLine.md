# 事业线 `BusinessLine`

- 分组：组织
- 父类：无

## 说明

营销费用、钱包、额度和费用来源所属的事业线或资料标注的事业部范围。其编码是这些业务对象身份与统计范围的一部分，不将不同事业线的同号对象视为同一对象，也不默认与人员组织编码等价。

## 指出的关系

无

## 指入的关系

- 营销费用预算项 → 预算事业线 `ExpenseBudgetItem_business_line`
  bsn_code记录预算事业部范围，与预算财年及主体共同解释。
- 预留费用账户 → 账户事业线 `ReservedExpenseAccount_business_line`
  bsn_code是预留账户身份范围的一部分，不跨事业线合并同号账户。
- 客户自有计划额度 → 计划额度事业线 `CustomerPlanQuota_business_line`
  PLAN行bsn_code限定本额度及累计使用范围。
- 客户自有核销额度 → 核销额度事业线 `CustomerVerificationQuota_business_line`
  VERIFY行bsn_code限定客户来源额度的事业线。
- 费用钱包 → 钱包事业线 `ExpenseWallet_business_line`
  bsn_code与财年、wallet_code共同限定钱包身份。
- 钱包分录 → 记账事业线 `WalletEntry_business_line`
  bsn_code直接记录分录事业线，也是事件和钱包身份解释的必要范围。
- 钱包业务追溯规则 → 适用事业线 `WalletTraceRule_business_line`
  规则bsn_code精确限定适用事业线，不配置跨事业线通配。
- 营销费用业务事件 → 事件事业线 `ExpenseEvent_business_line`
  分录所记录bsn_code限定对应费用事件的业务范围，不跨事业线合并同号事件。
- 费用包 → 费用包事业线 `ExpensePackage_business_line`
  bsn_code限定费用包身份、事件引用及可比较范围。
- 费用来源 → 费用来源事业线 `ExpenseSource_business_line`
  bsn_code与来源财年、expen_code共同限定费用来源配置的业务范围。
- 子门店 → 当前所属事业部 `StoreScope_business_line`
  子门店当前所属的事业部，由v_dim_chl_sub_cust_df中同一cust_range_code记录的bns_code直接引用，复用StoreScope_business_line_code属性。仅表达当前维表归属，不从经销商、人员或费用归属反推，也不将该值作为历史月份的事业部归属。保留来源原编码，本关系不证明bns_code与其他来源bsn_code逐值等价或跨来源实例已匹配。
- 经销商 → 当前所属事业部 `Dealer_business_line`
  经销商当前所属的事业部，由v_dim_chl_dealer中同一dealer_range_code主体记录的bns_code直接引用，复用Dealer_business_line_code属性。仅表达销售客户当前主数据归属，不以子门店、人员、目标或费用记录的事业部代替，也不覆盖交易发生时的历史归属。本关系不证明bns_code与其他来源bsn_code逐值等价或字段可以互换。
- 月度分销目标 → 目标事业部 `DistributionTarget_business_line`
  主任或业代月度分销目标直接指定的事业部，复用DistributionTarget_business_line_code属性。主任目标取v_trd_dist_ord_target_mgr_1m_df同一行的bsn_code，并与stat_month及目标承担主任p_emp_code配套；业代目标取v_trd_dist_ord_target_emp_1m_df同一行的bsn_code，并与stat_month、目标承担业代emp_code及岗位范围配套。仅适用于这两个人员目标来源，不推广到未直接提供事业部字段的经销商、办事处或子门店进货目标，也不由承担人员当前归属反推目标事业部。不同月份保持各自对应，不认定本处bsn_code与当前维表bns_code逐值等价。

## 属性

### 事业线编码 `BusinessLine_code`

- 类型：string
- 字段：`v_trd_dist_ord_target_mgr_1m_df.bsn_code`、`v_trd_dist_ord_target_emp_1m_df.bsn_code`、`v_dim_chl_sub_cust_df.bns_code`、`v_dim_chl_dealer.bns_code`、`v_mkt_budget_snapshot_df.bsn_code`、`v_fin_expense_quota_balance_df.bsn_code`、`v_fin_expense_wallet_df.bsn_code`、`v_fin_expense_wallet_change_dtl_mi.bsn_code`、`v_fin_expense_wallet_route_df.bsn_code`、`v_mkt_cost_package_df.bsn_code`、`v_mkt_expen_src_dtl_df.bsn_code`
- 口径：业务记录直接记载的事业线或事业部编码，用于识别业务所属或适用的事业范围。钱包、预留账户、费用来源等对象的身份须保留这一范围，不将不同事业线的同号对象合并，也不将本编码等同于人员任职组织或办事处编码。各来源保留原始编码，多来源映射不表示跨来源编码已逐值等价。

### 事业线名称 `BusinessLine_name`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.bsn_name`、`v_fin_expense_quota_balance_df.bsn_name`、`v_fin_expense_wallet_df.bsn_name`、`v_fin_expense_wallet_change_dtl_mi.bsn_name`
- 口径：业务记录直接记载的事业线或事业部名称，与同一来源记录中的事业线编码配套解释。名称用于展示和理解业务范围，不能仅凭同名认定不同来源引用的是同一事业线，也不能据当前资料还原历史名称。
