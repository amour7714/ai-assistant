# 营销费用预算项 `ExpenseBudgetItem`

- 分组：费用
- 父类：无

## 说明

预算主体在指定财年、预算项目下编制的营销费用预算明细。主体包括办事处、经销商和总部，按所需主体口径分别统计，不把不同主体视图重复相加。当前材料说明暂无增补预算，因此不补建增补预算业务；快照名称不代表已开放历史快照日期。

## 指出的关系

- 预算经销商主体 → 经销商 `ExpenseBudgetItem_dealer`
  仅budget_view_code为DEALER时，dealer_range_code标识预算主体，不把其他视图附带客户字段当成经销商预算。
- 预算办事处主体 → 办事处 `ExpenseBudgetItem_office_subject`
  仅budget_view_code为OFFICE时，off_code标识预算办事处主体。
- 预算归属办事处 → 办事处 `ExpenseBudgetItem_attribution_office`
  非办事处主体预算若实际记录off_code，表示该预算的办事处归属，不改变budget_view_code指定的主体。
- 预算归属大区 → 大区 `ExpenseBudgetItem_district`
  dis_code、dis_name直接记录预算归属大区；总部预算不因附带组织字段而改成大区预算。
- 预算事业线 → 事业线 `ExpenseBudgetItem_business_line`
  bsn_code记录预算事业部范围，与预算财年及主体共同解释。

## 指入的关系

无

## 属性

### 预算主体类型 `ExpenseBudgetItem_subject_scope`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.budget_view_code`
- 口径：表示本预算项所属的主体类型：OFFICE为办事处，DEALER为经销商，HDQT为总部。该类型限定预算主体关系和汇总范围，不是具体组织或客户的编码，三类主体视图不能重复相加。

### 预算财年 `ExpenseBudgetItem_financial_year`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.fin_year`
- 口径：本预算项所属的财年，与同一项的预算主体、事业部、预算项目和预算金额配套。资料定义财年为上年12月至本年11月，不按自然年解释。

### 预算项标识 `ExpenseBudgetItem_row_identifier`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.budget_row_id`
- 口径：标识一条营销费用预算明细项的源记录，表结构将其声明为预算主键。它不是预算主体编码或预算项目编码。

### 预算记录标识 `ExpenseBudgetItem_record_identifier`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.budget_expense_id`
- 口径：本预算项记录的预算记录ID，与预算项主键及预算标的展示编号分别保留，不将其解释为已确认的跨主体视图去重键。

### 预算标的展示编号 `ExpenseBudgetItem_subject_display_number`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.budget_mark_code`
- 口径：经销商主体预算中用于展示预算标的的编号，只有DEALER预算项有值。它不替代预算项主键或经销商销售范围编码。

### 预算主体名称 `ExpenseBudgetItem_subject_scope_name`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.budget_view_name`
- 口径：本预算项记录的预算主体名称，与主体类型编码配套说明办事处、经销商或总部预算视图，不作为具体组织或客户的标识。

### 预算事业部编码 `ExpenseBudgetItem_business_line_code`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.bsn_code`
- 口径：本预算项所属事业部的编码，限定预算的业务范围，与预算财年、主体及项目保持对应，不默认等同人员组织编码。

### 预算事业部名称 `ExpenseBudgetItem_business_line_name`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.bsn_name`
- 口径：本预算项记录的事业部名称，与同一预算行的事业部编码配套。

### 预算经销商编码 `ExpenseBudgetItem_dealer_subject_code`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.dealer_range_code`
- 口径：DEALER预算项中作为预算主体的经销商销售范围编码，不是SAP客户编码。其他主体视图即使附带经销商字段，也不能据此认定为经销商预算。

### 预算经销商名称 `ExpenseBudgetItem_dealer_subject_name`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.dealer_range_name`
- 口径：DEALER预算项记录的经销商主体名称，与同一项的经销商销售范围编码配套。

### 预算项目编码 `ExpenseBudgetItem_project_code`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.budget_project_code`
- 口径：本预算项所属预算项目的编码，与预算主体、事业部、财年和金额配套。不自动等同活动项目、费用科目或费用来源编码。

### 预算项目名称 `ExpenseBudgetItem_project_name`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.budget_project_name`
- 口径：本预算项记录的预算项目名称，与同一行预算项目编码配套解释。

### 费用预算金额 `ExpenseBudgetItem_budget_amount`

- 类型：decimal
- 字段：`v_mkt_budget_snapshot_df.budget_amt`
- 口径：本预算项在指定财年、主体、事业部和预算项目范围内编制的营销费用预算金额。指标资料将其用于年初费用预算；当前暂无增补费用预算，因此费用预算沿用本金额，不另建重复金额属性。它不是活动占用、已核销费用或可用额度。

### 预算归属大区编码 `ExpenseBudgetItem_district_code`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.dis_code`
- 口径：预算记录直接提供的归属大区编码，用于相应财年和主体视图内的组织范围识别。总部预算不会因附带大区编码而成为大区主体预算。

### 预算归属大区名称 `ExpenseBudgetItem_district_name`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.dis_name`
- 口径：预算记录提供的归属大区名称，与同一预算行的大区编码配套，不改变预算主体类型。

### 预算办事处编码 `ExpenseBudgetItem_office_code`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.off_code`
- 口径：预算记录提供的办事处编码。OFFICE预算项中表示预算办事处主体；非OFFICE预算项实际记录本值时表示办事处归属，不改变其经销商或总部主体身份。

### 预算办事处名称 `ExpenseBudgetItem_office_name`

- 类型：string
- 字段：`v_mkt_budget_snapshot_df.off_name`
- 口径：预算记录提供的办事处名称，与同一行办事处编码配套。OFFICE行表示主体名称，其他主体视图中有值时表示归属办事处名称。
