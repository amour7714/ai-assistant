# 陈列签约 `DisplaySigning`

- 分组：活动
- 父类：无

## 说明

门店签订某个陈列项的具体业务约定，以dsp_id识别，不同于陈列项种类dsp_code或上层活动。执行检查和费用按execute_ym与同一签约配套保存，不把月度结果当永久状态。签约陈列门店按biz_status_name为正常或审批中识别。月度结果优先采用稽查，其次大区或总部协访检查、办事处协访检查，前三层取该层当月最后人工结果，再采用业代执行汇总。未检查、合格、不合格保持区别；计费时未检查默认按合格处理，并不改变其检查状态。支付方式影响核销价，优先使用业务系统已算出的金额。

## 指出的关系

- 签约活动 → 陈列活动 `DisplaySigning_activity`
  actv_code、actv_name记录本签约所属陈列活动；活动编码不与dsp_id混用。
- 签订陈列项 → 陈列项 `DisplaySigning_item`
  dsp_code、dsp_name记录本签约约定的陈列项目种类，多个签约可以引用同一项目。
- 签约门店 → 门店 `DisplaySigning_store`
  cust_code直接记录签约门店，签约金额按具体dsp_id解释。
- 签约子门店 → 子门店 `DisplaySigning_store_scope`
  cust_range_code直接记录签约所在的门店经营范围。
- 所属销售客户 → 经销商 `DisplaySigning_dealer`
  dealer_range_code记录签约资料所属销售客户，与服务和上游客户分别保留。
- 服务经销商 → 经销商 `DisplaySigning_service_dealer`
  serv_dealer_range_code记录签约资料中的服务经销商。
- 上游销售客户 → 经销商 `DisplaySigning_upstream_dealer`
  p_dealer_range_code直接记录签约资料所指上游客户，不由当前客户主数据推导替代。
- 签约业代 → 业代 `DisplaySigning_signing_representative`
  sign_emp_code、sign_emp_name记录实际签约业代，不等同门店所属业代。
- 门店所属业代 → 业代 `DisplaySigning_store_representative`
  emp_code、emp_name记录该执行月签约资料所附门店业代，与签约人分别保留。
- 所属主任 → 主任 `DisplaySigning_supervisor`
  p_emp_code记录签约资料对应主任，按资料执行月范围解释。
- 所属线路 → 线路 `DisplaySigning_route`
  route_code直接记录签约资料中的门店线路。
- 签约品类 → 品类 `DisplaySigning_category`
  ctg_code、ctg_name记录签约陈列的品类，不以卡券支付商品品类替代。
- 关联支付卡券 → 陈列支付卡券 `DisplaySigning_coupon`
  cpn_code、cpn_name和券型直接记录签约关联卡券；有卡券引用不表示已经兑付。
- 卡券关联商品 → 商品 `DisplaySigning_coupon_product`
  cpn_cmdt_name记录本签约所附卡券商品，与陈列品类及签约规格分开；仅名称引用不证明已完成商品编码匹配。
- 卡券关联品类 → 品类 `DisplaySigning_coupon_category`
  cpn_ctg_name直接记录本签约所附卡券商品品类，不与ctg_name签约品类混用。
- 占用陈列费用包 → 陈列费用包 `DisplaySigning_expense_package`
  ref_cost_package_id直接引用本陈列签约使用的费用包。该业务联系不依赖已验证编码等价，也不证明它等于包明细标识。
- 行政办事处 → 办事处 `DisplaySigning_office`
  off_code、off_name记录签约资料的行政办事处。
- 行政大区 → 大区 `DisplaySigning_district`
  dis_code、dis_name记录签约资料行政大区，与cust_dis字段表示的门店大区区分。
- 门店大区 → 大区 `DisplaySigning_store_district`
  cust_dis_code、cust_dis_name直接记录签约门店大区，不与签约行政大区自动合并。
- 签约行政区域 → 公司组织 `DisplaySigning_region`
  陈列签约月度资料直接记录的行政区域组织，由v_mkt_dsp_actv_info_mi同一行reg_code、reg_name引用，复用DisplaySigning_administrative_region_code，并以同行reg_name配套解释名称。这里的区域是公司销售管理组织，不是省市行政区划。联系保留execute_ym、dsp_id及本签约引用范围，不将月度资料归属解释为签约的永久归属，也不以门店大区、签约行政大区的当前上层组织替代。本关系不证明组织编码跨来源等价或实例已经匹配。

## 指入的关系

- 营销费用业务事件 → 事件涉及陈列签约 `ExpenseEvent_display_signing`
  仅已明确为陈列签约对象的事件业务组合适用，按该组合对象身份及业务月引用签约，不凭编码格式推断。
- 虚假陈列认定 → 涉及陈列签约 `FalseDisplayFinding_signing`
  dsp_id直接引用认定涉及的具体陈列签约；同一签约多次认定时涉及签约金额只计一次。

## 属性

### 签约标识 `DisplaySigning_signing_identifier`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_id`、`v_ads_ai_chl_sus_display_fee_detail.dsp_id`
- 口径：dsp_id表示具体陈列签约身份；同一签约可在多个月和多个虚假陈列统计日被引用。

### 执行年月 `DisplaySigning_execution_month`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.execute_ym`
- 口径：与本签约的检查、执行次数、确认金额和核销价金额配套的execute_ym。

### 陈列检查结果 `DisplaySigning_check_result`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.check_result_name`
- 口径：本签约执行月记录中保存的检查结果名称。未检查表示缺少检查或执行依据；不合格表示按采用结果未达要求；合格表示经检查达标或符合默认合格规则。未检查在计费时按合格处理，但检查状态仍保留为未检查。当前资料未明确本字段与最终合格标记在月度优先级加工中的对应，不用最终标记覆写三态结果。

### 业务状态 `DisplaySigning_business_status`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.biz_status_name`
- 口径：本签约在执行月资料中记录的业务状态。签约陈列门店口径选取状态为正常或审批中的记录，再按门店编码去重；审批中不能直接解释为审批已通过。

### 签约金额 `DisplaySigning_signing_amount`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.sign_amt`、`v_ads_ai_chl_sus_display_fee_detail.sign_amt`
- 口径：资料直接记录的本陈列签约约定金额，不等同确认金额、陈列核销价金额或门店实发金额。月度来源保留执行月；虚假陈列涉及签约金额在所选认定期间按dsp_id识别后每个签约计一次，不按认定日重复累计。两来源的金额期间口径尚未明确，不能据同名字段认定可以互换。

### 签约类型 `DisplaySigning_signing_type`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.sign_type_name`
- 口径：签约资料记录的签订陈列类型名称，表示本签约的类型信息。资料未说明其与陈列项类型或合约店标记的对应，不能据此自行建立等价分类。

### 陈列项类型 `DisplaySigning_display_item_type`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_type_name`
- 口径：本签约资料记录的签订陈列项类型名称。它与签约类型分别保存，当前没有依据认定两字段等义。

### 陈列类目编码 `DisplaySigning_display_classification_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_clfc_code`
- 口径：本签约所附陈列类目的引用编码，与陈列类目名称配套；不是具体签约标识，也不同于陈列项编码或产品品类编码。

### 陈列类目 `DisplaySigning_display_classification_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_clfc_name`
- 口径：本签约所附陈列类目的名称，用于解释其陈列分类；不与签约品类或陈列项名称混用。

### 约定规格 `DisplaySigning_specification_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.acty_spec_name`
- 口径：本签约记录的活动规格名称，与规格数量配套解释；不直接当作支付商品的包装规格。

### 规格数量 `DisplaySigning_specification_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.spec_cnt`
- 口径：本签约记录的规格数量，须结合约定规格解释，不默认是商品箱数、陈列项个数或设备台数。

### 约定单位 `DisplaySigning_unit_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.acty_unit_name`
- 口径：本签约记录的活动单位名称，用于解释同一记录的单位数量。

### 单位数量 `DisplaySigning_unit_quantity`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.unit_cnt`
- 口径：本签约按活动单位记录的数量，实际计量单位由约定单位解释；不能脱离单位名称跨不同签约直接混加。

### 约定陈列位置 `DisplaySigning_display_position`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_position`
- 口径：本签约记录的陈列位置，不表示位置赢比检查结果，也不由该值判断执行是否合格。

### 签约费用类型 `DisplaySigning_expense_type`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.expen_type_name`
- 口径：本签约资料记录的费用类型名称；不根据其他表同名前缀将其解释为自有、预留费用模式。

### 签约活动编码 `DisplaySigning_activity_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.actv_code`
- 口径：本签约直接引用的陈列活动编码，不是陈列签约标识或活动计划明细标识。

### 签约活动开始时间 `DisplaySigning_activity_start_time`

- 类型：dateTime
- 字段：`v_mkt_dsp_actv_info_mi.start_date`
- 口径：本签约资料直接记录的所引用陈列活动开始时间，限定活动期间；不是签约签署时间或本月检查时间。

### 签约活动结束时间 `DisplaySigning_activity_end_time`

- 类型：dateTime
- 字段：`v_mkt_dsp_actv_info_mi.end_date`
- 口径：本签约资料直接记录的所引用陈列活动结束时间，不自动解释为签约终止时间或费用核销完成时间。

### 签订陈列项编码 `DisplaySigning_display_item_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_code`、`v_ads_ai_chl_sus_display_fee_detail.dsp_code`
- 口径：本签约约定陈列项目种类的引用编码，同一陈列项可被多个签约引用，不用于计数具体签约。

### 签约门店编码 `DisplaySigning_store_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cust_code`、`v_ads_ai_chl_sus_display_fee_detail.cust_code`
- 口径：本签约直接引用的实际门店编码，不同于门店经营范围编码；签约门店数按门店编码去重，不按签约行数计数。

### 签约子门店编码 `DisplaySigning_store_scope_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cust_range_code`
- 口径：本签约所在门店经营范围的直接引用值，不与实际门店编码混用，也不从仅有门店编码的认定来源补出经营范围。

### 所属销售客户编码 `DisplaySigning_dealer_range_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dealer_range_code`
- 口径：签约月度资料直接记录的所属销售客户销售范围编码，与服务经销商、上游销售客户身份分别解释。

### 服务经销商编码 `DisplaySigning_service_dealer_range_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.serv_dealer_range_code`
- 口径：签约月度资料直接记录的服务经销商引用编码，不用所属销售客户编码替代。

### 上游销售客户编码 `DisplaySigning_upstream_dealer_range_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.p_dealer_range_code`
- 口径：本签约资料直接引用的上游销售客户编码，不由经销商当前上级关系反推。

### 签约业代编码 `DisplaySigning_signing_representative_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.sign_emp_code`
- 口径：资料明确记录的实际签约业代编码，与门店所属业代是不同参与身份。

### 门店所属业代编码 `DisplaySigning_store_representative_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.emp_code`
- 口径：本签约执行月资料所附门店所属业代编码，不证明该业代就是签约人或全部执行的实际完成者。

### 所属主任编码 `DisplaySigning_supervisor_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.p_emp_code`
- 口径：本签约执行月资料直接记录的所属主任编码，不表示主任亲自实施了检查。

### 所属线路编码 `DisplaySigning_route_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.route_code`
- 口径：本签约执行月资料直接记录的门店线路号，不用于证明已有计划拜访或实际拜访。

### 签约品类编码 `DisplaySigning_display_category_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.ctg_code`
- 口径：本签约陈列品类的直接引用编码，不同于支付卡券关联商品的品类。

### 行政办事处编码 `DisplaySigning_administrative_office_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.off_code`
- 口径：本签约执行月资料直接记录的行政办事处编码，不由当前门店或客户归属反推。

### 行政大区编码 `DisplaySigning_administrative_district_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dis_code`
- 口径：本签约执行月资料直接记录的行政大区编码，与门店大区编码分别保留，不假定两者相同。

### 行政区域编码 `DisplaySigning_administrative_region_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.reg_code`
- 口径：本签约执行月资料直接记录的行政区域组织引用编码，保留该记录的组织范围，不由当前大区层级推算。

### 门店大区编码 `DisplaySigning_store_district_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cust_dis_code`
- 口径：本签约执行月资料直接记录的门店大区编码，与签约行政大区是分别记录的归属口径。

### 资料合约店标记 `DisplaySigning_recorded_contract_store_flag`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.is_conshop_name`
- 口径：签约资料中是否合约店字段记录的名称值。它与门店是否合约店字段分别保留，不能自行改称合约签约类型，也不能仅凭该标记判断协议已确认通过。

### 门店合约店标记 `DisplaySigning_store_contract_flag`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cust_is_conshop_name`
- 口径：本签约执行月资料所附门店是否合约店的名称值，不表示该签约的检查合格状态或协议确认状态。

### 门店一店通标记 `DisplaySigning_store_one_store_pass_flag`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.is_ydt_name`
- 口径：本签约资料所附门店是否一店通的名称值，用于解释一店通与非一店通的陈列支付业务模式；不是陈列支付或卡券兑付已经完成的标记。

### 门店年度销售目标金额 `DisplaySigning_store_annual_sales_target_amount`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.fin_target_amt`
- 口径：本签约资料附带的门店年度销售目标金额，不是陈列签约金额或本月分销目标。同一门店可能随多个签约重复出现，不能按签约行直接累计；所属年度及门店经营范围口径尚未明确。

### 门店当月分销金额 `DisplaySigning_store_monthly_distribution_amount`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.dist_ord_amt_mtd`
- 口径：本签约月度资料附带的门店当月分销金额，不是本签约产生的收入。同一门店的值可能随多个签约重复出现，不按dsp_id汇总为门店分销总额，也不替代订单行分销明细口径。

### 合约店签约费率 `DisplaySigning_contract_signing_rate`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.conshop_sign_rate`
- 口径：本签约资料附带的合约店签约费率，须与同一记录的门店及合约费用信息对应。费率数值尺度未说明，不自行按百分数或小数转换，也不把它当作我司承担比例。

### 合约店月均费用 `DisplaySigning_contract_average_monthly_fee`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.conshop_avg_amt`
- 口径：本签约资料附带的合约店月均费用，不是本签约当月确认金额或门店陈列均值金额。不得随多个签约重复累计，也不在缺少合同期间时用签约总金额自行重算。

### 合约店签约总金额 `DisplaySigning_contract_total_signing_amount`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.conshop_sign_amt`
- 口径：本签约资料附带的合约店签约总金额，主体是该记录所指合约店，不自动认定为当前单个dsp_id的签约金额。合约期间及重复承载范围尚未明确，不能按陈列签约行直接求和。

### 合约店分销总金额 `DisplaySigning_contract_total_distribution_amount`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.conshop_dist_amt`
- 口径：本签约资料附带的合约店分销总金额，期间未在字段说明中明确；不直接视为当月分销金额，也不与门店当月分销金额相加。该值不属于单个陈列签约的分销业绩。

### 检查时间 `DisplaySigning_check_time`

- 类型：dateTime
- 字段：`v_mkt_dsp_actv_info_mi.check_datetime`
- 口径：本签约执行月资料中保存的检查时间，不是执行月、签约时间或每次检查的时间列表。当前未明确它对应优先级选定结果还是其他检查步骤，不据此重新选择当月最后人工结果。

### 拍照标记 `DisplaySigning_photo_flag`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.is_photo_name`
- 口径：本签约执行月资料记录的是否拍照名称值。拍照不等同图像识别合格、人工检查合格或费用支付完成。

### 检查类型编码 `DisplaySigning_check_type_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.check_type_code`
- 口径：本签约执行月资料保存的陈列检查类型编码，与检查类型名称配套。资料未提供编码与稽查、协访检查层级的具体对应，不能自行解码优先级。

### 检查类型 `DisplaySigning_check_type_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.check_type_name`
- 口径：本签约执行月资料保存的陈列检查类型名称，不表示逐次检查过程已经提供，也不单独证明本记录采用了哪个优先层级。

### 图像识别结果 `DisplaySigning_image_recognition_result`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.img_dsp_result_name`
- 口径：本签约执行月资料记录的图像识别结果名称，是图像识别信息，不直接替代人工检查结果或活动最终合格标记。

### 冰柜验证结果 `DisplaySigning_freezer_validation_result`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.freezer_verify_name`
- 口径：本签约执行月资料保存的冰柜验证结果，不等同门店普通柜纯净度、设备实盘结果或本签约最终检查结果；仅在记录实际提供该验证信息时解释。

### 月度执行次数 `DisplaySigning_execution_count`

- 类型：integer
- 字段：`v_mkt_dsp_actv_info_mi.execute_cnt`
- 口径：本签约执行月记录的执行次数，不是签约数量、门店数量或门店全部拜访次数。

### 图像识别合格次数 `DisplaySigning_image_qualified_count`

- 类型：integer
- 字段：`v_mkt_dsp_actv_info_mi.img_elgb_cnt`
- 口径：本签约执行月记录的图像识别合格次数，不表示最终合格签约数，也不能直接当作人工检查合格次数。

### 月度最终合格标记 `DisplaySigning_final_qualification`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.is_dsp_elgb`
- 口径：本签约执行月资料中活动最终是否合格字段保存的原值，不是签约永久有效状态。其编码及与未检查、不合格、合格三态的对应尚未说明，不自行转为布尔值或替代检查结果名称。

### 结果修改次数 `DisplaySigning_result_modification_count`

- 类型：integer
- 字段：`v_mkt_dsp_actv_info_mi.emp_input_result_cnt`
- 口径：本签约执行月资料记录的陈列项结果被修改次数，用于区分结果修改与执行次数；不表示已经提供每次修改的过程记录。

### 陈列支付方式 `DisplaySigning_payment_method`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.dsp_pay_mthd`
- 口径：本签约记录的陈列费支付方式。现金或货抵、产品、账扣等方式在一店通与非一店通模式下对应不同核销价规则；卡券引用不表示已经支付，不能仅按券型反推本字段。

### 关联支付卡券编码 `DisplaySigning_coupon_code`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cpn_code`
- 口径：本签约直接引用的支付卡券编码。有卡券引用不证明已经发放、领用或兑付，也不把卡券编码当作签约标识。

### 关联卡券类型 `DisplaySigning_coupon_type`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cpn_type_name`
- 口径：本签约所附支付卡券的类型名称。货款抵扣、产品兑换、陈列对账等券型用于解释不同支付与核销规则，不表示兑付状态。

### 卡券关联商品名称 `DisplaySigning_coupon_product_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cpn_cmdt_name`
- 口径：本签约资料直接记录的关联卡券商品名称，是支付商品引用，不是陈列规格或签约品类。仅有名称不证明已经匹配到唯一商品编码。

### 卡券关联品类名称 `DisplaySigning_coupon_category_name`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.cpn_ctg_name`
- 口径：本签约资料直接记录的关联卡券商品品类名称，不与签约陈列品类混用。

### 经销商上单价 `DisplaySigning_dealer_order_price`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.dealer_cmdt_box_price`
- 口径：本签约支付资料记录的经销商上单价，是价格而不是可求和的费用金额。字段未明确净价、含税口径及计价单位，不能仅凭本字段重算陈列核销价。

### 月度确认金额 `DisplaySigning_confirmed_amount`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.confirm_amt`
- 口径：本签约执行月记录的费用确认金额，与同一行调整人、调整时间和调整备注配套。它不同于签约约定金额、陈列核销价及门店账单应发实发金额，不仅凭检查合格标记自行计算。

### 确认金额调整人 `DisplaySigning_confirmation_adjuster`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.confirm_amt_user`
- 口径：本签约执行月资料记录的确认金额调整人原值，与该记录的确认金额及调整时间对应；字段未声明是员工编码或域账号，不自行转换标识体系。

### 确认金额调整时间 `DisplaySigning_confirmation_adjustment_time`

- 类型：dateTime
- 字段：`v_mkt_dsp_actv_info_mi.confirm_amt_datetime`
- 口径：本签约执行月资料记录的确认金额调整时间，不是费用所属月或核销完成时间，也不表示全部历史调整时间。

### 确认金额调整备注 `DisplaySigning_confirmation_adjustment_note`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.confirm_amt_note`
- 口径：本签约执行月资料保存的确认金额调整说明，不作为独立的检查结果或费用状态。

### 陈列核销价金额 `DisplaySigning_verification_price_amount`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.dsp_verify_price_amt`
- 口径：业务系统按本签约支付方式及一店通或非一店通模式计算并保存的核销价金额，不据此证明核销已完成或门店费用已实发。材料规定现金或货抵缺价格时使用相应默认价；产品支付缺价格不生成相应支付单，未配置支付品项时采用规定的550mL×24入塑包水。因此优先读取系统金额，不以签约金额或单个上单价字段重算或补齐。

### 核销明细引用标识 `DisplaySigning_verification_detail_identifier`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.verify_dtl_id`
- 口径：本签约执行月资料直接记录的核销明细ID，用于保留核销明细引用；不是签约标识，也不单凭有值推断核销状态。

### 陈列费用包引用标识 `DisplaySigning_expense_package_identifier`

- 类型：string
- 字段：`v_mkt_dsp_actv_info_mi.ref_cost_package_id`
- 口径：本签约直接记录的所使用陈列费用包ID，原注释指向market_cost_package.id。它保留本签约的费用包引用，不自行解释为费用包分配明细标识。

### 陈列标线金额 `DisplaySigning_reference_line_amount`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.dsp_rtc_amt`
- 口径：本签约执行月资料保存的陈列标线金额。资料未说明标线的业务阈值含义、适用对象或计算方式，不能自行当作签约限额、应发金额或最低投入。

### 陈列均值金额 `DisplaySigning_display_average_amount`

- 类型：decimal
- 字段：`v_mkt_dsp_actv_info_mi.dsp_avg_amt`
- 口径：本签约执行月资料保存的陈列均值金额。均值对应的对象集合、期间及算法尚未说明，不当作当前查询结果的平均值，也不与合约店月均费用互换。
