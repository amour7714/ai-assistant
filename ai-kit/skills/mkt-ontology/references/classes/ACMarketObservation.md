# AC月度市场指标 `ACMarketObservation`

- 分组：稽查
- 父类：无

## 说明

外部尼尔森调研提供的月度市占率和铺货率事实，按数据提供月、组织清单、外部渠道和品类SKU统计项目对应。distnm表示大区；org_codes表示该条指标适用的组织清单，不将一条比率展开为各组织可相加的数值。外部铺货率不同于公司稽查铺货率，不能从低层级比率累加推得高层级比率；未指定渠道时知识口径为全渠道。

## 指出的关系

- 适用组织 → 公司组织 `ACMarketObservation_applicable_organization`
  org_codes、org_names清单记录本条外部统计适用的组织，可覆盖大区或办事处；清单展开只用于范围识别，不能重复累计比率。
- 统计大区 → 大区 `ACMarketObservation_district`
  distnm直接记录本条AC指标的大区，采用用户确认含义，不再按省份指标替代大区。

## 指入的关系

无

## 属性

### 数据提供月 `ACMarketObservation_month`

- 类型：string
- 字段：`v_chl_ac_nf_sku_mi.grcamm`
- 口径：外部调研数据的供数月份，由grcamm记录。同一来源行的当月、上月和同期指标均以本供数月保持对应，不能将上月和同期值解释为当月值。

### 外部统计渠道 `ACMarketObservation_channel`

- 类型：string
- 字段：`v_chl_ac_nf_sku_mi.channm`
- 口径：本条指标由channm记录的外部调研渠道口径，包含全渠道等统计范围，不自动等同公司终端客户渠道层级。未指定渠道时按知识口径选取全渠道记录，不是将空渠道填为全渠道，也不是将各渠道比率相加。

### 外部产品统计项目 `ACMarketObservation_product_scope`

- 类型：string
- 字段：`v_chl_ac_nf_sku_mi.sku`
- 口径：本条指标由sku记录的外部品类或SKU统计项目名称，不自动视为公司sku_code识别的SKU。未指定统计项目时，按知识口径分别列示各项目，不将不同项目的比率合计。

### 统计大区名称 `ACMarketObservation_district_name`

- 类型：string
- 字段：`v_chl_ac_nf_sku_mi.distnm`
- 口径：本条AC指标直接记录的公司大区名称。按用户于2026-11-06确认的含义解释distnm，不将其视为省份或城市，也不采用以省份指标替代大区指标的原文规则。

### 适用组织编码清单 `ACMarketObservation_organization_code_list`

- 类型：string
- 字段：`v_chl_ac_nf_sku_mi.org_codes`
- 口径：本条外部指标适用组织的编码清单原值，与数据提供月、外部渠道和产品统计项目共同限定本条事实。适用组织可覆盖大区或办事处；清单展开只用于范围识别，不能把同一比率复制为各组织可相加的数值。

### 适用组织名称清单 `ACMarketObservation_organization_name_list`

- 类型：string
- 字段：`v_chl_ac_nf_sku_mi.org_names`
- 口径：本条外部指标适用组织的名称清单原值，与同一来源行的组织编码清单共同保留其适用范围。整条清单不是一个组织的名称；资料未说明编码与名称成员是否按位置一一对应。

### 外部商品类型 `ACMarketObservation_external_product_type`

- 类型：string
- 字段：`v_chl_ac_nf_sku_mi.cmdt_type`
- 口径：外部供数记录由cmdt_type给出的商品类型分类，用于解释本条产品统计项目。资料未说明它与公司商品主数据的商品类型属于同一分类体系，不直接套用内部成品、终端品或包材的编码含义。

### 当月市占率 `ACMarketObservation_market_share`

- 类型：decimal
- 字段：`v_chl_ac_nf_sku_mi.szl`
- 口径：尼尔森调研为本供数月、组织清单、外部渠道和产品统计项目提供的市占率。当月指本行grcamm对应月份，不是当前系统月份。保留供数尺度；比率不能跨月份、组织、渠道或项目累加，也不能由低层比率累加取得高层比率。

### 当月外部铺货率 `ACMarketObservation_distribution_rate`

- 类型：decimal
- 字段：`v_chl_ac_nf_sku_mi.phl`
- 口径：尼尔森调研为本供数月、组织清单、外部渠道和产品统计项目提供的铺货率。它不同于公司根据门店稽查结果计算的铺货率，不能用稽查家数公式替代。保留供数尺度，不跨统计范围累加。

### 上月市占率 `ACMarketObservation_previous_month_market_share`

- 类型：decimal
- 字段：`v_chl_ac_nf_sku_mi.szl_lm`
- 口径：外部供数记录随当月指标提供的上月市占率，以本行数据提供月为比较基准，并与本行组织清单、外部渠道和产品统计项目配套。它是上月比较值，不与当月市占率相加。

### 上月外部铺货率 `ACMarketObservation_previous_month_distribution_rate`

- 类型：decimal
- 字段：`v_chl_ac_nf_sku_mi.phl_lm`
- 口径：外部供数记录随当月指标提供的上月铺货率，以本行数据提供月为比较基准，并与本行组织清单、外部渠道和产品统计项目配套。它属于尼尔森外部铺货口径，不是上月公司稽查铺货率。

### 同期市占率 `ACMarketObservation_comparison_market_share`

- 类型：decimal
- 字段：`v_chl_ac_nf_sku_mi.szl_lym`
- 口径：外部供数记录随当月指标提供的同期市占率，与本行数据提供月、组织清单、外部渠道和产品统计项目保持对应。直接采用来源已提供的同期比较值，不将其解释为当月值；具体比较期间的对齐方式尚未说明。

### 同期外部铺货率 `ACMarketObservation_comparison_distribution_rate`

- 类型：decimal
- 字段：`v_chl_ac_nf_sku_mi.phl_lym`
- 口径：外部供数记录随当月指标提供的同期铺货率，与本行数据提供月、组织清单、外部渠道和产品统计项目保持对应。它属于尼尔森外部铺货口径；具体比较期间的对齐方式尚未说明，不与当月或上月值相加。

### 供数市占率最大值 `ACMarketObservation_supplied_max_market_share`

- 类型：decimal
- 字段：`v_chl_ac_nf_sku_mi.max_szl`
- 口径：外部供数记录直接给出的市占率最大值。资料未说明求最大值的比较期间和统计范围，因此仅保留来源含义，不将其认定为所有月份、大区、渠道或产品项目中的最高市占率。

### 供数铺货率最大值 `ACMarketObservation_supplied_max_distribution_rate`

- 类型：decimal
- 字段：`v_chl_ac_nf_sku_mi.max_phl`
- 口径：外部供数记录直接给出的铺货率最大值，属于尼尔森外部铺货口径。资料未说明求最大值的比较期间和统计范围，不将其认定为所有月份、大区、渠道或产品项目中的最高铺货率。

### 供数粒度标记 `ACMarketObservation_data_grain_flag`

- 类型：string
- 字段：`v_chl_ac_nf_sku_mi.date_flag`
- 口径：本条外部供数记录的数据粒度标记，字段注释为“数据粒度农夫sku”。保留来源标记值，但资料未说明各取值含义，不能据此自行推定时间频率、产品层级或指标有效状态。
