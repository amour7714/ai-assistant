# 虚假分销订单行 `FalseDistributionOrderLine`

- 分组：交易
- 父类：DistributionOrderLine

## 说明

被异常订单资料明确收录并按本轮用户确认认定为虚假的分销订单商品行。成员由v_ai_sus_ord_inspect_detail中的dist_ord_no与cmdt_code识别，无需再以inspect_result判断是否虚假；检查结果、原因及最终生效检查时间是该行的检查信息。补充分销金额及五项承担分摊金额时仍取对应历史分销行，不按检查明细重复累计。五项分摊沿用父类的同一行原字段乘法、成品及水或饮料范围和所选签收期间，不以检查时间替代金额计算期间，也不据此确定虚假认定指标应采用的期间字段。

## 指出的关系

- 认定记录销售人员 → 员工 `FalseDistributionOrderLine_recorded_representative`
  检查资料emp_code直接记录该虚假订单对应销售人员。
- 最近派发人 → 员工 `FalseDistributionOrderLine_dispatcher`
  dispatch_user_code、dispatch_user_name记录最近一次派发检查任务的员工，编码为域账号口径。
- 派发检查人 → 员工 `FalseDistributionOrderLine_assigned_inspector`
  inspect_person_code、inspect_person_name记录被派发承担检查的员工，不等同实际完成检查者。
- 实际检查人 → 员工 `FalseDistributionOrderLine_actual_inspector`
  actual_inspect_person_code及姓名记录实际检查者，保留与派发检查人的区别。

## 指入的关系

无

## 属性

### 订单信息 `FalseDistributionOrderLine_order_information`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.ord_info`
- 口径：检查资料记录的本行所属订单信息，保留原始表达，不替代订单编码、商品编码或虚假原因。

### 订单高中低等级 `FalseDistributionOrderLine_order_level`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.ord_level`
- 口径：检查资料对本行所属订单记录的高中低等级。保留来源分类，不将其解释为商品等级，也不凭得分自行重算等级。

### 克隆订单得分 `FalseDistributionOrderLine_clone_score`

- 类型：decimal
- 字段：`v_ai_sus_ord_inspect_detail.clone_score`
- 口径：本行所属订单在检查资料中记录的克隆订单得分，与同一记录的得分明细配套。它是订单评估分值，不是概率、金额或可跨商品行相加的分项业绩。

### 克隆得分明细 `FalseDistributionOrderLine_clone_score_details`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.clone_score_info`
- 口径：检查资料对本行所属订单克隆得分提供的明细信息，与同一来源记录的克隆订单得分保持对应。不预设其为可解析的固定结构。

### 大额订单得分 `FalseDistributionOrderLine_large_order_score`

- 类型：decimal
- 字段：`v_ai_sus_ord_inspect_detail.big_score`
- 口径：本行所属订单在检查资料中记录的大额订单得分，与同一记录的得分明细配套。得分不是订单金额，不与克隆订单得分默认采用同一尺度，也不按商品行累计为订单总分。

### 大额得分明细 `FalseDistributionOrderLine_large_order_score_details`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.big_score_info`
- 口径：检查资料对本行所属订单大额得分提供的明细信息，与同一来源记录的大额订单得分对应，不等同历史分销商品明细。

### 最终生效检查时间 `FalseDistributionOrderLine_effective_inspection_time`

- 类型：dateTime
- 字段：`v_ai_sus_ord_inspect_detail.inspect_time`
- 口径：本虚假分销订单商品行在检查资料中记录的最终生效检查时间，不是订单创建、发货或签收时间。该字段不提供全部历次检查，也不能直接解释为虚假行为发生时间。

### 检查结果 `FalseDistributionOrderLine_inspection_result`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.inspect_result`
- 口径：本订单商品行在异常检查资料中记录的检查结果。按本轮用户确认，表内成员已认定为虚假，不再通过本结果二次筛选是否属于虚假分销；结果原值仍作为检查信息保留。

### 虚假原因 `FalseDistributionOrderLine_false_reason`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.inspect_remark`
- 口径：检查资料对本虚假分销订单商品行记录的虚假原因，不等同历史订单备注，也不据此额外推断个人责任结论。

### 检查资料来源 `FalseDistributionOrderLine_inspection_source`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.source_type`
- 口径：异常订单检查记录标注的数据来源，不是分销订单的业务来源。资料未提供来源枚举时保留原始取值。

### 检查派发状态 `FalseDistributionOrderLine_dispatch_status`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.dispatch_status`
- 口径：本订单商品行检查任务在资料中记录的派发状态，不等同订单状态、检查结果或是否虚假。资料未提供编码枚举，不自行转换为布尔值。

### 最近派发人域账号 `FalseDistributionOrderLine_last_dispatcher_account`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.dispatch_user_code`
- 口径：检查资料记录的最近一次派发检查任务者的域账号，与同一记录的派发人姓名配套。它不是员工编码，不等同派发检查人或实际检查人。

### 最近派发人姓名 `FalseDistributionOrderLine_last_dispatcher_name`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.dispatch_user_name`
- 口径：检查资料记录的最近一次派发检查任务者姓名，与同一记录的派发人域账号对应；姓名本身不作为唯一人员标识。

### 派发检查人域账号 `FalseDistributionOrderLine_assigned_inspector_account`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.inspect_person_code`
- 口径：被派发承担本订单检查的人员域账号，与同一记录的派发检查人姓名对应。被派发不证明已实际完成检查，不能与实际检查人账号互换。

### 派发检查人姓名 `FalseDistributionOrderLine_assigned_inspector_name`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.inspect_person_name`
- 口径：检查资料记录的被派发检查人员姓名，与同一记录的派发检查人域账号配套，不等同实际检查人姓名。

### 实际检查人域账号 `FalseDistributionOrderLine_actual_inspector_account`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.actual_inspect_person_code`
- 口径：检查资料记录的实际检查人员域账号，与同一记录的实际检查人姓名对应。它与任务派发人、被派发检查人是不同参与身份，不要求三者相同。

### 实际检查人姓名 `FalseDistributionOrderLine_actual_inspector_name`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.actual_inspect_person_name`
- 口径：检查资料记录的实际检查人员姓名，与同一记录的实际检查人域账号配套；不凭姓名认定与其他参与人员为同一实例。

### 认定记录大区 `FalseDistributionOrderLine_recorded_district_name`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.dis_name`
- 口径：异常检查资料对本虚假订单商品行直接记录的大区名称引用。其归属取值时点未明确，不与历史分销行的当时所属、当时服务或明细附带大区混用。

### 认定记录办事处 `FalseDistributionOrderLine_recorded_office_name`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.off_name`
- 口径：异常检查资料对本虚假订单商品行直接记录的办事处名称引用。它限定检查记录所附组织范围，不自动代表订单当时或任意查询日的组织归属。

### 认定记录所属客户编码 `FalseDistributionOrderLine_recorded_dealer_range_code`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.dealer_range_code`
- 口径：异常检查记录直接引用的所属经销商NF编码，与同一记录的经销商名称对应。它与历史分销明细非orgn所属客户字段表达同一所属参与位置的不同来源记录；本属性专门保留认定资料的引用值，不因关系合并就覆盖历史明细属性、合并来源值或认定编码逐值相等。取值时点尚未明确，不解释为查询当日的当前归属，也不替代订单当时所属或当时服务客户编码。

### 认定记录所属客户名称 `FalseDistributionOrderLine_recorded_dealer_name`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.dealer_name`
- 口径：异常检查记录所附所属经销商名称，与同一记录的所属经销商编码配套。名称不是已验证的唯一客户标识，不用当前客户主数据覆盖本记录。

### 认定记录销售人员编码 `FalseDistributionOrderLine_recorded_sales_employee_code`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.emp_code`
- 口径：异常检查资料直接引用的本虚假订单对应销售人员编码，与同一记录的人员姓名配套。原资料仅标注销售人员，不强制认定为业代、订单创建人或实际检查人。

### 认定记录销售人员姓名 `FalseDistributionOrderLine_recorded_sales_employee_name`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.emp_name`
- 口径：异常检查资料记录的对应销售人员姓名，与同一来源记录的销售人员编码保持对应；该引用不额外表示个人责任认定。

### 认定记录门店名称 `FalseDistributionOrderLine_recorded_store_name`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.cust_name`
- 口径：异常检查资料直接记录的本虚假分销行涉及门店的名称，与继承的交易门店编码在同一检查记录中对应。名称不代表门店编码已合并，也不由当前门店名称覆盖。

### 记录门店拜访星期 `FalseDistributionOrderLine_recorded_store_visit_weekdays`

- 类型：string
- 字段：`v_ai_sus_ord_inspect_detail.visit_week_names`
- 口径：异常检查资料所附门店拜访星期信息，按本订单商品行的认定记录范围解释。它描述记录所附拜访安排，不证明在这些星期已实际拜访，也不是检查任务派发日期。

### 检查记录签收箱数 `FalseDistributionOrderLine_inspected_signed_case_quantity`

- 类型：decimal
- 字段：`v_ai_sus_ord_inspect_detail.sign_box_cnt`
- 口径：异常检查资料直接记录的本订单商品签收数量，单位为箱。它不同于历史分销明细中单位及退货加工方式尚待核定的分销数量，不能作为净分销数量的无条件替代来源。

### 订单编码 `DistributionOrderLine_order_number`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_ai_sus_ord_inspect_detail.dist_ord_no`、`v_trd_dist_ord_dtl.dist_ord_no`、`v_mkt_shdz_sink_dtl_df.dist_ord_no`
- 口径：所属分销订单的dist_ord_no；一张订单可以包含多个商品行，不能将其视为行标识。

### 订单明细标识 `DistributionOrderLine_item_identifier`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dist_ord_item_id`
- 口径：历史分销明细提供的dist_ord_item_id，用于识别订单商品行；其他来源明确以订单编码和商品编码引用该行。

### 商品性质 `DistributionOrderLine_product_role`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.cmdt_tag_name`
- 口径：商品在本订单行中承担的本品、赠品或其他交易性质，不是商品永久类别。初版知识将普通本品、活动本品列为本品，将赠品、毛利赠品、套餐赠品列为赠品；补充业务知识另将普通商品、套餐本品纳入本品，将代配送赠品活动纳入赠品。活跃SKU口径另限定活动本品、普通本品、特价商品，不能用一般本品分类替代。折后供价规则分别限定活动本品和普通本品。

### 交易商品编码 `DistributionOrderLine_product_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_ai_sus_ord_inspect_detail.cmdt_code`、`v_trd_dist_ord_dtl.cmdt_code`、`v_mkt_shdz_sink_dtl_df.cmdt_code`
- 口径：本行交易商品的cmdt_code。与订单编码共同用于其他来源对分销商品行的引用，不与SKU编码或商品SAP编码混用。

### 交易商品SAP编码 `DistributionOrderLine_product_sap_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sap_code`
- 口径：历史分销行直接记录的交易商品SAP编码，与公司商品编码属于不同标识体系。

### 交易SKU编码 `DistributionOrderLine_sku_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sku_code`
- 口径：分销行直接记录的商品统计规格编码。期间门店与SKU的对应按门店编码和本编码识别，SKU去重不同于商品编码去重。

### 交易品类 `DistributionOrderLine_category_name`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.ctg_name`
- 口径：本分销行直接记录的商品品类名称。天然水又称红瓶水、红水，东方树叶又简称树叶；品类不等同三级类目、行销类目或合同品类。

### 交易门店编码 `DistributionOrderLine_store_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_ai_sus_ord_inspect_detail.cust_code`、`v_trd_dist_ord_dtl.cust_code`
- 口径：本分销商品行涉及的实际门店编码。同一门店可有多个服务范围，门店数量按cust_code去重，不按子门店行数统计。

### 交易子门店编码 `DistributionOrderLine_store_scope_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.cust_range_code`
- 口径：分销行所在门店销售服务范围的编码。用于区分同一门店的不同经营服务范围，不与门店编码互换。

### 行内商品类型 `DistributionOrderLine_product_type`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.cmdty_type_name`
- 口径：分销明细所附商品类型。考核分销范围要求为成品，不能仅凭行销类目为水或饮料就纳入终端品或包材。

### 行内行销类目 `DistributionOrderLine_sales_classification`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sales_clfc_type_name`
- 口径：分销明细所附商品行销类目。水和饮料按本分类识别，考核分销限定水或饮料；不以一级类目名称替代。

### 行内商品容量 `DistributionOrderLine_capacity`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.capacity`
- 口径：分销明细所附商品容量规格，按原始容量表达读取。大包装水还须行销类目为水且容量为4L、4.5L、5L、6L或12.9L；5水SKU判断也需结合品类和签收数量，不能仅按容量计数。

### 行内包装规格 `DistributionOrderLine_packaging_specification`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.spec_desc`
- 口径：分销明细所附商品包装规格，也用于解释问数中的规格；不等同容量单值或SKU编码。

### 行内箱规 `DistributionOrderLine_case_specification`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.package_spec`
- 口径：分销明细所附商品箱规，用于解释包装方式和数量口径。仅有箱规不能证明分销数量字段已经按箱计量。

### 行内入数 `DistributionOrderLine_units_per_package`

- 类型：integer，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.entry_cnt`
- 口径：一个标准包装单位内包含的商品数量。例如24入550水表示每箱24瓶550mL水；本属性本身不是分销数量。

### 行内标箱系数 `DistributionOrderLine_standard_case_factor`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sku_factor`
- 口径：分销明细所附商品标箱换算系数，不是已换算的标箱数量。历史数量字段的基础单位尚未确认，不能仅凭本系数声明可直接算出标箱数。

### 订单类型 `DistributionOrderLine_order_type`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_ai_sus_ord_inspect_detail.ord_type`、`v_trd_dist_ord_dtl.ord_type_name`
- 口径：本商品行所属订单的业务类型，与商品性质、订单状态分别解释。历史明细的活跃客户及活跃SKU口径排除分销退货和库存盘点；检查来源的原始类型取值不自动认定与历史类型名称相同。

### 订单状态 `DistributionOrderLine_order_status`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.ord_status_name`
- 口径：本商品行所属订单在来源中记录的状态。知识将已发货定义为未签收业务，此类问数使用订单日期、订单金额和订单数量。订单级状态不自动证明各商品行的签收状态或订单有效性。

### 订单来源 `DistributionOrderLine_order_source`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.ord_src_name`
- 口径：本商品行所属订单记录的业务来源，不等同渠道活动类型或检查资料的数据来源。

### 订单线内外标记 `DistributionOrderLine_line_position_classification`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.line_type_name`
- 口径：订单业务记录的线内或线外分类，与订单当时线路配套解释，不由门店附带线路是否相同反推。

### 订单日期 `DistributionOrderLine_order_date`

- 类型：date，继承自 DistributionOrderLine
- 字段：`v_ai_sus_ord_inspect_detail.create_date`、`v_trd_dist_ord_dtl.create_time`
- 口径：订单创建的日期，用于分销发单、订单金额和订单数量的期间归属。创建订单不表示已经完成签收；历史明细为T+1，不支持今日准实时结论。

### 订单时间 `DistributionOrderLine_order_time`

- 类型：dateTime，继承自 DistributionOrderLine
- 字段：`v_ai_sus_ord_inspect_detail.create_time`、`v_trd_dist_ord_dtl.act_create_time`
- 口径：来源直接记录的订单创建时间，用于订单时点追溯。与订单日期字段分别保留，不擅自认定两者在全部记录中完全对应。

### 签收日期 `DistributionOrderLine_sign_date`

- 类型：date，继承自 DistributionOrderLine
- 字段：`v_ai_sus_ord_inspect_detail.sign_time`、`v_trd_dist_ord_dtl.sign_time`
- 口径：来源记录的分销订单签收日期，用于签收业务的日期解释。分销退货指标要求按退货确认期间归属，但资料尚未证明本字段在退货记录中代表确认日期。

### 签收时间 `DistributionOrderLine_sign_time`

- 类型：dateTime，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.act_sign_time`
- 口径：历史分销明细直接记录的签收时间，用于时点追溯。与签收日期字段分别解释，不据此自动补出退货确认时间。

### 发货时间 `DistributionOrderLine_shipped_time`

- 类型：dateTime，继承自 DistributionOrderLine
- 字段：`v_ai_sus_ord_inspect_detail.send_time`、`v_trd_dist_ord_dtl.etl_time`
- 口径：来源记录的分销订单发货时间，不表示门店已经签收，也不作为签收分销金额的默认统计时间。

### 订单数量 `DistributionOrderLine_order_quantity`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.ord_box_cnt`
- 口径：本商品行的发单数量，按订单日期解释；未签收的已发货业务也使用本数量。资料未明确该字段实际计量单位，不仅凭字段名中的box就固定解释为箱或标箱。

### 含税订单金额 `DistributionOrderLine_order_amount_including_tax`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.ord_amt`
- 口径：本商品行直接记录的含税订单金额，属于发单口径并按订单日期归属，不代表已签收分销金额。

### 订单金额 `DistributionOrderLine_order_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.ord_net_amt`
- 口径：本商品行由ord_net_amt提供的订单金额，按订单日期解释，与明确标注含税的ord_amt分开。现有资料未明确本字段税口径，不仅凭net后缀声明为不含税。

### 分销数量 `DistributionOrderLine_distribution_quantity`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_box_cnt`
- 口径：历史分销商品行直接提供的分销数量。指标业务口径要求有效签收数量扣减对应期间退货数量，并按签收或退货确认期间统计；知识按箱解释，指标又称基本单位数量，实际单位及退货加工方式尚未确认。保留原值，不自行取绝对值或再次扣减退货。

### 含税分销金额 `DistributionOrderLine_distribution_amount_including_tax`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_amt`
- 口径：本商品行直接记录的含税分销金额，与订单金额及不含税分销金额分别解释。按适用签收或退货确认期间统计，保留退货等原始正负号，不与其他金额口径叠加。

### 不含税分销金额 `DistributionOrderLine_distribution_amount_excluding_tax`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_net_amt`
- 口径：本商品行由sign_net_amt提供的分销金额，指标材料将其定义为不含税。业务指标要求有效订单完成签收、退货完成确认，赠品不参与，并扣减对应期间退货；这些条件是否已全部纳入字段加工尚未确认。汇总保留原正负号，不再次乘价格、承担比例或固定税率。

### 签收供价金额 `DistributionOrderLine_signed_supply_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dist_sign_amt`
- 口径：本商品行按供价口径记录的签收金额，不等同一般分销金额或净价金额。数据设计将dist_sign_amt标为含税，供价金额指标却将其用于不含税口径，税含义尚未统一；保留字段值，不自行除以1.13。

### 签收净价金额 `DistributionOrderLine_signed_net_price_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_pure_amt`
- 口径：本商品行按净价口径记录的签收金额。数据设计将sign_pure_amt标为含税，分销净价指标却将其用于不含税口径；税含义尚未统一，不与供价金额互换。

### 签收净价金额（未标税） `DistributionOrderLine_signed_net_price_amount_unmarked_tax`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_pure_net_amt`
- 口径：sign_pure_net_amt直接提供的另一签收净价金额字段。数据设计没有标明其税含义，也没有证明它与sign_pure_amt的转换关系，不能仅凭net后缀认定为不含税净价金额。

### 分销赠品金额 `DistributionOrderLine_distribution_gift_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.gift_sign_net_amt`
- 口径：本商品行提供的分销赠品金额，指标材料将其解释为赠品签收减赠品退货后的含税金额。业务计价要求上单净价优先、无净价时取上单价，退货取原订单对应价格；实际取数使用已提供金额，不自行重复计算，也不把本字段等同分摊至本品的赠品金额。

### 赠品分摊金额 `DistributionOrderLine_gift_allocated_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_net_amt_gift_share`
- 口径：套餐签收赠品金额按本品在同渠道群中的金额比例分摊后，记录在本行的金额。业务公式为渠道群赠品金额合计乘以本品金额占同渠道群本品金额合计的比例；本字段已经提供分摊结果，不能再次按本品比例分摊。总部、大区打仗、自有、毛利和搭赠下沉承担部分另按指标材料，以本值分别乘同一行hq_ratio、fight_ratio、dealer_self_ratio、profit_ratio或sink_ratio原值计算，不自行除以100或进行税率、绝对值转换。金额单位、税口径及参数实际存储尺度仍未明确，不认定五项计算结果与其他系统结果已等价。

### 赠品分摊供价金额 `DistributionOrderLine_gift_allocated_supply_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.off_price_amt_zp_share`
- 口径：本行直接记录的赠品分摊供价金额，与一般赠品分摊金额、供价单价及签收供价金额分别保留。资料未提供足以认定这些字段可互换的计算关系。

### 550搭赠分摊金额 `DistributionOrderLine_gift_550_allocated_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_sales_amt_550_6d1_share`
- 口径：本行由来源字段提供的550搭赠分摊金额，是特定搭赠口径的分摊结果。资料未明确其完整计算与税口径，不能认定它等于一般赠品分摊金额乘下沉承担比例。

### 分销毛利 `DistributionOrderLine_distribution_gross_profit`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dist_gross_profit`
- 口径：本商品行直接提供的分销毛利金额。它不同于指标材料中将毛利加多项费用分摊后再除以1.13的分销毛利.T；本字段税含义与该指标的转换关系尚未确认，不把两者作为同一指标。

### 含税分销毛利 `DistributionOrderLine_distribution_gross_profit_including_tax`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dist_gross_profit_witax`
- 口径：数据设计明确标注的本商品行含税分销毛利，与未明确税含义的dist_gross_profit分开，不认定两者必然按固定税率换算。

### 行内标准上单价 `DistributionOrderLine_standard_order_price`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.stand_price`
- 口径：历史分销明细所附商品标准上单价，不等同分销供价、ERP分销货价或折后供价。资料未明确本字段的价格单位和税含义，不仅凭常见惯例补定。

### 分销供价 `DistributionOrderLine_distribution_supply_price`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.cmdt_box_price`
- 口径：本行记录的分销供价，是单价信息而非签收供价金额，不能直接求和表示分销收入。实际价格单位与税口径未明确，不仅凭box后缀固定解释。

### ERP分销货价 `DistributionOrderLine_erp_distribution_price`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.cmdt_bottle_price`
- 口径：本行记录的ERP分销货价，与分销供价分别解释。资料未明确计价单位，不能仅凭bottle后缀认定为每瓶价格并进行换算。

### 建议供价 `DistributionOrderLine_suggested_supply_price`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sug_offer_price`
- 口径：分销行记录的建议供价，是建议价格，不表示本订单已实际采用该价格。

### 毛利赠品折后价 `DistributionOrderLine_margin_gift_discounted_price`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.mlzf_share_off_price`
- 口径：本行由来源直接提供的毛利赠品折后价，与赠品分摊供价金额和最终折后供价分别保留。资料未证明本字段与指标中其他中间价格名称逐值等价。

### 折后供价 `DistributionOrderLine_discounted_supply_price`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.discounted_cmdt_box_price`
- 口径：本行按商品性质提供的折后供价。指标规则为活动本品采用活动本品全赠品折后价，普通本品采用毛利赠品分摊供价；其他性质不擅自套用。所选范围的折后供货均价应在价格和数量单位一致时，对活动本品、普通本品按分销数量加权，以价格乘数量的合计除以数量合计，而非简单平均；数量合计为零时结果未定义。

### 我司承担比例 `DistributionOrderLine_company_share_ratio`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.cmpy_bear_ratio`
- 口径：分销行所附渠道活动费用的我司承担比例，不等同经销商自有、总部、打仗或下沉等各分项费率。保留来源实际值，资料未明确百分数或小数尺度。

### 最高费率 `DistributionOrderLine_maximum_fee_rate`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.max_fee_rate`
- 口径：分销行所附的最高费率参数，不表示实际已使用费率，也不等同我司承担比例。实际取值尺度按来源保留。

### 经销商自有费率 `DistributionOrderLine_dealer_self_fee_rate`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dealer_self_ratio`
- 口径：本行活动费用中经销商自有费用承担部分的费率参数。指标材料以同一行赠品分摊金额乘dealer_self_ratio原值计算自有费用分摊，使用数据设计实际提供的字段，不采用其他材料中误写的字段名。实际存储尺度尚未明确，不自行除以100，也不对已计算的自有分摊金额重复应用该费率。

### 大区打仗费率 `DistributionOrderLine_district_fight_fee_rate`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.fight_ratio`
- 口径：本行活动费用中大区打仗费用承担部分的费率参数。打仗费用指大区机动促销费用池，指标材料以同一行赠品分摊金额乘本字段原值计算该承担部分。实际存储尺度尚未明确，计算沿用材料原字段乘法，不自行除以100，也不对已有分项金额重复应用该费率。

### 总部费率 `DistributionOrderLine_headquarters_fee_rate`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.hq_ratio`
- 口径：本行活动费用中总部承担部分的费率参数，不是总部实际付款金额。指标材料以同一行赠品分摊金额乘本字段原值计算总部费用分摊；本属性保留实际费率及尚未明确的存储尺度，不自行除以100，也不对已按该费率计算的分项金额再次应用相同比例。

### 经销商毛利率参数 `DistributionOrderLine_dealer_margin_rate`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.profit_ratio`
- 口径：本行活动费用中经销商通过毛利让渡承担部分的毛利率参数。指标材料以同一行赠品分摊金额乘profit_ratio原值计算毛利分摊；它不是由本行分销毛利除以净价金额得到的分销毛利率。实际存储尺度尚未明确，不自行除以100，也不对已计算的毛利分摊金额再次应用该参数。

### 下沉承担比例 `DistributionOrderLine_sink_share_ratio`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sink_ratio`
- 口径：本行费用分摊所附的下沉承担比例。指标材料以同一行赠品分摊金额乘sink_ratio原值计算搭赠下沉分摊，不自行除以100或对已计算金额重复应用该比例。实际存储尺度尚未明确；不因字段同名就与随货搭赠追踪明细中按百分数记录的搭赠下沉比例认定为相同参数，也不认定两类下沉金额已等价。

### 是否渠道活动 `DistributionOrderLine_channel_activity_flag`

- 类型：boolean，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.if_chl_actv`
- 口径：本分销行是否属于渠道活动业务的来源标记，不等同渠道活动已生效，也不证明活动类型一定是分销套餐。

### 渠道活动标识 `DistributionOrderLine_channel_activity_identifier`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.actv_id`
- 口径：本分销行直接引用的渠道活动ID，与渠道活动编码和订单明细ID分别识别。

### 渠道活动编码 `DistributionOrderLine_channel_activity_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.chl_actv_code`
- 口径：本分销行参与的渠道活动编码，不自动等同搭赠下沉套餐编码或活动费用中的计划编码。

### 渠道活动名称 `DistributionOrderLine_channel_activity_name`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_ai_sus_ord_inspect_detail.chl_actv_name`、`v_trd_dist_ord_dtl.chl_actv_name`
- 口径：来源直接记录的本分销行渠道活动名称。水套餐问数口径限定商品行销类目为水且本名称非空，不表示所有有名称的渠道活动都属于分销套餐。

### 渠道活动类型 `DistributionOrderLine_channel_activity_type`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_ai_sus_ord_inspect_detail.chl_actv_type_name`、`v_trd_dist_ord_dtl.chl_actv_type_name`
- 口径：来源记录的本分销行渠道活动类型，与订单类型及商品性质分别解释；活动类型名称不证明跨来源活动实例已匹配。

### 记录渠道活动状态 `DistributionOrderLine_channel_activity_status`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.chl_actv_status_name`
- 口径：分销明细所附渠道活动状态，不等同订单状态或商品行签收状态。资料未明确该状态的取值时点，不宣称为活动在任意查询日的当前状态。

### 记录渠道群 `DistributionOrderLine_recorded_channel_group`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.p2_channel_name`
- 口径：分销明细所附门店渠道群，是理解同渠道群赠品分摊范围的分类信息。资料未证明它必然就是分摊加工所用的历史渠道群，不据此自行重算分摊。

### 记录门店付费类型 `DistributionOrderLine_recorded_store_payment_category`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.cust_pay_type`
- 口径：分销明细所附门店付费类型，属于本条来源记录的分类信息。不能用它替代子门店月度cust_mkt_type或是否常规付费标记，资料未给出这些字段的同口径转换关系。

### 订单备注 `DistributionOrderLine_order_remark`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.remark`
- 口径：本分销商品行所在订单的备注信息，不等同虚假原因或检查备注。

### 原始订单号 `DistributionOrderLine_original_order_number`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.origin_order_no`
- 口径：本分销行记录的原始订单号，可用于解释退货等业务对原订单的引用。仅有原订单号不能唯一定位原订单商品行，也不能自动取得原行价格。

### 红冲标记 `DistributionOrderLine_charge_off_flag`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.charge_off_tag`
- 口径：本分销行记录的红冲业务标记。资料未提供编码枚举，不把它自动转换为布尔值，也不据此擅自排除负额或认定订单无效。

### 参考凭证号 `DistributionOrderLine_reference_voucher_number`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.out_ord_no`
- 口径：本分销行直接记录的参考凭证号，是业务追溯引用，不作为本行唯一标识。

### 当时所属销售客户编码 `DistributionOrderLine_original_dealer_range_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dealer_range_code_orgn`
- 口径：订单当时所属销售客户的销售范围编码，与当时服务销售客户及明细附带所属客户分别保留。

### 当时所属客户SAP编码 `DistributionOrderLine_original_dealer_sap_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dealer_sap_code_orgn`
- 口径：订单当时所属销售客户的SAP编码，与其销售范围编码不是同一种标识。

### 当时服务销售客户编码 `DistributionOrderLine_original_service_dealer_range_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.serv_dealer_range_code_orgn`
- 口径：订单当时服务销售客户的销售范围编码，服务身份与所属身份可以同时记录，不能合并。

### 当时服务客户SAP编码 `DistributionOrderLine_original_service_dealer_sap_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.serv_dealer_sap_code_orgn`
- 口径：订单当时服务销售客户的SAP编码，不等同所属客户SAP编码或服务客户销售范围编码。

### 明细附带所属客户编码 `DistributionOrderLine_recorded_dealer_range_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dealer_range_code`
- 口径：分销明细附带的门店所属销售客户销售范围编码，与明确标注当时归属的字段分开。原始资料未说明本字段对应的快照或查询时点，暂不保证它代表任意查询日的当前所属客户。

### 明细附带所属客户SAP编码 `DistributionOrderLine_recorded_dealer_sap_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dealer_sap_code`
- 口径：分销明细附带的门店所属销售客户SAP编码，按该记录的所属身份解释，取值时点尚未明确。

### 明细附带服务客户编码 `DistributionOrderLine_recorded_service_dealer_range_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.serv_dealer_range_code`
- 口径：分销明细附带的门店服务销售客户销售范围编码，与附带所属客户、当时服务客户分别保留。资料未明确本引用的取值时点。

### 明细附带服务客户SAP编码 `DistributionOrderLine_recorded_service_dealer_sap_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.serv_dealer_sap_code`
- 口径：分销明细附带的门店服务销售客户SAP编码，保留服务身份及来源记录范围。

### 当时业代编码 `DistributionOrderLine_original_representative_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sale_user_code_orgn`
- 口径：订单当时业代的人员编码，用于历史业务归属，不由明细附带业代或当前人员主数据覆盖。

### 明细附带业代编码 `DistributionOrderLine_recorded_representative_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.emp_code`
- 口径：分销明细附带的门店业代编码，与订单当时业代分开。资料未明确附带归属的取值时点，不据此认定该员工就是订单创建人或签收执行人。

### 明细附带主管编码 `DistributionOrderLine_recorded_supervisor_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.p_emp_code`
- 口径：分销明细附带的门店主管人员编码。原字段仅标主管，不强制认定为主任，也不解释为实际参与签收的员工；取值时点尚未明确。

### 当时线路编码 `DistributionOrderLine_original_route_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.line_code`
- 口径：订单当时的业务线路号，与分销明细附带门店线路分别解释。

### 明细附带线路编码 `DistributionOrderLine_recorded_route_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.route_code`
- 口径：分销明细附带的门店线路号，不自动代表订单当时线路。资料未明确其取值时点，也不保证线路编码跨全部服务范围唯一。

### 当时所属办事处 `DistributionOrderLine_original_office_name`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.off_name_orgn`
- 口径：订单当时所属办事处的名称引用，按所属而非服务身份解释；名称引用本身不证明组织编码已经唯一匹配。

### 当时所属大区 `DistributionOrderLine_original_district_name`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dis_name_orgn`
- 口径：订单当时所属大区的直接名称引用，与当时服务大区及明细附带大区分开。

### 当时服务办事处 `DistributionOrderLine_original_service_office_name`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.serv_off_name_orgn`
- 口径：订单当时服务销售客户对应的办事处名称引用，不等同订单所属办事处。

### 当时服务大区 `DistributionOrderLine_original_service_district_name`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.serv_dis_name_orgn`
- 口径：订单当时服务销售客户对应的大区名称引用，与所属大区为不同业务归属。

### 明细附带办事处编码 `DistributionOrderLine_recorded_office_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.off_code`
- 口径：分销明细附带的门店办事处编码，与订单当时所属、当时服务办事处分开。资料未明确附带组织的取值时点。

### 明细附带大区编码 `DistributionOrderLine_recorded_district_code`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.dis_code`
- 口径：分销明细附带的门店大区编码，与当时所属和服务大区分别保留，取值时点尚未明确。

### 当时所属区域 `DistributionOrderLine_original_region_name`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.reg_name_orgn`
- 口径：订单当时所属的上层销售管理区域名称，不表示省市行政区划，与服务区域分别解释。

### 当时服务区域 `DistributionOrderLine_original_service_region_name`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.serv_reg_name_orgn`
- 口径：订单当时服务销售客户对应的上层销售管理区域名称，与订单所属区域为不同参与归属。

### 明细附带区域 `DistributionOrderLine_recorded_region_name`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.reg_name`
- 口径：分销明细附带的门店上层销售管理区域名称，不表示国家、省、市等地理属性。资料未明确其归属取值时点。

### 总部费用分摊金额 `DistributionOrderLine_headquarters_allocated_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_net_amt_gift_share`、`v_trd_dist_ord_dtl.hq_ratio`
- 口径：本分销行活动费用中由总部承担的部分，计算为同一行sign_net_amt_gift_share乘hq_ratio。仅对所选签收期间内、商品类型为成品且行销类目为水或饮料的历史行计算，汇总时先逐行相乘再合计，不将两个输入分别汇总后相乘。采用原字段乘法，保留正负号和零值；任一输入为空时结果为空，不补0、不除以100、不作税率或绝对值转换。金额单位、税口径及费率实际尺度尚未明确，本值不是已确认的总部实付金额或其他系统等价结果。

### 大区打仗费用分摊金额 `DistributionOrderLine_district_fight_allocated_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_net_amt_gift_share`、`v_trd_dist_ord_dtl.fight_ratio`
- 口径：本分销行活动费用中由大区机动促销费用池承担的部分，计算为同一行sign_net_amt_gift_share乘fight_ratio。仅对所选签收期间内、商品类型为成品且行销类目为水或饮料的历史行计算，汇总时先逐行相乘再合计，不将两个输入分别汇总后相乘。采用原字段乘法，保留正负号和零值；任一输入为空时结果为空，不补0、不除以100、不作税率或绝对值转换。金额单位、税口径及费率实际尺度尚未明确，本值不表示已经核销或实付，也不证明与其他系统结果等价。

### 自有费用分摊金额 `DistributionOrderLine_dealer_self_allocated_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_net_amt_gift_share`、`v_trd_dist_ord_dtl.dealer_self_ratio`
- 口径：本分销行活动费用中由经销商自有费用承担的部分，计算为同一行sign_net_amt_gift_share乘dealer_self_ratio。仅对所选签收期间内、商品类型为成品且行销类目为水或饮料的历史行计算，汇总时先逐行相乘再合计，不将两个输入分别汇总后相乘。采用原字段乘法，保留正负号和零值；任一输入为空时结果为空，不补0、不除以100、不作税率或绝对值转换。金额单位、税口径及费率实际尺度尚未明确，本值不表示已经核销或实付，也不证明与其他系统结果等价。

### 毛利分摊金额 `DistributionOrderLine_dealer_margin_allocated_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_net_amt_gift_share`、`v_trd_dist_ord_dtl.profit_ratio`
- 口径：本分销行活动费用中通过经销商毛利让渡承担的部分，计算为同一行sign_net_amt_gift_share乘profit_ratio。它是费用承担分摊，不是dist_gross_profit记录的分销毛利，也不是分销毛利.T。仅对所选签收期间内、商品类型为成品且行销类目为水或饮料的历史行计算，先逐行相乘再合计。采用原字段乘法，保留正负号和零值；任一输入为空时结果为空，不补0、不除以100、不作税率或绝对值转换。金额单位、税口径及参数实际尺度尚未明确，不证明与其他系统结果等价。

### 搭赠下沉分摊金额 `DistributionOrderLine_gift_sink_allocated_amount`

- 类型：decimal，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.sign_net_amt_gift_share`、`v_trd_dist_ord_dtl.sink_ratio`
- 口径：本分销行搭赠政策赠品金额折算下沉分摊的部分，计算为同一行sign_net_amt_gift_share乘sink_ratio。仅对所选签收期间内、商品类型为成品且行销类目为水或饮料的历史行计算，先逐行相乘再合计。采用原字段乘法，保留正负号和零值；任一输入为空时结果为空，不补0、不除以100、不作税率或绝对值转换。金额单位、税口径及比例实际尺度尚未明确；本计算不作为550搭赠分摊字段或随货搭赠追踪明细下沉金额的无条件替代，也不证明与其他系统结果等价。

### 记录终端品柜数量 `DistributionOrderLine_recorded_terminal_product_cabinet_count`

- 类型：integer，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.food_dev_cnt`
- 口径：分销商品行附带的终端品柜数量，描述该业务记录所载的设备信息，不是订单商品数量或稽查实盘数量。来源未明确设备数量的取值时点，不认定为当前或订单发生时的设备数；不能按订单商品行直接累加，也不能以子门店月表的同名数量替代。

### 记录冰柜数量 `DistributionOrderLine_recorded_freezer_count`

- 类型：integer，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.cold_dev_cnt`
- 口径：分销商品行附带的冰柜数量，不是订购、签收的商品数量，也不是稽查实盘台数。来源未明确取值时点，不认定为当前或订单发生时的设备数；同一门店可能在多条商品行重复携带该值，不能按订单行直接累加，也不以月度子门店数量替代。

### 商品明细分类 `DistributionOrderLine_item_classification_name`

- 类型：string，继承自 DistributionOrderLine
- 字段：`v_trd_dist_ord_dtl.item_type_name`
- 口径：本分销商品行直接记录的商品明细分类名称。与商品类型、商品性质及订单类型分别保存，不将其自动解释为本品或赠品分类；保留原始值和空值，不补造枚举或换用其他分类字段。
