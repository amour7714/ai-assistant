# 月度陈列项检查结果 `DisplayItemInspection`

- 分组：活动
- 父类：无

## 说明

对某执行月、子门店和陈列项汇总的合格及不合格检查次数，按execute_ym、cust_range_code、dsp_code解释。陈列项检查数为合格数加不合格数，不是签约数量或门店数量；合格率先汇总相应次数再计算。资料描述包含活动，但可见字段没有活动标识，不能唯一定位到某个活动或签约。

## 指出的关系

- 检查陈列项 → 陈列项 `DisplayItemInspection_item`
  dsp_code记录本月检查次数对应的陈列项目，不表示唯一签约。
- 检查子门店 → 子门店 `DisplayItemInspection_store_scope`
  cust_range_code记录本月陈列项检查的经营范围，是声明粒度的一部分。
- 检查门店 → 门店 `DisplayItemInspection_store`
  cust_code直接记录该陈列项检查涉及的实际门店。
- 记录销售客户 → 经销商 `DisplayItemInspection_dealer`
  dealer_range_code直接记录该检查结果所附销售客户。
- 记录办事处 → 办事处 `DisplayItemInspection_office`
  off_code、off_name记录月度检查结果所属办事处。
- 记录大区 → 大区 `DisplayItemInspection_district`
  dis_code、dis_name直接记录月度检查结果所属大区。
- 检查记录区域 → 公司组织 `DisplayItemInspection_region`
  月度陈列项检查结果直接记录的公司销售管理区域，由v_mkt_actv_inspect_result同一行reg_code、reg_name引用，复用DisplayItemInspection_region_code和DisplayItemInspection_region_name。区域与该行execute_ym、cust_range_code、dsp_code及检查次数保持对应，不自动指定某个活动或具体陈列签约，也不复制为门店各服务范围的独立归属。不沿大区当前所属区域替换这一检查结果的直接引用，不认定跨来源组织编码已经等价或实例已经匹配。

## 指入的关系

无

## 属性

### 执行年月 `DisplayItemInspection_execution_month`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.execute_ym`
- 口径：本条陈列项检查结果所属的执行年月，与同一记录的子门店、陈列项及合格、不合格次数配套使用，不用签约日期或费用核销日期所在月替代。

### 所属财年 `DisplayItemInspection_financial_year`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.fin_year`
- 口径：本条检查结果记录的财年。业务财年为上年12月至本年11月，统计时采用来源财年值，不以执行年月的自然年替代。

### 检查子门店编码 `DisplayItemInspection_store_scope_code`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.cust_range_code`
- 口径：本结果引用的子门店编码，表示被检查门店的销售服务经营范围。与执行年月和陈列项编码共同限定本结果范围，不等同实际门店编码。

### 检查门店编码 `DisplayItemInspection_store_code`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.cust_code`
- 口径：本条检查结果涉及的实际门店编码。统计涉及门店数时按该编码去重，不能按子门店数、陈列项数或结果行数代替门店数。

### 检查门店名称 `DisplayItemInspection_store_name`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.cust_name`
- 口径：本条检查结果所附的门店名称，与同一记录的门店编码配套，不凭名称相同认定不同门店编码属于同一门店。

### 检查陈列项编码 `DisplayItemInspection_display_item_code`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.dsp_code`
- 口径：本条检查次数所对应的陈列项目种类编码。它是结果声明粒度的一部分，不是具体陈列签约标识，也不能据此唯一指定活动。

### 检查陈列项名称 `DisplayItemInspection_display_item_name`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.dsp_name`
- 口径：本条检查结果所附的陈列项名称，与同一记录的陈列项编码和分类配套。名称本身不证明包含可独立识别的商品、SKU或品类范围。

### 陈列项分类 `DisplayItemInspection_display_item_group`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.stat_main_group`
- 口径：本条检查结果采用的陈列项分类，资料列有冰柜、水堆、货架。分类与具体陈列项编码、名称配套，用于区分检查项目范围，不表示具体设备实例。

### 合约店标记 `DisplayItemInspection_contract_store_flag`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.is_conshop`
- 口径：本执行月检查结果所附门店是否为合约店的标记。不表示门店协议已经确认通过，也不能替代常规付费身份或全部陈列付费门店分类。

### 记录销售客户编码 `DisplayItemInspection_dealer_range_code`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.dealer_range_code`
- 口径：本条月度检查结果直接引用的销售客户销售范围编码，不等同SAP客户编码，也不自行解释为服务或配送客户身份。

### 记录销售客户名称 `DisplayItemInspection_dealer_name`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.dealer_name`
- 口径：本条检查结果所附的销售客户名称，与同一记录的销售客户范围编码配套，不由当前客户主数据名称覆盖。

### 记录办事处编码 `DisplayItemInspection_office_code`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.off_code`
- 口径：本条月度检查结果记录的所属办事处编码，表示该结果的组织归属，不以门店当前办事处替代。

### 记录办事处名称 `DisplayItemInspection_office_name`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.off_name`
- 口径：本条月度检查结果所附的办事处名称，与同一记录的办事处编码对应。

### 记录大区编码 `DisplayItemInspection_district_code`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.dis_code`
- 口径：本条月度检查结果直接记录的所属大区编码，不仅依赖办事处当前组织层级反推。

### 记录大区名称 `DisplayItemInspection_district_name`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.dis_name`
- 口径：本条月度检查结果所附的大区名称，与同一记录的大区编码对应，不表示省份或城市。

### 记录区域编码 `DisplayItemInspection_region_code`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.reg_code`
- 口径：本条月度检查结果所附的区域组织编码，表示结果记录中的区域归属，不作为省市行政区划编码使用。

### 记录区域名称 `DisplayItemInspection_region_name`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.reg_name`
- 口径：本条月度检查结果所附的区域组织名称，与同一记录的区域编码对应，不由当前大区所属区域覆盖。

### 记录渠道编码 `DisplayItemInspection_channel_code`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.chl_code`
- 口径：本条检查结果所附的渠道编码，与同一记录的渠道名称配套。本表仅标注为渠道，不能直接认定为其他来源中的子渠道、生动化渠道或渠道群编码。

### 记录渠道名称 `DisplayItemInspection_channel_name`

- 类型：string
- 字段：`v_mkt_actv_inspect_result.chl_name`
- 口径：本条月度检查结果所附的渠道名称，与同一记录的渠道编码对应，用于解释该结果的渠道范围。

### 合格检查次数 `DisplayItemInspection_pass_count`

- 类型：integer
- 字段：`v_mkt_actv_inspect_result.eglb_cnt`
- 口径：本执行月、子门店和陈列项范围内汇总的合格检查次数，对应指标“陈列项检查合格数”。统计同口径结果时汇总这些次数，不按合格门店数、签约数或陈列项编码去重数替代；原始空值不自动补零。

### 不合格检查次数 `DisplayItemInspection_fail_count`

- 类型：integer
- 字段：`v_mkt_actv_inspect_result.uneglb_cnt`
- 口径：本执行月、子门店和陈列项范围内汇总的不合格检查次数，对应指标“陈列项检查不合格数”。它不是不合格门店数或签约最终状态，须与同一结果记录的合格次数配套解释；原始空值不自动补零。

### 陈列项检查数 `DisplayItemInspection_inspection_count`

- 类型：integer
- 字段：`v_mkt_actv_inspect_result.eglb_cnt`、`v_mkt_actv_inspect_result.uneglb_cnt`
- 口径：本条结果的合格次数加不合格次数，计算为eglb_cnt + uneglb_cnt；跨结果统计时汇总各行合计。指标口径要求同统计周期、同门店、同检查项目、同拜访类型取最后一条，并排除已删除数据，本表汇总是否已落实该选择规则待确认。该值不是原始检查事件条数、签约数量或门店数量，不按签约计费的未检查默认合格规则补数；任一分项为空时本行合计保留为空。

### 陈列项检查合格率 `DisplayItemInspection_pass_rate`

- 类型：decimal
- 字段：`v_mkt_actv_inspect_result.eglb_cnt`、`v_mkt_actv_inspect_result.uneglb_cnt`
- 口径：本条结果合格检查次数占陈列项检查数的比例，计算为eglb_cnt / (eglb_cnt + uneglb_cnt)。跨月份、子门店或陈列项统计时，按同一选定范围计算合格次数之和除以各行检查合计之和，不平均各行合格率。结果为比例小数，展示为百分数时乘100；分母为零或缺失时不计算，不自动填零或100%。沿用检查数的行内空值处理，不据两项次数均为零判定签约处于未检查状态。
