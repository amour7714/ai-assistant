# 员工 `Employee`

- 分组：组织
- 父类：无

## 说明

公司业务人员，可在销售、管理、理货、检查和协访中承担不同身份。员工编码与人员主数据账号分别记录；岗位及兼岗不改变人员身份，历史业务参与身份不由当前岗位反推。检查业务中最近派发人、派发检查人和实际检查人的域账号及配套姓名，在对应虚假分销订单行的检查信息中按各自身份保存，不据检查参与身份将人员认定为业代或主任。域账号与人员主数据账号、员工编码的对应尚未明确。

## 指出的关系

- 任职组织 → 公司组织 `Employee_organization`
  人员维表的org_code、org_name记录员工当前任职组织，不能替代业务发生时组织。
- 上级员工 → 员工 `Employee_superior`
  人员维表p_emp_code引用员工上级；一般上级关系不自动证明对方属于主任类别。

## 指入的关系

- 子门店 → 负责理货员 `StoreScope_merchandiser`
  lhy_emp_code记录本子门店的理货员，与负责业代为可同时成立的不同参与身份。
- 员工 → 上级员工 `Employee_superior`
  人员维表p_emp_code引用员工上级；一般上级关系不自动证明对方属于主任类别。
- 分销订单行 → 明细附带主管 `DistributionOrderLine_current_supervisor`
  历史分销订单商品行直接附带的主管，由v_trd_dist_ord_dtl同一行p_emp_code、p_emp_name及主管基准岗字段记录。取值时点尚未明确，不宣称为当前主管或订单当时主管，也不表示该人员实际参与签收。原字段仅明确主管身份，不将全部引用人员强制认定为主任。
- 虚假分销订单行 → 认定记录销售人员 `FalseDistributionOrderLine_recorded_representative`
  检查资料emp_code直接记录该虚假订单对应销售人员。
- 虚假分销订单行 → 最近派发人 `FalseDistributionOrderLine_dispatcher`
  dispatch_user_code、dispatch_user_name记录最近一次派发检查任务的员工，编码为域账号口径。
- 虚假分销订单行 → 派发检查人 `FalseDistributionOrderLine_assigned_inspector`
  inspect_person_code、inspect_person_name记录被派发承担检查的员工，不等同实际完成检查者。
- 虚假分销订单行 → 实际检查人 `FalseDistributionOrderLine_actual_inspector`
  actual_inspect_person_code及姓名记录实际检查者，保留与派发检查人的区别。
- 门店陈列执行统计 → 记录理货员 `DisplayExecutionSummary_merchandiser`
  lhy_emp_code记录执行统计所附理货员，与业代身份分开。
- 门店拜访 → 拜访执行人 `StoreVisit_employee`
  emp_code直接记录实际拜访人员；协访等场景可由不同岗位员工执行，不把整条关系限定为业代。
- 门店拜访 → 被协访人员 `StoreVisit_assisted_employee`
  assisted_emp_code记录协访所针对的员工，与拜访执行人分别保留，非协访记录不强制存在。
- 门店拜访 → 记录上级人员 `StoreVisit_superior`
  p_emp_code、p_emp_name及配套上级基准岗直接记录本次拜访资料所附的上级人员。资料未明确该引用的取值时点，不擅自认定为拜访发生时的上级，也不表示共同拜访人；一般上级身份不自动证明主任身份。
- 门店月度稽查结果 → 记录销售总监 `StoreInspectionMonth_sales_director`
  门店月度稽查结果资料直接引用的销售总监，由v_chl_jc_cust_mi同一ym、cust_code记录中的sales_mg_name提供名称引用，复用StoreInspectionMonth_sales_director_name及Employee_name的对应来源。联系保留该月、该门店稽查记录的人员对应，不表示销售总监是实际检查人，也不将该人员自动认定为业代或主任。仅有姓名不能保证唯一识别员工，本关系不表示已完成与人员主数据员工编码的匹配。

## 属性

### 员工编码 `Employee_employee_code`

- 类型：string
- 字段：`v_dim_hr_emp.emp_code`、`v_dim_hr_emp.p_emp_code`、`v_trd_dist_ord_dtl.sale_user_code_orgn`、`v_trd_dist_ord_dtl.emp_code`、`v_trd_dist_ord_dtl.p_emp_code`、`v_trd_dist_ord_target_mgr_1m_df.p_emp_code`、`v_trd_dist_ord_target_emp_1m_df.emp_code`、`v_trd_dist_ord_target_emp_1m_df.p_emp_code`、`v_chl_jc_cust_mi.emp_code`、`v_chl_jc_cust_mi.p_emp_code`、`v_mkt_dsp_actv_info_mi.sign_emp_code`、`v_mkt_dsp_actv_info_mi.emp_code`、`v_mkt_dsp_actv_info_mi.p_emp_code`、`v_mkt_dsp_execute_mi.emp_code`、`v_mkt_dsp_execute_mi.lhy_emp_code`、`v_dim_chl_sub_cust_df.emp_code`、`v_dim_chl_sub_cust_df.p_emp_code`、`v_dim_chl_sub_cust_df.lhy_emp_code`、`v_dim_chl_dealer.p_emp_code`、`v_dim_chl_sub_cust_indct_mi.emp_code`、`v_dim_chl_sub_cust_indct_mi.p_emp_code`、`v_mkt_cost_package_df.emp_code`、`v_ai_sus_ord_inspect_detail.emp_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.emp_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.dup_emp_code`、`v_ads_ai_chl_sus_display_fee_detail.emp_code`、`v_chl_route_plan_cust_cnt_1d_df.emp_code`、`v_chl_route_plan_cust_cnt_1d_df.p_emp_code`、`v_chl_visit_dtl.emp_code`、`v_chl_visit_dtl.p_emp_code`、`v_chl_visit_dtl.assisted_emp_code`
- 口径：公司业务人员的编码，以字符串保留，不与员工账号或域账号混用。业务表直接记录的人员引用也可提供该编码，但须按具体参与身份和来源期间识别人；不能把同一行的业代、主任、理货员或被协访人员混为一人。空岗且没有有效员工编码的目标行不据岗位编码构造员工。

### 员工姓名 `Employee_name`

- 类型：string
- 字段：`v_dim_hr_emp.emp_name`、`v_dim_hr_emp.p_emp_name`、`v_trd_dist_ord_dtl.sale_user_name_orgn`、`v_trd_dist_ord_dtl.emp_name`、`v_trd_dist_ord_dtl.p_emp_name`、`v_trd_dist_ord_target_mgr_1m_df.p_emp_name`、`v_trd_dist_ord_target_emp_1m_df.emp_name`、`v_trd_dist_ord_target_emp_1m_df.p_emp_name`、`v_chl_jc_cust_mi.emp_name`、`v_chl_jc_cust_mi.p_emp_name`、`v_chl_jc_cust_mi.sales_mg_name`、`v_mkt_dsp_actv_info_mi.sign_emp_name`、`v_mkt_dsp_actv_info_mi.emp_name`、`v_mkt_dsp_actv_info_mi.p_emp_name`、`v_mkt_dsp_execute_mi.emp_name`、`v_mkt_dsp_execute_mi.lhy_emp_name`、`v_mkt_dsp_execute_mi.p_emp_name`、`v_dim_chl_sub_cust_df.emp_name`、`v_dim_chl_sub_cust_df.p_emp_name`、`v_dim_chl_sub_cust_df.lhy_emp_name`、`v_dim_chl_dealer.p_emp_name`、`v_dim_chl_sub_cust_indct_mi.emp_name`、`v_dim_chl_sub_cust_indct_mi.p_emp_name`、`v_mkt_cost_package_df.emp_name`、`v_ai_sus_ord_inspect_detail.emp_name`、`v_ai_sus_ord_inspect_detail.dispatch_user_name`、`v_ai_sus_ord_inspect_detail.inspect_person_name`、`v_ai_sus_ord_inspect_detail.actual_inspect_person_name`、`v_ads_ai_chl_sus_display_fee_detail.emp_name`、`v_chl_route_plan_cust_cnt_1d_df.emp_name`、`v_chl_route_plan_cust_cnt_1d_df.p_emp_name`、`v_chl_visit_dtl.emp_name`、`v_chl_visit_dtl.p_emp_name`、`v_chl_visit_dtl.assisted_emp_name`
- 口径：资料直接记录的员工姓名。人员主数据和各业务资料中的姓名按相应人员编码或账号、参与身份及记录期间解释，不以当前姓名覆盖历史引用，也不凭同名认定为同一员工。

### 员工账号 `Employee_account`

- 类型：string
- 字段：`v_dim_hr_emp.emp_account`
- 口径：人员主数据为员工记录的账号，不是员工编码。资料未确认该账号是否就是检查业务引用的域账号，暂不将两种来源互相补值或视为可直接互换。

### 人员状态编码 `Employee_status_code`

- 类型：string
- 字段：`v_dim_hr_emp.status`
- 口径：人员主数据记录的员工状态代码，与同一员工行的状态名称对应。资料未给出枚举含义，不自行将某个代码解释为在职、离职或数据有效，也不据此反推历史业务发生时的状态。

### 人员状态名称 `Employee_status_name`

- 类型：string
- 字段：`v_dim_hr_emp.status_name`
- 口径：人员主数据记录的员工状态名称，与status配套使用。未确认其与拜访资料所附在职状态采用同一口径，不互相替代。

### 岗位编码 `Employee_position_code`

- 类型：string
- 字段：`v_dim_hr_emp.pos_code`、`v_dim_chl_sub_cust_df.pos_code`、`v_trd_dist_ord_target_emp_1m_df.pos_code`、`v_trd_dist_ord_target_mgr_1m_df.director_pos_code`、`v_chl_route_plan_cust_cnt_1d_df.pos_code`、`v_chl_visit_dtl.assisted_pos_code`
- 口径：员工在来源记录所限定的人员或业务范围内登记的岗位编码，不等同基准岗编码。人员主数据、子门店服务岗位、月度目标岗位、计划拜访岗位和被协访岗位按各自记录保持对应，不将多期间或多服务范围的岗位解释为员工唯一且永久的岗位。

### 岗位名称 `Employee_position_name`

- 类型：string
- 字段：`v_dim_hr_emp.pos_name`、`v_dim_chl_sub_cust_df.pos_name`、`v_trd_dist_ord_target_emp_1m_df.pos_name`、`v_chl_route_plan_cust_cnt_1d_df.pos_name`、`v_chl_visit_dtl.assisted_pos_name`
- 口径：员工在相应来源范围内登记的岗位或职位名称，与该来源同一记录的岗位编码配套，不等同基准岗名称。历史业务中的岗位按目标月、计划日期或协访记录解释，不能由人员主数据岗位覆盖。

### 兼岗列表 `Employee_concurrent_position_list`

- 类型：string
- 字段：`v_dim_hr_emp.con_pos_list`
- 口径：人员主数据记录的员工兼岗列表原值，表示同时承担其他岗位的信息，不改变员工身份。与同一员工行的兼岗名称列表配套保留；资料未明确列表元素的标识类型及格式，暂不将其声明为已解析的岗位编码集合。

### 兼岗名称列表 `Employee_concurrent_position_names`

- 类型：string
- 字段：`v_dim_hr_emp.con_pos_name_list`
- 口径：人员主数据记录的员工兼岗名称列表原值。与同一员工记录的con_pos_list共同解释，不把名称列表视为其他员工名单，也不在对应规则未明确时自行建立逐项编码名称配对。

### 基准岗编码 `Employee_standard_position_code`

- 类型：string
- 字段：`v_dim_hr_emp.std_pos_code`、`v_dim_chl_sub_cust_df.std_pos_code`、`v_dim_chl_sub_cust_df.p_emp_std_pos_code`、`v_dim_chl_sub_cust_df.lhy_std_pos_code`、`v_chl_visit_dtl.emp_std_pos_code`、`v_chl_visit_dtl.p_std_pos_code`
- 口径：员工在相应人员或业务资料中登记的基准岗代码，与具体岗位编码区分。不同参与人员的基准岗分别取值，业务来源按所属服务范围或拜访记录解释，不从其他员工或其他期间的基准岗补值。

### 基准岗名称 `Employee_standard_position_name`

- 类型：string
- 字段：`v_dim_hr_emp.std_pos_name`、`v_dim_chl_sub_cust_df.std_pos_name`、`v_dim_chl_sub_cust_df.p_emp_std_pos_name`、`v_dim_chl_sub_cust_df.lhy_std_pos_name`、`v_trd_dist_ord_dtl.sale_user_pos_name_orgn`、`v_trd_dist_ord_dtl.std_pos_name`、`v_trd_dist_ord_dtl.p_emp_std_pos_name`、`v_chl_jc_cust_mi.std_pos_name`、`v_chl_jc_cust_mi.p_emp_std_pos_name`、`v_mkt_dsp_execute_mi.std_pos_name`、`v_mkt_dsp_execute_mi.lhy_std_pos_name`、`v_chl_visit_dtl.emp_std_pos_name`、`v_chl_visit_dtl.p_std_pos_name`
- 口径：员工在相应来源记录中的基准岗名称。主数据、门店服务资料及业务记录可能属于不同期间或参与范围，应保留本行人员与期间的对应；历史业代、主任、主管或理货员身份不由其他来源的基准岗反推。

### 基准岗职务组编码 `Employee_standard_position_group_code`

- 类型：string
- 字段：`v_dim_hr_emp.std_pos_group_code`
- 口径：人员主数据中员工基准岗所属职务组的代码。职务组是岗位的分类信息，不是员工任职组织；本来源不用于回填历史业务基准岗的职务组。

### 基准岗职务组名称 `Employee_standard_position_group_name`

- 类型：string
- 字段：`v_dim_hr_emp.std_pos_group_name`
- 口径：人员主数据中员工基准岗所属职务组的名称，与职务组代码对应，不解释为任职部门名称。

### 上级职务组编码 `Employee_standard_position_parent_group_code`

- 类型：string
- 字段：`v_dim_hr_emp.std_pos_p_group_code`
- 口径：人员主数据中员工基准岗所属职务组的上级职务组代码。它描述职务组分类层级，不是上级员工编码或上级组织编码。

### 上级职务组名称 `Employee_standard_position_parent_group_name`

- 类型：string
- 字段：`v_dim_hr_emp.std_pos_p_group_name`
- 口径：人员主数据中员工基准岗所属职务组的上级职务组名称，与上级职务组代码保持对应。

### 任职组织编码 `Employee_organization_code`

- 类型：string
- 字段：`v_dim_hr_emp.org_code`
- 口径：人员主数据为本员工直接记录的任职组织引用编码。它定位员工任职组织，不以目标、门店、交易或拜访记录的办事处归属字段代替，也不用于覆盖业务发生时组织。

### 任职组织名称 `Employee_organization_name`

- 类型：string
- 字段：`v_dim_hr_emp.org_name`
- 口径：人员主数据直接为本员工记录的任职组织名称，与本行组织编码配套，不是沿业务关系取得的其他组织名称。

### 上级员工编码 `Employee_superior_employee_code`

- 类型：string
- 字段：`v_dim_hr_emp.p_emp_code`
- 口径：人员主数据中本员工所引用上级员工的编码，是本员工记录中的上级引用值，不是本员工自己的编码。一般上级不自动属于主任类别，也不能以门店或目标资料中的管理主任替代这一人员层级引用。

### 上级员工姓名 `Employee_superior_employee_name`

- 类型：string
- 字段：`v_dim_hr_emp.p_emp_name`
- 口径：人员主数据直接为本员工记录的上级员工姓名，与同一行上级员工编码配套；姓名本身不保证唯一识别上级人员。

### 入职时间 `Employee_hire_time`

- 类型：dateTime
- 字段：`v_chl_visit_dtl.cur_start_date`
- 口径：拜访资料随执行人员附带的入职时间。该时间不是拜访日期，也不表示开始担任业代、主任或某一岗位的时间。

### 拜访资料在职状态 `Employee_visit_employment_status`

- 类型：string
- 字段：`v_chl_visit_dtl.cur_status_name`
- 口径：拜访明细随实际执行人员附带的在职状态名称，与拜访状态、成功拜访标记及协访合格状态不同。资料未明确其取值时点及与人员主数据状态的对应，不能直接解释为拜访当日是否在职。

### 拜访资料请假天数 `Employee_visit_leave_days`

- 类型：decimal
- 字段：`v_chl_visit_dtl.day_cnt`
- 口径：拜访明细为执行人员附带的请假天数，单位为天。该值按来源拜访记录保留；资料未说明请假的统计起止期间及重复承载方式，不按拜访行直接累计为员工期间请假总天数。
