# 门店 `Store`

- 分组：渠道
- 父类：无

## 说明

向消费者经营商品的终端客户，也称网点、售点或终端，以cust_code识别。一个门店可以因传统、冷链等不同服务范围形成多个子门店，门店数量不能按子门店行数计算。虚假客资、虚假分销和虚假陈列是不同事实所涉及的门店范围，不能互相替代；本轮材料中原称疑似异常的记录按用户确认解释为确认虚假。“5水”“5水SKU”“5水活跃”表示门店在指定统计期间满足特定分销组合的状态，不是任意五个水SKU，也不是永久身份。按同一cust_code在同一统计期间判断，基础商品范围限定商品类型为成品、行销类目为水，并且必须同时满足：①天然水550mL与天然水1.5L均有分销；②天然水5L、4.5L、6L中至少一个规格有分销；③天然水380mL、天然水2L、天然水4L、长白雪、运动水及版本规定的天然水合并规格组中，有分销的有效组至少两个。天然水各规格按品类和容量共同识别；长白雪、运动水各计一组。同一组的重复记录或多个商品不增加有效组数。合并规格组内任一个或两个规格有分销均只计一组：初版知识库规定天然水12L与天然水2.9L合并，指标清单规定天然水12L与天然水12.9L合并，适用版本及生效期间尚待确认，不任选其一作为统一口径。“有分销”指该门店该商品存在签收日期sign_time落入所选统计期间且签收数量sign_box_cnt大于0的历史分销行，不改用期间分销金额合计大于0判断。状态及门店数量、列表的解释须保留统计期间和规则版本。该分销组合状态与稽查5sku_flag记录的水5SKU铺货结果不同，不能互相替代；合并规格组口径未确认前，仅保留上述规则，不新增口径确定的完整状态属性。

## 指出的关系

无

## 指入的关系

- 子门店 → 对应门店 `StoreScope_of_store`
  子门店的cust_code指向其实际门店。同一门店可有多个cust_range_code，不能把范围拆分计为新增门店。
- 分销订单行 → 交易门店 `DistributionOrderLine_store`
  cust_code直接记录该分销行的门店，也用于识别虚假分销涉及门店，不能因已有子门店路径而省略。
- 月度分销目标 → 进货目标对应门店 `DistributionTarget_store`
  子门店月度目标同时直接记录cust_code，表示实际门店；跨服务范围统计需保留各目标范围，不按门店编码任取一行。
- 门店月度稽查结果 → 被检查门店 `StoreInspectionMonth_store`
  cust_code记录该月稽查对象；本表没有子门店编码，不能把结果自动复制为各子门店独立检查。
- 活动计划明细 → 关联门店 `ActivityPlanDetail_store`
  cust_code直接记录本活动明细所涉及的门店，不因另有子门店引用而省略。
- 陈列签约 → 签约门店 `DisplaySigning_store`
  cust_code直接记录签约门店，签约金额按具体dsp_id解释。
- 套餐门店执行费用 → 执行门店 `PackageExecutionCost_store`
  cust_code是该套餐费用事实的门店维度，不能据此任选子门店。
- 月度陈列项检查结果 → 检查门店 `DisplayItemInspection_store`
  cust_code直接记录该陈列项检查涉及的实际门店。
- 门店陈列执行统计 → 执行门店 `DisplayExecutionSummary_store`
  cust_code记录陈列执行统计对应门店，不等同签约记录数。
- 统案客户分配 → 关联执行门店 `UnifiedCustomerAllocation_store`
  分配展开记录实际提供cust_code时，表示本分配关联计划所涉及的门店，不表示分配金额已经按门店拆分。
- 虚假重复客资认定 → 主门店 `DuplicateStoreFinding_primary_store`
  cust_code记录本配对认定的主门店，也是知识中虚假客资门店指标使用的参与方。
- 虚假重复客资认定 → 重复配对门店 `DuplicateStoreFinding_duplicate_store`
  dup_cust_code记录与主门店配对的另一门店；不能因此合并两编码或自动计入主门店指标。
- 虚假陈列认定 → 认定门店 `FalseDisplayFinding_store`
  cust_code直接记录统计日的虚假陈列门店，月度门店数按该编码去重。
- 计划门店拜访 → 计划拜访门店 `PlannedStoreVisit_store`
  cust_code是本日期和线路安排中应拜访的门店。
- 门店拜访 → 被拜访门店 `StoreVisit_store`
  cust_code直接记录本次拜访门店；仅有门店编码不证明对应哪个子门店。

## 属性

### 门店编码 `Store_customer_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.cust_code`、`v_dim_chl_sub_cust_indct_mi.cust_code`、`v_trd_dist_ord_dtl.cust_code`、`v_chl_jc_cust_mi.cust_code`、`v_mkt_market_actv_plan_verify_cost.cust_code`、`v_mkt_actv_inspect_result.cust_code`、`v_mkt_dsp_actv_info_mi.cust_code`、`v_mkt_package_cust_cost_mi.cust_code`、`v_mkt_dsp_execute_mi.cust_code`、`v_mkt_unity_apply_alloc_df.cust_code`、`v_ai_sus_ord_inspect_detail.cust_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.cust_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.dup_cust_code`、`v_ads_ai_chl_sus_display_fee_detail.cust_code`、`v_chl_route_plan_cust_cnt_1d_df.cust_code`、`v_chl_visit_dtl.cust_code`
- 口径：终端客户本身的编码，通常由cust_code记录；重复客资认定中的另一配对门店由dup_cust_code记录。不同于表示销售服务范围的cust_range_code，也不因重复配对认定而将两个门店编码合并。

### 门店名称 `Store_customer_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.cust_name`、`v_dim_chl_sub_cust_indct_mi.cust_name`、`v_trd_dist_ord_dtl.cust_name`、`v_chl_jc_cust_mi.cust_name`、`v_mkt_market_actv_plan_verify_cost.cust_name`、`v_mkt_actv_inspect_result.cust_name`、`v_mkt_dsp_actv_info_mi.cust_name`、`v_mkt_package_cust_cost_mi.cust_name`、`v_mkt_dsp_execute_mi.cust_name`、`v_mkt_unity_apply_alloc_df.cust_name`、`v_ai_sus_ord_inspect_detail.cust_name`、`v_ai_mid_chl_sus_duplicate_cust_mi.cust_name`、`v_ai_mid_chl_sus_duplicate_cust_mi.dup_cust_name`、`v_ads_ai_chl_sus_display_fee_detail.cust_name`、`v_chl_route_plan_cust_cnt_1d_df.cust_name`、`v_chl_visit_dtl.cust_name`
- 口径：资料直接记录的终端客户名称。门店仍以编码识别，不按名称相同合并对象；当前维表名称、月度资料名称和业务记录所附名称按各自来源范围保留，不把历史引用名称无条件当作当前名称。

### 门店状态编码 `Store_status_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.cust_status`、`v_chl_visit_dtl.cust_status`
- 口径：资料记录的终端客户状态编码，不是子门店经营范围状态、订单状态或拜访状态。当前维表取当前记录值，拜访来源仅表示该次记录所附值；不假定不同来源的编码枚举已统一。

### 门店状态 `Store_status_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.cust_status_name`、`v_dim_chl_sub_cust_indct_mi.cust_status_name`、`v_trd_dist_ord_dtl.cust_status_name`、`v_chl_jc_cust_mi.cust_status_name`、`v_chl_visit_dtl.cust_status_name`
- 口径：资料记录的终端客户状态名称。当前维表只表示当前值，月度资料与该行ym配套，其余业务记录表示记录所附值，不能解释为永久状态。服务客户按所选月的月度资料排除状态为“已不合作”的记录后，对门店编码去重；不能用当前状态覆盖历史月度范围。

### 门店等级编码 `Store_customer_level_code`

- 类型：string
- 字段：`v_chl_visit_dtl.cust_level`
- 口径：拜访资料直接记录的终端客户等级编码，限定在该次门店资料范围内。不同于市场级别、行政区划类别和人员岗位编码。

### 门店等级 `Store_customer_level_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.level_name`、`v_dim_chl_sub_cust_indct_mi.level_name`、`v_trd_dist_ord_dtl.level_name`、`v_mkt_dsp_actv_info_mi.level_name`、`v_mkt_dsp_execute_mi.cust_level_name`、`v_chl_visit_dtl.cust_level_name`
- 口径：资料直接记录的终端客户等级名称。“钻金银”指等级为钻石、金或银的门店，不是市场级别。当前、月度及业务记录所附等级分别保留来源期间和服务范围，不把不同记录的等级任取一个作为永久值。

### 市场层级编码 `Store_market_level_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.market_level`
- 口径：子门店维表按原字段说明记录的门店市场层级编码。该表将market_level标注为市场层级编码，而其他来源的同名字段标注为行政区划类别；本属性不据字段同名合并两种含义，也不宣称已核定其与市场级别名称的对应。

### 市场级别 `Store_market_level_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.mkt_level_name`、`v_dim_chl_sub_cust_indct_mi.mkt_level_name`、`v_trd_dist_ord_dtl.mkt_level_name`、`v_chl_jc_cust_mi.market_level_name`、`v_mkt_dsp_actv_info_mi.mkt_level_name`、`v_mkt_dsp_execute_mi.mkt_level_name`、`v_chl_visit_dtl.mkt_level_name`
- 口径：资料直接记录的门店市场级别或市场层级名称，用于门店市场分类；不同于钻石、金、银等门店等级，也不同于乡、镇等行政区划类别。取值按来源记录的期间与服务范围解释。

### 行政区划类别 `Store_administrative_area_category`

- 类型：string
- 字段：`v_trd_dist_ord_dtl.market_level`、`v_chl_jc_cust_mi.market_level`、`v_dim_chl_sub_cust_indct_mi.market_level`
- 口径：门店资料直接记录的行政区划类别。知识中的乡镇市场按本类别为“乡”或“镇”识别，不按市场级别名称或乡镇名称是否非空替代。月度及业务来源分别保留其记录范围。

### 门店类型编码 `Store_store_type_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.customer_store_type`
- 口径：当前门店资料记录的门店类型编码，对应customer_store_type。它不是合约店、常规店、非付费店的月度付费分类。

### 门店类型 `Store_store_type_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.customer_store_type_name`、`v_dim_chl_sub_cust_indct_mi.customer_store_type_name`
- 口径：门店资料中customer_store_type_name记录的门店类型名称。当前维表和月度资料按各自范围解释；不与cust_mkt_type表示的合约店、常规店、非付费店分类混用。

### 门店面积 `Store_business_area`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_df.business_area`
- 口径：当前门店资料直接记录的门店面积数值，资料未说明面积单位。同一门店可能在多个子门店记录出现，不能按子门店行数重复累计面积。

### 国家 `Store_country_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.country_name`、`v_trd_dist_ord_dtl.country_name`
- 口径：门店资料直接记录的所在国家名称。当前维表与业务记录所附地理资料分别使用，不从经销商或公司组织的所在地反推。

### 省份编码 `Store_province_code`

- 类型：string
- 字段：`v_chl_visit_dtl.province_id`
- 口径：拜访记录所附门店地理资料中的省份编码，不是公司大区编码，也不假定已与其他系统行政区划编码统一。

### 省份 `Store_province_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.province_name`、`v_trd_dist_ord_dtl.province_name`、`v_chl_jc_cust_mi.province_name`、`v_chl_visit_dtl.province_name`
- 口径：门店资料直接记录的所在省份名称。它是地理位置，不是公司销售大区；各来源按当前、月度或业务记录所附范围保留。

### 城市编码 `Store_city_code`

- 类型：string
- 字段：`v_chl_visit_dtl.city_id`
- 口径：拜访记录所附门店地理资料中的城市编码，与同一记录的城市名称配套，不从所属经销商城市编码取得。

### 城市 `Store_city_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.city_name`、`v_trd_dist_ord_dtl.city_name`、`v_chl_jc_cust_mi.city_name`、`v_chl_visit_dtl.city_name`
- 口径：门店资料直接记录的所在城市名称，按来源记录的期间和范围解释。

### 区县编码 `Store_county_code`

- 类型：string
- 字段：`v_chl_visit_dtl.town_id`
- 口径：拜访记录所附门店地理资料中的区县编码。尽管来源字段名为town_id，资料明确将其解释为区县编码。

### 区县 `Store_county_name`

- 类型：string
- 字段：`v_trd_dist_ord_dtl.town_name`、`v_chl_visit_dtl.town_name`
- 口径：来源明确标注为门店所在区县的名称。历史分销和拜访资料将town_name标为区县；不与另一些来源标为乡镇的同名字段未经核定合并。

### 乡镇 `Store_township_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.town_name`、`v_chl_jc_cust_mi.town_name`
- 口径：来源明确标注为门店所在乡镇的名称。当前子门店维表和稽查资料将town_name标为乡镇；不因同名就将其解释为其他来源的区县，也不以本名称替代行政区划类别的乡镇市场判定。

### 街道编码 `Store_street_code`

- 类型：string
- 字段：`v_chl_visit_dtl.street_id`
- 口径：拜访记录所附门店地理资料中的街道编码，按来源原编码保存，不将其当作区县或公司线路编码。

### 乡镇街道 `Store_street_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.street_name`、`v_trd_dist_ord_dtl.street_name`、`v_chl_jc_cust_mi.street_name`、`v_chl_visit_dtl.street_name`
- 口径：门店资料记录的街道或乡镇街道名称，按各来源原说明解释。它与标注为乡镇或区县的town_name分别保留，不据名称或字段前缀认定行政层级已统一。

### 村 `Store_village_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.village`、`v_trd_dist_ord_dtl.village`
- 口径：门店资料直接记录的所在村名称，不从乡镇名称推导。

### 村人口区间 `Store_village_population_scope`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.village_population_scope`、`v_trd_dist_ord_dtl.village_population_scope`
- 口径：门店所在村的人口范围或区间标签，不是门店客流量，也不是可以直接求和的人口数。标签边界按原值保留，资料未提供具体分档定义。

### 详细地址 `Store_detail_address`

- 类型：string
- 字段：`v_chl_jc_cust_mi.detail_addr`、`v_chl_visit_dtl.address`
- 口径：业务资料直接记录的门店详细地址。它不是员工拜访定位描述，也不由拜访开始、结束或拍照经纬度拼成门店登记地址。

### 组别编码 `Store_group_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.group_code`
- 口径：当前门店资料记录的终端客户组别编码，用于解释门店组别分类，不是公司组织或费用组编码。

### 组别 `Store_group_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.group_name`、`v_dim_chl_sub_cust_indct_mi.group_name`、`v_trd_dist_ord_dtl.group_name`、`v_chl_jc_cust_mi.group_name`
- 口径：资料记录的终端客户组别名称。当前、月度及业务资料保留各自期间和服务范围，不与费用业务中的dim_group_id混用。

### 条系编码 `Store_chain_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.tx_code`、`v_mkt_dsp_actv_info_mi.tx_code`
- 口径：门店资料中tx_code记录的条系编码，与上级条系编码分别保留。当前资料和执行月签约资料按其实际记录范围解释，不据此推定活动统案中的条系字段都描述同一个门店。

### 条系 `Store_chain_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.tx_name`、`v_dim_chl_sub_cust_indct_mi.tx_name`、`v_trd_dist_ord_dtl.tx_name`、`v_chl_jc_cust_mi.tx_name`、`v_mkt_dsp_actv_info_mi.tx_name`
- 口径：门店资料中tx_name记录的条系名称，历史分销资料称其为子条系。与p_tx_name记录的上级条系分开；各来源保留对应期间和服务范围。

### 上级条系编码 `Store_parent_chain_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p_tx_code`
- 口径：当前门店资料记录的父条系编码，与本级tx_code分别保存，不将组成或归属分类解释为门店类型继承。

### 上级条系 `Store_parent_chain_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p_tx_name`、`v_dim_chl_sub_cust_indct_mi.p_tx_name`、`v_trd_dist_ord_dtl.p_tx_name`、`v_chl_jc_cust_mi.p_tx_name`
- 口径：门店资料中p_tx_name记录的上级条系名称。当前和月度资料称父条系，历史分销资料与tx_name子条系配套称条系；不与本级条系名称混用。

### 场所编码 `Store_place_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.place_code`
- 口径：当前门店资料记录的场所分类编码，不是门店编码或地图坐标。

### 场所 `Store_place_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.place_name`、`v_dim_chl_sub_cust_indct_mi.place_name`、`v_trd_dist_ord_dtl.place_name`、`v_chl_jc_cust_mi.place_name`
- 口径：门店资料记录的场所分类名称，与上级场所、具体场所及地图场所分类分别保留。取值按来源记录的期间和服务范围解释。

### 上级场所编码 `Store_parent_place_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p_place_code`
- 口径：当前门店资料记录的父场所分类编码，不与地图场所编码p_place_code_map混用。

### 上级场所 `Store_parent_place_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p_place_name`、`v_dim_chl_sub_cust_indct_mi.p_place_name`、`v_trd_dist_ord_dtl.p_place_name`、`v_chl_jc_cust_mi.p_place_name`
- 口径：门店资料记录的父场所或上级场所分类名称。它不是p_place_name_map记录的地图场所，不能因名称相近互相补值。

### 具体场所编码 `Store_specific_place_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.specific_place_code`
- 口径：当前门店资料记录的具体场所分类编码，与地图具体场所编码分别保留。

### 具体场所 `Store_specific_place_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.specific_place`、`v_dim_chl_sub_cust_indct_mi.specific_place`
- 口径：门店资料直接记录的具体场所分类名称，不是地图具体场所名称；当前和月度值分别保留对应范围。

### 地图场所编码 `Store_map_place_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p_place_code_map`
- 口径：当前门店资料记录的地图场所分类编码，不是经纬度，也不与业务上级场所编码自动等价。

### 地图场所 `Store_map_place_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p_place_name_map`、`v_dim_chl_sub_cust_indct_mi.p_place_name_map`、`v_chl_jc_cust_mi.p_place_name_map`
- 口径：门店资料直接记录的地图场所分类名称，与业务场所、上级场所及地图具体场所分别保存。

### 地图具体场所编码 `Store_map_specific_place_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.specific_place_code_map`
- 口径：当前门店资料记录的地图具体场所分类编码，与业务具体场所编码分别保存，不据相同名称推定编码等价。

### 地图具体场所 `Store_map_specific_place_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.specific_place_name_map`、`v_dim_chl_sub_cust_indct_mi.specific_place_name_map`、`v_chl_jc_cust_mi.specific_place_name_map`
- 口径：门店资料直接记录的地图具体场所分类名称，不与specific_place记录的业务具体场所名称混用。

### 一店通标记编码 `Store_ydt_flag_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.is_ydt`、`v_dim_chl_sub_cust_indct_mi.is_ydt`、`v_trd_dist_ord_dtl.is_ydt`、`v_mkt_dsp_execute_mi.is_ydt`、`v_chl_visit_dtl.is_ydt`
- 口径：门店资料直接记录的是否一店通标记编码，按字符串保留。当前子门店维表和月度指标表明确1为是、0为否；其他来源未给出完整枚举，不自行统一编码。标记保留来源期间和服务范围，不能由openid是否非空推定。

### 一店通标记名称 `Store_ydt_flag_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.is_ydt_name`
- 口径：陈列签约资料直接附带的是否一店通显示值，限定在对应执行月、签约和门店服务范围内。它不是陈列支付方式或已兑付结果。

### 一店通openid `Store_ydt_open_identifier`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.ydt_open_id`
- 口径：当前门店资料记录的一店通终端客户openid，不同于门店编码及子门店编码。有该值不自动证明一店通标记为是，也不据此推定已经发生卡券兑付。

### 月度服务范围标记 `Store_month_service_flag`

- 类型：boolean
- 字段：`v_dim_chl_sub_cust_indct_mi.cust_status_name`、`v_dim_chl_sub_cust_indct_mi.ym`
- 口径：门店是否进入所选月的服务客户统计范围。该月存在至少一条终端客户状态不为“已不合作”的月度子门店记录时为true，否则未满足本统计范围条件；缺少月度记录不等于门店已关闭。判断按门店编码汇集各子门店记录，服务客户数对门店编码去重，不按子门店行数计数。门店或客户占比的分母使用同一所选月的服务客户数。

### 期间金额活跃标记 `Store_period_amount_active_flag`

- 类型：boolean
- 字段：`v_trd_dist_ord_dtl.sign_net_amt`、`v_trd_dist_ord_dtl.sign_time`、`v_trd_dist_ord_dtl.cmdty_type_name`、`v_trd_dist_ord_dtl.sales_clfc_type_name`
- 口径：门店在所选签收期间按分销金额合计是否大于0的活跃判定。按成品且行销类目为水或饮料的考核范围，对该门店sign_net_amt保留原正负号汇总；合计大于0为true，无记录、合计为空或不大于0为false。这是初版知识的金额活跃口径，不等于存在符合本品数量条件的活跃行。结果必须保留所选期间，不能解释为永久身份；本计算使用已提供加工金额，不擅自补造有效单、赠品排除或退货确认加工规则。

### 期间本品数量活跃标记 `Store_period_quantity_active_flag`

- 类型：boolean
- 字段：`v_trd_dist_ord_dtl.sign_box_cnt`、`v_trd_dist_ord_dtl.cmdt_tag_name`、`v_trd_dist_ord_dtl.ord_type_name`、`v_trd_dist_ord_dtl.sign_time`、`v_trd_dist_ord_dtl.cmdty_type_name`、`v_trd_dist_ord_dtl.sales_clfc_type_name`
- 口径：门店在所选签收期间是否存在符合活跃本品条件的分销行。按成品、水或饮料考核范围，存在分销数量大于0、商品性质为活动本品、普通本品或特价商品，且订单类型不是分销退货、库存盘点的行时为true。它是指标材料的数量条件活跃口径，不要求门店期间分销金额合计大于0，也不与金额活跃标记互相替代。

### 期间分销SKU数 `Store_period_distribution_sku_count`

- 类型：integer
- 字段：`v_trd_dist_ord_dtl.sku_code`、`v_trd_dist_ord_dtl.sign_time`、`v_trd_dist_ord_dtl.cmdty_type_name`、`v_trd_dist_ord_dtl.sales_clfc_type_name`
- 口径：门店在所选签收期间的历史分销明细中出现的SKU编码去重数量，按成品且行销类目为水或饮料的考核范围计算。该数量未附加数量大于0、本品性质及订单类型的活跃条件，不能称为活跃SKU数。单店按SKU编码去重，跨门店统计须保留门店与SKU的对应；店均分销SKU数使用门店-SKU对应去重数除以同范围门店去重数，不能用全体SKU全局去重数替代分子。多期间结果不能直接相加为跨期去重数。

### 期间活跃SKU数 `Store_period_active_sku_count`

- 类型：integer
- 字段：`v_trd_dist_ord_dtl.sku_code`、`v_trd_dist_ord_dtl.sign_box_cnt`、`v_trd_dist_ord_dtl.cmdt_tag_name`、`v_trd_dist_ord_dtl.ord_type_name`、`v_trd_dist_ord_dtl.sign_time`、`v_trd_dist_ord_dtl.cmdty_type_name`、`v_trd_dist_ord_dtl.sales_clfc_type_name`
- 口径：门店在所选签收期间满足活跃本品条件的SKU编码去重数量。按成品、水或饮料考核范围，限定分销数量大于0、商品性质为活动本品、普通本品或特价商品，且订单类型不是分销退货、库存盘点。同一门店同一SKU在多行出现只计一次；不同门店拥有同一SKU仍是不同门店-SKU对应。店均活跃SKU的分子使用各门店本值合计，分母采用哪一种活跃客户口径仍待确认；不将本属性解释为稽查铺货SKU数。
