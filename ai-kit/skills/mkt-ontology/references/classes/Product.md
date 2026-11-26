# 商品 `Product`

- 分组：商品
- 父类：无

## 说明

公司商品主数据中的具体商品，以cmdt_code识别，可为成品、终端品或包材。商品与SKU、品类不是同一粒度。水和饮料按行销类目识别；大包装水还限定容量为4L、4.5L、5L、6L或12.9L。本品、赠品表示商品在订单行中的业务性质，不是商品永久类别。

## 指出的关系

- 归入SKU → SKU `Product_sku`
  商品资料直接记录所属sku_code和sku_name，商品编码与SKU编码各自识别不同粒度对象。
- 所属品类 → 品类 `Product_category`
  商品资料的ctg_code、ctg_name记录所属品类，不以行销类目或合同品类替代。

## 指入的关系

- 分销订单行 → 交易商品 `DistributionOrderLine_product`
  cmdt_code记录该分销行的商品；虚假分销资料也直接引用这一商品身份。
- 实际销售考核明细 → 考核商品 `SalesAssessment_product`
  cmdt_code记录实际销售考核的商品；数量单位由basic_unit_desc_orgn解释，不自动当箱或标箱。
- 组织销售目标 → 目标商品 `OfficeSalesTarget_product`
  cmdt_code记录组织销售目标的商品范围；跨商品汇总先保持同月同组织目标覆盖一致。
- 活动计划明细 → 涉及商品 `ActivityPlanDetail_product`
  cmdt_code直接记录活动计划明细涉及的商品，金额仍按明细实际粒度解释。
- 陈列签约 → 卡券关联商品 `DisplaySigning_coupon_product`
  cpn_cmdt_name记录本签约所附卡券商品，与陈列品类及签约规格分开；仅名称引用不证明已完成商品编码匹配。
- 套餐门店执行费用 → 执行商品 `PackageExecutionCost_product`
  cmdt_code是该套餐费用事实的商品维度。
- 经销商商品库存 → 库存商品 `DealerInventory_product`
  cmdt_code与客户和stat_date共同限定库存数量、金额及出入库指标。
- 搭赠下沉明细 → 下沉交易商品 `GiftSinkDetail_product`
  cmdt_code直接记录下沉订单商品，与gift_cmdt_code所指赠品商品分别保留。
- 搭赠下沉明细 → 搭赠商品 `GiftSinkDetail_gift_product`
  gift_cmdt_code、gift_cmdt_name直接记录随货搭赠赠品商品，不与交易商品混合。
- 随货搭赠活动 → 活动商品 `GiftWithGoodsCampaign_activity_product`
  随货搭赠活动资料直接记载的活动商品，由v_mkt_shdz_sink_dtl_df中与gwdlv_code配套的gwdlv_cmdt_name提供简称引用，复用GiftWithGoodsCampaign_activity_product_short_name及Product_short_name的对应来源。联系保留该搭赠活动及原追踪记录的月份、经销商、订单商品和套餐范围，不通过下沉交易商品或搭赠赠品关系替代。活动商品、交易商品和赠品是不同参与身份，不要求它们必然指向不同商品实例。来源只提供活动商品简称，简称到商品编码的对应仍待确认；不以同行cmdt_code或gift_cmdt_code补码，也不认定简称已与系统简称逐值匹配。
- 搭赠下沉明细 → 活动商品 `GiftSinkDetail_activity_product`
  本条搭赠下沉追踪事实直接携带的活动商品引用，由v_mkt_shdz_sink_dtl_df同一行gwdlv_cmdt_name记录，复用GiftSinkDetail_campaign_product_short_name及Product_short_name的对应来源。该简称与同行gwdlv_code所指搭赠活动对应，并保留stat_month、dealer_range_code、dist_ord_no、cmdt_code和package_code限定的追踪范围。此联系表达活动商品参与身份，与GiftSinkDetail_product的下沉交易商品、GiftSinkDetail_gift_product的搭赠赠品分别保留，不以经活动的间接路径替代，也不要求三种身份指向不同商品实例。活动商品编码尚未提供，不用同行交易商品编码或赠品编码代填，不凭简称宣称商品主数据已匹配。
- 陈列支付卡券 → 关联商品 `DisplayPaymentCoupon_associated_product`
  陈列支付卡券在对应签约执行月记录中关联的商品，由v_mkt_dsp_actv_info_mi同一行的cpn_cmdt_name提供名称引用，并与该行cpn_code、dsp_id及execute_ym保持对应。不同签约或月份的商品引用分别保留，不扩大为该卡券全部期间的固定商品配置。商品名称引用不表示已唯一匹配cmdt_code，不用签约规格或其他商品编码补码；有商品引用也不表示已经发券或兑付。

## 属性

### 商品编码 `Product_product_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.cmdt_code`、`v_trd_dist_ord_dtl.cmdt_code`、`v_trd_sales_adjust_df.cmdt_code`、`v_trd_sales_target_org_mi.cmdt_code`、`v_mkt_market_actv_plan_verify_cost.cmdt_code`、`v_mkt_package_cust_cost_mi.cmdt_code`、`v_ai_sus_ord_inspect_detail.cmdt_code`、`v_inv_dealer_cmdt_di.cmdt_code`、`v_mkt_shdz_sink_dtl_df.cmdt_code`、`v_mkt_shdz_sink_dtl_df.gift_cmdt_code`
- 口径：识别公司具体商品的cmdt_code，不同于SKU编码或SAP商品编码。业务记录中的商品引用分别按交易、考核、目标、活动、库存和搭赠身份解释；赠品商品编码也是商品标识，不表示该商品永久属于赠品类别。

### 商品名称 `Product_product_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.cmdt_name`、`v_trd_dist_ord_dtl.cmdt_name`、`v_trd_sales_adjust_df.cmdt_name`、`v_trd_sales_target_org_mi.cmdt_name`、`v_mkt_market_actv_plan_verify_cost.cmdt_name`、`v_mkt_package_cust_cost_mi.cmdt_name`、`v_inv_dealer_cmdt_di.cmdt_name`、`v_mkt_shdz_sink_dtl_df.cmdt_name`、`v_mkt_shdz_sink_dtl_df.gift_cmdt_name`、`v_mkt_dsp_actv_info_mi.cpn_cmdt_name`
- 口径：商品主数据的商品全称，或业务记录直接保存的商品名称。交易商品、搭赠商品和卡券关联商品的名称分别对应各自参与身份；名称引用不证明已经匹配到同一个商品编码。

### 商品简称 `Product_short_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.cmdt_sname`、`v_trd_dist_ord_dtl.cmdt_sname`、`v_trd_sales_adjust_df.cmdt_sname`、`v_trd_sales_target_org_mi.cmdt_sname`、`v_inv_dealer_cmdt_di.cmdt_sname`、`v_mkt_shdz_sink_dtl_df.gwdlv_cmdt_name`
- 口径：商品资料直接记录的商品简称，或业务记录为所引用商品直接记载的简称，不同于商品全称、用户自定义简称或活动名称。随货搭赠来源的gwdlv_cmdt_name表示活动商品的简称，不属于同一追踪行的交易商品或赠品身份；须保留搭赠活动和原记录范围，不假定其与系统cmdt_sname逐值相等，也不凭简称认定商品编码已匹配。

### 用户自定义简称 `Product_custom_short_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.cmdt_sname1`
- 口径：商品主数据保存的用户自定义商品简称，与系统商品简称分别保留。

### SAP商品编码 `Product_sap_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sap_id`、`v_dim_cmdt_cmdt.sap_code`、`v_trd_dist_ord_dtl.sap_code`、`v_trd_sales_adjust_df.cmdt_sap_code`、`v_trd_sales_target_org_mi.cmdt_sap_id`、`v_inv_dealer_cmdt_di.cmdt_sap_code`
- 口径：各来源直接记录的SAP产品编码，原样保留其字符串格式。商品维表sap_code已明确带前导0；其他字段未明确相同格式，不按数值转换，也不宣称各来源编码可直接互换。

### SAP商品名称 `Product_sap_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.cmdt_sap_name`
- 口径：销售调整资料直接保存的商品SAP名称，不以公司商品名称或商品简称替代。

### 商品类型编码 `Product_type_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.cmdt_type`
- 口径：商品主数据的类型编码：1为成品，2为终端品，3为包材。该分类描述商品本身，不是订单行中的本品或赠品性质。

### 商品类型 `Product_type_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.cmdty_type_name`、`v_trd_dist_ord_dtl.cmdty_type_name`、`v_trd_sales_adjust_df.cmdty_type_name`、`v_trd_sales_target_org_mi.cmdt_type_name`、`v_inv_dealer_cmdt_di.cmdty_type_name`
- 口径：商品所属的成品、终端品或包材类型。分销考核范围限定成品且行销类目为水或饮料，不能把这一筛选条件解释为所有商品都属于成品。

### 全标半标 `Product_full_half_standard_mark`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.cmdt_std`
- 口径：商品主数据记录的全标半标取值。材料未给出换算公式，不据此推算SKU系数或标箱系数。

### 品牌编码 `Product_brand_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.brand_code`
- 口径：商品主数据直接引用的所属品牌编码，与同一商品记录的品牌名称配套。

### 品牌名称 `Product_brand_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.brand_name`、`v_trd_dist_ord_dtl.brand_name`、`v_trd_sales_adjust_df.brand_name`、`v_trd_sales_target_org_mi.brand_name`、`v_inv_dealer_cmdt_di.brand_name`
- 口径：商品资料直接记录的所属品牌名称，不从商品名称关键词推断品牌。

### 三级类目编码 `Product_third_level_category_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.clfc_code`
- 口径：商品最细一层类目的编码，上级为二级类目，再上级为一级类目。该类目层级不同于产品品类和行销类目。

### 三级类目 `Product_third_level_category_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.clfc_name`、`v_trd_dist_ord_dtl.clfc_name`、`v_trd_sales_adjust_df.clfc_name`、`v_trd_sales_target_org_mi.clfc_name`、`v_inv_dealer_cmdt_di.clfc_name`
- 口径：商品最细一层类目的名称，与二级、一级类目保持同一商品的层级对应，不用它替代品类。

### 二级类目编码 `Product_second_level_category_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.p_clfc_code`
- 口径：商品二级类目的编码，对应商品主数据本级类目的上级编码；与同一商品记录的类目层级配套。

### 二级类目 `Product_second_level_category_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.p_clfc_name`、`v_trd_dist_ord_dtl.p_clfc_name`、`v_trd_sales_adjust_df.p_clfc_name`、`v_trd_sales_target_org_mi.p_clfc_name`、`v_inv_dealer_cmdt_di.p_clfc_name`
- 口径：商品三级类目的上级（二级）类目名称，来自商品主数据及业务记录直接附带的类目名称。按对应来源商品记录解释，不由当前类目名称覆盖其他期间所附值。

### 一级类目编码 `Product_first_level_category_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.p2_clfc_code`
- 口径：商品一级类目的编码，对应商品主数据本级类目的上上级编码；与同一商品记录的类目层级配套。

### 一级类目 `Product_first_level_category_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.p2_clfc_name`、`v_trd_dist_ord_dtl.p2_clfc_name`、`v_trd_sales_adjust_df.p2_clfc_name`、`v_trd_sales_target_org_mi.p2_clfc_name`、`v_inv_dealer_cmdt_di.p1_clfc_name`
- 口径：商品最粗一层类目的名称。一级类目与行销类目分别记录，即使取值同为水或饮料，也不直接替代行销类目的业务筛选。

### 品类编码 `Product_category_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.ctg_code`、`v_trd_sales_target_org_mi.ctg_code`、`v_mkt_market_actv_plan_verify_cost.ctg_code`
- 口径：商品资料直接引用的产品品类编码，用于识别所属品类，不同于类目编码、行销分类编码或合同品类编码。

### 品类名称 `Product_category_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.ctg_name`、`v_trd_dist_ord_dtl.ctg_name`、`v_trd_sales_adjust_df.ctg_name`、`v_trd_sales_target_org_mi.ctg_name`、`v_mkt_market_actv_plan_verify_cost.ctg_name`、`v_inv_dealer_cmdt_di.ctg_name`、`v_mkt_dsp_actv_info_mi.cpn_ctg_name`
- 口径：商品资料直接记录的产品品类名称。天然水可称红瓶水或红水，东方树叶可简称树叶；这些称呼用于理解品类，不用于改写原始取值。品类不同于三级类目、行销品类或合同品类。

### 品项编码 `Product_item_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.item_code`
- 口径：商品主数据直接记录的所属品项编码。品项是商品分类信息，不是订单明细标识。

### 品项 `Product_item_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.item_name`、`v_trd_dist_ord_dtl.item_name`、`v_trd_sales_adjust_df.item_name`、`v_trd_sales_target_org_mi.item_name`、`v_inv_dealer_cmdt_di.item_name`
- 口径：商品资料直接记录的品项名称。知识中的品相按品项理解，不从商品名称自行拆分品项。

### 所属SKU编码 `Product_sku_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sku_code`、`v_trd_dist_ord_dtl.sku_code`、`v_trd_sales_adjust_df.sku_code`、`v_trd_sales_target_org_mi.sku_code`、`v_mkt_market_actv_plan_verify_cost.sku_code`、`v_inv_dealer_cmdt_di.sku_code`
- 口径：商品资料直接引用的所属SKU编码。商品编码与SKU编码识别不同粒度；业务来源所附SKU与该来源商品记录配套，不能仅由当前商品主数据反推历史统计范围。

### 所属SKU名称 `Product_sku_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sku_name`、`v_trd_dist_ord_dtl.sku_name`、`v_trd_sales_adjust_df.sku_name`、`v_trd_sales_target_org_mi.sku_name`、`v_mkt_market_actv_plan_verify_cost.sku_name`、`v_inv_dealer_cmdt_di.sku_name`
- 口径：商品资料直接保存的所属SKU名称，与相应来源中的SKU编码和商品保持对应，不把SKU名称当作商品全称。

### 行销类目编码 `Product_sales_classification_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sales_clfc_type_code`
- 口径：商品主数据中产品大类分析分类的编码，与行销类目名称配套。不用一级类目编码代替。

### 行销类目 `Product_sales_classification_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sales_clfc_type_name`、`v_trd_dist_ord_dtl.sales_clfc_type_name`、`v_trd_sales_adjust_df.sales_clfc_type_name`、`v_trd_sales_target_org_mi.sales_clfc_type_name`、`v_inv_dealer_cmdt_di.sales_clfc_type_name`
- 口径：用于业务识别水、饮料等商品范围的行销类目。水取行销类目为水，饮料取行销类目为饮料；不同于产品品类、一级类目和行销分析类。

### 行销分析类编码 `Product_sales_analysis_type_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sales_ana_type_code`
- 口径：商品主数据保存的行销分析类代码，与该来源的行销分析类名称配套。尚未确认该分类与其他来源所称行销品类的对应，不扩散其编码来源。

### 行销分析类 `Product_sales_analysis_type_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sales_ana_type_name`、`v_trd_sales_target_org_mi.sales_ana_type_name`
- 口径：商品维表和组织目标资料明确标注的行销分析类名称。与标注为行销品类的其他来源分别保留，未确认前不认定为同一分类体系。

### 行销品类 `Product_marketing_category_name`

- 类型：string
- 字段：`v_trd_dist_ord_dtl.sales_ana_type_name`、`v_trd_sales_adjust_df.sales_ana_type_name`、`v_inv_dealer_cmdt_di.sales_ana_type_name`
- 口径：分销、销售调整及库存资料明确标注的商品行销品类。它不同于ctg_name记录的产品品类；与主数据行销分析类是否同义尚待确认。

### 行销新品类别编码 `Product_sales_new_type_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sales_new_type_code`、`v_trd_sales_adjust_df.sales_new_type_code`
- 口径：商品资料直接记录的行销新品分类代码，与相应来源的新品类别名称配套。不从商品创建时间或上架时间自行判定新品。

### 行销新品类别 `Product_sales_new_type_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sales_new_type_name`、`v_trd_dist_ord_dtl.sales_new_type_name`、`v_trd_sales_adjust_df.sales_new_type_name`、`v_inv_dealer_cmdt_di.sales_new_type_name`
- 口径：商品资料直接保存的行销新品分类名称，按对应来源记录解释，不将该分类无条件转成永久新品标记。

### 所附合同品类编码 `Product_contract_category_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.contract_ctg_code`
- 口径：销售调整记录为商品直接保存的合同品类编码，限定在该来源业务范围内，不是公司商品主数据的通用品类编码。

### 所附合同品类 `Product_contract_category_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.contract_ctg_name`、`v_inv_dealer_cmdt_di.contract_ctg_name`
- 口径：销售调整或经销商库存记录为商品直接保存的合同品类名称，须保留相应考核记录或库存日期、经销商范围。合同品类不同于产品品类，不据此建立所有期间都不变的商品分类。

### 包装规格 `Product_packaging_specification`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.spec_desc`、`v_trd_dist_ord_dtl.spec_desc`、`v_trd_sales_adjust_df.spec_desc`、`v_trd_sales_target_org_mi.spec_desc`、`v_inv_dealer_cmdt_di.package_spec`
- 口径：资料明确标注的商品包装规格描述，知识中的规格按包装规格理解。箱规和带容量包装规格另行保留，不因字段同名强行互换。

### 带容量包装规格 `Product_capacity_packaging_specification`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.package_spec`
- 口径：商品主数据明确标注为带容量的包装规格描述。它是规格文本，不直接作为容量数值或箱规的替代来源。

### 箱规 `Product_case_specification`

- 类型：string
- 字段：`v_trd_dist_ord_dtl.package_spec`、`v_trd_sales_adjust_df.package_spec`、`v_trd_sales_target_org_mi.package_spec`、`v_inv_dealer_cmdt_di.spec_desc`
- 口径：资料明确标注的商品箱规描述，与包装规格、包装单位和入数分别解释，不从文本未经核定地推算数量换算系数。

### 包装单位 `Product_package_unit`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.package_unit`
- 口径：商品主数据记录的包装计量单位，与同一商品的包装规格和入数配套。它不自动等同销售考核数量的基本单位。

### 入数 `Product_entry_count`

- 类型：integer
- 字段：`v_dim_cmdt_cmdt.entry_cnt`、`v_trd_dist_ord_dtl.entry_cnt`、`v_inv_dealer_cmdt_di.entry_cnt`
- 口径：一个标准包装单位内包含的商品数量。入数须与同一来源商品的包装规格对应；不能对所有商品一律解释为瓶数，也不能作为标箱系数使用。

### 主数据SKU个数 `Product_sku_count`

- 类型：integer
- 字段：`v_dim_cmdt_cmdt.sku_cnt`
- 口径：商品维表为具体商品记录的SKU个数。材料未说明其具体计数范围，不把该值当作门店活跃SKU数，也不替代按SKU编码去重的业务统计。

### 主数据SKU系数 `Product_sku_factor`

- 类型：decimal
- 字段：`v_dim_cmdt_cmdt.sku_factor`
- 口径：商品维表记录的SKU系数。该来源只明确称SKU系数，未证明它就是其他来源的标箱系数，不据此生成标箱数量计算。

### 所附标箱系数 `Product_standard_case_factor`

- 类型：decimal
- 字段：`v_trd_dist_ord_dtl.sku_factor`、`v_trd_sales_adjust_df.fin_std_coe`、`v_inv_dealer_cmdt_di.sku_factor`
- 口径：分销、销售调整或库存资料直接记录的商品标箱系数，按相应来源商品和数量口径使用。材料未给出完整基本单位换算规则，不直接混用不同来源数量，也不将商品维表仅标为SKU系数的字段并入。

### 包装类型 `Product_packaging_type`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.pack_type`、`v_trd_dist_ord_dtl.pack_type`、`v_trd_sales_adjust_df.pack_type`、`v_trd_sales_target_org_mi.pack_type`、`v_inv_dealer_cmdt_di.pack_type`
- 口径：商品资料记录的包装类型，用于区别包装形式，不同于包装单位、入数或容量。

### 容量 `Product_capacity`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.capacity`、`v_trd_dist_ord_dtl.capacity`、`v_trd_sales_adjust_df.capacity`、`v_inv_dealer_cmdt_di.capacity`
- 口径：商品资料直接记录的容量表达，按字符串保留数值及其单位，不预设全部采用同一单位。大包装水须在同一来源商品范围内同时满足行销类目为水且容量为4L、4.5L、5L、6L或12.9L，不能仅按容量或包装名称认定。

### 所附容量单位 `Product_capacity_unit`

- 类型：string
- 字段：`v_trd_sales_target_org_mi.capacity`
- 口径：组织销售目标数据设计标注的商品容量单位。当前按单位信息保存，不将其无条件解释为包含数值的容量规格。

### 特标标记 `Product_special_label_mark`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.spec_mark`
- 口径：商品主数据保存的是否特标标记。保留原取值，材料未说明编码，不自行转换为布尔值，也不与全标半标字段合并。

### 定制方名称 `Product_customizing_party_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.customize_name`
- 口径：商品主数据记录的定制方名称，不将该名称直接认定为已匹配的经销商或公司组织。

### 储运类型编码 `Product_storage_transport_type_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.store_trans_type`
- 口径：商品主数据的储运类型编码：1为冷链，2为非冷链。该类型描述商品储运要求，不表示门店渠道或销售服务范围。

### 储运类型 `Product_storage_transport_type_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.store_trans_type_name`、`v_trd_dist_ord_dtl.store_trans_type_name`、`v_trd_sales_adjust_df.store_trans_type_name`、`v_trd_sales_target_org_mi.store_trans_type_name`、`v_inv_dealer_cmdt_di.store_trans_type_name`
- 口径：商品资料直接记录的冷链或非冷链储运类型，不与商品类型或门店渠道混用。

### 商品状态编码 `Product_status_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.status`
- 口径：商品主数据保存的状态编码：1正常、2冻结、3停售、4终止。它是主数据所记录的状态，不是订单状态，也不能据此反推历史交易时商品状态。

### 商品状态 `Product_status_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.status_name`
- 口径：商品主数据记录的正常、冻结、停售或终止状态，与状态编码配套。最近状态变化时间另行记录，不据这些时间补造完整状态历史。

### 最近上架销售时间 `Product_latest_on_sale_time`

- 类型：dateTime
- 字段：`v_dim_cmdt_cmdt.on_sale_datetime`
- 口径：商品主数据保存的最近一次上架销售时间，不是首次上市日期，也不据此直接判定行销新品类别。

### 最近冻结时间 `Product_latest_frozen_time`

- 类型：dateTime
- 字段：`v_dim_cmdt_cmdt.frozen_datetime`
- 口径：商品主数据保存的最近一次冻结时间，不表示每个历史期间都处于冻结状态。

### 最近停售时间 `Product_latest_off_sale_time`

- 类型：dateTime
- 字段：`v_dim_cmdt_cmdt.off_sale_datetime`
- 口径：商品主数据保存的最近一次停售时间，与终止时间分别解释，不能将停售等同商品终止。

### 最近终止时间 `Product_latest_terminal_time`

- 类型：dateTime
- 字段：`v_dim_cmdt_cmdt.terminal_datetime`
- 口径：商品主数据保存的最近一次终止时间，不用最近停售时间或主数据更新时间替代。

### 主数据标准价 `Product_standard_price`

- 类型：decimal
- 字段：`v_dim_cmdt_cmdt.stand_price`
- 口径：商品主数据保存的标准价。资料未明确该字段的含税口径、币种和价格计量单位，不将其自动解释为每箱上单价，不按商品直接求和为销售金额。

### 不含税标准价 `Product_standard_price_excluding_tax`

- 类型：decimal
- 字段：`v_dim_cmdt_cmdt.wotax_stand_price`
- 口径：商品主数据直接保存的不含税标准价。币种和价格计量单位尚未说明；不在缺少税率时由另一标准价反推，也不作为销售金额求和。

### 所附标准上单价 `Product_recorded_standard_order_price`

- 类型：decimal
- 字段：`v_trd_dist_ord_dtl.stand_price`、`v_inv_dealer_cmdt_di.stand_price`
- 口径：分销或库存来源直接记载的商品标准上单价，不是实际考核成交单价、分销供价或折后供价。按对应分销行或库存日期、经销商、商品范围使用；资料未明确其主数据版本，不用它无条件覆盖商品维表标准价。

### 库存当时上单标准价 `Product_inventory_original_standard_order_price`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.cmdt_std_price_orgn`
- 口径：经销商库存记录明确保存的商品当时上单标准价，限定在同一库存日期、经销商和商品记录内。它与该记录另附的上单标准价分别保留，不解释为商品永久价格。

### 生产厂家 `Product_manufacturer`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.manufacture`
- 口径：商品主数据直接记录的生产厂家，不从销售客户或定制方名称推断。

### 长度 `Product_length`

- 类型：decimal
- 字段：`v_dim_cmdt_cmdt.length`
- 口径：商品主数据记录的长度，单位为厘米。材料未明确所测对象是单件还是包装，不自行作为单瓶或整箱尺寸使用。

### 宽度 `Product_width`

- 类型：decimal
- 字段：`v_dim_cmdt_cmdt.width`
- 口径：商品主数据记录的宽度，单位为厘米，与同一商品记录的长度、高度配套。

### 高度 `Product_height`

- 类型：decimal
- 字段：`v_dim_cmdt_cmdt.height`
- 口径：商品主数据记录的高度，单位为厘米，与同一商品记录的长度、宽度配套。

### 净重 `Product_net_weight`

- 类型：decimal
- 字段：`v_dim_cmdt_cmdt.net_weight`
- 口径：商品主数据记录的净重，计量单位读取同一商品记录的重量单位，不默认采用千克或克，也不跨不同单位直接合计。

### 毛重 `Product_gross_weight`

- 类型：decimal
- 字段：`v_dim_cmdt_cmdt.gross_weight`
- 口径：商品主数据记录的毛重，与同一商品记录的重量单位及净重对应，不以净重替代。

### 重量单位 `Product_weight_unit`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.weight_unit`
- 口径：商品主数据保存的重量计量单位，用于解释同一商品记录的净重和毛重。

### 体积 `Product_volume`

- 类型：decimal
- 字段：`v_dim_cmdt_cmdt.volume`
- 口径：商品主数据直接记录的体积，单位读取同一商品记录的体积单位。体积不同于饮品容量，不在材料未明确时由长宽高重新计算或替代容量字段。

### 体积单位 `Product_volume_unit`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.volume_unit`
- 口径：商品主数据保存的体积计量单位，用于解释同一商品记录的体积值，不作为饮品容量单位的替代来源。
