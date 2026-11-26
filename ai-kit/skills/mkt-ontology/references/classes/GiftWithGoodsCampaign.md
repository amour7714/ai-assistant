# 随货搭赠活动 `GiftWithGoodsCampaign`

- 分组：活动
- 父类：MarketingActivity

## 说明

向经销商提供随货搭赠安排，并跟踪其经分销套餐、订单向门店下沉的营销活动。活动开始、结束与下沉截止时间分别解释；搭赠额度、调整额度、资料记录的下沉额度与具体订单商品套餐追踪行的下沉金额分别解释，不视为同一金额口径。sink_amt仅明确记录下沉额度，其统计层级及是否累计尚未明确，不确定为活动客户层累计值，也不与sink_amount互相替代。

## 指出的关系

- 活动商品 → 商品 `GiftWithGoodsCampaign_activity_product`
  随货搭赠活动资料直接记载的活动商品，由v_mkt_shdz_sink_dtl_df中与gwdlv_code配套的gwdlv_cmdt_name提供简称引用，复用GiftWithGoodsCampaign_activity_product_short_name及Product_short_name的对应来源。联系保留该搭赠活动及原追踪记录的月份、经销商、订单商品和套餐范围，不通过下沉交易商品或搭赠赠品关系替代。活动商品、交易商品和赠品是不同参与身份，不要求它们必然指向不同商品实例。来源只提供活动商品简称，简称到商品编码的对应仍待确认；不以同行cmdt_code或gift_cmdt_code补码，也不认定简称已与系统简称逐值匹配。

## 指入的关系

- 搭赠下沉明细 → 搭赠活动 `GiftSinkDetail_campaign`
  gwdlv_code、gwdlv_name直接记录本条下沉追踪所属随货搭赠活动。

## 属性

### 活动简述 `GiftWithGoodsCampaign_short_description`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.gwdlv_desc`
- 口径：随货搭赠活动的简短业务说明，用于解释活动安排，不是订单备注或下沉执行结果。

### 活动商品简称 `GiftWithGoodsCampaign_activity_product_short_name`

- 类型：string
- 字段：`v_mkt_shdz_sink_dtl_df.gwdlv_cmdt_name`
- 口径：随货搭赠活动资料直接记录的活动商品简称。它按活动商品身份解释；下沉订单交易商品与赠品另行记录，不能未经对应就用其名称或编码替代活动商品信息。简称不作为已确认的商品匹配键。

### 下沉截止时间 `GiftWithGoodsCampaign_sink_deadline`

- 类型：dateTime
- 字段：`v_mkt_shdz_sink_dtl_df.sink_time`
- 口径：随货搭赠活动在下沉追踪资料中记录的下沉截止日期或时间，用于限定搭赠向门店下沉的追踪范围。它不同于活动结束时间，也不表示订单签收时间；保留来源实际提供的时间精度。

### 活动编码 `MarketingActivity_activity_code`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_shdz_sink_dtl_df.gwdlv_code`
- 口径：原业务记录用于引用营销活动或活动计划的编码，包括计划编码、渠道活动编码、陈列活动编码、统案活动编码、随货搭赠编号及分销套餐编码。不同来源的编码体系分别保留，不认定同值编码必然表示同一活动，也不将活动头ID、计划明细ID、陈列签约ID或费用包编码当作本属性。统案活动编码与其后续执行计划编码指向不同参与对象。

### 活动名称 `MarketingActivity_activity_name`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_shdz_sink_dtl_df.gwdlv_name`
- 口径：业务记录直接记载或引用的营销活动、活动计划名称。名称用于展示和辅助核对，不是跨来源实例匹配键；同名不证明同一活动。统案名称、后续执行计划名称、随货搭赠名称和承接下沉的套餐名称分别对应各自活动对象。

### 活动类型 `MarketingActivity_activity_type_name`

- 类型：string，继承自 MarketingActivity
- 字段：`v_mkt_shdz_sink_dtl_df.gwdlv_code`
- 口径：活动的业务类型，用于区别陈列活动、经销商套餐、统案套餐、业代套餐、统案活动、随货搭赠活动及其他实际记录类型。有直接类型名称字段的来源保留原值；专属业务来源未提供类型名称时，可依据实际活动引用及资料明确的对象类别计算类型名称。各来源的分类细度可能不同，不将统案套餐与统案活动认定为同义，也不把费用包类型、门店执行统计类型或钱包记账阶段作为活动类型。套餐类别影响计划、实施和确认金额的承担口径，不能将各类活动金额统一解释为现金支付。

### 活动开始时间 `MarketingActivity_start_time`

- 类型：dateTime，继承自 MarketingActivity
- 字段：`v_mkt_shdz_sink_dtl_df.begin_date`
- 口径：活动或活动计划规定的开始日期或时间，保留来源实际提供的精度。它限定活动本身的开展期间，不是执行月、门店签约日期、订单创建时间或下沉统计月；同一来源中的开始与结束值须对应同一个活动对象。

### 活动结束时间 `MarketingActivity_end_time`

- 类型：dateTime，继承自 MarketingActivity
- 字段：`v_mkt_shdz_sink_dtl_df.end_date`
- 口径：活动或活动计划规定的结束日期或时间，保留来源实际提供的精度，并与同一活动的开始时间配套。计划结束时间不同于提前终止日期、费用确认或核销时间；随货搭赠活动的结束时间也不同于下沉截止时间，不能互相替代。
