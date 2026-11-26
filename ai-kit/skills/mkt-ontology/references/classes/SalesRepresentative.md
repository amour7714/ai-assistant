# 业代 `SalesRepresentative`

- 分组：组织
- 父类：Employee

## 说明

在相应业务期间承担门店销售服务、线路拜访、陈列签约或费用包分配职责的员工。成员可由业务资料中明确标注的业代字段或适用岗位识别，不要求永久任职。

## 指出的关系

- 对应主任 → 主任 `SalesRepresentative_supervisor`
  业代目标、子门店等资料明确记录业代与主任的对应，按该来源期间解释，不以当前人员层级覆盖历史。

## 指入的关系

- 子门店 → 负责业代 `StoreScope_sales_representative`
  emp_code记录负责本子门店的业代；月度来源的人员必须与该行ym对应，不能用当前人员覆盖。
- 分销订单行 → 当时业代 `DistributionOrderLine_original_representative`
  sale_user_code_orgn记录订单当时业代，不由当前emp_code替代。
- 分销订单行 → 明细附带业代 `DistributionOrderLine_current_representative`
  历史分销订单商品行直接附带的门店业代，由v_trd_dist_ord_dtl同一行非orgn的emp_code、emp_name记录。保留该行门店服务范围与业代的对应，取值时点尚未明确，不宣称为当前业代，也不据此认定该员工是订单创建人或签收执行人。sale_user_code_orgn记录的订单当时业代及其关系保持独立，不相互覆盖。
- 月度分销目标 → 业代目标承担人 `DistributionTarget_representative`
  仅业代月目标适用，emp_code记录目标业代，与同月主任目标分别保留，不能混加。
- 门店月度稽查结果 → 记录业代 `StoreInspectionMonth_representative`
  emp_code记录该月门店对应业代，不表示该业代就是稽查检查人。
- 陈列签约 → 签约业代 `DisplaySigning_signing_representative`
  sign_emp_code、sign_emp_name记录实际签约业代，不等同门店所属业代。
- 陈列签约 → 门店所属业代 `DisplaySigning_store_representative`
  emp_code、emp_name记录该执行月签约资料所附门店业代，与签约人分别保留。
- 门店陈列执行统计 → 记录业代 `DisplayExecutionSummary_representative`
  emp_code记录门店执行统计对应业代，不将汇总全部执行自动归为该员工亲自完成。
- 费用包 → 分配业代 `ExpensePackage_representative`
  emp_code记录费用包分配所针对业代，不因一个包关联多个门店重复计分配金额。
- 虚假重复客资认定 → 主门店业代 `DuplicateStoreFinding_primary_representative`
  emp_code记录本月主门店一方的业代。
- 虚假重复客资认定 → 配对门店业代 `DuplicateStoreFinding_duplicate_representative`
  dup_emp_code记录本月配对门店一方的业代，不与主门店人员混合。
- 虚假陈列认定 → 记录业代 `FalseDisplayFinding_representative`
  emp_code、emp_name记录本次认定所附业代；本关系不额外推断个人责任结论。
- 计划门店拜访 → 计划执行业代 `PlannedStoreVisit_representative`
  emp_code记录该计划安排的执行业代，不证明已有实际拜访。

## 属性

### 对应主任编码 `SalesRepresentative_supervisor_code`

- 类型：string
- 字段：`v_trd_dist_ord_target_emp_1m_df.p_emp_code`、`v_dim_chl_sub_cust_df.p_emp_code`、`v_dim_chl_sub_cust_indct_mi.p_emp_code`、`v_chl_jc_cust_mi.p_emp_code`、`v_mkt_dsp_actv_info_mi.p_emp_code`、`v_chl_route_plan_cust_cnt_1d_df.p_emp_code`
- 口径：业代在相应目标月、子门店服务范围、陈列资料或计划拜访安排中对应的主任编码。它是该业务范围内的主任引用值，不等同人员主数据中的一般上级员工编码，也不表示业代永久对应同一主任。编码与主任姓名、业代身份及来源记录的期间和服务范围配套保留。

### 对应主任姓名 `SalesRepresentative_supervisor_name`

- 类型：string
- 字段：`v_trd_dist_ord_target_emp_1m_df.p_emp_name`、`v_dim_chl_sub_cust_df.p_emp_name`、`v_dim_chl_sub_cust_indct_mi.p_emp_name`、`v_chl_jc_cust_mi.p_emp_name`、`v_mkt_dsp_actv_info_mi.p_emp_name`、`v_mkt_dsp_execute_mi.p_emp_name`、`v_chl_route_plan_cust_cnt_1d_df.p_emp_name`
- 口径：业务资料直接为业代记录的对应主任姓名，与该来源中的主任编码及业代、期间和服务范围配套使用。陈列执行统计仅提供主任姓名时保留名称引用，不据同名认定唯一主任；本属性不替代人员主数据中的一般上级姓名。

### 员工编码 `Employee_employee_code`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.emp_code`、`v_trd_dist_ord_dtl.sale_user_code_orgn`、`v_trd_dist_ord_dtl.emp_code`、`v_trd_dist_ord_target_emp_1m_df.emp_code`、`v_chl_jc_cust_mi.emp_code`、`v_mkt_dsp_actv_info_mi.sign_emp_code`、`v_mkt_dsp_actv_info_mi.emp_code`、`v_mkt_dsp_execute_mi.emp_code`、`v_dim_chl_sub_cust_df.emp_code`、`v_dim_chl_sub_cust_indct_mi.emp_code`、`v_mkt_cost_package_df.emp_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.emp_code`、`v_ai_mid_chl_sus_duplicate_cust_mi.dup_emp_code`、`v_ads_ai_chl_sus_display_fee_detail.emp_code`、`v_chl_route_plan_cust_cnt_1d_df.emp_code`、`v_chl_visit_dtl.emp_code`、`v_chl_visit_dtl.assisted_emp_code`
- 口径：公司业务人员的编码，以字符串保留，不与员工账号或域账号混用。业务表直接记录的人员引用也可提供该编码，但须按具体参与身份和来源期间识别人；不能把同一行的业代、主任、理货员或被协访人员混为一人。空岗且没有有效员工编码的目标行不据岗位编码构造员工。

### 员工姓名 `Employee_name`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.emp_name`、`v_trd_dist_ord_dtl.sale_user_name_orgn`、`v_trd_dist_ord_dtl.emp_name`、`v_trd_dist_ord_target_emp_1m_df.emp_name`、`v_chl_jc_cust_mi.emp_name`、`v_mkt_dsp_actv_info_mi.sign_emp_name`、`v_mkt_dsp_actv_info_mi.emp_name`、`v_mkt_dsp_execute_mi.emp_name`、`v_dim_chl_sub_cust_df.emp_name`、`v_dim_chl_sub_cust_indct_mi.emp_name`、`v_mkt_cost_package_df.emp_name`、`v_ads_ai_chl_sus_display_fee_detail.emp_name`、`v_chl_route_plan_cust_cnt_1d_df.emp_name`、`v_chl_visit_dtl.emp_name`、`v_chl_visit_dtl.assisted_emp_name`
- 口径：资料直接记录的员工姓名。人员主数据和各业务资料中的姓名按相应人员编码或账号、参与身份及记录期间解释，不以当前姓名覆盖历史引用，也不凭同名认定为同一员工。

### 员工账号 `Employee_account`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.emp_account`
- 口径：人员主数据为员工记录的账号，不是员工编码。资料未确认该账号是否就是检查业务引用的域账号，暂不将两种来源互相补值或视为可直接互换。

### 人员状态编码 `Employee_status_code`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.status`
- 口径：人员主数据记录的员工状态代码，与同一员工行的状态名称对应。资料未给出枚举含义，不自行将某个代码解释为在职、离职或数据有效，也不据此反推历史业务发生时的状态。

### 人员状态名称 `Employee_status_name`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.status_name`
- 口径：人员主数据记录的员工状态名称，与status配套使用。未确认其与拜访资料所附在职状态采用同一口径，不互相替代。

### 岗位编码 `Employee_position_code`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.pos_code`、`v_dim_chl_sub_cust_df.pos_code`、`v_trd_dist_ord_target_emp_1m_df.pos_code`、`v_chl_route_plan_cust_cnt_1d_df.pos_code`、`v_chl_visit_dtl.assisted_pos_code`
- 口径：员工在来源记录所限定的人员或业务范围内登记的岗位编码，不等同基准岗编码。人员主数据、子门店服务岗位、月度目标岗位、计划拜访岗位和被协访岗位按各自记录保持对应，不将多期间或多服务范围的岗位解释为员工唯一且永久的岗位。

### 岗位名称 `Employee_position_name`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.pos_name`、`v_dim_chl_sub_cust_df.pos_name`、`v_trd_dist_ord_target_emp_1m_df.pos_name`、`v_chl_route_plan_cust_cnt_1d_df.pos_name`、`v_chl_visit_dtl.assisted_pos_name`
- 口径：员工在相应来源范围内登记的岗位或职位名称，与该来源同一记录的岗位编码配套，不等同基准岗名称。历史业务中的岗位按目标月、计划日期或协访记录解释，不能由人员主数据岗位覆盖。

### 兼岗列表 `Employee_concurrent_position_list`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.con_pos_list`
- 口径：人员主数据记录的员工兼岗列表原值，表示同时承担其他岗位的信息，不改变员工身份。与同一员工行的兼岗名称列表配套保留；资料未明确列表元素的标识类型及格式，暂不将其声明为已解析的岗位编码集合。

### 兼岗名称列表 `Employee_concurrent_position_names`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.con_pos_name_list`
- 口径：人员主数据记录的员工兼岗名称列表原值。与同一员工记录的con_pos_list共同解释，不把名称列表视为其他员工名单，也不在对应规则未明确时自行建立逐项编码名称配对。

### 基准岗编码 `Employee_standard_position_code`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.std_pos_code`、`v_dim_chl_sub_cust_df.std_pos_code`、`v_chl_visit_dtl.emp_std_pos_code`
- 口径：员工在相应人员或业务资料中登记的基准岗代码，与具体岗位编码区分。不同参与人员的基准岗分别取值，业务来源按所属服务范围或拜访记录解释，不从其他员工或其他期间的基准岗补值。

### 基准岗名称 `Employee_standard_position_name`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.std_pos_name`、`v_dim_chl_sub_cust_df.std_pos_name`、`v_trd_dist_ord_dtl.sale_user_pos_name_orgn`、`v_trd_dist_ord_dtl.std_pos_name`、`v_chl_jc_cust_mi.std_pos_name`、`v_mkt_dsp_execute_mi.std_pos_name`、`v_chl_visit_dtl.emp_std_pos_name`
- 口径：员工在相应来源记录中的基准岗名称。主数据、门店服务资料及业务记录可能属于不同期间或参与范围，应保留本行人员与期间的对应；历史业代、主任、主管或理货员身份不由其他来源的基准岗反推。

### 基准岗职务组编码 `Employee_standard_position_group_code`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.std_pos_group_code`
- 口径：人员主数据中员工基准岗所属职务组的代码。职务组是岗位的分类信息，不是员工任职组织；本来源不用于回填历史业务基准岗的职务组。

### 基准岗职务组名称 `Employee_standard_position_group_name`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.std_pos_group_name`
- 口径：人员主数据中员工基准岗所属职务组的名称，与职务组代码对应，不解释为任职部门名称。

### 上级职务组编码 `Employee_standard_position_parent_group_code`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.std_pos_p_group_code`
- 口径：人员主数据中员工基准岗所属职务组的上级职务组代码。它描述职务组分类层级，不是上级员工编码或上级组织编码。

### 上级职务组名称 `Employee_standard_position_parent_group_name`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.std_pos_p_group_name`
- 口径：人员主数据中员工基准岗所属职务组的上级职务组名称，与上级职务组代码保持对应。

### 任职组织编码 `Employee_organization_code`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.org_code`
- 口径：人员主数据为本员工直接记录的任职组织引用编码。它定位员工任职组织，不以目标、门店、交易或拜访记录的办事处归属字段代替，也不用于覆盖业务发生时组织。

### 任职组织名称 `Employee_organization_name`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.org_name`
- 口径：人员主数据直接为本员工记录的任职组织名称，与本行组织编码配套，不是沿业务关系取得的其他组织名称。

### 上级员工编码 `Employee_superior_employee_code`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.p_emp_code`
- 口径：人员主数据中本员工所引用上级员工的编码，是本员工记录中的上级引用值，不是本员工自己的编码。一般上级不自动属于主任类别，也不能以门店或目标资料中的管理主任替代这一人员层级引用。

### 上级员工姓名 `Employee_superior_employee_name`

- 类型：string，继承自 Employee
- 字段：`v_dim_hr_emp.p_emp_name`
- 口径：人员主数据直接为本员工记录的上级员工姓名，与同一行上级员工编码配套；姓名本身不保证唯一识别上级人员。

### 入职时间 `Employee_hire_time`

- 类型：dateTime，继承自 Employee
- 字段：`v_chl_visit_dtl.cur_start_date`
- 口径：拜访资料随执行人员附带的入职时间。该时间不是拜访日期，也不表示开始担任业代、主任或某一岗位的时间。

### 拜访资料在职状态 `Employee_visit_employment_status`

- 类型：string，继承自 Employee
- 字段：`v_chl_visit_dtl.cur_status_name`
- 口径：拜访明细随实际执行人员附带的在职状态名称，与拜访状态、成功拜访标记及协访合格状态不同。资料未明确其取值时点及与人员主数据状态的对应，不能直接解释为拜访当日是否在职。

### 拜访资料请假天数 `Employee_visit_leave_days`

- 类型：decimal，继承自 Employee
- 字段：`v_chl_visit_dtl.day_cnt`
- 口径：拜访明细为执行人员附带的请假天数，单位为天。该值按来源拜访记录保留；资料未说明请假的统计起止期间及重复承载方式，不按拜访行直接累计为员工期间请假总天数。
