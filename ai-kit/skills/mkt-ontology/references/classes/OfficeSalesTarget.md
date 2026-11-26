# 组织销售目标 `OfficeSalesTarget`

- 分组：目标
- 父类：SalesTarget

## 说明

按办事处、商品和月份等可用业务维度制定的公司销售目标。组织目标月表按月、办事处、商品记录；销售调整表的target_flag为Yes行按其考核财务月、考核组织和实际提供的目标维度解释。办事处总目标汇总商品，大区总目标汇总所属办事处。销售调整预算行按截止日业务日历取得销售财务月与销售天序后逐目标行折算，不能把本行加工时点的销售天序当任意截止日天序。

## 指出的关系

- 目标办事处 → 办事处 `OfficeSalesTarget_office`
  组织目标采用off_code，销售调整预算行采用ass_org_code；两者均表示对应来源的目标办事处，不据此认定跨来源目标相同。
- 目标大区 → 大区 `OfficeSalesTarget_district`
  目标来源直接记录的dis或ass_dis字段表示相应目标的大区归属。
- 目标商品 → 商品 `OfficeSalesTarget_product`
  cmdt_code记录组织销售目标的商品范围；跨商品汇总先保持同月同组织目标覆盖一致。
- 目标SKU → SKU `OfficeSalesTarget_sku`
  组织销售目标来源直接记录sku_code、sku_name，不能把目标重复展开到各商品后再次累计。
- 目标品类 → 品类 `OfficeSalesTarget_category`
  目标行直接记录的ctg字段限定其产品品类统计口径。
- 截止日折算依据 → 业务日历日 `OfficeSalesTarget_cutoff_calendar`
  销售调整预算行使用所选截止日期对应的唯一业务日历日取得销售财务月及销售天序，再按目标月与截止月关系折算；不是将目标金额展开到所有日历行。
- 目标考核区域 → 公司组织 `OfficeSalesTarget_region`
  销售调整预算目标在其考核期间直接记录的公司销售管理区域，由v_trd_sales_adjust_df中target_flag为Yes的同一行ass_reg_name引用，复用OfficeSalesTarget_region_name。联系限定在该预算目标行的ass_fin_year、ass_fin_month_id、考核组织及实际提供的商品范围内。v_trd_sales_target_org_mi没有区域字段，本关系不据大区当前层级或其他来源为其目标补区域，也不将实际销售行的区域作为目标引用值。

## 指入的关系

无

## 属性

### 目标商品编码 `OfficeSalesTarget_product_code`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.cmdt_code`、`v_trd_sales_adjust_df.cmdt_code`
- 口径：本目标记录直接指定的商品编码，与目标月份、目标办事处及目标金额配套。商品编码与SKU编码不是同一粒度，不能互相替代。

### 目标商品名称 `OfficeSalesTarget_product_name`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.cmdt_name`、`v_trd_sales_adjust_df.cmdt_name`
- 口径：目标记录中与商品编码配套保存的商品名称，用于解释本目标的商品范围；名称相同不证明跨来源目标相同。

### 目标SKU编码 `OfficeSalesTarget_sku_code`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.sku_code`、`v_trd_sales_adjust_df.sku_code`
- 口径：目标记录直接引用的SKU编码，与同一目标行的商品及月份对应。按SKU分析时汇总其覆盖的商品目标，不能先将目标重复展开到商品后再次累计。

### 目标SKU名称 `OfficeSalesTarget_sku_name`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.sku_name`、`v_trd_sales_adjust_df.sku_name`
- 口径：目标记录中与SKU编码配套的统计规格名称，不是商品名称或可脱离目标记录使用的规格列表。

### 目标品类编码 `OfficeSalesTarget_category_code`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.ctg_code`
- 口径：目标记录直接引用的产品品类编码，与同一目标行的品类名称及商品范围配套；不同于合同品类编码。

### 目标品类名称 `OfficeSalesTarget_category_name`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.ctg_name`、`v_trd_sales_adjust_df.ctg_name`
- 口径：目标记录直接保存的产品品类名称，用于识别本目标的品类范围。天然水也称红瓶水或红水，东方树叶也简称树叶；产品品类不同于行销类目、三级类目和合同品类。

### 目标商品类型 `OfficeSalesTarget_product_type`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.cmdt_type_name`、`v_trd_sales_adjust_df.cmdty_type_name`
- 口径：目标记录所指定商品的类型，例如成品、终端品或包材。商品类型用于限定目标产品范围，与实际销售比较时须保持相应范围一致，不默认所有销售目标都只包含成品。

### 目标行销类目 `OfficeSalesTarget_sales_classification`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.sales_clfc_type_name`、`v_trd_sales_adjust_df.sales_clfc_type_name`
- 口径：目标商品所属的行销类目，水、饮料按本字段识别。它用于限定销售目标的产品统计范围，不与产品品类或一至三级类目混用。

### 目标品牌 `OfficeSalesTarget_brand_name`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.brand_name`、`v_trd_sales_adjust_df.brand_name`
- 口径：随目标商品记录保存的品牌名称，用于解释和筛选本目标的品牌范围，不表示目标承担组织的名称。

### 目标包装规格 `OfficeSalesTarget_packaging_specification`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.spec_desc`、`v_trd_sales_adjust_df.spec_desc`
- 口径：目标商品在该目标记录中的包装规格描述。业务中的“规格”按包装规格理解，但包装规格文字不等同SKU编码，也不自动提供数量换算系数。

### 目标箱规 `OfficeSalesTarget_box_specification`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.package_spec`、`v_trd_sales_adjust_df.package_spec`
- 口径：目标记录附带的商品箱规描述，与同一行商品及包装规格对应；按原始描述保存，不把箱规文字直接当成箱数或入数。

### 目标月销售天数 `OfficeSalesTarget_sales_day_count`

- 类型：integer
- 字段：`v_trd_sales_target_org_mi.sales_day_cnt`、`v_trd_sales_adjust_df.sales_day_cnt`
- 口径：目标记录所附财务月的销售天数，单位为天。销售调整预算行以它作为截止日折算分母，只有大于0时才能计算。天数属于相应目标月，不能随商品或办事处目标行数累加；组织月表提供本字段不代表其截止日折算日历已确认。

### 记录销售天序 `OfficeSalesTarget_recorded_sales_day_number`

- 类型：integer
- 字段：`v_trd_sales_target_org_mi.sales_day_rn`、`v_trd_sales_adjust_df.sales_day_rn`
- 口径：目标记录附带的销售天序号，与本行目标月份及目标范围配套。销售调整预算行的值来自加工时点，不是任意查询截止日的销售天序；其目标月早于截止财务月时，当前报表折算规则使用本行记录值。组织月表的对应时点尚未明确。

### 截止日折算目标金额 `OfficeSalesTarget_cutoff_target_amount`

- 类型：decimal
- 字段：`v_trd_sales_adjust_df.target_amt`、`v_trd_sales_adjust_df.sales_day_cnt`、`v_trd_sales_adjust_df.ass_fin_month_id`、`v_trd_sales_adjust_df.sales_day_rn`、`v_trd_time_prg_df.sales_fin_month_id`、`v_trd_time_prg_df.sales_day_rn`
- 口径：一条销售调整预算目标在指定截止日期下的折算销售目标金额，仅适用于target_flag为Yes的销售调整预算行。截止日期是查询参数，按yyyyMMdd匹配业务日历date_id并取得唯一一行的销售财务月及销售天序。折算系数为：目标考核财务月等于截止财务月时取截止日销售天序，早于时取目标行记录的销售天序，晚于时取0；金额等于target_amt乘该系数再除以目标行sales_day_cnt。销售天数须大于0，日历无行或多行、目标金额或所需计算输入缺失时结果未定义，不任取日历行或将缺失补0。按所选财年和累计目标期间逐行计算后汇总，不能先汇总金额再统一乘进度，也不把历史月系数擅自改为整月天数。组织目标月表的折算日历尚有冲突，本属性不对该来源套用此公式；金额单位和税口径沿用目标金额。

### 目标考核区域名称 `OfficeSalesTarget_region_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_reg_name`
- 口径：销售调整预算目标记录直接提供的考核区域名称，表示公司销售管理区域，不是省市行政区划。仅适用于销售调整表的预算目标行，与同一行目标考核财年、财务月、考核组织及实际提供的商品范围配套。组织销售目标月表没有区域字段，不从大区当前归属、实际销售行或其他目标来源补值；名称引用不表示已经取得区域组织编码。

### 目标月份 `SalesTarget_target_month`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_org_mi.month_id`、`v_trd_sales_adjust_df.ass_fin_month_id`
- 口径：销售目标所属的月份，与同一目标记录的主体及商品或目标项目范围配套。经销商和组织目标月表取各自的month_id，销售调整预算行取ass_fin_month_id，后者按yyyyMM格式的销售考核财务月解释。不同来源的年月不自动认定为相同期间；销售调整预算行的考核日期为空，不能按实际销售的考核日期条件筛选目标。

### 目标财年 `SalesTarget_financial_year`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_org_mi.fin_year`、`v_trd_sales_adjust_df.ass_fin_year`
- 口径：销售目标归属的财年，与目标月份配套使用。业务通用财年为上年12月至本年11月；销售调整预算行按提供的考核财年和考核财务月解释，不由自然年或考核日期反推。

### 整期销售目标金额 `SalesTarget_target_amount`

- 类型：decimal，继承自 SalesTarget
- 字段：`v_trd_sales_target_org_mi.target_amt`、`v_trd_sales_adjust_df.target_amt`
- 口径：为本目标月份、目标主体及商品或目标项目范围制定的整期销售金额，不是实际销售金额、分销目标或营销费用预算。经销商全品类总目标与分项目标不能重复相加；组织目标按相应商品和办事处范围汇总。不同来源的金额不因属性统一而成为可互换或可叠加的目标。销售进度使用整期目标，销售达成使用相应截止日折算目标；与实际销售比较时先分别汇总到共同期间和业务维度，不能将目标展开到逐笔实际销售行。

### 办事处引用编码 `SalesTarget_office_code`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_org_mi.off_code`、`v_trd_sales_adjust_df.ass_org_code`
- 口径：销售目标记录直接指定的办事处编码。组织销售目标中表示承担目标的办事处，经销商销售目标中表示目标当月归属办事处；后者不能代替目标经销商身份。编码与同一行的目标月份、办事处名称和目标范围配套，不用当前客户归属覆盖目标期间记录。

### 办事处引用名称 `SalesTarget_office_name`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_org_mi.off_name`、`v_trd_sales_adjust_df.ass_org_name`
- 口径：销售目标记录中与办事处引用编码配套的名称。组织目标中是目标办事处名称，经销商目标中是当月归属办事处名称；保留来源记录的期间口径，名称相同不证明跨来源目标相同。

### 大区引用编码 `SalesTarget_district_code`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_org_mi.dis_code`、`v_trd_sales_adjust_df.ass_dis_code`
- 口径：销售目标记录直接记载的目标大区归属编码，与同一行目标月份及办事处范围配套。经销商目标和组织目标按各自来源的目标期间归属解释，不由当前组织架构重新推定。

### 大区引用名称 `SalesTarget_district_name`

- 类型：string，继承自 SalesTarget
- 字段：`v_trd_sales_target_org_mi.dis_name`、`v_trd_sales_adjust_df.ass_dis_name`
- 口径：销售目标记录中与大区引用编码配套的名称，表示该目标期间的大区归属。销售调整预算使用考核大区名称，不与考核销售大区、售达方或送达方大区混用。
