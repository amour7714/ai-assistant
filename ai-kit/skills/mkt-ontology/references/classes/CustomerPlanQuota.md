# 客户自有计划额度 `CustomerPlanQuota`

- 分组：费用
- 父类：无

## 说明

经销商在事业线、费用类型和所选执行月范围内可供活动计划占用的自有额度，对应余额表PLAN且quota_type_code为SELF。每月行已经累计自财年首月至该月，只选相应月，不跨查询月相加。总额度为自有加调整额度；使用额同时含本客户与合作商系统和线下使用，包含核销消耗与未核销冻结，不等同已核销费用。计划可用额度可为负数，不截断。

## 指出的关系

- 计划额度客户 → 经销商 `CustomerPlanQuota_dealer`
  PLAN行dealer_range_code与事业线、费用类型及执行月共同识别客户自有计划额度。
- 计划额度事业线 → 事业线 `CustomerPlanQuota_business_line`
  PLAN行bsn_code限定本额度及累计使用范围。
- 计划额度办事处 → 办事处 `CustomerPlanQuota_office`
  PLAN行off_code记录该累计截止月额度所附行政办事处。
- 计划额度大区 → 大区 `CustomerPlanQuota_district`
  PLAN行dis_code直接记录额度行政大区；活动占用可与同范围预留使用合并，但不能再加核销额度已用值。

## 指入的关系

- 费用钱包 → 对应自有计划额度 `ExpenseWallet_plan_quota`
  自有计划口径钱包与客户计划额度相联系，按事业线、客户、费用类型及核定业务月解释，不仅凭客户编码定位，也不自动把wallet_month等同额度execute_ym。

## 属性

### 累计截止执行月 `CustomerPlanQuota_execution_month`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.execute_ym`
- 口径：本计划额度累计截止的执行年月，格式为YYYYMM。同一行的额度和使用额已经累计自本财年首月至该月，不是该月单月发生额；查询只选相应执行月，不跨执行月相加。执行月是业务累计截止月，视图未提供快照日期，不能据此保证还原该月末的历史余额。

### 费用类型编码 `CustomerPlanQuota_expense_type`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expen_sub_type_code`
- 口径：本计划额度对应的营销费用类型编码，与事业线、客户和累计截止执行月共同限定额度范围。来源字段字典为：1渠道费用、3市场费用、4货龄东方树叶费用、5水专项预留费用、6货龄其他品类费用。该字典不表示所有取值都必然出现在自有计划额度中，也不能凭类型名称中的“预留”改变本类的自有计划额度口径。

### 费用类型名称 `CustomerPlanQuota_expense_type_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.expen_sub_type_name`
- 口径：本计划额度对应的营销费用类型名称，与同一额度记录的费用类型编码配套使用，不表示费用出处或自有、预留费用模式。

### 余额记录标识 `CustomerPlanQuota_balance_record_identifier`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.quota_snapshot_id`
- 口径：费用额度余额表中这条客户自有计划额度记录的标识，用于定位来源行。额度的业务范围仍由事业线、客户、费用类型和执行月限定，不将本标识解释为跨月不变的额度对象编码或快照日期。

### 累计所属财年 `CustomerPlanQuota_financial_year`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.fin_year`
- 口径：本计划额度累计值所属的财年，与累计截止执行月配套使用。资料中的财年为上年12月至本年11月，额度累计从相应财年首月开始，不按自然年重新归属。

### 事业线编码 `CustomerPlanQuota_business_line_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.bsn_code`
- 口径：本计划额度所属事业线的编码，是识别额度范围和累计使用范围的必要引用。不同事业线的同号客户、费用类型和执行月不能直接视为同一额度。

### 事业线名称 `CustomerPlanQuota_business_line_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.bsn_name`
- 口径：本计划额度记录所附的事业线名称，与本行事业线编码对应。

### 额度客户销售范围编码 `CustomerPlanQuota_dealer_range_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dealer_range_code`
- 口径：拥有本计划额度的经销商销售范围编码，与事业线、费用类型和累计截止执行月共同识别额度。它是本额度记录中的客户引用值，不是SAP客户编码，也不是合作商累计使用的参与方编码。

### 额度客户名称 `CustomerPlanQuota_dealer_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dealer_range_name`
- 口径：本计划额度所属经销商的名称，与同一额度记录的客户销售范围编码配套；不因使用额包含合作商使用而将该名称解释为合作商名称。

### 额度客户类型 `CustomerPlanQuota_dealer_type_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dealer_type_name`
- 口径：本计划额度余额记录所附的经销商类型名称，用于解释该额度记录中的客户分类；不据此反推全部活动发生时的客户类型。

### 额度行政办事处编码 `CustomerPlanQuota_office_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.off_code`
- 口径：本计划额度余额记录所附的行政办事处编码，按所选累计截止执行月的额度记录使用，不等同于每笔活动发生时的办事处归属。

### 额度行政办事处名称 `CustomerPlanQuota_office_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.off_name`
- 口径：本计划额度记录所附的行政办事处名称，与同一行的办事处编码配套使用，不由经销商当前组织名称覆盖。

### 额度行政大区编码 `CustomerPlanQuota_district_code`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dis_code`
- 口径：本计划额度余额记录所附的行政大区编码。与预留账户使用额合并分析活动占用时，须采用一致的财年、事业线及大区范围；预留账户没有客户维度，不能把合并后的活动占用额直接拆为经销商占用额。

### 额度行政大区名称 `CustomerPlanQuota_district_name`

- 类型：string
- 字段：`v_fin_expense_quota_balance_df.dis_name`
- 口径：本计划额度记录所附的行政大区名称，与同一行的大区编码配套使用，不表示省份或城市。

### 累计自有计划额度 `CustomerPlanQuota_own_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.plan_own_amt`
- 口径：截至所选执行月，经销商在本财年、相应事业线和费用类型范围内累计形成的自有计划额度，单位元，包括奖励基数带来的自有额度。这是已形成的额度，不是奖励基数本身；不跨执行月重复累计，也不与调整额度或总额度重复相加。

### 累计调整计划额度 `CustomerPlanQuota_adjustment_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.plan_adjust_amt`
- 口径：截至所选执行月，经销商在本财年、相应事业线和费用类型范围内累计的计划额度调整金额，单位元，可由调整计划额度导入等产生。调整金额可为负数，按原符号合计，不取绝对值；不跨执行月相加。

### 累计计划总额度 `CustomerPlanQuota_total_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.plan_total_amt`
- 口径：截至所选执行月，经销商在本财年、相应事业线和费用类型范围内的累计计划总额度，单位元，等于同一额度记录的累计自有计划额度加累计调整计划额度。只取所选执行月，不把总额度与其两个组成金额再次相加。

### 累计使用计划额度 `CustomerPlanQuota_used_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.plan_used_amt`
- 口径：截至所选执行月，本财年内累计占用的客户自有计划额度，单位元，包含本客户系统使用、本客户线下调整使用、合作商系统使用和合作商线下调整使用。占用同时包括核销消耗和未核销冻结，不等同于已核销费用。业务统计将空金额按0处理，负数按原符号合计，不取绝对值，也不跨执行月相加。汇总活动占用时可加同范围预留使用额，但不能再加并行核销额度账的已用值。

### 可用计划额度 `CustomerPlanQuota_available_amount`

- 类型：decimal
- 字段：`v_fin_expense_quota_balance_df.plan_balance_amt`
- 口径：所选累计截止执行月的计划额度记录中，扣减累计使用后仍可供活动计划占用的额度，单位元。资料口径为累计计划总额度减累计使用计划额度，已同时扣减本客户和合作商使用；不再另扣合作商使用。使用超过累计额度时可为负数，不截断为0，也不跨执行月相加。
