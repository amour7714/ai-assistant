# 计划门店拜访 `PlannedStoreVisit`

- 分组：渠道
- 父类：无

## 说明

业代在某计划日期沿某线路应拜访某门店的一项安排，以实际字段visit_date、route_code、cust_code解释。它不证明已经拜访，也不是仅按线路汇总的计划；计划人员、主任和经销商归属按本安排记录。

## 指出的关系

- 计划拜访门店 → 门店 `PlannedStoreVisit_store`
  cust_code是本日期和线路安排中应拜访的门店。
- 计划线路 → 线路 `PlannedStoreVisit_route`
  route_code记录本次计划拜访的线路，与visit_date和cust_code共同解释安排。
- 计划执行业代 → 业代 `PlannedStoreVisit_representative`
  emp_code记录该计划安排的执行业代，不证明已有实际拜访。
- 计划所属主任 → 主任 `PlannedStoreVisit_supervisor`
  p_emp_code记录本计划安排所附主任。
- 计划所属销售客户 → 经销商 `PlannedStoreVisit_dealer`
  dealer_range_code直接记录本计划安排中门店所属销售客户。
- 计划办事处 → 办事处 `PlannedStoreVisit_office`
  org_code直接记录计划安排的办事处。

## 指入的关系

无

## 属性

### 计划拜访日期 `PlannedStoreVisit_visit_date`

- 类型：date
- 字段：`v_chl_route_plan_cust_cnt_1d_df.visit_date`
- 口径：本项安排计划拜访门店的日期，与同一记录的线路、门店及计划人员配套，不表示实际发生或完成拜访的日期。

### 计划门店编码 `PlannedStoreVisit_store_code`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.cust_code`
- 口径：本项安排中应拜访的终端客户编码，与计划日期和线路对应；表示门店，不是子门店销售服务范围编码。

### 计划门店名称 `PlannedStoreVisit_store_name`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.cust_name`
- 口径：本计划记录所列应拜访门店的名称，与同一记录的计划门店编码对应。

### 计划线路编码 `PlannedStoreVisit_route_code`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.route_code`
- 口径：本项安排计划沿用的拜访线路编码，与计划日期、门店和执行业代配套，不是本安排的单独标识。

### 计划线路类型编码 `PlannedStoreVisit_route_type_code`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.route_type`
- 口径：本计划记录所列线路的类型编码，与同一记录的线路编码及线路类型名称对应；资料未提供具体枚举含义。

### 计划线路类型 `PlannedStoreVisit_route_type_name`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.route_type_name`
- 口径：本计划记录所列线路类型的名称，用于解释同一记录的线路类型编码，不据此推断实际拜访类型或线内外状态。

### 计划业代编码 `PlannedStoreVisit_representative_code`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.emp_code`
- 口径：本项安排中计划执行门店拜访的业代员工编码，限定于本计划记录，不证明该人员已经实施拜访。

### 计划业代姓名 `PlannedStoreVisit_representative_name`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.emp_name`
- 口径：本计划记录所列执行业代的姓名，与同一记录的业代编码对应。

### 计划业代职位编码 `PlannedStoreVisit_representative_position_code`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.pos_code`
- 口径：本计划记录所列执行业代的职位编码，与该记录的业代、职位名称和拜访安排对应，不解释为该员工永久或当前职位。

### 计划业代职位 `PlannedStoreVisit_representative_position_name`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.pos_name`
- 口径：本计划记录所列执行业代的职位名称，与同一记录的业代编码和职位编码对应，不由人员当前任职信息替代。

### 计划主任编码 `PlannedStoreVisit_supervisor_code`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.p_emp_code`
- 口径：本计划安排所附主任的员工编码，表示该安排的主任归属，不表示主任共同参与或实际执行了拜访。

### 计划主任姓名 `PlannedStoreVisit_supervisor_name`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.p_emp_name`
- 口径：本计划安排所附主任的姓名，与同一记录的主任编码对应。

### 计划所属销售客户编码 `PlannedStoreVisit_dealer_sales_range_code`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.dealer_range_code`
- 口径：本计划安排中门店所属经销商的销售范围编码，参与身份为所属销售客户，不与服务、配送身份或SAP客户编码混用。

### 计划办事处编码 `PlannedStoreVisit_office_code`

- 类型：string
- 字段：`v_chl_route_plan_cust_cnt_1d_df.org_code`
- 口径：本计划安排记录的归属办事处编码，与计划日期、线路、门店及人员安排对应，不由当前组织架构反推替代。
