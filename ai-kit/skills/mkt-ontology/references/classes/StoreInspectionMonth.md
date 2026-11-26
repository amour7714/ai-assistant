# 门店月度稽查结果 `StoreInspectionMonth`

- 分组：稽查
- 父类：无

## 说明

稽查对一个门店在一个月的检查结果汇总，以ym和cust_code对应，包含铺货、陈列赢比、设备盘点、纯净度及货龄等标签和计数，不是逐设备或逐次检查明细。赢比按指定项目和周期采用已加工标签。材料明确规定水堆位置赢比、水堆数量赢比按赢家门店数除以赢家门店数加输家门店数计算，不包含平；这一分母规则不推广到所有位置或数量比较。我司冰柜第一位置占比针对门口或收银台附近、我司有且竞品有或无的冰柜检查门店，不包含仅竞品有而我司无的范围。在同一统计期间和业务范围内，分子为door_pos_win_cust_cnt=1的cust_code去重数，分母为door_check_flag=1的cust_code去重数，不以赢家数加输家数替代分母，也不与一般bg_position_wrat_*冰柜位置标签混用。普通柜纯净度按台，多门柜按家，组合指标保留混合计量口径。5sku_flag表示检查铺货结果，不能替代根据签收记录判断的5水SKU分销状态。

## 指出的关系

- 被检查门店 → 门店 `StoreInspectionMonth_store`
  cust_code记录该月稽查对象；本表没有子门店编码，不能把结果自动复制为各子门店独立检查。
- 记录所属销售客户 → 经销商 `StoreInspectionMonth_dealer`
  dealer_range_code记录该月检查结果所附所属销售客户。
- 记录服务销售客户 → 经销商 `StoreInspectionMonth_service_dealer`
  serv_dealer_range_code记录该月检查结果所附服务销售客户，保留服务身份。
- 记录业代 → 业代 `StoreInspectionMonth_representative`
  emp_code记录该月门店对应业代，不表示该业代就是稽查检查人。
- 记录主任 → 主任 `StoreInspectionMonth_supervisor`
  p_emp_code记录检查结果所附主任，不据此推导检查执行人。
- 记录线路 → 线路 `StoreInspectionMonth_route`
  route_code记录该月被检查门店的线路归属。
- 月度办事处 → 办事处 `StoreInspectionMonth_office`
  off_code、off_name记录月度检查归属办事处，与now_off_name当前口径区分。
- 月度大区 → 大区 `StoreInspectionMonth_district`
  dis_name直接记录月度检查归属大区，不由now_dis_name覆盖。
- 当前办事处 → 办事处 `StoreInspectionMonth_current_office`
  now_off_name记录结果所附当前办事处，不表示稽查月当时归属。
- 当前大区 → 大区 `StoreInspectionMonth_current_district`
  now_dis_name记录结果所附当前大区，与月度大区分别保留。
- 月度区域 → 公司组织 `StoreInspectionMonth_region`
  门店月度稽查结果在该月记录中直接注明的公司销售管理区域，由v_chl_jc_cust_mi的reg_name引用，复用StoreInspectionMonth_region_name。联系与同一行ym、cust_code及检查结果配套，区别于资料所附当前区域；不沿当前大区层级替代这一直接联系，也不据名称补造区域编码。
- 当前区域 → 公司组织 `StoreInspectionMonth_current_region`
  门店月度稽查结果资料直接附带的当前公司销售管理区域，由v_chl_jc_cust_mi的now_reg_name引用，复用StoreInspectionMonth_current_region_name。该联系保留在对应ym、cust_code结果记录中，仅说明所附当前范围，不表示稽查月当时的归属；不覆盖reg_name记录的月度区域，也不以ym推定当前归属的取值日期。
- 记录销售总监 → 员工 `StoreInspectionMonth_sales_director`
  门店月度稽查结果资料直接引用的销售总监，由v_chl_jc_cust_mi同一ym、cust_code记录中的sales_mg_name提供名称引用，复用StoreInspectionMonth_sales_director_name及Employee_name的对应来源。联系保留该月、该门店稽查记录的人员对应，不表示销售总监是实际检查人，也不将该人员自动认定为业代或主任。仅有姓名不能保证唯一识别员工，本关系不表示已完成与人员主数据员工编码的匹配。

## 指入的关系

无

## 属性

### 稽查月份 `StoreInspectionMonth_month`

- 类型：string
- 字段：`v_chl_jc_cust_mi.ym`
- 口径：本门店检查结果所属ym，所有标签与计数均限定在对应月度记录。

### 被检查门店编码 `StoreInspectionMonth_store_code`

- 类型：string
- 字段：`v_chl_jc_cust_mi.cust_code`
- 口径：本月稽查结果对应的终端客户编码，与稽查月份共同识别结果；不是子门店编码。

### 记录门店名称 `StoreInspectionMonth_store_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.cust_name`
- 口径：本月稽查结果所附的被检查门店名称，不用当前门店资料覆盖本记录。

### 所属销售客户编码 `StoreInspectionMonth_dealer_range_code`

- 类型：string
- 字段：`v_chl_jc_cust_mi.dealer_range_code`
- 口径：本月检查结果记录的所属销售客户编码，与服务销售客户编码分别保留。

### 所属销售客户名称 `StoreInspectionMonth_dealer_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.dealer_name`
- 口径：本月检查结果所附所属销售客户的名称。

### 所属销售客户SAP编码 `StoreInspectionMonth_dealer_sap_code`

- 类型：string
- 字段：`v_chl_jc_cust_mi.sap_code`
- 口径：本月检查结果所附所属销售客户的SAP编码，不与销售范围编码互换。

### 服务销售客户编码 `StoreInspectionMonth_service_dealer_range_code`

- 类型：string
- 字段：`v_chl_jc_cust_mi.serv_dealer_range_code`
- 口径：本月检查结果记录的服务销售客户编码，不用所属销售客户编码补值。

### 服务销售客户名称 `StoreInspectionMonth_service_dealer_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.serv_dealer_name`
- 口径：本月检查结果所附服务销售客户的名称。

### 服务销售客户SAP编码 `StoreInspectionMonth_service_dealer_sap_code`

- 类型：string
- 字段：`v_chl_jc_cust_mi.serv_sap_code`
- 口径：本月检查结果所附服务销售客户的SAP编码，与所属销售客户SAP编码表示不同参与身份。

### 记录业代编码 `StoreInspectionMonth_representative_code`

- 类型：string
- 字段：`v_chl_jc_cust_mi.emp_code`
- 口径：本月检查结果所附门店业代的编码，不表示该人员就是实际稽查检查人。

### 记录业代姓名 `StoreInspectionMonth_representative_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.emp_name`
- 口径：本月检查结果所附门店业代的姓名。

### 记录主任编码 `StoreInspectionMonth_supervisor_code`

- 类型：string
- 字段：`v_chl_jc_cust_mi.p_emp_code`
- 口径：本月检查结果所附主任的编码，不据此推断主任参与执行检查。

### 记录主任姓名 `StoreInspectionMonth_supervisor_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.p_emp_name`
- 口径：本月检查结果所附主任的姓名。

### 记录线路编码 `StoreInspectionMonth_route_code`

- 类型：string
- 字段：`v_chl_jc_cust_mi.route_code`
- 口径：本月检查结果所附门店线路号，与同一记录的门店、人员及月份对应。

### 月度办事处编码 `StoreInspectionMonth_office_code`

- 类型：string
- 字段：`v_chl_jc_cust_mi.off_code`
- 口径：本月稽查结果记录的办事处编码，不用所附当前办事处口径替代。

### 月度办事处名称 `StoreInspectionMonth_office_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.off_name`
- 口径：本月稽查结果记录的办事处名称，与当前办事处名称分别解释。

### 月度大区名称 `StoreInspectionMonth_district_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.dis_name`
- 口径：本月稽查结果直接记录的大区名称，不由当前大区或当前组织层级覆盖。

### 当前办事处名称 `StoreInspectionMonth_current_office_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.now_off_name`
- 口径：检查结果所附当前办事处名称，不表示稽查月份当时的办事处归属。

### 当前大区名称 `StoreInspectionMonth_current_district_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.now_dis_name`
- 口径：检查结果所附当前大区名称，与稽查月度大区归属不同。

### 记录子渠道 `StoreInspectionMonth_channel_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.channel_name`
- 口径：本月检查结果所附门店的子渠道名称，不等同生动化渠道或渠道群。

### 记录生动化渠道 `StoreInspectionMonth_vivid_channel_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.p_channel_name`
- 口径：本月检查结果所附门店的生动化渠道名称，与子渠道保持层级区别。

### 记录渠道群 `StoreInspectionMonth_channel_group_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.p2_channel_name`
- 口径：本月检查结果所附门店的渠道群名称，不与子渠道名称互换。

### 记录门店状态 `StoreInspectionMonth_store_status_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.cust_status_name`
- 口径：本月检查结果所附的终端客户状态，不是检查是否完成或检查是否合格的状态。

### 记录合约店身份 `StoreInspectionMonth_contract_store_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.is_conshop_name`
- 口径：本月检查结果所附门店是否为合约店的名称值。合约店身份不能单独证明门店协议已经确认通过。

### 记录付费门店身份 `StoreInspectionMonth_paid_store_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.is_pay_name`
- 口径：本月检查结果所附门店是否付费的名称值。不能直接替代子门店月表的常规付费标记或陈列付费门店分类。

### 记录门店协议状态 `StoreInspectionMonth_agreement_status`

- 类型：string
- 字段：`v_chl_jc_cust_mi.cust_agreement_status`
- 口径：本月检查结果所附的门店协议状态，与是否合约店的身份信息分别保留；不直接解释为检查合格状态。

### 记录门店市场级别 `StoreInspectionMonth_market_level_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.market_level_name`
- 口径：本月检查结果记录的终端客户市场级别名称，不同于行政区划类别或销售客户市场等级。

### 记录行政区划类别 `StoreInspectionMonth_administrative_area_category`

- 类型：string
- 字段：`v_chl_jc_cust_mi.market_level`
- 口径：本月检查结果所附门店的行政区划类别。知识中的乡镇市场指该类别为乡或镇，不用市场级别名称替代。

### 销售客户稽查分类 `StoreInspectionMonth_dealer_inspection_group`

- 类型：string
- 字段：`v_chl_jc_cust_mi.dealer_jc_group_name`
- 口径：本月检查结果所附销售客户的稽查分类，用于解释或筛选该检查记录的稽查客户范围，不等同销售客户类型。

### 所属销售客户市场等级 `StoreInspectionMonth_dealer_market_level`

- 类型：string
- 字段：`v_chl_jc_cust_mi.dealer_mkt_level`
- 口径：本月检查结果所附所属销售客户的市场等级，与服务销售客户市场等级分别保留。

### 服务销售客户市场等级 `StoreInspectionMonth_service_dealer_market_level`

- 类型：string
- 字段：`v_chl_jc_cust_mi.ser_dealer_mkt_level`
- 口径：本月检查结果所附服务销售客户的市场等级，不能套用于所属销售客户。

### 赢比检查标记 `StoreInspectionMonth_compare_check_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.check_cust_flag`
- 口径：表示本月门店是否被纳入赢比检查。指标材料以取值1识别赢比检查门店，并按cust_code去重计数；不能作为所有检查项目均已完成的证明。

### 铺货检查标记 `StoreInspectionMonth_sku_check_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.sku_check_flag`
- 口径：本月门店铺货检查的已加工标记。不能借用范围外SKU检查明细表中同名字段的解释，将其直接认定为某个指定商品已铺货。

### 铺货SKU数量 `StoreInspectionMonth_distribution_sku_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.sku_check_cnt`
- 口径：本月门店检查结果记录的铺货SKU数量，单位为SKU个数，不是依据签收订单计算的分销活跃SKU数。

### 记录SKU数量 `StoreInspectionMonth_recorded_sku_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.sku_cnt`
- 口径：本月门店检查结果另行记录的SKU数量。资料未说明其具体统计集合，不能与铺货SKU数量或分销SKU数量合并。

### 水5SKU铺货标记 `StoreInspectionMonth_water_five_sku_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.5sku_flag`
- 口径：本月稽查检查形成的水5SKU铺货结果标签，指标材料以取值1识别水5SKU铺货门店。水5SKU铺货率按这些门店数除以赢比检查门店数计算，不是按签收记录判断的5水SKU分销状态。

### 无铺货标记 `StoreInspectionMonth_no_distribution_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.no_dstb_cust_flag`
- 口径：本月稽查记录的无铺货标签，不表示该门店本月没有分销订单或分销金额不大于零。

### 水堆我司有标记 `StoreInspectionMonth_water_stack_company_present_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.watrea_wrat_nf_flag`
- 口径：本月水堆赢比检查记录的我司有水堆标签。指标材料以取值1识别我司水堆赢比检查门店；其覆盖率分母为赢比检查门店数，不是水堆输赢门店数。

### 水堆竞品有标记 `StoreInspectionMonth_water_stack_competitor_present_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.watrea_wrat_ot_flag`
- 口径：本月水堆赢比检查记录的竞品水堆标签，与我司有水堆标签分别保留，不假定两者互斥。

### 水堆位置赢标记 `StoreInspectionMonth_water_stack_position_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.sd_position_wrat_win_flag`
- 口径：本月水堆位置比较为赢的已加工标签，取值1用于识别赢家。水堆位置赢比为赢家数除以赢家数加输家数，不包含位置平的门店。

### 水堆位置输标记 `StoreInspectionMonth_water_stack_position_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.sd_position_wrat_loser_flag`
- 口径：本月水堆位置比较为输的已加工标签，取值1用于识别输家，与赢和平分别保留。

### 水堆位置平标记 `StoreInspectionMonth_water_stack_position_even_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.sd_position_wrat_even_flag`
- 口径：本月水堆位置比较为平的标签。平不是输，计算水堆位置赢比时不纳入输赢分母。

### 水堆数量赢标记 `StoreInspectionMonth_water_stack_quantity_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.sd_number_wrat_win_flag`
- 口径：本月水堆数量比较为赢的已加工标签，取值1用于识别赢家。水堆数量赢比为赢家数除以赢家数加输家数，不包含数量平的门店。

### 水堆数量输标记 `StoreInspectionMonth_water_stack_quantity_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.sd_number_wrat_loser_flag`
- 口径：本月水堆数量比较为输的已加工标签，取值1用于识别输家，不与数量平合并。

### 水堆数量平标记 `StoreInspectionMonth_water_stack_quantity_even_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.sd_number_wrat_even_flag`
- 口径：本月水堆数量比较为平的标签，计算水堆数量赢比时不计入输赢分母。

### 冰柜位置赢标记 `StoreInspectionMonth_freezer_position_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.bg_position_wrat_win_flag`
- 口径：本月冰柜位置比较为赢的标签，与门口冰柜位置赢标签是分别记录的检查结果，不能互换。

### 冰柜位置输标记 `StoreInspectionMonth_freezer_position_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.bg_position_wrat_loser_flag`
- 口径：本月冰柜位置比较为输的标签，与位置平结果分别保留。

### 冰柜位置平标记 `StoreInspectionMonth_freezer_position_even_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.bg_position_wrat_even_flag`
- 口径：本月冰柜位置比较为平的标签，不当作位置输结果。

### 门口冰柜检查标记 `StoreInspectionMonth_door_freezer_check_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.door_check_flag`
- 口径：本月门店的门口或收银台附近冰柜检查标签。用于我司冰柜第一位置占比时，取值1识别我司有且竞品无、或我司有且竞品有的检查门店，不包含仅竞品有而我司无的范围。该指标分母是在同一统计期间和业务范围内，本标记为1的cust_code去重数，不采用赢家数加输家数，也不使用一般冰柜位置赢、输、平标签替代。

### 门口冰柜我司在标记 `StoreInspectionMonth_door_freezer_company_present_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.door_pos_nf_cust_flag`
- 口径：本月门口冰柜检查记录的我司在标签，与门口检查标签及位置赢标签分别保留。

### 门口冰柜位置赢标记 `StoreInspectionMonth_door_freezer_position_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.door_pos_win_cust_cnt`
- 口径：本月门口或收银台附近冰柜检查中，我司有且竞品有或无、并且我司位置为赢的已加工标签。虽然字段名含cnt，字段说明及指标用法均为标记，不能直接求和作为设备数量或检查次数。我司冰柜第一位置占比分子按本标记取值1的cust_code去重，分母按同一统计期间和业务范围内door_check_flag=1的cust_code去重。该指标不包含仅竞品有而我司无的检查范围，不与bg_position_wrat_win_flag等一般冰柜位置标签混用。

### 货架我司有标记 `StoreInspectionMonth_shelf_company_present_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.slv_wrat_nf_flag`
- 口径：本月货架赢比检查项目中的我司标签，与竞品标签分别保留。

### 货架竞品有标记 `StoreInspectionMonth_shelf_competitor_present_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.slv_wrat_ot_flag`
- 口径：本月货架赢比检查项目中的竞品标签，不由我司标签取补集。

### 货架位置赢标记 `StoreInspectionMonth_shelf_position_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.slv_pos_win_cust_flag`
- 口径：本月货架位置比较为赢的已加工标签，不表示货架数量比较也为赢。

### 货架位置输标记 `StoreInspectionMonth_shelf_position_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.slv_pos_lose_cust_flag`
- 口径：本月货架位置比较为输的已加工标签，不根据位置赢标签的空值反推。

### 货架数量检查标记 `StoreInspectionMonth_shelf_quantity_check_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.slv_num_cust_flag`
- 口径：本月门店货架数量检查的标签，与该项目数量赢、输结果分别保留。

### 货架数量赢标记 `StoreInspectionMonth_shelf_quantity_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.slv_num_win_cust_flag`
- 口径：本月货架数量比较为赢的已加工标签。

### 货架数量输标记 `StoreInspectionMonth_shelf_quantity_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.slv_num_lose_cust_flag`
- 口径：本月货架数量比较为输的已加工标签。

### 冰道数量检查标记 `StoreInspectionMonth_ice_lane_quantity_check_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.bd_num_cust_flag`
- 口径：本月门店冰道数量检查的标签，不等同冰柜设备检查或水冰冻层数达标标签。

### 冰道数量赢标记 `StoreInspectionMonth_ice_lane_quantity_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.bd_num_win_cust_flag`
- 口径：本月冰道数量比较为赢的已加工标签。

### 冰道数量输标记 `StoreInspectionMonth_ice_lane_quantity_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.bd_num_lose_cust_flag`
- 口径：本月冰道数量比较为输的已加工标签。

### 冰道数量 `StoreInspectionMonth_ice_lane_quantity`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.bd_watrea_num`
- 口径：本月检查结果记录的冰道数量，不是冰柜台数、水堆箱数或冰冻层数。

### 水冰冻数量赢标记 `StoreInspectionMonth_water_frozen_quantity_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.wfr_num_win_cust_flag`
- 口径：本月水冰冻数量比较为赢的标签，不表示达到某个固定冰冻层数门槛。

### 水冰冻数量输标记 `StoreInspectionMonth_water_frozen_quantity_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.wfr_num_lose_cust_flag`
- 口径：本月水冰冻数量比较为输的已加工标签。

### 饮料冰冻数量赢标记 `StoreInspectionMonth_beverage_frozen_quantity_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.dfr_num_win_cust_flag`
- 口径：本月饮料冰冻数量比较为赢的已加工标签，与水冰冻数量比较分别记录。

### 饮料冰冻数量输标记 `StoreInspectionMonth_beverage_frozen_quantity_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.dfr_num_lose_cust_flag`
- 口径：本月饮料冰冻数量比较为输的已加工标签。

### 全部包装赢标记 `StoreInspectionMonth_all_packages_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.nf_all_win_flag`
- 口径：本月全部包装比较为赢的已加工标签，不由大包装和中水包装赢标签组合推导。

### 全部包装输标记 `StoreInspectionMonth_all_packages_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.nf_all_lose_flag`
- 口径：本月全部包装比较为输的已加工标签。

### 我司大包装赢标记 `StoreInspectionMonth_large_package_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.nf_dbz_win_flag`
- 口径：本月我司大包装比较为赢的已加工标签，不仅凭我司与竞品箱数大小重新判断。

### 我司大包装输标记 `StoreInspectionMonth_large_package_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.nf_dbz_lose_flag`
- 口径：本月我司大包装比较为输的已加工标签。

### 我司中水装赢标记 `StoreInspectionMonth_medium_water_package_win_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.nf_zs_win_flag`
- 口径：本月我司中水装比较为赢的已加工标签，与大包装比较分别记录。

### 我司中水装输标记 `StoreInspectionMonth_medium_water_package_lose_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.nf_zs_lose_flag`
- 口径：本月我司中水装比较为输的已加工标签。

### 我司大包装箱数 `StoreInspectionMonth_company_large_package_boxes`

- 类型：decimal
- 字段：`v_chl_jc_cust_mi.nf_dbz_box`
- 口径：本月检查结果记录的我司大包装数量，单位为箱；不是该月分销签收箱数，包装范围按稽查记录解释。

### 竞品大包装箱数 `StoreInspectionMonth_competitor_large_package_boxes`

- 类型：decimal
- 字段：`v_chl_jc_cust_mi.other_dbz_box`
- 口径：本月检查结果记录的竞品大包装箱数，与同一门店月份的我司大包装箱数对应。

### 我司中水装箱数 `StoreInspectionMonth_company_medium_water_package_boxes`

- 类型：decimal
- 字段：`v_chl_jc_cust_mi.nf_zs_box`
- 口径：本月检查结果记录的我司中水装数量，单位为箱；不自行给中水装指定容量范围。

### 竞品中水装箱数 `StoreInspectionMonth_competitor_medium_water_package_boxes`

- 类型：decimal
- 字段：`v_chl_jc_cust_mi.other_zs_box`
- 口径：本月检查结果记录的竞品中水装箱数，与同一行我司中水装箱数保持对应。

### 普通柜纯净度检查台数 `StoreInspectionMonth_ordinary_freezer_purity_check_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.dev_check_cnt`
- 口径：本月门店普通柜纯净度检查的设备台数。指标材料中的普通柜排除暖柜、卧式小冰柜、设备编码以SDCY开头的终端品餐饮柜及多门柜，并限定设备层数不少于5层。材料另将本字段用于普通柜实盘指标，但其与dev_cnt的口径冲突尚未核定。

### 普通柜纯净度合格台数 `StoreInspectionMonth_ordinary_freezer_purity_pass_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.dev_check_pass_cnt`
- 口径：本月门店普通柜纯净度合格的台数。指标材料的合格标准为：单门5层柜冰冻不少于4层，单门6或7层柜不少于5层，双门且总层数小于14层的柜不少于10层，双门14层柜不少于12层。该字段为已加工合格台数，不是逐设备判断明细。

### 普通柜实盘台数 `StoreInspectionMonth_ordinary_freezer_actual_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.dev_cnt`
- 口径：本月检查结果中按字段说明记录的我司普通柜实盘台数。不能在口径未核定时与纯净度检查台数dev_check_cnt互换。

### 普通柜合格台数 `StoreInspectionMonth_ordinary_freezer_pass_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.pass_dev_cnt`
- 口径：本月检查结果另行记录的我司普通柜合格台数。字段说明未明确其是否与纯净度合格台数完全相同，暂不合并两项。

### 多门柜纯净度检查家数 `StoreInspectionMonth_multi_freezer_purity_check_household_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.if_multi_check`
- 口径：本月门店记录的多门柜纯净度检查家数，计量单位为家，不是多门柜设备台数或门数。

### 多门柜纯净度合格家数 `StoreInspectionMonth_multi_freezer_purity_pass_household_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.if_pass_multi_check`
- 口径：本月门店记录的多门柜纯净度合格家数，单位为家。指标材料按门店判断多门柜纯净度，一店多台时至少一台合格即认为门店合格；但相关指标名称、定义和字段对应存在交叉冲突，当前只保留源字段的合格家数。

### 多门柜检查标记 `StoreInspectionMonth_multi_freezer_check_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.multi_check_flag`
- 口径：本月多门柜检查的已加工标签。数据设计将其标为检查标记，指标材料又将其用于实盘家数且配有纯净度合格定义，不能据此把检查、实盘和合格三种含义合并。

### 多门柜纯净度合格标记 `StoreInspectionMonth_multi_freezer_purity_pass_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.multi_check_pass_flag`
- 口径：本月记录的多门柜纯净度合格标签。指标材料给出的多门柜合格规则涉及采购入库时间、我司陈列门数占投放总门数比例及一家门店至少一台合格：采购时间在2024财年之后或为空时门槛为60%，之前为50%，采购时间取最早值。该规则与当前字段实现的对应尚未核定，不能据此重新判定本月标签。

### 组合纯净度检查数量 `StoreInspectionMonth_combined_purity_check_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.check_cnt`
- 口径：本月门店普通柜纯净度检查台数与多门柜纯净度检查家数相加形成的已提供数量，混合了台和家，不能称为统一设备台数或门店家数。

### 组合纯净度合格数量 `StoreInspectionMonth_combined_purity_pass_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.check_pass_cnt`
- 口径：本月门店普通柜纯净度合格台数与多门柜纯净度合格家数相加形成的已提供数量，保留台加家的混合计量口径。不能在实盘分母冲突未解决时直接宣称已得到正式冰柜纯净度指标。

### 我司冰柜实盘门店标记 `StoreInspectionMonth_company_freezer_actual_store_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.ice_check_flag`
- 口径：本月冰柜检查形成的门店标签。指标材料以取值1识别我司单门、双门或多门冰柜盘点正常或盘盈且剔除餐饮柜和加热柜的实盘门店；按门店去重统计，不是设备台数。

### 非我司冰柜客户标记 `StoreInspectionMonth_non_company_freezer_store_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.fnf_ice_cust_flag`
- 口径：本月检查结果记录的非我司冰柜客户标签，不由我司冰柜实盘标签取补集。

### 我司冰柜盘盈台数 `StoreInspectionMonth_company_freezer_surplus_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.nf_ice_isp_snum`
- 口径：本月门店稽查记录中我司冰柜盘点为盘盈的台数，不是新增投放台数。

### 我司冰柜盘亏台数 `StoreInspectionMonth_company_freezer_shortage_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.nf_ice_lls_snum`
- 口径：本月门店稽查记录中我司冰柜盘点为盘亏的台数，与盘盈、正常分别记录。

### 我司冰柜正常台数 `StoreInspectionMonth_company_freezer_normal_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.nf_ice_nom_snum`
- 口径：本月门店稽查记录中我司冰柜盘点正常的台数，不表示这些设备的纯净度全部合格。

### 暖柜盘盈台数 `StoreInspectionMonth_warm_cabinet_surplus_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.hot_ice_isp_snum`
- 口径：本月门店稽查记录中暖柜盘点为盘盈的台数，不纳入普通柜纯净度设备范围。

### 暖柜盘亏台数 `StoreInspectionMonth_warm_cabinet_shortage_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.hot_ice_lls_snum`
- 口径：本月门店稽查记录中暖柜盘点为盘亏的台数。

### 暖柜一致台数 `StoreInspectionMonth_warm_cabinet_consistent_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.hot_ice_nom_snum`
- 口径：本月门店稽查记录中暖柜盘点结果为一致的台数，不表示陈列或纯净度合格。

### 暖柜陈列冰冻层数 `StoreInspectionMonth_warm_cabinet_frozen_display_layers`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.hot_ice_layer`
- 口径：本月检查结果中以暖柜陈列冰冻层数名义记录的层数，不是普通柜总层数，也不能用于重算普通柜纯净度。

### 水冰冻至少1层标记 `StoreInspectionMonth_water_frozen_at_least_one_layer_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.ice_one_flag`
- 口径：本月检查结果记录的水冰冻层数不少于1层的标签，不表示水冰冻数量比较为赢。

### 水冰冻至少2层标记 `StoreInspectionMonth_water_frozen_at_least_two_layers_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.ice_two_flag`
- 口径：本月检查结果记录的水冰冻层数不少于2层的标签。不能与阈值存在冲突的ice_layer_two_flag互换。

### 水冰冻层数阈值标记 `StoreInspectionMonth_water_frozen_layer_threshold_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.ice_layer_two_flag`
- 口径：本月水冰冻层数条件的已加工标签。数据设计写为大于2层，指标材料用于大于等于2层门店数，两者阈值不同；目前只保留标签原值，不将其确认为任一阈值的可替换结果。

### 天然水550mL冰冻至少1层标记 `StoreInspectionMonth_natural_water_550_frozen_one_layer_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.red_bottle_dev_cust_flag`
- 口径：本月我司冰柜检查中天然水550mL冰冻不少于1层的标签。指标材料限定剔除设备编码以SDCY开头的终端品餐饮柜及加热柜，取值1用于识别门店；其家数占比分母为我司单双多门冰柜实盘门店数。

### 竞品检查数 `StoreInspectionMonth_competitor_check_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.compete_cnt`
- 口径：本月检查结果记录的竞品检查数量。字段没有明确计数对象，不能直接称为竞品瓶数、冰柜台数或门店家数。

### 竞品超过2瓶条件数量 `StoreInspectionMonth_competitor_over_two_bottles_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.compete_2bottle_cnt`
- 口径：本月检查结果中满足竞品大于2瓶条件的记录数量。大于2瓶是计数条件，不证明该字段本身记录竞品瓶数。

### 非唯一冰柜竞品超过2瓶条件数量 `StoreInspectionMonth_non_unique_freezer_competitor_over_two_bottles_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.not_only_compete_2bottle_cnt`
- 口径：本月检查结果中按非唯一冰柜范围记录的竞品大于2瓶数量。该限定与一般竞品超过2瓶数量不同，不直接合并。

### 陈列2H数量 `StoreInspectionMonth_display_2h_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.compete_2h_cnt`
- 口径：本月检查结果中以陈列2H数记录的数量。资料未解释2H及计数对象，不将其推断为两小时、两层或竞品瓶数。

### 付费陈列检查合格项目数 `StoreInspectionMonth_paid_display_pass_project_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.pay_dsp_ins_elgb_pnum`
- 口径：本月门店稽查结果中付费陈列检查合格的项目数量，单位为项目，不是门店数、签约数或上传次数。

### 付费陈列检查不合格项目数 `StoreInspectionMonth_paid_display_fail_project_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.pay_dsp_ins_unelgb_pnum`
- 口径：本月门店稽查结果中付费陈列检查不合格的项目数量。未检查不能自动计为不合格，计费默认合格也不能改变本字段实际检查结果。

### 考核品出现行数 `StoreInspectionMonth_assessed_product_line_count`

- 类型：integer
- 字段：`v_chl_jc_cust_mi.audit_ass_line_cnt`
- 口径：本月门店检查结果记录的考核品出现行数，不是考核商品去重数、SKU数或检查次数。

### 考核品货龄 `StoreInspectionMonth_assessed_product_age`

- 类型：decimal
- 字段：`v_chl_jc_cust_mi.audit_ass_shelf_life_age`
- 口径：本月门店检查结果记录的考核品货龄值。资料未明确单位以及多商品、多行的汇总方式，不能擅自解释为天数、平均货龄或最大货龄。

### 考核品超货龄标记 `StoreInspectionMonth_assessed_product_over_age_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.over_cage_cust_flag`
- 口径：本月稽查记录的考核品超过适用货龄要求的标签。超货龄与已经过期是不同检查事实，不能互换。

### 过期品稽查标记 `StoreInspectionMonth_expired_product_inspection_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.overdue_hflag`
- 口径：本月门店过期品稽查形成的标签，不用考核品超货龄标签替代，也不据此取得具体过期商品清单。

### 550水低于红线价标记 `StoreInspectionMonth_water_550_below_red_line_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.water_550_red_line_cnt`
- 口径：本月检查记录的550水低于红线价标签。字段名虽含cnt，字段说明明确为标记，不作为低价商品瓶数、项目数或实际价格。

### 550KA量贩水低于红线价标记 `StoreInspectionMonth_ka_water_550_below_red_line_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.water_ka550_red_line_cnt`
- 口径：本月检查记录的550KA量贩水低于红线价标签，与一般550水低于红线价标签分别保留。

### 东方树叶低于红线价标记 `StoreInspectionMonth_oriental_leaf_below_red_line_flag`

- 类型：string
- 字段：`v_chl_jc_cust_mi.ca37_red_line_cnt`
- 口径：本月检查记录的东方树叶低于红线价标签，不表示东方树叶实际售价或红线价格数值。

### 月度区域名称 `StoreInspectionMonth_region_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.reg_name`
- 口径：本月门店稽查结果直接记录的公司销售管理区域名称，与稽查月份和被检查门店配套。它不是省市行政区划，也不同于资料所附的当前区域；月度范围采用本记录的直接引用，不由当前大区所属区域覆盖。

### 当前区域名称 `StoreInspectionMonth_current_region_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.now_reg_name`
- 口径：门店月度稽查结果资料附带的当前公司销售管理区域名称。该值虽保存在某个稽查月份的门店记录中，却不表示稽查月当时的区域归属，不能覆盖月度区域名称。资料未提供该当前归属的独立取值日期，不用稽查月份补造其时点。

### 记录销售总监姓名 `StoreInspectionMonth_sales_director_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.sales_mg_name`
- 口径：本门店月度稽查结果资料直接附带的销售总监姓名，与本记录的稽查月份和被检查门店配套。它是人员名称引用，不表示该总监实际执行了检查，也不凭同名认定同一员工或宣称已唯一匹配员工编码。

### 记录拜访频次 `StoreInspectionMonth_recorded_visit_frequency`

- 类型：string
- 字段：`v_chl_jc_cust_mi.freq_desc`
- 口径：门店月度稽查记录所附的拜访安排频次，保留同一ym、cust_code及来源记录范围。它不是本月实际拜访次数，不由当前子门店维表的安排覆盖；资料未明确本字段专属业代或其他拜访人员，不自行指定人员角色。

### 记录拜访日期名称 `StoreInspectionMonth_recorded_visit_week_names`

- 类型：string
- 字段：`v_chl_jc_cust_mi.visit_week_names`
- 口径：门店月度稽查记录所附拜访日期安排的名称表达，与同一记录visit_weeks、freq_desc配套。保留原始表示，不解释为已完成拜访的具体日期，也不自行指定星期枚举或转换为日期值；不以当前子门店安排覆盖。

### 记录拜访日期编码 `StoreInspectionMonth_recorded_visit_week_codes`

- 类型：string
- 字段：`v_chl_jc_cust_mi.visit_weeks`
- 口径：门店月度稽查记录所附拜访日期安排的原始编码或取值表达，与同一ym、cust_code记录中的visit_week_names、freq_desc配套。未提供编码字典及多值分隔规则，不自行拆分或推定为某个具体自然日，也不表示已实际拜访。

### 记录经营范围状态 `StoreInspectionMonth_recorded_business_scope_status_name`

- 类型：string
- 字段：`v_chl_jc_cust_mi.sub_cust_status_name`
- 口径：门店月度稽查记录所附的客户经营范围状态名称，与cust_status_name所表达的终端客户状态分别保留，不互相替代。保留同一ym、cust_code的来源记录范围；本来源未提供足以明确具体子门店的范围标识，不将本值自动归入某个当前子门店，也不推定为检查合格或检查完成状态。
