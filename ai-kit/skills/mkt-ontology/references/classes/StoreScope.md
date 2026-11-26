# 子门店 `StoreScope`

- 分组：渠道
- 父类：无

## 说明

同一门店在特定渠道和销售服务范围内的经营对象，以cust_range_code识别，可以分别由不同经销商、业代和线路服务。当前维表描述当前归属；月度指标按ym与本子门店配套保存，月度状态、人员归属、费用、进货目标和设备数量不能解释为永久属性或拆成不对应的列表。服务客户统计在所选月排除已不合作，并按cust_code去重；门店占比的分母使用该服务客户数。月度费用中的应发、实发、作废、未发是门店账单汇总，不是单笔支付或单个陈列项金额。

## 指出的关系

- 对应门店 → 门店 `StoreScope_of_store`
  子门店的cust_code指向其实际门店。同一门店可有多个cust_range_code，不能把范围拆分计为新增门店。
- 所属销售客户 → 经销商 `StoreScope_owned_by_dealer`
  dealer_range_code记录子门店所属经销商；当前维表取当前归属，月度来源与同一行ym配套，不与服务或配送身份合并。
- 服务销售客户 → 经销商 `StoreScope_served_by_dealer`
  serv_dealer_range_code记录为子门店提供服务的经销商，不以所属经销商字段替代。
- 配送销售客户 → 经销商 `StoreScope_delivered_by_dealer`
  dlv_dealer_range_code记录承担子门店配送的经销商，与所属、服务经销商分别保留。
- 负责业代 → 业代 `StoreScope_sales_representative`
  emp_code记录负责本子门店的业代；月度来源的人员必须与该行ym对应，不能用当前人员覆盖。
- 负责主任 → 主任 `StoreScope_supervisor`
  资料明确标为主任的p_emp_code记录本子门店对应主任，月度归属保留年月。
- 负责理货员 → 员工 `StoreScope_merchandiser`
  lhy_emp_code记录本子门店的理货员，与负责业代为可同时成立的不同参与身份。
- 业代服务线路 → 线路 `StoreScope_sales_route`
  route_code记录本子门店的业代线路，与相应人员、拜访频次和日期安排配套。
- 理货服务线路 → 线路 `StoreScope_merchandising_route`
  lhy_route_code记录本子门店的理货线路，不与业代route_code互换。
- 归属办事处 → 办事处 `StoreScope_office`
  off_code、off_name记录子门店所属办事处，当前和月度来源按各自期间解释。
- 归属大区 → 大区 `StoreScope_district`
  dis_code、dis_name直接记录子门店所属大区，不能仅由当前办事处层级替代历史月度归属。
- 当前所属事业部 → 事业线 `StoreScope_business_line`
  子门店当前所属的事业部，由v_dim_chl_sub_cust_df中同一cust_range_code记录的bns_code直接引用，复用StoreScope_business_line_code属性。仅表达当前维表归属，不从经销商、人员或费用归属反推，也不将该值作为历史月份的事业部归属。保留来源原编码，本关系不证明bns_code与其他来源bsn_code逐值等价或跨来源实例已匹配。
- 归属区域 → 公司组织 `StoreScope_region`
  子门店在来源记录中直接注明的公司销售管理区域，不是省市行政区划。v_dim_chl_sub_cust_df以同一cust_range_code记录的reg_code、reg_name表示当前归属；v_dim_chl_sub_cust_indct_mi以同一ym、cust_range_code记录的reg_name表示月度归属；v_trd_dist_ord_dtl以同一订单商品行的cust_range_code、reg_name记录明细附带区域，取值时点尚未明确，不认定为查询当日的当前归属。复用StoreScope_region_code、StoreScope_region_name，分别保留各来源的子门店、月份或分销行对应，不沿大区当前层级替换直接引用，也不推定名称已匹配到组织编码。

## 指入的关系

- 分销订单行 → 交易子门店 `DistributionOrderLine_store_scope`
  历史分销行的cust_range_code记录交易所属子门店；仅有cust_code的来源不能自行指定某个子门店。
- 月度分销目标 → 门店进货目标主体 `DistributionTarget_store_scope`
  子门店月度指标中的total_target、water_target属于该ym和cust_range_code的目标，不按门店当前维表重复复制。
- 活动计划明细 → 关联子门店 `ActivityPlanDetail_store_scope`
  cust_range_code记录明细涉及的门店经营范围，不从cust_code任意选择子门店。
- 陈列签约 → 签约子门店 `DisplaySigning_store_scope`
  cust_range_code直接记录签约所在的门店经营范围。
- 月度陈列项检查结果 → 检查子门店 `DisplayItemInspection_store_scope`
  cust_range_code记录本月陈列项检查的经营范围，是声明粒度的一部分。

## 属性

### 子门店编码 `StoreScope_scope_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.cust_range_code`、`v_dim_chl_sub_cust_indct_mi.cust_range_code`、`v_trd_dist_ord_dtl.cust_range_code`、`v_mkt_market_actv_plan_verify_cost.cust_range_code`、`v_mkt_actv_inspect_result.cust_range_code`、`v_mkt_dsp_actv_info_mi.cust_range_code`
- 口径：门店在销售服务范围内的编码，取cust_range_code；不与门店编码混用。

### 指标所属月 `StoreScope_indicator_month`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.ym`
- 口径：月度指标所属年月，取ym，按YYYYMM解释。同一行的状态、服务归属、设备数量、进货目标和费用均与本月及本子门店对应。月度分析须限定月份，未说明月份时知识口径默认本月；跨月分析仍保留逐月对应，不用于给当前维表虚构历史月份。

### 月度门店付费类型 `StoreScope_payment_category`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.cust_mkt_type`
- 口径：月度cust_mkt_type分类：合约店、常规店、非付费店。合约标记优先，兼具常规和合约身份时归为合约店；陈列付费门店取合约店或常规店。

### 月度常规付费标记 `StoreScope_regular_payment_flag`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.is_convent_code`
- 口径：月度is_convent_code表示的常规付费身份。知识中的付费客户按本标记识别，不用cust_mkt_type等于常规店替代，也不等同全部陈列付费门店。

### 月度合约店标记 `StoreScope_contract_flag`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.is_conshop`
- 口径：月度is_conshop表示的合约店身份，与常规付费身份可以同时成立；是否已确认通过还须解释conshop_sign_status，不能仅凭合约身份判定。

### 对应门店编码 `StoreScope_customer_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.cust_code`、`v_dim_chl_sub_cust_indct_mi.cust_code`、`v_trd_dist_ord_dtl.cust_code`、`v_mkt_market_actv_plan_verify_cost.cust_code`、`v_mkt_actv_inspect_result.cust_code`、`v_mkt_dsp_actv_info_mi.cust_code`
- 口径：本子门店记录直接引用的实际门店编码，表示子门店对应哪个终端客户。同一cust_code可以对应多个子门店；统计门店数使用门店编码去重，不按子门店行数计数。

### 记录所附门店名称 `StoreScope_customer_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.cust_name`、`v_dim_chl_sub_cust_indct_mi.cust_name`、`v_trd_dist_ord_dtl.cust_name`、`v_mkt_market_actv_plan_verify_cost.cust_name`、`v_mkt_actv_inspect_result.cust_name`、`v_mkt_dsp_actv_info_mi.cust_name`
- 口径：子门店记录直接附带的实际门店名称，不是子门店另设的独立名称。名称按各来源记录的业务范围解释，不能仅凭同名合并不同门店编码。

### 所属事业部编码 `StoreScope_business_line_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.bns_code`
- 口径：当前子门店维表直接记录的所属事业部引用编码。它限定本记录的事业部归属，不以人员组织编码或关联活动的事业线编码替代。

### 归属办事处编码 `StoreScope_office_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.off_code`、`v_dim_chl_sub_cust_indct_mi.off_code`、`v_trd_dist_ord_dtl.off_code`
- 口径：子门店记录所附的归属办事处引用编码。当前维表归属、月度指标的ym归属和分销明细附带归属分别解释，不用当前组织覆盖历史月份，也不把签约行政办事处无条件并入本口径。

### 归属办事处名称 `StoreScope_office_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.off_name`、`v_dim_chl_sub_cust_indct_mi.off_name`、`v_trd_dist_ord_dtl.off_name`
- 口径：与本子门店归属办事处编码配套的名称，保留来源记录的当前或月度归属范围。

### 归属大区编码 `StoreScope_district_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.dis_code`、`v_dim_chl_sub_cust_indct_mi.dis_code`、`v_trd_dist_ord_dtl.dis_code`
- 口径：子门店记录直接附带的归属大区引用编码。当前和月度来源分别解释，不仅沿当前办事处层级反推月度大区。

### 归属大区名称 `StoreScope_district_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.dis_name`、`v_dim_chl_sub_cust_indct_mi.dis_name`、`v_trd_dist_ord_dtl.dis_name`
- 口径：子门店记录直接附带的归属大区名称，与同一来源的大区编码和期间对应。

### 归属区域编码 `StoreScope_region_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.reg_code`
- 口径：当前子门店维表直接记录的上层销售管理区域引用编码，不表示省市行政区划。

### 归属区域名称 `StoreScope_region_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.reg_name`、`v_dim_chl_sub_cust_indct_mi.reg_name`、`v_trd_dist_ord_dtl.reg_name`
- 口径：子门店记录直接注明的公司销售管理区域名称，不是省市行政区划。当前维表表示当前归属，月度指标表示同一ym、cust_range_code对应的月度归属，历史分销明细表示该订单商品行所附的子门店区域，其取值时点尚未明确，不能认定为查询当日的当前归属。各来源分别保留区域与子门店、期间或分销行的对应，不以大区当前所属区域替代直接记录值，也不据名称认定已经匹配到组织编码。

### 所属销售客户范围编码 `StoreScope_owned_dealer_range_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.dealer_range_code`、`v_dim_chl_sub_cust_indct_mi.dealer_range_code`、`v_trd_dist_ord_dtl.dealer_range_code`
- 口径：本子门店记录直接引用的所属经销商销售范围编码，与服务、配送经销商引用分别保留。当前维表、月度指标和分销附带归属按各自记录范围解释。

### 所属销售客户C编码 `StoreScope_owned_dealer_customer_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.dealer_code`
- 口径：当前子门店记录直接附带的所属经销商C编码，不是销售范围编码，也不是SAP编码。

### 所属销售客户名称 `StoreScope_owned_dealer_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.dealer_name`、`v_dim_chl_sub_cust_indct_mi.dealer_name`、`v_trd_dist_ord_dtl.dealer_name`
- 口径：子门店记录直接附带的所属经销商名称，与同一来源的所属销售客户引用对应，不用于替代服务或配送客户名称。

### 所属销售客户SAP编码 `StoreScope_owned_dealer_sap_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.dealer_sap_code`、`v_trd_dist_ord_dtl.dealer_sap_code`
- 口径：子门店记录直接附带的所属经销商SAP编码，与同一记录的所属客户身份及期间对应，不与销售范围编码互换。

### 记录所附所属客户类型 `StoreScope_owned_dealer_type_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.dealer_type_name`、`v_trd_dist_ord_dtl.dealer_type_name`
- 口径：子门店记录直接附带的所属经销商类型名称，按来源记录及期间解释。它不是门店付费类型，也不等同维表的销售客户类型归属。

### 服务销售客户范围编码 `StoreScope_service_dealer_range_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.serv_dealer_range_code`、`v_trd_dist_ord_dtl.serv_dealer_range_code`
- 口径：子门店记录直接引用的服务经销商销售范围编码，表示服务身份，不以所属或配送经销商替代。

### 服务销售客户C编码 `StoreScope_service_dealer_customer_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.serv_dealer_code`
- 口径：当前子门店记录直接附带的服务经销商C编码，保留服务参与身份，不与所属客户C编码混用。

### 服务销售客户名称 `StoreScope_service_dealer_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.serv_dealer_name`、`v_trd_dist_ord_dtl.serv_dealer_name`
- 口径：子门店记录直接附带的服务经销商名称，与同一来源的服务客户引用对应。

### 记录所附服务客户SAP编码 `StoreScope_service_dealer_sap_code`

- 类型：string
- 字段：`v_trd_dist_ord_dtl.serv_dealer_sap_code`
- 口径：分销明细直接附带的本子门店服务经销商SAP编码，与同一行服务销售范围编码配套。取值时点尚未明确，不认定为当前服务客户标识；与交易当时服务客户SAP编码分别保留，不与服务销售范围编码互换。

### 记录所附服务客户类型 `StoreScope_service_dealer_type_name`

- 类型：string
- 字段：`v_trd_dist_ord_dtl.serv_dealer_type_name`
- 口径：分销明细附带的本子门店服务经销商类型，不是所属经销商类型或门店类型。

### 配送销售客户范围编码 `StoreScope_delivery_dealer_range_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.dlv_dealer_range_code`
- 口径：当前子门店记录直接引用的配送经销商销售范围编码，表示承担配送的客户，与所属、服务客户分别识别。

### 配送销售客户C编码 `StoreScope_delivery_dealer_customer_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.dlv_dealer_code`
- 口径：当前子门店记录直接附带的配送经销商C编码，不与配送销售范围编码混用。

### 配送销售客户名称 `StoreScope_delivery_dealer_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.dlv_dealer_name`
- 口径：当前子门店记录直接附带的配送经销商名称，与配送客户引用对应，不用服务客户名称替代。

### 负责业代编码 `StoreScope_representative_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.emp_code`、`v_dim_chl_sub_cust_indct_mi.emp_code`、`v_trd_dist_ord_dtl.emp_code`、`v_mkt_dsp_actv_info_mi.emp_code`
- 口径：本子门店记录直接引用的负责业代编码。当前维表、月度指标及签约执行月的门店所属人员分别解释，不取签约业代或订单当时业代替代。

### 负责业代姓名 `StoreScope_representative_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.emp_name`、`v_dim_chl_sub_cust_indct_mi.emp_name`、`v_trd_dist_ord_dtl.emp_name`、`v_mkt_dsp_actv_info_mi.emp_name`
- 口径：与本子门店负责业代引用配套的姓名，保留来源记录的期间，不与签约人姓名混用。

### 负责主任编码 `StoreScope_supervisor_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p_emp_code`、`v_dim_chl_sub_cust_indct_mi.p_emp_code`、`v_mkt_dsp_actv_info_mi.p_emp_code`
- 口径：资料明确标为主任的本子门店人员引用编码。月度及签约执行月的主任与对应来源期间配套；仅标为主管或一般上级的字段不无条件作为主任来源。

### 负责主任姓名 `StoreScope_supervisor_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p_emp_name`、`v_dim_chl_sub_cust_indct_mi.p_emp_name`、`v_mkt_dsp_actv_info_mi.p_emp_name`
- 口径：与本子门店明确记录的主任编码配套的姓名，不将一般主管姓名无条件解释为主任。

### 负责理货员编码 `StoreScope_merchandiser_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.lhy_emp_code`
- 口径：当前子门店记录直接引用的理货员编码，与业代是可同时成立的不同服务身份。

### 负责理货员姓名 `StoreScope_merchandiser_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.lhy_emp_name`
- 口径：当前子门店记录直接附带的理货员姓名，不以负责业代姓名替代。

### 业代服务线路编码 `StoreScope_sales_route_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.route_code`、`v_trd_dist_ord_dtl.route_code`、`v_mkt_dsp_actv_info_mi.route_code`
- 口径：子门店记录直接引用的业代服务线路编码，与相应来源的业代及业务范围配套。当前线路、签约执行月记录的线路和订单当时线路不能互换。

### 理货服务线路编码 `StoreScope_merchandising_route_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.lhy_route_code`
- 口径：当前子门店记录直接引用的理货员服务线路编码，不与业代服务线路混用。

### 业代拜访日期编码 `StoreScope_sales_visit_week_codes`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.visit_weeks`
- 口径：当前维表中业代服务安排的拜访日期编码值，与本行业代线路、业代和日期名称配套。它是拜访安排，不证明已经拜访；编码的组合形式按原值保留。

### 业代拜访日期名称 `StoreScope_sales_visit_week_names`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.visit_week_names`
- 口径：当前维表记录的业代拜访安排日期名称，与同一记录的visit_weeks配套，不表示实际拜访日期。

### 业代拜访频次 `StoreScope_sales_visit_frequency`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.freq_desc`
- 口径：当前子门店业代服务安排中的拜访频次描述，与业代线路及拜访日期安排配套，不是月度实际拜访次数。

### 理货拜访日期编码 `StoreScope_merchandising_visit_week_codes`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.lhy_visit_weeks`
- 口径：当前维表中理货服务安排的拜访日期编码值，与本行理货员、理货线路及日期名称配套，不与业代安排混合。

### 理货拜访日期名称 `StoreScope_merchandising_visit_week_names`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.lhy_visit_week_names`
- 口径：当前维表记录的理货拜访安排日期名称，与理货日期编码配套，不表示已经执行理货拜访。

### 理货拜访频次 `StoreScope_merchandising_visit_frequency`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.lhy_freq_desc`
- 口径：当前子门店理货服务安排中的拜访频次描述，不以业代频次或月度拜访次数替代。

### 对应门店状态编码 `StoreScope_customer_status_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.cust_status`
- 口径：当前子门店记录所附的终端客户状态编码，描述对应实际门店的状态，不是子门店经营范围状态。

### 对应门店状态 `StoreScope_customer_status_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.cust_status_name`、`v_dim_chl_sub_cust_indct_mi.cust_status_name`、`v_trd_dist_ord_dtl.cust_status_name`
- 口径：子门店记录所附的终端客户状态名称，与子门店状态区分。服务客户统计使用所选月的本字段排除“已不合作”，再按cust_code去重；不能改用当前维表状态或子门店状态覆盖该月口径。

### 子门店状态编码 `StoreScope_sub_scope_status_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.sub_cust_status`
- 口径：当前子门店经营范围的状态编码，描述本服务范围本身，不与终端客户状态编码合并。

### 子门店状态 `StoreScope_sub_scope_status_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.sub_cust_status_name`
- 口径：当前子门店经营范围的状态名称，与对应实际门店的终端客户状态分别保留。其他仅有门店编码的检查来源不能自动指定为本子门店的状态。

### 记录所附门店等级 `StoreScope_customer_level_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.level_name`、`v_dim_chl_sub_cust_indct_mi.level_name`、`v_trd_dist_ord_dtl.level_name`、`v_mkt_dsp_actv_info_mi.level_name`
- 口径：子门店记录所附的终端客户等级名称，按来源期间解释。知识中的“钻金银”限定等级为钻石、金或银，不与市场层级或经销商等级混用。

### 记录所附开始合作日期 `StoreScope_cooperation_start_date`

- 类型：date
- 字段：`v_dim_chl_sub_cust_df.cooperate_start_date`、`v_trd_dist_ord_dtl.cooperate_start_date`
- 口径：子门店记录直接附带的开始合作日期。知识中的新店默认指本财年开始合作的门店，财年为上年12月至本年11月；不能把日期本身当作永久的新店标记，也不推定同一门店所有服务范围必有相同日期。

### 记录所附结束合作日期 `StoreScope_cooperation_end_date`

- 类型：date
- 字段：`v_dim_chl_sub_cust_df.cooperate_end_date`、`v_trd_dist_ord_dtl.cooperate_end_date`
- 口径：子门店记录直接附带的结束合作日期，不等同订单结束或活动终止日期；不单凭本日期推导未明确的状态变化规则。

### 不合作原因编码 `StoreScope_non_cooperation_reason_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.no_coop_reason`
- 口径：当前子门店维表记录的不合作原因编码，与同一行原因描述和状态对应，不推定所有子门店均有原因值。

### 不合作原因 `StoreScope_non_cooperation_reason`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.no_coop_reason_dtl`
- 口径：当前子门店维表记录的不合作原因描述，不从客户状态名称推算原因。

### 一店通标记 `StoreScope_one_store_platform_flag`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.is_ydt`、`v_dim_chl_sub_cust_indct_mi.is_ydt`、`v_trd_dist_ord_dtl.is_ydt`
- 口径：子门店记录直接附带的是否一店通标记。当前维表和月度指标明确以1表示是、0表示否，原标记按字符串保留；各来源期间分别解释，不将平台开通标记当作费用已经发放。

### 子渠道编码 `StoreScope_subchannel_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.channel_code`、`v_mkt_dsp_actv_info_mi.chl_code`
- 口径：子门店记录直接附带的子渠道编码，用于识别渠道服务范围，不与生动化渠道或渠道群编码合并。

### 子渠道 `StoreScope_subchannel_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.channel_name`、`v_dim_chl_sub_cust_indct_mi.channel_name`、`v_trd_dist_ord_dtl.channel_name`、`v_mkt_dsp_actv_info_mi.chl_name`
- 口径：子门店记录直接附带的子渠道名称，当前、月度及签约资料分别按来源期间解释。

### 生动化渠道编码 `StoreScope_vivid_channel_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p_channel_code`
- 口径：当前子门店记录的生动化渠道编码，是与子渠道、渠道群分别记录的渠道层级。

### 生动化渠道 `StoreScope_vivid_channel_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p_channel_name`、`v_dim_chl_sub_cust_indct_mi.p_channel_name`、`v_trd_dist_ord_dtl.p_channel_name`
- 口径：子门店记录明确标注的生动化渠道名称，与子渠道及渠道群区分，按来源记录期间解释。

### 渠道群编码 `StoreScope_channel_group_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p2_channel_code`、`v_mkt_dsp_actv_info_mi.p2_chl_code`
- 口径：子门店记录直接附带的渠道群编码，不与子渠道编码或生动化渠道编码互换。

### 渠道群 `StoreScope_channel_group_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.p2_channel_name`、`v_dim_chl_sub_cust_indct_mi.p2_channel_name`、`v_trd_dist_ord_dtl.p2_channel_name`、`v_mkt_dsp_actv_info_mi.p2_chl_name`
- 口径：子门店记录直接附带的渠道群名称，各来源按其当前或业务期间解释，不从子渠道名称猜测归组。

### 当前维表市场层级编码 `StoreScope_current_market_level_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.market_level`
- 口径：当前子门店维表中注释为市场层级编码的market_level原值。月度表同名字段被注释为行政区划类别，二者含义尚未统一，暂不将本列用于乡镇市场分类，也不认定它必与mkt_level_name构成编码名称对。

### 记录所附行政区划类别 `StoreScope_administrative_area_category`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.market_level`、`v_trd_dist_ord_dtl.market_level`
- 口径：来源明确标为行政区划类别的子门店记录值。知识中的乡镇市场限定本类别为乡或镇；它不同于省市名称或市场层级名称，月度分析使用与ym配套的类别。

### 记录所附市场层级 `StoreScope_market_level_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.mkt_level_name`、`v_dim_chl_sub_cust_indct_mi.mkt_level_name`、`v_trd_dist_ord_dtl.mkt_level_name`、`v_mkt_dsp_actv_info_mi.mkt_level_name`
- 口径：子门店记录附带的市场层级名称，与行政区划类别、门店等级及销售客户市场等级区分。当前和各业务期间来源分别解释。

### 销售客户类型归属 `StoreScope_sales_customer_type_affiliation`

- 类型：string
- 字段：`v_dim_chl_sub_cust_df.cust_sale_range_name`
- 口径：当前子门店维表记录的销售客户类型归属值，用于说明本记录的销售服务归属分类，不直接当作所属经销商dealer_type_name。

### 月度记录所附最近拜访日期 `StoreScope_latest_visit_date`

- 类型：date
- 字段：`v_dim_chl_sub_cust_indct_mi.last_jdqm_photo_time`
- 口径：月度指标记录所附的最近一次拜访日期。它与该ym记录对应，但不能仅因记录属于该月就认定最近拜访一定发生在本月，也不由字段中的photo字样改解释为独立拍照事件日期。

### 月度拜访次数 `StoreScope_monthly_visit_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.visit_times`
- 口径：本子门店月度指标记录记载的拜访次数，与ym及cust_range_code配套，不是计划拜访门店数或拜访频次描述。

### 月度成功拜访次数 `StoreScope_monthly_successful_visit_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.visit_sucess_times`
- 口径：本子门店月度指标记录记载的成功拜访次数，与同一行拜访次数配套。成功拜访不等同陈列检查完成、协访合格或计划内拜访。

### 月度设备客户标记 `StoreScope_monthly_device_customer_flag`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.is_dev_cust`
- 口径：本子门店月度记录的是否设备客户标记。知识中的设备客户按“是否设备客户为是”识别；本标记不等同设备检查通过，也不推定设备总数。

### 月度冰柜客户标记 `StoreScope_monthly_freezer_customer_flag`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.is_cold_dev_cust`
- 口径：本子门店月度记录的是否冰柜客户标记。知识中询问有冰箱的门店时按冰柜客户身份解释，不与稽查冰柜检查标记混用。

### 月度多门柜客户标记 `StoreScope_monthly_multidoor_customer_flag`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.is_multi_dev_cust`
- 口径：本子门店月度记录的是否多门柜客户标记，不等同多门柜稽查实盘、检查或纯净度合格状态。

### 月度冰柜台数 `StoreScope_monthly_freezer_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.cold_dev_cnt`
- 口径：本子门店月度记录记载的冰柜数量，单位台。它是设备数量指标，不是执行次数或稽查实盘台数；不跨月份相加为某时点设备数。

### 月度冰柜门数 `StoreScope_monthly_freezer_door_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.cold_dev_door_cnt`
- 口径：本子门店月度记录记载的冰柜门数，单位门，与同一月冰柜台数配套，不能按台数解释。

### 月度单门冰柜台数 `StoreScope_monthly_single_door_freezer_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.one_door_cold_dev_cnt`
- 口径：本子门店月度记录记载的单门冰柜数量，单位台，不是门数或检查合格数量。

### 月度双门冰柜台数 `StoreScope_monthly_double_door_freezer_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.two_door_cold_dev_cnt`
- 口径：本子门店月度记录记载的双门冰柜数量，单位台，不把每台两门直接当作本字段值。

### 月度多门冰柜台数 `StoreScope_monthly_multidoor_freezer_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.multi_dev_cnt`
- 口径：本子门店月度记录记载的多门冰柜数量，单位台，不等同多门柜客户家数或多门柜门数。

### 月度多门冰柜门数 `StoreScope_monthly_multidoor_door_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.multi_door_cnt`
- 口径：本子门店月度记录记载的多门冰柜门数，单位门，与多门冰柜台数配套，不表示我司陈列占用门数或纯净度比例。

### 月度暖柜台数 `StoreScope_monthly_warm_cabinet_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.hot_dev_cnt`
- 口径：本子门店月度记录记载的暖柜数量，单位台，与普通冰柜和多门冰柜数量分别记录，不是暖柜稽查盘盈或盘亏台数。

### 月度暖柜门数 `StoreScope_monthly_warm_cabinet_door_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.hot_dev_door_cnt`
- 口径：本子门店月度记录记载的暖柜门数，单位门，与同一行暖柜台数配套。

### 月度终端品冰柜台数 `StoreScope_monthly_terminal_product_freezer_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.food_dev_cnt`
- 口径：本子门店月度记录记载的终端品冰柜数量，单位台。保留来源的设备类别，不据名称将其认定为普通柜或稽查纯净度分母。

### 月度水堆标记 `StoreScope_monthly_water_stack_flag`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.is_sd`
- 口径：本子门店月度记录中的是否水堆标记，不表示水堆检查合格、位置赢比结果或水堆执行数量。

### 月度冰冻化标记 `StoreScope_monthly_chilled_display_flag`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.is_bdh`
- 口径：本子门店月度记录中的是否冰冻化标记，不等同冰冻层数达到某阈值、执行合格或设备纯净度合格。

### 月度协议签约状态 `StoreScope_monthly_agreement_signing_status`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.conshop_sign_status`
- 口径：本子门店月度记录的门店协议签约状态，知识列出的状态包括已确认、待确认和审批中。合约身份与确认状态分别判断；资料明确待确认表示合约店未确认通过，审批中保持为独立状态，不与待确认合并。

### 月度进货目标金额 `StoreScope_monthly_purchase_target_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.total_target`
- 口径：为本子门店该月记录的进货目标金额，属于经销商向门店分销的目标，不是公司向经销商销售的预算目标。多月目标汇总各月目标，但不能把月目标按每条分销订单重复展开后累计。

### 月度水进货目标金额 `StoreScope_monthly_water_purchase_target_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.water_target`
- 口径：为本子门店该月记录的水进货目标金额，水按商品行销类目为水解释。它是总进货目标的分项目标，不与总目标相加。

### 月度陈列计划金额 `StoreScope_monthly_display_plan_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.sign_amt_mtd`
- 口径：本子门店月度指标记录的陈列计划金额。它与陈列应发、实发及核销价金额是不同阶段口径，不是单个签约金额；不沿签约或活动明细展开后重复累计。

### 月度陈列应发金额 `StoreScope_monthly_display_payable_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.confirm_amt_mtd`
- 口径：根据门店陈列费账单汇总并在本子门店该月记录的应发金额，不是活动财务确认金额、陈列核销价或已核销金额。不能无分摊依据拆成单个陈列项金额。

### 月度记录渠道投资金额 `StoreScope_monthly_channel_investment_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.dist_chl_invest_amt`
- 口径：本子门店月度指标直接记录的渠道投资金额，保留该ym及服务范围。不据投资名称解释为现金实付、钱包变动或活动核销金额，也不擅自认定为财年累计值。

### 月度超额返利应发金额 `StoreScope_monthly_excess_rebate_payable_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.bill_plan_pay_amt_3`、`v_dim_chl_sub_cust_indct_mi.excess_estimate_amt`
- 口径：本子门店该月记录的超额返利应发金额，业务上为合约店按超额返利规则形成的应发费用，不是超额返利计划金额或陈列实发金额。两列均被资料描述为此含义，但不能因此相加、互补或认定逐值相等。

### 月度陈列项合格数量 `StoreScope_monthly_qualified_display_item_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.all_check_dsp_hg_num`
- 口径：本子门店月度指标记录的陈列项合格数量，不是合格门店数或陈列签约数。它与其他来源的检查合格次数不能仅凭名称近似互换。

### 月度常规付费陈列签约金额 `StoreScope_monthly_regular_display_signing_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.convent_sign_amount`
- 口径：本子门店该月记录的常规付费陈列签约金额，与合约付费陈列签约金额分别保留。常规付费身份可能与合约身份同时成立，不能用付费类型等于常规店筛选替代本来源，也不据身份重叠猜定两类金额如何合计。

### 月度合约付费陈列签约金额 `StoreScope_monthly_contract_display_signing_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.conshop_sign_amount`
- 口径：本子门店该月记录的合约付费陈列签约金额，不是协议确认状态、应发或实发金额。它与常规付费签约金额及陈列计划总字段分别解释，不擅自认定相加关系。

### 月度水执行SKU数量 `StoreScope_monthly_executed_water_sku_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.exe_water_sku_cnt`
- 口径：本子门店月度指标记录的水执行SKU数量，不自动解释为签收活跃SKU数、稽查铺货SKU数或达到5水SKU条件的状态。

### 月度执行SKU数量 `StoreScope_monthly_executed_sku_count`

- 类型：integer
- 字段：`v_dim_chl_sub_cust_indct_mi.exe_all_sku_cnt`
- 口径：本子门店月度指标记录的执行SKU数量，与水执行SKU数量属于同一月度记录。不将水数量再加到本数量上，也不自动当作分销活跃SKU或检查铺货SKU数量。

### 月度陈列未发金额 `StoreScope_monthly_display_unpaid_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.remain_payable_amt_1`
- 口径：本子门店该月陈列费账单汇总的待发金额。指标定义为陈列应发金额减去实发金额和作废金额，优先采用已提供的结果字段；它不是市场待核销金额或单笔未支付金额。

### 月度陈列作废金额 `StoreScope_monthly_display_cancelled_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.dsp_cancel_amt`
- 口径：本子门店该月陈列费账单已作废部分的汇总金额，包括整张账单作废及部分发放后的剩余作废，不表示作废签约数量或钱包冲回金额。

### 月度陈列实发金额 `StoreScope_monthly_display_paid_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.bill_ord_has_use_amt_1`
- 口径：门店某执行月陈列费账单中按实际发放记录记载、并在本子门店该月保存的陈列费用汇总金额。它不是单笔支付流水，不限定为现金，也不等同活动核销金额。

### 月度达成返利应发金额 `StoreScope_monthly_achievement_rebate_payable_amount`

- 类型：decimal
- 字段：`v_dim_chl_sub_cust_indct_mi.bill_plan_pay_amt_2`
- 口径：本子门店该月记录的合约店达成返利应发金额，由达成返利规则形成，不是达成返利计划金额、超额返利或陈列实发金额。
