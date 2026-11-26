# 统案支持费用项 `UnifiedSupportItem`

- 分组：费用
- 父类：无

## 说明

统案申请中按活动明细列表识别的支持费用项目，保留actv_dtl_id所属明细和actv_dtl_list_id列表层次、执行月、费用科目、支持部门及主题范围。列表可以对应多个经销商分配及执行计划；申请支持金额若随这些对象展开，仍只属于该列表，不随展开次数重复累计。

## 指出的关系

- 所属统案 → 统案活动 `UnifiedSupportItem_campaign`
  actv_id、actv_code记录支持费用项所属统案活动，保留明细与列表层次。
- 支持部门 → 公司组织 `UnifiedSupportItem_supporting_department`
  supt_dpmt_code、supt_dpmt_name直接记录统案费用项的支持部门。
- 记录办事处 → 办事处 `UnifiedSupportItem_office`
  费用项对应行的off_code记录其组织范围；在当前分层形态未核定前不把所有该字段都称为独立组织分配对象。
- 记录大区 → 大区 `UnifiedSupportItem_district`
  费用项对应行的dis_code直接记录统案支持组织范围，保留活动主题和明细列表对应。
- 支持品类 → 品类 `UnifiedSupportItem_category`
  ctg_name记录统案费用项品类范围，不由活动名称推导。

## 指入的关系

- 统案客户分配 → 分配自支持费用项 `UnifiedCustomerAllocation_support_item`
  同一业务层次中actv_dtl_list_id记录客户分配所对应的支持费用列表，一列表可有多个客户分配。

## 属性

### 活动明细列表标识 `UnifiedSupportItem_list_identifier`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_dtl_list_id`
- 口径：识别统案支持费用列表项的原生标识，与所属活动、活动明细及执行月配套使用，不与actv_id、actv_dtl_id或客户分配dealer_actv_id混用。列表被多个客户分配或执行计划引用时，该标识不等于视图展开行的唯一键。

### 所属活动明细标识 `UnifiedSupportItem_activity_detail_identifier`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_dtl_id`
- 口径：本支持费用列表所属的活动明细标识，保留活动头、活动明细、活动明细列表之间的层次，不将活动明细标识当作列表标识。

### 所属统案标识 `UnifiedSupportItem_campaign_identifier`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_id`
- 口径：本支持费用项引用的统案活动头标识，不表示支持费用列表或客户分配的身份。

### 所属统案编码 `UnifiedSupportItem_campaign_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_code`
- 口径：本支持费用项所引用的统案活动编码，与后续执行计划的plan_code区分。

### 所属统案名称 `UnifiedSupportItem_campaign_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_name`
- 口径：本支持费用项对应记录中登记的统案活动名称，配套所属统案标识和编码解释，不凭名称相同认定为同一活动。

### 执行年月 `UnifiedSupportItem_execution_month`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.execute_ym`
- 口径：本支持费用项对应的业务执行年月。申请支持金额按执行年月归属，不用活动创建时间、审批时间或活动起止日期所在月替代。

### 活动主题编码 `UnifiedSupportItem_activity_subject_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_agent_code`
- 口径：本支持费用项所属统案的活动主题范围编码。指标材料区分总部、大区、经销商三类主题，并明确2表示经销商主题；其他主题编码未给出，不自行补定。

### 活动主题名称 `UnifiedSupportItem_activity_subject_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_agent_name`
- 口径：本支持费用项对应记录中登记的活动主题名称，与活动主题编码配套解释，不表示具体支持组织或获得分配的客户名称。

### 活动项目名称 `UnifiedSupportItem_project_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.expen_type_name`
- 口径：本支持费用项对应的活动项目名称。数据设计将expen_type_name说明为活动项目或项目，此处不将其解释为自有、预留费用模式，也不与费用科目名称合并。

### 支持品类名称 `UnifiedSupportItem_supported_category_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.ctg_name`
- 口径：本支持费用项对应记录注明的产品品类范围，不由活动名称推导，也不自动等同大区活动品类字段的含义。

### 费用科目编码 `UnifiedSupportItem_expense_subject_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.subject_code`
- 口径：本支持费用项对应的费用项目或科目编码，用于区别支持费用的科目范围，不表示活动头、费用账户或核销明细身份。

### 费用科目名称 `UnifiedSupportItem_expense_subject_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.subject_name`
- 口径：本支持费用项登记的费用项目或科目名称，与费用科目编码配套，不与活动项目名称混用。

### 支持部门编码 `UnifiedSupportItem_supporting_department_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.supt_dpmt_code`
- 口径：本支持费用项所引用的支持部门编码，表示提供费用支持的部门身份，不等同记录办事处或大区的组织范围。

### 支持部门名称 `UnifiedSupportItem_supporting_department_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.supt_dpmt_name`
- 口径：本支持费用项对应记录注明的支持部门名称，与支持部门编码配套。

### 费用账户标识 `UnifiedSupportItem_expense_account_identifier`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.account_id`
- 口径：本支持费用项对应记录引用的费用账户标识。当前材料尚未明确该费用账户与预留费用账户或费用来源配置的对象对应，不将其认定为这些对象的标识。

### 费用账户编码 `UnifiedSupportItem_expense_account_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.account_code`
- 口径：本支持费用项对应记录引用的费用账户编码，不自动等同其他表的acct_code、expen_src_code或expen_code。

### 记录收款单位 `UnifiedSupportItem_collecting_unit_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.collect_unit_name`
- 口径：本支持费用项对应记录登记的收款单位名称。该名称不表示已经付款，也不默认收款单位就是获得统案分配的经销商。

### 记录办事处编码 `UnifiedSupportItem_recorded_office_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.off_code`
- 口径：本支持费用项引用所在记录直接注明的办事处范围。该值与同记录的大区、列表及执行月配套，不表示一个列表只能对应一个办事处，也不单独证明已经识别出一条组织分配事实。

### 记录办事处名称 `UnifiedSupportItem_recorded_office_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.off_name`
- 口径：本支持费用项对应记录注明的办事处名称，与该记录的办事处编码和大区范围对应，不将不同组织记录的名称拆成无对应的列表。

### 记录大区编码 `UnifiedSupportItem_recorded_district_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.dis_code`
- 口径：本支持费用项引用所在记录直接注明的大区范围，与同记录办事处、活动主题、列表和执行月配套。不将该引用自动解释为列表唯一归属或一条独立大区分配的身份。

### 记录大区名称 `UnifiedSupportItem_recorded_district_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.dis_name`
- 口径：本支持费用项对应记录注明的大区名称，与该记录的大区编码及办事处范围配套，不用当前组织层级覆盖。

### 申请审批状态编码 `UnifiedSupportItem_application_approval_status_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.aprv_status_code`
- 口径：本支持费用项对应记录所附统案申请的流程审批状态编码。申请支持金额的指标口径未规定仅取审批通过，不能将审批通过作为未经说明的默认筛选条件。

### 申请审批状态名称 `UnifiedSupportItem_application_approval_status_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.aprv_status_name`
- 口径：本支持费用项对应记录所附统案申请的流程审批状态名称，不据此推定已经获得支持、完成客户分配或发生付款。

### 申请支持金额 `UnifiedSupportItem_application_support_amount`

- 类型：decimal
- 字段：`v_mkt_unity_apply_alloc_df.actv_plan_amt`
- 口径：按指标清单第102行口径，一个活动明细列表在对应执行月申请的统案支持费用金额，覆盖总部、大区和经销商三类活动主题。该口径限定统案类型为1、事业线50000025及有效数据，不限定审批通过；同一列表随客户或计划展开时只计一次，不与客户分配金额、后续执行计划金额叠加。此处保留该指标材料明确给出的列表金额含义，不断言当前视图已经采用其描述的展开形态；它与数据设计分层金额说明的适用关系仍待确认。
