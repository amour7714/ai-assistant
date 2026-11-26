# 月度分销目标 `DistributionTarget`

- 分组：目标
- 父类：无

## 说明

为办事处、经销商、主任、业代或子门店制定的月度分销任务，以目标主体身份和月份保持对应。门店进货目标按月记录，多月累计需汇总各月目标；各管理层级的目标不是可相加的不同业绩。水目标对应行销类目为水，树叶目标对应东方树叶。单日目标为月目标除以月分销天数，月累折算目标按已过分销天数比例计算。主任目标使用已提供的主任月表，不把文档中的未来调节功能或重新汇总下属目标当作现行取值规则。

## 指出的关系

- 业代目标承担人 → 业代 `DistributionTarget_representative`
  仅业代月目标适用，emp_code记录目标业代，与同月主任目标分别保留，不能混加。
- 主任目标承担人 → 主任 `DistributionTarget_supervisor`
  仅主任月目标适用，p_emp_code记录主任目标主体；业代目标行的p_emp_code是管理归属而非该目标承担人。
- 业代目标所属主任 → 主任 `DistributionTarget_managing_supervisor`
  业代月目标行的p_emp_code记录该业代目标在本月所属主任，不把这项归属改称主任本人目标。
- 经销商目标主体 → 经销商 `DistributionTarget_dealer`
  仅经销商分销目标适用，dealer_range_code记录承担本月分销目标的销售客户。
- 办事处目标主体 → 办事处 `DistributionTarget_office_subject`
  仅组织分销目标适用，off_code记录目标办事处；其他主体目标所附办事处是归属关系。
- 门店进货目标主体 → 子门店 `DistributionTarget_store_scope`
  子门店月度指标中的total_target、water_target属于该ym和cust_range_code的目标，不按门店当前维表重复复制。
- 进货目标对应门店 → 门店 `DistributionTarget_store`
  子门店月度目标同时直接记录cust_code，表示实际门店；跨服务范围统计需保留各目标范围，不按门店编码任取一行。
- 目标归属办事处 → 办事处 `DistributionTarget_attribution_office`
  人员、经销商和子门店目标行记录的办事处表示相应月份管理归属，与办事处作为目标主体的关系区分。
- 目标归属大区 → 大区 `DistributionTarget_attribution_district`
  分销目标来源直接记录的大区用于当月归属及汇总，不把不同主体层级目标累加。
- 分销日历依据 → 业务日历日 `DistributionTarget_calendar`
  目标月份对应日历month_id，以所选截止日的分销天序、总天数或进度折算，不能按多条日历记录重复累计目标。
- 目标事业部 → 事业线 `DistributionTarget_business_line`
  主任或业代月度分销目标直接指定的事业部，复用DistributionTarget_business_line_code属性。主任目标取v_trd_dist_ord_target_mgr_1m_df同一行的bsn_code，并与stat_month及目标承担主任p_emp_code配套；业代目标取v_trd_dist_ord_target_emp_1m_df同一行的bsn_code，并与stat_month、目标承担业代emp_code及岗位范围配套。仅适用于这两个人员目标来源，不推广到未直接提供事业部字段的经销商、办事处或子门店进货目标，也不由承担人员当前归属反推目标事业部。不同月份保持各自对应，不认定本处bsn_code与当前维表bns_code逐值等价。
- 目标归属区域 → 公司组织 `DistributionTarget_attribution_region`
  月度分销目标在目标记录中直接注明的公司销售管理区域，复用DistributionTarget_attribution_region_code和DistributionTarget_attribution_region_name。经销商目标取v_trd_dist_target_dealer_df同一行reg_code、reg_name，与month_id和dealer_range_code配套；办事处目标取v_trd_dist_target_org_df同一行reg_code、reg_name，与ym和off_code配套；子门店进货目标取v_dim_chl_sub_cust_indct_mi同一行reg_name，与ym和cust_range_code配套，该来源不补区域编码。仅覆盖这三类直接提供区域的目标来源，不为主任或业代目标补区域，不沿承担主体或大区的当前层级推导。不同月份及主体层级保留各自对应，区域联系不使不同层级目标成为可相加的任务。

## 指入的关系

无

## 属性

### 目标月份 `DistributionTarget_target_month`

- 类型：string
- 字段：`v_trd_dist_ord_target_mgr_1m_df.stat_month`、`v_trd_dist_ord_target_emp_1m_df.stat_month`、`v_trd_dist_target_dealer_df.month_id`、`v_trd_dist_target_org_df.ym`、`v_dim_chl_sub_cust_indct_mi.ym`
- 口径：本月度分销任务所属的月份，与目标主体及同一来源记录中的总额、水、东方树叶和数量类目标保持对应。按年月匹配业务日历的自然月month_id，不以销售财务月替代；不同主体层级的同月目标不能混加。

### 目标分销财年 `DistributionTarget_distribution_financial_year`

- 类型：string
- 字段：`v_trd_dist_target_dealer_df.fin_year`、`v_trd_dist_ord_target_mgr_1m_df.stat_month`、`v_trd_dist_ord_target_emp_1m_df.stat_month`、`v_trd_dist_target_org_df.ym`、`v_dim_chl_sub_cust_indct_mi.ym`
- 口径：本目标月份所属的分销财年，周期为上年12月至本年11月。经销商目标保留来源直接记录的fin_year；其他来源依据目标月份推算：12月归入下一自然年份命名的财年，其他月份归入所在自然年份命名的财年。

### 目标事业部编码 `DistributionTarget_business_line_code`

- 类型：string
- 字段：`v_trd_dist_ord_target_mgr_1m_df.bsn_code`、`v_trd_dist_ord_target_emp_1m_df.bsn_code`
- 口径：人员月度目标记录直接保存的事业部编号，用于限定该目标的业务范围，不以人员组织编码或其他对象的事业部信息补值。

### 目标业代编码 `DistributionTarget_representative_code`

- 类型：string
- 字段：`v_trd_dist_ord_target_emp_1m_df.emp_code`
- 口径：业代月度分销目标承担人的员工编码，仅用于业代本人目标。子门店目标行中的业代属于管理服务归属，不作为本属性来源；员工编码为空时不能将不同空岗目标合并为同一个业代目标。

### 目标业代名称 `DistributionTarget_representative_name`

- 类型：string
- 字段：`v_trd_dist_ord_target_emp_1m_df.emp_name`
- 口径：业代本人月度目标记录中的承担人名称，与目标业代编码和月份对应，不用当前人员维表名称覆盖该记录。

### 目标主任编码 `DistributionTarget_supervisor_code`

- 类型：string
- 字段：`v_trd_dist_ord_target_mgr_1m_df.p_emp_code`
- 口径：主任本人月度分销目标承担人的编码。业代目标行及子门店目标行中的p_emp_code表示所属或负责主任，不是主任本人目标主体。

### 目标主任名称 `DistributionTarget_supervisor_name`

- 类型：string
- 字段：`v_trd_dist_ord_target_mgr_1m_df.p_emp_name`
- 口径：主任本人月度目标记录中的承担人名称，与目标主任编码和月份对应。

### 目标主体职位编码 `DistributionTarget_subject_position_code`

- 类型：string
- 字段：`v_trd_dist_ord_target_emp_1m_df.pos_code`、`v_trd_dist_ord_target_mgr_1m_df.director_pos_code`
- 口径：人员月度目标记录直接保存的目标承担人职位编码：业代目标使用pos_code，主任目标使用director_pos_code。与本月人员目标配套，不表示当前人力岗位，也不据此认定已经能够唯一识别空岗目标。

### 目标主体职位名称 `DistributionTarget_subject_position_name`

- 类型：string
- 字段：`v_trd_dist_ord_target_emp_1m_df.pos_name`
- 口径：业代月度目标记录中直接保存的职位名称，与同一行职位编码和月份对应。

### 目标所属主任编码 `DistributionTarget_managing_supervisor_code`

- 类型：string
- 字段：`v_trd_dist_ord_target_emp_1m_df.p_emp_code`、`v_dim_chl_sub_cust_indct_mi.p_emp_code`
- 口径：本目标记录的管理归属主任编码。业代目标中表示该业代当月所属主任，子门店进货目标中表示该子门店当月负责主任；均不表示主任本人承担这一条目标。

### 目标所属主任名称 `DistributionTarget_managing_supervisor_name`

- 类型：string
- 字段：`v_trd_dist_ord_target_emp_1m_df.p_emp_name`、`v_dim_chl_sub_cust_indct_mi.p_emp_name`
- 口径：目标当月管理归属主任的名称，与同一来源记录的主任编码、目标主体和月份对应。

### 目标经销商范围编码 `DistributionTarget_dealer_range_code`

- 类型：string
- 字段：`v_trd_dist_target_dealer_df.dealer_range_code`
- 口径：承担经销商本人月度分销目标的销售客户销售范围编码，仅经销商目标适用。不同于子门店目标的所属销售客户引用，也不等同SAP客户编码。

### 目标经销商名称 `DistributionTarget_dealer_name`

- 类型：string
- 字段：`v_trd_dist_target_dealer_df.dealer_name`
- 口径：经销商本人月度分销目标记录中的目标主体名称，与销售范围编码及目标月份对应。

### 目标办事处编码 `DistributionTarget_office_subject_code`

- 类型：string
- 字段：`v_trd_dist_target_org_df.off_code`
- 口径：承担组织月度分销目标的办事处编码，仅办事处作为目标主体时适用。人员、经销商及子门店目标所附办事处编码是管理归属，另行保留。

### 目标办事处名称 `DistributionTarget_office_subject_name`

- 类型：string
- 字段：`v_trd_dist_target_org_df.off_name`
- 口径：组织月度分销目标承担办事处的名称，与该目标行的办事处编码及月份对应。

### 目标子门店编码 `DistributionTarget_store_scope_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.cust_range_code`
- 口径：承担月度进货目标的子门店编码。与目标月份共同限定门店销售服务范围，不能只按cust_code任取一个子门店目标。

### 进货目标门店编码 `DistributionTarget_store_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.cust_code`
- 口径：子门店月度进货目标直接引用的实际门店编码。同一门店可对应多个子门店目标，跨服务范围统计仍须保留各自目标范围。

### 进货目标门店名称 `DistributionTarget_store_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.cust_name`
- 口径：子门店月度进货目标所附实际门店的名称，与门店编码、子门店编码和月份对应，不将其解释为独立的子门店名称。

### 门店目标负责业代编码 `DistributionTarget_store_representative_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.emp_code`
- 口径：子门店进货目标记录中保存的当月负责业代编码。目标主体仍为子门店，不把该金额当作业代本人月度分销目标。

### 门店目标负责业代名称 `DistributionTarget_store_representative_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.emp_name`
- 口径：子门店进货目标当月负责业代的名称，与该目标行业代编码和月份对应。

### 门店目标所属客户编码 `DistributionTarget_store_dealer_range_code`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.dealer_range_code`
- 口径：子门店进货目标记录中保存的当月所属销售客户销售范围编码。表示子门店目标的客户归属，不是经销商本人分销目标主体，也不解释为服务或配送客户。

### 门店目标所属客户名称 `DistributionTarget_store_dealer_name`

- 类型：string
- 字段：`v_dim_chl_sub_cust_indct_mi.dealer_name`
- 口径：子门店进货目标当月所属销售客户的名称，与同一行销售范围编码对应。

### 目标归属办事处编码 `DistributionTarget_attribution_office_code`

- 类型：string
- 字段：`v_trd_dist_ord_target_mgr_1m_df.off_code`、`v_trd_dist_ord_target_emp_1m_df.off_code`、`v_trd_dist_target_dealer_df.off_code`、`v_dim_chl_sub_cust_indct_mi.off_code`
- 口径：人员、经销商及子门店月度目标直接记录的当月管理归属办事处编码。与办事处作为目标主体的编码区分，不按当前人员或客户主数据重写历史目标归属。

### 目标归属办事处名称 `DistributionTarget_attribution_office_name`

- 类型：string
- 字段：`v_trd_dist_ord_target_mgr_1m_df.off_name`、`v_trd_dist_ord_target_emp_1m_df.off_name`、`v_trd_dist_target_dealer_df.off_name`、`v_dim_chl_sub_cust_indct_mi.off_name`
- 口径：非办事处主体目标记录中的当月归属办事处名称，与同一行归属办事处编码对应。

### 目标归属大区编码 `DistributionTarget_attribution_district_code`

- 类型：string
- 字段：`v_trd_dist_ord_target_mgr_1m_df.dis_code`、`v_trd_dist_ord_target_emp_1m_df.dis_code`、`v_trd_dist_target_dealer_df.dis_code`、`v_trd_dist_target_org_df.dis_code`、`v_dim_chl_sub_cust_indct_mi.dis_code`
- 口径：月度分销目标直接保存的当月归属大区编码，用于限定目标管理范围及同一目标主体层级内的汇总，不表示大区另有一条可与下属目标相加的任务。

### 目标归属大区名称 `DistributionTarget_attribution_district_name`

- 类型：string
- 字段：`v_trd_dist_ord_target_mgr_1m_df.dis_name`、`v_trd_dist_ord_target_emp_1m_df.dis_name`、`v_trd_dist_target_dealer_df.dis_name`、`v_trd_dist_target_org_df.dis_name`、`v_dim_chl_sub_cust_indct_mi.dis_name`
- 口径：本月目标记录直接保存的归属大区名称，与同一来源的目标主体、月份和大区编码对应。

### 目标归属区域编码 `DistributionTarget_attribution_region_code`

- 类型：string
- 字段：`v_trd_dist_target_dealer_df.reg_code`、`v_trd_dist_target_org_df.reg_code`
- 口径：目标记录直接保存的上层销售管理区域编码，不表示省市行政区划，也不从当前组织层级反推历史目标区域。

### 目标归属区域名称 `DistributionTarget_attribution_region_name`

- 类型：string
- 字段：`v_trd_dist_target_dealer_df.reg_name`、`v_trd_dist_target_org_df.reg_name`、`v_dim_chl_sub_cust_indct_mi.reg_name`
- 口径：目标当月直接记录的上层销售管理区域名称。仅提供名称的来源保留名称引用，不据此宣称已经得到区域编码。

### 月度分销目标金额 `DistributionTarget_target_amount`

- 类型：decimal
- 字段：`v_trd_dist_ord_target_mgr_1m_df.target_amt`、`v_trd_dist_ord_target_emp_1m_df.target_amt`、`v_trd_dist_target_dealer_df.target_amt`、`v_trd_dist_target_org_df.target_amt`、`v_dim_chl_sub_cust_indct_mi.total_target`
- 口径：为本目标主体制定的整月分销任务金额；子门店来源称进货目标。主任直接使用主任月表的已提供值，不重新汇总下属业代或采用未来调节方案取值。多月累计按同一主体范围汇总各月目标，不混加不同管理层级目标，也不将总额与水、东方树叶分项目标重复相加。金额保留来源值，不能将缺失目标补成零。

### 月度水目标金额 `DistributionTarget_water_target_amount`

- 类型：decimal
- 字段：`v_trd_dist_ord_target_mgr_1m_df.water_target_amt`、`v_trd_dist_ord_target_emp_1m_df.water_target_amt`、`v_trd_dist_target_dealer_df.water_target_amt`、`v_trd_dist_target_org_df.water_target_amt`、`v_dim_chl_sub_cust_indct_mi.water_target`
- 口径：本目标主体在对应月份制定的水分销任务金额，子门店来源称水进货目标。水按行销类目为水解释，与同一行主体、月份及总目标金额配套，不作为可在总目标之外再次累加的金额。

### 月度东方树叶目标金额 `DistributionTarget_leaf_target_amount`

- 类型：decimal
- 字段：`v_trd_dist_ord_target_emp_1m_df.leaf_target_amt`、`v_trd_dist_target_dealer_df.leaf_target_amt`、`v_trd_dist_target_org_df.leaf_target_amt`
- 口径：本目标主体在对应月份制定的东方树叶分销任务金额，树叶为东方树叶简称。与同一行总目标、水目标配套；主任月表和子门店月表未提供该分项目标，不能用总目标减水目标推算，也不能补零。

### 活跃门店数目标 `DistributionTarget_active_store_count_target`

- 类型：integer
- 字段：`v_trd_dist_ord_target_mgr_1m_df.actv_cust_target`、`v_trd_dist_ord_target_emp_1m_df.actv_cust_target`
- 口径：主任或业代在对应月份制定的活跃门店数量目标，不是实际活跃门店数。两类人员目标分别保留，不把主任目标和其下属业代目标相加；目标考核采用的具体活跃判定条件尚未明确。

### 门店SKU数目标 `DistributionTarget_store_sku_count_target`

- 类型：decimal
- 字段：`v_trd_dist_ord_target_mgr_1m_df.actv_cust_sku_target`、`v_trd_dist_ord_target_emp_1m_df.actv_cust_sku_target`
- 口径：主任或业代月度目标中保存的门店SKU数量要求，与该人员目标及月份对应。资料未明确它是店均SKU数、每店要求还是门店与SKU组合总数，也未证明其等同活跃SKU数目标；保留字段值，不改写为某一种统计口径。

### 单日分销目标金额 `DistributionTarget_daily_target_amount`

- 类型：decimal
- 字段：`v_trd_dist_ord_target_mgr_1m_df.target_amt`、`v_trd_dist_ord_target_emp_1m_df.target_amt`、`v_trd_dist_target_dealer_df.target_amt`、`v_trd_dist_target_org_df.target_amt`、`v_dim_chl_sub_cust_indct_mi.total_target`、`v_trd_time_prg_df.dist_day_cnt`
- 口径：将本月分销任务按该月分销天数均分后的单日目标，计算为月度分销目标金额除以月分销天数。结果沿用月目标金额口径；月目标缺失或月分销天数缺失、非正数时结果未定义。它是目标计算值，不证明本轮历史明细能够提供今日实际分销。

### 单日水目标金额 `DistributionTarget_daily_water_target_amount`

- 类型：decimal
- 字段：`v_trd_dist_ord_target_mgr_1m_df.water_target_amt`、`v_trd_dist_ord_target_emp_1m_df.water_target_amt`、`v_trd_dist_target_dealer_df.water_target_amt`、`v_trd_dist_target_org_df.water_target_amt`、`v_dim_chl_sub_cust_indct_mi.water_target`、`v_trd_time_prg_df.dist_day_cnt`
- 口径：本月水目标按月分销天数均分后的单日任务金额，计算为月度水目标金额除以月分销天数。目标金额缺失或分母缺失、非正数时结果未定义，不用总目标替代水目标。

### 单日东方树叶目标金额 `DistributionTarget_daily_leaf_target_amount`

- 类型：decimal
- 字段：`v_trd_dist_ord_target_emp_1m_df.leaf_target_amt`、`v_trd_dist_target_dealer_df.leaf_target_amt`、`v_trd_dist_target_org_df.leaf_target_amt`、`v_trd_time_prg_df.dist_day_cnt`
- 口径：本月东方树叶目标按月分销天数均分后的单日任务金额，计算为月度东方树叶目标金额除以月分销天数。仅具备树叶月目标来源的目标适用；缺失目标或无有效分母时结果未定义。

### 截止日折算目标金额 `DistributionTarget_cutoff_target_amount`

- 类型：decimal
- 字段：`v_trd_dist_ord_target_mgr_1m_df.target_amt`、`v_trd_dist_ord_target_mgr_1m_df.stat_month`、`v_trd_dist_ord_target_emp_1m_df.target_amt`、`v_trd_dist_ord_target_emp_1m_df.stat_month`、`v_trd_dist_target_dealer_df.target_amt`、`v_trd_dist_target_dealer_df.month_id`、`v_trd_dist_target_org_df.target_amt`、`v_trd_dist_target_org_df.ym`、`v_dim_chl_sub_cust_indct_mi.total_target`、`v_dim_chl_sub_cust_indct_mi.ym`、`v_trd_time_prg_df.month_id`、`v_trd_time_prg_df.dist_day_rn`、`v_trd_time_prg_df.dist_day_cnt`、`v_trd_time_prg_df.dist_time_prg`
- 口径：本月任务截至指定日期应计入累计目标的金额。目标月早于截止日自然月时取整月目标；等于截止月时取月目标乘以已过分销天数除以该月总分销天数；晚于截止月时取0。截止月也可按指标清单使用月目标乘以分销时间进度，两种算法择一，不叠乘。截止日期是计算参数，结果不是已维护的整月目标；年累目标在同一主体范围和所选分销财年内汇总各月折算值。目标金额、月份或必要日历输入缺失时不补零，截止月总天数非正数时结果未定义。

### 截止日折算水目标金额 `DistributionTarget_cutoff_water_target_amount`

- 类型：decimal
- 字段：`v_trd_dist_ord_target_mgr_1m_df.water_target_amt`、`v_trd_dist_ord_target_mgr_1m_df.stat_month`、`v_trd_dist_ord_target_emp_1m_df.water_target_amt`、`v_trd_dist_ord_target_emp_1m_df.stat_month`、`v_trd_dist_target_dealer_df.water_target_amt`、`v_trd_dist_target_dealer_df.month_id`、`v_trd_dist_target_org_df.water_target_amt`、`v_trd_dist_target_org_df.ym`、`v_dim_chl_sub_cust_indct_mi.water_target`、`v_dim_chl_sub_cust_indct_mi.ym`、`v_trd_time_prg_df.month_id`、`v_trd_time_prg_df.dist_day_rn`、`v_trd_time_prg_df.dist_day_cnt`、`v_trd_time_prg_df.dist_time_prg`
- 口径：本月水任务截至指定日期应计入累计水目标的金额。早于截止自然月的目标取整月水目标，截止月取水目标乘以已过分销天数除以月总分销天数，晚于截止月取0；截止月可择一采用水目标乘以分销时间进度。与目标主体、目标月份和本次指定截止日期对应，不是整月水目标的替代存储值。年累按同一主体范围及分销财年汇总各月折算值；目标或必要输入缺失、截止月总天数非正数时结果未定义。

### 截止日折算东方树叶目标金额 `DistributionTarget_cutoff_leaf_target_amount`

- 类型：decimal
- 字段：`v_trd_dist_ord_target_emp_1m_df.leaf_target_amt`、`v_trd_dist_ord_target_emp_1m_df.stat_month`、`v_trd_dist_target_dealer_df.leaf_target_amt`、`v_trd_dist_target_dealer_df.month_id`、`v_trd_dist_target_org_df.leaf_target_amt`、`v_trd_dist_target_org_df.ym`、`v_trd_time_prg_df.month_id`、`v_trd_time_prg_df.dist_day_rn`、`v_trd_time_prg_df.dist_day_cnt`、`v_trd_time_prg_df.dist_time_prg`
- 口径：本月东方树叶任务截至指定日期应计入累计树叶目标的金额。早于截止自然月取整月树叶目标，截止月取树叶目标乘以已过分销天数除以月总分销天数，晚于截止月取0；截止月可择一采用树叶目标乘以分销时间进度。仅具备树叶月目标的来源适用，并保持主体、月份及指定截止日期对应。年累在同一主体范围和分销财年内汇总；缺失树叶目标不补零或由其他目标推算，必要输入缺失或截止月总天数非正数时结果未定义。
