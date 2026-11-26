# 费用来源 `ExpenseSource`

- 分组：费用
- 父类：无

## 说明

规定费用所属财年、事业线、费用类型、出处、自有属性、使用有效期及启停状态的一条费用来源配置，以相应范围内expen_code识别。费用出处中的自主、战略、大区预留等枚举不直接等同自有或预留二分类；费用来源不同于费用包或预留账户。

## 指出的关系

- 费用来源事业线 → 事业线 `ExpenseSource_business_line`
  bsn_code与来源财年、expen_code共同限定费用来源配置的业务范围。

## 指入的关系

- 客户自有核销额度 → 核销额度来源 `CustomerVerificationQuota_source`
  VERIFY行expen_src_code记录额度对应费用来源，来源财年和有效期限定统计范围。
- 费用钱包 → 钱包费用来源 `ExpenseWallet_source`
  expen_src_code记录钱包归属费用来源，与事件请求来源分别解释，不能因事件来源不同而覆盖。
- 钱包分录 → 分录钱包费用来源 `WalletEntry_wallet_source`
  分录expen_src_code直接记录钱包归属来源，与事件请求event_expen_src_code为不同角色。
- 营销费用业务事件 → 事件请求费用来源 `ExpenseEvent_source`
  event_expen_src_code明确记录事件请求的费用来源；关系成立不代表已具备跨财年可执行匹配。
- 费用包 → 费用包来源 `ExpensePackage_source`
  source_code、source_name标注费用来源，保留其与费用来源对象的联系；不同于expen_type_code自有预留模式。

## 属性

### 费用来源编码 `ExpenseSource_source_code`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.expen_code`、`v_fin_expense_quota_balance_df.expen_src_code`、`v_fin_expense_wallet_df.expen_src_code`、`v_fin_expense_wallet_change_dtl_mi.expen_src_code`、`v_fin_expense_wallet_change_dtl_mi.event_expen_src_code`、`v_mkt_cost_package_df.source_code`
- 口径：费用来源配置的业务编码，以及业务记录直接保存的费用来源引用编码。识别具体配置须保留事业线和来源财年范围，不跨范围合并同号来源。同一分录的钱包归属来源与事件请求来源是不同参与身份，不能互相补值；不同来源字段也不因此被认定为逐值等价。

### 费用来源名称 `ExpenseSource_source_name`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.expen_src_name`、`v_fin_expense_quota_balance_df.expen_src_name`、`v_fin_expense_wallet_df.expen_src_name`、`v_fin_expense_wallet_change_dtl_mi.expen_src_name`、`v_mkt_cost_package_df.source_name`
- 口径：费用来源配置的名称，或业务记录直接保存的被引用费用来源名称。名称按各自记录范围解释，不用名称相同认定配置身份，也不将分录所附钱包快照中的名称当作发生时历史名称或当前配置名称。

### 来源财年 `ExpenseSource_financial_year`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.fin_year`、`v_fin_expense_quota_balance_df.fin_year`
- 口径：费用来源配置所属的财年，是来源身份和核销额度统计范围的一部分。财年周期为上年12月至本年11月；取记录明确给出的来源财年，不由使用有效期、钱包财年或分录记账期间重新推算。

### 事业线编码 `ExpenseSource_business_line_code`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.bsn_code`
- 口径：费用来源配置所属事业线的编码，与来源财年和费用来源编码共同限定配置的业务范围。不跨事业线合并同号来源，也不默认等同人员或组织编码。

### 费用类型编码 `ExpenseSource_expense_type_code`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.expen_sub_type_code`
- 口径：本来源配置规定的营销费用类型编码，字段说明列示1为渠道费用、3为市场费用。它不同于费用包或事件中D自有、U预留的资金模式，不按费用编号字母替代实际分类字段。

### 费用类型名称 `ExpenseSource_expense_type_name`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.expen_sub_type_name`
- 口径：本来源配置记录的营销费用类型名称，与同一配置的费用类型编码配套，字段说明列示渠道费用和市场费用。

### 费用出处编码 `ExpenseSource_origin_code`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.expen_unity_code`
- 口径：本来源配置记录的费用出处编码，字段说明列示0为自主费用、1为战略费用、2为大区预留。费用出处不直接等同自有或预留二分类，自主费用不能自动解释为自有额度。

### 费用出处名称 `ExpenseSource_origin_name`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.expen_unity_name`
- 口径：本来源配置保存的费用出处名称，与同一配置的出处编码配套，表示自主费用、战略费用、大区预留等出处含义，不作为是否自有额度的判定结果。

### 自有额度标记 `ExpenseSource_own_quota_flag`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.is_own_code`
- 口径：本来源配置是否标为自有额度的编码，0表示否，1表示是。该标记与费用出处、启停状态分别解释，不由自主、战略或大区预留等出处名称反推。

### 自有额度标记名称 `ExpenseSource_own_quota_flag_name`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.is_own_name`
- 口径：本来源配置保存的是否自有额度名称，与同一配置的自有额度标记配套，表示是或否，不表示当前可用额度是否大于零。

### 使用开始时间 `ExpenseSource_valid_start_time`

- 类型：dateTime
- 字段：`v_mkt_expen_src_dtl_df.start_datetime`、`v_fin_expense_quota_balance_df.valid_start_date`
- 口径：该费用来源允许使用的开始时间，与同一来源的使用结束时间配套。自有核销额度按统计月月初筛选来源时，采用开始时间≤月初≤结束时间；该条件限定来源适用范围，不将当前累计额度还原为统计月末历史值。

### 使用结束时间 `ExpenseSource_valid_end_time`

- 类型：dateTime
- 字段：`v_mkt_expen_src_dtl_df.end_datetime`、`v_fin_expense_quota_balance_df.valid_end_date`
- 口径：该费用来源允许使用的结束时间。自有核销额度按统计月月初筛选时，月初可以等于该时间，结束边界包含在有效期内。它不等同来源财年末或配置的终止状态。

### 来源状态编码 `ExpenseSource_status_code`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.expen_src_status_code`
- 口径：费用来源配置记录的启停状态编码，1为启用，2为终止。它不同于配置记录的数据状态，也不直接证明关联钱包、分录或额度是否有效、余额是否为零。

### 来源状态名称 `ExpenseSource_status_name`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.expen_src_status_name`
- 口径：费用来源配置保存的启停状态名称，与同一配置的状态编码配套，字段说明为启用或终止。

### 配置数据状态编码 `ExpenseSource_data_status_code`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.data_status_code`
- 口径：费用来源配置记录保存的数据状态编码，与来源启用或终止状态分别记录。资料未说明其编码字典及有效记录选择规则，不能将其直接解释为删除标记或来源启停结果。

### 配置数据状态名称 `ExpenseSource_data_status_name`

- 类型：string
- 字段：`v_mkt_expen_src_dtl_df.data_status_name`
- 口径：费用来源配置记录保存的数据状态名称，与同一记录的数据状态编码配套；不作为来源启用或终止状态名称使用。
