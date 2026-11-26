# 搭赠下沉明细 `GiftSinkDetail`

- 分组：活动
- 父类：无

## 说明

随货搭赠活动经一个经销商、一个分销订单商品行及一个套餐下沉的追踪事实。活动客户层的搭赠、调整额度与本订单行的下沉金额分别解释，不能因前者随明细出现而重复累计。签收箱数、瓶数、合计箱数及赠品商品分别保存；下沉截止时间限定追踪业务，不等于订单签收日期。

## 指出的关系

- 搭赠活动 → 随货搭赠活动 `GiftSinkDetail_campaign`
  gwdlv_code、gwdlv_name直接记录本条下沉追踪所属随货搭赠活动。
- 执行经销商 → 经销商 `GiftSinkDetail_dealer`
  dealer_range_code记录本搭赠活动下沉的执行销售客户，是额度及订单追踪范围的一部分。
- 下沉分销行 → 分销订单行 `GiftSinkDetail_order_line`
  dist_ord_no与cmdt_code共同引用承接下沉的分销订单商品行，不仅按订单号把所有商品金额展开。
- 下沉套餐 → 分销套餐 `GiftSinkDetail_package`
  package_id、package_code、package_name直接记录承接下沉的分销套餐，不是费用包标识。
- 下沉交易商品 → 商品 `GiftSinkDetail_product`
  cmdt_code直接记录下沉订单商品，与gift_cmdt_code所指赠品商品分别保留。
- 搭赠商品 → 商品 `GiftSinkDetail_gift_product`
  gift_cmdt_code、gift_cmdt_name直接记录随货搭赠赠品商品，不与交易商品混合。
- 下沉归属办事处 → 办事处 `GiftSinkDetail_office`
  off_code、off_name直接记录本条下沉追踪的办事处归属。
- 下沉归属大区 → 大区 `GiftSinkDetail_district`
  dis_code、dis_name直接记录本条下沉追踪的大区归属。
- 下沉归属区域 → 公司组织 `GiftSinkDetail_region`
  搭赠下沉追踪明细直接记录的公司销售管理区域，由v_mkt_shdz_sink_dtl_df同一行reg_code、reg_name引用，复用GiftSinkDetail_region_code和GiftSinkDetail_region_name。联系保留该行stat_month及搭赠活动、经销商、分销订单商品行和套餐的对应，不将stat_month擅自解释为订单签收月，也不提升为搭赠活动或经销商的永久区域归属。不沿大区当前所属区域替代直接引用，不认定跨来源组织编码已经等价或实例已经匹配。
- 活动商品 → 商品 `GiftSinkDetail_activity_product`
  本条搭赠下沉追踪事实直接携带的活动商品引用，由v_mkt_shdz_sink_dtl_df同一行gwdlv_cmdt_name记录，复用GiftSinkDetail_campaign_product_short_name及Product_short_name的对应来源。该简称与同行gwdlv_code所指搭赠活动对应，并保留stat_month、dealer_range_code、dist_ord_no、cmdt_code和package_code限定的追踪范围。此联系表达活动商品参与身份，与GiftSinkDetail_product的下沉交易商品、GiftSinkDetail_gift_product的搭赠赠品分别保留，不以经活动的间接路径替代，也不要求三种身份指向不同商品实例。活动商品编码尚未提供，不用同行交易商品编码或赠品编码代填，不凭简称宣称商品主数据已匹配。

## 指入的关系

无

## 属性

### 记录年月 `GiftSinkDetail_record_month`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.stat_month`
- 口径：本条下沉追踪记录提供的年月，用于保留记录的期间范围。资料未明确其属于活动执行月、订单签收月还是追踪统计月，不用活动开始时间、下沉截止时间或更新时间替代。

### 记录区域编码 `GiftSinkDetail_region_code`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.reg_code`
- 口径：本条下沉追踪所附公司区域组织的编码，不表示省、市行政区划。

### 记录区域名称 `GiftSinkDetail_region_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.reg_name`
- 口径：本条下沉追踪所附公司区域组织的名称，与本记录的区域编码配套。

### 下沉大区编码 `GiftSinkDetail_district_code`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.dis_code`
- 口径：本条下沉追踪记录归属的大区编码，用于识别该记录的大区范围。

### 下沉大区名称 `GiftSinkDetail_district_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.dis_name`
- 口径：本条下沉追踪记录保存的归属大区名称，不由经销商当前归属反推。

### 下沉办事处编码 `GiftSinkDetail_office_code`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.off_code`
- 口径：本条下沉追踪记录归属的办事处编码，与记录年月及下沉参与对象共同解释。

### 下沉办事处名称 `GiftSinkDetail_office_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.off_name`
- 口径：本条下沉追踪记录保存的归属办事处名称，与本记录的办事处编码配套。

### 执行经销商范围编码 `GiftSinkDetail_dealer_range_code`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.dealer_range_code`
- 口径：本条搭赠下沉追踪中执行经销商的销售范围编码，是活动客户额度范围及追踪事实识别条件的一部分，不等同SAP编码。

### 记录经销商SAP编码 `GiftSinkDetail_dealer_sap_code`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.dealer_sap_code`
- 口径：本条追踪记录所附经销商的SAP编码，源字段标注为所属经销商SAP编码。它与销售范围编码属于不同标识体系，不互相替换。

### 记录经销商名称 `GiftSinkDetail_dealer_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.dealer_name`
- 口径：本条下沉追踪记录所附销售客户名称，与该行经销商销售范围编码对应。

### 执行客户类型编码 `GiftSinkDetail_dealer_type_code`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.dealer_type_code`
- 口径：本条追踪记录中执行销售客户的类型编码，用于解释本记录的客户类别，不作为经销商身份编码。

### 执行客户类型名称 `GiftSinkDetail_dealer_type_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.dealer_type_name`
- 口径：本条追踪记录所附执行销售客户的类型名称，与类型编码配套，不用当前客户类型覆盖。

### 搭赠活动编号 `GiftSinkDetail_campaign_code`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.gwdlv_code`
- 口径：本条下沉追踪所属随货搭赠活动的编号，与经销商、订单商品和套餐引用共同识别追踪事实，不是分销套餐编码。

### 记录搭赠活动名称 `GiftSinkDetail_campaign_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.gwdlv_name`
- 口径：本条追踪记录所附随货搭赠活动名称，与搭赠活动编号对应，不等同承接下沉的套餐名称。

### 活动商品简称 `GiftSinkDetail_campaign_product_short_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.gwdlv_cmdt_name`
- 口径：本条记录所附随货搭赠活动的商品简称。活动商品、下沉订单交易商品和搭赠赠品是不同参与身份，不能用本简称替代交易商品名称或赠品商品名称；简称本身不提供商品编码。

### 搭赠活动短描述 `GiftSinkDetail_campaign_description`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.gwdlv_desc`
- 口径：本条追踪记录所附随货搭赠活动的简短说明，用于解释该活动安排，不表示订单备注或实例下沉状态。

### 搭赠活动开始时间 `GiftSinkDetail_campaign_begin_time`

- 类型：dateTime
- 字段：`v_mkt_shdz_sink_dtl_df.begin_date`
- 口径：本条追踪所引用随货搭赠活动的开始时间，不是订单创建时间，也不等于本记录年月的起点。

### 搭赠活动结束时间 `GiftSinkDetail_campaign_end_time`

- 类型：dateTime
- 字段：`v_mkt_shdz_sink_dtl_df.end_date`
- 口径：本条追踪所引用随货搭赠活动的结束时间，与活动开始时间配套。活动结束时间和下沉截止时间分别解释，不推定二者相同。

### 下沉截止时间 `GiftSinkDetail_sink_cutoff_time`

- 类型：dateTime
- 字段：`v_mkt_shdz_sink_dtl_df.sink_time`
- 口径：本条搭赠下沉追踪记录提供的下沉业务截止时间，限定追踪业务的截止条件，不是订单签收时间、活动结束时间或数据更新时间。

### 活动客户搭赠额度 `GiftSinkDetail_gift_quota`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.gift_amt`
- 口径：本记录所附搭赠活动与经销商范围的搭赠额度，单位元，不是每条订单商品套餐明细新增的金额。随多个下沉明细出现时不能按明细次数重复累计，跨月是否属于累计值尚未明确。

### 活动客户调整额度 `GiftSinkDetail_adjustment_quota`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.adjust_amt`
- 口径：本记录所附搭赠活动与经销商范围的调整额度，单位元，与搭赠额度分别保存。它不是本订单商品行的下沉发生金额，随明细展开时不能重复累计。

### 记录下沉额度 `GiftSinkDetail_recorded_sink_quota`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.sink_amt`
- 口径：追踪记录中sink_amt记载的下沉额度，单位元，与sink_amount分别保留。资料未明确本列是否为活动客户层的累计下沉值，未核定前不将其作为可按订单明细累加的金额，也不与明细下沉金额相加。

### 下沉分销订单号 `GiftSinkDetail_order_number`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.dist_ord_no`
- 口径：承接本条搭赠下沉的分销订单号，须与交易商品编码配套引用分销订单商品行。一张订单可有多个商品，订单号不是本条追踪事实的独立标识。

### 下沉套餐标识 `GiftSinkDetail_package_identifier`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.package_id`
- 口径：本条记录引用的承接下沉分销套餐标识，不是费用包头标识或费用包分配明细标识。

### 下沉套餐编码 `GiftSinkDetail_package_code`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.package_code`
- 口径：本条下沉追踪引用的分销套餐编码，是声明追踪粒度的一部分，不与搭赠活动编号或费用包编码混用。

### 记录下沉套餐名称 `GiftSinkDetail_package_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.package_name`
- 口径：本条追踪记录所附承接下沉的分销套餐名称，与套餐标识及编码对应，不是随货搭赠活动名称。

### 下沉交易商品编码 `GiftSinkDetail_transaction_product_code`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.cmdt_code`
- 口径：承接本条下沉的分销订单商品编码，与订单号共同引用交易商品行。它不同于活动商品简称及gift_cmdt_code记录的搭赠赠品引用。

### 记录交易商品名称 `GiftSinkDetail_transaction_product_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.cmdt_name`
- 口径：本条追踪记录所附下沉订单交易商品的名称，与交易商品编码对应，不用赠品名称或活动商品简称替代。

### 签收箱数 `GiftSinkDetail_signed_box_quantity`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.sign_box_qty`
- 口径：本条下沉追踪记录的签收数量箱计量值，单位箱，与同一行签收瓶数及合计箱数配套保存，不解释为标箱数量。

### 签收瓶数 `GiftSinkDetail_signed_bottle_quantity`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.sign_bottle_qty`
- 口径：本条下沉追踪记录的签收数量瓶计量值，单位瓶，与签收箱数保持同一记录对应；不能不经换算直接与箱数相加。

### 合计箱数 `GiftSinkDetail_total_box_quantity`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.total_boxes_qty`
- 口径：本条下沉追踪记录提供的合计数量，单位箱。采用已提供的合计值，不把签收箱数、签收瓶数和合计箱数三项重复累计；资料未给出瓶转箱计算规则。

### 自营订单搭赠力度 `GiftSinkDetail_self_order_gift_intensity`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.gift_intensity_self_ord`
- 口径：本条追踪记录保存的自营订单搭赠力度值。资料未明确其取值尺度及计算口径，不自动按百分比解释，也不与套餐折扣力度或搭赠下沉比例等同。

### 上单净价 `GiftSinkDetail_order_net_box_price`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.box_price`
- 口径：本条下沉追踪记录提供的上单净价，单位元/箱，是单价而不是可直接求和的金额。“净价”不自动表示不含税，资料未注明税口径。

### 搭赠下沉比例 `GiftSinkDetail_sink_ratio`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.sink_ratio`
- 口径：本条追踪记录提供的搭赠下沉比例，字段口径标注为%。它不自动等同历史分销明细的下沉承担比例或我司承担比例；使用已加工下沉金额时不再重复乘本比例。

### 明细下沉金额 `GiftSinkDetail_detail_sink_amount`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.sink_amount`
- 口径：当前搭赠活动、经销商、分销订单商品及套餐追踪行保存的sink_amount下沉额度，单位元。它与活动客户搭赠额度、调整额度及sink_amt分别解释，不把各层金额叠加；引用其他对象展开后不能重复累计本行金额。

### 追踪更新时间 `GiftSinkDetail_tracking_update_time`

- 类型：dateTime
- 字段：`v_mkt_shdz_sink_dtl_df.updated_time`
- 口径：本条下沉追踪记录保存的更新时间，不是订单签收时间、下沉截止时间或ETL加载时间，也不单凭本列宣称已提供历史快照。

### 随货搭赠赠品金额 `GiftSinkDetail_gift_send_amount`

- 类型：decimal
- 字段：`v_mkt_shdz_sink_dtl_df.gift_send_amt_witax`
- 口径：本条追踪记录直接保存的随货搭赠赠品金额，与本行赠品商品引用配套理解，不等于交易商品金额或明细下沉金额。字段说明未明确税口径、金额单位及是否已分配到订单商品套餐行，不能仅凭witax后缀认定含税，也不能未经口径确认按追踪行累加。

### 搭赠赠品商品编码 `GiftSinkDetail_gift_product_code`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.gift_cmdt_code`
- 口径：本条追踪记录引用的随货搭赠赠品商品编码，与下沉订单交易商品编码分别保留；参与身份不同不要求实际商品实例必然不同。

### 记录搭赠赠品名称 `GiftSinkDetail_gift_product_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.gift_cmdt_name`
- 口径：本条追踪记录所附随货搭赠赠品商品的名称，与赠品商品编码对应，不等同活动商品简称或交易商品名称。
