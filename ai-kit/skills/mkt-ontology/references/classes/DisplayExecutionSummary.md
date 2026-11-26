# 门店陈列执行统计 `DisplayExecutionSummary`

- 分组：活动
- 父类：无

## 说明

门店在统计期间按活动类型及资料所列专项活动、陈列项汇总的执行数量、上传次数和合格次数。不同字段分别以个、箱、层、卡板或次数计量；我司冰柜和客户冰柜分别记录，不能混成设备台数。它不是单次执行日志，也不能仅凭相同门店月份关联到具体签约。

## 指出的关系

- 执行门店 → 门店 `DisplayExecutionSummary_store`
  cust_code记录陈列执行统计对应门店，不等同签约记录数。
- 执行陈列项 → 陈列项 `DisplayExecutionSummary_item`
  dsp_form_code、dsp_form_name记录本执行统计引用的陈列项，编码对应未确认时仍保留业务联系。
- 执行专项活动 → 陈列活动 `DisplayExecutionSummary_special_activity`
  zx_actv_code有实际专项活动引用时，表示本统计对应的陈列专项活动；不从常规统计类型反造活动实例。
- 记录销售客户 → 经销商 `DisplayExecutionSummary_dealer`
  dealer_range_code记录执行统计所附销售客户。
- 记录业代 → 业代 `DisplayExecutionSummary_representative`
  emp_code记录门店执行统计对应业代，不将汇总全部执行自动归为该员工亲自完成。
- 记录主任 → 主任 `DisplayExecutionSummary_supervisor`
  p_emp_name直接记录执行统计对应主任，名称引用不证明人员编码已唯一匹配。
- 记录理货员 → 员工 `DisplayExecutionSummary_merchandiser`
  lhy_emp_code记录执行统计所附理货员，与业代身份分开。
- 业代线路 → 线路 `DisplayExecutionSummary_sales_route`
  route_code直接记录本执行统计的业代线路。
- 理货员线路 → 线路 `DisplayExecutionSummary_merchandising_route`
  lhy_route_code直接记录本执行统计的理货线路，不与业代线路互换。
- 执行品类 → 品类 `DisplayExecutionSummary_category`
  ctg_name直接记录陈列执行统计的品类范围。
- 记录办事处 → 办事处 `DisplayExecutionSummary_office`
  off_code、off_name直接记录执行统计所属办事处。
- 记录大区 → 大区 `DisplayExecutionSummary_district`
  dis_name直接记录执行统计所属大区。
- 执行统计记录区域 → 公司组织 `DisplayExecutionSummary_region`
  门店陈列执行统计直接注明的公司销售管理区域，由v_mkt_dsp_execute_mi同一行reg_name引用，复用DisplayExecutionSummary_region_name。联系保留该行execute_ym、ymd、cust_code及活动类型、实际专项活动和陈列项范围；执行月与统计日期分别解释，不据此认定每日新增执行量或区域归属的生效日期。本来源仅提供区域名称，不推造区域编码或宣称实例已匹配，也不沿大区当前组织层级替代记录区域。

## 指入的关系

无

## 属性

### 执行年月 `DisplayExecutionSummary_execution_month`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.execute_ym`
- 口径：execute_ym表示执行统计月份，不默认等同ymd表示的统计日期。

### 活动类型 `DisplayExecutionSummary_activity_type`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.flg`
- 口径：flg记录的活动类型，是说明本汇总适用执行类别的字段，不由各数量列是否非零反推。

### 统计日期 `DisplayExecutionSummary_statistical_date`

- 类型：date
- 字段：`v_mkt_dsp_execute_mi.ymd`
- 口径：本执行统计记录标注的日期，与执行年月及该行各项指标配套。它不是已确认的单次执行日期，也尚未明确是否为月度累计结果的快照日期。

### 执行门店编码 `DisplayExecutionSummary_store_code`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.cust_code`
- 口径：本执行统计对应的终端门店编码，是统计范围的必要引用；不是子门店编码或陈列签约标识。统计门店数量时按所选范围的门店编码去重，不按汇总记录行数计数。

### 记录门店名称 `DisplayExecutionSummary_store_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.cust_name`
- 口径：本执行统计记录附带的门店名称，与本行执行门店编码对应；不以名称替代门店编码识别或去重。

### 专项活动编码 `DisplayExecutionSummary_special_activity_code`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.zx_actv_code`
- 口径：本统计记录的专项活动引用值。有实际专项活动引用时用于说明统计对应的陈列专项活动，不等同活动类型、陈列项编码或具体签约标识。

### 陈列项编码 `DisplayExecutionSummary_display_item_code`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.dsp_form_code`
- 口径：本执行统计引用的陈列项目种类编码，不表示某次执行或某个具体陈列签约。与其他来源陈列项编码的逐值对应尚未提供。

### 陈列项名称 `DisplayExecutionSummary_display_item_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.dsp_form_name`
- 口径：本执行统计记录的陈列项目名称，与同一行陈列项编码对应；不是设备名称或签约名称。

### 陈列类目 `DisplayExecutionSummary_display_class_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.dsp_clfc_name`
- 口径：本执行统计记录的陈列类目，用于解释陈列项目的分类；与具体陈列项名称及产品品类分别保留。

### 执行品类名称 `DisplayExecutionSummary_product_category_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.ctg_name`
- 口径：本执行统计直接记录的产品品类范围，不是陈列类目，也不自动等同商品行销类目或SKU。

### 记录合约店标记 `DisplayExecutionSummary_contract_store_flag`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.is_conshop`
- 口径：本统计记录附带的门店是否合约店标记，仅表示该记录中的合约店身份，不证明协议已确认通过或存在某个可定位的陈列签约。

### 记录付费门店标记 `DisplayExecutionSummary_paid_store_flag`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.is_free`
- 口径：本统计记录附带的门店是否付费标记。字段说明为是否付费门店，不能因字段名is_free而反向解释为免费；也不直接等同月度表的常规付费身份或全部陈列付费门店范围。

### 记录一店通标记 `DisplayExecutionSummary_one_store_platform_flag`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.is_ydt`
- 口径：本执行统计记录附带的门店是否一店通标记，不据此推断支付、兑券或费用发放已经完成。

### 记录子渠道 `DisplayExecutionSummary_subchannel_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.sub_chl_name`
- 口径：本执行统计记录附带的门店子渠道，与本行指标范围对应，不用于自行定位某个子门店。

### 记录渠道群 `DisplayExecutionSummary_channel_group_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.p2_chl_name`
- 口径：本执行统计记录附带的门店渠道群，与子渠道分别表示不同层级的渠道范围。

### 记录门店等级 `DisplayExecutionSummary_store_level_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.cust_level_name`
- 口径：本执行统计记录附带的终端客户等级，不作为门店永久等级。按知识中的钻金银范围分析时，筛选钻石、金、银等级。

### 记录市场层级 `DisplayExecutionSummary_market_level_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.mkt_level_name`
- 口径：本执行统计记录附带的市场层级名称，不等同用于乡镇筛选的行政区划类别。

### 记录销售客户编码 `DisplayExecutionSummary_dealer_sales_range_code`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.dealer_range_code`
- 口径：本执行统计记录附带的销售客户销售范围编码，是本记录销售客户身份的引用值；不等同SAP客户编码，也不自动表示执行人或付款方。

### 记录销售客户SAP编码 `DisplayExecutionSummary_dealer_sap_code`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.dealer_sap_code`
- 口径：本执行统计记录附带的销售客户SAP编码，与本行销售客户销售范围编码采用不同标识体系，不作为两者可以互换的依据。

### 记录销售客户名称 `DisplayExecutionSummary_dealer_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.dealer_name`
- 口径：本执行统计记录附带的销售客户名称，与本行销售客户引用值对应。

### 记录销售客户类型 `DisplayExecutionSummary_dealer_type_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.dealer_type_name`
- 口径：本执行统计记录附带的销售客户类型，用于按该记录的客户类型分析执行情况，不以当前客户主数据类型覆盖。

### 记录业代编码 `DisplayExecutionSummary_representative_code`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.emp_code`
- 口径：本执行统计记录对应的业代编码，不表示该业代亲自完成了汇总中的全部执行或上传。

### 记录业代姓名 `DisplayExecutionSummary_representative_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.emp_name`
- 口径：本执行统计记录附带的业代姓名，与同一行业代编码对应；不与理货员或主任姓名混合。

### 记录业代基准岗 `DisplayExecutionSummary_representative_standard_position`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.std_pos_name`
- 口径：本执行统计记录附带的业代基准岗位名称，与本行业代对应，不表示该员工永久岗位。

### 记录主任姓名 `DisplayExecutionSummary_supervisor_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.p_emp_name`
- 口径：本执行统计记录直接引用的主任姓名。本来源没有主任编码，名称引用不证明已唯一匹配到员工，也不表示主任是执行或检查人。

### 记录理货员编码 `DisplayExecutionSummary_merchandiser_code`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.lhy_emp_code`
- 口径：本执行统计记录附带的理货员编码，与业代分别保留；不将全部执行量自动解释为该理货员亲自完成。

### 记录理货员姓名 `DisplayExecutionSummary_merchandiser_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.lhy_emp_name`
- 口径：本执行统计记录附带的理货员姓名，与同一行理货员编码对应。

### 记录理货员基准岗 `DisplayExecutionSummary_merchandiser_standard_position`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.lhy_std_pos_name`
- 口径：本执行统计记录附带的理货员基准岗位名称，与本行理货员对应，不与业代基准岗混用。

### 记录业代线路号 `DisplayExecutionSummary_sales_route_code`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.route_code`
- 口径：本执行统计记录直接引用的业代线路号，与理货员线路号表示不同服务身份；不据此认定每次执行均沿该线路发生。

### 记录理货员线路号 `DisplayExecutionSummary_merchandising_route_code`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.lhy_route_code`
- 口径：本执行统计记录直接引用的理货员线路号，与业代线路分别保存。

### 记录办事处编码 `DisplayExecutionSummary_office_code`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.off_code`
- 口径：本执行统计记录附带的办事处编码，是该记录的组织归属引用，不由门店或经销商当前归属重算。

### 记录办事处名称 `DisplayExecutionSummary_office_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.off_name`
- 口径：本执行统计记录附带的办事处名称，与同一行办事处编码对应。

### 记录大区名称 `DisplayExecutionSummary_district_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.dis_name`
- 口径：本执行统计记录直接记录的大区名称，不以当前办事处所属大区替代。本来源未提供大区编码。

### 记录区域名称 `DisplayExecutionSummary_region_name`

- 类型：string
- 字段：`v_mkt_dsp_execute_mi.reg_name`
- 口径：本执行统计记录直接记录的上层区域组织名称，不表示省、市等行政区划；与本行大区及办事处归属配套。

### 常规陈列执行数量 `DisplayExecutionSummary_regular_execution_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_execute_mi.conv_dsp_exec_nums`
- 口径：本统计记录给出的常规陈列执行数量。材料未标注计量单位，不解释为执行次数、门店数或各陈列项数量列之和。

### 常规陈列上传次数 `DisplayExecutionSummary_regular_upload_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.conv_load_cnt`
- 口径：本统计记录的常规陈列上传次数，单位次；不等同陈列执行数量、合格次数或签约数量。

### 专项活动执行数量 `DisplayExecutionSummary_special_execution_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_execute_mi.zx_exec_nums`
- 口径：本统计记录给出的专项活动执行数量，与本行专项活动引用及统计范围对应。材料未标注单位，不与专项活动累计执行数量混为同一口径。

### 专项活动累计执行数量 `DisplayExecutionSummary_special_cumulative_execution_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_execute_mi.zx_exec_nums_mtd`
- 口径：本记录给出的专项活动累计执行数量。材料仅说明为累计值，未明确累计起点、截止时点和计量单位，不仅凭字段后缀认定为执行月内累计；期间核定前不跨统计日期相加或与非累计数量相加。

### 专项活动上传次数 `DisplayExecutionSummary_special_upload_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.zx_load_cnt`
- 口径：本统计记录的专项活动上传次数，单位次，与该记录的专项活动范围配套；不表示执行数量或合格数量。

### 专项活动合格次数 `DisplayExecutionSummary_special_qualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.zx_img_check_hg_cnt`
- 口径：本统计记录的专项活动合格次数，单位次。它是执行统计中的合格计数，不是具体陈列签约按检查优先级形成的月度最终合格状态。

### 专项活动不合格次数 `DisplayExecutionSummary_special_unqualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.zx_img_check_bhg_cnt`
- 口径：本统计记录的专项活动不合格次数，单位次，与同一记录的专项合格次数对应；不从上传次数减合格次数推算。

### 地堆执行个数 `DisplayExecutionSummary_ground_stack_execution_count`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.dd_exec_act_times`
- 口径：本统计记录中地堆执行的个数，单位个；与地堆卡板数、上传次数和合格次数分别解释，不表示门店数。

### 地堆卡板数 `DisplayExecutionSummary_ground_stack_pallet_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_execute_mi.dd_act_exec_nums`
- 口径：本统计记录中地堆按卡板计量的数量，单位卡板；不同于地堆执行个数，材料未给出两者换算关系。

### 地堆上传次数 `DisplayExecutionSummary_ground_stack_upload_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.dd_load_cnt`
- 口径：本统计记录的地堆上传次数，单位次；与同一行地堆执行数量及合格次数配套。

### 地堆合格次数 `DisplayExecutionSummary_ground_stack_qualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.dd_exec_act_hg_times`
- 口径：本统计记录的地堆合格次数，单位次。指标清单中的“地龙合格家数”以本值大于0筛选门店，再按cust_code去重；不能把合格次数直接视为合格家数，也不据该指标名称合并陈列项编码。

### 水堆执行个数 `DisplayExecutionSummary_water_stack_execution_count`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.sd_exec_act_times`
- 口径：本统计记录中水堆执行的个数，单位个。指标清单的水堆执行数量采用本字段；它不同于水堆箱数和执行门店数。

### 水堆箱数 `DisplayExecutionSummary_water_stack_box_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_execute_mi.sd_act_exec_nums`
- 口径：本统计记录中水堆按箱计量的数量，单位箱；不是水堆个数或分销签收箱数，不与不同单位的陈列数量相加。

### 水堆上传次数 `DisplayExecutionSummary_water_stack_upload_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.sd_load_cnt`
- 口径：本统计记录的水堆上传次数，单位次，不等同水堆执行个数或合格次数。

### 水堆合格次数 `DisplayExecutionSummary_water_stack_qualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.sd_exec_act_hg_times`
- 口径：本统计记录的水堆合格次数，单位次；不是合格门店数或具体签约的最终检查状态。

### 混合堆执行个数 `DisplayExecutionSummary_mixed_stack_execution_count`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.hhd_exec_act_times`
- 口径：本统计记录中字段明确记载的混合堆个数，单位个，与混合堆箱数分别保留。指标清单的“混合堆执行数量”却引用箱数字段，其正式指标选列仍待确认。

### 混合堆箱数 `DisplayExecutionSummary_mixed_stack_box_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_execute_mi.hhd_act_exec_nums`
- 口径：本统计记录中混合堆按箱计量的数量，单位箱。数据设计明确说明为箱数，指标清单将其称为执行混合堆个数的冲突尚未解决，本属性不据此改为个数。

### 混合堆上传次数 `DisplayExecutionSummary_mixed_stack_upload_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.hhd_load_cnt`
- 口径：本统计记录的混合堆上传次数，单位次，与混合堆个数、箱数及合格次数分别解释。

### 混合堆合格次数 `DisplayExecutionSummary_mixed_stack_qualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.hhd_exec_act_hg_times`
- 口径：本统计记录的混合堆合格次数，单位次；不是混合堆合格个数或合格门店数。

### 饮料堆执行个数 `DisplayExecutionSummary_beverage_stack_execution_count`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.yld_exec_act_times`
- 口径：本统计记录中饮料堆执行的个数，单位个；不同于饮料堆箱数、上传次数和执行门店数。

### 饮料堆箱数 `DisplayExecutionSummary_beverage_stack_box_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_execute_mi.yld_act_exec_nums`
- 口径：本统计记录中饮料堆按箱计量的数量，单位箱；不是饮料堆个数或饮料分销数量。

### 饮料堆上传次数 `DisplayExecutionSummary_beverage_stack_upload_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.yld_load_cnt`
- 口径：本统计记录的饮料堆上传次数，单位次，不等同饮料堆执行数量或合格次数。

### 饮料堆合格次数 `DisplayExecutionSummary_beverage_stack_qualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.yld_exec_act_hg_times`
- 口径：本统计记录的饮料堆合格次数，单位次；不表示合格门店数或具体签约的最终结果。

### 货架执行个数 `DisplayExecutionSummary_shelf_execution_count`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.hj_exec_act_times`
- 口径：本统计记录中货架执行的个数，单位个；与货架层数分别计量，不代表门店拥有的永久货架数量。

### 货架层数 `DisplayExecutionSummary_shelf_layer_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_execute_mi.hj_act_exec_nums`
- 口径：本统计记录中货架陈列按层计量的数量，单位层；不同于货架个数，材料未给出个数与层数的换算关系。

### 货架上传次数 `DisplayExecutionSummary_shelf_upload_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.hj_load_cnt`
- 口径：本统计记录的货架上传次数，单位次，与货架个数、层数及合格次数分别保存。

### 货架合格次数 `DisplayExecutionSummary_shelf_qualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.hj_exec_act_hg_times`
- 口径：本统计记录的货架合格次数，单位次；不是合格货架个数、合格层数或合格门店数。

### 我司冰柜冰冻化个数 `DisplayExecutionSummary_company_freezing_execution_count`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.bdh_exec_act_times`
- 口径：本统计记录中我司冰柜冰冻化执行的个数，单位个；这是冰冻化执行统计，不作为冰柜设备台数或门店数，与客户冰柜口径分开。

### 我司冰柜冰冻化层数 `DisplayExecutionSummary_company_freezing_layer_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_execute_mi.bdh_bottles_cnt`
- 口径：本统计记录中我司冰柜冰冻化按层计量的数量，单位层；不是瓶数、设备门数或设备台数。

### 我司冰柜冰冻化上传次数 `DisplayExecutionSummary_company_freezing_upload_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.bdh_load_cnt`
- 口径：本统计记录中我司冰柜冰冻化的上传次数，单位次；与客户冰柜上传次数分别保留，不表示设备台数。

### 我司冰柜冰冻化合格次数 `DisplayExecutionSummary_company_freezing_qualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.bdh_exec_act_hg_times`
- 口径：本统计记录中我司冰柜冰冻化的合格次数，单位次；不是冰柜纯净度合格台数，也不是具体签约的月度最终合格状态。

### 我司冰柜免费冰冻化合格次数 `DisplayExecutionSummary_company_freezing_free_qualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.free_bdh_hg_cnt`
- 口径：本统计记录给出的我司冰柜免费冰冻化合格次数，单位次。免费限定此字段所记录的执行范围，不以门店付费标记替代；与合格个数分别解释。

### 我司冰柜免费冰冻化合格个数 `DisplayExecutionSummary_company_freezing_free_qualified_count`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.free_bdh_hg_dcnt`
- 口径：本统计记录给出的我司冰柜免费冰冻化合格个数，单位个；不同于免费合格次数，不据此解释为合格设备台数或合格门店数。

### 客户冰柜冰冻化个数 `DisplayExecutionSummary_customer_freezing_execution_count`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.bdh_exec_act_times_2`
- 口径：本统计记录中客户冰柜冰冻化执行的个数，单位个；与我司冰柜执行个数分开，不作为客户冰柜设备台数或门店数。

### 客户冰柜冰冻化层数 `DisplayExecutionSummary_customer_freezing_layer_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_execute_mi.bdh_bottles_cnt_2`
- 口径：本统计记录中客户冰柜冰冻化按层计量的数量，单位层；不是瓶数或设备台数，与我司冰柜层数分别保存。

### 客户冰柜冰冻化上传次数 `DisplayExecutionSummary_customer_freezing_upload_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.bdh_load_cnt_2`
- 口径：本统计记录中客户冰柜冰冻化的上传次数，单位次；不等同我司冰柜上传次数或客户冰柜数量。

### 客户冰柜冰冻化合格次数 `DisplayExecutionSummary_customer_freezing_qualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.bdh_exec_act_hg_times_2`
- 口径：本统计记录中客户冰柜冰冻化的合格次数，单位次；不是合格设备台数、合格门店数或具体签约的最终状态。

### 客户冰柜免费冰冻化合格次数 `DisplayExecutionSummary_customer_freezing_free_qualified_times`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.free_bdh_hg_cnt_2`
- 口径：本统计记录给出的客户冰柜免费冰冻化合格次数，单位次。免费限定该字段的执行范围，不由门店付费标记推算，与我司冰柜免费口径分开。

### 客户冰柜免费冰冻化合格个数 `DisplayExecutionSummary_customer_freezing_free_qualified_count`

- 类型：integer
- 字段：`v_mkt_dsp_execute_mi.free_bdh_hg_dcnt_2`
- 口径：本统计记录给出的客户冰柜免费冰冻化合格个数，单位个；与免费合格次数分别计量，不解释为设备台数或门店数。
