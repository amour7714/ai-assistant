# 销售预算目标 `SalesTarget`

- 分组：目标
- 父类：无

## 说明

为公司向经销商销售制定的期间目标，与经销商向门店分销的目标分开。目标需保留月份、目标主体及商品或目标项目范围；销售实际和目标分别汇总到共同维度后比较，不能把目标逐笔展开到实际销售行。不同来源的目标不因名称相同而叠加。销售进度使用整期目标，销售达成使用相应截止日折算目标，分母为零或缺失时结果未定义。

## 指出的关系

无

## 指入的关系

无

## 属性

### 目标月份 `SalesTarget_target_month`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.month_id`、`v_trd_sales_target_org_mi.month_id`、`v_trd_sales_adjust_df.ass_fin_month_id`
- 口径：销售目标所属的月份，与同一目标记录的主体及商品或目标项目范围配套。经销商和组织目标月表取各自的month_id，销售调整预算行取ass_fin_month_id，后者按yyyyMM格式的销售考核财务月解释。不同来源的年月不自动认定为相同期间；销售调整预算行的考核日期为空，不能按实际销售的考核日期条件筛选目标。

### 目标财年 `SalesTarget_financial_year`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.fin_year`、`v_trd_sales_target_org_mi.fin_year`、`v_trd_sales_adjust_df.ass_fin_year`
- 口径：销售目标归属的财年，与目标月份配套使用。业务通用财年为上年12月至本年11月；销售调整预算行按提供的考核财年和考核财务月解释，不由自然年或考核日期反推。

### 整期销售目标金额 `SalesTarget_target_amount`

- 类型：decimal
- 字段：`v_trd_sales_target_dealer_mi.target_amt`、`v_trd_sales_target_org_mi.target_amt`、`v_trd_sales_adjust_df.target_amt`
- 口径：为本目标月份、目标主体及商品或目标项目范围制定的整期销售金额，不是实际销售金额、分销目标或营销费用预算。经销商全品类总目标与分项目标不能重复相加；组织目标按相应商品和办事处范围汇总。不同来源的金额不因属性统一而成为可互换或可叠加的目标。销售进度使用整期目标，销售达成使用相应截止日折算目标；与实际销售比较时先分别汇总到共同期间和业务维度，不能将目标展开到逐笔实际销售行。

### 办事处引用编码 `SalesTarget_office_code`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.off_code`、`v_trd_sales_target_org_mi.off_code`、`v_trd_sales_adjust_df.ass_org_code`
- 口径：销售目标记录直接指定的办事处编码。组织销售目标中表示承担目标的办事处，经销商销售目标中表示目标当月归属办事处；后者不能代替目标经销商身份。编码与同一行的目标月份、办事处名称和目标范围配套，不用当前客户归属覆盖目标期间记录。

### 办事处引用名称 `SalesTarget_office_name`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.off_name`、`v_trd_sales_target_org_mi.off_name`、`v_trd_sales_adjust_df.ass_org_name`
- 口径：销售目标记录中与办事处引用编码配套的名称。组织目标中是目标办事处名称，经销商目标中是当月归属办事处名称；保留来源记录的期间口径，名称相同不证明跨来源目标相同。

### 大区引用编码 `SalesTarget_district_code`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.dis_code`、`v_trd_sales_target_org_mi.dis_code`、`v_trd_sales_adjust_df.ass_dis_code`
- 口径：销售目标记录直接记载的目标大区归属编码，与同一行目标月份及办事处范围配套。经销商目标和组织目标按各自来源的目标期间归属解释，不由当前组织架构重新推定。

### 大区引用名称 `SalesTarget_district_name`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.dis_name`、`v_trd_sales_target_org_mi.dis_name`、`v_trd_sales_adjust_df.ass_dis_name`
- 口径：销售目标记录中与大区引用编码配套的名称，表示该目标期间的大区归属。销售调整预算使用考核大区名称，不与考核销售大区、售达方或送达方大区混用。
