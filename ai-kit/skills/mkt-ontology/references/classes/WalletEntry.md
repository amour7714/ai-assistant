# 钱包分录 `WalletEntry`

- 分组：费用
- 父类：无

## 说明

原钱包明细中的一笔记账分录，包括有效或无效、零额、负额及覆盖冲回记录。一次请求可产生多钱包多笔分录，不能按transaction_id、费用组或金额去重。change_amt按元保留原符号与空值，同口径合计称钱包变动金额合计；默认分别统计income和outcome，不按方向再次翻转符号，也不据此冒充核销、付款或余额。流水记账月、操作时间、钱包业务月、事件业务月分别解释。钱包归属信息来自加工选定的钱包快照，不是发生时历史归属；当前未提供source_status，不能宣称已筛有效分录。

## 指出的关系

- 记入钱包 → 费用钱包 `WalletEntry_wallet`
  wallet_code、wallet_id直接引用本分录记入的钱包，合用事业线和财年；所附钱包信息来自加工选定快照，不代表发生时历史状态。
- 由业务事件触发 → 营销费用业务事件 `WalletEntry_event`
  分录中已识别且非占位的event_id引用触发事件，须结合event_domain、事业线及类型；一事件可对应多笔分录，不按事件编号去重金额。
- 记账事业线 → 事业线 `WalletEntry_business_line`
  bsn_code直接记录分录事业线，也是事件和钱包身份解释的必要范围。
- 分录钱包归属客户 → 经销商 `WalletEntry_wallet_dealer`
  分录dealer_range_code直接记录加工快照中的钱包客户，与event_dealer_range_code事件客户分开；空值不表示无费用。
- 分录钱包办事处 → 办事处 `WalletEntry_wallet_office`
  分录off_code直接记录加工快照中的钱包行政办事处，不表示记账发生时组织。
- 分录钱包大区 → 大区 `WalletEntry_wallet_district`
  分录dis_code直接记录加工快照中的钱包行政大区。
- 分录钱包费用来源 → 费用来源 `WalletEntry_wallet_source`
  分录expen_src_code直接记录钱包归属来源，与事件请求event_expen_src_code为不同角色。
- 分录钱包预留账户 → 预留费用账户 `WalletEntry_wallet_reserved_account`
  分录acct_code直接记录钱包归属预留账户，不用event_acct_code补值。
- 主追溯规则 → 钱包业务追溯规则 `WalletEntry_main_trace_rule`
  按分录实际事件域、类型、子类型、活动类型、阶段和事业线六项匹配MAIN规则。规则唯一和就绪不证明目标已匹配，原分录统计无需该关系成立。
- 补充追溯规则 → 钱包业务追溯规则 `WalletEntry_overlay_trace_rule`
  同六项业务组合可独立匹配OVERLAY规则，按需补充业务入口，不是MAIN失败回退，也不能与主入口展开金额重复累计。
- 记账业务引用分配 → 统案客户分配 `WalletEntry_business_unified_allocation`
  钱包分录通过记账业务编号直接引用一项统案客户分配。仅适用于v_fin_expense_wallet_change_dtl_mi中biz_type为unityId且biz_id为实际引用值的分录，复用WalletEntry_business_reference_type和WalletEntry_business_reference_identifier属性，保留本笔分录与其所引分配的对应。资料将统案视图的dealer_actv_id列为候选定位字段，但完整实例定位条件尚未核定，不能仅凭biz_id执行关联。此记账业务入口与事件unity_alloc_id引用入口分别保留，不互相补值，也不推定两者指向同一分配；不照搬事件入口的活动编码、业务月、事业线或账户条件。关联展开不得重复累计原分录金额。

## 指入的关系

无

## 属性

### 记账执行月 `WalletEntry_posting_month`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.execute_ym`
- 口径：execute_ym表示流水记账月，默认月统计使用本列，不等同来源分区ms或事件业务执行月。

### 操作时间 `WalletEntry_operation_time`

- 类型：dateTime
- 字段：`v_fin_expense_wallet_change_dtl_mi.occur_time`
- 口径：occur_time表示原流水操作时间，可与记账月跨月，不据此单独判异常。

### 记账方向 `WalletEntry_direction`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.opt_type`
- 口径：opt_type中的income影响转入累计，outcome影响转出累计；不是现金收付款标志，也不决定change_amt正负。

### 记账方式 `WalletEntry_posting_method`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.opt_tag`
- 口径：opt_tag区分cover覆盖重记、offsetting覆盖对冲和add追加记账。统计包含冲回和重记的整体变化时均须保留。

### 记账请求编号 `WalletEntry_transaction_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.transaction_id`
- 口径：transaction_id用于追溯同次请求，不是单笔分录标识，一次请求产生的多笔金额分别保留。

### 流水编号 `WalletEntry_flow_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.flow_id`
- 口径：原钱包流水的flow_id。单笔入口结合记账月、事业线和本编号定位当前可见记录，不是已确认的全历史唯一标识。

### 记账事业线编码 `WalletEntry_business_line_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.bsn_code`
- 口径：本分录记录的事业线编码，是解释流水、钱包及触发事件身份的必要业务范围；不同事业线的同号对象不能直接合并。

### 记账事业线名称 `WalletEntry_business_line_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.bsn_name`
- 口径：本分录附带的事业线名称，与同一行事业线编码对应。

### 分录财年 `WalletEntry_financial_year`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.fin_year`
- 口径：本分录记录的财年，与事业线、钱包编码共同解释钱包身份。业务财年通常为上年12月至本年11月，不从操作时间或记账月重新推算，也不自动作为事件请求费用来源的财年。

### 记账动作编号 `WalletEntry_action_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.action_id`
- 口径：本分录记录的原记账动作引用编号，与记账请求编号、触发事件编号分别保留。动作身份还需要来源月份和事业线；当前资料未提供可直接查询动作原文的已确认视图。

### 分录变动金额 `WalletEntry_amount`

- 类型：decimal
- 字段：`v_fin_expense_wallet_change_dtl_mi.change_amt`
- 口径：本笔原钱包分录的金额，单位元，保留原始正数、负数、零值和空值。同口径按原符号求和称钱包变动金额合计，默认分别统计income和outcome，不按方向再次翻转符号，不取绝对值、不按金额去重，也不重复乘承担比例。统计须明确时间、事业线、客户归属、钱包类型、额度分类及账本类别；结果不自动等同费用、核销、付款或余额。汇总忽略空金额，应同时检查分录数和非空金额分录数，不把缺失金额补为零。当前没有source_status，不能声明仅含有效分录；业务明细或主、补充追溯结果展开后不得重复累计本笔金额。

### 记入钱包编码 `WalletEntry_wallet_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.wallet_code`
- 口径：本分录直接引用的记入钱包编码，结合事业线和财年解释钱包身份，不是流水编号或费用账户编码。

### 记入钱包ID `WalletEntry_wallet_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.wallet_id`
- 口径：本分录记录的记入钱包ID，与钱包编码共同用于核对钱包引用，不是本笔分录的标识。

### 所附钱包业务月 `WalletEntry_wallet_business_month`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.wallet_month`
- 口径：本分录附带的钱包自身业务年月，来自加工选定的钱包快照。不同于流水记账月、操作时间所属月及事件业务月，不能相互替代。

### 所附钱包类型编码 `WalletEntry_wallet_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.wallet_type`
- 口径：本分录附带的钱包类型编码，用于区分额度供给、使用、调整、分配及客户费用等钱包用途。同一账本类别下仍须保留具体钱包类型区别，不能仅按账本类别认定费用或核销。

### 所附钱包类型名称 `WalletEntry_wallet_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.wallet_type_name`
- 口径：本分录附带的钱包类型名称，与同一行钱包类型编码对应，不表示本笔事件的业务类型。

### 所附钱包额度分类 `WalletEntry_wallet_quota_scope_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.quota_scope_code`
- 口径：本分录附带的钱包额度分类：SELF_PLAN为自有计划额度、SELF_VERIFY为自有核销额度、RESERVED为预留额度、OTHER为其他。自有计划和自有核销是并行额度口径，不能混加为同一费用；本分类表示钱包归属，不等同事件费用模式，也不证明已核销。

### 所附钱包额度分类名称 `WalletEntry_wallet_quota_scope_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.quota_scope_name`
- 口径：本分录附带的钱包额度分类名称，与同一行分类编码对应，保留自有计划、自有核销、预留和其他的区别。

### 所附钱包账本类别 `WalletEntry_wallet_ledger_role_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.ledger_role_code`
- 口径：按钱包类型归组的用途类别。ROOT_CONTROL包含OWN、USED、ADJUST、RESERVED；INTERNAL_POOL包含ACTIVITY_UR、ACTIVITY_DEALER；VERIFY_MIRROR包含VERIFY、VERIFY_IMPORT、RESERVED_VERIFY、VERIFY_A_DEALER；CUSTOMER_ACCOUNT包含CUST_DELIV_FEE、CUST_ACT_FEE；OTHER为未分类。类别不是严格账户上下级：主账不表示唯一总账，核销相关账不表示每笔已核销或逐笔镜像，客户费用账户的主体也不全是门店。同类钱包可在明确同口径后汇总变动金额，但不能自动转为费用、核销、付款或余额。OTHER还可能由选定快照未匹配、重复关联被排除、类型为空或未覆盖产生，不表示无业务或金额为零。

### 所附钱包客户编码 `WalletEntry_wallet_dealer_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.dealer_range_code`
- 口径：本分录附带的钱包归属经销商销售范围编码，来自加工选定的钱包快照，不是发生时历史归属，也不等同事件归属客户。空值只表示当前视图未提供该归属，不表示无费用。

### 所附钱包客户名称 `WalletEntry_wallet_dealer_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.dealer_range_name`
- 口径：本分录附带的钱包归属经销商名称，与同一行钱包客户编码配套，不代替事件客户名称或发生时客户归属。

### 所附钱包办事处编码 `WalletEntry_wallet_office_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.off_code`
- 口径：本分录附带的钱包行政办事处编码，属于加工选定快照的归属，不表示记账发生时组织。

### 所附钱包办事处名称 `WalletEntry_wallet_office_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.off_name`
- 口径：本分录附带的钱包行政办事处名称，与同一行办事处编码对应，适用加工选定快照的归属范围。

### 所附钱包大区编码 `WalletEntry_wallet_district_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.dis_code`
- 口径：本分录附带的钱包行政大区编码，来自加工选定快照，不由当前办事处层级代替。

### 所附钱包大区名称 `WalletEntry_wallet_district_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.dis_name`
- 口径：本分录附带的钱包行政大区名称，与同一行大区编码对应，属于加工选定快照的归属。

### 所附钱包预留账户编码 `WalletEntry_wallet_reserved_account_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.acct_code`
- 口径：本分录附带的钱包归属预留账户引用值，与事件请求的预留账户分别保留，不是现金开户账户。

### 所附钱包费用类型编码 `WalletEntry_wallet_expense_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.expen_sub_type_code`
- 口径：本分录附带的钱包归属费用类型：1渠道费用、3市场费用、4货龄东方树叶费用、5水专项预留费用、6货龄其他品类费用。可用于所选钱包口径内的分类统计，不等同事件请求费用类型或自有预留模式。

### 所附钱包费用类型名称 `WalletEntry_wallet_expense_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.expen_sub_type_name`
- 口径：本分录附带的钱包归属费用类型名称，与同一行费用类型编码对应。

### 所附钱包费用来源编码 `WalletEntry_wallet_expense_source_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.expen_src_code`
- 口径：本分录附带的钱包归属费用来源引用值，可用于同口径分录分类，与事件请求来源分别解释。来源余额的财年按来源对象解释，不自动等同分录财年。

### 所附钱包费用来源名称 `WalletEntry_wallet_expense_source_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.expen_src_name`
- 口径：本分录附带的钱包费用来源名称，与同一行钱包来源编码对应，不是事件请求来源名称。

### 所附钱包费用出处编码 `WalletEntry_wallet_expense_origin_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.expense_origin_code`
- 口径：本分录附带的钱包费用出处：0自主费用、1战略费用、2大区预留、3自有费用（系统预留）、4经销商利润、5水专项预留费用。这是系统出处分类，不直接等同自有或预留二分类，自主也不自动等同自有。

### 所附钱包费用出处名称 `WalletEntry_wallet_expense_origin_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.expense_origin_name`
- 口径：本分录附带的钱包费用出处名称，与同一行出处编码对应，保留系统出处含义。

### 记账业务引用类型 `WalletEntry_business_reference_type`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.biz_type`
- 口径：本分录记账业务编号所采用的引用类型。已明确的groupId表示费用组、unityId表示统案客户分配；门店业务引用可能是单号或结算引用，不能统一解释为活动编号。

### 记账业务引用编号 `WalletEntry_business_reference_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.biz_id`
- 口径：本分录记录的记账业务引用值，必须结合记账业务引用类型解释。费用组、统案客户分配、门店单号或结算引用不是同一种身份，不作为通用活动外键或流水唯一键。

### 所录事件域 `WalletEntry_event_domain`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_domain`
- 口径：本分录加工识别的事件来源分类：PLAN计划、RESERVED预留、SELF自有、CUSTOMER门店费用直接记账、DIRECT直接记账、UNKNOWN来源未识别。UNKNOWN可能由动作缺失或重复、映射缺失、事件类型不符产生，不表示无费用或无追溯规则。该分类来自原记账规则识别，不由独立追溯规则重新推断。

### 触发事件编号 `WalletEntry_event_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_id`
- 口径：本分录记录的业务事件引用编号，结合事件域、事业线及事件类型解释；不同域的同号不能视为同一事件。0是占位值，不用于建立事件对象引用，一事件产生的多笔分录仍分别保留。

### 所录事件类型编码 `WalletEntry_event_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_type`
- 口径：本分录记录的业务事件类型原编码，须按事件域解释，与记账业务引用类型不同。

### 所录事件类型名称 `WalletEntry_event_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_type_name`
- 口径：本分录附带的业务事件类型名称，与同一行事件域和事件类型编码配套解释，不用于选择追溯规则。

### 所录事件子类型编码 `WalletEntry_event_sub_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_sub_type`
- 口径：本分录加工得到的事件业务子类型编码，结合事件域和类型解释。原事件非空子类型优先；仅在已唯一关联事件且子类型为空时，加工可按明确业务分支补quota_generate、region_expense_allocate或activity_use。all和plan表示自有调整范围，不等同事件阶段；调用方不得自行猜补。

### 所录事件子类型名称 `WalletEntry_event_sub_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_sub_type_name`
- 口径：本分录附带的事件业务子类型名称，由事件域、类型及子类型共同解释。未知编码或无法归类时名称可为空，不能因此丢弃仍有值的编码。

### 所录事件活动类型编码 `WalletEntry_event_activity_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.activity_type`
- 口径：本分录记录的事件活动类型编码，与事件域、事件类型和阶段共同解释涉及的业务对象，不等同钱包类型或记账业务引用类型。

### 所录事件活动类型名称 `WalletEntry_event_activity_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_activity_type_name`
- 口径：本分录附带的事件活动类型名称，与同一行活动类型编码对应，仅解释本分录的事件业务组合。

### 记账时事件阶段 `WalletEntry_event_stage_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.stage_code`
- 口径：本分录记录的记账时事件阶段：plan计划、implement实施、sign签约、confirm确认、verify核销、partVerify部分核销、return回退，不是活动当前状态。confirm也可能承接核销回退，统计核销及回退涉及的钱包变化时不能只保留核销阶段。

### 记账时事件阶段名称 `WalletEntry_event_stage_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.stage_name`
- 口径：本分录附带的记账时事件阶段名称，与同一行阶段编码对应，不表示关联活动的当前阶段。

### 所录事件业务月 `WalletEntry_event_execution_month`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_execute_ym`
- 口径：本分录记录的事件业务执行年月，不等同流水记账月、操作时间所属月或钱包业务月。业务追溯的目标月份须按适用规则解释，不默认与流水记账月相同。

### 事件费用组编号 `WalletEntry_event_expense_group_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.dim_group_id`
- 口径：本分录记录的事件费用组引用值，不是流水唯一键、通用单据编号或追溯规则匹配键。同组可对应多笔流水及多条业务明细，需保留事业线、事件业务组合、月份、客户及钱包统计口径；空值流水只是未提供费用组的集合，不是同一业务对象。

### 事件统案客户分配编号 `WalletEntry_event_unified_allocation_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.unity_alloc_id`
- 口径：本分录记录的事件统案客户分配引用值，与费用组、记账业务编号及活动对象编码不同。已明确的市场统案客户分配、修改和到期返还场景引用具体客户分配，不能用费用组替代。

### 事件对象引用编码 `WalletEntry_event_object_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_object_code`
- 口径：本分录记录的事件业务对象编码，在不同事件业务组合中可表示活动、套餐、签约等不同身份，不是统一外键。对象找到仅说明身份，不证明费用明细已匹配。

### 事件对象引用名称 `WalletEntry_event_object_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_object_name`
- 口径：本分录附带的事件业务对象名称，用于展示和辅助核对；部分名称可能只是业务类别标签，不是可独立定位对象的标识。名称相同不消除编码冲突，名称为空也不自动否定有效编码。

### 事件费用包明细编号 `WalletEntry_event_cost_package_detail_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.cost_package_id`
- 口径：本分录记录的事件费用包明细引用ID，不是费用包头ID。已明确的陈列月包场景引用DISPLAY费用包的分配明细，并保持事件月份、客户、费用组及对象编码的对应。

### 事件原关联业务编号 `WalletEntry_event_business_reference_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_biz_id`
- 口径：本分录附带的活动事件原关联业务ID，依事件域、活动类型和阶段解释，与记账业务编号和事件对象编码分别保留。当前未核定其直接关联的目标字段，不作为通用单据外键。

### 所录事件客户编码 `WalletEntry_event_dealer_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_dealer_range_code`
- 口径：本分录记录的事件归属客户销售范围编码，与钱包归属客户是不同参与身份，不强制相等或互相补值。追溯事件业务时按事件客户及适用规则解释。

### 所录事件客户名称 `WalletEntry_event_dealer_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_dealer_range_name`
- 口径：本分录附带的事件归属客户名称，与同一行事件客户编码对应，不是钱包归属客户名称。

### 所录事件上游客户编码 `WalletEntry_event_parent_dealer_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_parent_dealer_code`
- 口径：本分录记录的事件上游客户销售范围编码，是事件所指的上游参与方，不由当前客户层级反推。

### 所录事件客户类型 `WalletEntry_event_customer_role_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_customer_role_code`
- 口径：本分录记录的事件客户类型：0经销商、1分销商、2合作商。用于解释本行事件客户的参与身份，来源缺失时为空，不是钱包客户的永久类型。

### 所录事件预留账户编码 `WalletEntry_event_reserved_account_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_acct_code`
- 口径：本分录记录的事件请求预留账户引用值，与钱包归属预留账户不同，不互相补值。是否必填由具体业务入口决定，统案客户分配等场景不能统一附加账户条件。

### 所录事件请求来源编码 `WalletEntry_event_expense_source_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_expen_src_code`
- 口径：本分录记录的事件请求费用来源引用值，与钱包归属来源分别保留，不是费用包编码。费用来源身份需要事业线、来源财年和来源编码；事件来源财年与分录财年的对应尚未核定。

### 所录事件请求费用类型 `WalletEntry_event_expense_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_expen_sub_type_code`
- 口径：本分录记录的事件请求费用类型编码：1渠道费用、3市场费用、4货龄东方树叶费用、5水专项预留费用、6货龄其他品类费用。与钱包归属费用类型分别解释。

### 所录事件费用模式 `WalletEntry_event_expense_mode_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_expense_mode_code`
- 口径：本分录记录的事件费用模式，D为自有费用、U为预留费用。SELF自有事件分支置空，事件原文缺失或未关联时也可为空；空值不表示无费用，不用钱包分类推断补值，也不是全部流水统一适用的费用大类。

### 所录事件费用模式名称 `WalletEntry_event_expense_mode_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_expense_mode_name`
- 口径：本分录附带的事件费用模式名称，D显示自有费用、U显示预留费用；编码为空或非D/U时名称为空，不自动归入任一模式。

### 所录事件品类编码 `WalletEntry_event_category_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.ctg_code`
- 口径：本分录记录的事件单值产品品类引用值。货龄等入口可要求按该品类限定目标，但品类条件不能推广到所有活动，也不能用SKU或品类名称替代编码。

### 所录事件品类名称 `WalletEntry_event_category_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.ctg_name`
- 口径：本分录附带的事件单值产品品类名称，已按同一行品类编码翻译，可用于展示，不作为品类关联键。
