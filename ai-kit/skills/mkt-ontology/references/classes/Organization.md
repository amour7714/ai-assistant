# 公司组织 `Organization`

- 分组：组织
- 父类：无

## 说明

公司设置的行政或销售管理组织，包括办事处、大区以及资料明确引用的其他组织。当前组织架构与历史业务记录中的组织归属分别解释；考核组织、考核销售组织、售达方组织和送达方组织不是同一组织口径。

## 指出的关系

无

## 指入的关系

- 大区 → 所属区域 `SalesDistrict_region`
  组织资料中大区对应reg_code、reg_name所记录的上层区域组织；不将区域解释为省市行政区划。
- 员工 → 任职组织 `Employee_organization`
  人员维表的org_code、org_name记录员工当前任职组织，不能替代业务发生时组织。
- 实际销售考核明细 → 当期考核销售组织 `SalesAssessment_sales_organization`
  ass_sales_org_name记录当期考核销售组织，不把ass_sales_range_code用作任意组织外键。
- 实际销售考核明细 → 同期销售组织 `SalesAssessment_comparison_sales_organization`
  yty_sales_org_name直接记录同期销售组织，配套同期期间使用。
- 实际销售考核明细 → 售达方销售组织 `SalesAssessment_sold_to_organization`
  dealer_sales_org_name直接记录本笔销售售达方组织。
- 实际销售考核明细 → 送达方销售组织 `SalesAssessment_ship_to_organization`
  send_sales_org_name直接记录本笔销售送达方组织，不与售达方组织合并。
- AC月度市场指标 → 适用组织 `ACMarketObservation_applicable_organization`
  org_codes、org_names清单记录本条外部统计适用的组织，可覆盖大区或办事处；清单展开只用于范围识别，不能重复累计比率。
- 活动计划明细 → 支持部门 `ActivityPlanDetail_supporting_department`
  supt_dpmt_code、supt_dpmt_name记录支持本计划明细的部门，与行政归属组织区分。
- 套餐门店执行费用 → 支持部门 `PackageExecutionCost_supporting_department`
  supt_dpmt_code、supt_dpmt_name记录本套餐执行费用的支持部门。
- 统案支持费用项 → 支持部门 `UnifiedSupportItem_supporting_department`
  supt_dpmt_code、supt_dpmt_name直接记录统案费用项的支持部门。
- 子门店 → 归属区域 `StoreScope_region`
  子门店在来源记录中直接注明的公司销售管理区域，不是省市行政区划。v_dim_chl_sub_cust_df以同一cust_range_code记录的reg_code、reg_name表示当前归属；v_dim_chl_sub_cust_indct_mi以同一ym、cust_range_code记录的reg_name表示月度归属；v_trd_dist_ord_dtl以同一订单商品行的cust_range_code、reg_name记录明细附带区域，取值时点尚未明确，不认定为查询当日的当前归属。复用StoreScope_region_code、StoreScope_region_name，分别保留各来源的子门店、月份或分销行对应，不沿大区当前层级替换直接引用，也不推定名称已匹配到组织编码。
- 分销订单行 → 当时所属区域 `DistributionOrderLine_original_region`
  分销订单商品行交易当时所属的公司销售管理区域，由v_trd_dist_ord_dtl同一行的reg_name_orgn直接记录，复用DistributionOrderLine_original_region_name。该区域与本行当时所属销售客户、办事处及大区的所属身份对应，区别于当时服务区域和明细附带区域。保留订单商品行及交易当时的归属范围，不以大区当前所属区域替代；本来源仅直接提供区域名称，不推定已经匹配到组织编码。
- 分销订单行 → 当时服务区域 `DistributionOrderLine_original_service_region`
  分销订单商品行交易当时的服务销售管理区域，由v_trd_dist_ord_dtl同一行的serv_reg_name_orgn直接记录，复用DistributionOrderLine_original_service_region_name。该区域与本行当时服务销售客户、服务办事处及服务大区的身份对应，不与当时所属区域合并，也不要求两种身份指向不同组织实例。保留订单商品行及交易当时的服务归属，不沿当前客户或大区层级推导替代；本来源仅直接提供名称，不推定已经匹配到组织编码。
- 分销订单行 → 明细附带区域 `DistributionOrderLine_recorded_region`
  历史分销明细直接附带的公司销售管理区域，由v_trd_dist_ord_dtl同一订单商品行的reg_name记录，复用DistributionOrderLine_recorded_region_name，并保留该行cust_range_code所限定的门店服务范围。资料未明确附带区域取自哪个业务时点或快照，不称为已确认的当前区域，也不套用交易当时的时间含义。与reg_name_orgn当时所属区域、serv_reg_name_orgn当时服务区域分别保留，不通过大区当前层级替换直接引用，不据名称认定组织实例或编码已经匹配。
- 实际销售考核明细 → 当期考核区域 `SalesAssessment_assessment_region`
  本笔实际销售在当期考核组织口径下归属的公司销售管理区域，由v_trd_sales_adjust_df中target_flag为No的同一行ass_reg_name直接记录，复用SalesAssessment_current_assessment_region_name。区域引用与该行ass_fin_year、ass_fin_month_id及当期考核组织配套；当期考核统计另按ass_flag为Yes选取。它不同于同期对齐区域，不沿大区当前所属区域推导，也不以名称引用推造组织编码。
- 实际销售考核明细 → 同期对齐区域 `SalesAssessment_comparison_region`
  本笔实际销售映射到同期比较口径后归属的公司销售管理区域，由v_trd_sales_adjust_df中target_flag为No的同一行yty_reg_name直接记录，复用SalesAssessment_comparison_assessment_region_name。区域引用与该行yty_fin_year、yty_fin_month_id及同期对齐组织配套；同期考核统计另按yty_ass_flag为Yes选取，日粒度使用对应的同期对齐日期。不沿用当期ass_reg_name，不机械减一年或通过大区当前层级替代，也不以名称引用推造组织编码。
- 组织销售目标 → 目标考核区域 `OfficeSalesTarget_region`
  销售调整预算目标在其考核期间直接记录的公司销售管理区域，由v_trd_sales_adjust_df中target_flag为Yes的同一行ass_reg_name引用，复用OfficeSalesTarget_region_name。联系限定在该预算目标行的ass_fin_year、ass_fin_month_id、考核组织及实际提供的商品范围内。v_trd_sales_target_org_mi没有区域字段，本关系不据大区当前层级或其他来源为其目标补区域，也不将实际销售行的区域作为目标引用值。
- 经销商销售目标 → 目标归属区域 `DealerSalesTarget_region`
  经销商月度销售目标在目标期间归属的公司销售管理区域，由v_trd_sales_target_dealer_mi同一目标行的reg_code、reg_name直接记录，复用DealerSalesTarget_region_code和DealerSalesTarget_region_name。区域与该行month_id、fin_year、dealer_range_code、target_type及target_item保持对应，不以经销商或大区当前组织归属重写目标期间区域，也不因多来源编码或名称相同认定实例已匹配。
- 月度分销目标 → 目标归属区域 `DistributionTarget_attribution_region`
  月度分销目标在目标记录中直接注明的公司销售管理区域，复用DistributionTarget_attribution_region_code和DistributionTarget_attribution_region_name。经销商目标取v_trd_dist_target_dealer_df同一行reg_code、reg_name，与month_id和dealer_range_code配套；办事处目标取v_trd_dist_target_org_df同一行reg_code、reg_name，与ym和off_code配套；子门店进货目标取v_dim_chl_sub_cust_indct_mi同一行reg_name，与ym和cust_range_code配套，该来源不补区域编码。仅覆盖这三类直接提供区域的目标来源，不为主任或业代目标补区域，不沿承担主体或大区的当前层级推导。不同月份及主体层级保留各自对应，区域联系不使不同层级目标成为可相加的任务。
- 门店月度稽查结果 → 月度区域 `StoreInspectionMonth_region`
  门店月度稽查结果在该月记录中直接注明的公司销售管理区域，由v_chl_jc_cust_mi的reg_name引用，复用StoreInspectionMonth_region_name。联系与同一行ym、cust_code及检查结果配套，区别于资料所附当前区域；不沿当前大区层级替代这一直接联系，也不据名称补造区域编码。
- 门店月度稽查结果 → 当前区域 `StoreInspectionMonth_current_region`
  门店月度稽查结果资料直接附带的当前公司销售管理区域，由v_chl_jc_cust_mi的now_reg_name引用，复用StoreInspectionMonth_current_region_name。该联系保留在对应ym、cust_code结果记录中，仅说明所附当前范围，不表示稽查月当时的归属；不覆盖reg_name记录的月度区域，也不以ym推定当前归属的取值日期。
- 经销商商品库存 → 记录区域 `DealerInventory_recorded_region`
  经销商商品库存资料直接附带的公司销售管理区域，由v_inv_dealer_cmdt_di同一行的p2_org_name记录，复用DealerInventory_recorded_region_name。区域引用与该行stat_date、dealer_range_code、cmdt_code及库存指标保持对应，不表示省市行政区划。它与reg_name记录的当时区域分别保留，不因名称相同而合并口径，不沿办事处或大区层级替代，也不据名称补造组织编码。
- 经销商商品库存 → 当时区域 `DealerInventory_original_region`
  经销商商品库存记录直接注明的业务当时所属公司销售管理区域，由v_inv_dealer_cmdt_di同一行的reg_name记录，复用DealerInventory_original_region_name。联系保留该行stat_date、dealer_range_code、cmdt_code限定的库存范围，并与当时办事处、大区口径配套。它不等同p2_org_name所附区域，不由当前组织架构覆盖，也不通过大区层级推导替代；本来源仅提供名称，不据此认定组织编码已经匹配。
- 门店拜访 → 当时区域 `StoreVisit_original_region`
  本次门店拜访发生时所属的公司销售管理区域，由v_chl_visit_dtl同一行的reg_code、reg_name直接记录，复用StoreVisit_original_region_code和StoreVisit_original_region_name。区域编码与名称保持同记录对应，并保留拜访日期、执行人员、门店、线路及起止时间范围。该联系不表示省市行政区划，与cur_reg_name另附区域分别保留，不沿大区当前层级替代，也不使用另附组织资料覆盖拜访发生时归属。
- 门店拜访 → 另附区域 `StoreVisit_current_region`
  本次门店拜访资料另附的公司销售管理区域，由v_chl_visit_dtl同一行的cur_reg_name直接记录，复用StoreVisit_current_region_name，并保留该次拜访的日期、执行人员、门店、线路和时间范围。资料未明确此引用的取值时点及归属口径，不依据cur前缀认定为当前区域，也不将拜访日期当作其取值日期。它与reg_code、reg_name明确记录的拜访发生时区域分别保留，不相互覆盖，不沿大区层级替代，也不据名称补造区域编码。
- 活动计划明细 → 计划归属区域 `ActivityPlanDetail_region`
  活动计划明细在对应执行月直接记录的公司销售管理区域，由v_mkt_market_actv_plan_verify_cost同一行reg_code、reg_name引用，复用ActivityPlanDetail_region_code和ActivityPlanDetail_region_name。区域编码与名称保留同一行execute_ym、plan_dtl_id及实际费用维度的对应，不作为活动计划头的永久归属，也不从下层套餐执行费用反向汇总区域。不沿大区当前所属区域替代直接引用，不认定跨来源组织编码已经等价或实例已经匹配。
- 陈列签约 → 签约行政区域 `DisplaySigning_region`
  陈列签约月度资料直接记录的行政区域组织，由v_mkt_dsp_actv_info_mi同一行reg_code、reg_name引用，复用DisplaySigning_administrative_region_code，并以同行reg_name配套解释名称。这里的区域是公司销售管理组织，不是省市行政区划。联系保留execute_ym、dsp_id及本签约引用范围，不将月度资料归属解释为签约的永久归属，也不以门店大区、签约行政大区的当前上层组织替代。本关系不证明组织编码跨来源等价或实例已经匹配。
- 套餐门店执行费用 → 执行归属区域 `PackageExecutionCost_region`
  套餐门店商品执行费用记录直接注明的公司销售管理区域，由v_mkt_package_cust_cost_mi同一行reg_code、reg_name引用，复用PackageExecutionCost_region_code和PackageExecutionCost_region_name。联系与该行execute_ym、plan_dtl_id、dealer_range_code、cust_code、cmdt_code限定的费用事实配套，不将这一费用行的归属无条件提升为套餐活动或计划头归属。不沿经销商或大区当前组织层级替换直接记录值，也不认定跨来源组织编码已经等价或实例已经匹配。
- 月度陈列项检查结果 → 检查记录区域 `DisplayItemInspection_region`
  月度陈列项检查结果直接记录的公司销售管理区域，由v_mkt_actv_inspect_result同一行reg_code、reg_name引用，复用DisplayItemInspection_region_code和DisplayItemInspection_region_name。区域与该行execute_ym、cust_range_code、dsp_code及检查次数保持对应，不自动指定某个活动或具体陈列签约，也不复制为门店各服务范围的独立归属。不沿大区当前所属区域替换这一检查结果的直接引用，不认定跨来源组织编码已经等价或实例已经匹配。
- 门店陈列执行统计 → 执行统计记录区域 `DisplayExecutionSummary_region`
  门店陈列执行统计直接注明的公司销售管理区域，由v_mkt_dsp_execute_mi同一行reg_name引用，复用DisplayExecutionSummary_region_name。联系保留该行execute_ym、ymd、cust_code及活动类型、实际专项活动和陈列项范围；执行月与统计日期分别解释，不据此认定每日新增执行量或区域归属的生效日期。本来源仅提供区域名称，不推造区域编码或宣称实例已匹配，也不沿大区当前组织层级替代记录区域。
- 费用包 → 费用包归属区域 `ExpensePackage_region`
  费用包记录直接注明的公司销售管理区域，由v_mkt_cost_package_df同一行reg_code、reg_name引用，复用ExpensePackage_region_code和ExpensePackage_region_name。联系保留本行费用包标识、事业线及类型对应的期间：陈列和套餐包按原业务月解释，货龄包按原财年解释，不将exec_month自动作为货龄包唯一月份或历史快照日期。该关系适用于陈列费用包子类，沿用其DISPLAY限定及继承属性，不另建重复关系。不沿大区当前层级替换记录归属，也不认定跨来源组织实例或包头与分配明细对应已验证。
- 搭赠下沉明细 → 下沉归属区域 `GiftSinkDetail_region`
  搭赠下沉追踪明细直接记录的公司销售管理区域，由v_mkt_shdz_sink_dtl_df同一行reg_code、reg_name引用，复用GiftSinkDetail_region_code和GiftSinkDetail_region_name。联系保留该行stat_month及搭赠活动、经销商、分销订单商品行和套餐的对应，不将stat_month擅自解释为订单签收月，也不提升为搭赠活动或经销商的永久区域归属。不沿大区当前所属区域替代直接引用，不认定跨来源组织编码已经等价或实例已经匹配。
- 实际销售考核明细 → 导入销售组织 `SalesAssessment_imported_sales_organization`
  本笔实际销售调整明细直接引用的导入销售组织，由v_trd_sales_adjust_df同一行的sales_org_code记录，复用SalesAssessment_imported_sales_organization_code属性。仅适用于target_flag为No且sales_org_code有实际组织引用的记录，保留该行考核期间和明细范围。不将本编码自动等同于ass_sales_range_code，也不以现有考核销售、售达方或送达方组织关系替代；不使用本行其他组织名称为该引用配名。该联系不表示已完成与组织主数据编码的对应或实例匹配。

## 属性

### 组织编码 `Organization_code`

- 类型：string
- 字段：`v_dim_hr_org.org_code`、`v_dim_hr_org.off_code`、`v_dim_hr_org.dis_code`、`v_dim_hr_org.reg_code`、`v_dim_hr_org.dept_code`、`v_dim_hr_emp.org_code`、`v_dim_chl_dealer.org_code`、`v_dim_chl_dealer.dis_code`、`v_dim_chl_sub_cust_df.off_code`、`v_dim_chl_sub_cust_df.dis_code`、`v_dim_chl_sub_cust_df.reg_code`、`v_trd_dist_ord_dtl.off_code`、`v_trd_dist_ord_dtl.dis_code`、`v_trd_sales_adjust_df.ass_org_code`、`v_trd_sales_adjust_df.ass_dis_code`、`v_trd_sales_adjust_df.yty_org_code`、`v_trd_sales_adjust_df.yty_dis_code`、`v_trd_sales_adjust_df.sales_org_code`、`v_trd_sales_target_dealer_mi.off_code`、`v_trd_sales_target_dealer_mi.dis_code`、`v_trd_sales_target_dealer_mi.reg_code`、`v_trd_sales_target_org_mi.off_code`、`v_trd_sales_target_org_mi.dis_code`、`v_trd_dist_ord_target_mgr_1m_df.off_code`、`v_trd_dist_ord_target_mgr_1m_df.dis_code`、`v_trd_dist_ord_target_emp_1m_df.off_code`、`v_trd_dist_ord_target_emp_1m_df.dis_code`、`v_trd_dist_target_dealer_df.off_code`、`v_trd_dist_target_dealer_df.dis_code`、`v_trd_dist_target_dealer_df.reg_code`、`v_trd_dist_target_org_df.off_code`、`v_trd_dist_target_org_df.dis_code`、`v_trd_dist_target_org_df.reg_code`、`v_chl_jc_cust_mi.off_code`、`v_mkt_market_actv_plan_verify_cost.off_code`、`v_mkt_market_actv_plan_verify_cost.dis_code`、`v_mkt_market_actv_plan_verify_cost.reg_code`、`v_mkt_market_actv_plan_verify_cost.supt_dpmt_code`、`v_mkt_actv_inspect_result.off_code`、`v_mkt_actv_inspect_result.dis_code`、`v_mkt_actv_inspect_result.reg_code`、`v_mkt_dsp_actv_info_mi.off_code`、`v_mkt_dsp_actv_info_mi.dis_code`、`v_mkt_dsp_actv_info_mi.reg_code`、`v_mkt_dsp_actv_info_mi.cust_dis_code`、`v_mkt_package_cust_cost_mi.off_code`、`v_mkt_package_cust_cost_mi.dis_code`、`v_mkt_package_cust_cost_mi.reg_code`、`v_mkt_package_cust_cost_mi.supt_dpmt_code`、`v_mkt_dsp_execute_mi.off_code`、`v_dim_chl_sub_cust_indct_mi.off_code`、`v_dim_chl_sub_cust_indct_mi.dis_code`、`v_mkt_budget_snapshot_df.off_code`、`v_mkt_budget_snapshot_df.dis_code`、`v_fin_expense_quota_balance_df.off_code`、`v_fin_expense_quota_balance_df.dis_code`、`v_fin_expense_wallet_df.off_code`、`v_fin_expense_wallet_df.dis_code`、`v_fin_expense_wallet_change_dtl_mi.off_code`、`v_fin_expense_wallet_change_dtl_mi.dis_code`、`v_mkt_cost_package_df.off_code`、`v_mkt_cost_package_df.dis_code`、`v_mkt_cost_package_df.reg_code`、`v_mkt_unity_apply_alloc_df.supt_dpmt_code`、`v_mkt_unity_apply_alloc_df.off_code`、`v_mkt_unity_apply_alloc_df.dis_code`、`v_mkt_unity_apply_alloc_df.reg_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.dis_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.dup_dis_code`、`v_inv_dealer_cmdt_di.org_code`、`v_mkt_shdz_sink_dtl_df.off_code`、`v_mkt_shdz_sink_dtl_df.dis_code`、`v_mkt_shdz_sink_dtl_df.reg_code`、`v_chl_route_plan_cust_cnt_1d_df.org_code`、`v_chl_visit_dtl.off_code`、`v_chl_visit_dtl.dis_code`、`v_chl_visit_dtl.reg_code`、`v_chl_visit_dtl.cur_off_code`
- 口径：当前组织主数据或业务记录直接记载的单个组织编码，包括办事处、大区、区域和部门等组织的编码。每个来源按其字段所指的组织、参与身份和期间解释，与同一来源的配套名称保持对应；同一行的多个组织引用不能合并为一个组织。来源之间不默认编码等价，销售组织范围编码、组织编码路径和AC组织清单不直接作为本属性的单值来源。拜访资料的cur_off_code表示另附办事处引用，取值时点尚未明确，不作为已确认的当前归属。

### 组织名称 `Organization_name`

- 类型：string
- 字段：`v_dim_hr_org.org_name`、`v_dim_hr_org.off_name`、`v_dim_hr_org.dis_name`、`v_dim_hr_org.reg_name`、`v_dim_hr_org.dept_name`、`v_dim_hr_emp.org_name`、`v_dim_chl_dealer.org_name`、`v_dim_chl_dealer.dis_name`、`v_dim_chl_sub_cust_df.off_name`、`v_dim_chl_sub_cust_df.dis_name`、`v_dim_chl_sub_cust_df.reg_name`、`v_trd_dist_ord_dtl.off_name_orgn`、`v_trd_dist_ord_dtl.dis_name_orgn`、`v_trd_dist_ord_dtl.reg_name_orgn`、`v_trd_dist_ord_dtl.serv_off_name_orgn`、`v_trd_dist_ord_dtl.serv_dis_name_orgn`、`v_trd_dist_ord_dtl.serv_reg_name_orgn`、`v_trd_dist_ord_dtl.off_name`、`v_trd_dist_ord_dtl.dis_name`、`v_trd_dist_ord_dtl.reg_name`、`v_trd_sales_adjust_df.ass_org_name`、`v_trd_sales_adjust_df.ass_dis_name`、`v_trd_sales_adjust_df.ass_reg_name`、`v_trd_sales_adjust_df.yty_org_name`、`v_trd_sales_adjust_df.yty_dis_name`、`v_trd_sales_adjust_df.yty_reg_name`、`v_trd_sales_adjust_df.ass_sales_off_name`、`v_trd_sales_adjust_df.ass_sales_dis_name`、`v_trd_sales_adjust_df.ass_sales_org_name`、`v_trd_sales_adjust_df.yty_sales_off_name`、`v_trd_sales_adjust_df.yty_sales_dis_name`、`v_trd_sales_adjust_df.yty_sales_org_name`、`v_trd_sales_adjust_df.dealer_sales_off_name`、`v_trd_sales_adjust_df.dealer_sales_dis_name`、`v_trd_sales_adjust_df.dealer_sales_org_name`、`v_trd_sales_adjust_df.send_sales_off_name`、`v_trd_sales_adjust_df.send_sales_dis_name`、`v_trd_sales_adjust_df.send_sales_org_name`、`v_trd_sales_target_dealer_mi.off_name`、`v_trd_sales_target_dealer_mi.dis_name`、`v_trd_sales_target_dealer_mi.reg_name`、`v_trd_sales_target_org_mi.off_name`、`v_trd_sales_target_org_mi.dis_name`、`v_trd_dist_ord_target_mgr_1m_df.off_name`、`v_trd_dist_ord_target_mgr_1m_df.dis_name`、`v_trd_dist_ord_target_emp_1m_df.off_name`、`v_trd_dist_ord_target_emp_1m_df.dis_name`、`v_trd_dist_target_dealer_df.off_name`、`v_trd_dist_target_dealer_df.dis_name`、`v_trd_dist_target_dealer_df.reg_name`、`v_trd_dist_target_org_df.off_name`、`v_trd_dist_target_org_df.dis_name`、`v_trd_dist_target_org_df.reg_name`、`v_chl_jc_cust_mi.off_name`、`v_chl_jc_cust_mi.dis_name`、`v_chl_jc_cust_mi.reg_name`、`v_chl_jc_cust_mi.now_off_name`、`v_chl_jc_cust_mi.now_dis_name`、`v_chl_jc_cust_mi.now_reg_name`、`v_chl_ac_nf_sku_mi.distnm`、`v_mkt_market_actv_plan_verify_cost.off_name`、`v_mkt_market_actv_plan_verify_cost.dis_name`、`v_mkt_market_actv_plan_verify_cost.reg_name`、`v_mkt_market_actv_plan_verify_cost.supt_dpmt_name`、`v_mkt_actv_inspect_result.off_name`、`v_mkt_actv_inspect_result.dis_name`、`v_mkt_actv_inspect_result.reg_name`、`v_mkt_dsp_actv_info_mi.off_name`、`v_mkt_dsp_actv_info_mi.dis_name`、`v_mkt_dsp_actv_info_mi.reg_name`、`v_mkt_dsp_actv_info_mi.cust_dis_name`、`v_mkt_package_cust_cost_mi.off_name`、`v_mkt_package_cust_cost_mi.dis_name`、`v_mkt_package_cust_cost_mi.reg_name`、`v_mkt_package_cust_cost_mi.supt_dpmt_name`、`v_mkt_dsp_execute_mi.off_name`、`v_mkt_dsp_execute_mi.dis_name`、`v_mkt_dsp_execute_mi.reg_name`、`v_dim_chl_sub_cust_indct_mi.off_name`、`v_dim_chl_sub_cust_indct_mi.dis_name`、`v_dim_chl_sub_cust_indct_mi.reg_name`、`v_mkt_budget_snapshot_df.off_name`、`v_mkt_budget_snapshot_df.dis_name`、`v_fin_expense_quota_balance_df.off_name`、`v_fin_expense_quota_balance_df.dis_name`、`v_fin_expense_wallet_df.off_name`、`v_fin_expense_wallet_df.dis_name`、`v_fin_expense_wallet_change_dtl_mi.off_name`、`v_fin_expense_wallet_change_dtl_mi.dis_name`、`v_mkt_cost_package_df.off_name`、`v_mkt_cost_package_df.dis_name`、`v_mkt_cost_package_df.reg_name`、`v_mkt_unity_apply_alloc_df.supt_dpmt_name`、`v_mkt_unity_apply_alloc_df.off_name`、`v_mkt_unity_apply_alloc_df.dis_name`、`v_mkt_unity_apply_alloc_df.reg_name`、`v_ai_sus_ord_inspect_detail.off_name`、`v_ai_sus_ord_inspect_detail.dis_name`、`v_ads_ai_chl_sus_display_fee_detail.off_name`、`v_ads_ai_chl_sus_display_fee_detail.dis_name`、`v_inv_dealer_cmdt_di.org_name`、`v_inv_dealer_cmdt_di.p_org_name`、`v_inv_dealer_cmdt_di.p2_org_name`、`v_inv_dealer_cmdt_di.off_name`、`v_inv_dealer_cmdt_di.dis_name`、`v_inv_dealer_cmdt_di.reg_name`、`v_mkt_shdz_sink_dtl_df.off_name`、`v_mkt_shdz_sink_dtl_df.dis_name`、`v_mkt_shdz_sink_dtl_df.reg_name`、`v_chl_visit_dtl.off_name`、`v_chl_visit_dtl.dis_name`、`v_chl_visit_dtl.reg_name`、`v_chl_visit_dtl.cur_off_name`、`v_chl_visit_dtl.cur_dis_name`、`v_chl_visit_dtl.cur_reg_name`
- 口径：组织在当前主数据或具体业务记录中直接记载的名称。名称必须与来源记录中的组织身份和期间配套：当时与当前、考核与考核销售、售达方与送达方、行政归属与支持部门等口径分别保留。名称相同不证明组织实例相同，历史记录的名称也不无条件替代当前主数据名称。拜访资料的cur_off_name、cur_dis_name、cur_reg_name表示另附组织引用，其取值时点尚未明确，不认定为已确认的当前名称，并与明确标注当时的组织字段区分。AC的distnm是大区名称，org_names组织清单不能直接作为单个组织名称。

### 组织类型编码 `Organization_type_code`

- 类型：string
- 字段：`v_dim_hr_org.org_type`
- 口径：当前组织主数据记录主体的组织类型编码，与组织类型名称配套。只描述由本行org_code识别的组织，不将其赋给同一行引用的大区、区域或部门，也不由历史业务参与身份反推类型。

### 组织类型名称 `Organization_type_name`

- 类型：string
- 字段：`v_dim_hr_org.org_type_name`
- 口径：当前组织主数据记录主体的组织类型名称，与组织类型编码配套。它是来源提供的分类名称，不以字段前缀或组织名称关键词代替。

### 组织状态编码 `Organization_status_code`

- 类型：string
- 字段：`v_dim_hr_org.org_status`
- 口径：组织在当前组织主数据中的状态编码，与状态名称配套。当前状态不证明该组织在历史交易、目标或费用期间的状态，也不等同员工在职状态或业务单据有效状态。

### 组织状态名称 `Organization_status_name`

- 类型：string
- 字段：`v_dim_hr_org.org_status_name`
- 口径：组织在当前组织主数据中的状态名称，与组织状态编码配套。材料未明确状态枚举，不自行补充启用、撤销等编码含义。

### 组织级别编码 `Organization_level_code`

- 类型：string
- 字段：`v_dim_hr_org.org_level_code`
- 口径：当前组织主数据为该组织记录的级别编码，与级别名称配套。组织级别与组织类型分别记录，不将二者合并，也不直接把级别编码解释为办事处或大区成员条件。

### 组织级别名称 `Organization_level_name`

- 类型：string
- 字段：`v_dim_hr_org.org_level_name`
- 口径：当前组织主数据为该组织记录的级别名称，与级别编码配套。它描述当前主数据主体，不表示同一行所有引用组织处于相同级别。

### 当前架构大区编码 `Organization_current_district_code`

- 类型：string
- 字段：`v_dim_hr_org.dis_code`
- 口径：当前组织架构为本组织配套记录的大区引用编码，与当前架构大区名称对应。这里的主体仍是本行org_code组织，值是它在架构中对应的大区引用，不是本组织自身编码；不预设所有组织都具有该引用或该大区就是直接上级。

### 当前架构大区名称 `Organization_current_district_name`

- 类型：string
- 字段：`v_dim_hr_org.dis_name`
- 口径：当前组织架构为本组织配套记录的大区名称，与当前架构大区编码属于同一条组织主数据记录。它不是本组织自身org_name，也不替代历史记录中的大区名称。

### 当前架构区域编码 `Organization_current_region_code`

- 类型：string
- 字段：`v_dim_hr_org.reg_code`
- 口径：当前组织架构为本组织配套记录的区域组织引用编码，与当前架构区域名称对应。区域是公司组织架构中的区域，不是省、市、区县等行政区划；本属性不规定区域与本组织之间有几层管理关系。

### 当前架构区域名称 `Organization_current_region_name`

- 类型：string
- 字段：`v_dim_hr_org.reg_name`
- 口径：当前组织架构为本组织配套记录的区域组织名称，与区域编码保持同一来源记录的对应。当前架构名称不覆盖历史目标、交易、库存或拜访记录中的区域口径。

### 当前架构部门代码 `Organization_current_department_code`

- 类型：string
- 字段：`v_dim_hr_org.dept_code`
- 口径：当前组织主数据为本组织配套记录的部门引用代码，与部门名称对应。它保留组织主体与部门引用的区别，不将部门代码当作本组织org_code，也不与活动费用的支持部门身份自动合并。

### 当前架构部门名称 `Organization_current_department_name`

- 类型：string
- 字段：`v_dim_hr_org.dept_name`
- 口径：当前组织主数据为本组织配套记录的部门名称，与部门代码属于同一条组织记录。该名称不是活动中承担支持职责的部门名称的默认来源。

### 当前架构公司代码 `Organization_current_company_code`

- 类型：string
- 字段：`v_dim_hr_org.comp_code`
- 口径：当前组织主数据为本组织配套记录的公司引用代码，与公司名称对应。它不同于本组织org_code及事业线编码；本轮资料未说明其法人、财务公司或其他公司编码体系，不追加这些含义。

### 当前架构公司名称 `Organization_current_company_name`

- 类型：string
- 字段：`v_dim_hr_org.comp_name`
- 口径：当前组织主数据为本组织配套记录的公司名称，与公司代码对应。该名称不替代本组织名称，也不据此补建公司法人档案或推断所属事业线。
