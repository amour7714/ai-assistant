# 线路 `VisitRoute`

- 分组：渠道
- 父类：无

## 说明

组织门店服务和计划拜访的业务线路。业代线路与理货员线路按各自参与身份记录；交易当时线路与业务记录附带线路分别解释，不能互换。当前子门店维表中的线路表示当前服务安排，历史分销明细route_code附带线路的取值时点尚未明确，不宣称为当前线路。不同来源保留服务范围和期间，不假定线路编码跨所有服务范围唯一。

## 指出的关系

无

## 指入的关系

- 子门店 → 业代服务线路 `StoreScope_sales_route`
  route_code记录本子门店的业代线路，与相应人员、拜访频次和日期安排配套。
- 子门店 → 理货服务线路 `StoreScope_merchandising_route`
  lhy_route_code记录本子门店的理货线路，不与业代route_code互换。
- 分销订单行 → 当时线路 `DistributionOrderLine_original_route`
  line_code记录订单当时线路号，与route_code当前线路分别解释。
- 分销订单行 → 明细附带线路 `DistributionOrderLine_current_route`
  历史分销订单商品行直接附带的门店线路，由v_trd_dist_ord_dtl同一行route_code记录，并保留该行子门店和人员范围。取值时点尚未明确，不宣称为当前线路，不用于回填line_code明确记录的订单当时线路；两项直接联系分别保留。
- 门店月度稽查结果 → 记录线路 `StoreInspectionMonth_route`
  route_code记录该月被检查门店的线路归属。
- 陈列签约 → 所属线路 `DisplaySigning_route`
  route_code直接记录签约资料中的门店线路。
- 门店陈列执行统计 → 业代线路 `DisplayExecutionSummary_sales_route`
  route_code直接记录本执行统计的业代线路。
- 门店陈列执行统计 → 理货员线路 `DisplayExecutionSummary_merchandising_route`
  lhy_route_code直接记录本执行统计的理货线路，不与业代线路互换。
- 费用包 → 分配线路 `ExpensePackage_route`
  route_code直接记录费用包对应的业代线路，保留与人员、执行期间的同记录对应。
- 虚假重复客资认定 → 主门店线路 `DuplicateStoreFinding_primary_route`
  route_code记录本月主门店一方的线路。
- 虚假重复客资认定 → 配对门店线路 `DuplicateStoreFinding_duplicate_route`
  dup_route_code记录本月配对门店一方的线路。
- 计划门店拜访 → 计划线路 `PlannedStoreVisit_route`
  route_code记录本次计划拜访的线路，与visit_date和cust_code共同解释安排。
- 门店拜访 → 拜访线路 `StoreVisit_route`
  route_code记录本次拜访使用的线路，与拜访人员和时间配套。

## 属性

### 线路编码 `VisitRoute_route_code`

- 类型：string
- 字段：`v_trd_dist_ord_dtl.line_code`、`v_trd_dist_ord_dtl.route_code`、`v_chl_jc_cust_mi.route_code`、`v_mkt_dsp_actv_info_mi.route_code`、`v_mkt_dsp_execute_mi.route_code`、`v_mkt_dsp_execute_mi.lhy_route_code`、`v_dim_chl_sub_cust_df.route_code`、`v_dim_chl_sub_cust_df.lhy_route_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.route_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.dup_route_code`、`v_mkt_cost_package_df.route_code`、`v_chl_route_plan_cust_cnt_1d_df.route_code`、`v_chl_visit_dtl.route_code`
- 口径：所引用业务线路的编码或线路号，须结合服务范围、参与身份及记录期间识别。业代线路与理货员线路分别解释，订单当时线路与明细附带线路不能互相补值；历史分销route_code的取值时点尚未明确，不认定为当前线路，当前子门店维表来源仍按当前服务安排解释。不同来源记录的同号线路不自动认定为同一线路。

### 线路类型编码 `VisitRoute_route_type_code`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.route_type`
- 口径：计划拜访记录中该线路的类型编码，与同一记录的类型名称及计划拜访日期配套使用，不当作线路的永久分类。本轮实际拜访来源仅提供类型名称，不由名称、线路号或线内外标记反推编码。

### 线路类型名称 `VisitRoute_route_type_name`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.route_type_name`、`v_chl_visit_dtl.route_type_name`
- 口径：计划或实际拜访记录中该线路的类型名称，按相应拜访日期、线路及来源记录范围解释，不认定为跨期间不变的分类。计划来源的名称与同条记录的类型编码配套；线路类型不同于拜访类型、线内外标记及是否计划拜访。
