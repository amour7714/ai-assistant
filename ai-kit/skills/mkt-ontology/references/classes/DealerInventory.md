# 经销商商品库存 `DealerInventory`

- 分组：交易
- 父类：无

## 说明

经销商持有或待接收某商品的库存状况，数量及金额按stat_date、dealer_range_code、cmdt_code配套记录，不跨日期相加为当前库存。在库仅含主仓、车仓而不含不良品仓；在途为已发货未入库；未发为本财年上单未发且剔除滞发，按原始送达方归属。总库存包含在库、在途及未发。分销周转天数又称库存周转天数，为同范围总库存金额除以前4周出库金额的二十四分之一，分母为零或缺失时不作有效天数解释。

## 指出的关系

- 库存销售客户 → 经销商 `DealerInventory_dealer`
  dealer_range_code记录库存所属客户；未发库存按材料规定的原始送达方口径解释。
- 库存商品 → 商品 `DealerInventory_product`
  cmdt_code与客户和stat_date共同限定库存数量、金额及出入库指标。
- 库存SKU → SKU `DealerInventory_sku`
  库存记录直接提供sku_code、sku_name，不能将商品库存重复展开后再次累计。
- 库存品类 → 品类 `DealerInventory_category`
  ctg_name直接记录库存商品品类，与合同品类年累达成范围分别解释。
- 记录办事处 → 办事处 `DealerInventory_recorded_office`
  org_code、org_name记录库存资料所附办事处，与明确标注当时的off_name区分。
- 记录大区 → 大区 `DealerInventory_recorded_district`
  p_org_name记录库存资料所附大区，与当时dis_name分别解释。
- 当时办事处 → 办事处 `DealerInventory_original_office`
  off_name明确记录库存业务当时办事处，不由org_name覆盖。
- 当时大区 → 大区 `DealerInventory_original_district`
  dis_name明确记录库存业务当时大区。
- 记录区域 → 公司组织 `DealerInventory_recorded_region`
  经销商商品库存资料直接附带的公司销售管理区域，由v_inv_dealer_cmdt_di同一行的p2_org_name记录，复用DealerInventory_recorded_region_name。区域引用与该行stat_date、dealer_range_code、cmdt_code及库存指标保持对应，不表示省市行政区划。它与reg_name记录的当时区域分别保留，不因名称相同而合并口径，不沿办事处或大区层级替代，也不据名称补造组织编码。
- 当时区域 → 公司组织 `DealerInventory_original_region`
  经销商商品库存记录直接注明的业务当时所属公司销售管理区域，由v_inv_dealer_cmdt_di同一行的reg_name记录，复用DealerInventory_original_region_name。联系保留该行stat_date、dealer_range_code、cmdt_code限定的库存范围，并与当时办事处、大区口径配套。它不等同p2_org_name所附区域，不由当前组织架构覆盖，也不通过大区层级推导替代；本来源仅提供名称，不据此认定组织编码已经匹配。

## 指入的关系

无

## 属性

### 库存日期 `DealerInventory_statistical_date`

- 类型：date
- 字段：`v_inv_dealer_cmdt_di.stat_date`
- 口径：stat_date记录库存观察日期，同一行库存、前4周出库和相关目标信息须保留该日期范围。

### 库存销售客户编码 `DealerInventory_dealer_range_code`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.dealer_range_code`
- 口径：本库存记录引用的经销商销售范围编码，与库存日期和商品共同限定数量、金额及附带指标。未发库存按原始送达方归属，不将该编码统一解释为销售售达方或考核方。

### 库存商品编码 `DealerInventory_product_code`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.cmdt_code`
- 口径：本库存记录对应的具体商品编码，与经销商和库存日期配套使用，不等同SKU编码。

### 库存SKU编码 `DealerInventory_sku_code`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.sku_code`
- 口径：库存记录直接引用的SKU编码，用于识别本商品库存所属的统计规格范围。按SKU汇总仍须保留库存日期，不重复展开商品库存。

### 库存品类名称 `DealerInventory_category_name`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.ctg_name`
- 口径：本库存商品所属品类的名称引用，例如天然水、东方树叶；不同于行销类目或合同品类。

### 合同品类名称 `DealerInventory_contract_category_name`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.contract_ctg_name`
- 口径：本库存记录所附的合同品类名称，与同一行合同品类年累达成率配套解释。合同品类范围不自动等同商品品类，也不表示该达成率属于单个商品。

### 记录办事处编码 `DealerInventory_recorded_office_code`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.org_code`
- 口径：库存资料所附办事处的编码引用，与明确标为当时办事处的off_name分开解释，不用它覆盖历史业务归属。

### 记录大区名称 `DealerInventory_recorded_district_name`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.p_org_name`
- 口径：库存资料所附大区的名称引用，与dis_name记录的当时大区不同，不因名称相同而混用两种归属。

### 记录区域名称 `DealerInventory_recorded_region_name`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.p2_org_name`
- 口径：库存资料所附上层区域组织的名称引用，与reg_name记录的当时区域分别保留，不解释为省市行政区划。

### 当时办事处名称 `DealerInventory_original_office_name`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.off_name`
- 口径：库存业务当时办事处的名称引用，不用库存资料另附的org_name或当前经销商所属办事处覆盖。

### 当时大区名称 `DealerInventory_original_district_name`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.dis_name`
- 口径：库存业务当时大区的名称引用，与当时办事处及区域配套，不由p_org_name表示的记录大区替代。

### 当时区域名称 `DealerInventory_original_region_name`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.reg_name`
- 口径：库存业务当时上层区域组织的名称引用，与同一行当时办事处、大区配套，不用当前组织层级回填。

### 自动发货标记 `DealerInventory_automatic_delivery_flag`

- 类型：string
- 字段：`v_inv_dealer_cmdt_di.auto_dlv_flag`
- 口径：本日期、经销商和商品库存记录所附的是否自动发货标记。它表示自动发货相关标记，不证明某批商品已经发货，也不替代在途或未发库存状态。

### 当时上单标准价 `DealerInventory_original_standard_order_price`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.cmdt_std_price_orgn`
- 口径：本库存记录所附的当时上单标准价，区别于stand_price另行记录的上单标准价。它不是库存金额，不能直接求和或用于无依据地重算已加工金额。

### 上单标准价 `DealerInventory_standard_order_price`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.stand_price`
- 口径：本库存记录另附的上单标准价，资料未明确其定价时点，不能仅因缺少orgn后缀就认定为当前价。指标材料以数量乘上单标准价再除以“税率”解释在库、在途及未发金额，但未明确税参数和采用哪一价格列，因此直接使用已加工金额，不据本字段重算。

### 标箱系数 `DealerInventory_standard_case_factor`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.sku_factor`
- 口径：本库存记录随附的商品标箱折算系数，与该行商品配套。库存及出入库数量的原始单位和系数换算方向尚未说明，不仅凭本系数生成标箱数量。

### 不良品仓库存数量 `DealerInventory_bad_warehouse_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.bad_inv_cnt`
- 口径：库存观察日经销商该商品在不良品仓的库存数量。它与主仓、车仓分开，不计入本材料定义的在库库存及由在库、在途、未发组成的总库存。

### 不良品仓库存金额 `DealerInventory_bad_warehouse_amount`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.bad_inv_amt`
- 口径：库存观察日经销商该商品在不良品仓的库存金额，单独解释，不追加到在库或总库存金额。

### 车仓库存数量 `DealerInventory_vehicle_warehouse_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.car_inv_cnt`
- 口径：库存观察日经销商该商品在车仓的库存数量，是在库库存数量的一部分，不能在汇总在库或总库存时再次追加。

### 车仓库存金额 `DealerInventory_vehicle_warehouse_amount`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.car_inv_amt`
- 口径：库存观察日经销商该商品在车仓的库存金额，属于在库库存金额中的车仓部分，不与在库金额重复相加。

### 在库库存数量 `DealerInventory_in_stock_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.in_inv_cnt`
- 口径：库存观察日经销商该商品已经入库的库存数量，仅含主仓和车仓，不含不良品仓。它是存量，不跨库存日期相加为当前库存。

### 在库库存金额 `DealerInventory_in_stock_amount`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.in_inv_amt`
- 口径：库存观察日经销商该商品在主仓、车仓中的库存金额，不含不良品仓。直接使用来源已加工金额，不自行用数量和价格重算。

### 在途库存数量 `DealerInventory_in_transit_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.on_way_cnt`
- 口径：库存观察日已经发货但经销商尚未入库的该商品数量，与已入库及尚未发货的数量分开。

### 在途库存金额 `DealerInventory_in_transit_amount`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.on_way_amt`
- 口径：库存观察日已经发货但经销商尚未入库的该商品库存金额。使用已加工金额，不把经销商向门店发货未签收的订单金额当作本在途库存。

### 未发库存数量 `DealerInventory_undelivered_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.un_dlv_inv_cnt`
- 口径：材料规定的本财年经销商已上单、尚未发货且剔除滞发的该商品数量，按原始送达方归属。未发包括尚未生成交货单，以及已生成交货单但货物移动状态不为C两种情况，不等同经销商向门店的未签收数量。

### 未发库存金额 `DealerInventory_undelivered_amount`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.un_dlv_inv_amt`
- 口径：材料规定的本财年已上单、尚未发货且剔除滞发的该商品金额，按上单的原始送达方归属。尚未生成交货单和交货单货物移动状态不为C均属于未发范围；金额直接采用来源已加工值。

### 总库存数量 `DealerInventory_total_inventory_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.inv_cnt`
- 口径：库存观察日经销商该商品的总库存数量，包含在库、在途和未发三部分。车仓已属于在库，不再另加车仓或不良品仓数量；不跨日期累计为当前库存。

### 总库存金额 `DealerInventory_total_inventory_amount`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.inv_amt`
- 口径：库存观察日经销商该商品的总库存金额，业务定义为在库金额加在途金额加未发金额。车仓已计入在库，不再追加车仓或不良品仓金额；它是周转天数的分子，不跨日期相加。

### 其他出库数量 `DealerInventory_recorded_other_outbound_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.qtck_inv_box_cnt`
- 口径：库存宽表随观察日提供的本经销商、本商品其他出库数量，不是库存余额。其实际发生期间未说明，不能仅凭stat_date将其解释为当日发生量。

### 报损出库数量 `DealerInventory_recorded_loss_outbound_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.bsck_inv_box_cnt`
- 口径：库存宽表随观察日提供的本经销商、本商品报损出库数量，不等同不良品仓库存数量。实际发生期间未说明，不直接按当日流量解释。

### 分销出库数量 `DealerInventory_recorded_distribution_outbound_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.fxck_inv_box_cnt`
- 口径：库存宽表随观察日提供的本经销商、本商品分销出库数量。它是库存出库口径，不自动等同按门店签收或退货确认期间统计的分销数量；具体发生期间待确认。

### 调拨出库数量 `DealerInventory_recorded_transfer_outbound_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.dbck_inv_box_cnt`
- 口径：库存宽表随观察日提供的本经销商、本商品调拨出库数量，与调拨入库分别保留，不直接以二者差额替代库存。实际发生期间待确认。

### 其他入库数量 `DealerInventory_recorded_other_inbound_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.qtrk_inv_box_cnt`
- 口径：库存宽表随观察日提供的本经销商、本商品其他入库数量，不是已经入库的库存存量。实际发生期间未说明，不直接按当日流量解释。

### 退货入库数量 `DealerInventory_recorded_return_inbound_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.thrk_inv_box_cnt`
- 口径：库存宽表随观察日提供的本经销商、本商品退货入库数量。库存入库与分销退货确认是不同业务口径，不能仅凭名称将本值替代分销退货数量；实际发生期间待确认。

### 采购入库数量 `DealerInventory_recorded_purchase_inbound_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.cgrk_inv_box_cnt`
- 口径：库存宽表随观察日提供的本经销商、本商品采购入库数量，表示入库口径，不因已上单或已发货就视为已入库。实际发生期间待确认。

### 调拨入库数量 `DealerInventory_recorded_transfer_inbound_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.dbrk_inv_box_cnt`
- 口径：库存宽表随观察日提供的本经销商、本商品调拨入库数量，与调拨出库分别解释。实际发生期间待确认，不直接按库存观察日发生量累计。

### 前4周出库数量 `DealerInventory_four_week_outbound_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.outstock_cnt_4week`
- 口径：以本库存观察日期为参照、来源记录的本经销商本商品前4周出库数量。它是期间出库量，不是当前库存，也不直接等同前4周门店分销签收数量。

### 前4周出库金额 `DealerInventory_four_week_outbound_amount`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.outstock_amt_4week`
- 口径：以本库存观察日期为参照、来源记录的本经销商本商品前4周出库金额。计算周转天数时固定除以24得到日均出库额，不改用自然日数或业务日历天数；不以门店分销签收金额替代其出库口径。

### 分销周转天数 `DealerInventory_distribution_turnover_days`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.inv_amt`、`v_inv_dealer_cmdt_di.outstock_amt_4week`
- 口径：又称库存周转天数，表示本库存范围的总库存金额按前4周日均出库额计算的预计可用天数，单位为天。计算为inv_amt / (outstock_amt_4week / 24)，其中24为固定业务常量。汇总到经销商、SKU、品类或组织时，须限定同一库存日期和一致客户商品范围，先分别合计分子、分母再相除，不加总或简单平均商品天数。分母为零或缺失时结果未定义，不能解释为有效周转天数。

### 附带折算年度目标 `DealerInventory_recorded_annualized_target`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.cvt_target_cy`
- 口径：库存记录随附的折算年度目标值，与该行库存日期及业务范围保留对应。资料未明确其目标主体、计量单位和适用财年，不能直接将商品行或不同库存日期的值累加为经销商年度目标，也不因同名字段而与月度销售目标来源互换。

### 商品下月预算 `DealerInventory_next_month_product_budget`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.cmdt_target_nm`
- 口径：库存记录随附的本商品下月预算值，不是当前库存。下月采用来源字段的业务期间含义，资料未明确它属于自然月还是销售财务月，也未说明按金额还是数量计量，不能直接与库存金额或数量比较。

### 需求订单数量 `DealerInventory_demand_order_quantity`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.demand_cnt`
- 口径：本库存记录随附的经销商、商品需求订单数量。它与库存数量分开，不能仅凭同处一行就认定等于未发库存数量；需求订单覆盖期间及业务状态范围尚未说明。

### 需求订单金额 `DealerInventory_demand_order_amount`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.demand_amt`
- 口径：本库存记录随附的经销商、商品需求订单金额，与同一行需求订单数量配套。它不是总库存或未发库存金额，覆盖期间、订单状态范围及计价口径待确认。

### 合同品类年累达成率 `DealerInventory_contract_category_achievement_rate_ytd`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.contract_ctg_achv_rate_ytd`
- 口径：库存观察记录随附的合同品类范围年累达成率，与同一行经销商及contract_ctg_name配套解释，不提升为单个商品的达成率。直接采用已加工比率；相同合同品类随多个商品行出现时，不按商品相加或任意平均，财年、截止时点及具体达成基数待确认。

### 销售客户年累达成率 `DealerInventory_dealer_achievement_rate_ytd`

- 类型：decimal
- 字段：`v_inv_dealer_cmdt_di.dealer_achv_rate_ytd`
- 口径：库存观察记录随附的销售客户范围年累达成率，不是本库存商品的单品达成率，也不与合同品类年累达成率混用。它与库存观察日期配套，不能按商品行或日期累加；财年、截止时点及具体达成基数待确认。
