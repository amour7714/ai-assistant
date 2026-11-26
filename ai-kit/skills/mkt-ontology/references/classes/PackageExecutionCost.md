# 套餐门店执行费用 `PackageExecutionCost`

- 分组：活动
- 父类：无

## 说明

分销套餐在某执行月、经销商、门店和商品范围形成的执行及核销费用事实，按execute_ym、plan_dtl_id、dealer_range_code、cust_code、cmdt_code对应。gift_amt按指标清单第128行作为已提供的含税赠品分摊结果直接使用，不再次分摊。其门店商品金额不能与上层活动计划金额直接叠加；套餐分销金额与套餐赠品金额在材料提及的部分结果列未包含于本轮结构，不能据名称补造可查询属性。

## 指出的关系

- 执行套餐 → 分销套餐 `PackageExecutionCost_package`
  套餐门店执行费用通过v_mkt_package_cust_cost_mi同一行的plan_code、plan_name直接引用所执行的分销套餐活动，复用PackageExecutionCost_plan_code和PackageExecutionCost_plan_name。联系保留该费用事实的execute_ym、dealer_range_code、cust_code、cmdt_code范围；名称用于解释编码，不单独作为唯一标识。plan_dtl_id仅用于PackageExecutionCost_plan_detail关系中的计划明细引用，不作为套餐活动头标识。本联系不表示计划明细ID、套餐ID、渠道活动ID或不同来源的计划编码可以互换，也不证明跨来源套餐实例已匹配。
- 对应计划明细 → 活动计划明细 `PackageExecutionCost_plan_detail`
  套餐门店执行费用通过v_mkt_package_cust_cost_mi同一行的plan_dtl_id直接引用对应的活动计划明细，复用PackageExecutionCost_plan_detail_identifier，并保留execute_ym及该费用事实的dealer_range_code、cust_code、cmdt_code范围。plan_dtl_id表示计划明细，不表示套餐活动头；执行套餐另由PackageExecutionCost_package通过plan_code、plan_name引用。不将计划明细ID与套餐ID、渠道活动ID互换，也不据此认定不同来源的计划编码等价。比较计划明细费用与门店商品执行费用时须保留各自粒度，不将两层金额重复累计。
- 执行销售客户 → 经销商 `PackageExecutionCost_dealer`
  dealer_range_code是该套餐门店商品费用事实的经销商维度。
- 执行门店 → 门店 `PackageExecutionCost_store`
  cust_code是该套餐费用事实的门店维度，不能据此任选子门店。
- 执行商品 → 商品 `PackageExecutionCost_product`
  cmdt_code是该套餐费用事实的商品维度。
- 执行归属办事处 → 办事处 `PackageExecutionCost_office`
  费用行off_code、off_name直接记录该执行范围的办事处。
- 执行归属大区 → 大区 `PackageExecutionCost_district`
  费用行dis_code、dis_name直接记录该执行范围的大区。
- 支持部门 → 公司组织 `PackageExecutionCost_supporting_department`
  supt_dpmt_code、supt_dpmt_name记录本套餐执行费用的支持部门。
- 执行归属区域 → 公司组织 `PackageExecutionCost_region`
  套餐门店商品执行费用记录直接注明的公司销售管理区域，由v_mkt_package_cust_cost_mi同一行reg_code、reg_name引用，复用PackageExecutionCost_region_code和PackageExecutionCost_region_name。联系与该行execute_ym、plan_dtl_id、dealer_range_code、cust_code、cmdt_code限定的费用事实配套，不将这一费用行的归属无条件提升为套餐活动或计划头归属。不沿经销商或大区当前组织层级替换直接记录值，也不认定跨来源组织编码已经等价或实例已经匹配。

## 指入的关系

无

## 属性

### 执行年月 `PackageExecutionCost_execution_month`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.execute_ym`
- 口径：本套餐门店执行费用所属的执行年月，与同一记录的计划明细、经销商、门店和商品配套使用；不以活动开始、结束或终止日期所在月替代。

### 费用财年 `PackageExecutionCost_financial_year`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.fin_year`
- 口径：本套餐执行费用记录所属的财年。业务财年为上年12月至本年11月，不等同自然年。

### 计划明细标识 `PackageExecutionCost_plan_detail_identifier`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.plan_dtl_id`
- 口径：本费用记录对应的活动计划明细标识，是执行费用联合粒度的一部分；不把它当作套餐活动头标识。

### 套餐计划编码 `PackageExecutionCost_plan_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.plan_code`
- 口径：本费用记录引用的分销套餐计划编码，与计划明细标识区分；不默认等同下沉追踪资料中的package_code。

### 套餐计划名称 `PackageExecutionCost_plan_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.plan_name`
- 口径：本费用记录引用的分销套餐计划名称，与同一记录的计划编码配套；名称不能单独证明跨来源套餐是同一实例。

### 套餐活动类型编码 `PackageExecutionCost_activity_type_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.actv_type_code`
- 口径：本费用记录所引用套餐的活动类型编码，与活动类型名称配套；不同于为活动分配资金的费用包类型。

### 套餐活动类型 `PackageExecutionCost_activity_type_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.actv_type_name`
- 口径：本费用记录所引用套餐的活动类型名称。材料分别识别经销商套餐、统案套餐和业代套餐，不将这些活动类别与费用包类别混用。

### 套餐活动开始时间 `PackageExecutionCost_activity_start_time`

- 类型：dateTime
- 字段：`v_mkt_package_cust_cost_mi.start_date`
- 口径：本费用记录引用的套餐活动开始时间，用于解释活动执行期间；不是本笔费用的确认或核销时间。

### 套餐活动结束时间 `PackageExecutionCost_activity_end_time`

- 类型：dateTime
- 字段：`v_mkt_package_cust_cost_mi.end_date`
- 口径：本费用记录引用的套餐活动结束时间，与活动终止日期分别解释；不能据此认定本笔费用已经确认或核销。

### 套餐活动终止日期 `PackageExecutionCost_activity_termination_date`

- 类型：date
- 字段：`v_mkt_package_cust_cost_mi.termination_date`
- 口径：本费用记录引用的套餐活动终止日期，与活动结束时间区分；它不直接表示本笔费用的核销状态。

### 执行对象粒度 `PackageExecutionCost_execution_object_grain`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.execute_object_grain`
- 口径：本费用记录所引用套餐计划的执行对象类别，决定执行对象编码指向哪类对象；不改变本费用事实按执行月、计划明细、经销商、门店和商品记录的粒度。

### 执行对象编码 `PackageExecutionCost_execution_object_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.execute_object_code`
- 口径：本费用记录引用的套餐计划执行对象编码，必须结合执行对象粒度解释；不统一视为门店编码、经销商编码或本费用事实标识。

### 费用类型编码 `PackageExecutionCost_expense_type_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.expen_type_code`
- 口径：本套餐执行费用记录的费用类型编码，与费用类型名称配套。不能因字段同名而套用费用包expen_type_code中D为自有、U为预留的定义。

### 费用类型 `PackageExecutionCost_expense_type_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.expen_type_name`
- 口径：本套餐执行费用记录提供的费用类型名称，与同一行费用类型编码对应，不作为自有或预留费用模式的替代判断。

### 执行销售客户编码 `PackageExecutionCost_dealer_range_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.dealer_range_code`
- 口径：本套餐门店商品费用范围中的经销商销售范围编码，是费用记录联合粒度的一部分；不是SAP客户编码，也不据此推定配送方或费用承担方身份。

### 执行销售客户名称 `PackageExecutionCost_dealer_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.dealer_name`
- 口径：本费用记录保存的执行销售客户名称，与同一记录的经销商销售范围编码对应。

### 执行门店编码 `PackageExecutionCost_store_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.cust_code`
- 口径：本套餐费用事实涉及的实际门店编码，是联合粒度的一部分；本表未提供子门店编码，不能据此任选一个子门店。

### 执行门店名称 `PackageExecutionCost_store_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.cust_name`
- 口径：本费用记录保存的门店名称，与同一记录的门店编码配套，不表示某个独立子门店的名称。

### 执行商品编码 `PackageExecutionCost_product_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.cmdt_code`
- 口径：本套餐费用事实的商品范围编码，是联合粒度的一部分。不能仅因本行包含赠品分摊金额，就认定该编码一定指赠品商品；本表没有订单商品性质字段。

### 执行商品名称 `PackageExecutionCost_product_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.cmdt_name`
- 口径：本费用记录保存的商品名称，与同一记录的商品编码配套；不单独表示赠品商品名称。

### 渠道编码 `PackageExecutionCost_channel_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.chl_code`
- 口径：本套餐执行费用记录保存的渠道编码，与渠道名称配套。资料未证明该字段就是赠品分摊规则中的渠道群编码。

### 渠道名称 `PackageExecutionCost_channel_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.chl_name`
- 口径：本套餐执行费用记录保存的渠道名称，与同一行渠道编码对应；不能仅凭名称确定赠品分摊渠道群。

### 执行归属区域编码 `PackageExecutionCost_region_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.reg_code`
- 口径：本费用记录直接保存的区域组织编码，按该执行费用范围解释；不表示省、市或区县等行政区划编码。

### 执行归属区域 `PackageExecutionCost_region_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.reg_name`
- 口径：本费用记录直接保存的区域组织名称，与同一记录的区域编码配套。

### 执行归属大区编码 `PackageExecutionCost_district_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.dis_code`
- 口径：本套餐执行费用记录直接保存的大区编码，限定本执行范围的组织归属；不以经销商或门店当前大区覆盖。

### 执行归属大区 `PackageExecutionCost_district_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.dis_name`
- 口径：本套餐执行费用记录保存的大区名称，与同一记录的大区编码对应。

### 执行归属办事处编码 `PackageExecutionCost_office_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.off_code`
- 口径：本套餐执行费用记录直接保存的办事处编码，用于本执行范围的组织归属分析；不由当前客户主数据替代。

### 执行归属办事处 `PackageExecutionCost_office_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.off_name`
- 口径：本套餐执行费用记录保存的办事处名称，与同一记录的办事处编码对应。

### 费用账户编码 `PackageExecutionCost_expense_account_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.expen_src_code`
- 口径：本费用记录提供的费用账户引用值，来源字段标注为费用账户编码；不自动等同费用来源配置的expen_code，也不与预留账户acct_code互相补值。

### 费用科目编码 `PackageExecutionCost_expense_subject_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.subject_code`
- 口径：本套餐执行费用记录的费用项目或科目编码，与科目名称对应；费用科目不同于费用类型和费用账户。

### 费用科目 `PackageExecutionCost_expense_subject_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.subject_name`
- 口径：本套餐执行费用记录提供的费用项目或科目名称，与同一行科目编码配套。

### 支持部门编码 `PackageExecutionCost_supporting_department_code`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.supt_dpmt_code`
- 口径：支持本套餐执行费用的部门编码，与支持部门名称对应；支持部门身份不同于执行归属办事处、大区或区域。

### 支持部门 `PackageExecutionCost_supporting_department_name`

- 类型：string
- 字段：`v_mkt_package_cust_cost_mi.supt_dpmt_name`
- 口径：本费用记录保存的支持部门名称，与同一记录的支持部门编码配套。

### 赠品分摊金额（含税） `PackageExecutionCost_gift_allocation_amount`

- 类型：decimal
- 字段：`v_mkt_package_cust_cost_mi.gift_amt`
- 口径：本执行月、计划明细、经销商、门店和商品范围内记录的含税赠品分摊金额。指标材料将gift_amt明确用于含税赠品分摊指标，分摊口径为渠道群赠品金额乘以本品金额占同渠道群本品金额合计的比例。直接使用字段提供的分摊结果，不再次分摊，也不等同未分摊的套餐赠品金额。

### 我司承担实施金额 `PackageExecutionCost_company_borne_implementation_amount`

- 类型：decimal
- 字段：`v_mkt_package_cust_cost_mi.ws_bear_impl_amt`
- 口径：本套餐门店商品执行范围内由我司承担的实施费用金额，是已提供的承担后金额，不再乘我司承担比例。实施、确认、待核销和核销属于不同费用阶段，不能相加作为总费用。

### 我司承担确认金额 `PackageExecutionCost_company_borne_confirmation_amount`

- 类型：decimal
- 字段：`v_mkt_package_cust_cost_mi.ws_bear_confirm_amt`
- 口径：本套餐执行范围内，财务依据营销费用制度和核销资料确认后由我司承担的费用金额。直接使用承担后确认值，不再次乘承担比例；确认金额不表示已经核销或支付。

### 待核销金额 `PackageExecutionCost_pending_verification_amount`

- 类型：decimal
- 字段：`v_mkt_package_cust_cost_mi.wait_verify_amt`
- 口径：本费用范围财务确认后，结合适用承担比例及核销系数或达成系数形成的待核销金额。它不是扣除已核销金额后的剩余余额；本表未提供完整系数参数，不能仅由我司承担确认金额重算。

### 核销金额 `PackageExecutionCost_verified_amount`

- 类型：decimal
- 字段：`v_mkt_package_cust_cost_mi.verify_amt`
- 口径：本套餐门店商品费用范围内已形成的核销金额，不等同门店实发费用、现金支付或返还折扣金额。记录按执行年月归属，但本表没有提供具体核销发生日期。

### 核销完成率 `PackageExecutionCost_verification_completion_rate`

- 类型：decimal
- 字段：`v_mkt_package_cust_cost_mi.verify_amt`、`v_mkt_package_cust_cost_mi.wait_verify_amt`
- 口径：同一执行期间和费用范围内，核销金额占待核销金额的比例。单条记录按verify_amt除以wait_verify_amt计算；汇总时先分别合计核销金额和待核销金额再相除，不相加或简单平均各记录比率。分母为零或缺失时结果未定义，展示为百分比时乘以100。
