# 营销费用业务事件 `ExpenseEvent`

- 分组：费用
- 父类：无

## 说明

导致营销费用记账的计划、预留、自有、客户费用或直接记账业务事件，由分录中直接记录的事件编号及事件域、事业线、事件类型共同解释。一次事件可以产生多笔分录，不是记账请求或钱包本身。阶段表示记账时阶段而非活动当前状态，确认阶段也可能承接核销回退。仅有UNKNOWN分类或占位编号不证明存在可识别的事件对象；本轮不补建未提供的事件原文表。

## 指出的关系

- 事件事业线 → 事业线 `ExpenseEvent_business_line`
  分录所记录bsn_code限定对应费用事件的业务范围，不跨事业线合并同号事件。
- 事件归属客户 → 经销商 `ExpenseEvent_dealer`
  event_dealer_range_code记录事件客户，与钱包归属客户分别保留，不强制相等或互相补值。
- 事件上游客户 → 经销商 `ExpenseEvent_upstream_dealer`
  event_parent_dealer_code直接记录事件所指上游客户，不由当前客户层级替代。
- 事件预留账户 → 预留费用账户 `ExpenseEvent_reserved_account`
  event_acct_code记录事件请求所指预留账户，是否为必填取决于业务入口，不能全局附加到账户无关的分配或计划场景。
- 事件请求费用来源 → 费用来源 `ExpenseEvent_source`
  event_expen_src_code明确记录事件请求的费用来源；关系成立不代表已具备跨财年可执行匹配。
- 事件产品品类 → 品类 `ExpenseEvent_category`
  ctg_code记录事件单值产品品类，仅在适用业务条件下参与定位，不把品类条件推广到所有活动。
- 事件涉及活动 → 营销活动 `ExpenseEvent_activity`
  仅事件业务组合将event_object_code明确解释为活动、计划或套餐时，引用相应营销活动；不能把费用包、签约等所有对象编码统一连到活动。
- 事件涉及陈列签约 → 陈列签约 `ExpenseEvent_display_signing`
  仅已明确为陈列签约对象的事件业务组合适用，按该组合对象身份及业务月引用签约，不凭编码格式推断。
- 事件陈列月包 → 陈列费用包 `ExpenseEvent_display_package`
  陈列月包事件中的cost_package_id引用DISPLAY费用包的package_dlt_id，并保留事业线、事件月、事件客户、费用组及对象编码范围；不是package_id包头引用。
- 事件统案客户分配 → 统案客户分配 `ExpenseEvent_unified_customer_allocation`
  市场统案客户分配、修改或到期返还事件的unity_alloc_id引用dealer_actv_id，并配套活动编码和事件执行月；已知适用事业线为50000025，不用费用组替代，也不统一附加通常为空的事件账户。

## 指入的关系

- 钱包分录 → 由业务事件触发 `WalletEntry_event`
  分录中已识别且非占位的event_id引用触发事件，须结合event_domain、事业线及类型；一事件可对应多笔分录，不按事件编号去重金额。

## 属性

### 事件编号 `ExpenseEvent_event_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_id`
- 口径：触发营销费用记账的业务事件编号，须结合事件域、事业线和事件类型解释，不与记账请求编号混用。无值或0占位不标识可识别事件；同一事件可被多笔分录引用。各项事件信息保持同一来源分录的对应，不跨分录任意拼接阶段、期间和对象引用。

### 事件事业线编码 `ExpenseEvent_business_line_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.bsn_code`
- 口径：本事件所属事业线的引用编码，是解释事件身份和业务范围的必要信息；不同事业线的同号事件不能直接合并。

### 事件事业线名称 `ExpenseEvent_business_line_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.bsn_name`
- 口径：分录记录的事件所属事业线名称，与同一行事业线编码配套展示，不以名称相同替代编码范围。

### 事件域 `ExpenseEvent_event_domain`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_domain`
- 口径：触发记账事件的来源类别：PLAN为计划事件、RESERVED为预留事件、SELF为自有事件、CUSTOMER为门店费用直接记账、DIRECT为直接记账、UNKNOWN为来源未识别。分类来自原记账动作规则映射及事件类型校验，不是下钻规则状态。UNKNOWN本身不证明存在可识别事件，也不表示没有费用。

### 事件类型编码 `ExpenseEvent_event_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_type`
- 口径：本事件的业务类型编码，含义由事件域限定，并与事业线及事件编号共同解释；不同事件域的同码类型不默认同义。

### 事件类型名称 `ExpenseEvent_event_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_type_name`
- 口径：本事件业务类型的名称，与同一来源分录的事件域和类型编码配套解释，不凭名称独立识别事件或选择追溯入口。

### 事件业务子类型编码 `ExpenseEvent_event_sub_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_sub_type`
- 口径：按事件域和事件类型解释的业务细分编码，包括额度生成、大区费用分配、活动使用、预留预算动作及自有调整范围。quota_generate、region_expense_allocate和activity_use分别表示前三类业务；all、plan表示自有调整范围，不等同事件阶段。

### 事件业务子类型名称 `ExpenseEvent_event_sub_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_sub_type_name`
- 口径：本事件业务细分类型的名称，与事件域、类型和子类型编码配套。未知编码或无法归类时名称可为空，不能据此删除已有编码或否定事件；名称不参与追溯规则六项条件匹配。

### 事件活动类型编码 `ExpenseEvent_activity_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.activity_type`
- 口径：本事件记录的活动类型编码，与事件域、事件类型和记账阶段共同解释事件所涉及的业务对象，不等同钱包的记账业务标识。

### 事件活动类型名称 `ExpenseEvent_activity_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_activity_type_name`
- 口径：本事件所记录活动类型的名称，与同一分录的活动类型编码配套展示，不表示关联活动当前状态。

### 事件业务月 `ExpenseEvent_execution_month`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_execute_ym`
- 口径：本事件业务执行所归属的年月，格式为YYYYMM，不与流水记账月、操作时间所属月或钱包业务月互换。追溯目标业务时采用相应入口规定的月份条件，不能据此推算来源分区月份或快照日期。

### 事件阶段 `ExpenseEvent_stage`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.stage_code`
- 口径：本事件在对应分录记账时的业务阶段：plan计划、implement实施、sign签约、confirm确认、verify核销、partVerify部分核销、return回退。它不是活动当前状态；confirm也可能承接核销回退，因此涉及核销及回退的分录统计不能只保留核销阶段。

### 事件阶段名称 `ExpenseEvent_stage_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.stage_name`
- 口径：对应分录记账时事件业务阶段的中文名称，包括计划、实施、签约、确认、核销、部分核销和回退，与阶段编码配套。

### 事件费用模式 `ExpenseEvent_expense_mode`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_expense_mode_code`
- 口径：本事件记录的资金使用模式，D为自有费用、U为预留费用。取自事件原文expenseType，SELF分支置空；原文缺失或事件未关联也可为空。空值不代表无费用，不能用钱包额度分类补值，也不能将其作为全体流水统一的费用大类。

### 事件费用模式名称 `ExpenseEvent_expense_mode_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_expense_mode_name`
- 口径：本事件费用模式的显示名称，D显示自有费用、U显示预留费用；模式编码为空或非D、U时名称为空，不自动归入任一模式。

### 事件请求费用类型 `ExpenseEvent_requested_expense_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_expen_sub_type_code`
- 口径：本事件请求的营销费用类型编码：1渠道费用、3市场费用、4货龄东方树叶费用、5水专项预留费用、6货龄其他品类费用。它描述事件请求，不以钱包归属费用类型替代，也不同于D、U表示的资金模式。

### 事件客户编码 `ExpenseEvent_dealer_reference_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_dealer_range_code`
- 口径：本事件直接记录的归属客户销售范围编码，与钱包归属客户为不同参与身份；两者不强制相等，不能互相补值。

### 事件客户名称 `ExpenseEvent_dealer_reference_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_dealer_range_name`
- 口径：本事件记录的归属客户名称，与事件客户销售范围编码配套，不以钱包客户名称或当前客户主数据覆盖该事件所记录的名称。

### 事件上游客户编码 `ExpenseEvent_upstream_dealer_reference_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_parent_dealer_code`
- 口径：本事件直接记录的上游客户销售范围编码，是事件中的上游参与对象引用，不由事件客户当前的上下级关系反推。

### 事件客户类型 `ExpenseEvent_customer_role_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_customer_role_code`
- 口径：本事件所记录客户的业务类型，0为经销商、1为分销商、2为合作商，源缺失时为空。该值与本事件客户对应，不作为客户脱离事件上下文的永久分类。

### 事件预留账户编码 `ExpenseEvent_reserved_account_reference_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_acct_code`
- 口径：本事件请求所指预留账户的引用编码，与钱包归属预留账户分别记录，不互相补值。是否必填取决于具体业务入口，不能给计划激励或统案客户分配等账户无关场景统一附加账户条件。

### 事件请求费用来源编码 `ExpenseEvent_expense_source_reference_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_expen_src_code`
- 口径：本事件请求中直接记录的费用来源引用编码，不是费用包编码，也不覆盖钱包归属费用来源。费用来源实例还需事业线和来源财年限定；事件来源财年与分录fin_year的对应尚未核定，不能仅凭本编码完成来源定位。

### 事件产品品类编码 `ExpenseEvent_category_reference_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.ctg_code`
- 口径：本事件直接记录的单值产品品类引用。货龄等场景按适用入口保留要求的品类条件，但不能将品类等值条件推广到所有活动；不以SKU、品类名称或自行展开的品类列表替代。

### 事件产品品类名称 `ExpenseEvent_category_reference_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.ctg_name`
- 口径：本事件所记录单值产品品类的名称，由对应品类编码翻译，可用于展示，不以名称替代品类编码进行对象定位。

### 事件业务对象编码 `ExpenseEvent_object_reference_code`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_object_code`
- 口径：本事件涉及业务对象的引用编码，可能表示活动、套餐或陈列签约等不同身份，不是统一活动外键。所指对象按事件业务组合和适用追溯规则中的对象定位说明解释，不能凭编码格式或名称关键词决定对象类别。

### 事件业务对象名称 `ExpenseEvent_object_reference_name`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_object_name`
- 口径：分录附带的事件业务对象名称或类别显示标签，仅用于展示和辅助核对。人员激励等场景可能只记录类别名称；名称相同不能覆盖编码冲突，名称为空也不自动否定已有对象编码。

### 事件费用组编号 `ExpenseEvent_expense_group_reference_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.dim_group_id`
- 口径：本事件在对应分录业务上下文中关联的费用组编号，不是事件标识或通用单据编号。同一费用组可对应多笔分录和多条业务明细；同号需结合事业线及事件业务组合解释，空费用组也不表示无费用或同一业务对象。

### 统案客户分配引用编号 `ExpenseEvent_unified_allocation_reference_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.unity_alloc_id`
- 口径：本事件携带的统案客户分配编号，区别于费用组和统案活动头。已明确的市场统案客户分配、修改和到期返还场景用它引用具体客户分配，并与活动对象编码及事件执行月配套。

### 费用包明细引用编号 `ExpenseEvent_cost_package_detail_reference_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.cost_package_id`
- 口径：本事件直接携带的费用包明细编号。已明确的陈列月包场景对应DISPLAY费用包的package_dlt_id，不是package_id包头；引用须与事件事业线、业务月、客户、费用组和对象编码保持对应。

### 活动事件关联业务编号 `ExpenseEvent_business_reference_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.event_biz_id`
- 口径：活动事件原来关联的业务记录编号，所指业务按事件域、活动类型和记账阶段解释，不是通用单据或活动头标识。材料尚未核定其在所选业务视图中的直接对应字段。

### 事件自有承担比例 `ExpenseEvent_self_bear_ratio`

- 类型：decimal
- 字段：`v_fin_expense_wallet_change_dtl_mi.calc_rate`
- 口径：本事件记录的自有承担比例，单位为%。它是事件携带的比例值，不用于再次折算已加工的钱包分录金额。

### 事件总部承担比例 `ExpenseEvent_headquarters_bear_ratio`

- 类型：decimal
- 字段：`v_fin_expense_wallet_change_dtl_mi.hq_calc_rate`
- 口径：本事件记录的总部承担比例，单位为%，与同一分录携带的事件及业务范围对应；不据此重新计算或分摊已加工分录金额。

### 事件备注 `ExpenseEvent_remark`

- 类型：string
- 字段：`v_fin_expense_wallet_change_dtl_mi.remark`
- 口径：本事件随分录记录的业务备注，用于补充说明事件相关事项，不替代事件编号、类型、阶段或具体对象引用。
