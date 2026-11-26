# 客户自有核销额度 `CustomerVerificationQuota`

- 分组：费用
- 父类：无

## 说明

经销商在事业线和费用来源范围内可供核销的自有额度，对应余额表VERIFY且quota_type_code为SELF，没有执行月。统计按来源财年及统计月月初仍在有效期筛选，金额是当前累计值而非该月末历史快照。已用额度仅含本客户使用，可用额度还扣合作商使用，因此不能普遍用总额减已用额度代替可用额度。自有额度已含奖励基数及适用电商目标销量形成的额度，不再乘约定费率；与计划额度是并行口径，不能重复计入活动占用。

## 指出的关系

- 核销额度客户 → 经销商 `CustomerVerificationQuota_dealer`
  VERIFY行dealer_range_code与事业线、费用来源共同识别核销额度，不附加流水记账月等值条件。
- 核销额度来源 → 费用来源 `CustomerVerificationQuota_source`
  VERIFY行expen_src_code记录额度对应费用来源，来源财年和有效期限定统计范围。
- 核销额度事业线 → 事业线 `CustomerVerificationQuota_business_line`
  VERIFY行bsn_code限定客户来源额度的事业线。
- 核销额度办事处 → 办事处 `CustomerVerificationQuota_office`
  VERIFY行off_code记录当前来源额度的行政办事处，不表示所选统计月末历史快照。
- 核销额度大区 → 大区 `CustomerVerificationQuota_district`
  VERIFY行dis_code直接记录当前来源额度行政大区。

## 指入的关系

- 费用钱包 → 对应自有核销额度 `ExpenseWallet_verification_quota`
  自有核销口径钱包与客户来源额度相联系，按事业线、客户、费用来源解释；来源财年另核，不附加VERIFY为空的执行月。

## 属性

### 余额记录标识 `CustomerVerificationQuota_balance_record_identifier`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.quota_snapshot_id`
- 口径：当前视图中一条客户自有核销额度余额记录的标识。额度的业务范围仍由事业线、客户及费用来源共同限定；本标识不是钱包编号，也不提供历史快照日期。

### 费用来源财年 `CustomerVerificationQuota_financial_year`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.fin_year`
- 口径：本核销额度对应费用来源所属的财年，用于限定来源统计范围。财年通常为上年12月至本年11月；本值不表示核销发生月，也不能未经核定等同钱包或流水财年。

### 事业线编码 `CustomerVerificationQuota_business_line_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.bsn_code`
- 口径：本客户核销额度所属事业线的编码，是额度业务范围的一部分。不同事业线下同一客户或同号费用来源的额度分别解释。

### 事业线名称 `CustomerVerificationQuota_business_line_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.bsn_name`
- 口径：核销额度余额记录直接记载的所属事业线名称，与本记录的事业线编码对应。

### 额度客户编码 `CustomerVerificationQuota_dealer_range_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dealer_range_code`
- 口径：持有本自有核销额度的经销商销售范围编码，与事业线和费用来源共同限定额度对象。该编码不是SAP客户编码，也不表示使用其额度的某个合作商。

### 额度客户名称 `CustomerVerificationQuota_dealer_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dealer_range_name`
- 口径：本核销额度余额记录记载的持有额度的经销商名称，与同一记录的额度客户编码对应。

### 额度客户类型 `CustomerVerificationQuota_dealer_type_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dealer_type_name`
- 口径：核销额度余额记录所附经销商的类型名称。它描述当前余额记录中的客户分类，不用于反推所选统计月或业务发生时的历史客户类型。

### 费用来源编码 `CustomerVerificationQuota_expense_source_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expen_src_code`
- 口径：本客户核销额度所引用的费用来源编码。一个客户可以在不同费用来源下分别持有额度；来源编码须结合事业线及来源财年解释，不能只按客户合并为一条额度。

### 费用来源名称 `CustomerVerificationQuota_expense_source_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expen_src_name`
- 口径：本核销额度余额记录直接记载的费用来源名称，与本记录的来源编码对应；名称相同不证明不同来源额度属于同一对象。

### 费用类型编码 `CustomerVerificationQuota_expense_type_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expen_sub_type_code`
- 口径：本费用来源核销额度对应的费用类型编码，可用于按渠道、市场、货龄等类型分类统计。同一费用类型下的不同来源仍分别持有额度。余额表字典包括1渠道、3市场、4货龄东方树叶、5水专项预留、6货龄其他品类；本类只采用自有核销行实际记录的类型，不由类型名称推断额度模式。

### 费用类型名称 `CustomerVerificationQuota_expense_type_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expen_sub_type_name`
- 口径：本核销来源额度所附的费用类型名称，与同一余额记录的费用类型编码对应。

### 费用出处编码 `CustomerVerificationQuota_expense_origin_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expense_origin_code`
- 口径：本核销额度余额记录记载的费用出处编码。余额表字典为0自主费用、1战略费用、2大区预留、3自有费用（系统预留）、4经销商利润、5水专项预留费用。费用出处不是自有或预留二分类，自主费用也不能自动解释为自有费用。

### 费用出处名称 `CustomerVerificationQuota_expense_origin_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expense_origin_name`
- 口径：本核销额度余额记录记载的费用出处名称，与费用出处编码对应，保留系统出处分类的原始含义。

### 来源使用开始时间 `CustomerVerificationQuota_valid_start_time`

- 类型：dateTime
- 字段：`v_fin_expense_quota_balance_df.valid_start_date`
- 口径：本核销额度对应费用来源允许使用的开始时间。统计时与结束时间成对判断，只有开始时间不晚于所选统计月月初、且结束时间不早于月初的来源才纳入；该时间不是核销发生时间。

### 来源使用结束时间 `CustomerVerificationQuota_valid_end_time`

- 类型：dateTime
- 字段：`v_fin_expense_quota_balance_df.valid_end_date`
- 口径：本核销额度对应费用来源允许使用的结束时间，与同一记录的开始时间共同限定统计来源范围。统计月月初已超过本时间的来源不纳入，不能因其仍有当前累计金额就计入有效来源额度。

### 行政办事处编码 `CustomerVerificationQuota_office_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.off_code`
- 口径：当前核销来源额度余额记录直接记载的行政办事处编码，用于按额度归属汇总，不表示所选统计月月末的历史组织归属。

### 行政办事处名称 `CustomerVerificationQuota_office_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.off_name`
- 口径：当前核销额度余额记录所附行政办事处的名称，与本行办事处编码对应，不用于还原历史月份归属。

### 行政大区编码 `CustomerVerificationQuota_district_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dis_code`
- 口径：当前核销来源额度余额记录直接记载的行政大区编码。按大区汇总时采用该额度记录的归属，不将其解释为所选统计月月末历史快照。

### 行政大区名称 `CustomerVerificationQuota_district_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dis_name`
- 口径：当前核销额度余额记录所附行政大区的名称，与本行大区编码对应。

### 累计自有核销额度 `CustomerVerificationQuota_own_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.verify_own_amt`
- 口径：本客户在本费用来源下当前累计生成的自有核销额度，单位元，不含另列的调整额度。已包含奖励基数乘适用约定费率形成的额度，以及适用电商目标销量形成的额度，直接使用已加工金额，不再乘费率。奖励基数与约定费率由业务系统计算，本字段不是这些计算输入。

### 累计调整核销额度 `CustomerVerificationQuota_adjust_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.verify_adjust_amt`
- 口径：本客户在本费用来源下当前累计的核销额度调整金额，单位元，包括从预留调整到自有及自有之间的调整，对应核销额度查询中的调整费用额度。调整可为负数，按原符号保留和汇总，不取绝对值。

### 累计核销总额度 `CustomerVerificationQuota_total_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.verify_total_amt`
- 口径：本客户在本费用来源下当前累计的核销总额度，单位元，等于累计自有核销额度加累计调整核销额度。它是额度供给总额，不是已核销金额或可用余额；统计月只用于筛选有效来源，不能将本值解释为该月末历史快照。

### 本客户累计核销使用额度 `CustomerVerificationQuota_used_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.verify_used_amt`
- 口径：本客户在本费用来源下当前累计使用的自有核销额度，单位元，等于本客户系统使用加本客户线下调整使用，不含合作商使用。它与包含合作商使用及未核销冻结的计划使用额度不同，不能再加到计划使用额度与预留使用额度构成的活动占用金额中。

### 合作商累计核销使用额度 `CustomerVerificationQuota_partner_used_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.verify_total_amt`、`v_fin_expense_quota_balance_df.verify_used_amt`、`v_fin_expense_quota_balance_df.verify_balance_amt`
- 口径：使用本客户同一费用来源额度的合作商系统使用与线下调整使用的当前累计合计，单位元。依据可用额度同时扣减本客户和合作商使用的规则，推算为核销总额度减本客户累计核销使用额度再减可用核销额度。只能得到合作商使用合计，不能识别单个合作商；任一输入为空时结果为空，不取绝对值或截断。

### 可用核销额度 `CustomerVerificationQuota_balance_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.verify_balance_amt`
- 口径：本客户在本费用来源下当前仍可使用的核销额度，单位元。可用额度等于核销总额度减本客户系统使用、本客户线下调整使用、合作商系统使用及合作商线下调整使用。由于本客户累计核销使用额度不含合作商使用，不能普遍用总额度减本客户使用额度替代本值；可用额度可为负数，不截断。
