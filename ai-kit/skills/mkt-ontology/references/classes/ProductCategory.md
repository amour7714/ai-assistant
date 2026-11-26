# 品类 `ProductCategory`

- 分组：商品
- 父类：无

## 说明

由ctg_code、ctg_name等直接记录的产品品类，可用于商品、活动和费用事件分类。天然水又称红瓶水或红水，东方树叶又简称树叶；品类不同于三级类目、行销类目或合同品类。

## 指出的关系

无

## 指入的关系

- 商品 → 所属品类 `Product_category`
  商品资料的ctg_code、ctg_name记录所属品类，不以行销类目或合同品类替代。
- 分销订单行 → 交易品类 `DistributionOrderLine_category`
  分销行ctg_name记录该行商品品类，按所选交易范围解释。
- 实际销售考核明细 → 考核品类 `SalesAssessment_category`
  ctg_name直接记录考核商品品类，与合同品类及行销类目区分。
- 组织销售目标 → 目标品类 `OfficeSalesTarget_category`
  目标行直接记录的ctg字段限定其产品品类统计口径。
- 活动计划明细 → 涉及品类 `ActivityPlanDetail_category`
  ctg_code、ctg_name直接记录本活动明细的品类范围。
- 陈列签约 → 签约品类 `DisplaySigning_category`
  ctg_code、ctg_name记录签约陈列的品类，不以卡券支付商品品类替代。
- 陈列签约 → 卡券关联品类 `DisplaySigning_coupon_category`
  cpn_ctg_name直接记录本签约所附卡券商品品类，不与ctg_name签约品类混用。
- 门店陈列执行统计 → 执行品类 `DisplayExecutionSummary_category`
  ctg_name直接记录陈列执行统计的品类范围。
- 营销费用业务事件 → 事件产品品类 `ExpenseEvent_category`
  ctg_code记录事件单值产品品类，仅在适用业务条件下参与定位，不把品类条件推广到所有活动。
- 统案支持费用项 → 支持品类 `UnifiedSupportItem_category`
  ctg_name记录统案费用项品类范围，不由活动名称推导。
- 经销商商品库存 → 库存品类 `DealerInventory_category`
  ctg_name直接记录库存商品品类，与合同品类年累达成范围分别解释。
- 陈列支付卡券 → 关联商品品类 `DisplayPaymentCoupon_associated_product_category`
  陈列支付卡券在对应签约执行月记录中关联商品的产品品类，由v_mkt_dsp_actv_info_mi同一行的cpn_ctg_name提供名称引用，并与该行cpn_code、cpn_cmdt_name、dsp_id及execute_ym保持对应。它不同于ctg_name记录的签约陈列品类，不以同行ctg_code为卡券商品品类补码。不同签约或月份的品类引用分别保留，不扩大为该卡券全部期间的固定品类配置，也不凭名称宣称已完成品类编码匹配。

## 属性

### 品类编码 `ProductCategory_category_code`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.ctg_code`、`v_trd_sales_target_org_mi.ctg_code`、`v_mkt_market_actv_plan_verify_cost.ctg_code`、`v_mkt_dsp_actv_info_mi.ctg_code`、`v_fin_expense_wallet_change_dtl_mi.ctg_code`
- 口径：产品品类的编码，直接取ctg_code，不与商品编码、SKU编码、类目编码或合同品类编码混用。仅记录品类名称的来源不能据名称自行补出编码。

### 品类名称 `ProductCategory_category_name`

- 类型：string
- 字段：`v_dim_cmdt_cmdt.ctg_name`、`v_trd_dist_ord_dtl.ctg_name`、`v_trd_sales_adjust_df.ctg_name`、`v_trd_sales_target_org_mi.ctg_name`、`v_mkt_market_actv_plan_verify_cost.ctg_name`、`v_mkt_dsp_actv_info_mi.ctg_name`、`v_mkt_dsp_actv_info_mi.cpn_ctg_name`、`v_mkt_dsp_execute_mi.ctg_name`、`v_fin_expense_wallet_change_dtl_mi.ctg_name`、`v_mkt_unity_apply_alloc_df.ctg_name`、`v_mkt_unity_apply_alloc_df.dis_actv_brand_name`、`v_inv_dealer_cmdt_di.ctg_name`
- 口径：产品品类的名称，按来源中商品、目标、活动、签约、卡券或费用事件所引用的品类解释。天然水又称红瓶水、红水，东方树叶简称树叶，这些别称用于业务理解，不改写来源值。签约品类与卡券关联品类分别保留对应对象，不把三级类目、行销类目或合同品类名称作为本属性。
