# 费用钱包 `ExpenseWallet`

- 分组：费用
- 父类：无

## 说明

记录营销费用额度供给、占用、调整、分配或客户费用的原业务钱包，按事业线、财年和wallet_code识别。钱包不是现金账户，也不等同费用额度余额对象。自有计划、自有核销、预留和其他分类表示钱包归属，不能替代事件的自有或预留费用模式；同一账本类别仍含不同用途，不能把转入转出累计自动转为费用总额。

## 指出的关系

- 钱包事业线 → 事业线 `ExpenseWallet_business_line`
  bsn_code与财年、wallet_code共同限定钱包身份。
- 钱包归属客户 → 经销商 `ExpenseWallet_dealer`
  钱包实际提供的dealer_range_code记录归属经销商；预留账户不因相关钱包有客户字段就获得客户额度维度。
- 钱包行政办事处 → 办事处 `ExpenseWallet_office`
  off_code、off_name记录钱包所附行政办事处。
- 钱包行政大区 → 大区 `ExpenseWallet_district`
  dis_code、dis_name直接记录钱包行政大区。
- 钱包费用来源 → 费用来源 `ExpenseWallet_source`
  expen_src_code记录钱包归属费用来源，与事件请求来源分别解释，不能因事件来源不同而覆盖。
- 归属预留账户 → 预留费用账户 `ExpenseWallet_reserved_account`
  acct_code明确记录钱包归属预留账户，以事业线和账户财年限定；不是钱包的现金开户账户。
- 对应自有计划额度 → 客户自有计划额度 `ExpenseWallet_plan_quota`
  自有计划口径钱包与客户计划额度相联系，按事业线、客户、费用类型及核定业务月解释，不仅凭客户编码定位，也不自动把wallet_month等同额度execute_ym。
- 对应自有核销额度 → 客户自有核销额度 `ExpenseWallet_verification_quota`
  自有核销口径钱包与客户来源额度相联系，按事业线、客户、费用来源解释；来源财年另核，不附加VERIFY为空的执行月。

## 指入的关系

- 钱包分录 → 记入钱包 `WalletEntry_wallet`
  wallet_code、wallet_id直接引用本分录记入的钱包，合用事业线和财年；所附钱包信息来自加工选定快照，不代表发生时历史状态。

## 属性

### 钱包编码 `ExpenseWallet_wallet_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.wallet_code`、`v_fin_expense_wallet_change_dtl_mi.wallet_code`
- 口径：原业务钱包的编码，须与事业线编码和财年共同识别钱包，不把不同事业线或财年的同号钱包视为同一对象。

### 钱包ID `ExpenseWallet_wallet_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_df.wallet_id`、`v_fin_expense_wallet_change_dtl_mi.wallet_id`
- 口径：业务资料记录的钱包ID，与钱包编码分别保留。钱包引用仍须结合事业线、财年和钱包编码解释，不仅凭ID推定跨来源或全历史唯一。

### 钱包财年 `ExpenseWallet_financial_year`

- 类型：string
- 字段：`v_fin_expense_wallet_df.fin_year`、`v_fin_expense_wallet_change_dtl_mi.fin_year`
- 口径：钱包所属财年，是钱包身份范围的一部分。财年按上年12月至本年11月解释，以字段实际值为准，不由流水记账月、操作日期或费用来源财年替代。

### 钱包业务年月 `ExpenseWallet_business_month`

- 类型：string
- 字段：`v_fin_expense_wallet_df.wallet_month`、`v_fin_expense_wallet_change_dtl_mi.wallet_month`
- 口径：钱包自身的业务年月，格式为YYYYMM。不同于流水记账执行月、操作时间和事件业务月；也未被说明为累计转入、转出的截止月份，不能自动等同客户计划额度的执行月。

### 钱包事业线编码 `ExpenseWallet_business_line_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.bsn_code`、`v_fin_expense_wallet_change_dtl_mi.bsn_code`
- 口径：钱包所属事业线的引用编码，与财年和钱包编码共同限定钱包身份，不默认等同人员或客户主数据中的其他事业部编码。

### 钱包事业线名称 `ExpenseWallet_business_line_name`

- 类型：string
- 字段：`v_fin_expense_wallet_df.bsn_name`、`v_fin_expense_wallet_change_dtl_mi.bsn_name`
- 口径：钱包资料直接记录的所属事业线名称，与同一来源记录的事业线编码配套，不以名称相同认定不同编码属于同一事业线。

### 钱包类型编码 `ExpenseWallet_wallet_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.wallet_type`、`v_fin_expense_wallet_change_dtl_mi.wallet_type`
- 口径：原钱包的具体业务类型编码，用于区分额度供给、计划使用、调整、预留分配、核销相关额度和客户费用等用途。类型不同于额度分类或事件类型，同一账本类别中的具体钱包类型仍须分别解释。

### 钱包类型名称 `ExpenseWallet_wallet_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_df.wallet_type_name`、`v_fin_expense_wallet_change_dtl_mi.wallet_type_name`
- 口径：钱包具体业务类型的名称，与同一记录的类型编码对应，不通过名称关键词判断事件用途或金额口径。

### 钱包额度分类 `ExpenseWallet_quota_scope`

- 类型：string
- 字段：`v_fin_expense_wallet_df.quota_scope_code`、`v_fin_expense_wallet_change_dtl_mi.quota_scope_code`
- 口径：钱包所归属的额度口径：SELF_PLAN为自有计划额度，SELF_VERIFY为自有核销额度，RESERVED为预留额度，OTHER为其他。自有计划和自有核销是并行口径，不能因为都属自有而混加金额；本分类不表示严格账户上下级，也不等同事件使用自有或预留费用的模式。

### 钱包额度分类名称 `ExpenseWallet_quota_scope_name`

- 类型：string
- 字段：`v_fin_expense_wallet_df.quota_scope_name`、`v_fin_expense_wallet_change_dtl_mi.quota_scope_name`
- 口径：钱包归属额度口径的名称，区分自有计划、自有核销、预留及其他，与同一来源记录的额度分类编码配套。

### 钱包账本类别 `ExpenseWallet_ledger_role_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.wallet_type`、`v_fin_expense_wallet_change_dtl_mi.ledger_role_code`、`v_fin_expense_wallet_change_dtl_mi.wallet_type`
- 口径：按钱包具体类型固定归组的用途类别，区分自有计划及预留主账、活动预留分配账户、核销相关额度账、客户费用账户和未分类。它不是严格账户上下级；同类钱包仍可能用于供给、占用、调整或返还，不能自动将同类金额认定为费用总额、核销额、付款或余额。核销相关账不表示每笔已核销或与主账逐笔镜像，客户费用账户也不表示主体全部是门店。

### 归属客户销售范围编码 `ExpenseWallet_dealer_range_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.dealer_range_code`、`v_fin_expense_wallet_change_dtl_mi.dealer_range_code`
- 口径：钱包直接记录的归属经销商销售范围编码，不同于事件归属客户或事件上游客户。分录所附值来自加工选定的钱包快照，不代表记账发生时的历史归属；缺失不表示没有费用，也不能据相关钱包的客户字段为预留账户增加客户额度维度。

### 归属客户名称 `ExpenseWallet_dealer_name`

- 类型：string
- 字段：`v_fin_expense_wallet_df.dealer_range_name`、`v_fin_expense_wallet_change_dtl_mi.dealer_range_name`
- 口径：钱包资料直接记录的归属经销商名称，与同一记录的客户销售范围编码配套。分录来源描述加工选定的钱包快照归属，不以事件客户名称替代。

### 行政办事处编码 `ExpenseWallet_office_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.off_code`、`v_fin_expense_wallet_change_dtl_mi.off_code`
- 口径：钱包直接记录的行政归属办事处编码。钱包视图与分录所附钱包快照按各自来源解释，不能将所附归属当作记账发生时的历史组织。

### 行政办事处名称 `ExpenseWallet_office_name`

- 类型：string
- 字段：`v_fin_expense_wallet_df.off_name`、`v_fin_expense_wallet_change_dtl_mi.off_name`
- 口径：钱包直接记录的行政归属办事处名称，与同一来源的办事处编码对应。分录所附名称不表示发生时历史归属。

### 行政大区编码 `ExpenseWallet_district_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.dis_code`、`v_fin_expense_wallet_change_dtl_mi.dis_code`
- 口径：钱包直接记录的行政归属大区编码，不仅由办事处的当前上级组织推导。分录来源表示加工选定的钱包快照归属。

### 行政大区名称 `ExpenseWallet_district_name`

- 类型：string
- 字段：`v_fin_expense_wallet_df.dis_name`、`v_fin_expense_wallet_change_dtl_mi.dis_name`
- 口径：钱包直接记录的行政归属大区名称，与同一来源的大区编码配套，不以其他客户或事件的大区名称补齐。

### 归属预留账户编码 `ExpenseWallet_reserved_account_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.acct_code`、`v_fin_expense_wallet_change_dtl_mi.acct_code`
- 口径：钱包直接记录的归属预留费用账户编码，账户定位须保留事业线和账户财年范围。它不是钱包编码或现金开户账户，也不同于事件请求的预留账户引用。

### 归属费用类型编码 `ExpenseWallet_expense_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.expen_sub_type_code`、`v_fin_expense_wallet_change_dtl_mi.expen_sub_type_code`
- 口径：钱包归属的营销费用类型编码：1为渠道费用，3为市场费用，4为货龄东方树叶费用，5为水专项预留费用，6为货龄其他品类费用。它不表示费用包D/U自有预留模式，也不同于事件请求的费用类型。

### 归属费用类型名称 `ExpenseWallet_expense_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_df.expen_sub_type_name`、`v_fin_expense_wallet_change_dtl_mi.expen_sub_type_name`
- 口径：钱包归属营销费用类型的名称，与同一记录的费用类型编码配套，不作为自有或预留二分类的替代。

### 归属费用来源编码 `ExpenseWallet_expense_source_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.expen_src_code`、`v_fin_expense_wallet_change_dtl_mi.expen_src_code`
- 口径：钱包直接记录的归属费用来源引用编码，不同于事件请求费用来源，也不是费用包编码。来源对象须在相应事业线和来源财年范围内识别，不能仅凭来源编码认定唯一。

### 归属费用来源名称 `ExpenseWallet_expense_source_name`

- 类型：string
- 字段：`v_fin_expense_wallet_df.expen_src_name`、`v_fin_expense_wallet_change_dtl_mi.expen_src_name`
- 口径：钱包资料直接记录的归属费用来源名称，与同一记录的来源编码配套。名称只说明该引用，不证明已完成跨财年来源匹配。

### 归属费用出处编码 `ExpenseWallet_expense_origin_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.expense_origin_code`、`v_fin_expense_wallet_change_dtl_mi.expense_origin_code`
- 口径：钱包归属的系统费用出处编码：0自主费用、1战略费用、2大区预留、3自有费用（系统预留）、4经销商利润、5水专项预留费用。出处枚举不直接等同自有或预留二分类，自主费用不自动等同自有费用。

### 归属费用出处名称 `ExpenseWallet_expense_origin_name`

- 类型：string
- 字段：`v_fin_expense_wallet_df.expense_origin_name`、`v_fin_expense_wallet_change_dtl_mi.expense_origin_name`
- 口径：钱包系统费用出处的名称，与同一来源的出处编码对应，保留自主、战略、大区预留、系统预留等原有区别。

### 核销额度计算口径编码 `ExpenseWallet_verification_basis_code`

- 类型：string
- 字段：`v_fin_expense_wallet_df.verify_basis_code`
- 口径：钱包记录的核销额度计算依据类别：reward为奖励基数，target为目标销量。本字段不是奖励基数、销量或费率的实际数值，不能仅据此重算额度；材料所述目标销量形成自有额度的口径适用于电商，不推广为所有客户的计算规则。

### 核销额度计算口径名称 `ExpenseWallet_verification_basis_name`

- 类型：string
- 字段：`v_fin_expense_wallet_df.verify_basis_name`
- 口径：钱包记录的核销额度计算依据名称，与同一钱包的计算口径编码配套，用于区分奖励基数和目标销量依据，不表示依据数值。

### 累计转入金额 `ExpenseWallet_cumulative_income_amount`

- 类型：decimal
- 字段：`v_fin_expense_wallet_df.income_amt`
- 口径：钱包记录中的累计转入金额，单位元。表示该钱包的转入累计，不是现金收入、费用总额度或本业务月的单月发生额；钱包业务年月未被说明为累计截止月。须结合具体钱包类型解释，不与转出累计直接混加为营销费用。

### 累计转出金额 `ExpenseWallet_cumulative_outcome_amount`

- 类型：decimal
- 字段：`v_fin_expense_wallet_df.outcome_amt`
- 口径：钱包记录中的累计转出金额，单位元。表示该钱包的转出累计，不等同现金付款、活动使用额或已核销费用，也不是已确认的本业务月单月发生额。不能仅用转入减转出认定费用额度余额，须先有相应钱包类型的记账定义。
