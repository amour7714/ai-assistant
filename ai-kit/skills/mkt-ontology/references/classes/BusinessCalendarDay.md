# 业务日历日 `BusinessCalendarDay`

- 分组：目标
- 父类：无

## 说明

记录一个日期对应的自然期间、分销期间和销售财务期间，以及销售、分销天数与时间进度。通常财年为上年12月至本年11月，但销售考核期间须采用数据提供的销售财务月和对齐字段，不能由自然月替代。分销日规则排除非工作日周日和节假日，折算使用已提供的业务天数；目标月天数在逐日记录中重复，不按日累加。

## 指出的关系

无

## 指入的关系

- 组织销售目标 → 截止日折算依据 `OfficeSalesTarget_cutoff_calendar`
  销售调整预算行使用所选截止日期对应的唯一业务日历日取得销售财务月及销售天序，再按目标月与截止月关系折算；不是将目标金额展开到所有日历行。
- 月度分销目标 → 分销日历依据 `DistributionTarget_calendar`
  目标月份对应日历month_id，以所选截止日的分销天序、总天数或进度折算，不能按多条日历记录重复累计目标。

## 属性

### 日期 `BusinessCalendarDay_date`

- 类型：date
- 字段：`v_trd_time_prg_df.date_fmt`、`v_trd_time_prg_df.date_id`
- 口径：本条业务日历记录表示的具体日期。同一日期行中的自然期间、分销期间、销售财务期间及业务天数须配套使用；查询截止日折算时取对应日期行，不将目标展开到所有日历日期。

### 自然年 `BusinessCalendarDay_natural_year`

- 类型：string
- 字段：`v_trd_time_prg_df.year_id`
- 口径：该日期所属的自然年，用于自然年分析，不替代分销财年或销售财年。

### 自然月 `BusinessCalendarDay_natural_month`

- 类型：string
- 字段：`v_trd_time_prg_df.month_id`
- 口径：该日期所属的自然月，用于匹配按自然月维护的月度分销目标，并限定本日月分销天数和分销天序号的期间；不与销售财务月混用。

### 分销财年 `BusinessCalendarDay_distribution_financial_year`

- 类型：string
- 字段：`v_trd_time_prg_df.fin_year`
- 口径：该日期所属的分销财年。业务财年通常为上年12月至本年11月，日期的实际财年归属采用日历提供值，不用自然年替代。

### 月分销天数 `BusinessCalendarDay_monthly_distribution_days`

- 类型：integer
- 字段：`v_trd_time_prg_df.dist_day_cnt`
- 口径：该日期所属自然月的分销总天数，单位为天。分销日规则不计非工作日的周日和节假日，采用已提供天数。单日分销目标为月目标除以本值，月累折算目标按已过分销天数占本值的比例计算；作为分母时须大于0。月总天数在逐日记录中重复，不能按日累加。

### 是否分销日 `BusinessCalendarDay_is_distribution_day`

- 类型：boolean
- 字段：`v_trd_time_prg_df.if_dist`
- 口径：该日期是否计入分销天数，源编码1为是、0为否。非工作日的周日和节假日不计入，不能仅凭星期认定所有周日均不计入；本标记也不表示该日一定发生了分销交易。

### 月分销天序号 `BusinessCalendarDay_monthly_distribution_day_number`

- 类型：integer
- 字段：`v_trd_time_prg_df.dist_day_rn`
- 口径：截至该日期，在所属自然月内的分销天序号，用于表达当月已过分销天数和截止日目标折算。它不是自然日期中的日号，也不是可跨日期相加的日发生量。

### 月分销时间进度 `BusinessCalendarDay_monthly_distribution_time_progress`

- 类型：decimal
- 字段：`v_trd_time_prg_df.dist_time_prg`
- 口径：该日期对应自然月的分销时间进度占比，用于以月分销目标乘此占比取得截止日折算目标。业务折算按已过分销天数占当月总分销天数的比例解释，采用来源已提供值，不用自然日占比替代。它不同于实际分销金额除以目标的业绩完成率，不能按日累加。

### 销售财年 `BusinessCalendarDay_sales_financial_year`

- 类型：string
- 字段：`v_trd_time_prg_df.sales_fin_year`
- 口径：该日期所属的销售财年，与本日销售财务月配套解释。实际销售期间归属采用日历提供的销售财年和财务月，不直接按自然年或分销财年补值。

### 销售财务月 `BusinessCalendarDay_sales_financial_month`

- 类型：string
- 字段：`v_trd_time_prg_df.sales_fin_month_id`
- 口径：该日期所属的销售财务月。销售调整预算目标按所选截止日期读取本值作为截止财务月，再与目标的考核财务月比较进行折算；不默认等于自然月，也不用考核日期所属自然月替代。

### 月销售天数 `BusinessCalendarDay_monthly_sales_days`

- 类型：integer
- 字段：`v_trd_time_prg_df.sales_day_cnt`
- 口径：该日期所属销售财务月的销售总天数，单位为天，可作为适用销售目标折算的天数分母，分母须大于0。它不是自然月天数，也不默认等于月分销天数；不能将分销日排除规则直接套用于销售日历。月总天数在逐日记录中重复，不能按日累加。

### 月销售天序号 `BusinessCalendarDay_monthly_sales_day_number`

- 类型：integer
- 字段：`v_trd_time_prg_df.sales_day_rn`
- 口径：该日期在所属销售财务月中的销售天序号，是销售调整预算目标在相应截止日折算的日历依据。它不是自然日号，不能用预算目标行在加工时点提供的销售天序号替代任意查询截止日的本值，也不能按日期求和。

### 月销售时间进度 `BusinessCalendarDay_monthly_sales_time_progress`

- 类型：decimal
- 字段：`v_trd_time_prg_df.sales_time_prg`
- 口径：该日期所属销售财务月的销售时间进度，表示销售日历的时间进展，不是销售考核金额除以销售目标金额。采用日历提供值，不直接用分销时间进度替代，也不按日累加。

### 年销售天数 `BusinessCalendarDay_annual_sales_days`

- 类型：integer
- 字段：`v_trd_time_prg_df.year_sales_day_cnt`
- 口径：日历为该日期记录的年度销售天数，单位为天。它是年度天数口径，不是当日新增天数，不能将多日记录的本值相加；所属销售年度及起止边界尚需确认。

### 年销售天序号 `BusinessCalendarDay_annual_sales_day_number`

- 类型：integer
- 字段：`v_trd_time_prg_df.year_sales_day_rn`
- 口径：该日期对应的年度销售天序号，表示其在来源采用的销售年度中的销售日位置。与同一日期行的年销售天数和年销售时间进度配套使用，不按日期求和，不用自然年已过日数或月销售天序号替代；年度边界尚需确认。

### 年销售时间进度 `BusinessCalendarDay_annual_sales_time_progress`

- 类型：decimal
- 字段：`v_trd_time_prg_df.year_sales_time_prg`
- 口径：该日期对应的年度销售时间进度，不是实际年度销售金额除以年度销售目标的完成率。采用日历提供值，不与月销售进度相加，也不按日累加；年度边界、计算公式和存储尺度尚需确认。

### 年分销天数 `BusinessCalendarDay_annual_distribution_days`

- 类型：integer
- 字段：`v_trd_time_prg_df.year_dist_day_cnt`
- 口径：日历为该日期记录的年度分销天数，单位为天。它是年度天数口径，不是当日新增天数，不能将多日记录的本值相加；所属分销年度及起止边界尚需确认。

### 年分销天序号 `BusinessCalendarDay_annual_distribution_day_number`

- 类型：integer
- 字段：`v_trd_time_prg_df.year_dist_day_rn`
- 口径：该日期对应的年度分销天序号，表示其在来源采用的分销年度中的分销日位置。与同一日期行的年分销天数和年分销时间进度配套使用，不按日期求和，不用自然年已过日数或月分销天序号替代；年度边界尚需确认。

### 年分销时间进度 `BusinessCalendarDay_annual_distribution_time_progress`

- 类型：decimal
- 字段：`v_trd_time_prg_df.year_dist_time_prg`
- 口径：该日期对应的年度分销时间进度，不是实际年度分销金额除以年度分销目标的完成率，也不自动等于金额加权的年累目标折算比例。采用日历提供值，不与月分销进度相加，也不按日累加；年度边界、计算公式和存储尺度尚需确认。
