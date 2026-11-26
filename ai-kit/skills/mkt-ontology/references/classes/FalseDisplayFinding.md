# 虚假陈列认定 `FalseDisplayFinding`

- 分组：稽查
- 父类：无

## 说明

对某统计日、门店和具体陈列签约形成的虚假陈列费用认定，按stat_date、cust_code、dsp_id对应。本轮原可疑类型和疑似记录按确认虚假解释，照片距离与拜访间隔是该次认定的依据。月度虚假陈列门店数按cust_code去重；涉及签约金额按所选期间dsp_id识别签约后计一次，不能按认定日重复累计，也不把涉及签约金额称为实际损失或已付金额。

## 指出的关系

- 涉及陈列签约 → 陈列签约 `FalseDisplayFinding_signing`
  dsp_id直接引用认定涉及的具体陈列签约；同一签约多次认定时涉及签约金额只计一次。
- 涉及陈列项 → 陈列项 `FalseDisplayFinding_item`
  dsp_code、dsp_name直接记录认定涉及的项目种类，与具体签约身份区分。
- 认定门店 → 门店 `FalseDisplayFinding_store`
  cust_code直接记录统计日的虚假陈列门店，月度门店数按该编码去重。
- 记录销售客户 → 经销商 `FalseDisplayFinding_dealer`
  dealer_range_code记录本次认定所附销售客户，不推定为费用已付款方。
- 记录业代 → 业代 `FalseDisplayFinding_representative`
  emp_code、emp_name记录本次认定所附业代；本关系不额外推断个人责任结论。
- 记录办事处 → 办事处 `FalseDisplayFinding_office`
  off_name直接记录虚假陈列认定所属办事处。
- 记录大区 → 大区 `FalseDisplayFinding_district`
  dis_name直接记录虚假陈列认定所属大区。

## 指入的关系

无

## 属性

### 统计日期 `FalseDisplayFinding_statistical_date`

- 类型：date
- 字段：`v_ads_ai_chl_sus_display_fee_detail.stat_date`
- 口径：stat_date记录该认定日期，不是签约日期或陈列费用支付日期。

### 认定门店编码 `FalseDisplayFinding_store_code`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.cust_code`
- 口径：本次虚假陈列认定涉及的终端客户编码。统计所选月的虚假陈列门店数时按该编码去重，不按认定行数或签约数量计门店数。

### 记录门店名称 `FalseDisplayFinding_store_name`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.cust_name`
- 口径：本次认定记录所附的终端客户名称，与本记录的认定门店编码对应；不将名称相同的门店自动合并。

### 涉及签约标识 `FalseDisplayFinding_signing_identifier`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.dsp_id`
- 口径：本次认定涉及的具体陈列签约标识。同一签约可以在多个统计日被认定，不同于陈列项种类编码dsp_code；涉及签约金额统计以该标识识别签约并只计一次。

### 涉及陈列项编码 `FalseDisplayFinding_display_item_code`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.dsp_code`
- 口径：本次认定记录引用的陈列项目种类编码，用于区分涉及的陈列项；不表示某个具体陈列签约或某台设备。

### 记录陈列项名称 `FalseDisplayFinding_display_item_name`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.dsp_name`
- 口径：本次认定记录所附的陈列项名称，与本行涉及陈列项编码对应，用于解释被认定的执行项目。

### 记录销售客户编码 `FalseDisplayFinding_dealer_sales_range_code`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.dealer_range_code`
- 口径：本次认定记录所附销售客户的销售范围编码，不是SAP客户编码，也不表示该客户就是费用实际付款方。

### 记录业代编码 `FalseDisplayFinding_representative_code`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.emp_code`
- 口径：本次认定记录所附的业代编码，用于识别该认定对应的销售人员；字段本身不构成个人责任认定，也不证明该人员就是签约人。

### 记录业代名称 `FalseDisplayFinding_representative_name`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.emp_name`
- 口径：本次认定记录所附的业代名称，与该行记录业代编码对应，不用当前人员名称或岗位反推本次参与身份。

### 记录办事处名称 `FalseDisplayFinding_office_name`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.off_name`
- 口径：本次虚假陈列认定记录所附的办事处名称，用于按认定记录的组织归属分析，不由当前门店或人员的办事处归属覆盖。

### 记录大区名称 `FalseDisplayFinding_district_name`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.dis_name`
- 口径：本次虚假陈列认定记录直接记载的大区名称，与本行办事处和认定对象对应，不通过当前组织层级替代该记录的归属。

### 照片与门店距离 `FalseDisplayFinding_photo_distance`

- 类型：decimal
- 字段：`v_ads_ai_chl_sus_display_fee_detail.pic_distance`
- 口径：本次认定所用陈列执行照片位置与门店定位之间的距离，单位米。该值是本次认定的依据，不表示两家门店之间的距离。

### 下一家拜访间隔 `FalseDisplayFinding_next_visit_interval_seconds`

- 类型：decimal
- 字段：`v_ads_ai_chl_sus_display_fee_detail.interval_seconds`
- 口径：本次认定记录中的与下一家拜访时间间隔，单位秒，是识别短间隔情形的依据；不等同于在本门店的拜访停留时长。

### 记录签约金额 `FalseDisplayFinding_recorded_signing_amount`

- 类型：decimal
- 字段：`v_ads_ai_chl_sus_display_fee_detail.sign_amt`
- 口径：本次认定记录附带的具体陈列签约金额，不是认定日新增费用、已付金额或实际损失。统计所选期间涉及签约金额时，按dsp_id识别签约后每个签约只计一次，再合计；不能逐认定行累计，也不能按金额数值去重。材料未明确该字段的计量单位及税口径。

### 认定类型 `FalseDisplayFinding_finding_type`

- 类型：string
- 字段：`v_ads_ai_chl_sus_display_fee_detail.sus_type`
- 口径：本次已确认虚假陈列记录保留的原算法类型编码。100_300表示短间隔且照片与门店距离为100～300米，gt_300表示距离大于300米。本轮原可疑记录已按用户确认解释为虚假，本字段不是待确认状态，也不需要用它再次判断是否虚假。
