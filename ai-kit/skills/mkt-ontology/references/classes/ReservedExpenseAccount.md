# 预留费用账户 `ReservedExpenseAccount`

- 分组：费用
- 父类：无

## 说明

总部或大区管理预留费用的账户，按事业线、账户编码及其财年识别，没有经销商额度维度。余额表中对应RESERVED且额度类型为RESERVED_ACCOUNT的对象。预留总额包含初始、调整、冲销、划拨及收回预算的带符号净额；使用额为活动使用及调整净额整体取反，回退抵减使用，不逐笔取绝对值。分类不完整时总额和使用额可为空，而当前余额仍可能有值，因此不能总以总额减使用额替代当前余额。

## 指出的关系

- 账户事业线 → 事业线 `ReservedExpenseAccount_business_line`
  bsn_code是预留账户身份范围的一部分，不跨事业线合并同号账户。
- 账户行政办事处 → 办事处 `ReservedExpenseAccount_office`
  RESERVED余额行实际记录的off_code表示账户行政归属，不据此虚构经销商归属。
- 账户行政大区 → 大区 `ReservedExpenseAccount_district`
  RESERVED余额行dis_code直接记录账户归属大区；预留与客户计划占用合并分析最细只能到资料允许的大区范围。

## 指入的关系

- 活动计划明细 → 钱包归属预留账户 `ActivityPlanDetail_reserved_account`
  acct_code记录本计划费用所附钱包归属预留账户，不与费用账户expen_src_code互相补值。
- 费用钱包 → 归属预留账户 `ExpenseWallet_reserved_account`
  acct_code明确记录钱包归属预留账户，以事业线和账户财年限定；不是钱包的现金开户账户。
- 钱包分录 → 分录钱包预留账户 `WalletEntry_wallet_reserved_account`
  分录acct_code直接记录钱包归属预留账户，不用event_acct_code补值。
- 营销费用业务事件 → 事件预留账户 `ExpenseEvent_reserved_account`
  event_acct_code记录事件请求所指预留账户，是否为必填取决于业务入口，不能全局附加到账户无关的分配或计划场景。

## 属性

### 预留账户编码 `ReservedExpenseAccount_account_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.acct_code`、`v_fin_expense_wallet_df.acct_code`、`v_fin_expense_wallet_change_dtl_mi.acct_code`、`v_fin_expense_wallet_change_dtl_mi.event_acct_code`、`v_mkt_market_actv_plan_verify_cost.acct_code`
- 口径：预留费用账户的业务编码，须结合事业线和账户财年识别。钱包归属账户与事件请求账户是不同引用身份，不相互补值；编码相同不单独证明是同一账户。该编码不同于钱包编码、计划费用表的expen_src_code及尚未明确对应的统案account_code。

### 账户事业线编码 `ReservedExpenseAccount_business_line_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.bsn_code`、`v_fin_expense_wallet_change_dtl_mi.bsn_code`
- 口径：预留账户所属事业线的引用编码，是账户身份和金额统计范围的一部分。不同事业线的同号账户不能合并。

### 账户财年 `ReservedExpenseAccount_financial_year`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.fin_year`、`v_fin_expense_wallet_change_dtl_mi.fin_year`
- 口径：预留账户所属财年，与事业线和账户编码共同识别账户。财年通常为上年12月至本年11月，实际取记录提供的财年，不从账户年月或操作时间替代推算。

### 账户所属年月 `ReservedExpenseAccount_account_month`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.execute_ym`
- 口径：预留账户记录的所属年月，格式为YYYYMM。它不是流水记账月、钱包业务月或事件业务月，也不表示按该月截止加工的历史余额。预留额度按账户财年汇总时不额外限定账户年月。

### 账户行政办事处编码 `ReservedExpenseAccount_office_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.off_code`
- 口径：当前预留账户余额记录直接提供的行政办事处引用编码。它表示账户行政归属，不表示经销商额度归属，也不能从关联钱包的办事处反向补齐。

### 账户行政大区编码 `ReservedExpenseAccount_district_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dis_code`
- 口径：当前预留账户余额记录直接提供的行政大区引用编码。预留账户没有经销商额度维度；与客户计划额度合并分析活动占用时，最细采用资料允许的大区范围。

### 账户费用科目编码 `ReservedExpenseAccount_expense_subject_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.subject_code`
- 口径：预留账户余额记录提供的费用科目编码，与同一记录的科目名称对应。不将其认定为预算项目编码或额度调整类型。

### 账户费用科目名称 `ReservedExpenseAccount_expense_subject_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.subject_name`
- 口径：预留账户余额记录提供的费用科目名称，与该账户记录中的费用科目编码配套解释。

### 账户费用类型编码 `ReservedExpenseAccount_expense_type_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expen_sub_type_code`
- 口径：预留账户余额记录中的营销费用类型编码。资料列出1渠道费用、3市场费用、4货龄东方树叶费用、5水专项预留费用、6货龄其他品类费用。该分类不是费用包或事件中D自有、U预留的费用模式，也不是用于计算预算与使用净额的额度调整类型。

### 账户费用类型名称 `ReservedExpenseAccount_expense_type_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expen_sub_type_name`
- 口径：预留账户余额记录中的营销费用类型名称，与同一账户记录的费用类型编码对应。

### 账户费用出处编码 `ReservedExpenseAccount_expense_origin_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expense_origin_code`
- 口径：预留账户余额记录中的系统费用出处分类。编码包括0自主费用、1战略费用、2大区预留、3自有费用（系统预留）、4经销商利润、5水专项预留费用。费用出处不能直接替代自有或预留二分类，“自主”不自动等同“自有”，也不据此为预留账户增加经销商额度维度。

### 账户费用出处名称 `ReservedExpenseAccount_expense_origin_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expense_origin_name`
- 口径：预留账户余额记录中的费用出处名称，与同一记录的出处编码对应；保留系统分类名称，不改写为统一的自有或预留费用模式。

### 预留费用总额度 `ReservedExpenseAccount_total_quota_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.reserved_total_amt`
- 口径：本账户所属财年的当前预留预算总额度，单位元。由初始预算、调整预算、冲销预算、费用划拨、冲销划拨、收回预算六类明细按原符号合计，活动使用及活动使用调整不计入总额，不逐笔取绝对值。存在无法识别额度调整类型的明细时，总额和使用额同时为空，不补0；汇总忽略空值不代表这些账户没有额度。

### 年累使用预留额度 `ReservedExpenseAccount_used_quota_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.reserved_used_amt`
- 口径：本账户所属财年当前累计的活动占用额度，单位元。先合计活动使用、活动使用调整的带符号明细金额，再整体取反；退回、回退产生的正数明细抵减使用额，不逐笔取绝对值。占用包含核销消耗及未核销冻结，不等同已核销金额或现金付款。账户调整类型无法完整识别时为空，不补0。

### 预留可用额度 `ReservedExpenseAccount_current_balance_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.reserved_balance_amt`
- 口径：预留账户的当前金额，即当前预留可用额度，单位元，为空时保留空。仅在额度调整分类完整的账户上等于预留总额度减年累使用预留额度；分类不完整时，总额和使用额可以为空而当前金额仍有值，因此不能普遍用两者相减替代本值。它不是指定历史月末余额。

### 预留费用使用进度 `ReservedExpenseAccount_usage_progress`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.reserved_used_amt`、`v_fin_expense_quota_balance_df.reserved_total_amt`
- 口径：本账户年累使用预留额度占预留费用总额度的比例，计算为使用额除以总额度，按小数比例保存，展示百分比时乘100。总额度为0或任一输入为空时结果为空；使用超过总额时可以大于1，不截断。汇总到大区或事业线时先分别汇总使用额和总额度再相除，不对账户进度求平均。
