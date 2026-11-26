# 陈列支付卡券 `DisplayPaymentCoupon`

- 分组：活动
- 父类：无

## 说明

陈列签约资料引用的卡券对象，以关联卡券编码、名称和类型记录。货款抵扣、产品兑换和陈列对账等券型用于解释不同支付与核销方式；本轮不据此建立券发放、领用或兑付流水。

## 指出的关系

- 关联商品 → 商品 `DisplayPaymentCoupon_associated_product`
  陈列支付卡券在对应签约执行月记录中关联的商品，由v_mkt_dsp_actv_info_mi同一行的cpn_cmdt_name提供名称引用，并与该行cpn_code、dsp_id及execute_ym保持对应。不同签约或月份的商品引用分别保留，不扩大为该卡券全部期间的固定商品配置。商品名称引用不表示已唯一匹配cmdt_code，不用签约规格或其他商品编码补码；有商品引用也不表示已经发券或兑付。
- 关联商品品类 → 品类 `DisplayPaymentCoupon_associated_product_category`
  陈列支付卡券在对应签约执行月记录中关联商品的产品品类，由v_mkt_dsp_actv_info_mi同一行的cpn_ctg_name提供名称引用，并与该行cpn_code、cpn_cmdt_name、dsp_id及execute_ym保持对应。它不同于ctg_name记录的签约陈列品类，不以同行ctg_code为卡券商品品类补码。不同签约或月份的品类引用分别保留，不扩大为该卡券全部期间的固定品类配置，也不凭名称宣称已完成品类编码匹配。

## 指入的关系

- 陈列签约 → 关联支付卡券 `DisplaySigning_coupon`
  cpn_code、cpn_name和券型直接记录签约关联卡券；有卡券引用不表示已经兑付。

## 属性

### 卡券编码 `DisplayPaymentCoupon_coupon_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cpn_code`
- 口径：陈列签约资料引用的卡券编码，用于识别关联卡券；不是陈列签约标识或核销明细标识，也不据此认定存在单张券的发放、领用或兑付记录。

### 卡券名称 `DisplayPaymentCoupon_coupon_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cpn_name`
- 口径：陈列签约引用的卡券名称，与该记录的卡券编码配套解释，不与活动名称或陈列项名称混用。

### 卡券类型 `DisplayPaymentCoupon_coupon_type_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cpn_type_name`
- 口径：签约资料记录的卡券类型名称。指标资料的一店通陈列支付口径中，现金或货抵使用货款抵扣券（原现金抵扣券），产品支付使用产品兑换券，账扣使用陈列对账券。前两类按适用价格折算核销，陈列对账券按券金额核销；券型不同于签约支付方式，也不表示已经兑付。

### 关联商品名称 `DisplayPaymentCoupon_associated_product_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cpn_cmdt_name`
- 口径：陈列签约资料为关联卡券记录的商品名称，与签约陈列品类、活动规格分别解释。这里保留商品名称引用，不表示已经取得商品编码或完成商品主数据匹配。

### 关联商品品类 `DisplayPaymentCoupon_associated_product_category_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cpn_ctg_name`
- 口径：陈列签约资料为关联卡券商品记录的品类名称，不是ctg_name所表示的签约陈列品类。该属性保留名称引用，不表示已经取得品类编码。
