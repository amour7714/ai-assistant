# 经销商销售目标 `DealerSalesTarget`

- 分组：目标
- 父类：SalesTarget

## 说明

为经销商某月某目标类型、目标项目制定的销售目标，来源于经销商月度销售目标。经销商总销售目标取target_type为全品类的记录，不把全品类目标与各分项目标重复相加。

## 指出的关系

- 目标经销商 → 经销商 `DealerSalesTarget_dealer`
  dealer_range_code记录承担本月、本目标类型及项目销售目标的经销商。
- 目标归属办事处 → 办事处 `DealerSalesTarget_office`
  目标行off_code、off_name记录目标当期办事处归属，不按当前客户主数据重写。
- 目标归属大区 → 大区 `DealerSalesTarget_district`
  目标行dis_code、dis_name直接记录经销商目标的大区归属。
- 目标归属区域 → 公司组织 `DealerSalesTarget_region`
  经销商月度销售目标在目标期间归属的公司销售管理区域，由v_trd_sales_target_dealer_mi同一目标行的reg_code、reg_name直接记录，复用DealerSalesTarget_region_code和DealerSalesTarget_region_name。区域与该行month_id、fin_year、dealer_range_code、target_type及target_item保持对应，不以经销商或大区当前组织归属重写目标期间区域，也不因多来源编码或名称相同认定实例已匹配。

## 指入的关系

无

## 属性

### 目标类型 `DealerSalesTarget_target_type`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.target_type`
- 口径：本经销商、本月份销售目标的分类，与目标项目共同限定目标范围。目标类型区分各类目标和全品类目标；查询经销商销售目标金额或总销售目标时取“全品类”，不将全品类目标与分项目标重复相加。

### 目标项目 `DealerSalesTarget_target_item`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.target_item`
- 口径：与目标类型、经销商和月份配套的target_item，不是可脱离本目标记录使用的项目列表。

### 目标经销商编码 `DealerSalesTarget_dealer_range_code`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.dealer_range_code`
- 口径：本销售目标记录指定的目标经销商销售范围编码，与目标月份、类型及项目共同识别目标。它不是办事处编码，也不与经销商SAP编码或客户C编码混用。

### 目标经销商名称 `DealerSalesTarget_dealer_range_name`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.dealer_range_name`
- 口径：销售目标记录中与目标经销商编码配套的名称，保留该目标期间记录的名称，不用当前客户名称覆盖。

### 目标归属区域编码 `DealerSalesTarget_region_code`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.reg_code`
- 口径：本经销商销售目标记录直接记载的公司管理区域编码，与同一行目标月份、大区及办事处归属配套。这里的区域是公司组织范围，不是省、市行政区划。

### 目标归属区域名称 `DealerSalesTarget_region_name`

- 类型：string
- 字段：`v_trd_sales_target_dealer_mi.reg_name`
- 口径：本经销商销售目标记录中与区域引用编码配套的公司管理区域名称，按目标期间归属解释。

### 计划月数 `DealerSalesTarget_planned_month_count`

- 类型：integer
- 字段：`v_trd_sales_target_dealer_mi.target_months`
- 口径：本经销商销售目标记录记载的计划月数，与同一行目标及合计销售目标金额配套保存。资料未提供计划起止月份，不能仅凭该数值生成计划月份或认定计划覆盖完整财年。

### 合计销售目标金额 `DealerSalesTarget_total_target_amount`

- 类型：decimal
- 字段：`v_trd_sales_target_dealer_mi.target_total`
- 口径：本目标记录直接记载的合计销售目标金额，单位元，与同一行经销商、计划月数及目标分类配套。合计覆盖的具体期间和项目范围未说明，不等同本月销售目标金额，也不能按月度目标行直接累加。

### 约定周转金金额 `DealerSalesTarget_agreed_turnover_amount`

- 类型：decimal
- 字段：`v_trd_sales_target_dealer_mi.turnover_amt`
- 口径：本销售目标记录中记载的经销商约定周转金金额，单位元。它表示业务约定的资金规模，不是实际资金余额、库存金额或库存周转天数；跨月份或分项目汇总前须明确是否重复记载同一项约定。

### 折算年度销售目标金额 `DealerSalesTarget_annualized_target_amount`

- 类型：decimal
- 字段：`v_trd_sales_target_dealer_mi.cvt_target_cy`
- 口径：本目标记录已折算到年度的销售目标金额，单位元，并保留来源行的经销商、财年、月份、目标类型及项目范围。它不是本月目标或截止日折算目标；年度折算规则未提供，直接取已有结果，不自行用月目标乘十二或以合计目标反推。

### 截止日折算月目标金额 `DealerSalesTarget_cutoff_target_amount`

- 类型：decimal
- 字段：`v_trd_sales_target_dealer_mi.target_amt`、`v_trd_sales_target_dealer_mi.month_id`、`v_trd_time_prg_df.month_id`、`v_trd_time_prg_df.dist_day_rn`、`v_trd_time_prg_df.dist_day_cnt`
- 口径：本月目标在查询指定截止日期下计入累计销售目标的金额，采用指标清单规定的自然月、分销天数折算口径。目标月早于截止自然月时取整月目标；等于截止月时为月目标乘截止日分销天序再除以该月分销天数；晚于截止月时为零。月累仅取截止月，年累在所选财年和累计月份范围内汇总各月贡献；经销商总目标仍仅取全品类记录。金额单位沿用月目标金额。截止日日历无法唯一定位、目标金额或判定月份缺失，以及当月折算所需天数缺失或分母非正时，结果未定义。此属性不是记录加工时点的固定金额，也不采用销售调整预算行的销售日历折算规则。

### 目标月份 `SalesTarget_target_month`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_dealer_mi.month_id`
- 口径：销售目标所属的月份，与同一目标记录的主体及商品或目标项目范围配套。经销商和组织目标月表取各自的month_id，销售调整预算行取ass_fin_month_id，后者按yyyyMM格式的销售考核财务月解释。不同来源的年月不自动认定为相同期间；销售调整预算行的考核日期为空，不能按实际销售的考核日期条件筛选目标。

### 目标财年 `SalesTarget_financial_year`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_dealer_mi.fin_year`
- 口径：销售目标归属的财年，与目标月份配套使用。业务通用财年为上年12月至本年11月；销售调整预算行按提供的考核财年和考核财务月解释，不由自然年或考核日期反推。

### 整期销售目标金额 `SalesTarget_target_amount`

- 类型：decimal，继承自 SalesTarget
- 字段：`v_trd_sales_target_dealer_mi.target_amt`
- 口径：为本目标月份、目标主体及商品或目标项目范围制定的整期销售金额，不是实际销售金额、分销目标或营销费用预算。经销商全品类总目标与分项目标不能重复相加；组织目标按相应商品和办事处范围汇总。不同来源的金额不因属性统一而成为可互换或可叠加的目标。销售进度使用整期目标，销售达成使用相应截止日折算目标；与实际销售比较时先分别汇总到共同期间和业务维度，不能将目标展开到逐笔实际销售行。

### 办事处引用编码 `SalesTarget_office_code`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_dealer_mi.off_code`
- 口径：销售目标记录直接指定的办事处编码。组织销售目标中表示承担目标的办事处，经销商销售目标中表示目标当月归属办事处；后者不能代替目标经销商身份。编码与同一行的目标月份、办事处名称和目标范围配套，不用当前客户归属覆盖目标期间记录。

### 办事处引用名称 `SalesTarget_office_name`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_dealer_mi.off_name`
- 口径：销售目标记录中与办事处引用编码配套的名称。组织目标中是目标办事处名称，经销商目标中是当月归属办事处名称；保留来源记录的期间口径，名称相同不证明跨来源目标相同。

### 大区引用编码 `SalesTarget_district_code`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_dealer_mi.dis_code`
- 口径：销售目标记录直接记载的目标大区归属编码，与同一行目标月份及办事处范围配套。经销商目标和组织目标按各自来源的目标期间归属解释，不由当前组织架构重新推定。

### 大区引用名称 `SalesTarget_district_name`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_dealer_mi.dis_name`
- 口径：销售目标记录中与大区引用编码配套的名称，表示该目标期间的大区归属。销售调整预算使用考核大区名称，不与考核销售大区、售达方或送达方大区混用。
