# 虚假重复客资认定 `DuplicateStoreFinding`

- 分组：稽查
- 父类：无

## 说明

一个统计月对主门店与另一重复门店的配对认定，按ym、cust_code、dup_cust_code识别，保留两方各自的经销商、业代、线路和大区。原疑似记录在本轮按确认虚假解释，但不把两个门店编码自动合并为同一实例。知识中的虚假客资门店数取主门店cust_code，不自动将配对另一方也计入同一指标。

## 指出的关系

- 主门店 → 门店 `DuplicateStoreFinding_primary_store`
  cust_code记录本配对认定的主门店，也是知识中虚假客资门店指标使用的参与方。
- 重复配对门店 → 门店 `DuplicateStoreFinding_duplicate_store`
  dup_cust_code记录与主门店配对的另一门店；不能因此合并两编码或自动计入主门店指标。
- 主门店经销商 → 经销商 `DuplicateStoreFinding_primary_dealer`
  dealer_range_code与本认定主门店及ym配套，不应用到另一配对门店。
- 配对门店经销商 → 经销商 `DuplicateStoreFinding_duplicate_dealer`
  dup_dealer_range_code与本认定dup_cust_code及ym配套。
- 主门店业代 → 业代 `DuplicateStoreFinding_primary_representative`
  emp_code记录本月主门店一方的业代。
- 配对门店业代 → 业代 `DuplicateStoreFinding_duplicate_representative`
  dup_emp_code记录本月配对门店一方的业代，不与主门店人员混合。
- 主门店线路 → 线路 `DuplicateStoreFinding_primary_route`
  route_code记录本月主门店一方的线路。
- 配对门店线路 → 线路 `DuplicateStoreFinding_duplicate_route`
  dup_route_code记录本月配对门店一方的线路。
- 主门店大区 → 大区 `DuplicateStoreFinding_primary_district`
  dis_code直接记录本月主门店一方的大区。
- 配对门店大区 → 大区 `DuplicateStoreFinding_duplicate_district`
  dup_dis_code直接记录本月配对门店一方的大区。

## 指入的关系

无

## 属性

### 认定月份 `DuplicateStoreFinding_month`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.ym`
- 口径：本次门店配对认定的ym，与双方身份和距离、名称匹配、照片相似度保持对应。

### 主门店编码 `DuplicateStoreFinding_primary_store_code`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.cust_code`
- 口径：本月配对认定中主门店的引用编码，与配对门店编码共同限定认定对象。知识中的虚假客资门店数在所选期间按该编码去重，不按配对记录数或双方编码并集计数。

### 主门店名称 `DuplicateStoreFinding_primary_store_name`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.cust_name`
- 口径：本月认定记录所载的主门店名称，与该记录的主门店编码对应，用于理解配对及名称匹配信息；名称不是认定的唯一标识。

### 配对门店编码 `DuplicateStoreFinding_duplicate_store_code`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.dup_cust_code`
- 口径：本月认定中与主门店配对的另一门店的引用编码。重复认定不表示两个编码应合并为同一门店实例，也不使本字段自动纳入以主门店cust_code计数的虚假客资指标。

### 配对门店名称 `DuplicateStoreFinding_duplicate_store_name`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.dup_cust_name`
- 口径：本月认定记录所载的另一配对门店名称，与配对门店编码对应，不能与主门店名称混成无对应的名称列表。

### 主门店经销商编码 `DuplicateStoreFinding_primary_dealer_range_code`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.dealer_range_code`
- 口径：本月认定记录记载的主门店对应经销商的引用编码，仅属于主门店一方，不应用到另一配对门店。

### 配对门店经销商编码 `DuplicateStoreFinding_duplicate_dealer_range_code`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.dup_dealer_range_code`
- 口径：本月认定记录记载的另一配对门店对应经销商的引用编码，与主门店经销商分别保留。

### 主门店业代编码 `DuplicateStoreFinding_primary_representative_code`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.emp_code`
- 口径：本月认定记录记载的主门店一方的业代引用编码，表示该方门店对应的销售服务人员，不表示算法执行人或实际核查人。

### 配对门店业代编码 `DuplicateStoreFinding_duplicate_representative_code`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.dup_emp_code`
- 口径：本月认定记录记载的另一配对门店一方的业代引用编码，不与主门店业代混用，也不据此额外推断个人责任结论。

### 主门店线路编码 `DuplicateStoreFinding_primary_route_code`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.route_code`
- 口径：本月认定记录记载的主门店一方的线路引用编码，与该方经销商和业代配套解释，不假定线路编码跨所有服务范围唯一。

### 配对门店线路编码 `DuplicateStoreFinding_duplicate_route_code`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.dup_route_code`
- 口径：本月认定记录记载的另一配对门店一方的线路引用编码，与配对方经销商和业代配套解释，不由主门店线路替代。

### 主门店大区编码 `DuplicateStoreFinding_primary_district_code`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.dis_code`
- 口径：本月认定记录直接记载的主门店一方的大区引用编码，不用另一方大区或当前组织归属改写。

### 配对门店大区编码 `DuplicateStoreFinding_duplicate_district_code`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.dup_dis_code`
- 口径：本月认定记录直接记载的另一配对门店一方的大区引用编码，与主门店大区分别保留。

### 配对门店距离 `DuplicateStoreFinding_store_distance`

- 类型：decimal
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.distance_m`
- 口径：本月配对认定中记录的两家门店之间的距离，不是陈列照片与门店之间的距离。现有字段说明未明确计量单位和距离计算口径，不根据字段后缀自行换算。

### 名称匹配字符串 `DuplicateStoreFinding_matched_terms`

- 类型：string
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.matched_terms`
- 口径：本月认定记录针对两家配对门店名称保存的匹配字符串，用于解释名称匹配信息，不等同任一方的完整门店名称，也不是门店标识。

### 店头照相似度 `DuplicateStoreFinding_picture_similarity_score`

- 类型：decimal
- 字段：`v_ai_mid_chl_sus_duplicate_cust_mi.pic_sim_score`
- 口径：本月配对认定中两家门店店头照的相似度分值。保留原评分尺度，不自行解释为百分比或虚假概率；本轮来源记录按用户确认解释为虚假，不以该分值另行重新判定。
