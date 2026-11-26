# 门店拜访 `StoreVisit`

- 分组：渠道
- 父类：无

## 说明

员工在具体日期和时间对某门店沿某线路实施的一次拜访，保留开始、结束时间及相应人员、门店、线路范围。计划内拜访、成功拜访、陈列检查完成和协访合格是不同状态，不能互相推导。被协访人员与实际拜访人员分别识别；资料所附上级不自动表示拜访发生时的上级或共同拜访人。off、dis、reg字段明确记录拜访发生时组织；cur_off_code、cur_off_name、cur_dis_name、cur_reg_name是资料另附的组织引用，取值时点尚未明确，不覆盖当时组织。cur_mkt_level及cur_device_cnt、cur_device_door_cnt明确标注当前市场层级和当前设备数量，继续按其已明确的当前含义解释，不将所有cur字段统一认定为当前信息。

## 指出的关系

- 被拜访门店 → 门店 `StoreVisit_store`
  cust_code直接记录本次拜访门店；仅有门店编码不证明对应哪个子门店。
- 拜访线路 → 线路 `StoreVisit_route`
  route_code记录本次拜访使用的线路，与拜访人员和时间配套。
- 拜访执行人 → 员工 `StoreVisit_employee`
  emp_code直接记录实际拜访人员；协访等场景可由不同岗位员工执行，不把整条关系限定为业代。
- 被协访人员 → 员工 `StoreVisit_assisted_employee`
  assisted_emp_code记录协访所针对的员工，与拜访执行人分别保留，非协访记录不强制存在。
- 记录上级人员 → 员工 `StoreVisit_superior`
  p_emp_code、p_emp_name及配套上级基准岗直接记录本次拜访资料所附的上级人员。资料未明确该引用的取值时点，不擅自认定为拜访发生时的上级，也不表示共同拜访人；一般上级身份不自动证明主任身份。
- 所属销售客户 → 经销商 `StoreVisit_dealer`
  dealer_range_code直接记录本次拜访所附所属销售客户。
- 服务销售客户 → 经销商 `StoreVisit_service_dealer`
  serv_dealer_range_code直接记录本次拜访所附服务销售客户，不与所属客户合并。
- 当时办事处 → 办事处 `StoreVisit_original_office`
  off_code、off_name记录拜访发生时办事处。
- 当时大区 → 大区 `StoreVisit_original_district`
  dis_code、dis_name直接记录拜访发生时大区。
- 另附办事处 → 办事处 `StoreVisit_current_office`
  cur_off_code、cur_off_name直接记录本次拜访资料另附的办事处引用。其取值时点及归属口径尚未明确，不仅凭cur前缀认定为当前归属；与off_code、off_name明确记录的拜访发生时办事处分别保留，不互相覆盖。
- 另附大区 → 大区 `StoreVisit_current_district`
  cur_dis_name直接记录本次拜访资料另附的大区引用，取值时点及归属口径尚未明确，不自动解释为当前大区。与dis_code、dis_name明确记录的拜访发生时大区分别保留；名称引用不证明已完成大区编码匹配。
- 当时区域 → 公司组织 `StoreVisit_original_region`
  本次门店拜访发生时所属的公司销售管理区域，由v_chl_visit_dtl同一行的reg_code、reg_name直接记录，复用StoreVisit_original_region_code和StoreVisit_original_region_name。区域编码与名称保持同记录对应，并保留拜访日期、执行人员、门店、线路及起止时间范围。该联系不表示省市行政区划，与cur_reg_name另附区域分别保留，不沿大区当前层级替代，也不使用另附组织资料覆盖拜访发生时归属。
- 另附区域 → 公司组织 `StoreVisit_current_region`
  本次门店拜访资料另附的公司销售管理区域，由v_chl_visit_dtl同一行的cur_reg_name直接记录，复用StoreVisit_current_region_name，并保留该次拜访的日期、执行人员、门店、线路和时间范围。资料未明确此引用的取值时点及归属口径，不依据cur前缀认定为当前区域，也不将拜访日期当作其取值日期。它与reg_code、reg_name明确记录的拜访发生时区域分别保留，不相互覆盖，不沿大区层级替代，也不据名称补造区域编码。

## 指入的关系

无

## 属性

### 拜访日期 `StoreVisit_visit_date`

- 类型：date
- 字段：`v_chl_visit_dtl.visit_date`
- 口径：本次拜访明细记录的日期，用于日、月及期间统计，不是计划拜访表中的安排日期。人员、门店、线路和本次执行信息须保持同一记录对应。

### 拜访人员编码 `StoreVisit_employee_code`

- 类型：string
- 字段：`v_chl_visit_dtl.emp_code`
- 口径：本次拜访记录的实际执行人员编码，不等同被协访人员或上级人员编码，也不将所有执行人员一律认定为业代。

### 拜访人员姓名 `StoreVisit_employee_name`

- 类型：string
- 字段：`v_chl_visit_dtl.emp_name`
- 口径：本次拜访记录直接保存的执行人员姓名，与同一行拜访人员编码配套，不用当前人员主数据覆盖。

### 拜访人员基准岗编码 `StoreVisit_employee_standard_position_code`

- 类型：string
- 字段：`v_chl_visit_dtl.emp_std_pos_code`
- 口径：本次记录所附拜访人员的基准岗编码，用于解释其执行身份，不据此改变员工身份。

### 拜访人员基准岗 `StoreVisit_employee_standard_position_name`

- 类型：string
- 字段：`v_chl_visit_dtl.emp_std_pos_name`
- 口径：本次记录所附拜访人员的基准岗名称，与本行基准岗编码配套，不由员工当前岗位反推。

### 上级人员编码 `StoreVisit_superior_employee_code`

- 类型：string
- 字段：`v_chl_visit_dtl.p_emp_code`
- 口径：本次拜访记录所附上级人员的编码。上级不一律是主任，也不表示该人员共同实施了本次拜访。

### 上级人员姓名 `StoreVisit_superior_employee_name`

- 类型：string
- 字段：`v_chl_visit_dtl.p_emp_name`
- 口径：本次记录所附上级人员的姓名，与同一行上级人员编码对应。

### 上级基准岗编码 `StoreVisit_superior_standard_position_code`

- 类型：string
- 字段：`v_chl_visit_dtl.p_std_pos_code`
- 口径：本次拜访资料所附上级人员的基准岗编码，用于区分上级岗位范围，不凭一般上级关系认定主任身份。

### 上级基准岗 `StoreVisit_superior_standard_position_name`

- 类型：string
- 字段：`v_chl_visit_dtl.p_std_pos_name`
- 口径：本次记录所附上级人员的基准岗名称，与上级基准岗编码配套。

### 被协访人员编码 `StoreVisit_assisted_employee_code`

- 类型：string
- 字段：`v_chl_visit_dtl.assisted_emp_code`
- 口径：协访所针对人员的编码，与实际拜访执行人员分别识别。非协访记录不强制存在该引用。

### 被协访人员姓名 `StoreVisit_assisted_employee_name`

- 类型：string
- 字段：`v_chl_visit_dtl.assisted_emp_name`
- 口径：本次协访记录所附被协访人员的姓名，与同一行被协访人员编码对应。

### 被协访岗位编码 `StoreVisit_assisted_position_code`

- 类型：string
- 字段：`v_chl_visit_dtl.assisted_pos_code`
- 口径：本次协访记录所附被协访人员的岗位编码，不与实际拜访人员的基准岗编码混用。

### 被协访职位 `StoreVisit_assisted_position_name`

- 类型：string
- 字段：`v_chl_visit_dtl.assisted_pos_name`
- 口径：本次协访记录所附被协访人员的职位名称，与其岗位编码保持同一记录对应。

### 拜访线路编码 `StoreVisit_route_code`

- 类型：string
- 字段：`v_chl_visit_dtl.route_code`
- 口径：本次拜访使用的线路编码，与本次人员、门店和时间配套，不作为跨所有服务范围已保证唯一的线路标识。

### 拜访线路类型 `StoreVisit_route_type_name`

- 类型：string
- 字段：`v_chl_visit_dtl.route_type_name`
- 口径：本次拜访明细记录的线路类型名称，不由拜访类型或计划拜访标记推导。

### 被拜访门店编码 `StoreVisit_store_code`

- 类型：string
- 字段：`v_chl_visit_dtl.cust_code`
- 口径：本次拜访对象的终端客户编码，识别实际门店。本表没有子门店编码，不能据此指定某个经营服务范围。

### 被拜访门店名称 `StoreVisit_store_name`

- 类型：string
- 字段：`v_chl_visit_dtl.cust_name`
- 口径：本次拜访明细直接记录的门店名称，与本行门店编码配套，不用名称单独识别拜访或合并门店。

### 所属销售客户编码 `StoreVisit_dealer_range_code`

- 类型：string
- 字段：`v_chl_visit_dtl.dealer_range_code`
- 口径：本次拜访记录所附所属销售客户的销售范围编码，与服务销售客户分别保留，不等同SAP编码。

### 所属销售客户SAP编码 `StoreVisit_dealer_sap_code`

- 类型：string
- 字段：`v_chl_visit_dtl.dealer_sap_code`
- 口径：本次记录直接保存的所属销售客户SAP编码，与所属客户销售范围编码属于不同标识体系。

### 所属销售客户名称 `StoreVisit_dealer_name`

- 类型：string
- 字段：`v_chl_visit_dtl.dealer_name`
- 口径：本次拜访资料所附所属销售客户的名称，与同一行所属客户编码配套。

### 所属销售客户类型编码 `StoreVisit_dealer_type_code`

- 类型：string
- 字段：`v_chl_visit_dtl.dealer_type`
- 口径：本次拜访记录所附所属销售客户的类型编码，限定所属客户身份下的分类，不解释为服务客户类型。

### 所属销售客户类型 `StoreVisit_dealer_type_name`

- 类型：string
- 字段：`v_chl_visit_dtl.dealer_type_name`
- 口径：本次记录所附所属销售客户的类型名称，与同一行所属客户类型编码对应。

### 服务销售客户编码 `StoreVisit_service_dealer_range_code`

- 类型：string
- 字段：`v_chl_visit_dtl.serv_dealer_range_code`
- 口径：本次拜访记录所附服务销售客户的销售范围编码，与所属销售客户为不同参与身份。

### 服务销售客户SAP编码 `StoreVisit_service_dealer_sap_code`

- 类型：string
- 字段：`v_chl_visit_dtl.serv_dealer_sap_code`
- 口径：本次记录直接保存的服务销售客户SAP编码，不与服务客户销售范围编码或所属客户SAP编码混用。

### 服务销售客户名称 `StoreVisit_service_dealer_name`

- 类型：string
- 字段：`v_chl_visit_dtl.serv_dealer_name`
- 口径：本次拜访记录所附服务销售客户的名称，与本行服务客户编码对应。

### 服务销售客户类型编码 `StoreVisit_service_dealer_type_code`

- 类型：string
- 字段：`v_chl_visit_dtl.serv_dealer_type`
- 口径：本次拜访记录所附服务销售客户的类型编码，与所属销售客户类型分别解释。

### 服务销售客户类型 `StoreVisit_service_dealer_type_name`

- 类型：string
- 字段：`v_chl_visit_dtl.serv_dealer_type_name`
- 口径：本次记录所附服务销售客户的类型名称，与同一行服务客户类型编码配套。

### 当时办事处编码 `StoreVisit_original_office_code`

- 类型：string
- 字段：`v_chl_visit_dtl.off_code`
- 口径：拜访发生时的办事处编码，用于历史拜访归属，不由当前办事处编码替代。

### 当时办事处名称 `StoreVisit_original_office_name`

- 类型：string
- 字段：`v_chl_visit_dtl.off_name`
- 口径：拜访发生时的办事处名称，与当时办事处编码对应，不与当前名称互换。

### 当时大区编码 `StoreVisit_original_district_code`

- 类型：string
- 字段：`v_chl_visit_dtl.dis_code`
- 口径：拜访发生时直接记录的大区编码，保留历史归属，不仅通过当前办事处层级反推。

### 当时大区名称 `StoreVisit_original_district_name`

- 类型：string
- 字段：`v_chl_visit_dtl.dis_name`
- 口径：拜访发生时的大区名称，与同一行当时大区编码对应。

### 当时区域编码 `StoreVisit_original_region_code`

- 类型：string
- 字段：`v_chl_visit_dtl.reg_code`
- 口径：拜访发生时所属公司区域组织的编码，不是省、市等行政区划编码。

### 当时区域名称 `StoreVisit_original_region_name`

- 类型：string
- 字段：`v_chl_visit_dtl.reg_name`
- 口径：拜访发生时所属公司区域组织的名称，与当时区域编码配套，不用当前区域覆盖。

### 另附办事处编码 `StoreVisit_current_office_code`

- 类型：string
- 字段：`v_chl_visit_dtl.cur_off_code`
- 口径：拜访资料另附的办事处引用编码，与同一记录的cur_off_name配套。其取值时点及归属口径尚未明确，不能仅凭cur前缀认定为当前归属，也不覆盖明确标注为拜访发生时办事处的off_code。

### 另附办事处名称 `StoreVisit_current_office_name`

- 类型：string
- 字段：`v_chl_visit_dtl.cur_off_name`
- 口径：拜访资料另附的办事处名称，与本行cur_off_code对应。其取值时点及归属口径尚未明确，不认定为已确认的当前名称，与off_name明确记录的当时办事处分别保留。

### 另附大区名称 `StoreVisit_current_district_name`

- 类型：string
- 字段：`v_chl_visit_dtl.cur_dis_name`
- 口径：拜访资料另附的大区名称，取值时点及归属口径尚未明确，不自动解释为当前大区。与dis_name明确记录的拜访发生时大区分别保留，不互相覆盖。

### 另附区域名称 `StoreVisit_current_region_name`

- 类型：string
- 字段：`v_chl_visit_dtl.cur_reg_name`
- 口径：拜访资料另附的公司区域组织名称，不是省市行政区划名称。其取值时点及归属口径尚未明确，不自动解释为当前区域，与reg_name明确记录的拜访发生时区域分别保留。

### 拜访开始时间 `StoreVisit_start_time`

- 类型：dateTime
- 字段：`v_chl_visit_dtl.start_time`
- 口径：本次拜访开始的时刻，与同一记录的结束时间配套，不是进店全貌拍摄时间。

### 拜访结束时间 `StoreVisit_end_time`

- 类型：dateTime
- 字段：`v_chl_visit_dtl.end_time`
- 口径：本次拜访结束的时刻，与开始时间对应。缺少结束时间不能据此认定成功或失败。

### 上次拜访结束时间 `StoreVisit_previous_visit_end_time`

- 类型：dateTime
- 字段：`v_chl_visit_dtl.last_visit_end_time`
- 口径：本次明细附带的上次拜访结束时刻，不是本次结束时间。仅此时间字段不能唯一识别上一次拜访对象。

### 进店全貌拍摄时间 `StoreVisit_entry_photo_time`

- 类型：dateTime
- 字段：`v_chl_visit_dtl.jdqm_photo_time`
- 口径：本次拜访记录的进店全貌拍摄时刻，与拜访开始时间分别保留；拍摄时间本身不证明拜访成功或陈列检查完成。

### 被协访进店全貌拍摄时间 `StoreVisit_assisted_entry_photo_time`

- 类型：dateTime
- 字段：`v_chl_visit_dtl.assisted_jdqm_photo_time`
- 口径：协访记录所附被协访一侧的进店全貌拍摄时刻，与本次记录的进店全貌拍摄时间分别保留，不推定两者同时发生。

### 拜访持续时长（秒） `StoreVisit_elapsed_seconds`

- 类型：decimal
- 字段：`v_chl_visit_dtl.start_time`、`v_chl_visit_dtl.end_time`
- 口径：以本次结束时刻减开始时刻计算的经过秒数。仅在两端均能确定完整时刻且结束不早于开始时计算；缺失、无法确定日期或时间顺序异常时不作为有效持续时长。该值不是理论最短在途时长，也不自动决定成功拜访。

### 拜访类型编码 `StoreVisit_visit_type_code`

- 类型：string
- 字段：`v_chl_visit_dtl.visit_type`
- 口径：本次拜访的原始类型编码，用于区分执行业务类型，不由执行人岗位或被协访人员是否有值替代。

### 拜访类型 `StoreVisit_visit_type_name`

- 类型：string
- 字段：`v_chl_visit_dtl.visit_type_name`
- 口径：本次拜访的类型名称，与同一行拜访类型编码配套。

### 拜访状态 `StoreVisit_visit_status`

- 类型：string
- 字段：`v_chl_visit_dtl.status`
- 口径：本次拜访记录保存的状态值。资料未提供状态枚举，不将其与计划拜访、成功拜访或检查完成标记合并。

### 计划拜访标记 `StoreVisit_planned_visit_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.target_flag`
- 口径：本次拜访记录是否属于计划拜访的原始标记，不证明拜访成功，也不单独标识对应的计划安排。

### 线内外标记 `StoreVisit_inline_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.inline_flag`
- 口径：本次拜访在线内或线外的原始标记。线内外与是否计划拜访是不同信息，不能互相推导。

### 成功拜访标记 `StoreVisit_success_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.if_visit_sucess`
- 口径：本次记录是否成功拜访的原始编码。成功的成立条件和编码未给出，不能由计划内、拍照、时长、距离或检查完成直接推导。

### SKU铺货检查完成标记 `StoreVisit_sku_inspection_completed_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.if_dist_sku`
- 口径：本次拜访是否完成SKU铺货检查的原始编码。完成检查不表示有铺货或达到5水SKU分销条件。

### 陈列检查完成标记 `StoreVisit_display_inspection_completed_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.if_display`
- 口径：本次拜访是否完成陈列检查的原始编码，不等于陈列合格、完全陈列检查完成或成功拜访。

### 检查合格标记 `StoreVisit_check_eligibility_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.if_assist_elgb`
- 口径：本次记录中“是否合格检查”的原始编码，不由检查完成或成功拜访推导。源注释尚未说明其是否专指协访合格，不能将其作为所有陈列签约的最终合格结果。

### 完全陈列检查完成标记 `StoreVisit_complete_display_inspection_status`

- 类型：string
- 字段：`v_chl_visit_dtl.completely_inspect_status`
- 口径：本次记录是否完成完全陈列检查的原始编码，与一般陈列检查完成标记分别保留，不仅凭检查计数相等推导。

### 完成检查数 `StoreVisit_completed_inspection_count`

- 类型：integer
- 字段：`v_chl_visit_dtl.completed_inspect_num`
- 口径：本次拜访明细保存的完成检查数量，与同一行总检查数保持对应。资料未细分检查任务范围，不能直接解释为合格陈列项数或签约数。

### 总检查数 `StoreVisit_total_inspection_count`

- 类型：integer
- 字段：`v_chl_visit_dtl.all_inspect_num`
- 口径：本次拜访明细保存的总检查数量，与本次完成检查数配套，不等于门店全部陈列签约数量或月度检查次数。

### 当日最后一次拜访标记 `StoreVisit_last_visit_of_day_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.if_last_visit`
- 口径：本条记录是否为当日最后一次拜访的原始标记。资料明确1表示当日最后一次，但未说明其他取值及具体人员、线路范围；不能据此删除其他拜访。

### 拜访星期 `StoreVisit_week_day`

- 类型：string
- 字段：`v_chl_visit_dtl.week_day`
- 口径：本次拜访明细保存的星期值。资料未说明数字编码或名称格式，保留原值，不作为另一项计划拜访日期。

### 记录拜访频次 `StoreVisit_visit_frequency`

- 类型：string
- 字段：`v_chl_visit_dtl.visit_freq`
- 口径：本次明细所附门店拜访频次，不表示本次拜访次数或统计期间已完成次数，也不能据此认定本次属于计划。

### 开始经度 `StoreVisit_start_longitude`

- 类型：decimal
- 字段：`v_chl_visit_dtl.start_lon`
- 口径：本次拜访开始时记录的经度，与同一行开始纬度构成定位点，不与拍照或实际定位经度混用。

### 开始纬度 `StoreVisit_start_latitude`

- 类型：decimal
- 字段：`v_chl_visit_dtl.start_lat`
- 口径：本次拜访开始时记录的纬度，与同一行开始经度配套。

### 结束经度 `StoreVisit_end_longitude`

- 类型：decimal
- 字段：`v_chl_visit_dtl.end_lon`
- 口径：本次拜访结束时记录的经度，与同一行结束纬度构成结束定位点。

### 结束纬度 `StoreVisit_end_latitude`

- 类型：decimal
- 字段：`v_chl_visit_dtl.end_lat`
- 口径：本次拜访结束时记录的纬度，不由开始或拍照纬度替代。

### 进店全貌拍摄经度 `StoreVisit_photo_longitude`

- 类型：decimal
- 字段：`v_chl_visit_dtl.pic_lon`
- 口径：本次进店全貌拍摄记录的经度，与拍摄纬度对应，不自动等同拜访开始定位。

### 进店全貌拍摄纬度 `StoreVisit_photo_latitude`

- 类型：decimal
- 字段：`v_chl_visit_dtl.pic_lat`
- 口径：本次进店全貌拍摄记录的纬度，与同一行拍摄经度构成拍摄定位点。

### 记录实际经度 `StoreVisit_actual_longitude`

- 类型：decimal
- 字段：`v_chl_visit_dtl.actual_lon`
- 口径：本次明细标注为实际经度的定位值，与实际纬度对应。资料没有明确该定位点是否为门店标准位置，不据名称认定其与其他定位点相同。

### 记录实际纬度 `StoreVisit_actual_latitude`

- 类型：decimal
- 字段：`v_chl_visit_dtl.actual_lat`
- 口径：本次明细标注为实际纬度的定位值，与同一行实际经度对应，其定位主体尚未明确。

### 定位间距离 `StoreVisit_location_distance`

- 类型：decimal
- 字段：`v_chl_visit_dtl.distance`
- 口径：本次拜访明细保存的定位间距离值，与离店定位间距离分别解释。比较的两端、单位及算法未给出，不直接套用虚假陈列认定表的米制阈值。

### 标准距离内标记 `StoreVisit_within_standard_distance_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.in_std_distance`
- 口径：本次记录是否在标准距离内的原始判定值。标准阈值及适用定位点未给出，不由距离值自行计算，也不等同成功拜访。

### 离店定位间距离 `StoreVisit_end_location_distance`

- 类型：decimal
- 字段：`v_chl_visit_dtl.end_dist`
- 口径：本次拜访离店环节保存的定位间距离，与一般定位间距离分开。比较端点和单位尚未说明。

### 离店标准距离内标记 `StoreVisit_end_within_standard_distance_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.in_end_std_distance`
- 口径：本次离店定位是否在标准距离内的原始判定，与拜访定位的标准距离内标记分别保存，不推定两者阈值相同。

### 路途距离 `StoreVisit_travel_distance`

- 类型：decimal
- 字段：`v_chl_visit_dtl.dur_dist`
- 口径：本次拜访明细保存的路途距离值，不等于定位偏差距离。起讫范围、计量单位及路线算法未说明，不能据此自行计算速度。

### 理论最短在途时长 `StoreVisit_theoretical_minimum_travel_duration`

- 类型：decimal
- 字段：`v_chl_visit_dtl.duration`
- 口径：本次明细提供的理论最短在途时长，不是实际在途时间，也不是拜访持续时长。字段单位及计算方式未提供。

### 拜访定位状态 `StoreVisit_start_location_status`

- 类型：string
- 字段：`v_chl_visit_dtl.start_location_desc_bd`
- 口径：本次拜访定位的状态描述，与离店定位状态分别保留；不根据字段后缀推定坐标系或距离合格条件。

### 离店定位状态 `StoreVisit_end_location_status`

- 类型：string
- 字段：`v_chl_visit_dtl.end_location_desc_bd`
- 口径：本次拜访离店定位的状态描述，不由开始定位状态代替。

### 记录冰柜台数 `StoreVisit_recorded_freezer_count`

- 类型：integer
- 字段：`v_chl_visit_dtl.device_cnt`
- 口径：随本次拜访保存的冰柜台数，与附带当前冰柜台数分别解释，不等于本次检查台数或稽查实盘台数。同一门店多次拜访时，不能把重复附带的设备数量累加为设备总量。

### 记录冰柜门数 `StoreVisit_recorded_freezer_door_count`

- 类型：integer
- 字段：`v_chl_visit_dtl.device_door_cnt`
- 口径：随本次拜访保存的冰柜门数，与同一行冰柜台数配套。门数和台数不是同一计量口径，不混加。

### 附带当前冰柜台数 `StoreVisit_current_freezer_count`

- 类型：integer
- 字段：`v_chl_visit_dtl.cur_device_cnt`
- 口径：拜访明细附带的当前冰柜台数，不作为拜访发生时设备数量，也不能跨拜访记录重复累加为门店设备总数。

### 附带当前冰柜门数 `StoreVisit_current_freezer_door_count`

- 类型：integer
- 字段：`v_chl_visit_dtl.cur_device_door_cnt`
- 口径：拜访明细附带的当前冰柜门数，与本行当前冰柜台数配套，不覆盖随拜访保存的冰柜门数。

### 记录设备门店标记 `StoreVisit_device_store_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.is_dvs`
- 口径：本次拜访明细所附是否设备门店的原始编码，不解释为本次完成设备检查或设备盘点合格。

### 记录一店通标记 `StoreVisit_ydt_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.is_ydt`
- 口径：本次拜访明细所附门店是否一店通的原始编码，不表示本次发生支付、核销或卡券兑付。

### 记录合约店标记 `StoreVisit_contract_store_flag`

- 类型：string
- 字段：`v_chl_visit_dtl.is_hyd`
- 口径：本次拜访资料所附是否合约店的原始编码。合约身份不表示协议已确认通过，也不等同常规付费身份或全部陈列付费门店范围。

### 记录门店状态编码 `StoreVisit_store_status_code`

- 类型：string
- 字段：`v_chl_visit_dtl.cust_status`
- 口径：本次拜访明细所附终端客户状态编码，描述本记录的门店信息，不是拜访状态。

### 记录门店状态 `StoreVisit_store_status_name`

- 类型：string
- 字段：`v_chl_visit_dtl.cust_status_name`
- 口径：本次拜访资料所附终端客户状态名称，不以门店当前维表改写，也不将本表门店范围代替月度服务客户口径。

### 记录门店等级编码 `StoreVisit_store_level_code`

- 类型：string
- 字段：`v_chl_visit_dtl.cust_level`
- 口径：本次记录所附终端客户等级编码，不等于市场层级编码或行政区划编码。

### 记录门店等级 `StoreVisit_store_level_name`

- 类型：string
- 字段：`v_chl_visit_dtl.cust_level_name`
- 口径：本次拜访资料所附门店等级名称，可按实际记录的钻石、金、银等等级识别相应范围，不用编码猜测等级名称。

### 记录子渠道编码 `StoreVisit_subchannel_code`

- 类型：string
- 字段：`v_chl_visit_dtl.chl_code`
- 口径：本次拜访明细所附门店子渠道编码，与生动化渠道及渠道群分别保留，不据此指定子门店编码。

### 记录子渠道 `StoreVisit_subchannel_name`

- 类型：string
- 字段：`v_chl_visit_dtl.chl_name`
- 口径：本次拜访明细所附门店子渠道名称，是本条记录的渠道分类，不替代生动化渠道或渠道群。

### 记录生动化渠道编码 `StoreVisit_vivid_channel_code`

- 类型：string
- 字段：`v_chl_visit_dtl.vivid_chl_code`
- 口径：本次拜访明细所附门店生动化渠道编码，与子渠道和渠道群各自的编码体系分别使用。

### 记录生动化渠道 `StoreVisit_vivid_channel_name`

- 类型：string
- 字段：`v_chl_visit_dtl.vivid_chl_name`
- 口径：本次记录所附门店生动化渠道名称，不与子渠道名称混用。

### 记录渠道群编码 `StoreVisit_channel_group_code`

- 类型：string
- 字段：`v_chl_visit_dtl.chl_group_code`
- 口径：本次拜访资料所附门店渠道群编码，不自动等同外部AC统计渠道。

### 记录渠道群 `StoreVisit_channel_group_name`

- 类型：string
- 字段：`v_chl_visit_dtl.chl_group_name`
- 口径：本次拜访资料所附门店渠道群名称，与子渠道、生动化渠道保持区别。

### 记录市场层级 `StoreVisit_recorded_market_level_name`

- 类型：string
- 字段：`v_chl_visit_dtl.mkt_level_name`
- 口径：本次拜访明细保存的市场层级名称，不等于门店等级、公司区域组织或附带当前市场层级。

### 附带当前市场层级 `StoreVisit_current_market_level`

- 类型：string
- 字段：`v_chl_visit_dtl.cur_mkt_level`
- 口径：拜访明细附带的当前市场层级值，与本次记录的市场层级名称分开。资料未明确该值是编码还是名称，不宣称两字段可逐值互换。

### 记录省编码 `StoreVisit_recorded_province_code`

- 类型：string
- 字段：`v_chl_visit_dtl.province_id`
- 口径：本次拜访资料所附门店所在省的编码，属于行政区划信息，不是公司区域编码。

### 记录省名称 `StoreVisit_recorded_province_name`

- 类型：string
- 字段：`v_chl_visit_dtl.province_name`
- 口径：本次拜访资料所附门店所在省的名称，与公司区域及大区名称分别解释。

### 记录城市编码 `StoreVisit_recorded_city_code`

- 类型：string
- 字段：`v_chl_visit_dtl.city_id`
- 口径：本次拜访资料所附门店所在城市的编码，与本行城市名称配套。

### 记录城市名称 `StoreVisit_recorded_city_name`

- 类型：string
- 字段：`v_chl_visit_dtl.city_name`
- 口径：本次拜访资料所附门店所在城市的名称，不作为公司办事处名称。

### 记录区县编码 `StoreVisit_recorded_county_code`

- 类型：string
- 字段：`v_chl_visit_dtl.town_id`
- 口径：本次拜访资料所附门店所在区县的编码。本表town_id明确标注区县，不因字段名改解释为乡镇。

### 记录区县名称 `StoreVisit_recorded_county_name`

- 类型：string
- 字段：`v_chl_visit_dtl.town_name`
- 口径：本次拜访资料所附门店所在区县名称，与乡镇街道信息保持区别。

### 记录街道编码 `StoreVisit_recorded_street_code`

- 类型：string
- 字段：`v_chl_visit_dtl.street_id`
- 口径：本次拜访资料所附门店所在街道的编码，与本行乡镇街道名称配套。

### 记录乡镇街道 `StoreVisit_recorded_street_name`

- 类型：string
- 字段：`v_chl_visit_dtl.street_name`
- 口径：本次拜访资料所附门店所在乡镇街道的名称，不据名称自行认定乡镇市场分类。

### 记录详细地址 `StoreVisit_recorded_address`

- 类型：string
- 字段：`v_chl_visit_dtl.address`
- 口径：本次拜访资料所附门店详细地址，不是员工起点地址或定位状态描述，也不据此宣称已得到标准经纬度。
