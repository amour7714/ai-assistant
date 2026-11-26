# SKU `SKU`

- 分组：商品
- 父类：无

## 说明

公司按sku_code和sku_name识别的商品统计规格对象。一个商品通过主数据归入SKU，SKU去重与商品编码去重不同；不能仅凭AC字段名为sku就认定外部统计项目属于本类。

## 指出的关系

无

## 指入的关系

- 商品 → 归入SKU `Product_sku`
  商品资料直接记录所属sku_code和sku_name，商品编码与SKU编码各自识别不同粒度对象。
- 分销订单行 → 交易SKU `DistributionOrderLine_sku`
  分销行直接记录sku_code，用于期间门店与SKU对应及活跃SKU统计，不仅依赖当前商品主数据反推。
- 实际销售考核明细 → 考核SKU `SalesAssessment_sku`
  实际考核明细直接记录sku_code、sku_name，用于同口径销售统计。
- 组织销售目标 → 目标SKU `OfficeSalesTarget_sku`
  组织销售目标来源直接记录sku_code、sku_name，不能把目标重复展开到各商品后再次累计。
- 活动计划明细 → 涉及SKU `ActivityPlanDetail_sku`
  sku_code直接记录明细涉及的SKU，不据关联商品数量重复分配计划金额。
- 经销商商品库存 → 库存SKU `DealerInventory_sku`
  库存记录直接提供sku_code、sku_name，不能将商品库存重复展开后再次累计。

## 属性

### SKU编码 `SKU_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sku_code`、`v_trd_dist_ord_dtl.sku_code`、`v_trd_sales_adjust_df.sku_code`、`v_trd_sales_target_org_mi.sku_code`、`v_mkt_market_actv_plan_verify_cost.sku_code`、`v_inv_dealer_cmdt_di.sku_code`
- 口径：公司内部商品统计规格的编码，由sku_code直接记录，不等同商品编码cmdt_code。单个门店的SKU数在该门店范围内按SKU编码去重；汇总各门店SKU数时须保留门店与SKU的配对。活跃SKU限定统计期间和门店，须存在分销数量大于0、商品性质为活动本品、普通本品或特价商品，且订单类型不为分销退货、库存盘点的分销记录，不是SKU的永久状态。

### SKU名称 `SKU_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.sku_name`、`v_trd_dist_ord_dtl.sku_name`、`v_trd_sales_adjust_df.sku_name`、`v_trd_sales_target_org_mi.sku_name`、`v_mkt_market_actv_plan_verify_cost.sku_name`、`v_inv_dealer_cmdt_di.sku_name`
- 口径：来源记录直接记载的公司内部SKU名称，与同一记录的sku_code配套使用。不同于具体商品全称、包装规格字段及AC外部产品统计项目名称；业务记录中的名称按该来源记录解释，不自行用当前主数据名称覆盖。

### SKU容量 `SKU_capacity`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.capacity`、`v_trd_dist_ord_dtl.capacity`、`v_trd_sales_adjust_df.capacity`、`v_inv_dealer_cmdt_di.capacity`
- 口径：SKU商品统计规格的容量表示，保留来源字段的原始表达，不自行统一换算为升或毫升，也不与入数、箱规或包装数量混用。业务知识中的大包装水须同时满足行销类目为水，且容量为4L、4.5L、5L、6L或12.9L；仅容量命中不足以判为大包装水。
