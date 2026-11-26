# 费用包 `ExpensePackage`

- 分组：费用
- 父类：无

## 说明

将营销费用分配到经销商、业代线路及适用期间的业务费用包，不是分销套餐活动。类型包括陈列、套餐和货龄，保留包头与所引用分配明细标识的区别。不同类型的月度金额与使用金额口径不同：陈列使用对应签约，套餐使用可含套餐订单及其他渠道活动占用，货龄使用包含终端预占和订单占用；套餐mon_cost_amt还可能已为初始金额减冻结额，不能统一当新增分配额。自有和预留费用模式分别保留，不与费用出处枚举混用。

## 指出的关系

- 分配销售客户 → 经销商 `ExpensePackage_dealer`
  dealer_range_code记录费用包所属或分配的销售客户，按本包类型、期间及来源解释。
- 分配业代 → 业代 `ExpensePackage_representative`
  emp_code记录费用包分配所针对业代，不因一个包关联多个门店重复计分配金额。
- 分配线路 → 线路 `ExpensePackage_route`
  route_code直接记录费用包对应的业代线路，保留与人员、执行期间的同记录对应。
- 关联统案活动 → 统案活动 `ExpensePackage_unified_campaign`
  unity_plan_code、unity_plan_name明确引用费用包所关联统案活动，不把费用包本身视为活动子类。
- 费用包来源 → 费用来源 `ExpensePackage_source`
  source_code、source_name标注费用来源，保留其与费用来源对象的联系；不同于expen_type_code自有预留模式。
- 费用包事业线 → 事业线 `ExpensePackage_business_line`
  bsn_code限定费用包身份、事件引用及可比较范围。
- 费用包办事处 → 办事处 `ExpensePackage_office`
  off_code、off_name直接记录费用包归属办事处。
- 费用包大区 → 大区 `ExpensePackage_district`
  dis_code、dis_name直接记录费用包归属大区。
- 费用包归属区域 → 公司组织 `ExpensePackage_region`
  费用包记录直接注明的公司销售管理区域，由v_mkt_cost_package_df同一行reg_code、reg_name引用，复用ExpensePackage_region_code和ExpensePackage_region_name。联系保留本行费用包标识、事业线及类型对应的期间：陈列和套餐包按原业务月解释，货龄包按原财年解释，不将exec_month自动作为货龄包唯一月份或历史快照日期。该关系适用于陈列费用包子类，沿用其DISPLAY限定及继承属性，不另建重复关系。不沿大区当前层级替换记录归属，也不认定跨来源组织实例或包头与分配明细对应已验证。

## 指入的关系

无

## 属性

### 费用包头标识 `ExpensePackage_head_identifier`

- 类型：string
- 字段：`v_mkt_cost_package_df.package_id`
- 口径：费用包头的ID，与分配明细标识package_dlt_id分别保留。不同类型、事业线或来源范围的同号包不能仅据此认定为同一对象。

### 费用包编码 `ExpensePackage_package_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.package_code`
- 口径：费用包记录提供的业务编码，与业代月度费用包编码package_dtl_code分开解释，不将两者直接互换。

### 分配明细标识 `ExpensePackage_detail_identifier`

- 类型：string
- 字段：`v_mkt_cost_package_df.package_dlt_id`、`v_fin_expense_wallet_change_dtl_mi.cost_package_id`
- 口径：用于引用费用包分配明细的跨来源标识，资料标注为package_dlt_id。它不是package_id包头ID；视图究竟按包头还是分配明细保存存在资料冲突，不能据此直接确定包头数量或金额去重规则。

### 月度费用包编码 `ExpensePackage_monthly_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.package_dtl_code`、`v_fin_expense_wallet_change_dtl_mi.event_object_code`
- 口径：业代月度费用包的业务编码，与费用包编码和包头ID不同。使用时保留该编码对应的业代、线路及执行月，不将各月编码拆成无对应的列表。

### 年费用包批次号 `ExpensePackage_annual_batch_identifier`

- 类型：string
- 字段：`v_mkt_cost_package_df.batch_id`
- 口径：经销商给业代分配年费用包的批次号，用于识别分配批次，不等同单个费用包头或月度分配明细的身份。

### 月费用包批次号 `ExpensePackage_monthly_batch_identifier`

- 类型：string
- 字段：`v_mkt_cost_package_df.batch_dtl_id`
- 口径：业代月度费用包的批次号，与年费用包批次号分别记录，并限定在本记录提供的执行月和分配对象范围内。

### 关联分组标识 `ExpensePackage_group_identifier`

- 类型：string
- 字段：`v_mkt_cost_package_df.dim_group_id`
- 口径：费用包记录提供的关联维度或分组ID。陈列月包事件定位时，它作为费用组范围与明细编码、客户及业务月共同使用，不是费用包头、分配明细或钱包分录的唯一标识。

### 费用包类型 `ExpensePackage_package_type`

- 类型：string
- 字段：`v_mkt_cost_package_df.package_type_code`
- 口径：区分陈列、套餐和货龄费用包的类型编码：DISPLAY为陈列，SALES为套餐，FRESHNESS为货龄。类型决定月度金额、使用金额及期间的解释，套餐费用包不等同分销套餐活动。

### 费用包类型名称 `ExpensePackage_package_type_name`

- 类型：string
- 字段：`v_mkt_cost_package_df.package_type_name`
- 口径：费用包记录提供的类型名称，与同记录费用包类型编码配套展示。

### 费用模式 `ExpensePackage_expense_mode`

- 类型：string
- 字段：`v_mkt_cost_package_df.expen_type_code`
- 口径：费用包采用的费用模式编码，expen_type_code中的D为自有，U为预留。它不是活动费用类型，也不等同费用出处中的自主、战略或大区预留等枚举。

### 费用模式名称 `ExpensePackage_expense_mode_name`

- 类型：string
- 字段：`v_mkt_cost_package_df.expen_type_name`
- 口径：费用包记录提供的自有或预留费用模式名称，与同记录D/U编码配套，不将其当作营销费用项目或费用出处名称。

### 事业线编码 `ExpensePackage_business_line_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.bsn_code`
- 口径：费用包所属事业线的编码，是费用包身份和可比较业务范围的一部分，不跨事业线合并同号费用包。

### 执行财年 `ExpensePackage_financial_year`

- 类型：string
- 字段：`v_mkt_cost_package_df.fin_year`
- 口径：费用包记录的执行财年。业务财年通常为上年12月至本年11月；货龄包按原财年解释，陈列和套餐包还须保留原业务月，不能只按财年合并期间。

### 开始年月 `ExpensePackage_start_month`

- 类型：string
- 字段：`v_mkt_cost_package_df.exec_start_month`
- 口径：费用包记录的开始年月，用于解释其覆盖期间，不等同费用来源配置的开始时间。

### 结束年月 `ExpensePackage_end_month`

- 类型：string
- 字段：`v_mkt_cost_package_df.exec_end_month`
- 口径：费用包记录的结束年月，与开始年月共同说明覆盖期间。本列不是提前终止状态，也不能单独证明费用包当前仍可使用。

### 执行年月 `ExpensePackage_execution_month`

- 类型：string
- 字段：`v_mkt_cost_package_df.exec_month`
- 口径：费用包记录提供的执行年月，格式为yyyyMM，月度金额及分配对象须与本月保持对应。陈列和套餐按原业务月解释；货龄原业务粒度为财年，其本列与当月分配的实际对应尚待确认，不能将本列当作包头唯一月份或快照月份。

### 分配客户编码 `ExpensePackage_dealer_range_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.dealer_range_code`
- 口径：费用包记录直接引用的所属或分配销售客户销售范围编码，与本包类型、期间及分配范围共同解释，不等同SAP客户编码。

### 分配客户名称 `ExpensePackage_dealer_name`

- 类型：string
- 字段：`v_mkt_cost_package_df.dealer_name`
- 口径：费用包记录中所属或分配销售客户的名称，与同记录客户销售范围编码配套，不用当前客户名称覆盖记录值。

### 分配业代编码 `ExpensePackage_representative_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.emp_code`
- 口径：费用包分配所针对业代的编码，与本记录线路和执行期间对应，不表示所有费用均由该员工亲自执行。

### 分配业代名称 `ExpensePackage_representative_name`

- 类型：string
- 字段：`v_mkt_cost_package_df.emp_name`
- 口径：费用包记录提供的分配业代名称，与同记录业代编码配套，不由人员当前任职信息替代。

### 分配线路编码 `ExpensePackage_route_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.route_code`
- 口径：费用包分配所针对业代线路的编码，与同记录业代、客户和执行期间共同解释，不据线路编码推断跨服务范围唯一。

### 费用来源编码 `ExpensePackage_source_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.source_code`
- 口径：费用包记录引用的费用来源编码，与自有或预留费用模式分别保留。资料尚未明确它与费用来源配置expen_code的编码范围及财年对应，不能直接互换。

### 费用来源名称 `ExpensePackage_source_name`

- 类型：string
- 字段：`v_mkt_cost_package_df.source_name`
- 口径：费用包记录引用的费用来源名称，与同记录source_code配套，不作为自有或预留模式判定依据。

### 关联统案编码 `ExpensePackage_unified_campaign_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.unity_plan_code`
- 口径：费用包直接引用的统案活动编码，用于识别本包关联的统案，不是费用包自身编码，也不是统案客户分配标识。

### 关联统案名称 `ExpensePackage_unified_campaign_name`

- 类型：string
- 字段：`v_mkt_cost_package_df.unity_plan_name`
- 口径：费用包记录提供的关联统案活动名称，与同记录统案编码配套，不据名称推断活动或客户分配的唯一身份。

### 办事处编码 `ExpensePackage_office_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.off_code`
- 口径：费用包记录直接提供的归属办事处编码，按该费用包记录的业务范围解释，不由经销商当前组织归属替代。

### 办事处名称 `ExpensePackage_office_name`

- 类型：string
- 字段：`v_mkt_cost_package_df.off_name`
- 口径：费用包记录提供的归属办事处名称，与同记录办事处编码配套。

### 大区编码 `ExpensePackage_district_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.dis_code`
- 口径：费用包记录直接提供的归属大区编码，不仅依赖办事处当前组织层级反推。

### 大区名称 `ExpensePackage_district_name`

- 类型：string
- 字段：`v_mkt_cost_package_df.dis_name`
- 口径：费用包记录提供的归属大区名称，与同记录大区编码配套，不等同区域名称。

### 区域编码 `ExpensePackage_region_code`

- 类型：string
- 字段：`v_mkt_cost_package_df.reg_code`
- 口径：费用包记录直接提供的上层区域组织编码，不表示省、市等行政区划编码。

### 区域名称 `ExpensePackage_region_name`

- 类型：string
- 字段：`v_mkt_cost_package_df.reg_name`
- 口径：费用包记录提供的区域组织名称，与同记录区域编码配套，和大区名称分别保留。

### 费用包头总额 `ExpensePackage_total_amount`

- 类型：decimal
- 字段：`v_mkt_cost_package_df.total_cost_amt`
- 口径：费用包头的总金额，与业代月度金额及使用金额不同。数据设计描述每原包头一行，指标材料又说明该金额会随分配明细重复；对应范围未核定前，不能按明细、业代、线路或月份直接累加，也不能按金额值去重。

### 月度费用包金额 `ExpensePackage_monthly_amount`

- 类型：decimal
- 字段：`v_mkt_cost_package_df.mon_cost_amt`
- 口径：费用包记录提供的当月或月度金额，与本记录执行月、业代及线路配套。按指标说明，陈列为业代月分配金额，货龄为当月分配的费用包金额，套餐为初始金额减冻结金额，已接近可用余额，因此不能统一解释为新增分配额。业务规定过期或终止包的可用余额为0，但本字段不提供完整状态，也不能与使用金额统一相减得到正式可用余额。

### 费用包使用金额 `ExpensePackage_used_amount`

- 类型：decimal
- 字段：`v_mkt_cost_package_df.used_amt`
- 口径：费用包记录提供的已使用或已占用金额：陈列对应费用包的签约金额，套餐对应套餐订单及其他适用渠道活动的占用，货龄包含终端预占和订单占用。它不是统一的已核销金额或门店实付金额；须保留本记录月份或财年范围，不默认是单月发生额。
