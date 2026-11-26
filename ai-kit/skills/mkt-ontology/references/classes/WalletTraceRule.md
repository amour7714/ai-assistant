# 钱包业务追溯规则 `WalletTraceRule`

- 分组：费用
- 父类：无

## 说明

规定某事件业务组合从钱包分录追溯到何种业务对象或事实范围的当前规则。由事件域、事件类型、子类型、活动类型、阶段、事业线六项加规则角色识别，空字符串只匹配无值，不是通配。规则区分业务事实、当前余额、业务头与原文等范围；对象找到不等于费用明细匹配，规则就绪不等于本笔已匹配。原流水统计不以命中规则为前提，也不把规则目标表名称建成业务对象。

## 指出的关系

- 适用事业线 → 事业线 `WalletTraceRule_business_line`
  规则bsn_code精确限定适用事业线，不配置跨事业线通配。

## 指入的关系

- 钱包分录 → 主追溯规则 `WalletEntry_main_trace_rule`
  按分录实际事件域、类型、子类型、活动类型、阶段和事业线六项匹配MAIN规则。规则唯一和就绪不证明目标已匹配，原分录统计无需该关系成立。
- 钱包分录 → 补充追溯规则 `WalletEntry_overlay_trace_rule`
  同六项业务组合可独立匹配OVERLAY规则，按需补充业务入口，不是MAIN失败回退，也不能与主入口展开金额重复累计。

## 属性

### 适用事件域 `WalletTraceRule_event_domain`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.event_domain`
- 口径：本规则适用的事件来源分类，包括PLAN计划事件、RESERVED预留事件、SELF自有事件、CUSTOMER门店费用直接记账、DIRECT直接记账和UNKNOWN来源未识别。匹配分录加工后的实际分类，不根据路由名称重新推断；UNKNOWN仍可能配置已审核规则，不表示无费用或无追溯入口。

### 适用事件类型编码 `WalletTraceRule_event_type`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.event_type`
- 口径：本规则适用的业务事件类型原编码，须结合事件域解释。空字符串只匹配源事件类型无值，不表示任意事件类型。

### 适用事件子类型编码 `WalletTraceRule_event_sub_type`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.event_sub_type`
- 口径：本规则适用的事件业务子类型，结合事件域和事件类型解释。quota_generate表示额度生成、region_expense_allocate表示大区费用分配、activity_use表示活动使用；all和plan表示自有调整范围，不等同事件阶段。匹配时源NULL转为空字符串，空字符串不是通配符。

### 适用事件子类型名称 `WalletTraceRule_event_sub_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.event_sub_type_name`
- 口径：本规则所配置事件子类型的展示名称，与同一行事件域、事件类型和子类型编码对应，不参与规则匹配。源未提供名称时保留空值。

### 适用活动类型编码 `WalletTraceRule_activity_type`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.activity_type`
- 口径：本规则适用的事件活动类型原编码，与事件域、类型、子类型和阶段共同限定业务组合，不是钱包类型或钱包业务编号。空字符串只匹配源活动类型无值。

### 适用事件阶段 `WalletTraceRule_stage_code`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.stage_code`
- 口径：本规则适用的记账时业务阶段：plan计划、implement实施、sign签约、confirm确认、verify核销、partVerify部分核销、return回退。它不是活动当前状态；确认阶段也可能承接核销回退。空字符串只匹配源阶段无值。

### 适用事业线编码 `WalletTraceRule_business_line_code`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.bsn_code`
- 口径：本规则限定的事业线引用编码，是规则身份和适用范围的一部分。按编码精确匹配，不配置跨事业线通配。

### 规则角色 `WalletTraceRule_role`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.route_role_code`
- 口径：route_role_code中的MAIN为主要入口，OVERLAY为按需单独使用的补充入口，不是主入口失败后的自动回退；两路结果可能重叠。

### 规则角色名称 `WalletTraceRule_role_name`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.route_role_name`
- 口径：本规则入口角色的展示名称，MAIN显示主路由、OVERLAY显示补充路由。用途以同一行角色编码为准，不根据名称自行改变追溯路径。

### 业务路由编号 `WalletTraceRule_route_identifier`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.route_id`
- 口径：本规则选用的数仓业务路由编号，须连同规则角色解释。同一路由可以承接多个业务组合，因此该编号不是规则唯一键，也不是原系统记账规则编号。

### 业务路由名称 `WalletTraceRule_route_name`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.route_name`
- 口径：本规则所选业务路由的解释性名称，与同一行路由编号及角色对应。名称、关键词或相似表名不作为关联键，也不作为独立选路依据。

### 费用组适用说明 `WalletTraceRule_expense_group_state_description`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.group_id_state_desc`
- 口径：规则对该业务组合下事件费用组有值情况及业务含义的说明，不是某笔分录的实际匹配结果。费用组是否必填由所选入口条件决定；费用组无值不表示无规则或无费用。

### 追溯目标与可用范围 `WalletTraceRule_target_scope_description`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.target_object_name`
- 口径：本规则选用入口的目标及可用范围说明，可能带SQL_READY、CANDIDATE_VIEW等状态前缀。它是配置展示文本，不表示本笔分录已经找到目标，也不能直接当作业务对象名称或查询语句。

### 目标表或视图名称 `WalletTraceRule_target_table_name`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.target_group_table`
- 口径：本规则所选入口引用的目标表或视图纯名称。目标可以承载业务事实、记账分录、当前余额或待核候选；表名不代表已按费用组关联，也不据此把物理表建成业务对象。

### 主要定位字段名称 `WalletTraceRule_target_key_name`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.target_group_key`
- 口径：本规则所选入口的主要定位字段纯名称，可以指费用组、客户分配标识、对象编码、事件编号或请求编号。它不是统一费用组外键，也不足以单独构成完整关联条件。

### 对象定位与费用键说明 `WalletTraceRule_object_lookup_description`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.group_key_desc`
- 口径：本规则如何确认事件所指对象身份、选择对象定位方式并解释费用定位键的配置说明。OBJECT_SQL_READY仅表示对象模板就绪；OBJECT_VIA_DETAIL表示对象信息随该角色主模板返回。对象唯一定位只证明身份，不表示费用明细已匹配，也不提升主追溯入口状态；对象名称只供辅助核对。

### 明细追溯模板与条件 `WalletTraceRule_detail_trace_description`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.join_key_desc`
- 口径：本规则所选角色的业务明细追溯模板及前置条件，包括源分录唯一定位、完整六项事件条件、期间及目标业务范围。诊断失败不表示零费用，目标数量不自动等于业务对象数，截断结果不是完整明细。can_aggregate_amount=0只禁止直接汇总该模板目标金额；该标志缺失或为1仍须核定目标粒度、重复、范围和金额含义，原分录按自身口径汇总不受其限制。drill_terminal=1仅停止继续自动追溯，不禁止正常分析；目标展开及主、补入口重叠不得造成原分录金额重复累计。

### 期间与覆盖范围说明 `WalletTraceRule_period_scope_description`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.partition_rule_desc`
- 口径：本规则所选入口的时间条件、真实来源分区及业务覆盖范围说明。流水记账月、事件业务月、目标业务月份和来源分区分别解释，不默认相同；目标未开放ms或ds时不能补造分区字段，也不能从记账月推算真实来源月份。

### 支持范围编码 `WalletTraceRule_support_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.support_type_code`
- 口径：本规则所支持的目标范围分类：FACT为已整合业务事实或记账分录，SNAPSHOT为当前余额快照，SOURCE为事件或动作原文，HEAD为业务头，UNVERIFIED为待核。不同范围不是可混加的费用口径；FACT也不证明目标金额可以直接汇总。

### 支持范围名称 `WalletTraceRule_support_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.support_type_name`
- 口径：本规则支持范围的展示名称，与同一行支持范围编码配套，用于区分业务费用、实际记账分录、当前余额、对象和原文，不据名称合并不同范围金额。

### 目标定位要求编码 `WalletTraceRule_target_relation_type_code`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.relation_type_code`
- 口径：本规则对目标定位结果的要求：ONE表示目标应唯一定位，GROUP表示目标可能是合法业务集合。它不是本笔已匹配数量，GROUP也不表示集合金额必然可汇总；诊断行不算业务明细。

### 目标定位要求名称 `WalletTraceRule_target_relation_type_name`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.relation_type_name`
- 口径：本规则目标定位要求的展示名称，如单条记录或业务集合，与同一行要求编码对应。未核定时可以为空，不以空名称自行推定定位要求。

### 入口状态与依据 `WalletTraceRule_entry_status_description`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.verify_status_desc`
- 口径：本规则所选入口的就绪状态、证据、依赖和适用范围说明。SQL_READY只表示模板就绪，不表示当前权限、目标同步或本笔匹配已通过，历史样本不能代替本次诊断。CANDIDATE_VIEW不阻断原钱包分录统计，但业务费用、核销或付款指标不能在关联未核定时用钱包变动金额合计冒充。

### 规则版本 `WalletTraceRule_version`

- 类型：string
- 字段：`v_fin_expense_wallet_route_df.rule_version`
- 口径：当前同步追溯规则的实际配置版本，须与同一行完整内容及所选主模板、对象模板编号共同解释和绑定。同版本可能有诊断修订，版本相同不保证内容相同；本视图未提供历史规则快照。
