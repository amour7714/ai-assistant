# 统案客户分配 `UnifiedCustomerAllocation`

- 分组：费用
- 父类：无

## 说明

统案支持费用向一个销售客户作出的具体分配，以dealer_actv_id识别并保留活动和执行月。经销商主题actv_agent_code为2时，大区支持金额dis_supt_amt属于本分配；一个分配可关联多个后续计划，不因此多计分配金额。钱包事件中的unity_alloc_id可引用本对象，但不能用费用组替代其身份。关联计划说明、计划金额和实施金额是实际客户分配与计划引用记录所附的信息，与同一来源行的dealer_actv_id、plan_code、execute_ym及实际门店引用保持配套，不称为分配自身金额。支持费用列表申请额、客户分配额与关联计划的计划、实施金额分别解释，不叠加为活动总费用。计划引用层次及其金额跨展开行汇总范围尚未核定，保留来源值和具体对应，不反向补入上层活动或其他来源的计划明细属性。

## 指出的关系

- 分配自支持费用项 → 统案支持费用项 `UnifiedCustomerAllocation_support_item`
  同一业务层次中actv_dtl_list_id记录客户分配所对应的支持费用列表，一列表可有多个客户分配。
- 所属统案活动 → 统案活动 `UnifiedCustomerAllocation_campaign`
  客户分配资料直接记录actv_code及活动身份；钱包事件引用时还须与该活动和执行月配套。
- 获得分配的客户 → 经销商 `UnifiedCustomerAllocation_dealer`
  dealer_range_code记录接受本条统案支持分配的销售客户，不把活动主题名称当客户。
- 分配大区 → 大区 `UnifiedCustomerAllocation_district`
  经销商主题客户分配中的dis字段记录作出统案支持分配的大区，dis_supt_amt属于具体客户分配。
- 记录办事处 → 办事处 `UnifiedCustomerAllocation_office`
  客户分配对应记录的off字段表示其办事处范围，不能因后续计划展开而复制分配金额。
- 关联执行计划 → 营销活动 `UnifiedCustomerAllocation_execution_plan`
  客户分配资料中的plan_code、plan_name记录其关联的后续活动计划；一个分配可对应多个计划，分配与计划金额分别统计。
- 关联执行门店 → 门店 `UnifiedCustomerAllocation_store`
  分配展开记录实际提供cust_code时，表示本分配关联计划所涉及的门店，不表示分配金额已经按门店拆分。

## 指入的关系

- 营销费用业务事件 → 事件统案客户分配 `ExpenseEvent_unified_customer_allocation`
  市场统案客户分配、修改或到期返还事件的unity_alloc_id引用dealer_actv_id，并配套活动编码和事件执行月；已知适用事业线为50000025，不用费用组替代，也不统一附加通常为空的事件账户。
- 钱包分录 → 记账业务引用分配 `WalletEntry_business_unified_allocation`
  钱包分录通过记账业务编号直接引用一项统案客户分配。仅适用于v_fin_expense_wallet_change_dtl_mi中biz_type为unityId且biz_id为实际引用值的分录，复用WalletEntry_business_reference_type和WalletEntry_business_reference_identifier属性，保留本笔分录与其所引分配的对应。资料将统案视图的dealer_actv_id列为候选定位字段，但完整实例定位条件尚未核定，不能仅凭biz_id执行关联。此记账业务入口与事件unity_alloc_id引用入口分别保留，不互相补值，也不推定两者指向同一分配；不照搬事件入口的活动编码、业务月、事业线或账户条件。关联展开不得重复累计原分录金额。

## 属性

### 客户分配标识 `UnifiedCustomerAllocation_allocation_identifier`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.dealer_actv_id`、`v_fin_expense_wallet_change_dtl_mi.unity_alloc_id`
- 口径：dealer_actv_id识别向一个销售客户作出的具体统案分配。解释和引用时须保留所属活动及执行月，不与活动明细列表、后续计划编码或费用组混用。

### 执行年月 `UnifiedCustomerAllocation_execution_month`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.execute_ym`、`v_fin_expense_wallet_change_dtl_mi.event_execute_ym`
- 口径：本条统案客户分配所属的执行年月，分配金额及关联计划均须保留这一期间。钱包事件业务月与本分配执行月对应时，不使用流水记账月或操作时间所在月替代。

### 统案活动标识 `UnifiedCustomerAllocation_campaign_identifier`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_id`
- 口径：客户分配记录直接引用的所属统案活动ID，用于区分活动头与客户分配、活动明细及支持费用列表等层次。

### 统案活动编码 `UnifiedCustomerAllocation_campaign_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_code`、`v_fin_expense_wallet_change_dtl_mi.event_object_code`
- 口径：本分配所属统案活动的编码，也是资料明确的钱包统案分配引用范围的一部分；不与后续执行计划编码混用。

### 所属活动明细标识 `UnifiedCustomerAllocation_support_detail_identifier`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_dtl_id`
- 口径：本客户分配对应支持费用列表所属的活动明细ID，保留活动明细与明细列表的层次区别，不作为客户分配身份。

### 支持费用列表引用 `UnifiedCustomerAllocation_support_list_identifier`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_dtl_list_id`
- 口径：本分配所对应的统案支持费用列表标识。一个列表可以对应多个客户分配，列表申请支持金额不因此成为各客户分配可重复累计的金额。

### 获分配客户编码 `UnifiedCustomerAllocation_recipient_dealer_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.dealer_range_code`
- 口径：接受本条统案支持分配的销售客户销售范围编码，不是活动主题编码，也不等同客户SAP编码。

### 获分配客户名称 `UnifiedCustomerAllocation_recipient_dealer_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.dealer_name`
- 口径：本分配记录中接受支持费用的销售客户名称，与同一记录的客户编码对应，不用当前客户名称覆盖记录所载名称。

### 统案主题编码 `UnifiedCustomerAllocation_campaign_theme_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_agent_code`
- 口径：本分配所属统案的活动主题编码。资料明确2表示经销商主题，该主题下dis_supt_amt记录具体客户分配金额；主题编码不等同活动类型或客户身份。

### 统案主题名称 `UnifiedCustomerAllocation_campaign_theme_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.actv_agent_name`
- 口径：客户分配记录所载的所属统案活动主题名称，与主题编码配套解释，不把主题名称当作获分配客户名称。

### 分配大区编码 `UnifiedCustomerAllocation_allocating_district_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.dis_code`
- 口径：经销商主题客户分配记录中，作出统案支持分配的大区编码，不以获分配客户当前所属大区替代。

### 分配大区名称 `UnifiedCustomerAllocation_allocating_district_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.dis_name`
- 口径：经销商主题客户分配记录所载的分配大区名称，与该记录的大区编码对应。

### 记录办事处编码 `UnifiedCustomerAllocation_recorded_office_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.off_code`
- 口径：客户分配对应记录直接提供的办事处范围编码，不额外推定该办事处就是分配作出方，也不按当前组织架构重写。

### 记录办事处名称 `UnifiedCustomerAllocation_recorded_office_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.off_name`
- 口径：客户分配对应记录所载的办事处名称，与同一记录的办事处编码对应。

### 大区分配金额 `UnifiedCustomerAllocation_district_support_amount`

- 类型：decimal
- 字段：`v_mkt_unity_apply_alloc_df.dis_supt_amt`
- 口径：经销商主题下，大区将统案支持费用分配给本销售客户的金额，按本分配执行年月归属。资料所述后续计划展开会重复携带同一分配金额，一条分配只计一次，不按金额数值去重，也不与列表申请支持金额或后续计划、实施金额叠加。该金额不表示已核销或已付款。

### 后续计划编码 `UnifiedCustomerAllocation_execution_plan_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.plan_code`
- 口径：本分配关联的后续活动计划编码。一个分配可以关联多个计划，须按同一来源记录保留各计划与执行门店、执行月的对应，不将这些编码作为分配标识或直接认定为其他视图的plan_dtl_id。

### 后续计划名称 `UnifiedCustomerAllocation_execution_plan_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.plan_name`
- 口径：本分配关联的某个后续计划名称，与该计划编码及其来源记录对应，名称相同不证明计划身份相同。

### 关联执行门店编码 `UnifiedCustomerAllocation_execution_store_code`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.cust_code`
- 口径：本分配关联后续计划所涉及的门店编码，须保留它与具体计划及执行月的对应。有门店引用不表示本客户分配金额已按门店拆分。

### 关联执行门店名称 `UnifiedCustomerAllocation_execution_store_name`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.cust_name`
- 口径：本分配关联计划记录所载的执行门店名称，与该记录的门店编码及计划对应。

### 核销明细引用标识 `UnifiedCustomerAllocation_verification_detail_reference`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.dim_group_id`
- 口径：客户分配对应记录提供的核销引用标识，源字段说明为核销明细ID。它不识别客户分配，也不能仅因字段同名就认定与钱包事件费用组具有相同含义或取值。

### 关联计划说明 `UnifiedCustomerAllocation_execution_plan_content`

- 类型：string
- 字段：`v_mkt_unity_apply_alloc_df.plan_content`
- 口径：本客户分配关联的后续计划记录直接保存的计划明细描述，不是统案活动描述或客户分配说明。仅用于实际携带客户分配和计划引用的记录，与同一来源行的分配标识、计划编码、执行年月及实际门店引用保持配套；一个分配关联多个计划时分别保留，不汇成失去计划和门店对应的描述列表。计划引用属于计划头还是计划明细仍待确认，不据本说明补定其层次。

### 关联计划金额 `UnifiedCustomerAllocation_execution_plan_amount`

- 类型：decimal
- 字段：`v_mkt_unity_apply_alloc_df.plan_amt`
- 口径：本客户分配关联计划记录直接保存的活动计划金额明细，不是分配自身的大区支持金额，也不是支持费用列表的申请金额。仅在实际客户分配与计划引用记录中使用，保留同一行分配、计划、执行月及实际门店的对应。金额单位、币种、税口径及跨展开行的汇总范围尚未明确，保留来源数值、正负号、零值和空值；不按分配标识去重后任取一个计划金额，不默认按展开行累加，不与申请额、分配额或同计划实施金额叠加。

### 关联计划实施金额 `UnifiedCustomerAllocation_execution_plan_implementation_amount`

- 类型：decimal
- 字段：`v_mkt_unity_apply_alloc_df.impl_amt`
- 口径：本客户分配关联计划记录直接保存的活动实施金额明细，表示该来源所记录的计划实施阶段金额，不是客户分配金额，也不表示已经核销或付款。仅在实际客户分配与计划引用记录中使用，保留同一行分配、计划、执行月及实际门店的对应。金额单位、币种、税口径及跨展开行汇总范围尚未明确，保留来源值和空值，不自行认定为承担前全额或承担后金额；不按分配标识合并多个计划，不默认按展开行累加，不与申请额、分配额或计划阶段金额叠加。
