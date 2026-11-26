# 数据集字段

库：`db_ontology_mkt`。箭头后面是本体属性。

## `v_ads_ai_chl_sus_display_fee_detail`

业代、公司组织、办事处、员工、大区、经销商、虚假陈列认定、门店、陈列签约、陈列项

- `stat_date`（varchar）：统计日期 → 虚假陈列认定.统计日期
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；虚假陈列认定.记录大区名称
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；虚假陈列认定.记录办事处名称
- `dealer_range_code`（varchar）：销售客户编码 → 经销商.销售范围编码；虚假陈列认定.记录销售客户编码
- `emp_name`（varchar）：业代名称 → 员工.员工姓名；业代.员工姓名；虚假陈列认定.记录业代名称
- `emp_code`（varchar）：业代编码 → 员工.员工编码；业代.员工编码；虚假陈列认定.记录业代编码
- `cust_name`（varchar）：终端客户名称 → 门店.门店名称；虚假陈列认定.记录门店名称
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；陈列签约.签约门店编码；虚假陈列认定.认定门店编码
- `pic_distance`（double）：照片与门店距离(米) → 虚假陈列认定.照片与门店距离
- `interval_seconds`（bigint）：与下一家拜访时间间隔(秒) → 虚假陈列认定.下一家拜访间隔
- `dsp_id`（varchar）：陈列签约ID → 陈列签约.签约标识；虚假陈列认定.涉及签约标识
- `dsp_code`（varchar）：陈列项编码 → 陈列签约.签订陈列项编码；陈列项.陈列项编码；虚假陈列认定.涉及陈列项编码
- `dsp_name`（varchar）：陈列项 → 陈列项.陈列项名称；虚假陈列认定.记录陈列项名称
- `sign_amt`（double）：陈列签约金额 → 陈列签约.签约金额；虚假陈列认定.记录签约金额
- `sus_type`（varchar）：可疑类型:100_300-短间隔且距离100~300米,gt_300-距离大于300米 → 虚假陈列认定.认定类型

## `v_ai_mid_chl_sus_duplicate_cust_mi`

业代、公司组织、员工、大区、线路、经销商、虚假重复客资认定、门店

- `ym`（varchar）：年月 → 虚假重复客资认定.认定月份
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；虚假重复客资认定.主门店大区编码
- `dealer_range_code`（varchar）：经销商编码 → 经销商.销售范围编码；虚假重复客资认定.主门店经销商编码
- `emp_code`（varchar）：业代编码 → 员工.员工编码；业代.员工编码；虚假重复客资认定.主门店业代编码
- `route_code`（varchar）：线路编码 → 线路.线路编码；虚假重复客资认定.主门店线路编码
- `cust_code`（varchar）：门店编码 → 门店.门店编码；虚假重复客资认定.主门店编码
- `cust_name`（varchar）：门店名称 → 门店.门店名称；虚假重复客资认定.主门店名称
- `dup_dis_code`（varchar）：疑似重复门店对应的大区编码 → 公司组织.组织编码；大区.组织编码；虚假重复客资认定.配对门店大区编码
- `dup_dealer_range_code`（varchar）：疑似重复门店对应的经销商 → 经销商.销售范围编码；虚假重复客资认定.配对门店经销商编码
- `dup_emp_code`（varchar）：疑似重复门店对应的业代 → 员工.员工编码；业代.员工编码；虚假重复客资认定.配对门店业代编码
- `dup_route_code`（varchar）：疑似重复门店对应的线路 → 线路.线路编码；虚假重复客资认定.配对门店线路编码
- `dup_cust_code`（varchar）：疑似重复门店对应的门店编码 → 门店.门店编码；虚假重复客资认定.配对门店编码
- `dup_cust_name`（varchar）：疑似重复门店对应的门店名称 → 门店.门店名称；虚假重复客资认定.配对门店名称
- `distance_m`（double）：门店之间的距离 → 虚假重复客资认定.配对门店距离
- `matched_terms`（varchar）：门店名称匹配字符串 → 虚假重复客资认定.名称匹配字符串
- `pic_sim_score`（double）：店头照相似度 → 虚假重复客资认定.店头照相似度

## `v_ai_sus_ord_inspect_detail`

公司组织、分销套餐、分销订单行、办事处、员工、商品、大区、经销商、营销活动、虚假分销订单行、门店

- `create_date`（varchar）：订单创建日期:分销订单创建日期 → 分销订单行.订单日期；虚假分销订单行.订单日期
- `dist_ord_no`（varchar）：分销订单编码 → 分销订单行.订单编码；虚假分销订单行.订单编码
- `ord_type`（varchar）：订单类型 → 分销订单行.订单类型；虚假分销订单行.订单类型
- `ord_info`（varchar）：订单信息 → 虚假分销订单行.订单信息
- `ord_level`（varchar）：订单高中低等级 → 虚假分销订单行.订单高中低等级
- `clone_score`（bigint）：克隆订单得分 → 虚假分销订单行.克隆订单得分
- `clone_score_info`（varchar）：克隆订单得分明细 → 虚假分销订单行.克隆得分明细
- `big_score`（bigint）：大额订单得分 → 虚假分销订单行.大额订单得分
- `big_score_info`（varchar）：大额订单得分明细 → 虚假分销订单行.大额得分明细
- `inspect_time`（varchar）：最终生效检查时间 → 虚假分销订单行.最终生效检查时间
- `inspect_result`（varchar）：检查结果 → 虚假分销订单行.检查结果
- `inspect_remark`（varchar）：虚假原因 → 虚假分销订单行.虚假原因
- `source_type`（varchar）：数据来源 → 虚假分销订单行.检查资料来源
- `dispatch_status`（varchar）：派发状态 → 虚假分销订单行.检查派发状态
- `dispatch_user_code`（varchar）：最近一次派发人域账号 → 虚假分销订单行.最近派发人域账号
- `dispatch_user_name`（varchar）：最近一次派发人姓名 → 员工.员工姓名；虚假分销订单行.最近派发人姓名
- `inspect_person_code`（varchar）：派发检查人域账号 → 虚假分销订单行.派发检查人域账号
- `inspect_person_name`（varchar）：派发检查人姓名 → 员工.员工姓名；虚假分销订单行.派发检查人姓名
- `actual_inspect_person_code`（varchar）：实际检查人域账号 → 虚假分销订单行.实际检查人域账号
- `actual_inspect_person_name`（varchar）：实际检查人姓名 → 员工.员工姓名；虚假分销订单行.实际检查人姓名
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；虚假分销订单行.认定记录大区
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；虚假分销订单行.认定记录办事处
- `dealer_range_code`（varchar）：所属经销商NF编码 → 经销商.销售范围编码；虚假分销订单行.认定记录所属客户编码
- `dealer_name`（varchar）：所属经销商名称 → 经销商.经销商名称；虚假分销订单行.认定记录所属客户名称
- `emp_name`（varchar）：销售人员 → 员工.员工姓名；虚假分销订单行.认定记录销售人员姓名
- `emp_code`（varchar）：销售人员编码 → 员工.员工编码；虚假分销订单行.认定记录销售人员编码
- `cust_name`（varchar）：终端客户名称 → 门店.门店名称；虚假分销订单行.认定记录门店名称
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；分销订单行.交易门店编码；虚假分销订单行.交易门店编码
- `create_time`（varchar）：订单创建时间 → 分销订单行.订单时间；虚假分销订单行.订单时间
- `send_time`（varchar）：已发货时间 → 分销订单行.发货时间；虚假分销订单行.发货时间
- `sign_time`（varchar）：签收日期 → 分销订单行.签收日期；虚假分销订单行.签收日期
- `visit_week_names`（varchar）：门店拜访星期 → 虚假分销订单行.记录门店拜访星期
- `cmdt_code`（varchar）：商品编码 → 商品.商品编码；分销订单行.交易商品编码；虚假分销订单行.交易商品编码
- `sign_box_cnt`（bigint）：商品签收箱数 → 虚假分销订单行.检查记录签收箱数
- `chl_actv_name`（varchar）：渠道活动名称 → 分销订单行.渠道活动名称；虚假分销订单行.渠道活动名称；营销活动.活动名称；分销套餐.活动名称
- `chl_actv_type_name`（varchar）：活动类型名称 → 分销订单行.渠道活动类型；虚假分销订单行.渠道活动类型；营销活动.活动类型；分销套餐.活动类型

## `v_chl_ac_nf_sku_mi`

AC月度市场指标、公司组织、大区

- `grcamm`（varchar）：数据提供月 → AC月度市场指标.数据提供月
- `distnm`（varchar）：大区 → 公司组织.组织名称；大区.组织名称；AC月度市场指标.统计大区名称
- `org_codes`（varchar）：组织编码 → AC月度市场指标.适用组织编码清单
- `org_names`（varchar）：组织名称 → AC月度市场指标.适用组织名称清单
- `dist_sort`（double）：大区排序
- `channm`（varchar）：渠道 → AC月度市场指标.外部统计渠道
- `chan_sort`（double）：渠道排序
- `sku`（varchar）：sku → AC月度市场指标.外部产品统计项目
- `sku_sort`（double）：sku排序
- `cmdt_type`（varchar）：商品类型 → AC月度市场指标.外部商品类型
- `szl`（double）：市占率 → AC月度市场指标.当月市占率
- `phl`（double）：铺货率 → AC月度市场指标.当月外部铺货率
- `szl_lm`（double）：市占率上月 → AC月度市场指标.上月市占率
- `phl_lm`（double）：铺货率上月 → AC月度市场指标.上月外部铺货率
- `szl_lym`（double）：市占率同期 → AC月度市场指标.同期市占率
- `phl_lym`（double）：铺货率同期 → AC月度市场指标.同期外部铺货率
- `max_szl`（double）：市占率最大值 → AC月度市场指标.供数市占率最大值
- `max_phl`（double）：铺货率最大值 → AC月度市场指标.供数铺货率最大值
- `date_flag`（varchar）：数据粒度农夫sku → AC月度市场指标.供数粒度标记

## `v_chl_jc_cust_mi`

业代、主任、公司组织、办事处、员工、大区、线路、经销商、门店、门店月度稽查结果

- `5sku_flag`（int）：5SKU标记 → 门店月度稽查结果.水5SKU铺货标记
- `audit_ass_line_cnt`（int）：考核品出现行数 → 门店月度稽查结果.考核品出现行数
- `audit_ass_shelf_life_age`（int）：考核品货龄 → 门店月度稽查结果.考核品货龄
- `bd_num_lose_cust_flag`（int）：冰道数量输标记 → 门店月度稽查结果.冰道数量输标记
- `bd_num_win_cust_flag`（int）：冰道数量赢标记 → 门店月度稽查结果.冰道数量赢标记
- `bd_watrea_num`（int）：冰道数量 → 门店月度稽查结果.冰道数量
- `bg_position_wrat_even_flag`（int）：冰柜位置平标记 → 门店月度稽查结果.冰柜位置平标记
- `bg_position_wrat_loser_flag`（int）：冰柜位置输标记 → 门店月度稽查结果.冰柜位置输标记
- `bg_position_wrat_win_flag`（int）：冰柜位置赢标记 → 门店月度稽查结果.冰柜位置赢标记
- `ca37_red_line_cnt`（int）：东方树叶低于红线价标记 → 门店月度稽查结果.东方树叶低于红线价标记
- `channel_name`（varchar）：子渠道 → 门店月度稽查结果.记录子渠道
- `check_cnt`（int）：门店普通柜纯净度检查台数+门店多门柜纯净度检查家数 → 门店月度稽查结果.组合纯净度检查数量
- `check_cust_flag`（int）：稽查检查标记 → 门店月度稽查结果.赢比检查标记
- `check_pass_cnt`（int）：门店普通柜纯净度合格台数+门店多门柜纯净度合格家数 → 门店月度稽查结果.组合纯净度合格数量
- `city_name`（varchar）：市 → 门店.城市
- `compete_2bottle_cnt`（int）：竞品大于2瓶数 → 门店月度稽查结果.竞品超过2瓶条件数量
- `compete_2h_cnt`（int）：陈列2H数 → 门店月度稽查结果.陈列2H数量
- `compete_cnt`（int）：竞品检查数 → 门店月度稽查结果.竞品检查数
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；门店月度稽查结果.被检查门店编码
- `cust_name`（varchar）：终端客户 → 门店.门店名称；门店月度稽查结果.记录门店名称
- `cust_status_name`（varchar）：终端客户状态 → 门店.门店状态；门店月度稽查结果.记录门店状态
- `dealer_jc_group_name`（varchar）：销售客户稽查分类 → 经销商.销售客户稽查分类；门店月度稽查结果.销售客户稽查分类
- `dealer_mkt_level`（varchar）：销售客户市场等级 → 经销商.客户市场级别；门店月度稽查结果.所属销售客户市场等级
- `dealer_name`（varchar）：销售客户 → 经销商.经销商名称；门店月度稽查结果.所属销售客户名称
- `dealer_range_code`（varchar）：销售客户编码 → 经销商.销售范围编码；门店月度稽查结果.所属销售客户编码
- `dealer_type_name`（varchar）：销售客户类型 → 经销商.销售客户类型
- `detail_addr`（varchar）：详细地址 → 门店.详细地址
- `dev_check_cnt`（int）：门店普通柜纯净度检查台数 → 门店月度稽查结果.普通柜纯净度检查台数
- `dev_check_pass_cnt`（int）：门店普通柜纯净度合格台数 → 门店月度稽查结果.普通柜纯净度合格台数
- `dev_cnt`（int）：我司普通柜实盘台数 → 门店月度稽查结果.普通柜实盘台数
- `dfr_num_lose_cust_flag`（int）：饮料冰冻数量输标记 → 门店月度稽查结果.饮料冰冻数量输标记
- `dfr_num_win_cust_flag`（int）：饮料冰冻数量赢标记 → 门店月度稽查结果.饮料冰冻数量赢标记
- `dis_name`（varchar）：大区 → 公司组织.组织名称；大区.组织名称；门店月度稽查结果.月度大区名称
- `door_check_flag`（int）：门口冰柜检查标记 → 门店月度稽查结果.门口冰柜检查标记
- `door_pos_nf_cust_flag`（int）：门口冰柜我司在标记 → 门店月度稽查结果.门口冰柜我司在标记
- `door_pos_win_cust_cnt`（int）：门口冰柜位置赢标记 → 门店月度稽查结果.门口冰柜位置赢标记
- `emp_code`（varchar）：业代编码 → 员工.员工编码；业代.员工编码；门店月度稽查结果.记录业代编码
- `emp_name`（varchar）：业代 → 员工.员工姓名；业代.员工姓名；门店月度稽查结果.记录业代姓名
- `fnf_ice_cust_flag`（int）：非我司冰柜客户标记 → 门店月度稽查结果.非我司冰柜客户标记
- `freq_desc`（varchar）：拜访频次 → 门店月度稽查结果.记录拜访频次
- `group_name`（varchar）：终端客户组别 → 门店.组别
- `hot_ice_isp_snum`（int）：暖柜盘盈台数 → 门店月度稽查结果.暖柜盘盈台数
- `hot_ice_layer`（int）：暖柜陈列冰冻层数 → 门店月度稽查结果.暖柜陈列冰冻层数
- `hot_ice_lls_snum`（int）：暖柜盘亏台数 → 门店月度稽查结果.暖柜盘亏台数
- `hot_ice_nom_snum`（int）：暖柜一致台数 → 门店月度稽查结果.暖柜一致台数
- `ice_check_flag`（int）：冰柜检查标记 → 门店月度稽查结果.我司冰柜实盘门店标记
- `ice_layer_two_flag`（int）：水冰冻大于2层标记 → 门店月度稽查结果.水冰冻层数阈值标记
- `ice_one_flag`（int）：水冰冻≥1层标记 → 门店月度稽查结果.水冰冻至少1层标记
- `ice_two_flag`（int）：水冰冻≥2层标记 → 门店月度稽查结果.水冰冻至少2层标记
- `if_multi_check`（int）：门店多门柜纯净度检查家数 → 门店月度稽查结果.多门柜纯净度检查家数
- `if_pass_multi_check`（int）：门店多门柜纯净度合格家数 → 门店月度稽查结果.多门柜纯净度合格家数
- `is_conshop_name`（varchar）：是否合约店 → 门店月度稽查结果.记录合约店身份
- `is_pay_name`（varchar）：是否付费门店 → 门店月度稽查结果.记录付费门店身份
- `market_level_name`（varchar）：终端客户市场级别 → 门店.市场级别；门店月度稽查结果.记录门店市场级别
- `multi_check_flag`（int）：多门柜检查标记 → 门店月度稽查结果.多门柜检查标记
- `multi_check_pass_flag`（int）：多门柜纯净度合格标记 → 门店月度稽查结果.多门柜纯净度合格标记
- `nf_all_lose_flag`（int）：全部包装输标记 → 门店月度稽查结果.全部包装输标记
- `nf_all_win_flag`（int）：全部包装赢标记 → 门店月度稽查结果.全部包装赢标记
- `nf_dbz_box`（int）：我司大包装箱数 → 门店月度稽查结果.我司大包装箱数
- `nf_dbz_lose_flag`（int）：我司大包装输标记 → 门店月度稽查结果.我司大包装输标记
- `nf_dbz_win_flag`（int）：我司大包装赢标记 → 门店月度稽查结果.我司大包装赢标记
- `nf_ice_isp_snum`（int）：我司冰柜盘盈台数 → 门店月度稽查结果.我司冰柜盘盈台数
- `nf_ice_lls_snum`（int）：我司冰柜盘亏台数 → 门店月度稽查结果.我司冰柜盘亏台数
- `nf_ice_nom_snum`（int）：我司冰柜正常台数 → 门店月度稽查结果.我司冰柜正常台数
- `nf_zs_box`（int）：我司中水装箱数 → 门店月度稽查结果.我司中水装箱数
- `nf_zs_lose_flag`（int）：我司中水输标记 → 门店月度稽查结果.我司中水装输标记
- `nf_zs_win_flag`（int）：我司中水赢标记 → 门店月度稽查结果.我司中水装赢标记
- `no_dstb_cust_flag`（int）：无铺货标记 → 门店月度稽查结果.无铺货标记
- `not_only_compete_2bottle_cnt`（int）：非唯一冰柜竞品大于2瓶数 → 门店月度稽查结果.非唯一冰柜竞品超过2瓶条件数量
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；门店月度稽查结果.月度办事处编码
- `off_name`（varchar）：办事处 → 公司组织.组织名称；办事处.组织名称；门店月度稽查结果.月度办事处名称
- `other_dbz_box`（int）：竞品大包装箱数 → 门店月度稽查结果.竞品大包装箱数
- `other_zs_box`（int）：竞品中水装箱数 → 门店月度稽查结果.竞品中水装箱数
- `over_cage_cust_flag`（int）：考核品超货龄标记 → 门店月度稽查结果.考核品超货龄标记
- `overdue_hflag`（int）：过期品稽查标记 → 门店月度稽查结果.过期品稽查标记
- `p2_channel_name`（varchar）：渠道群 → 门店月度稽查结果.记录渠道群
- `p_channel_name`（varchar）：生动化渠道 → 门店月度稽查结果.记录生动化渠道
- `p_emp_code`（varchar）：主任编码 → 员工.员工编码；业代.对应主任编码；主任.员工编码；门店月度稽查结果.记录主任编码
- `p_emp_name`（varchar）：主任 → 员工.员工姓名；业代.对应主任姓名；主任.员工姓名；门店月度稽查结果.记录主任姓名
- `p_emp_std_pos_name`（varchar）：主任基准岗 → 员工.基准岗名称；主任.基准岗名称
- `p_tx_name`（varchar）：父条系 → 门店.上级条系
- `pass_dev_cnt`（int）：我司普通柜合格台数 → 门店月度稽查结果.普通柜合格台数
- `pay_dsp_ins_elgb_pnum`（int）：付费陈列检查合格项目数 → 门店月度稽查结果.付费陈列检查合格项目数
- `pay_dsp_ins_unelgb_pnum`（int）：付费陈列检查不合格项目数 → 门店月度稽查结果.付费陈列检查不合格项目数
- `province_name`（varchar）：省 → 门店.省份
- `reg_name`（varchar）：区域 → 公司组织.组织名称；门店月度稽查结果.月度区域名称
- `route_code`（varchar）：线路号 → 线路.线路编码；门店月度稽查结果.记录线路编码
- `sap_code`（varchar）：销售客户SAP编码 → 经销商.SAP客户编码；门店月度稽查结果.所属销售客户SAP编码
- `sd_number_wrat_even_flag`（int）：水堆数量平标记 → 门店月度稽查结果.水堆数量平标记
- `sd_number_wrat_loser_flag`（int）：水堆数量输标记 → 门店月度稽查结果.水堆数量输标记
- `sd_number_wrat_win_flag`（int）：水堆数量赢标记 → 门店月度稽查结果.水堆数量赢标记
- `sd_position_wrat_even_flag`（int）：水堆位置平标记 → 门店月度稽查结果.水堆位置平标记
- `sd_position_wrat_loser_flag`（int）：水堆位置输标记 → 门店月度稽查结果.水堆位置输标记
- `sd_position_wrat_win_flag`（int）：水堆位置赢标记 → 门店月度稽查结果.水堆位置赢标记
- `ser_dealer_mkt_level`（varchar）：服务销售客户市场等级 → 经销商.客户市场级别；门店月度稽查结果.服务销售客户市场等级
- `serv_dealer_name`（varchar）：服务销售客户 → 经销商.经销商名称；门店月度稽查结果.服务销售客户名称
- `serv_dealer_range_code`（varchar）：服务销售客户编码 → 经销商.销售范围编码；门店月度稽查结果.服务销售客户编码
- `serv_dealer_type_name`（varchar）：服务销售客户类型 → 经销商.销售客户类型
- `serv_sap_code`（varchar）：服务销售客户SAP编码 → 经销商.SAP客户编码；门店月度稽查结果.服务销售客户SAP编码
- `sku_check_cnt`（int）：铺货SKU数量 → 门店月度稽查结果.铺货SKU数量
- `sku_check_flag`（int）：铺货检查标记 → 门店月度稽查结果.铺货检查标记
- `sku_cnt`（int）：sku数量 → 门店月度稽查结果.记录SKU数量
- `slv_num_lose_cust_flag`（int）：货架数量输标记 → 门店月度稽查结果.货架数量输标记
- `slv_num_win_cust_flag`（int）：货架数量赢标记 → 门店月度稽查结果.货架数量赢标记
- `slv_pos_lose_cust_flag`（int）：货架位置输标记 → 门店月度稽查结果.货架位置输标记
- `slv_pos_win_cust_flag`（int）：货架位置赢标记 → 门店月度稽查结果.货架位置赢标记
- `slv_wrat_nf_flag`（int）：货架赢比检查项目我司标记 → 门店月度稽查结果.货架我司有标记
- `slv_wrat_ot_flag`（int）：货架赢比检查项目竞品标记 → 门店月度稽查结果.货架竞品有标记
- `std_pos_name`（varchar）：业代基准岗 → 员工.基准岗名称；业代.基准岗名称
- `street_name`（varchar）：街道 → 门店.乡镇街道
- `town_name`（varchar）：乡镇 → 门店.乡镇
- `tx_name`（varchar）：条系 → 门店.条系
- `visit_week_names`（varchar）：拜访日期名称 → 门店月度稽查结果.记录拜访日期名称
- `visit_weeks`（varchar）：拜访日期 → 门店月度稽查结果.记录拜访日期编码
- `water_550_red_line_cnt`（int）：550水低于红线价标记 → 门店月度稽查结果.550水低于红线价标记
- `water_ka550_red_line_cnt`（int）：550KA量贩水低于红线价标记 → 门店月度稽查结果.550KA量贩水低于红线价标记
- `watrea_wrat_nf_flag`（int）：水堆赢比检查项目我司标记 → 门店月度稽查结果.水堆我司有标记
- `watrea_wrat_ot_flag`（int）：水堆赢比检查项目竞品标记 → 门店月度稽查结果.水堆竞品有标记
- `wfr_num_lose_cust_flag`（int）：水冰冻数量输标记 → 门店月度稽查结果.水冰冻数量输标记
- `wfr_num_win_cust_flag`（int）：水冰冻数量赢标记 → 门店月度稽查结果.水冰冻数量赢标记
- `sales_mg_name`（varchar）：销售总监 → 员工.员工姓名；门店月度稽查结果.记录销售总监姓名
- `now_off_name`（varchar）：当前办事处 → 公司组织.组织名称；办事处.组织名称；门店月度稽查结果.当前办事处名称
- `now_dis_name`（varchar）：当前大区 → 公司组织.组织名称；大区.组织名称；门店月度稽查结果.当前大区名称
- `now_reg_name`（varchar）：当前区域 → 公司组织.组织名称；门店月度稽查结果.当前区域名称
- `ym`（varchar）：年月 → 门店月度稽查结果.稽查月份
- `cust_agreement_status`（varchar）：门店协议状态 → 门店月度稽查结果.记录门店协议状态
- `slv_num_cust_flag`（int）：货架数量检查标记 → 门店月度稽查结果.货架数量检查标记
- `bd_num_cust_flag`（int）：冰道数量检查标记 → 门店月度稽查结果.冰道数量检查标记
- `red_bottle_dev_cust_flag`（int）：天然水550mL冰冻≥1层标记 → 门店月度稽查结果.天然水550mL冰冻至少1层标记
- `market_level`（varchar）：行政区划类别 → 门店.行政区划类别；门店月度稽查结果.记录行政区划类别
- `p_place_name_map`（varchar）：地图场所 → 门店.地图场所
- `specific_place_name_map`（varchar）：地图具体场所 → 门店.地图具体场所
- `p_place_name`（varchar）：上级场所 → 门店.上级场所
- `place_name`（varchar）：场所 → 门店.场所
- `sub_cust_status_name`（varchar）：客户经营范围状态 → 门店月度稽查结果.记录经营范围状态

## `v_chl_route_plan_cust_cnt_1d_df`

业代、主任、公司组织、办事处、员工、线路、经销商、计划门店拜访、门店

- `route_code`（varchar）：线路编码 → 线路.线路编码；计划门店拜访.计划线路编码
- `visit_date`（date）：拜访日期 → 计划门店拜访.计划拜访日期
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；计划门店拜访.计划门店编码
- `pos_code`（varchar）：业代职位编码 → 员工.岗位编码；业代.岗位编码；计划门店拜访.计划业代职位编码
- `pos_name`（varchar）：业代职位 → 员工.岗位名称；业代.岗位名称；计划门店拜访.计划业代职位
- `emp_code`（varchar）：业代编码 → 员工.员工编码；业代.员工编码；计划门店拜访.计划业代编码
- `emp_name`（varchar）：业代 → 员工.员工姓名；业代.员工姓名；计划门店拜访.计划业代姓名
- `p_emp_code`（varchar）：主任编码 → 员工.员工编码；业代.对应主任编码；主任.员工编码；计划门店拜访.计划主任编码
- `p_emp_name`（varchar）：主任 → 员工.员工姓名；业代.对应主任姓名；主任.员工姓名；计划门店拜访.计划主任姓名
- `dealer_range_code`（varchar）：所属销售客户编码 → 经销商.销售范围编码；计划门店拜访.计划所属销售客户编码
- `cust_name`（varchar）：终端客户 → 门店.门店名称；计划门店拜访.计划门店名称
- `org_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；计划门店拜访.计划办事处编码
- `route_type`（varchar）：线路类型 → 线路.线路类型编码；计划门店拜访.计划线路类型编码

## `v_chl_visit_dtl`

业代、主任、公司组织、办事处、员工、大区、线路、经销商、门店、门店拜访

- `reg_code`（varchar）：当时区域编码 → 公司组织.组织编码；门店拜访.当时区域编码
- `reg_name`（varchar）：当时区域 → 公司组织.组织名称；门店拜访.当时区域名称
- `dis_code`（varchar）：当时大区编码 → 公司组织.组织编码；大区.组织编码；门店拜访.当时大区编码
- `dis_name`（varchar）：当时大区 → 公司组织.组织名称；大区.组织名称；门店拜访.当时大区名称
- `off_code`（varchar）：当时办事处编码 → 公司组织.组织编码；办事处.组织编码；门店拜访.当时办事处编码
- `off_name`（varchar）：当时办事处 → 公司组织.组织名称；办事处.组织名称；门店拜访.当时办事处名称
- `dealer_range_code`（varchar）：所属销售客户编码 → 经销商.销售范围编码；门店拜访.所属销售客户编码
- `dealer_sap_code`（varchar）：所属销售客户SAP编码 → 经销商.SAP客户编码；门店拜访.所属销售客户SAP编码
- `dealer_name`（varchar）：所属销售客户 → 经销商.经销商名称；门店拜访.所属销售客户名称
- `dealer_type`（varchar）：所属销售客户类型编码 → 经销商.销售客户类型编码；门店拜访.所属销售客户类型编码
- `dealer_type_name`（varchar）：所属销售客户类型 → 经销商.销售客户类型；门店拜访.所属销售客户类型
- `serv_dealer_range_code`（varchar）：服务销售客户编码 → 经销商.销售范围编码；门店拜访.服务销售客户编码
- `serv_dealer_sap_code`（varchar）：服务销售客户SAP编码 → 经销商.SAP客户编码；门店拜访.服务销售客户SAP编码
- `serv_dealer_name`（varchar）：服务销售客户 → 经销商.经销商名称；门店拜访.服务销售客户名称
- `serv_dealer_type`（varchar）：服务销售客户类型编码 → 经销商.销售客户类型编码；门店拜访.服务销售客户类型编码
- `serv_dealer_type_name`（varchar）：服务销售客户类型 → 经销商.销售客户类型；门店拜访.服务销售客户类型
- `emp_code`（varchar）：人员编码 → 员工.员工编码；业代.员工编码；主任.员工编码；门店拜访.拜访人员编码
- `emp_name`（varchar）：人员 → 员工.员工姓名；业代.员工姓名；主任.员工姓名；门店拜访.拜访人员姓名
- `emp_std_pos_code`（varchar）：人员基准岗编码 → 员工.基准岗编码；业代.基准岗编码；主任.基准岗编码；门店拜访.拜访人员基准岗编码
- `emp_std_pos_name`（varchar）：人员基准岗 → 员工.基准岗名称；业代.基准岗名称；主任.基准岗名称；门店拜访.拜访人员基准岗
- `p_emp_code`（varchar）：上级人员编码 → 员工.员工编码；主任.员工编码；门店拜访.上级人员编码
- `p_emp_name`（varchar）：上级人员 → 员工.员工姓名；主任.员工姓名；门店拜访.上级人员姓名
- `p_std_pos_code`（varchar）：上级基准岗编码 → 员工.基准岗编码；主任.基准岗编码；门店拜访.上级基准岗编码
- `p_std_pos_name`（varchar）：上级基准岗 → 员工.基准岗名称；主任.基准岗名称；门店拜访.上级基准岗
- `route_code`（varchar）：线路编码 → 线路.线路编码；门店拜访.拜访线路编码
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；门店拜访.被拜访门店编码
- `cust_name`（varchar）：终端客户 → 门店.门店名称；门店拜访.被拜访门店名称
- `cust_status`（varchar）：终端客户状态编码 → 门店.门店状态编码；门店拜访.记录门店状态编码
- `cust_status_name`（varchar）：终端客户状态 → 门店.门店状态；门店拜访.记录门店状态
- `cust_level`（varchar）：终端客户等级编码 → 门店.门店等级编码；门店拜访.记录门店等级编码
- `cust_level_name`（varchar）：终端客户等级 → 门店.门店等级；门店拜访.记录门店等级
- `chl_code`（varchar）：子渠道编码 → 门店拜访.记录子渠道编码
- `chl_name`（varchar）：子渠道 → 门店拜访.记录子渠道
- `vivid_chl_code`（varchar）：生动化渠道编码 → 门店拜访.记录生动化渠道编码
- `vivid_chl_name`（varchar）：生动化渠道 → 门店拜访.记录生动化渠道
- `chl_group_code`（varchar）：渠道群编码 → 门店拜访.记录渠道群编码
- `chl_group_name`（varchar）：渠道群 → 门店拜访.记录渠道群
- `province_id`（varchar）：省编码 → 门店.省份编码；门店拜访.记录省编码
- `province_name`（varchar）：省 → 门店.省份；门店拜访.记录省名称
- `city_id`（varchar）：城市编码 → 门店.城市编码；门店拜访.记录城市编码
- `city_name`（varchar）：市 → 门店.城市；门店拜访.记录城市名称
- `town_id`（varchar）：区县编码 → 门店.区县编码；门店拜访.记录区县编码
- `town_name`（varchar）：区县 → 门店.区县；门店拜访.记录区县名称
- `street_id`（varchar）：街道编码 → 门店.街道编码；门店拜访.记录街道编码
- `street_name`（varchar）：乡镇街道 → 门店.乡镇街道；门店拜访.记录乡镇街道
- `is_dvs`（varchar）：是否设备门店编码 → 门店拜访.记录设备门店标记
- `is_ydt`（varchar）：是否一店通编码 → 门店.一店通标记编码；门店拜访.记录一店通标记
- `is_hyd`（varchar）：是否合约店编码 → 门店拜访.记录合约店标记
- `visit_freq`（varchar）：拜访频次 → 门店拜访.记录拜访频次
- `inline_flag`（varchar）：线内外标记编码 → 门店拜访.线内外标记
- `visit_date`（datetime）：拜访日期 → 门店拜访.拜访日期
- `route_type_name`（varchar）：线路类型 → 线路.线路类型名称；门店拜访.拜访线路类型
- `address`（varchar）：详细地址 → 门店.详细地址；门店拜访.记录详细地址
- `assisted_emp_code`（varchar）：被协访人员编码 → 员工.员工编码；业代.员工编码；主任.员工编码；门店拜访.被协访人员编码
- `assisted_emp_name`（varchar）：被协访人员 → 员工.员工姓名；业代.员工姓名；主任.员工姓名；门店拜访.被协访人员姓名
- `start_time`（datetime）：开始时间 → 门店拜访.拜访开始时间；门店拜访.拜访持续时长（秒）
- `end_time`（datetime）：结束时间 → 门店拜访.拜访结束时间；门店拜访.拜访持续时长（秒）
- `last_visit_end_time`（datetime）：上次拜访结束时间 → 门店拜访.上次拜访结束时间
- `jdqm_photo_time`（datetime）：进店全貌拍摄时间 → 门店拜访.进店全貌拍摄时间
- `visit_type`（varchar）：拜访类型编码 → 门店拜访.拜访类型编码
- `visit_type_name`（varchar）：拜访类型 → 门店拜访.拜访类型
- `if_dist_sku`（varchar）：是否完成SKU铺货检查编码 → 门店拜访.SKU铺货检查完成标记
- `if_display`（varchar）：是否完成陈列检查编码 → 门店拜访.陈列检查完成标记
- `if_assist_elgb`（varchar）：是否合格检查编码 → 门店拜访.检查合格标记
- `if_visit_sucess`（varchar）：是否成功拜访编码 → 门店拜访.成功拜访标记
- `week_day`（varchar）：星期 → 门店拜访.拜访星期
- `start_lon`（varchar）：开始经度 → 门店拜访.开始经度
- `start_lat`（varchar）：开始纬度 → 门店拜访.开始纬度
- `end_lon`（varchar）：结束时经度 → 门店拜访.结束经度
- `end_lat`（varchar）：结束时纬度 → 门店拜访.结束纬度
- `status`（varchar）：拜访状态 → 门店拜访.拜访状态
- `if_last_visit`（varchar）：是否当日最后一次拜访1 → 门店拜访.当日最后一次拜访标记
- `assisted_jdqm_photo_time`（datetime）：被协访进店全貌拍摄时间 → 门店拜访.被协访进店全貌拍摄时间
- `assisted_pos_code`（varchar）：被协防岗位编码 → 员工.岗位编码；业代.岗位编码；主任.岗位编码；门店拜访.被协访岗位编码
- `assisted_pos_name`（varchar）：被协访职位 → 员工.岗位名称；业代.岗位名称；主任.岗位名称；门店拜访.被协访职位
- `completely_inspect_status`（varchar）：是否完成完全陈列检查编码 → 门店拜访.完全陈列检查完成标记
- `completed_inspect_num`（varchar）：完成检查数 → 门店拜访.完成检查数
- `all_inspect_num`（varchar）：总检查数 → 门店拜访.总检查数
- `pic_lon`（varchar）：进店全貌拍摄经度 → 门店拜访.进店全貌拍摄经度
- `pic_lat`（varchar）：进店全貌拍摄纬度 → 门店拜访.进店全貌拍摄纬度
- `actual_lon`（varchar）：实际经度 → 门店拜访.记录实际经度
- `actual_lat`（varchar）：实际纬度 → 门店拜访.记录实际纬度
- `distance`（double）：定位间距离 → 门店拜访.定位间距离
- `in_std_distance`（varchar）：是否在标准距离内 → 门店拜访.标准距离内标记
- `target_flag`（varchar）：是否计划拜访 → 门店拜访.计划拜访标记
- `mkt_level_name`（varchar）：市场层级 → 门店.市场级别；门店拜访.记录市场层级
- `end_dist`（double）：定位间距离-离店 → 门店拜访.离店定位间距离
- `in_end_std_distance`（varchar）：是否在标准距离内-离店 → 门店拜访.离店标准距离内标记
- `dur_dist`（double）：路途距离 → 门店拜访.路途距离
- `duration`（double）：理论最短在途时长 → 门店拜访.理论最短在途时长
- `device_cnt`（int）：冰柜台数 → 门店拜访.记录冰柜台数
- `device_door_cnt`（int）：冰柜门数 → 门店拜访.记录冰柜门数
- `start_location_desc_bd`（varchar）：拜访定位状态 → 门店拜访.拜访定位状态
- `end_location_desc_bd`（varchar）：离店定位状态 → 门店拜访.离店定位状态
- `cur_status_name`（varchar）：人员在职状态 → 员工.拜访资料在职状态；业代.拜访资料在职状态；主任.拜访资料在职状态
- `cur_start_date`（varchar）：入职时间 → 员工.入职时间；业代.入职时间；主任.入职时间
- `cur_reg_name`（varchar）：区域 → 公司组织.组织名称；门店拜访.另附区域名称
- `cur_dis_name`（varchar）：大区 → 公司组织.组织名称；大区.组织名称；门店拜访.另附大区名称
- `cur_off_name`（varchar）：办事处 → 公司组织.组织名称；办事处.组织名称；门店拜访.另附办事处名称
- `cur_off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；门店拜访.另附办事处编码
- `cur_mkt_level`（varchar）：当前市场层级 → 门店拜访.附带当前市场层级
- `cur_device_cnt`（bigint）：当前冰柜台数 → 门店拜访.附带当前冰柜台数
- `cur_device_door_cnt`（int）：当前冰柜门数 → 门店拜访.附带当前冰柜门数
- `day_cnt`（double）：请假天数 → 员工.拜访资料请假天数；业代.拜访资料请假天数；主任.拜访资料请假天数

## `v_dim_chl_dealer`

主任、事业线、公司组织、办事处、员工、大区、经销商

- `dealer_range_code`（varchar）：销售客户范围编码 → 经销商.销售范围编码
- `dealer_code`（varchar）：销售客户C编码 → 经销商.客户C编码
- `dealer_name`（varchar）：销售客户名称 → 经销商.经销商名称
- `sap_code`（varchar）：sap编码 → 经销商.SAP客户编码
- `dealer_type_code`（varchar）：销售客户类型编码 → 经销商.销售客户类型编码
- `dealer_type_name`（varchar）：销售客户类型名称 → 经销商.销售客户类型
- `dealer_sale_range_code`（varchar）：销售客户销售范围编码 → 经销商.主数据销售范围编码
- `dealer_sale_range_name`（varchar）：销售客户销售范围名称 → 经销商.主数据销售范围名称
- `dealer_status`（varchar）：销售客户状态 → 经销商.客户状态编码
- `dealer_status_name`（varchar）：销售客户状态名称 → 经销商.客户状态
- `comp_type`（varchar）：公司类型 → 经销商.公司类型
- `credit_level`（varchar）：信用等级编码 → 经销商.信用等级编码
- `is_top`（varchar）：是否TOP客户 → 经销商.TOP客户标记
- `bns_level`（varchar）：事业部客户等级 → 经销商.事业部客户等级编码
- `bns_level_name`（varchar）：事业部客户等级名称 → 经销商.事业部客户等级
- `credit_type`（varchar）：授信类型 → 经销商.授信类型编码
- `credit_type_name`（varchar）：授信类型名称 → 经销商.授信类型
- `bns_code`（varchar）：事业部编码 → 经销商.当前事业部编码；事业线.事业线编码
- `org_code`（varchar）：办事处编码 → 经销商.当前办事处编码；公司组织.组织编码；办事处.组织编码
- `org_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称
- `dis_code`（varchar）：大区编码 → 经销商.当前大区编码；公司组织.组织编码；大区.组织编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称
- `org_code_path`（varchar）：行政组织编码路径 → 经销商.行政组织编码路径
- `p_emp_code`（varchar）：主任编码 → 经销商.当前负责主任编码；员工.员工编码；主任.员工编码
- `p_emp_name`（varchar）：主任名称 → 员工.员工姓名；主任.员工姓名
- `mkt_level`（varchar）：销售客户市场级别 → 经销商.客户市场级别
- `town_code`（varchar）：乡镇编码 → 经销商.乡镇编码
- `town_name`（varchar）：乡镇名称 → 经销商.乡镇名称
- `city_code`（varchar）：城市编码 → 经销商.城市编码
- `city_name`（varchar）：城市名称 → 经销商.城市名称
- `prov_code`（varchar）：省份编码 → 经销商.省份编码
- `prov_name`（varchar）：省份名称 → 经销商.省份名称
- `cooperation_mode`（varchar）：合作模式代码 → 经销商.合作模式代码
- `cooperation_mode_name`（varchar）：合作模式名称 → 经销商.合作模式
- `p_dealer_range_code`（varchar）：上级经销商编码 → 经销商.销售范围编码；经销商.当前上级经销商编码

## `v_dim_chl_sub_cust_df`

业代、主任、事业线、公司组织、办事处、员工、大区、子门店、线路、经销商、门店

- `cust_range_code`（varchar）：终端客户范围编码 → 子门店.子门店编码
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；子门店.对应门店编码
- `cust_name`（varchar）：终端客户 → 门店.门店名称；子门店.记录所附门店名称
- `channel_code`（varchar）：子渠道编码 → 子门店.子渠道编码
- `channel_name`（varchar）：子渠道 → 子门店.子渠道
- `p_channel_code`（varchar）：生动化渠道编码 → 子门店.生动化渠道编码
- `p_channel_name`（varchar）：生动化渠道 → 子门店.生动化渠道
- `p2_channel_code`（varchar）：渠道群编码 → 子门店.渠道群编码
- `p2_channel_name`（varchar）：渠道群 → 子门店.渠道群
- `tx_code`（varchar）：条系编码 → 门店.条系编码
- `tx_name`（varchar）：条系 → 门店.条系
- `p_tx_code`（varchar）：父条系编码 → 门店.上级条系编码
- `p_tx_name`（varchar）：父条系 → 门店.上级条系
- `group_code`（varchar）：组别编码 → 门店.组别编码
- `group_name`（varchar）：组别 → 门店.组别
- `place_code`（varchar）：场所编码 → 门店.场所编码
- `place_name`（varchar）：场所 → 门店.场所
- `p_place_code`（varchar）：父场所编码 → 门店.上级场所编码
- `p_place_name`（varchar）：父场所 → 门店.上级场所
- `market_level`（varchar）：市场层级编码 → 门店.市场层级编码；子门店.当前维表市场层级编码
- `country_name`（varchar）：国家 → 门店.国家
- `province_name`（varchar）：省份 → 门店.省份
- `city_name`（varchar）：城市 → 门店.城市
- `town_name`（varchar）：乡镇 → 门店.乡镇
- `street_name`（varchar）：街道 → 门店.乡镇街道
- `village`（varchar）：村 → 门店.村
- `village_population_scope`（varchar）：村人口范围 → 门店.村人口区间
- `bns_code`（varchar）：事业部编码 → 子门店.所属事业部编码；事业线.事业线编码
- `off_code`（varchar）：办事处编码 → 子门店.归属办事处编码；公司组织.组织编码；办事处.组织编码
- `off_name`（varchar）：办事处 → 子门店.归属办事处名称；公司组织.组织名称；办事处.组织名称
- `dis_code`（varchar）：大区编码 → 子门店.归属大区编码；公司组织.组织编码；大区.组织编码
- `dis_name`（varchar）：大区 → 子门店.归属大区名称；公司组织.组织名称；大区.组织名称
- `reg_code`（varchar）：区域编码 → 子门店.归属区域编码；公司组织.组织编码
- `reg_name`（varchar）：区域 → 子门店.归属区域名称；公司组织.组织名称
- `cust_status`（varchar）：终端客户状态编码 → 门店.门店状态编码；子门店.对应门店状态编码
- `cust_status_name`（varchar）：终端客户状态 → 门店.门店状态；子门店.对应门店状态
- `level_name`（varchar）：终端客户等级 → 门店.门店等级；子门店.记录所附门店等级
- `cooperate_start_date`（datetime）：开始合作时间 → 子门店.记录所附开始合作日期
- `cooperate_end_date`（datetime）：结束合作时间 → 子门店.记录所附结束合作日期
- `dealer_range_code`（varchar）：所属销售客户编码 → 子门店.所属销售客户范围编码；经销商.销售范围编码
- `dealer_code`（varchar）：所属销售客户C编码 → 子门店.所属销售客户C编码；经销商.客户C编码
- `dealer_name`（varchar）：所属销售客户 → 子门店.所属销售客户名称；经销商.经销商名称
- `serv_dealer_range_code`（varchar）：服务销售客户编码 → 子门店.服务销售客户范围编码；经销商.销售范围编码
- `serv_dealer_code`（varchar）：服务销售客户C编码 → 子门店.服务销售客户C编码；经销商.客户C编码
- `serv_dealer_name`（varchar）：服务销售客户 → 子门店.服务销售客户名称；经销商.经销商名称
- `dlv_dealer_range_code`（varchar）：配送销售客户编码 → 子门店.配送销售客户范围编码；经销商.销售范围编码
- `dlv_dealer_code`（varchar）：配送销售客户C编码 → 子门店.配送销售客户C编码；经销商.客户C编码
- `dlv_dealer_name`（varchar）：配送销售客户 → 子门店.配送销售客户名称；经销商.经销商名称
- `ydt_open_id`（varchar）：一店通终端客户openid → 门店.一店通openid
- `route_code`（varchar）：线路编码 → 子门店.业代服务线路编码；线路.线路编码
- `pos_code`（varchar）：业代职位编码 → 员工.岗位编码；业代.岗位编码
- `pos_name`（varchar）：业代职位 → 员工.岗位名称；业代.岗位名称
- `std_pos_code`（varchar）：业代基准岗编码 → 员工.基准岗编码；业代.基准岗编码
- `std_pos_name`（varchar）：业代基准岗 → 员工.基准岗名称；业代.基准岗名称
- `emp_code`（varchar）：业代编码 → 子门店.负责业代编码；员工.员工编码；业代.员工编码
- `emp_name`（varchar）：业代 → 子门店.负责业代姓名；员工.员工姓名；业代.员工姓名
- `p_emp_code`（varchar）：主任编码 → 子门店.负责主任编码；员工.员工编码；业代.对应主任编码；主任.员工编码
- `p_emp_name`（varchar）：主任 → 子门店.负责主任姓名；员工.员工姓名；业代.对应主任姓名；主任.员工姓名
- `mkt_level_name`（varchar）：市场层级 → 门店.市场级别；子门店.记录所附市场层级
- `visit_weeks`（varchar）：拜访日期编码 → 子门店.业代拜访日期编码
- `visit_week_names`（varchar）：拜访日期 → 子门店.业代拜访日期名称
- `freq_desc`（varchar）：拜访频次 → 子门店.业代拜访频次
- `is_ydt`（varchar）：是否一店通：1 是，0 否 → 门店.一店通标记编码；子门店.一店通标记
- `p_emp_std_pos_code`（varchar）：主任基准岗编码 → 员工.基准岗编码；主任.基准岗编码
- `p_emp_std_pos_name`（varchar）：主任基准岗 → 员工.基准岗名称；主任.基准岗名称
- `lhy_route_code`（varchar）：理货员线路编码 → 子门店.理货服务线路编码；线路.线路编码
- `lhy_std_pos_code`（varchar）：理货员基准岗编码 → 员工.基准岗编码
- `lhy_std_pos_name`（varchar）：理货员基准岗 → 员工.基准岗名称
- `lhy_emp_code`（varchar）：理货员编码 → 子门店.负责理货员编码；员工.员工编码
- `lhy_emp_name`（varchar）：理货员 → 子门店.负责理货员姓名；员工.员工姓名
- `lhy_visit_weeks`（varchar）：理货员拜访日期编码 → 子门店.理货拜访日期编码
- `lhy_visit_week_names`（varchar）：理货员拜访日期 → 子门店.理货拜访日期名称
- `lhy_freq_desc`（varchar）：理货员拜访频次 → 子门店.理货拜访频次
- `cust_sale_range_name`（varchar）：销售客户类型归属 → 子门店.销售客户类型归属
- `sub_cust_status`（varchar）：子门店状态编码 → 子门店.子门店状态编码
- `sub_cust_status_name`（varchar）：子门店状态 → 子门店.子门店状态
- `business_area`（int）：门店面积 → 门店.门店面积
- `no_coop_reason`（varchar）：不合作原因编码 → 子门店.不合作原因编码
- `no_coop_reason_dtl`（varchar）：不合作原因 → 子门店.不合作原因
- `specific_place_code`（varchar）：具体场所编码 → 门店.具体场所编码
- `specific_place`（varchar）：具体场所 → 门店.具体场所
- `specific_place_code_map`（varchar）：地图具体场所编码 → 门店.地图具体场所编码
- `specific_place_name_map`（varchar）：地图具体场所 → 门店.地图具体场所
- `p_place_code_map`（varchar）：地图场所编码 → 门店.地图场所编码
- `p_place_name_map`（varchar）：地图场所 → 门店.地图场所
- `customer_store_type`（varchar）：门店类型编码 → 门店.门店类型编码
- `customer_store_type_name`（varchar）：门店类型 → 门店.门店类型

## `v_dim_chl_sub_cust_indct_mi`

业代、主任、公司组织、办事处、员工、大区、子门店、月度分销目标、经销商、门店

- `ym`（varchar）：年月 → 门店.月度服务范围标记；子门店.指标所属月；月度分销目标.目标月份；月度分销目标.目标分销财年；月度分销目标.截止日折算目标金额；月度分销目标.截止日折算水目标金额
- `cust_range_code`（varchar）：终端客户范围编码 → 子门店.子门店编码；月度分销目标.目标子门店编码
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；子门店.对应门店编码；月度分销目标.进货目标门店编码
- `cust_name`（varchar）：终端客户 → 门店.门店名称；子门店.记录所附门店名称；月度分销目标.进货目标门店名称
- `emp_name`（varchar）：业代 → 子门店.负责业代姓名；员工.员工姓名；业代.员工姓名；月度分销目标.门店目标负责业代名称
- `emp_code`（varchar）：业代编码 → 子门店.负责业代编码；员工.员工编码；业代.员工编码；月度分销目标.门店目标负责业代编码
- `p_emp_code`（varchar）：主任编码 → 子门店.负责主任编码；员工.员工编码；业代.对应主任编码；主任.员工编码；月度分销目标.目标所属主任编码
- `p_emp_name`（varchar）：主任 → 子门店.负责主任姓名；员工.员工姓名；业代.对应主任姓名；主任.员工姓名；月度分销目标.目标所属主任名称
- `channel_name`（varchar）：子渠道 → 子门店.子渠道
- `p_channel_name`（varchar）：生动化渠道 → 子门店.生动化渠道
- `p2_channel_name`（varchar）：渠道群 → 子门店.渠道群
- `tx_name`（varchar）：条系 → 门店.条系
- `p_tx_name`（varchar）：父条系 → 门店.上级条系
- `group_name`（varchar）：组别 → 门店.组别
- `place_name`（varchar）：场所 → 门店.场所
- `p_place_name`（varchar）：父场所 → 门店.上级场所
- `market_level`（varchar）：行政区划类别 → 门店.行政区划类别；子门店.记录所附行政区划类别
- `off_code`（varchar）：办事处编码 → 子门店.归属办事处编码；公司组织.组织编码；办事处.组织编码；月度分销目标.目标归属办事处编码
- `off_name`（varchar）：办事处 → 子门店.归属办事处名称；公司组织.组织名称；办事处.组织名称；月度分销目标.目标归属办事处名称
- `dis_code`（varchar）：大区编码 → 子门店.归属大区编码；公司组织.组织编码；大区.组织编码；月度分销目标.目标归属大区编码
- `dis_name`（varchar）：大区 → 子门店.归属大区名称；公司组织.组织名称；大区.组织名称；月度分销目标.目标归属大区名称
- `reg_name`（varchar）：区域 → 子门店.归属区域名称；公司组织.组织名称；月度分销目标.目标归属区域名称
- `cust_status_name`（varchar）：终端客户状态 → 门店.门店状态；门店.月度服务范围标记；子门店.对应门店状态
- `level_name`（varchar）：终端客户等级 → 门店.门店等级；子门店.记录所附门店等级
- `dealer_range_code`（varchar）：所属销售客户编码 → 子门店.所属销售客户范围编码；经销商.销售范围编码；月度分销目标.门店目标所属客户编码
- `dealer_name`（varchar）：所属销售客户 → 子门店.所属销售客户名称；经销商.经销商名称；月度分销目标.门店目标所属客户名称
- `dealer_sap_code`（varchar）：所属销售客户SAP编码 → 子门店.所属销售客户SAP编码；经销商.SAP客户编码
- `dealer_type_name`（varchar）：所属销售客户类型 → 子门店.记录所附所属客户类型；经销商.销售客户类型
- `mkt_level_name`（varchar）：市场层级 → 门店.市场级别；子门店.记录所附市场层级
- `is_ydt`（varchar）：是否一店通：1是，0否 → 门店.一店通标记编码；子门店.一店通标记
- `specific_place`（varchar）：具体场所 → 门店.具体场所
- `specific_place_name_map`（varchar）：地图具体场所 → 门店.地图具体场所
- `p_place_name_map`（varchar）：地图场所 → 门店.地图场所
- `customer_store_type_name`（varchar）：门店类型 → 门店.门店类型
- `last_jdqm_photo_time`（datetime）：最近一次拜访日期 → 子门店.月度记录所附最近拜访日期
- `visit_times`（bigint）：拜访次数 → 子门店.月度拜访次数
- `visit_sucess_times`（bigint）：拜访成功次数 → 子门店.月度成功拜访次数
- `is_dev_cust`（varchar）：是否设备客户 → 子门店.月度设备客户标记
- `is_cold_dev_cust`（varchar）：是否冰柜客户 → 子门店.月度冰柜客户标记
- `is_multi_dev_cust`（varchar）：是否多门柜客户 → 子门店.月度多门柜客户标记
- `cold_dev_cnt`（double）：冰柜台数 → 子门店.月度冰柜台数
- `cold_dev_door_cnt`（bigint）：冰柜门数 → 子门店.月度冰柜门数
- `one_door_cold_dev_cnt`（int）：单门冰柜台数 → 子门店.月度单门冰柜台数
- `two_door_cold_dev_cnt`（int）：双门冰柜台数 → 子门店.月度双门冰柜台数
- `multi_dev_cnt`（double）：多门冰柜台数 → 子门店.月度多门冰柜台数
- `multi_door_cnt`（int）：多门冰柜门数 → 子门店.月度多门冰柜门数
- `hot_dev_cnt`（int）：暖柜台数 → 子门店.月度暖柜台数
- `hot_dev_door_cnt`（int）：暖柜门数 → 子门店.月度暖柜门数
- `food_dev_cnt`（int）：终端品冰柜台数 → 子门店.月度终端品冰柜台数
- `is_sd`（varchar）：是否水堆 → 子门店.月度水堆标记
- `is_bdh`（varchar）：是否冰冻化 → 子门店.月度冰冻化标记
- `cust_mkt_type`（varchar）：门店付费类型 → 子门店.月度门店付费类型
- `is_conshop`（varchar）：是否合约店 → 子门店.月度合约店标记
- `is_convent_code`（varchar）：是否常规付费门店 → 子门店.月度常规付费标记
- `conshop_sign_status`（varchar）：门店协议签约状态 → 子门店.月度协议签约状态
- `total_target`（double）：进货目标 → 子门店.月度进货目标金额；月度分销目标.月度分销目标金额；月度分销目标.单日分销目标金额；月度分销目标.截止日折算目标金额
- `water_target`（double）：水进货目标 → 子门店.月度水进货目标金额；月度分销目标.月度水目标金额；月度分销目标.单日水目标金额；月度分销目标.截止日折算水目标金额
- `sign_amt_mtd`（double）：陈列计划金额 → 子门店.月度陈列计划金额
- `confirm_amt_mtd`（double）：陈列应发金额 → 子门店.月度陈列应发金额
- `dist_chl_invest_amt`（double）：渠道投资金额 → 子门店.月度记录渠道投资金额
- `excess_estimate_amt`（double）：超额返利应发金额 → 子门店.月度超额返利应发金额
- `all_check_dsp_hg_num`（double）：陈列项合格数量 → 子门店.月度陈列项合格数量
- `convent_sign_amount`（double）：常规付费陈列签约金额 → 子门店.月度常规付费陈列签约金额
- `conshop_sign_amount`（double）：合约付费陈列签约金额 → 子门店.月度合约付费陈列签约金额
- `exe_water_sku_cnt`（double）：执行SKU数量(水) → 子门店.月度水执行SKU数量
- `exe_all_sku_cnt`（double）：执行SKU数量 → 子门店.月度执行SKU数量
- `remain_payable_amt_1`（double）：陈列未发金额 → 子门店.月度陈列未发金额
- `dsp_cancel_amt`（double）：陈列作废金额 → 子门店.月度陈列作废金额
- `bill_ord_has_use_amt_1`（double）：陈列实发金额 → 子门店.月度陈列实发金额

## `v_dim_cmdt_cmdt`

SKU、品类、商品

- `cmdt_code`（varchar）：商品编码 → 商品.商品编码
- `cmdt_name`（varchar）：商品全称 → 商品.商品名称
- `cmdt_sname`（varchar）：商品简称 → 商品.商品简称
- `cmdt_sname1`（varchar）：用户自定义简称 → 商品.用户自定义简称
- `sap_id`（varchar）：sap产品编码 → 商品.SAP商品编码
- `sap_code`（varchar）：sap产品编码(带0前缀) → 商品.SAP商品编码
- `cmdt_type`（varchar）：商品类型:1、成品2、终端品3、包材 → 商品.商品类型编码
- `cmdty_type_name`（varchar）：商品类型:1、成品2、终端品3、包材 → 商品.商品类型
- `cmdt_std`（varchar）：全标半标 → 商品.全标半标
- `brand_code`（varchar）：品牌编码 → 商品.品牌编码
- `brand_name`（varchar）：品牌名称 → 商品.品牌名称
- `clfc_code`（varchar）：类目编码 → 商品.三级类目编码
- `clfc_name`（varchar）：类目名称 → 商品.三级类目
- `p_clfc_code`（varchar）：上级类目编码 → 商品.二级类目编码
- `p_clfc_name`（varchar）：上级类目编码 → 商品.二级类目
- `p2_clfc_code`（varchar）：上上级类目编码 → 商品.一级类目编码
- `p2_clfc_name`（varchar）：上上级类目编码 → 商品.一级类目
- `ctg_code`（varchar）：品类编码 → 商品.品类编码；品类.品类编码
- `ctg_name`（varchar）：品类名称 → 商品.品类名称；品类.品类名称
- `item_code`（varchar）：品项编码 → 商品.品项编码
- `item_name`（varchar）：品项名称 → 商品.品项
- `sku_code`（varchar）：sku编码 → 商品.所属SKU编码；SKU.SKU编码
- `sku_name`（varchar）：sku名称 → 商品.所属SKU名称；SKU.SKU名称
- `spec_desc`（varchar）：包装规格 → 商品.包装规格
- `package_spec`（varchar）：包装规格（带容量） → 商品.带容量包装规格
- `package_unit`（varchar）：包装单位 → 商品.包装单位
- `entry_cnt`（int）：入数 → 商品.入数
- `sku_cnt`（int）：sku个数 → 商品.主数据SKU个数
- `sku_factor`（double）：sku系数 → 商品.主数据SKU系数
- `pack_type`（varchar）：包装类型:纸箱装 → 商品.包装类型
- `customize_name`（varchar）：定制方名称 → 商品.定制方名称
- `spec_mark`（varchar）：是否特标 → 商品.特标标记
- `status`（varchar）：状态:1正常2冻结3停售4终止 → 商品.商品状态编码
- `status_name`（varchar）：状态:1正常2冻结3停售4终止 → 商品.商品状态
- `on_sale_datetime`（varchar）：最近上架销售时间 → 商品.最近上架销售时间
- `frozen_datetime`（varchar）：最近冻结时间 → 商品.最近冻结时间
- `off_sale_datetime`（varchar）：最近停售时间 → 商品.最近停售时间
- `terminal_datetime`（varchar）：最近终止时间 → 商品.最近终止时间
- `length`（double）：长，单位cm → 商品.长度
- `width`（double）：宽，单位cm → 商品.宽度
- `height`（double）：高，单位cm → 商品.高度
- `net_weight`（double）：净重 → 商品.净重
- `gross_weight`（double）：毛重 → 商品.毛重
- `weight_unit`（varchar）：重量单位 → 商品.重量单位
- `volume`（double）：体积 → 商品.体积
- `volume_unit`（varchar）：体积单位 → 商品.体积单位
- `manufacture`（varchar）：生产厂家 → 商品.生产厂家
- `store_trans_type`（varchar）：储运类型:1冷链2非冷链 → 商品.储运类型编码
- `store_trans_type_name`（varchar）：储运类型:1冷链2非冷链 → 商品.储运类型
- `create_datetime`（varchar）：创建时间
- `update_datetime`（varchar）：更改时间
- `etl_load_time`（varchar）：elt时间
- `skusort`（varchar）：商品之定义品类名称
- `stand_price`（double）：标准价 → 商品.主数据标准价
- `capacity`（varchar）：容量 → 商品.容量；SKU.SKU容量
- `sales_ana_type_name`（varchar）：行销分析类 → 商品.行销分析类
- `sales_new_type_name`（varchar）：行销新品类 → 商品.行销新品类别
- `sales_ana_type_code`（varchar）：行销分析类代码 → 商品.行销分析类编码
- `sales_new_type_code`（varchar）：行销新品类代码 → 商品.行销新品类别编码
- `wotax_stand_price`（double）：不含税标准价 → 商品.不含税标准价
- `sales_clfc_type_code`（varchar）：分析类(产品大类)编码 → 商品.行销类目编码
- `sales_clfc_type_name`（varchar）：分析类(产品大类)名称 → 商品.行销类目

## `v_dim_hr_emp`

业代、主任、公司组织、办事处、员工、大区

- `emp_code`（varchar）：员工编码 → 员工.员工编码；业代.员工编码；主任.员工编码
- `emp_name`（varchar）：员工名称 → 员工.员工姓名；业代.员工姓名；主任.员工姓名
- `emp_account`（varchar）：员工账号 → 员工.员工账号；业代.员工账号；主任.员工账号
- `status`（varchar）：状态 → 员工.人员状态编码；业代.人员状态编码；主任.人员状态编码
- `status_name`（varchar）：状态名称 → 员工.人员状态名称；业代.人员状态名称；主任.人员状态名称
- `pos_code`（varchar）：岗位编码 → 员工.岗位编码；业代.岗位编码；主任.岗位编码
- `pos_name`（varchar）：岗位 → 员工.岗位名称；业代.岗位名称；主任.岗位名称
- `con_pos_list`（varchar）：兼岗列表 → 员工.兼岗列表；业代.兼岗列表；主任.兼岗列表
- `con_pos_name_list`（varchar）：兼岗名称 → 员工.兼岗名称列表；业代.兼岗名称列表；主任.兼岗名称列表
- `org_code`（varchar）：组织编码 → 公司组织.组织编码；办事处.组织编码；大区.组织编码；员工.任职组织编码；业代.任职组织编码；主任.任职组织编码
- `org_name`（varchar）：组织名称 → 公司组织.组织名称；办事处.组织名称；大区.组织名称；员工.任职组织名称；业代.任职组织名称；主任.任职组织名称
- `p_emp_code`（varchar）：上级员工代码 → 员工.员工编码；员工.上级员工编码；业代.上级员工编码；主任.员工编码；主任.上级员工编码
- `p_emp_name`（varchar）：上级员工 → 员工.员工姓名；员工.上级员工姓名；业代.上级员工姓名；主任.员工姓名；主任.上级员工姓名
- `std_pos_code`（varchar）：基准岗代码 → 员工.基准岗编码；业代.基准岗编码；主任.基准岗编码
- `std_pos_name`（varchar）：基准岗名称 → 员工.基准岗名称；业代.基准岗名称；主任.基准岗名称
- `std_pos_group_code`（varchar）：基准岗所属职务组 → 员工.基准岗职务组编码；业代.基准岗职务组编码；主任.基准岗职务组编码
- `std_pos_group_name`（varchar）：基准岗所属职务组名称 → 员工.基准岗职务组名称；业代.基准岗职务组名称；主任.基准岗职务组名称
- `std_pos_p_group_code`（varchar）：职务组从属上级 → 员工.上级职务组编码；业代.上级职务组编码；主任.上级职务组编码
- `std_pos_p_group_name`（varchar）：职务组从属上级名称 → 员工.上级职务组名称；业代.上级职务组名称；主任.上级职务组名称

## `v_dim_hr_emp_with_org`

未挂接本体

- `emp_code`（varchar）：职工编码
- `org_code`（varchar）：组织编码
- `org_name`（varchar）：组织名称
- `org_type`（varchar）：组织类型
- `org_type_name`（varchar）：组织类型名称
- `is_zb`（tinyint）：是否总部

## `v_dim_hr_org`

公司组织、办事处、大区

- `org_code`（varchar）：组织编码 → 公司组织.组织编码；办事处.组织编码；大区.组织编码
- `org_name`（varchar）：组织名称 → 公司组织.组织名称；办事处.组织名称；大区.组织名称
- `off_code`（varchar）：组织编码 → 公司组织.组织编码
- `off_name`（varchar）：组织名称 → 公司组织.组织名称
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；公司组织.当前架构大区编码；办事处.当前架构大区编码；大区.组织编码；大区.当前架构大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；公司组织.当前架构大区名称；办事处.当前架构大区名称；大区.组织名称；大区.当前架构大区名称
- `reg_code`（varchar）：区域编码 → 公司组织.组织编码；公司组织.当前架构区域编码；办事处.当前架构区域编码；大区.当前架构区域编码
- `reg_name`（varchar）：区域名称 → 公司组织.组织名称；公司组织.当前架构区域名称；办事处.当前架构区域名称；大区.当前架构区域名称
- `dept_code`（varchar）：部门代码 → 公司组织.组织编码；公司组织.当前架构部门代码；办事处.当前架构部门代码；大区.当前架构部门代码
- `dept_name`（varchar）：部门名称 → 公司组织.组织名称；公司组织.当前架构部门名称；办事处.当前架构部门名称；大区.当前架构部门名称
- `comp_code`（varchar）：公司代码 → 公司组织.当前架构公司代码；办事处.当前架构公司代码；大区.当前架构公司代码
- `comp_name`（varchar）：公司名称 → 公司组织.当前架构公司名称；办事处.当前架构公司名称；大区.当前架构公司名称
- `org_type`（varchar）：类型 → 公司组织.组织类型编码；办事处.组织类型编码；大区.组织类型编码
- `org_type_name`（varchar）：类型名称 → 公司组织.组织类型名称；办事处.组织类型名称；大区.组织类型名称
- `org_status`（varchar）：状态编码 → 公司组织.组织状态编码；办事处.组织状态编码；大区.组织状态编码
- `org_status_name`（varchar）：状态名称 → 公司组织.组织状态名称；办事处.组织状态名称；大区.组织状态名称
- `org_level_code`（varchar）：级别 → 公司组织.组织级别编码；办事处.组织级别编码；大区.组织级别编码
- `org_level_name`（varchar）：级别名称 → 公司组织.组织级别名称；办事处.组织级别名称；大区.组织级别名称

## `v_fin_expense_quota_balance_df`

事业线、公司组织、办事处、大区、客户自有核销额度、客户自有计划额度、经销商、费用来源、预留费用账户

- `quota_snapshot_id`（varchar）：余额记录ID → 客户自有计划额度.余额记录标识；客户自有核销额度.余额记录标识
- `balance_scope_code`（varchar）：余额口径：PLAN自有计划汇总、VERIFY自有核销来源、RESERVED预留账户
- `quota_type_code`（varchar）：额度类型：SELF自有、RESERVED_ACCOUNT预留账户
- `fin_year`（varchar）：财年 → 预留费用账户.账户财年；客户自有计划额度.累计所属财年；客户自有核销额度.费用来源财年；费用来源.来源财年
- `execute_ym`（varchar）：执行年月（YYYYMM；计划执行年月、预留账户年月；核销来源为空） → 预留费用账户.账户所属年月；客户自有计划额度.累计截止执行月
- `valid_start_date`（varchar）：费用使用开始时间 → 客户自有核销额度.来源使用开始时间；费用来源.使用开始时间
- `valid_end_date`（varchar）：费用使用结束时间 → 客户自有核销额度.来源使用结束时间；费用来源.使用结束时间
- `bsn_code`（varchar）：事业线编码 → 事业线.事业线编码；预留费用账户.账户事业线编码；客户自有计划额度.事业线编码；客户自有核销额度.事业线编码
- `bsn_name`（varchar）：事业线名称 → 事业线.事业线名称；客户自有计划额度.事业线名称；客户自有核销额度.事业线名称
- `dis_code`（varchar）：额度归属行政大区编码 → 公司组织.组织编码；大区.组织编码；预留费用账户.账户行政大区编码；客户自有计划额度.额度行政大区编码；客户自有核销额度.行政大区编码
- `dis_name`（varchar）：额度归属行政大区名称 → 公司组织.组织名称；大区.组织名称；客户自有计划额度.额度行政大区名称；客户自有核销额度.行政大区名称
- `off_code`（varchar）：额度归属行政办事处编码 → 公司组织.组织编码；办事处.组织编码；预留费用账户.账户行政办事处编码；客户自有计划额度.额度行政办事处编码；客户自有核销额度.行政办事处编码
- `off_name`（varchar）：额度归属行政办事处名称 → 公司组织.组织名称；办事处.组织名称；客户自有计划额度.额度行政办事处名称；客户自有核销额度.行政办事处名称
- `dealer_range_code`（varchar）：经销商编码 → 经销商.销售范围编码；客户自有计划额度.额度客户销售范围编码；客户自有核销额度.额度客户编码
- `dealer_range_name`（varchar）：经销商名称 → 经销商.经销商名称；客户自有计划额度.额度客户名称；客户自有核销额度.额度客户名称
- `dealer_type_name`（varchar）：经销商类型名称 → 经销商.销售客户类型；客户自有计划额度.额度客户类型；客户自有核销额度.额度客户类型
- `acct_code`（varchar）：预留账户编码 → 预留费用账户.预留账户编码
- `subject_code`（varchar）：费用科目编码 → 预留费用账户.账户费用科目编码
- `subject_name`（varchar）：费用科目名称 → 预留费用账户.账户费用科目名称
- `expen_sub_type_code`（varchar）：费用类型编码：1渠道费用、3市场费用、4货龄东方树叶费用、5水专项预留费用、6货龄其他品类费用 → 预留费用账户.账户费用类型编码；客户自有计划额度.费用类型编码；客户自有核销额度.费用类型编码
- `expen_sub_type_name`（varchar）：费用类型名称 → 预留费用账户.账户费用类型名称；客户自有计划额度.费用类型名称；客户自有核销额度.费用类型名称
- `expen_src_code`（varchar）：费用来源编码 → 客户自有核销额度.费用来源编码；费用来源.费用来源编码
- `expen_src_name`（varchar）：费用来源名称 → 客户自有核销额度.费用来源名称；费用来源.费用来源名称
- `expense_origin_code`（varchar）：费用出处编码：0自主费用、1战略费用、2大区预留、3自有费用(系统预留)、4经销商利润、5水专项预留费用 → 预留费用账户.账户费用出处编码；客户自有核销额度.费用出处编码
- `expense_origin_name`（varchar）：费用出处名称 → 预留费用账户.账户费用出处名称；客户自有核销额度.费用出处名称
- `plan_total_amt`（decimal）：计划总额度（元） → 客户自有计划额度.累计计划总额度
- `plan_used_amt`（decimal）：计划使用额度（元） → 客户自有计划额度.累计使用计划额度
- `plan_own_amt`（decimal）：自有计划额度（元） → 客户自有计划额度.累计自有计划额度
- `plan_adjust_amt`（decimal）：调整计划额度（元） → 客户自有计划额度.累计调整计划额度
- `plan_balance_amt`（decimal）：计划可用额度（元） → 客户自有计划额度.可用计划额度
- `verify_total_amt`（decimal）：自有核销总额度（元） → 客户自有核销额度.累计核销总额度；客户自有核销额度.合作商累计核销使用额度
- `verify_used_amt`（decimal）：自有核销使用额度（元） → 客户自有核销额度.本客户累计核销使用额度；客户自有核销额度.合作商累计核销使用额度
- `verify_own_amt`（decimal）：自有核销额度（元） → 客户自有核销额度.累计自有核销额度
- `verify_adjust_amt`（decimal）：调整核销额度（元） → 客户自有核销额度.累计调整核销额度
- `verify_balance_amt`（decimal）：核销可用额度（元） → 客户自有核销额度.合作商累计核销使用额度；客户自有核销额度.可用核销额度
- `reserved_total_amt`（decimal）：预留总额度（元） → 预留费用账户.预留费用总额度；预留费用账户.预留费用使用进度
- `reserved_used_amt`（decimal）：预留使用额度（元） → 预留费用账户.年累使用预留额度；预留费用账户.预留费用使用进度
- `reserved_balance_amt`（decimal）：预留当前金额（元） → 预留费用账户.预留可用额度

## `v_fin_expense_wallet_change_dtl_mi`

事业线、公司组织、分销套餐、办事处、品类、大区、经销商、统案客户分配、统案活动、营销活动、营销费用业务事件、费用包、费用来源、费用钱包、钱包分录、陈列费用包、预留费用账户

- `flow_id`（varchar）：钱包流水ID。单笔入口合用execute_ym、bsn_code、flow_id，先确认当前可见范围恰好1行；不能仅凭flow_id认定跨月唯一。原仓库粒度为ms、bsn_code、flow_id，本视图未开放ms；不用execute_ym冒充来源ms，也不据可见键推断全历史唯一；遇到重复先诊断，不任取一行或按金额去重。 → 钱包分录.流水编号
- `bsn_code`（varchar）：事业线编码 → 事业线.事业线编码；预留费用账户.账户事业线编码；费用钱包.钱包事业线编码；钱包分录.记账事业线编码；营销费用业务事件.事件事业线编码
- `fin_year`（varchar）：财年 → 预留费用账户.账户财年；费用钱包.钱包财年；钱包分录.分录财年
- `execute_ym`（varchar）：流水记账执行年月YYYYMM；按月统计流水默认筛选此列；除非明确要求，不叠加occur_time同月限制；不等同事件执行月 → 钱包分录.记账执行月
- `occur_time`（varchar）：原流水操作时间，来源create_datetime；按实际操作期间查询或追溯时使用；可与记账月跨月，不据此单独判异常 → 钱包分录.操作时间
- `wallet_code`（varchar）：钱包编码；合用bsn_code、fin_year解释钱包身份。钱包属性来自数仓加工时选定的钱包日快照，当前视图未开放该快照日期，不能当作流水发生时的历史归属。查当前钱包可在db_ontology_mkt.v_fin_expense_wallet_df按wallet_code、bsn_code、fin_year核对唯一性；目标未开放ds，不能指定历史快照。 → 费用钱包.钱包编码；钱包分录.记入钱包编码
- `action_id`（varchar）：记账动作编号；当前db_ontology_mkt目录尚无已确认可用的动作原文查询视图，本字段暂不能在本库直接关联动作原文；动作身份需要来源月份及事业线，当前视图未开放来源月份，不能以执行月冒充 → 钱包分录.记账动作编号
- `opt_type`（varchar）：记账方向：income影响钱包转入累计，outcome影响钱包转出累计；不是现金收款/付款标志，也不决定change_amt正负。默认分别计算两种方向的钱包变动金额合计；需要合并或推算余额影响时，须先核对该钱包类型的记账定义，不按income/outcome自动翻转金额正负。 → 钱包分录.记账方向
- `opt_tag`（varchar）：记账方式：cover覆盖重记、offsetting覆盖对冲、add追加记账。计算钱包变动金额合计时保留原符号；重算场景需核对冲回与重记范围，统计包含冲回与重记的整体变化时，不能只取cover或正数。不得仅凭opt_tag去重或删除原流水。 → 钱包分录.记账方式
- `wallet_id`（varchar）：钱包ID；对应db_ontology_mkt.v_fin_expense_wallet_df.wallet_id，结合bsn_code、fin_year、wallet_code核对；该视图未开放历史快照字段 → 费用钱包.钱包ID；钱包分录.记入钱包ID
- `wallet_month`（varchar）：钱包自身业务年月YYYYMM，来自加工选定的钱包快照属性；不同于流水记账月execute_ym、操作时间occur_time和事件业务月event_execute_ym，不能相互替代。 → 费用钱包.钱包业务年月；钱包分录.所附钱包业务月
- `wallet_type`（varchar）：钱包类型编码；ledger_role_code由本列固定归组，用途分类不代表严格账户上下级。相同账本类别仍可能包含额度供给、占用、调整及分配等不同用途，统计时结合具体钱包类型、记账方向及业务事件；不能只选账本类别就认定费用或核销 → 费用钱包.钱包类型编码；费用钱包.钱包账本类别；钱包分录.所附钱包类型编码
- `wallet_type_name`（varchar）：钱包类型名称 → 费用钱包.钱包类型名称；钱包分录.所附钱包类型名称
- `bsn_name`（varchar）：事业线名称 → 事业线.事业线名称；费用钱包.钱包事业线名称；钱包分录.记账事业线名称；营销费用业务事件.事件事业线名称
- `dis_code`（varchar）：钱包归属行政大区编码 → 公司组织.组织编码；大区.组织编码；费用钱包.行政大区编码；钱包分录.所附钱包大区编码
- `dis_name`（varchar）：钱包归属行政大区名称 → 公司组织.组织名称；大区.组织名称；费用钱包.行政大区名称；钱包分录.所附钱包大区名称
- `off_code`（varchar）：钱包归属行政办事处编码 → 公司组织.组织编码；办事处.组织编码；费用钱包.行政办事处编码；钱包分录.所附钱包办事处编码
- `off_name`（varchar）：钱包归属行政办事处名称 → 公司组织.组织名称；办事处.组织名称；费用钱包.行政办事处名称；钱包分录.所附钱包办事处名称
- `dealer_range_code`（varchar）：钱包归属经销商销售范围编码，来自加工选定的钱包日快照，不等于流水发生时的历史归属；与event_dealer_range_code事件客户分别解释，不全局COALESCE。可按本列统计钱包归属客户的同口径分录；NULL表示当前视图未提供该归属，不能解释成无费用。查询db_ontology_mkt.v_fin_expense_quota_balance_df时，PLAN需事业线、客户、费用类型及业务执行月，VERIFY需事业线、客户及费用来源；均先核目标完整键唯一，不只按客户JOIN。预留账户不能仅凭本列定位，按账户或经核定的分配关系解释。 → 经销商.销售范围编码；费用钱包.归属客户销售范围编码；钱包分录.所附钱包客户编码
- `dealer_range_name`（varchar）：钱包归属经销商名称 → 经销商.经销商名称；费用钱包.归属客户名称；钱包分录.所附钱包客户名称
- `quota_scope_code`（varchar）：钱包额度分类编码：SELF_PLAN自有计划额度、SELF_VERIFY自有核销额度、RESERVED预留额度、OTHER其他；SELF_PLAN与SELF_VERIFY同属自有的不同额度口径，金额不可混加；表示钱包归属，不等同事件费用模式，不是余额记录ID；查预留钱包变动可限定RESERVED，但客户关系、账本类别及状态仍须另核，不能单凭此列认定已核销金额或全部预留业务已覆盖 → 费用钱包.钱包额度分类；钱包分录.所附钱包额度分类
- `quota_scope_name`（varchar）：钱包额度分类名称；区分自有计划、自有核销、预留及其他，与事件使用自有或预留分别解释 → 费用钱包.钱包额度分类名称；钱包分录.所附钱包额度分类名称
- `ledger_role_code`（varchar）：钱包账本类别，按wallet_type固定归组，编码沿用历史命名：ROOT_CONTROL自有计划及预留主账（OWN自有额度、USED计划使用额度、ADJUST计划调整额度、RESERVED预留费用）；INTERNAL_POOL活动预留分配账户（ACTIVITY_UR活动大区、ACTIVITY_DEALER活动经销商）；VERIFY_MIRROR核销相关额度账（VERIFY、VERIFY_IMPORT、RESERVED_VERIFY、VERIFY_A_DEALER）；CUSTOMER_ACCOUNT客户费用账户（CUST_DELIV_FEE客户配送费、CUST_ACT_FEE门店活动费）；OTHER未分类。用途分类不是严格账户上下级，也不是本笔业务动作：主账不表示唯一总账或可直接相加的费用总额；分配账户也有使用及返还；核销相关账也有额度供给、调整和冲回，不等于每笔已核销或与主账逐笔镜像；客户费用账户不表示主体全部是门店。同类别仍须区分钱包类型、记账方向及事件用途；同口径可跨同类钱包汇总，但不能自动转为费用、余额、核销或付款。OTHER可能来自选定钱包快照无匹配、关联键重复被排除、类型为空或未覆盖，不能据此推断无业务或金额为0。 → 费用钱包.钱包账本类别；钱包分录.所附钱包账本类别
- `acct_code`（varchar）：钱包归属预留账户编码；对应db_ontology_mkt.v_fin_expense_quota_balance_df.acct_code，限定balance_scope_code=RESERVED并匹配bsn_code、fin_year；该视图未开放ds，先核对键唯一性 → 预留费用账户.预留账户编码；费用钱包.归属预留账户编码；钱包分录.所附钱包预留账户编码
- `expen_sub_type_code`（varchar）：钱包归属费用类型编码：1渠道、3市场、4货龄东方树叶、5水专项预留、6货龄其他品类；可用于所选钱包口径内分类统计。用本列定位db_ontology_mkt.v_fin_expense_quota_balance_df的计划余额时，限定balance_scope_code=PLAN并合用bsn_code、dealer_range_code及经核定的业务execute_ym，先核完整键唯一；这项PLAN限制仅针对该余额关联，不表示其他口径的钱包流水不能按费用类型统计。 → 费用钱包.归属费用类型编码；钱包分录.所附钱包费用类型编码
- `expen_sub_type_name`（varchar）：费用类型名称 → 费用钱包.归属费用类型名称；钱包分录.所附钱包费用类型名称
- `expen_src_code`（varchar）：钱包归属费用来源编码，可用于同口径分录分类统计。定位db_ontology_mkt.v_fin_expense_quota_balance_df的核销来源余额时，限定balance_scope_code=VERIFY并合用bsn_code、dealer_range_code、expen_src_code，先核完整键唯一；目标execute_ym在VERIFY口径为空，不附加流水记账月等值条件。余额来源财年按目标来源解释，未核对时不强制等同流水fin_year；目标无ds，不能还原历史快照。 → 费用钱包.归属费用来源编码；钱包分录.所附钱包费用来源编码；费用来源.费用来源编码
- `expen_src_name`（varchar）：钱包归属费用来源名称 → 费用钱包.归属费用来源名称；钱包分录.所附钱包费用来源名称；费用来源.费用来源名称
- `expense_origin_code`（varchar）：钱包归属费用出处编码：0自主费用、1战略费用、2大区预留、3自有费用(系统预留)、4经销商利润、5水专项预留费用；系统出处枚举，不直接等同自有/预留二分类，自主不自动等同自有 → 费用钱包.归属费用出处编码；钱包分录.所附钱包费用出处编码
- `expense_origin_name`（varchar）：钱包归属费用出处名称；保留系统出处含义，不作为统一自有/预留费用大类 → 费用钱包.归属费用出处名称；钱包分录.所附钱包费用出处名称
- `transaction_id`（varchar）：记账请求编号，用于同次请求追溯；一次请求可产生多钱包、多笔分录，不按此字段任取一行或去重金额 → 钱包分录.记账请求编号
- `biz_type`（varchar）：记账业务类型（groupId费用组、unityId统案客户分配；门店类型见字典） → 钱包分录.记账业务引用类型
- `biz_id`（varchar）：记账业务编号，结合biz_type解释；groupId按dim_group_id备注中的业务场景核定费用组入口；unityId的候选字段为db_ontology_mkt.v_mkt_unity_apply_alloc_df.dealer_actv_id，该视图列映射已修复，但biz_type=unityId的记账业务完整关联键仍未核定，不能仅凭biz_id直接关联，也不能照搬事件客户分配条件；门店业务为单号或结算引用，不作通用活动ID → 钱包分录.记账业务引用编号
- `event_domain`（varchar）：事件来源分类：PLAN计划事件、RESERVED预留事件、SELF自有事件、CUSTOMER门店费用直接记账、DIRECT直接记账、UNKNOWN来源未识别。分类来自原记账动作的规则ID/版本映射及事件类型校验；动作缺失或重复、映射缺失或类型不符可产生UNKNOWN。这里的原记账规则不同于独立下钻路由规则；UNKNOWN不等于没有下钻路由或没有费用，不应仅因此排除原流水统计。 → 钱包分录.所录事件域；营销费用业务事件.事件域
- `event_id`（varchar）：业务事件编号，须结合event_domain、事业线及事件类型解释；当前db_ontology_mkt目录尚无已确认可用的对应事件原文查询视图，暂不能在本库直接回溯事件原文；不把不同事件域的同号记录视为同一事件，0占位不关联 → 钱包分录.触发事件编号；营销费用业务事件.事件编号
- `event_type`（varchar）：业务事件类型编码（按event_domain解释，枚举见事件字典） → 钱包分录.所录事件类型编码；营销费用业务事件.事件类型编码
- `event_type_name`（varchar）：业务事件类型名称 → 钱包分录.所录事件类型名称；营销费用业务事件.事件类型名称
- `event_sub_type`（varchar）：事件业务子类型编码；原事件非空值优先：RESERVED取event_adjust_type，SELF/adjust取请求adjustType。已唯一关联到事件且子类型为空时，加工按SELF/target或reward补quota_generate，RESERVED/reservedToDealer补region_expense_allocate，PLAN/activity_use补activity_use。事件未关联时不能由调用方照此猜补；查询直接使用本列实际值，并结合event_domain/event_type解释。all/plan是自有调整范围，不等同stage_code。 → 钱包分录.所录事件子类型编码；营销费用业务事件.事件业务子类型编码
- `event_sub_type_name`（varchar）：事件业务子类型名称，由事件域、事件类型及子类型共同解释；quota_generate为额度生成、region_expense_allocate为大区费用分配、activity_use为活动使用，另含预留预算动作及自有调整范围。未知编码或无法归类时名称为空，编码仍保留；名称不参与路由六键匹配。 → 钱包分录.所录事件子类型名称；营销费用业务事件.事件业务子类型名称
- `activity_type`（varchar）：事件活动类型编码（枚举见活动类型字典）；与事件域、事件类型和阶段共同确定业务对象，不等同钱包业务标识 → 钱包分录.所录事件活动类型编码；营销费用业务事件.事件活动类型编码
- `event_activity_type_name`（varchar）：事件活动类型名称 → 钱包分录.所录事件活动类型名称；营销费用业务事件.事件活动类型名称
- `stage_code`（varchar）：事件业务阶段：plan计划、implement实施、sign签约、confirm确认、verify核销、partVerify部分核销、return回退；表示记账时阶段，非活动当前状态；confirm也可能承接核销回退，计算包含核销及回退的钱包变动金额合计时，不能只保留核销阶段 → 钱包分录.记账时事件阶段；营销费用业务事件.事件阶段
- `stage_name`（varchar）：事件业务阶段名称：计划、实施、签约、确认、核销、部分核销、回退 → 钱包分录.记账时事件阶段名称；营销费用业务事件.事件阶段名称
- `event_execute_ym`（varchar）：事件业务执行年月YYYYMM，与流水记账月execute_ym、操作时间occur_time分别解释。业务下钻的月份条件读取外部规则partition_rule_desc及所选模板，例如费用包exec_month、陈列计划execute_ym、激励费用execute_month；不默认同月，不用本列推算来源ms/ds。 → 钱包分录.所录事件业务月；营销费用业务事件.事件业务月；统案客户分配.执行年月
- `dim_group_id`（varchar）：事件费用组ID，不是流水唯一键、通用单据ID或路由匹配键。同一费用组可对应多笔原流水和多条业务明细；不同事业线/事件业务组合中的同号不能默认是同一对象。按费用组统计时先限定业务组合、月份、客户归属、钱包类型、记账方向及额度/账本类别口径，再对原流水分组；费用组为空的合计只能说明未提供费用组的流水集合，不是同一业务对象。需下钻时按六键在db_ontology_mkt.v_fin_expense_wallet_route_df选择规则并读取完整模板，不仅凭本列JOIN或按费用组去重流水。其他入口可能使用unity_alloc_id、event_id或transaction_id；空费用组不表示不能统计钱包变动。展开后不得重复累计源change_amt。 → 钱包分录.事件费用组编号；营销费用业务事件.事件费用组编号
- `unity_alloc_id`（varchar）：事件统案客户分配ID，与dim_group_id不同；市场统案客户分配、修改及到期返还的候选字段为db_ontology_mkt.v_mkt_unity_apply_alloc_df.dealer_actv_id；该视图列映射已修复；按独立路由规则所选模板校验业务组合和使用范围，须合用actv_code=event_object_code、execute_ym=event_execute_ym，各键非空，不使用dim_group_id替代或附加费用组，不加通常为空的event_acct_code；该视图无bsn_code和ds，仅限已核事业线50000025并核实同步范围；当前快照缺口保留未匹配 → 钱包分录.事件统案客户分配编号；营销费用业务事件.统案客户分配引用编号；统案客户分配.客户分配标识
- `event_object_code`（varchar）：事件业务对象编码，可能表示活动、套餐、签约等身份，不是统一外键。对象定位读取独立规则视图group_key_desc中的对象状态、object_view、object_key及OBJECT_SQL模板；这些元数据不是本视图列。按规则绑定实际版本和对象模板编号，不按编码格式、名称关键词或相似表名改选路由。对象找到只证明身份，不等于费用明细匹配。 → 营销活动.活动编码；分销套餐.活动编码；统案活动.活动编码；钱包分录.事件对象引用编码；营销费用业务事件.事件业务对象编码；费用包.月度费用包编码；陈列费用包.月度费用包编码；统案客户分配.统案活动编码
- `event_object_name`（varchar）：事件业务对象名称，仅用于展示和按object_name_field辅助核对，不作JOIN键或单独选路由。名称相同不能覆盖编码冲突；名称差异保留待核。人员激励等名称可能只是类别标签；名称为空不自动否定有效编码，编码为空也不能靠名称认定唯一对象。 → 营销活动.活动名称；分销套餐.活动名称；统案活动.活动名称；钱包分录.事件对象引用名称；营销费用业务事件.事件业务对象名称
- `cost_package_id`（varchar）：费用包明细ID；陈列月包对应db_ontology_mkt.v_mkt_cost_package_df.package_dlt_id，限定package_type_code=DISPLAY，并合用bsn_code、exec_month=event_execute_ym、dealer_range_code=event_dealer_range_code、dim_group_id=流水dim_group_id、package_dtl_code=event_object_code；费用组非空，cost_package_id非空时核对package_dlt_id，完整键唯一后回连；不是package_id包头，视图未开放ms/ds → 钱包分录.事件费用包明细编号；营销费用业务事件.费用包明细引用编号；费用包.分配明细标识；陈列费用包.分配明细标识
- `event_biz_id`（varchar）：活动事件原关联业务ID；按事件域、活动类型及阶段解释，当前未核定可直接关联的业务视图字段，不作通用单据外键 → 钱包分录.事件原关联业务编号；营销费用业务事件.活动事件关联业务编号
- `event_dealer_range_code`（varchar）：事件归属客户销售范围编码，与钱包归属dealer_range_code分开。追溯事件或预留按本列及已核业务关系解释，不强制两类客户相等，也不全局COALESCE。目标客户字段和完整条件读取外部规则的所选模板，例如激励费用使用sale_customer_range_code；缺少客户关系时保留待核，不算零。 → 经销商.销售范围编码；钱包分录.所录事件客户编码；营销费用业务事件.事件客户编码
- `event_dealer_range_name`（varchar）：事件客户名称 → 经销商.经销商名称；钱包分录.所录事件客户名称；营销费用业务事件.事件客户名称
- `event_parent_dealer_code`（varchar）：事件上游客户销售范围编码 → 经销商.销售范围编码；钱包分录.所录事件上游客户编码；营销费用业务事件.事件上游客户编码
- `event_customer_role_code`（varchar）：事件客户类型：0经销商、1分销商、2合作商；源缺失为空 → 钱包分录.所录事件客户类型；营销费用业务事件.事件客户类型
- `event_acct_code`（varchar）：事件预留账户编码，与钱包归属acct_code分开，不互相补值。是否使用本列由当前主模板决定：部分预留入口要求账户，PLAN激励费用按客户匹配，统案客户分配不统一附加账户条件。空值是否阻断以所选入口必填键诊断为准。 → 预留费用账户.预留账户编码；钱包分录.所录事件预留账户编码；营销费用业务事件.事件预留账户编码
- `event_expen_src_code`（varchar）：事件请求费用来源编码；费用来源说明的候选字段为db_ontology_mkt.v_mkt_expen_src_dtl_df.expen_code，须匹配bsn_code并核对目标fin_year；目录声明粒度包含fin_year与expen_code，不能只凭来源编码和事业线认定唯一；事件来源财年与本视图fin_year是否一致尚未核定，财年对应关系及完整键唯一性确认前暂不可直接关联；不等同费用包编码，不覆盖钱包归属expen_src_code → 钱包分录.所录事件请求来源编码；营销费用业务事件.事件请求费用来源编码；费用来源.费用来源编码
- `event_expen_sub_type_code`（varchar）：事件请求费用类型编码：1渠道费用、3市场费用、4货龄东方树叶费用、5水专项预留费用、6货龄其他品类费用 → 钱包分录.所录事件请求费用类型；营销费用业务事件.事件请求费用类型
- `event_expense_mode_code`（varchar）：事件费用模式编码：D自有费用、U预留费用；取事件原文expenseType，SELF自有事件分支置NULL，原文缺失或事件未关联时可为空；空值不代表无费用，不用钱包分类补值；非全部流水的统一费用大类 → 钱包分录.所录事件费用模式；营销费用业务事件.事件费用模式
- `event_expense_mode_name`（varchar）：事件费用模式名称：D显示自有费用、U显示预留费用；编码为空或非D/U时名称为空，不自动归为自有或预留 → 钱包分录.所录事件费用模式名称；营销费用业务事件.事件费用模式名称
- `ctg_code`（varchar）：事件单值产品品类编码。货龄等场景按所选模板核对目标品类；不能省略已要求的品类条件，也不能把品类等值条件推广到所有活动。不用ctg_name或SKU替代，不自行展开品类数组；目标品类字段存在不表示业务身份、来源类型和事业线条件已核定。 → 品类.品类编码；钱包分录.所录事件品类编码；营销费用业务事件.事件产品品类编码
- `ctg_name`（varchar）：事件单值产品品类名称；已按品类编码翻译，可直接展示，不以名称作为品类关联键 → 品类.品类名称；钱包分录.所录事件品类名称；营销费用业务事件.事件产品品类名称
- `calc_rate`（decimal）：事件自有承担比例（%，不重复折算流水金额） → 营销费用业务事件.事件自有承担比例
- `hq_calc_rate`（decimal）：事件总部承担比例（%） → 营销费用业务事件.事件总部承担比例
- `remark`（varchar）：事件备注文本，可用于展示、检索和辅助识别业务动作；不是路由六键、唯一键或通用关联键。套餐计划的新建/冻结场景须先按六键选规则，再由所选模板结合备注原文及完整上下文核定，不仅凭关键词判断。已核套餐冻结文字不能区分首次冻结与修复重算；空备注或“订单”等未核场景保留诊断，不猜关联。场景识别不等于历史费用明细已关联；未识别不影响按明确口径统计原钱包流水。 → 营销费用业务事件.事件备注
- `change_amt`（decimal）：本笔原钱包分录金额，单位元，来自op_money的数值转换，保留原正负、零值和NULL。支持按明确口径GROUP BY、SUM(change_amt)，结果应称钱包变动金额合计。先明确时间、事业线、客户归属、钱包类型、记账方向、额度分类及账本类别；相同账本类别也不保证不同钱包可直接混加为费用。同口径可跨同类钱包汇总，无需逐流水或逐钱包分组，也无需命中路由。默认分别统计income/outcome，不按方向或正负自动推导费用、余额、核销额或付款额；当前未开放source_status，不能声明已筛有效分录。SUM忽略NULL，应同时核对COUNT(*)与COUNT(change_amt)，缺失金额不自动补0。钱包变动金额合计按原正负号相加；统计范围包含冲回与重记时应一并保留，不用ABS替代，也不按income/outcome再次翻转符号；不能SUM(DISTINCT change_amt)按金额去重，不重复乘承担比例。关联或MAIN/OVERLAY展开后不得重复累计源金额。模板can_aggregate_amount仅约束该模板目标结果，不禁止上述原流水统计。 → 钱包分录.分录变动金额

## `v_fin_expense_wallet_df`

事业线、公司组织、办事处、大区、经销商、费用来源、费用钱包、预留费用账户

- `wallet_id`（varchar）：钱包ID → 费用钱包.钱包ID
- `wallet_code`（varchar）：钱包编码 → 费用钱包.钱包编码
- `fin_year`（varchar）：财年 → 费用钱包.钱包财年
- `wallet_month`（varchar）：钱包业务年月（YYYYMM） → 费用钱包.钱包业务年月
- `bsn_code`（varchar）：事业线编码 → 事业线.事业线编码；费用钱包.钱包事业线编码
- `bsn_name`（varchar）：事业线名称 → 事业线.事业线名称；费用钱包.钱包事业线名称
- `dis_code`（varchar）：钱包归属行政大区编码 → 公司组织.组织编码；大区.组织编码；费用钱包.行政大区编码
- `dis_name`（varchar）：钱包归属行政大区名称 → 公司组织.组织名称；大区.组织名称；费用钱包.行政大区名称
- `off_code`（varchar）：钱包归属行政办事处编码 → 公司组织.组织编码；办事处.组织编码；费用钱包.行政办事处编码
- `off_name`（varchar）：钱包归属行政办事处名称 → 公司组织.组织名称；办事处.组织名称；费用钱包.行政办事处名称
- `dealer_range_code`（varchar）：经销商销售范围编码 → 经销商.销售范围编码；费用钱包.归属客户销售范围编码
- `dealer_range_name`（varchar）：经销商名称 → 经销商.经销商名称；费用钱包.归属客户名称
- `wallet_type`（varchar）：钱包类型编码（枚举见钱包类型字典） → 费用钱包.钱包类型编码；费用钱包.钱包账本类别
- `wallet_type_name`（varchar）：钱包类型名称 → 费用钱包.钱包类型名称
- `quota_scope_code`（varchar）：钱包额度分类编码：SELF_PLAN自有计划额度、SELF_VERIFY自有核销额度、RESERVED预留额度、OTHER其他 → 费用钱包.钱包额度分类
- `quota_scope_name`（varchar）：钱包额度分类名称 → 费用钱包.钱包额度分类名称
- `acct_code`（varchar）：预留账户编码 → 预留费用账户.预留账户编码；费用钱包.归属预留账户编码
- `expen_sub_type_code`（varchar）：费用类型编码：1渠道费用、3市场费用、4货龄东方树叶费用、5水专项预留费用、6货龄其他品类费用 → 费用钱包.归属费用类型编码
- `expen_sub_type_name`（varchar）：费用类型名称 → 费用钱包.归属费用类型名称
- `expen_src_code`（varchar）：费用来源编码 → 费用钱包.归属费用来源编码；费用来源.费用来源编码
- `expen_src_name`（varchar）：费用来源名称 → 费用钱包.归属费用来源名称；费用来源.费用来源名称
- `expense_origin_code`（varchar）：费用出处编码：0自主费用、1战略费用、2大区预留、3自有费用(系统预留)、4经销商利润、5水专项预留费用 → 费用钱包.归属费用出处编码
- `expense_origin_name`（varchar）：费用出处名称 → 费用钱包.归属费用出处名称
- `verify_basis_code`（varchar）：核销额度计算口径编码：reward奖励基数、target目标销量 → 费用钱包.核销额度计算口径编码
- `verify_basis_name`（varchar）：核销额度计算口径名称 → 费用钱包.核销额度计算口径名称
- `income_amt`（decimal）：累计转入金额（元） → 费用钱包.累计转入金额
- `outcome_amt`（decimal）：累计转出金额（元） → 费用钱包.累计转出金额

## `v_fin_expense_wallet_route_df`

事业线、钱包业务追溯规则

- `event_domain`（varchar）：匹配流水的实际事件来源分类，含SELF、RESERVED、PLAN、CUSTOMER、DIRECT、UNKNOWN；分类由流水加工确定，不能由路由名称重新推断。UNKNOWN也可能已有已审核路由，不等于UNMAPPED或无费用。 → 钱包业务追溯规则.适用事件域
- `event_type`（varchar）：业务事件类型原编码；与来源、子类型、活动类型、阶段及事业线合用；空字符串仅匹配源无值 → 钱包业务追溯规则.适用事件类型编码
- `event_sub_type`（varchar）：事件业务子类型编码；参与精确匹配；源NULL转空字符串，空字符串不是通配符；如quota_generate额度生成、region_expense_allocate大区费用分配、activity_use活动使用、all全部调整、plan仅计划调整，结合事件来源和事件类型解释 → 钱包业务追溯规则.适用事件子类型编码
- `event_sub_type_name`（varchar）：事件业务子类型名称；紧跟编码展示，不参与JOIN；按事件来源、类型和子类型核定，源无名称为NULL → 钱包业务追溯规则.适用事件子类型名称
- `activity_type`（varchar）：事件活动类型原编码；空字符串仅匹配源无值，不是通配符 → 钱包业务追溯规则.适用活动类型编码
- `stage_code`（varchar）：事件阶段原编码；plan计划、implement实施、sign签约、confirm确认、verify核销、partVerify部分核销、return回退；按实际枚举匹配，空字符串仅匹配源无值 → 钱包业务追溯规则.适用事件阶段
- `bsn_code`（varchar）：适用事业线编码；精确匹配，不配置跨事业线通配符 → 事业线.事业线编码；钱包业务追溯规则.适用事业线编码
- `route_role_code`（varchar）：路由角色：MAIN为该业务组合的主要下钻入口；OVERLAY为按需单独使用的补充业务入口，不是MAIN失败后的自动回退。钱包变动金额合计直接在钱包流水视图按业务口径计算，无需JOIN本规则视图；两种角色可能关联重叠业务，不能将两路展开结果重复累计为钱包金额。没有OVERLAY正常。六键加角色应唯一，角色不表示模板已就绪或明细已匹配。 → 钱包业务追溯规则.规则角色
- `route_role_name`（varchar）：路由角色名称：MAIN主路由、OVERLAY补充路由；用途以route_role_code说明为准，不根据名称自行改选路径。 → 钱包业务追溯规则.规则角色名称
- `route_id`（varchar）：数仓业务路由编号，与route_role_code合用解释；同一路由可承接多个业务组合，route_id不是规则唯一键，也不是原系统记账规则编号。 → 钱包业务追溯规则.业务路由编号
- `route_name`（varchar）：所选业务路由的名称，仅作解释；名称或关键词不作为关联键，不凭相似名称选择路由。 → 钱包业务追溯规则.业务路由名称
- `group_id_state_desc`（varchar）：该业务组合下事件费用组是否有值及其含义；费用组为空不等于无规则或无费用，是否必填按所选模板诊断。 → 钱包业务追溯规则.费用组适用说明
- `target_object_name`（varchar）：目标及可用范围说明，含SQL_READY、CANDIDATE_VIEW等状态前缀；与join_key_desc、verify_status_desc的入口状态核对一致，不把展示文本拼接为SQL。 → 钱包业务追溯规则.追溯目标与可用范围
- `target_group_table`（varchar）：所选入口目标表或视图的纯名称；v_目标使用db_ontology_mkt，其他对象按模板指定引擎与权限解释。目标可为业务事实、分录、余额或候选；不代表按dim_group_id已关联。 → 钱包业务追溯规则.目标表或视图名称
- `target_group_key`（varchar）：所选入口主要定位字段纯名称，可为费用组、分配ID、对象编码、event_id或transaction_id；不是统一费用组外键，不根据此列自行拼JOIN，须执行完整模板。 → 钱包业务追溯规则.主要定位字段名称
- `group_key_desc`（varchar）：对象定位说明、对象模板及费用键解释。OBJECT状态、object_view、object_key、object_template_id等是本字段正文中的元数据，不是规则视图独立列。OBJECT_SQL_READY仍须核版本、对象模板编号、完整正文及实际诊断；OBJECT_VIA_DETAIL表示对象信息随该角色主模板返回。对象唯一定位不等于费用明细已匹配，不升级主下钻入口状态；名称只用于辅助核对，不代替编码关联。 → 钱包业务追溯规则.对象定位与费用键说明
- `join_key_desc`（varchar）：所选角色的主下钻模板及前置条件，不是钱包原流水统计的前置条件。先核对本列、target_object_name、verify_status_desc状态、实际rule_version与template_id，再提取独立SQL_BEGIN/SQL_END完整正文，不误取SOURCE_SQL或RELATED_SQL。保留源唯一性、完整六键、时间范围及其他条件；view_schema_verified与scope_confirmed分别表示视图结构、事业线及同步范围已验收，仅在各自真实验收后设1；列映射修复不自动代表业务范围已验收。先读drill_status/lookup_status，失败诊断行不算业务明细；匹配失败不等于零费用。target_rows是模板定义的目标数量，不自动等于业务对象数；TRUNCATED_TO_200不是完整明细集合。can_aggregate_amount=0只禁止直接汇总该模板目标金额，不限制钱包原流水按口径汇总；该标志缺失或为1也不能跳过目标粒度、重复、范围及金额含义核验。drill_terminal=1停止继续自动下钻，不禁止正常分析。RELATED_CONTRACT按related_template_id另选；SOURCE_SQL按指定引擎、权限及真实分区执行，均不是OVERLAY的同义词。模板输出字段及诊断/金额标志不是本规则视图或钱包视图的列。 → 钱包业务追溯规则.明细追溯模板与条件
- `partition_rule_desc`（varchar）：当前所选入口的时间与覆盖范围；区分流水execute_ym、事件event_execute_ym、目标业务月份及真实来源分区。目标未开放ms/ds时不能补造列；来源月份不能用记账月推算。 → 钱包业务追溯规则.期间与覆盖范围说明
- `support_type_code`（varchar）：支持范围编码：FACT已整合业务事实或记账分录、SNAPSHOT当前余额快照、SOURCE源事件或动作、HEAD业务头、UNVERIFIED待核；以drill_scope解释，不据FACT推断金额可直接相加。 → 钱包业务追溯规则.支持范围编码
- `support_type_name`（varchar）：支持范围名称；区分业务费用、实际记账分录、当前余额、对象与原文，不将不同范围金额混加。 → 钱包业务追溯规则.支持范围名称
- `relation_type_code`（varchar）：ONE表示目标应唯一定位，GROUP表示目标可能是合法业务集合；不表示GROUP结果必然可汇总，也不限制原钱包流水按口径分组。目标金额须核模板标志、实际粒度、重复及范围，诊断行不计明细数量；不能把原流水因目标一对多展开后重复累计。 → 钱包业务追溯规则.目标定位要求编码
- `relation_type_name`（varchar）：关联要求名称：单条记录、业务集合；未核定时为空 → 钱包业务追溯规则.目标定位要求名称
- `verify_status_desc`（varchar）：所选下钻入口的状态、证据及适用范围；SQL_READY仅模板就绪，不表示当前权限、目标同步或本笔匹配已通过。历史样本不代替本次诊断，依赖修复或范围仍须验收。CANDIDATE_VIEW不阻断钱包原流水统计；但用户要求的业务费用、核销或付款指标不能在关联未核定时用钱包变动金额合计冒充。 → 钱包业务追溯规则.入口状态与依据
- `rule_version`（varchar）：当前选中规则的实际配置版本，与同一行主模板或对象模板编号一起核对和绑定，不写死默认值；本视图无ds/etl_time，不按不存在的分区选版本。数据以当前同步配置为准，不还原历史规则快照。同版本可能有诊断修订，缓存与验收须比较完整内容。 → 钱包业务追溯规则.规则版本

## `v_inv_dealer_cmdt_di`

SKU、公司组织、办事处、品类、商品、大区、经销商、经销商商品库存

- `stat_date`（datetime）：日期 → 经销商商品库存.库存日期
- `dealer_range_code`（varchar）：销售客户编码 → 经销商.销售范围编码；经销商商品库存.库存销售客户编码
- `cmdt_code`（varchar）：商品编码 → 商品.商品编码；经销商商品库存.库存商品编码
- `auto_dlv_flag`（varchar）：是否自动发货 → 经销商商品库存.自动发货标记
- `cmdt_std_price_orgn`（double）：当时上单标准价 → 商品.库存当时上单标准价；经销商商品库存.当时上单标准价
- `org_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；经销商商品库存.记录办事处编码
- `org_name`（varchar）：办事处 → 公司组织.组织名称；办事处.组织名称
- `p_org_name`（varchar）：大区 → 公司组织.组织名称；大区.组织名称；经销商商品库存.记录大区名称
- `p2_org_name`（varchar）：区域 → 公司组织.组织名称；经销商商品库存.记录区域名称
- `cmdt_name`（varchar）：商品 → 商品.商品名称
- `cmdt_sname`（varchar）：商品简称 → 商品.商品简称
- `cmdt_sap_code`（varchar）：商品SAP编码 → 商品.SAP商品编码
- `cmdty_type_name`（varchar）：商品类型 → 商品.商品类型
- `brand_name`（varchar）：品牌 → 商品.品牌名称
- `clfc_name`（varchar）：三级类目 → 商品.三级类目
- `p_clfc_name`（varchar）：二级类目 → 商品.二级类目
- `p1_clfc_name`（varchar）：一级类目 → 商品.一级类目
- `ctg_name`（varchar）：品类 → 商品.品类名称；品类.品类名称；经销商商品库存.库存品类名称
- `item_name`（varchar）：品项 → 商品.品项
- `sku_code`（varchar）：SKU编码 → 商品.所属SKU编码；SKU.SKU编码；经销商商品库存.库存SKU编码
- `sku_name`（varchar）：SKU → 商品.所属SKU名称；SKU.SKU名称
- `spec_desc`（varchar）：箱规 → 商品.箱规
- `package_spec`（varchar）：包装规格 → 商品.包装规格
- `entry_cnt`（bigint）：入数 → 商品.入数
- `pack_type`（varchar）：包装类型 → 商品.包装类型
- `store_trans_type_name`（varchar）：储运类型 → 商品.储运类型
- `capacity`（varchar）：容量 → 商品.容量；SKU.SKU容量
- `sales_ana_type_name`（varchar）：行销品类 → 商品.行销品类
- `sales_new_type_name`（varchar）：行销新品 → 商品.行销新品类别
- `dealer_name`（varchar）：销售客户 → 经销商.经销商名称
- `dealer_short_name`（varchar）：销售客户简称 → 经销商.经销商简称
- `dealer_sap_code`（varchar）：销售客户SAP编码 → 经销商.SAP客户编码
- `dealer_type_code`（varchar）：销售客户类型编码 → 经销商.销售客户类型编码
- `dealer_type_name`（varchar）：销售客户类型 → 经销商.销售客户类型
- `dealer_sale_range_name`（varchar）：销售客户类型范围 → 经销商.库存记录客户类型范围
- `dealer_status_name`（varchar）：销售客户状态 → 经销商.客户状态
- `off_name`（varchar）：当时办事处 → 公司组织.组织名称；办事处.组织名称；经销商商品库存.当时办事处名称
- `dis_name`（varchar）：当时大区 → 公司组织.组织名称；大区.组织名称；经销商商品库存.当时大区名称
- `reg_name`（varchar）：当时区域 → 公司组织.组织名称；经销商商品库存.当时区域名称
- `sales_clfc_type_name`（varchar）：行销类目 → 商品.行销类目
- `contract_ctg_name`（varchar）：合同品类 → 商品.所附合同品类；经销商商品库存.合同品类名称
- `cvt_target_cy`（double）：折算年度目标 → 经销商商品库存.附带折算年度目标
- `bad_inv_amt`（double）：不良品仓库存金额 → 经销商商品库存.不良品仓库存金额
- `bad_inv_cnt`（double）：不良品仓库存数量 → 经销商商品库存.不良品仓库存数量
- `car_inv_amt`（double）：车仓库存金额 → 经销商商品库存.车仓库存金额
- `car_inv_cnt`（double）：车仓库存数量 → 经销商商品库存.车仓库存数量
- `sku_factor`（varchar）：标箱系数 → 商品.所附标箱系数；经销商商品库存.标箱系数
- `qtck_inv_box_cnt`（double）：其他出库数量 → 经销商商品库存.其他出库数量
- `bsck_inv_box_cnt`（double）：报损出库数量 → 经销商商品库存.报损出库数量
- `fxck_inv_box_cnt`（double）：分销出库数量 → 经销商商品库存.分销出库数量
- `dbck_inv_box_cnt`（double）：调拨出库数量 → 经销商商品库存.调拨出库数量
- `qtrk_inv_box_cnt`（double）：其他入库数量 → 经销商商品库存.其他入库数量
- `thrk_inv_box_cnt`（double）：退货入库数量 → 经销商商品库存.退货入库数量
- `cgrk_inv_box_cnt`（double）：采购入库数量 → 经销商商品库存.采购入库数量
- `dbrk_inv_box_cnt`（double）：调拨入库数量 → 经销商商品库存.调拨入库数量
- `outstock_cnt_4week`（double）：前4周出库数量 → 经销商商品库存.前4周出库数量
- `in_inv_cnt`（double）：在库库存数量 → 经销商商品库存.在库库存数量
- `on_way_cnt`（double）：在途库存数量 → 经销商商品库存.在途库存数量
- `un_dlv_inv_cnt`（double）：未发库存数量 → 经销商商品库存.未发库存数量
- `inv_cnt`（double）：总库存数量 → 经销商商品库存.总库存数量
- `outstock_amt_4week`（double）：前4周出库金额 → 经销商商品库存.前4周出库金额；经销商商品库存.分销周转天数
- `in_inv_amt`（double）：在库库存金额 → 经销商商品库存.在库库存金额
- `on_way_amt`（double）：在途库存金额 → 经销商商品库存.在途库存金额
- `un_dlv_inv_amt`（double）：未发库存金额 → 经销商商品库存.未发库存金额
- `inv_amt`（double）：总库存金额 → 经销商商品库存.总库存金额；经销商商品库存.分销周转天数
- `cmdt_target_nm`（double）：商品下月预算 → 经销商商品库存.商品下月预算
- `demand_cnt`（double）：需求订单数量 → 经销商商品库存.需求订单数量
- `demand_amt`（double）：需求订单金额 → 经销商商品库存.需求订单金额
- `stand_price`（double）：上单标准价 → 商品.所附标准上单价；经销商商品库存.上单标准价
- `contract_ctg_achv_rate_ytd`（double）：合同品类年累达成率 → 经销商商品库存.合同品类年累达成率
- `dealer_achv_rate_ytd`（double）：销售客户年累达成率 → 经销商商品库存.销售客户年累达成率

## `v_market_activity_inspire_expense_df`

未挂接本体

- `id`（bigint）：自增主键
- `ref_inspire_id`（bigint）：活动表ID
- `sale_customer_range_code`（varchar）：经销商编号
- `scope_type`（varchar）：范围类型,如org-组织
- `scope_code`（varchar）：范围ID
- `scope_name`（varchar）：范围名称
- `amount_type`（varchar）：费用类型，1-经销商自有；2-经销商毛利；3-总部费用；4-打仗费用
- `execute_month`（bigint）：执行月
- `plan_amount`（varchar）：计划金额
- `actual_amount`（varchar）：实际金额
- `bear_proportion`（varchar）：承担比例
- `subject`（varchar）：科目
- `expense_account_id`（bigint）：预留费用账户ID
- `expense_account_code`（varchar）：预留费用账户
- `dim_group_id`（bigint）：分组id，活动id+经销商编码+账户id+执行月维度

## `v_mkt_actv_inspect_result`

公司组织、办事处、大区、子门店、月度陈列项检查结果、经销商、门店、陈列项

- `execute_ym`（varchar）：执行年月 → 月度陈列项检查结果.执行年月
- `dealer_range_code`（varchar）：销售客户编码 → 经销商.销售范围编码；月度陈列项检查结果.记录销售客户编码
- `cust_range_code`（varchar）：终端客户范围编码 → 子门店.子门店编码；月度陈列项检查结果.检查子门店编码
- `dsp_code`（varchar）：陈列项编码 → 陈列项.陈列项编码；月度陈列项检查结果.检查陈列项编码
- `fin_year`（varchar）：财年 → 月度陈列项检查结果.所属财年
- `reg_code`（varchar）：区域编码 → 公司组织.组织编码；月度陈列项检查结果.记录区域编码
- `reg_name`（varchar）：区域名称 → 公司组织.组织名称；月度陈列项检查结果.记录区域名称
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；月度陈列项检查结果.记录办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；月度陈列项检查结果.记录办事处名称
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；月度陈列项检查结果.记录大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；月度陈列项检查结果.记录大区名称
- `dealer_name`（varchar）：销售客户名称 → 经销商.经销商名称；月度陈列项检查结果.记录销售客户名称
- `chl_code`（varchar）：渠道编码 → 月度陈列项检查结果.记录渠道编码
- `chl_name`（varchar）：渠道名称 → 月度陈列项检查结果.记录渠道名称
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；子门店.对应门店编码；月度陈列项检查结果.检查门店编码
- `cust_name`（varchar）：终端客户名称 → 门店.门店名称；子门店.记录所附门店名称；月度陈列项检查结果.检查门店名称
- `is_conshop`（varchar）：是否合约店 → 月度陈列项检查结果.合约店标记
- `stat_main_group`（varchar）：陈列项分类：冰柜、水堆、货架 → 陈列项.检查陈列项分类；月度陈列项检查结果.陈列项分类
- `dsp_name`（varchar）：陈列项名称 → 陈列项.陈列项名称；月度陈列项检查结果.检查陈列项名称
- `eglb_cnt`（bigint）：合格次数 → 月度陈列项检查结果.合格检查次数；月度陈列项检查结果.陈列项检查数；月度陈列项检查结果.陈列项检查合格率
- `uneglb_cnt`（bigint）：不合格次数 → 月度陈列项检查结果.不合格检查次数；月度陈列项检查结果.陈列项检查数；月度陈列项检查结果.陈列项检查合格率

## `v_mkt_budget_snapshot_df`

事业线、公司组织、办事处、大区、经销商、营销费用预算项

- `budget_row_id`（varchar）：预算主键 → 营销费用预算项.预算项标识
- `budget_view_code`（varchar）：预算主体编码：OFFICE办事处；DEALER经销商；HDQT总部 → 营销费用预算项.预算主体类型
- `budget_view_name`（varchar）：预算主体名称 → 营销费用预算项.预算主体名称
- `budget_expense_id`（varchar）：预算记录ID → 营销费用预算项.预算记录标识
- `budget_mark_code`（varchar）：预算标的展示编号：只有预算主体为经销商有值 → 营销费用预算项.预算标的展示编号
- `bsn_code`（varchar）：事业部编码 → 事业线.事业线编码；营销费用预算项.预算事业部编码
- `bsn_name`（varchar）：事业部名称 → 事业线.事业线名称；营销费用预算项.预算事业部名称
- `fin_year`（varchar）：预算所属财年 → 营销费用预算项.预算财年
- `dealer_range_code`（varchar）：销售客户销售范围编码 → 经销商.销售范围编码；营销费用预算项.预算经销商编码
- `dealer_range_name`（varchar）：销售客户名称 → 经销商.经销商名称；营销费用预算项.预算经销商名称
- `budget_project_code`（varchar）：预算项目编码 → 营销费用预算项.预算项目编码
- `budget_project_name`（varchar）：预算项目名称 → 营销费用预算项.预算项目名称
- `budget_amt`（double）：预算金额 → 营销费用预算项.费用预算金额
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；营销费用预算项.预算归属大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；营销费用预算项.预算归属大区名称
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；营销费用预算项.预算办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；营销费用预算项.预算办事处名称

## `v_mkt_cost_package_df`

业代、事业线、公司组织、办事处、员工、大区、线路、经销商、统案活动、营销活动、费用包、费用来源、陈列费用包

- `reg_code`（varchar）：区域编码 → 公司组织.组织编码；费用包.区域编码；陈列费用包.区域编码
- `reg_name`（varchar）：区域名称 → 公司组织.组织名称；费用包.区域名称；陈列费用包.区域名称
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；费用包.大区编码；陈列费用包.大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；费用包.大区名称；陈列费用包.大区名称
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；费用包.办事处编码；陈列费用包.办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；费用包.办事处名称；陈列费用包.办事处名称
- `package_dlt_id`（varchar）：费用包明细跨来源唯一键 → 费用包.分配明细标识；陈列费用包.分配明细标识
- `package_type_code`（varchar）：费用包类型编码；DISPLAY-陈列、SALES-套餐、FRESHNESS-货龄 → 费用包.费用包类型；陈列费用包.费用包类型
- `package_type_name`（varchar）：费用包类型名称 → 费用包.费用包类型名称；陈列费用包.费用包类型名称
- `source_code`（varchar）：费用来源编码 → 费用包.费用来源编码；陈列费用包.费用来源编码；费用来源.费用来源编码
- `source_name`（varchar）：费用来源名称 → 费用包.费用来源名称；陈列费用包.费用来源名称；费用来源.费用来源名称
- `batch_id`（varchar）：经销商给业代分配的年费用包批次号 → 费用包.年费用包批次号；陈列费用包.年费用包批次号
- `package_code`（varchar）：费用包编码 → 费用包.费用包编码；陈列费用包.费用包编码
- `bsn_code`（varchar）：事业线编码 → 事业线.事业线编码；费用包.事业线编码；陈列费用包.事业线编码
- `fin_year`（varchar）：费用包执行财年 → 费用包.执行财年；陈列费用包.执行财年
- `exec_start_month`（varchar）：费用包开始年月 → 费用包.开始年月；陈列费用包.开始年月
- `exec_end_month`（varchar）：费用包结束年月 → 费用包.结束年月；陈列费用包.结束年月
- `exec_month`（varchar）：执行年月 yyyyMM → 费用包.执行年月；陈列费用包.执行年月
- `package_id`（varchar）：费用包头 ID → 费用包.费用包头标识；陈列费用包.费用包头标识
- `batch_dtl_id`（varchar）：业代月度费用包批次号 → 费用包.月费用包批次号；陈列费用包.月费用包批次号
- `package_dtl_code`（varchar）：业代月度费用包编码 → 费用包.月度费用包编码；陈列费用包.月度费用包编码
- `dim_group_id`（varchar）：关联维度/分组 ID → 费用包.关联分组标识；陈列费用包.关联分组标识
- `dealer_range_code`（varchar）：销售客户范围编码 → 经销商.销售范围编码；费用包.分配客户编码；陈列费用包.分配客户编码
- `dealer_name`（varchar）：销售客户名称 → 经销商.经销商名称；费用包.分配客户名称；陈列费用包.分配客户名称
- `route_code`（varchar）：线路编码 → 线路.线路编码；费用包.分配线路编码；陈列费用包.分配线路编码
- `emp_code`（varchar）：业代编码 → 员工.员工编码；业代.员工编码；费用包.分配业代编码；陈列费用包.分配业代编码
- `emp_name`（varchar）：业代名称 → 员工.员工姓名；业代.员工姓名；费用包.分配业代名称；陈列费用包.分配业代名称
- `expen_type_code`（varchar）：费用类型编码；D-自有、U-预留 → 费用包.费用模式；陈列费用包.费用模式
- `expen_type_name`（varchar）：费用类型名称 → 费用包.费用模式名称；陈列费用包.费用模式名称
- `unity_plan_code`（varchar）：统案活动编码 → 营销活动.活动编码；营销活动.活动类型；统案活动.活动编码；统案活动.活动类型；费用包.关联统案编码；陈列费用包.关联统案编码
- `unity_plan_name`（varchar）：统案活动名称 → 营销活动.活动名称；统案活动.活动名称；费用包.关联统案名称；陈列费用包.关联统案名称
- `total_cost_amt`（double）：费用包总额/头表金额 → 费用包.费用包头总额；陈列费用包.费用包头总额
- `mon_cost_amt`（double）：当月/月度分配金额 → 费用包.月度费用包金额；陈列费用包.月度费用包金额
- `used_amt`（double）：费用包已签约金额 → 费用包.费用包使用金额；陈列费用包.费用包使用金额

## `v_mkt_dsp_actv_info_mi`

业代、主任、公司组织、办事处、员工、品类、商品、大区、子门店、线路、经销商、营销活动、门店、陈列支付卡券、陈列活动、陈列签约、陈列费用包、陈列项

- `execute_ym`（varchar）：执行年月 → 陈列签约.执行年月
- `dsp_id`（varchar）：陈列计划id → 陈列签约.签约标识
- `dsp_code`（varchar）：陈列项编码 → 陈列签约.签订陈列项编码；陈列项.陈列项编码
- `dsp_name`（varchar）：陈列项名称 → 陈列项.陈列项名称
- `actv_code`（varchar）：活动编码 → 营销活动.活动编码；营销活动.活动类型；陈列活动.活动编码；陈列活动.活动类型；陈列签约.签约活动编码
- `actv_name`（varchar）：活动名称 → 营销活动.活动名称；陈列活动.活动名称
- `start_date`（varchar）：活动开始时间 → 营销活动.活动开始时间；陈列活动.活动开始时间；陈列签约.签约活动开始时间
- `end_date`（varchar）：活动结束时间 → 营销活动.活动结束时间；陈列活动.活动结束时间；陈列签约.签约活动结束时间
- `dsp_clfc_code`（varchar）：陈列类目编码 → 陈列签约.陈列类目编码；陈列项.陈列类目编码
- `dsp_clfc_name`（varchar）：陈列类目名称 → 陈列签约.陈列类目；陈列项.陈列类目名称
- `dsp_type_name`（varchar）：签订陈列项类型名称 → 陈列签约.陈列项类型；陈列项.签约陈列项类型
- `biz_status_name`（varchar）：业务状态1-正常 → 陈列签约.业务状态
- `ctg_code`（varchar）：品类编码 → 品类.品类编码；陈列签约.签约品类编码
- `ctg_name`（varchar）：品类名称 → 品类.品类名称
- `dealer_range_code`（varchar）：销售客户编码 → 经销商.销售范围编码；陈列签约.所属销售客户编码
- `dealer_name`（varchar）：销售客户名称 → 经销商.经销商名称
- `dealer_sap_code`（varchar）：销售客户sap编码 → 经销商.SAP客户编码
- `dealer_type_code`（varchar）：销售客户类型编码 → 经销商.销售客户类型编码
- `dealer_type_name`（varchar）：销售客户类型名称 → 经销商.销售客户类型
- `serv_dealer_range_code`（varchar）：服务经销商NF编码 → 经销商.销售范围编码；陈列签约.服务经销商编码
- `serv_dealer_range_name`（varchar）：服务经销商名称 → 经销商.经销商名称
- `p_dealer_range_code`（varchar）：上游销售客户编码 → 经销商.销售范围编码；陈列签约.上游销售客户编码
- `p_dealer_range_name`（varchar）：上游销售客户名称 → 经销商.经销商名称
- `reg_code`（varchar）：行政区域编码 → 公司组织.组织编码；陈列签约.行政区域编码
- `reg_name`（varchar）：行政区域名称 → 公司组织.组织名称
- `dis_code`（varchar）：行政大区编码 → 公司组织.组织编码；大区.组织编码；陈列签约.行政大区编码
- `dis_name`（varchar）：行政大区名称 → 公司组织.组织名称；大区.组织名称
- `off_code`（varchar）：行政办事处编码 → 公司组织.组织编码；办事处.组织编码；陈列签约.行政办事处编码
- `off_name`（varchar）：行政办事处名称 → 公司组织.组织名称；办事处.组织名称
- `cust_range_code`（varchar）：终端客户范围编码 → 子门店.子门店编码；陈列签约.签约子门店编码
- `cust_code`（varchar）：门店编码 → 门店.门店编码；子门店.对应门店编码；陈列签约.签约门店编码
- `cust_name`（varchar）：门店名称 → 门店.门店名称；子门店.记录所附门店名称
- `chl_code`（varchar）：渠道编码(子渠道编码) → 子门店.子渠道编码
- `chl_name`（varchar）：渠道名称 → 子门店.子渠道
- `p_chl_code`（varchar）：渠道编码
- `p_chl_name`（varchar）：渠道名称
- `p2_chl_code`（varchar）：渠道群编码 → 子门店.渠道群编码
- `p2_chl_name`（varchar）：渠道群名称 → 子门店.渠道群
- `level_name`（varchar）：终端客户等级名称 → 门店.门店等级；子门店.记录所附门店等级
- `mkt_level_name`（varchar）：市场层级名称 → 门店.市场级别；子门店.记录所附市场层级
- `is_ydt_name`（varchar）：是否一店通 → 门店.一店通标记名称；陈列签约.门店一店通标记
- `tx_code`（varchar）：条系编码 → 门店.条系编码
- `tx_name`（varchar）：条系名称 → 门店.条系
- `sign_emp_code`（varchar）：签约业代编码 → 员工.员工编码；业代.员工编码；陈列签约.签约业代编码
- `sign_emp_name`（varchar）：签约业代名称 → 员工.员工姓名；业代.员工姓名
- `emp_code`（varchar）：门店所属业代编码 → 子门店.负责业代编码；员工.员工编码；业代.员工编码；陈列签约.门店所属业代编码
- `emp_name`（varchar）：门店所属业代名称 → 子门店.负责业代姓名；员工.员工姓名；业代.员工姓名
- `p_emp_code`（varchar）：主任编码 → 子门店.负责主任编码；员工.员工编码；业代.对应主任编码；主任.员工编码；陈列签约.所属主任编码
- `p_emp_name`（varchar）：主任名称 → 子门店.负责主任姓名；员工.员工姓名；业代.对应主任姓名；主任.员工姓名
- `route_code`（varchar）：线路号 → 子门店.业代服务线路编码；线路.线路编码；陈列签约.所属线路编码
- `is_conshop_name`（varchar）：是否合约店 → 陈列签约.资料合约店标记
- `acty_spec_name`（varchar）：活动规格名称 → 陈列签约.约定规格
- `spec_cnt`（double）：规格数量 → 陈列签约.规格数量
- `acty_unit_name`（varchar）：活动单位名称 → 陈列签约.约定单位
- `unit_cnt`（double）：单位数量 → 陈列签约.单位数量
- `dsp_position`（varchar）：陈列位置 → 陈列签约.约定陈列位置
- `sign_type_name`（varchar）：签订陈列类型名称 → 陈列签约.签约类型
- `expen_type_name`（varchar）：费用类型名称 → 陈列签约.签约费用类型
- `fin_target_amt`（double）：年销售目标金额（门店） → 陈列签约.门店年度销售目标金额
- `dist_ord_amt_mtd`（double）：分销金额(月门店) → 陈列签约.门店当月分销金额
- `conshop_sign_rate`（double）：合约店签约费率 → 陈列签约.合约店签约费率
- `conshop_avg_amt`（double）：合约店月均费用 → 陈列签约.合约店月均费用
- `conshop_sign_amt`（double）：合约店签约总金额 → 陈列签约.合约店签约总金额
- `sign_amt`（double）：签约金额 → 陈列签约.签约金额
- `check_datetime`（varchar）：检查时间 → 陈列签约.检查时间
- `is_photo_name`（varchar）：是否拍照 → 陈列签约.拍照标记
- `check_result_name`（varchar）：检查结果名称 → 陈列签约.陈列检查结果
- `img_dsp_result_name`（varchar）：图像识别结果名称 → 陈列签约.图像识别结果
- `freezer_verify_name`（varchar）：冰柜验证结果 → 陈列签约.冰柜验证结果
- `execute_cnt`（bigint）：执行次数 → 陈列签约.月度执行次数
- `img_elgb_cnt`（bigint）：图像识别合格次数 → 陈列签约.图像识别合格次数
- `is_dsp_elgb`（varchar）：活动最终是否合格 → 陈列签约.月度最终合格标记
- `dsp_pay_mthd`（varchar）：陈列支付方式 → 陈列签约.陈列支付方式
- `dealer_cmdt_box_price`（varchar）：经销商上单价 → 陈列签约.经销商上单价
- `cpn_code`（varchar）：关联卡券编码 → 陈列签约.关联支付卡券编码；陈列支付卡券.卡券编码
- `cpn_name`（varchar）：关联卡券名称 → 陈列支付卡券.卡券名称
- `cpn_type_name`（varchar）：卡券类型名称 → 陈列签约.关联卡券类型；陈列支付卡券.卡券类型
- `cpn_cmdt_name`（varchar）：商品名称 → 商品.商品名称；陈列签约.卡券关联商品名称；陈列支付卡券.关联商品名称
- `cpn_ctg_name`（varchar）：品类名称 → 商品.品类名称；品类.品类名称；陈列签约.卡券关联品类名称；陈列支付卡券.关联商品品类
- `confirm_amt`（double）：确认金额 → 陈列签约.月度确认金额
- `confirm_amt_user`（varchar）：确认金额调整人 → 陈列签约.确认金额调整人
- `confirm_amt_datetime`（varchar）：确认金额调整时间 → 陈列签约.确认金额调整时间
- `confirm_amt_note`（varchar）：确认金额调整备注 → 陈列签约.确认金额调整备注
- `verify_dtl_id`（varchar）：核销明细id → 陈列签约.核销明细引用标识
- `dsp_verify_price_amt`（double）：陈列核销价金额 → 陈列签约.陈列核销价金额
- `etl_load_time`（varchar）：ETL时间
- `emp_input_result_cnt`（int）：陈列项结果被修改次数 → 陈列签约.结果修改次数
- `check_type_code`（varchar）：陈列检查类型编码 → 陈列签约.检查类型编码
- `check_type_name`（varchar）：陈列检查类型名称 → 陈列签约.检查类型
- `cust_is_conshop_name`（int）：门店是否合约店 → 陈列签约.门店合约店标记
- `dsp_rtc_amt`（double）：陈列标线金额 → 陈列签约.陈列标线金额
- `dsp_avg_amt`（double）：陈列均值金额 → 陈列签约.陈列均值金额
- `cust_dis_code`（varchar）：门店大区编码 → 公司组织.组织编码；大区.组织编码；陈列签约.门店大区编码
- `cust_dis_name`（varchar）：门店大区名称 → 公司组织.组织名称；大区.组织名称
- `ref_cost_package_id`（varchar）：费用包id，如果ref_sign_type=CP则与ref_sign_type_id相同，market_cost_package.id → 陈列签约.陈列费用包引用标识；陈列费用包.费用包头标识

## `v_mkt_dsp_execute_mi`

业代、主任、公司组织、办事处、员工、品类、大区、线路、经销商、营销活动、门店、门店陈列执行统计、陈列活动、陈列项

- `ymd`（datetime）：统计日期 → 门店陈列执行统计.统计日期
- `route_code`（varchar）：业代线路号 → 线路.线路编码；门店陈列执行统计.记录业代线路号
- `cust_name`（varchar）：终端客户 → 门店.门店名称；门店陈列执行统计.记录门店名称
- `lhy_std_pos_name`（varchar）：理货员基准岗 → 员工.基准岗名称；门店陈列执行统计.记录理货员基准岗
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；门店陈列执行统计.执行门店编码
- `emp_name`（varchar）：业代 → 员工.员工姓名；业代.员工姓名；门店陈列执行统计.记录业代姓名
- `is_conshop`（varchar）：是否合约店 → 门店陈列执行统计.记录合约店标记
- `dealer_range_code`（varchar）：销售客户编码 → 经销商.销售范围编码；门店陈列执行统计.记录销售客户编码
- `dealer_sap_code`（varchar）：销售客户SAP编码 → 经销商.SAP客户编码；门店陈列执行统计.记录销售客户SAP编码
- `lhy_route_code`（varchar）：理货员线路号 → 线路.线路编码；门店陈列执行统计.记录理货员线路号
- `lhy_emp_name`（varchar）：理货员 → 员工.员工姓名；门店陈列执行统计.记录理货员姓名
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；门店陈列执行统计.记录办事处编码
- `off_name`（varchar）：办事处 → 公司组织.组织名称；办事处.组织名称；门店陈列执行统计.记录办事处名称
- `dsp_clfc_name`（varchar）：陈列类目 → 陈列项.陈列类目名称；门店陈列执行统计.陈列类目
- `p_emp_name`（varchar）：主任 → 员工.员工姓名；业代.对应主任姓名；主任.员工姓名；门店陈列执行统计.记录主任姓名
- `sub_chl_name`（varchar）：子渠道 → 门店陈列执行统计.记录子渠道
- `is_free`（varchar）：是否付费门店 → 门店陈列执行统计.记录付费门店标记
- `ctg_name`（varchar）：品类 → 品类.品类名称；门店陈列执行统计.执行品类名称
- `zx_actv_code`（varchar）：专项活动编码 → 营销活动.活动编码；营销活动.活动类型；陈列活动.活动编码；陈列活动.活动类型；门店陈列执行统计.专项活动编码
- `p2_chl_name`（varchar）：渠道群 → 门店陈列执行统计.记录渠道群
- `lhy_emp_code`（varchar）：理货员编码 → 员工.员工编码；门店陈列执行统计.记录理货员编码
- `dsp_form_name`（varchar）：陈列项 → 陈列项.陈列项名称；门店陈列执行统计.陈列项名称
- `dsp_form_code`（varchar）：陈列项编码 → 陈列项.陈列项编码；门店陈列执行统计.陈列项编码
- `dis_name`（varchar）：大区 → 公司组织.组织名称；大区.组织名称；门店陈列执行统计.记录大区名称
- `emp_code`（varchar）：业代编码 → 员工.员工编码；业代.员工编码；门店陈列执行统计.记录业代编码
- `dealer_name`（varchar）：销售客户 → 经销商.经销商名称；门店陈列执行统计.记录销售客户名称
- `reg_name`（varchar）：区域 → 公司组织.组织名称；门店陈列执行统计.记录区域名称
- `cust_level_name`（varchar）：终端客户等级 → 门店.门店等级；门店陈列执行统计.记录门店等级
- `flg`（int）：活动类型 → 门店陈列执行统计.活动类型
- `execute_ym`（varchar）：年月 → 门店陈列执行统计.执行年月
- `std_pos_name`（varchar）：业代基准岗 → 员工.基准岗名称；业代.基准岗名称；门店陈列执行统计.记录业代基准岗
- `mkt_level_name`（varchar）：市场层级 → 门店.市场级别；门店陈列执行统计.记录市场层级
- `is_ydt`（varchar）：是否一店通 → 门店.一店通标记编码；门店陈列执行统计.记录一店通标记
- `dealer_type_name`（varchar）：销售客户类型 → 经销商.销售客户类型；门店陈列执行统计.记录销售客户类型
- `dd_exec_act_times`（double）：地堆个数 → 门店陈列执行统计.地堆执行个数
- `dd_act_exec_nums`（double）：地堆卡板数 → 门店陈列执行统计.地堆卡板数
- `bdh_load_cnt_2`（double）：客户冰柜冰冻化上传次数 → 门店陈列执行统计.客户冰柜冰冻化上传次数
- `sd_exec_act_times`（double）：水堆个数 → 门店陈列执行统计.水堆执行个数
- `free_bdh_hg_cnt`（int）：我司冰柜免费冰冻化合格次数 → 门店陈列执行统计.我司冰柜免费冰冻化合格次数
- `bdh_bottles_cnt`（double）：我司冰柜冰冻化层数 → 门店陈列执行统计.我司冰柜冰冻化层数
- `hj_exec_act_hg_times`（bigint）：货架合格次数 → 门店陈列执行统计.货架合格次数
- `sd_load_cnt`（double）：水堆上传次数 → 门店陈列执行统计.水堆上传次数
- `conv_load_cnt`（double）：常规陈列上传次数 → 门店陈列执行统计.常规陈列上传次数
- `hj_exec_act_times`（double）：货架个数 → 门店陈列执行统计.货架执行个数
- `free_bdh_hg_dcnt`（int）：我司冰柜免费冰冻化合格个数 → 门店陈列执行统计.我司冰柜免费冰冻化合格个数
- `bdh_bottles_cnt_2`（double）：客户冰柜冰冻化层数 → 门店陈列执行统计.客户冰柜冰冻化层数
- `free_bdh_hg_cnt_2`（int）：客户冰柜免费冰冻化合格次数 → 门店陈列执行统计.客户冰柜免费冰冻化合格次数
- `zx_load_cnt`（double）：专项活动上传次数 → 门店陈列执行统计.专项活动上传次数
- `sd_act_exec_nums`（double）：水堆箱数 → 门店陈列执行统计.水堆箱数
- `hhd_load_cnt`（double）：混合堆上传次数 → 门店陈列执行统计.混合堆上传次数
- `free_bdh_hg_dcnt_2`（int）：客户冰柜免费冰冻化合格个数 → 门店陈列执行统计.客户冰柜免费冰冻化合格个数
- `zx_img_check_hg_cnt`（double）：专项活动合格次数 → 门店陈列执行统计.专项活动合格次数
- `bdh_exec_act_times`（double）：我司冰柜冰冻化个数 → 门店陈列执行统计.我司冰柜冰冻化个数
- `bdh_exec_act_hg_times`（bigint）：我司冰柜冰冻化合格次数 → 门店陈列执行统计.我司冰柜冰冻化合格次数
- `hhd_exec_act_hg_times`（bigint）：混合堆合格次数 → 门店陈列执行统计.混合堆合格次数
- `hj_load_cnt`（double）：货架上传次数 → 门店陈列执行统计.货架上传次数
- `bdh_exec_act_times_2`（double）：客户冰柜冰冻化个数 → 门店陈列执行统计.客户冰柜冰冻化个数
- `zx_exec_nums`（double）：专项活动执行数量 → 门店陈列执行统计.专项活动执行数量
- `hhd_act_exec_nums`（double）：混合堆箱数 → 门店陈列执行统计.混合堆箱数
- `hj_act_exec_nums`（double）：货架层数 → 门店陈列执行统计.货架层数
- `yld_exec_act_hg_times`（bigint）：饮料堆合格次数 → 门店陈列执行统计.饮料堆合格次数
- `yld_act_exec_nums`（double）：饮料堆箱数 → 门店陈列执行统计.饮料堆箱数
- `zx_exec_nums_mtd`（double）：专项活动执行数量(累计) → 门店陈列执行统计.专项活动累计执行数量
- `bdh_exec_act_hg_times_2`（bigint）：客户冰柜冰冻化合格次数 → 门店陈列执行统计.客户冰柜冰冻化合格次数
- `dd_load_cnt`（double）：地堆上传次数 → 门店陈列执行统计.地堆上传次数
- `conv_dsp_exec_nums`（double）：常规陈列执行数量 → 门店陈列执行统计.常规陈列执行数量
- `sd_exec_act_hg_times`（bigint）：水堆合格次数 → 门店陈列执行统计.水堆合格次数
- `hhd_exec_act_times`（double）：混合堆个数 → 门店陈列执行统计.混合堆执行个数
- `yld_load_cnt`（double）：饮料堆上传次数 → 门店陈列执行统计.饮料堆上传次数
- `bdh_load_cnt`（double）：我司冰柜冰冻化上传次数 → 门店陈列执行统计.我司冰柜冰冻化上传次数
- `zx_img_check_bhg_cnt`（double）：专项活动不合格次数 → 门店陈列执行统计.专项活动不合格次数
- `dd_exec_act_hg_times`（bigint）：地堆合格次数 → 门店陈列执行统计.地堆合格次数
- `yld_exec_act_times`（double）：饮料堆个数 → 门店陈列执行统计.饮料堆执行个数

## `v_mkt_expen_src_dtl_df`

事业线、费用来源

- `fin_year`（varchar）：财年 → 费用来源.来源财年
- `expen_code`（varchar）：费用编号 Q 渠道 S 市场 → 费用来源.费用来源编码
- `expen_sub_type_code`（varchar）：费用类型 1 渠道 3 市场 → 费用来源.费用类型编码
- `expen_sub_type_name`（varchar）：费用类型 1 渠道 3 市场 → 费用来源.费用类型名称
- `expen_unity_code`（varchar）：费用出处 0 自主费用 1 战 略费用 2 大区预留 → 费用来源.费用出处编码
- `expen_unity_name`（varchar）：费用出处 0 自主费用 1 战 略费用 2 大区预留 → 费用来源.费用出处名称
- `is_own_code`（varchar）：是否自有额度 0 否 1 是 → 费用来源.自有额度标记
- `is_own_name`（varchar）：是否自有额度 0 否 1 是 → 费用来源.自有额度标记名称
- `expen_src_name`（varchar）：费用来源名称 → 费用来源.费用来源名称
- `start_datetime`（varchar）：开始时间 → 费用来源.使用开始时间
- `end_datetime`（varchar）：结束时间 → 费用来源.使用结束时间
- `expen_src_status_code`（varchar）：费用来源费用状态, 1-启用, 2-终止 → 费用来源.来源状态编码
- `expen_src_status_name`（varchar）：费用来源状态, 1-启用, 2-终止 → 费用来源.来源状态名称
- `bsn_code`（varchar）：事业线 → 事业线.事业线编码；费用来源.事业线编码
- `create_user`（varchar）：创建人名称
- `create_datetime`（varchar）：创建时间
- `update_user`（varchar）：更新人名称
- `update_datetime`（varchar）：更新时间
- `data_status_code`（varchar）：数据状态 → 费用来源.配置数据状态编码
- `data_status_name`（varchar）：数据状态 → 费用来源.配置数据状态名称
- `etl_time`（varchar）：etl时间

## `v_mkt_market_actv_plan_verify_cost`

SKU、公司组织、分销套餐、办事处、品类、商品、大区、子门店、活动计划明细、经销商、营销活动、门店、陈列活动、陈列项、预留费用账户

- `execute_ym`（varchar）：执行年月 → 活动计划明细.执行年月
- `plan_dtl_id`（varchar）：活动明细id → 活动计划明细.计划明细标识
- `fin_year`（varchar）：财年 → 活动计划明细.费用财年
- `reg_code`（varchar）：区域编码 → 公司组织.组织编码；活动计划明细.计划归属区域编码
- `reg_name`（varchar）：区域名称 → 公司组织.组织名称；活动计划明细.计划归属区域名称
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；活动计划明细.计划归属办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；活动计划明细.计划归属办事处名称
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；活动计划明细.计划归属大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；活动计划明细.计划归属大区名称
- `plan_id`（varchar）：计划唯一标识 → 陈列活动.计划头标识；分销套餐.套餐内部标识；活动计划明细.所属计划标识
- `plan_code`（varchar）：计划编码 → 营销活动.活动编码；陈列活动.活动编码；分销套餐.活动编码；活动计划明细.所属计划编码
- `plan_name`（varchar）：计划名称 → 营销活动.活动名称；陈列活动.活动名称；分销套餐.活动名称；活动计划明细.所属计划名称
- `actv_type_code`（varchar）：活动类型编码 → 陈列活动.活动类型编码；分销套餐.套餐类型编码；活动计划明细.活动类型编码
- `actv_type_name`（varchar）：活动类型名称 → 营销活动.活动类型；陈列活动.活动类型；分销套餐.活动类型；活动计划明细.活动类型名称
- `start_date`（varchar）：活动开始时间 → 营销活动.活动开始时间；陈列活动.活动开始时间；分销套餐.活动开始时间；活动计划明细.所属活动开始时间
- `end_date`（varchar）：活动结束时间 → 营销活动.活动结束时间；陈列活动.活动结束时间；分销套餐.活动结束时间；活动计划明细.所属活动结束时间
- `termination_date`（varchar）：活动终止日期 → 陈列活动.活动终止日期；分销套餐.套餐终止日期；活动计划明细.所属活动终止日期
- `actv_stage_name`（varchar）：活动阶段 → 陈列活动.计划活动阶段；分销套餐.套餐活动阶段；活动计划明细.记录活动阶段
- `execute_object_grain`（varchar）：执行对象粒度 → 活动计划明细.执行对象粒度
- `execute_object_code`（varchar）：执行对象编码 → 活动计划明细.执行对象编码
- `expen_type_code`（varchar）：费用类型编码 → 活动计划明细.费用类型编码
- `expen_type_name`（varchar）：费用类型名称 → 活动计划明细.费用类型名称
- `dealer_range_code`（varchar）：销售客户编码 → 经销商.销售范围编码；活动计划明细.关联销售客户编码
- `dealer_name`（varchar）：销售客户名称 → 经销商.经销商名称；活动计划明细.关联销售客户名称
- `chl_code`（varchar）：渠道编码 → 活动计划明细.记录渠道编码
- `chl_name`（varchar）：渠道名称 → 活动计划明细.记录渠道名称
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；子门店.对应门店编码；活动计划明细.关联门店编码
- `cust_name`（varchar）：终端客户名称 → 门店.门店名称；子门店.记录所附门店名称；活动计划明细.关联门店名称
- `cust_range_code`（varchar）：终端客户范围编码 → 子门店.子门店编码；活动计划明细.关联子门店编码
- `plan_cmpy_bear_ratio`（varchar）：我司计划承担比例 → 活动计划明细.我司计划承担比例
- `actul_cmpy_bear_raito`（varchar）：我司实际承担比例 → 活动计划明细.我司实际承担比例
- `mkting_type_code`（varchar）：营销类型：3-市场费用 5-水专项费用 → 活动计划明细.营销类型编码
- `mkting_type_name`（varchar）：营销类型名称 → 活动计划明细.营销类型名称
- `dim_group_id`（varchar）：关联主活动维度分组(核销关联ID) → 活动计划明细.核销关联分组标识
- `expen_src_code`（varchar）：费用账户编码 → 活动计划明细.费用账户引用编码
- `acct_code`（varchar）：钱包归属预留账户编码 → 活动计划明细.钱包归属预留账户编码；预留费用账户.预留账户编码
- `project_name`（varchar）：活动项目/项目 → 活动计划明细.活动项目
- `subject_code`（varchar）：费用项目/科目编码 → 活动计划明细.费用科目编码
- `subject_name`（varchar）：费用项目/科目 → 活动计划明细.费用科目名称
- `supt_dpmt_code`（varchar）：支持部门编码 → 公司组织.组织编码；活动计划明细.支持部门编码
- `supt_dpmt_name`（varchar）：支持部门名称 → 公司组织.组织名称；活动计划明细.支持部门名称
- `aprv_status_code`（varchar）：审批状态编码 → 陈列活动.计划审批状态编码；分销套餐.套餐审批状态编码；活动计划明细.审批状态编码
- `aprv_status_name`（varchar）：审批状态名称 → 陈列活动.计划审批状态名称；分销套餐.套餐审批状态；活动计划明细.审批状态名称
- `aprv_id`（varchar）：流程审批ID → 陈列活动.计划审批流程标识；分销套餐.关联审批流程标识；活动计划明细.审批流程标识
- `plan_status_code`（varchar）：计划状态1-有效 0-无效 → 陈列活动.计划有效状态编码；分销套餐.套餐计划状态编码；活动计划明细.计划有效性编码
- `plan_status_name`（varchar）：计划状态1-有效 0-无效 → 陈列活动.计划有效状态名称；分销套餐.套餐计划状态；活动计划明细.计划有效性名称
- `payable_confirm_datetime`（varchar）：应发确认日期 → 活动计划明细.应发确认时间
- `confirm_datetime_min`（varchar）：最早费用确认日期 → 活动计划明细.最早费用确认时间
- `confirm_datetime_max`（varchar）：最晚费用确认日期 → 活动计划明细.最晚费用确认时间
- `verify_datetime_min`（varchar）：最早核销日期 → 活动计划明细.最早核销时间
- `verify_datetime_max`（varchar）：最晚核销日期 → 活动计划明细.最晚核销时间
- `create_datetime`（varchar）：活动创建时间 → 陈列活动.计划创建时间；分销套餐.套餐创建时间
- `create_user`（varchar）：活动创建人 → 陈列活动.计划创建人；分销套餐.套餐创建人
- `update_datetime`（varchar）：更新时间
- `update_user`（varchar）：活动创更新人
- `cmdt_code`（varchar）：商品编码 → 商品.商品编码；活动计划明细.涉及商品编码
- `cmdt_name`（varchar）：商品名称 → 商品.商品名称；活动计划明细.涉及商品名称
- `sku_code`（varchar）：sku编码 → 商品.所属SKU编码；SKU.SKU编码；活动计划明细.涉及SKU编码
- `sku_name`（varchar）：sku名称 → 商品.所属SKU名称；SKU.SKU名称；活动计划明细.涉及SKU名称
- `spec_code`（varchar）：规格 → 活动计划明细.记录规格
- `unity_alloc_id`（varchar）：统案id → 活动计划明细.统案引用标识
- `plan_amt`（double）：计划金额 → 活动计划明细.记录计划金额
- `impl_amt`（double）：实施金额 → 活动计划明细.记录实施金额
- `ass_amt`（double）：市场考核金额 → 活动计划明细.市场考核金额
- `estm_amt`（double）：预估金额 → 活动计划明细.营销费用预估金额
- `confirm_amt`（double）：市场确认金额 → 活动计划明细.记录确认金额
- `verify_amt`（double）：市场核销金额 → 活动计划明细.核销金额；活动计划明细.核销金额含清算；活动计划明细.核销完成率
- `wait_verify_amt`（double）：市场待核销金额 → 活动计划明细.待核销金额；活动计划明细.核销完成率
- `non_verify_amt`（double）：市场额度不足未核销金额 → 活动计划明细.额度不足未核销金额
- `retn_discount_amt`（double）：市场返还折扣金额 → 活动计划明细.返还折扣金额
- `check_verify_amt`（double）：清算金额 → 活动计划明细.陈列清算金额；活动计划明细.核销金额含清算
- `discount_rate`（double）：折扣力度（分销套餐） → 活动计划明细.套餐折扣力度
- `sign_type_code`（varchar）：陈列签约类型 → 活动计划明细.陈列签约类型编码
- `sub_item_code`（varchar）：活动子项编码（陈列活动的陈列项编码） → 活动计划明细.活动子项编码；陈列项.陈列项编码
- `sub_item_name`（varchar）：活动子项名称（陈列活动的陈列项名称） → 活动计划明细.活动子项名称；陈列项.陈列项名称
- `ctg_code`（varchar）：品类编码 → 商品.品类编码；品类.品类编码；活动计划明细.涉及品类编码
- `ctg_name`（varchar）：品类名称 → 商品.品类名称；品类.品类名称；活动计划明细.涉及品类名称

## `v_mkt_media_plan_dtl_df`

未挂接本体

- `plan_id`（varchar）：媒介计划明细id
- `plan_dtl_id`（varchar）：计划明细id
- `plan_code`（varchar）：媒介计划名称
- `plan_name`（varchar）：媒介计划编码
- `plan_start_date`（varchar）：计划开始日期
- `plan_end_date`（varchar）：计划结束日期
- `plan_dtl_start_date`（varchar）：计划明细开始日期
- `plan_dtl_end_date`（varchar）：计划明细结束日期
- `execute_ym`（varchar）：执行年月，取开始时间，更新数据为原始数据开始时间
- `plan_content`（varchar）：活动内容
- `acct_id`（varchar）：账户id
- `ctg_code`（varchar）：品类编码
- `ctg_name`（varchar）：品类
- `matrl_subject`（varchar）：素材版本主题
- `expense_type_name`（varchar）：媒介费用类型
- `expense_scope_name`（varchar）：媒介费用范围
- `media_push_type_name`（varchar）：媒介投放类型
- `supplier_code`（varchar）：供应商编码
- `supplier_name`（varchar）：供应商
- `supplier_level_name`（varchar）：供应商等级
- `big_ctg_name`（varchar）：媒介大类
- `medium_ctg_name`（varchar）：媒介中类
- `small_ctg_name`（varchar）：媒介小类
- `tiny_ctg_name`（varchar）：媒介细类编码（字典），硬广、软广、赞助、授权、植入、直播、项目、其他,
- `plan_amt`（double）：计划金额
- `plan_amt_dtl`（double）：计划明细金额
- `chrg_unit`（double）：计价单位
- `pur_qty_total`（double）：采购数量
- `pur_price`（double）：采购单价
- `is_provide_prd_name`（varchar）：是否提供产品，1-是，0-否
- `prd_amt`（double）：产品金额
- `pred_exposure`（bigint）：预估曝光量
- `pred_interactive`（bigint）：预估互动量
- `pred_click`（bigint）：预估点击量
- `contact_code`（varchar）：合同号
- `tax_rate`（double）：税率
- `verify_amt`（double）：核销金额
- `wait_verify_amt`（double）：未核销金额
- `aprv_status_name`（varchar）：审批状态，approving-审批中、agree-审批完成、refuse-审批拒绝
- `biz_status_name`（varchar）：业务状态 -1-新建，0-未开始，1-进行中，2-已结束
- `verify_status_name`（varchar）：核销状态
- `supt_org_name`（varchar）：支持部门
- `subject_name`（varchar）：费用项目
- `plan_create_user`（varchar）：计划创建人
- `commit_user_name`（varchar）：提报人名称，拼接公司岗位等
- `create_datetime`（varchar）：创建时间
- `verify_user_code`（varchar）：核销创建人
- `launch_scope_name`（varchar）：投放范围
- `fact_amt_dtl`（double）：实施明细金额
- `bsn_code`（varchar）
- `bsn_name`（varchar）

## `v_mkt_package_cust_cost_mi`

公司组织、分销套餐、办事处、商品、大区、套餐门店执行费用、活动计划明细、经销商、营销活动、门店

- `execute_ym`（varchar）：执行年月 → 活动计划明细.执行年月；套餐门店执行费用.执行年月
- `fin_year`（varchar）：财年 → 套餐门店执行费用.费用财年
- `reg_code`（varchar）：区域编码 → 公司组织.组织编码；套餐门店执行费用.执行归属区域编码
- `reg_name`（varchar）：区域名称 → 公司组织.组织名称；套餐门店执行费用.执行归属区域
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；套餐门店执行费用.执行归属大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；套餐门店执行费用.执行归属大区
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；套餐门店执行费用.执行归属办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；套餐门店执行费用.执行归属办事处
- `plan_dtl_id`（varchar）：活动明细id → 活动计划明细.计划明细标识；套餐门店执行费用.计划明细标识
- `plan_code`（varchar）：计划编码 → 营销活动.活动编码；分销套餐.活动编码；活动计划明细.所属计划编码；套餐门店执行费用.套餐计划编码
- `plan_name`（varchar）：计划名称 → 营销活动.活动名称；分销套餐.活动名称；活动计划明细.所属计划名称；套餐门店执行费用.套餐计划名称
- `actv_type_code`（varchar）：活动类型编码 → 分销套餐.套餐类型编码；活动计划明细.活动类型编码；套餐门店执行费用.套餐活动类型编码
- `actv_type_name`（varchar）：活动类型名称 → 营销活动.活动类型；分销套餐.活动类型；活动计划明细.活动类型名称；套餐门店执行费用.套餐活动类型
- `start_date`（varchar）：活动开始时间 → 营销活动.活动开始时间；分销套餐.活动开始时间；活动计划明细.所属活动开始时间；套餐门店执行费用.套餐活动开始时间
- `end_date`（varchar）：活动结束时间 → 营销活动.活动结束时间；分销套餐.活动结束时间；活动计划明细.所属活动结束时间；套餐门店执行费用.套餐活动结束时间
- `termination_date`（varchar）：活动终止日期 → 分销套餐.套餐终止日期；活动计划明细.所属活动终止日期；套餐门店执行费用.套餐活动终止日期
- `execute_object_grain`（varchar）：执行对象粒度 → 活动计划明细.执行对象粒度；套餐门店执行费用.执行对象粒度
- `execute_object_code`（varchar）：执行对象编码 → 活动计划明细.执行对象编码；套餐门店执行费用.执行对象编码
- `expen_type_code`（varchar）：费用类型编码 → 套餐门店执行费用.费用类型编码
- `expen_type_name`（varchar）：费用类型名称 → 套餐门店执行费用.费用类型
- `dealer_range_code`（varchar）：销售客户编码 → 经销商.销售范围编码；套餐门店执行费用.执行销售客户编码
- `dealer_name`（varchar）：销售客户名称 → 经销商.经销商名称；套餐门店执行费用.执行销售客户名称
- `chl_code`（varchar）：渠道编码 → 套餐门店执行费用.渠道编码
- `chl_name`（varchar）：渠道名称 → 套餐门店执行费用.渠道名称
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；套餐门店执行费用.执行门店编码
- `cust_name`（varchar）：终端客户名称 → 门店.门店名称；套餐门店执行费用.执行门店名称
- `expen_src_code`（varchar）：费用账户编码 → 套餐门店执行费用.费用账户编码
- `subject_code`（varchar）：费用项目/科目编码 → 套餐门店执行费用.费用科目编码
- `subject_name`（varchar）：费用项目/科目 → 套餐门店执行费用.费用科目
- `supt_dpmt_code`（varchar）：支持部门编码 → 公司组织.组织编码；套餐门店执行费用.支持部门编码
- `supt_dpmt_name`（varchar）：支持部门名称 → 公司组织.组织名称；套餐门店执行费用.支持部门
- `cmdt_code`（varchar）：商品编码 → 商品.商品编码；套餐门店执行费用.执行商品编码
- `cmdt_name`（varchar）：商品名称 → 商品.商品名称；套餐门店执行费用.执行商品名称
- `gift_amt`（double）：赠品金额 → 套餐门店执行费用.赠品分摊金额（含税）
- `ws_bear_impl_amt`（double）：我司承担实施金额 → 套餐门店执行费用.我司承担实施金额
- `ws_bear_confirm_amt`（double）：我司承担确认金额 → 套餐门店执行费用.我司承担确认金额
- `wait_verify_amt`（double）：待核销金额 → 套餐门店执行费用.待核销金额；套餐门店执行费用.核销完成率
- `verify_amt`（double）：核销金额 → 套餐门店执行费用.核销金额；套餐门店执行费用.核销完成率

## `v_mkt_shdz_sink_dtl_df`

公司组织、分销套餐、分销订单行、办事处、商品、大区、搭赠下沉明细、经销商、营销活动、虚假分销订单行、随货搭赠活动

- `stat_month`（varchar）：年月 → 搭赠下沉明细.记录年月
- `reg_code`（varchar）：区域编码 → 公司组织.组织编码；搭赠下沉明细.记录区域编码
- `reg_name`（varchar）：区域名称 → 公司组织.组织名称；搭赠下沉明细.记录区域名称
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；搭赠下沉明细.下沉大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；搭赠下沉明细.下沉大区名称
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；搭赠下沉明细.下沉办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；搭赠下沉明细.下沉办事处名称
- `dealer_range_code`（varchar）：销售客户（经销商）编码 → 经销商.销售范围编码；搭赠下沉明细.执行经销商范围编码
- `dealer_sap_code`（varchar）：所属经销商SAP编码 → 经销商.SAP客户编码；搭赠下沉明细.记录经销商SAP编码
- `dealer_name`（varchar）：销售客户（经销商）名称 → 经销商.经销商名称；搭赠下沉明细.记录经销商名称
- `dealer_type_code`（varchar）：执行销售客户类型编码 → 经销商.销售客户类型编码；搭赠下沉明细.执行客户类型编码
- `dealer_type_name`（varchar）：执行销售客户类型名称 → 经销商.销售客户类型；搭赠下沉明细.执行客户类型名称
- `gwdlv_code`（varchar）：随货搭赠编号 → 营销活动.活动编码；营销活动.活动类型；随货搭赠活动.活动编码；随货搭赠活动.活动类型；搭赠下沉明细.搭赠活动编号
- `gwdlv_name`（varchar）：随货搭赠名称 → 营销活动.活动名称；随货搭赠活动.活动名称；搭赠下沉明细.记录搭赠活动名称
- `gwdlv_cmdt_name`（varchar）：活动商品简称 → 商品.商品简称；随货搭赠活动.活动商品简称；搭赠下沉明细.活动商品简称
- `gwdlv_desc`（varchar）：随货搭赠短描述 → 随货搭赠活动.活动简述；搭赠下沉明细.搭赠活动短描述
- `begin_date`（varchar）：活动开始时间 → 营销活动.活动开始时间；随货搭赠活动.活动开始时间；搭赠下沉明细.搭赠活动开始时间
- `end_date`（varchar）：活动结束时间 → 营销活动.活动结束时间；随货搭赠活动.活动结束时间；搭赠下沉明细.搭赠活动结束时间
- `sink_time`（varchar）：下沉截止时间 → 随货搭赠活动.下沉截止时间；搭赠下沉明细.下沉截止时间
- `gift_amt`（double）：搭赠额度（元） → 搭赠下沉明细.活动客户搭赠额度
- `adjust_amt`（double）：调整额度（元） → 搭赠下沉明细.活动客户调整额度
- `sink_amt`（double）：下沉额度（元） → 搭赠下沉明细.记录下沉额度
- `dist_ord_no`（varchar）：分销订单号 → 分销订单行.订单编码；虚假分销订单行.订单编码；搭赠下沉明细.下沉分销订单号
- `package_id`（varchar）：套餐id → 分销套餐.套餐内部标识；搭赠下沉明细.下沉套餐标识
- `package_code`（varchar）：套餐编码 → 营销活动.活动编码；营销活动.活动类型；分销套餐.活动编码；分销套餐.活动类型；搭赠下沉明细.下沉套餐编码
- `package_name`（varchar）：套餐名称 → 营销活动.活动名称；分销套餐.活动名称；搭赠下沉明细.记录下沉套餐名称
- `cmdt_code`（varchar）：商品编码 → 商品.商品编码；分销订单行.交易商品编码；虚假分销订单行.交易商品编码；搭赠下沉明细.下沉交易商品编码
- `cmdt_name`（varchar）：商品名称 → 商品.商品名称；搭赠下沉明细.记录交易商品名称
- `sign_box_qty`（int）：签收数量(箱) → 搭赠下沉明细.签收箱数
- `sign_bottle_qty`（int）：签收数量（瓶） → 搭赠下沉明细.签收瓶数
- `total_boxes_qty`（int）：合计数量（箱） → 搭赠下沉明细.合计箱数
- `gift_intensity_self_ord`（varchar）：搭赠力度（自营订单） → 搭赠下沉明细.自营订单搭赠力度
- `box_price`（double）：上单净价(元/箱) → 搭赠下沉明细.上单净价
- `sink_ratio`（double）：搭赠下沉比例(%) → 搭赠下沉明细.搭赠下沉比例
- `sink_amount`（double）：下沉额度(元) → 搭赠下沉明细.明细下沉金额
- `updated_time`（datetime）：更新时间 → 搭赠下沉明细.追踪更新时间
- `updated_time_text`（varchar）：更新时间yyyy年M月d日
- `updated_time_text_hh`（varchar）：更新时间yyyy年M月d日 HH时mm分ss秒
- `etl_load_time`（datetime）：ETL加载时间
- `gift_send_amt_witax`（double）：随货搭赠赠品金额 → 搭赠下沉明细.随货搭赠赠品金额
- `gift_cmdt_code`（varchar）：赠品商品编码 → 商品.商品编码；搭赠下沉明细.搭赠赠品商品编码
- `gift_cmdt_name`（varchar）：赠品商品名称 → 商品.商品名称；搭赠下沉明细.记录搭赠赠品名称

## `v_mkt_unity_apply_alloc_df`

公司组织、办事处、品类、大区、经销商、统案客户分配、统案支持费用项、统案活动、营销活动、门店

- `actv_id`（varchar）：活动id → 统案活动.统案活动标识；统案支持费用项.所属统案标识；统案客户分配.统案活动标识
- `actv_dtl_id`（varchar）：活动明细id → 统案支持费用项.所属活动明细标识；统案客户分配.所属活动明细标识
- `actv_dtl_list_id`（varchar）：活动明细列表id → 统案支持费用项.活动明细列表标识；统案客户分配.支持费用列表引用
- `actv_code`（varchar）：活动编码 → 营销活动.活动编码；营销活动.活动类型；统案活动.活动编码；统案活动.活动类型；统案支持费用项.所属统案编码；统案客户分配.统案活动编码
- `actv_name`（varchar）：活动名称 → 营销活动.活动名称；统案活动.活动名称；统案支持费用项.所属统案名称
- `actv_content`（varchar）：活动描述 → 统案活动.活动描述
- `actv_short_content`（varchar）：活动简述 → 统案活动.活动简述
- `actv_agent_code`（varchar）：活动主题编码 → 统案活动.活动主题编码；统案支持费用项.活动主题编码；统案客户分配.统案主题编码
- `actv_agent_name`（varchar）：活动主题名称 → 统案活动.活动主题名称；统案支持费用项.活动主题名称；统案客户分配.统案主题名称
- `aprv_id`（varchar）：审批状态
- `aprv_status_name`（varchar）：流程审批名称 → 统案活动.审批状态；统案支持费用项.申请审批状态名称
- `actv_type_code`（varchar）：活动类型编码
- `actv_type_name`（varchar）：活动类型名称
- `ctg_name`（varchar）：品类名称 → 品类.品类名称；统案支持费用项.支持品类名称
- `expen_type_name`（varchar）：活动项目/项目 → 统案支持费用项.活动项目名称
- `actv_classify_name`（varchar）：活动分类名称 → 统案活动.活动分类
- `execute_ym`（varchar）：执行年月 → 统案支持费用项.执行年月；统案客户分配.执行年月
- `supt_dpmt_code`（varchar）：支持部门编码 → 公司组织.组织编码；统案支持费用项.支持部门编码
- `supt_dpmt_name`（varchar）：支持部门名称 → 公司组织.组织名称；统案支持费用项.支持部门名称
- `account_id`（varchar）：费用账户id → 统案支持费用项.费用账户标识
- `account_code`（varchar）：费用账户编码 → 统案支持费用项.费用账户编码
- `collect_unit_name`（varchar）：收款单位 → 统案支持费用项.记录收款单位
- `actv_plan_amt`（varchar）：计划金额 → 统案支持费用项.申请支持金额
- `subject_code`（varchar）：费用项目/科目编码 → 统案支持费用项.费用科目编码
- `subject_name`（varchar）：费用项目/科目 → 统案支持费用项.费用科目名称
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；统案支持费用项.记录大区编码；统案客户分配.分配大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；统案支持费用项.记录大区名称；统案客户分配.分配大区名称
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；统案支持费用项.记录办事处编码；统案客户分配.记录办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；统案支持费用项.记录办事处名称；统案客户分配.记录办事处名称
- `tx_code`（varchar）：条系编码
- `tx_name`（varchar）：条系名称
- `actv_cust_cnt`（varchar）：活动门店数量
- `actv_rate`（varchar）：活动税率
- `dim_group_id`（varchar）：核销明细id → 统案客户分配.核销明细引用标识
- `dealer_range_code`（varchar）：经销商代码 → 经销商.销售范围编码；统案客户分配.获分配客户编码
- `dealer_name`（varchar）：经销商名称 → 经销商.经销商名称；统案客户分配.获分配客户名称
- `dis_supt_amt`（varchar）：大区支持金额 → 统案客户分配.大区分配金额
- `plan_code`（varchar）：计划明细编码 → 营销活动.活动编码；统案客户分配.后续计划编码
- `plan_name`（varchar）：计划明细名称 → 营销活动.活动名称；统案客户分配.后续计划名称
- `plan_content`（varchar）：计划明细描述 → 统案客户分配.关联计划说明
- `plan_amt`（varchar）：活动计划金额明细 → 统案客户分配.关联计划金额
- `impl_amt`（varchar）：活动实施金额明细 → 统案客户分配.关联计划实施金额
- `dealer_bear_rate`（varchar）：经销商承担比例
- `hq_bear_rate`（varchar）：大区承担比例
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；统案客户分配.关联执行门店编码
- `cust_name`（varchar）：终端客户名称 → 门店.门店名称；统案客户分配.关联执行门店名称
- `ext_info`（varchar）：扩展信息
- `dis_actv_brand_name`（varchar）：大区活动品类名称 → 品类.品类名称
- `create_datetime`（varchar）：活动创建时间 → 统案活动.活动创建时间
- `create_user`（varchar）：活动创建人 → 统案活动.活动创建人
- `update_datetime`（varchar）：更新时间
- `update_user`（varchar）：活动更新人
- `dealer_actv_id`（varchar）：经销商活动id → 统案客户分配.客户分配标识
- `actv_start_date`（varchar）：活动开始时间 → 营销活动.活动开始时间；统案活动.活动开始时间
- `actv_end_date`（varchar）：活动结束时间 → 营销活动.活动结束时间；统案活动.活动结束时间
- `reg_code`（varchar）：区域编码 → 公司组织.组织编码
- `reg_name`（varchar）：区域名称 → 公司组织.组织名称
- `aprv_status_code`（varchar）：流程审批编码 → 统案活动.审批状态编码；统案支持费用项.申请审批状态编码

## `v_trd_dist_ord_dtl`

SKU、业代、主任、公司组织、分销套餐、分销订单行、办事处、员工、品类、商品、大区、子门店、线路、经销商、营销活动、虚假分销订单行、门店

- `dist_ord_no`（varchar）：订单编码 → 分销订单行.订单编码；虚假分销订单行.订单编码
- `dist_ord_item_id`（varchar）：订单明细ID → 分销订单行.订单明细标识；虚假分销订单行.订单明细标识
- `ord_type_name`（varchar）：订单类型 → 门店.期间本品数量活跃标记；门店.期间活跃SKU数；分销订单行.订单类型；虚假分销订单行.订单类型
- `line_code`（varchar）：当时线路号 → 线路.线路编码；分销订单行.当时线路编码；虚假分销订单行.当时线路编码
- `line_type_name`（varchar）：线内外标记 → 分销订单行.订单线内外标记；虚假分销订单行.订单线内外标记
- `cust_range_code`（varchar）：终端客户范围编码 → 子门店.子门店编码；分销订单行.交易子门店编码；虚假分销订单行.交易子门店编码
- `cust_code`（varchar）：终端客户编码 → 门店.门店编码；子门店.对应门店编码；分销订单行.交易门店编码；虚假分销订单行.交易门店编码
- `cmdt_code`（varchar）：商品编码 → 商品.商品编码；分销订单行.交易商品编码；虚假分销订单行.交易商品编码
- `sap_code`（varchar）：商品SAP编码 → 商品.SAP商品编码；分销订单行.交易商品SAP编码；虚假分销订单行.交易商品SAP编码
- `cmdt_tag_name`（varchar）：商品性质 → 门店.期间本品数量活跃标记；门店.期间活跃SKU数；分销订单行.商品性质；虚假分销订单行.商品性质
- `ord_box_cnt`（double）：订单数量 → 分销订单行.订单数量；虚假分销订单行.订单数量
- `ord_amt`（double）：订单金额（含税） → 分销订单行.含税订单金额；虚假分销订单行.含税订单金额
- `ord_net_amt`（double）：订单金额 → 分销订单行.订单金额；虚假分销订单行.订单金额
- `sign_box_cnt`（double）：分销数量 → 门店.期间本品数量活跃标记；门店.期间活跃SKU数；分销订单行.分销数量；虚假分销订单行.分销数量
- `sign_amt`（double）：分销金额（含税） → 分销订单行.含税分销金额；虚假分销订单行.含税分销金额
- `sign_net_amt`（double）：分销金额 → 门店.期间金额活跃标记；分销订单行.不含税分销金额；虚假分销订单行.不含税分销金额
- `create_time`（datetime）：订单日期 → 分销订单行.订单日期；虚假分销订单行.订单日期
- `sign_time`（datetime）：签收日期 → 门店.期间金额活跃标记；门店.期间本品数量活跃标记；门店.期间分销SKU数；门店.期间活跃SKU数；分销订单行.签收日期；虚假分销订单行.签收日期
- `ord_status_name`（varchar）：订单状态 → 分销订单行.订单状态；虚假分销订单行.订单状态
- `ord_src_name`（varchar）：订单来源 → 分销订单行.订单来源；虚假分销订单行.订单来源
- `actv_id`（varchar）：渠道活动ID → 分销订单行.渠道活动标识；虚假分销订单行.渠道活动标识；分销套餐.套餐内部标识
- `if_chl_actv`（varchar）：是否渠道活动:1 是，0 否 → 分销订单行.是否渠道活动；虚假分销订单行.是否渠道活动
- `remark`（varchar）：订单备注 → 分销订单行.订单备注；虚假分销订单行.订单备注
- `sale_user_code_orgn`（varchar）：当时业代编码 → 员工.员工编码；业代.员工编码；分销订单行.当时业代编码；虚假分销订单行.当时业代编码
- `sale_user_name_orgn`（varchar）：当时业代 → 员工.员工姓名；业代.员工姓名
- `sale_user_pos_name_orgn`（varchar）：当时业代基准岗 → 员工.基准岗名称；业代.基准岗名称
- `reg_name_orgn`（varchar）：当时所属区域 → 公司组织.组织名称；分销订单行.当时所属区域；虚假分销订单行.当时所属区域
- `dis_name_orgn`（varchar）：当时所属大区 → 公司组织.组织名称；大区.组织名称；分销订单行.当时所属大区；虚假分销订单行.当时所属大区
- `off_name_orgn`（varchar）：当时所属办事处 → 公司组织.组织名称；办事处.组织名称；分销订单行.当时所属办事处；虚假分销订单行.当时所属办事处
- `dealer_range_code_orgn`（varchar）：当时所属销售客户编码 → 经销商.销售范围编码；分销订单行.当时所属销售客户编码；虚假分销订单行.当时所属销售客户编码
- `dealer_sap_code_orgn`（varchar）：当时所属销售客户SAP编码 → 经销商.SAP客户编码；分销订单行.当时所属客户SAP编码；虚假分销订单行.当时所属客户SAP编码
- `dealer_name_orgn`（varchar）：当时所属销售客户 → 经销商.经销商名称
- `dealer_type_name_orgn`（varchar）：当时所属销售客户类型 → 经销商.销售客户类型
- `serv_reg_name_orgn`（varchar）：当时服务区域 → 公司组织.组织名称；分销订单行.当时服务区域；虚假分销订单行.当时服务区域
- `serv_dis_name_orgn`（varchar）：当时服务大区 → 公司组织.组织名称；大区.组织名称；分销订单行.当时服务大区；虚假分销订单行.当时服务大区
- `serv_off_name_orgn`（varchar）：当时服务办事处 → 公司组织.组织名称；办事处.组织名称；分销订单行.当时服务办事处；虚假分销订单行.当时服务办事处
- `serv_dealer_range_code_orgn`（varchar）：当时服务销售客户编码 → 经销商.销售范围编码；分销订单行.当时服务销售客户编码；虚假分销订单行.当时服务销售客户编码
- `serv_dealer_sap_code_orgn`（varchar）：当时服务销售客户SAP编码 → 经销商.SAP客户编码；分销订单行.当时服务客户SAP编码；虚假分销订单行.当时服务客户SAP编码
- `serv_dealer_name_orgn`（varchar）：当时服务销售客户 → 经销商.经销商名称
- `serv_dealer_type_name_orgn`（varchar）：当时服务销售客户类型 → 经销商.销售客户类型
- `cmdt_name`（varchar）：商品 → 商品.商品名称
- `cmdt_sname`（varchar）：商品简称 → 商品.商品简称
- `cmdty_type_name`（varchar）：商品类型 → 门店.期间金额活跃标记；门店.期间本品数量活跃标记；门店.期间分销SKU数；门店.期间活跃SKU数；商品.商品类型；分销订单行.行内商品类型；虚假分销订单行.行内商品类型
- `brand_name`（varchar）：品牌 → 商品.品牌名称
- `clfc_name`（varchar）：三级类目 → 商品.三级类目
- `p_clfc_name`（varchar）：二级类目 → 商品.二级类目
- `p2_clfc_name`（varchar）：一级类目 → 商品.一级类目
- `ctg_name`（varchar）：品类 → 商品.品类名称；品类.品类名称；分销订单行.交易品类；虚假分销订单行.交易品类
- `item_name`（varchar）：品项 → 商品.品项
- `sku_code`（varchar）：SKU编码 → 门店.期间分销SKU数；门店.期间活跃SKU数；商品.所属SKU编码；SKU.SKU编码；分销订单行.交易SKU编码；虚假分销订单行.交易SKU编码
- `sku_name`（varchar）：SKU → 商品.所属SKU名称；SKU.SKU名称
- `entry_cnt`（bigint）：入数 → 商品.入数；分销订单行.行内入数；虚假分销订单行.行内入数
- `spec_desc`（varchar）：包装规格 → 商品.包装规格；分销订单行.行内包装规格；虚假分销订单行.行内包装规格
- `package_spec`（varchar）：箱规 → 商品.箱规；分销订单行.行内箱规；虚假分销订单行.行内箱规
- `sku_factor`（varchar）：标箱系数 → 商品.所附标箱系数；分销订单行.行内标箱系数；虚假分销订单行.行内标箱系数
- `pack_type`（varchar）：包装类型 → 商品.包装类型
- `store_trans_type_name`（varchar）：储运类型 → 商品.储运类型
- `stand_price`（double）：标准上单价 → 商品.所附标准上单价；分销订单行.行内标准上单价；虚假分销订单行.行内标准上单价
- `capacity`（varchar）：容量 → 商品.容量；SKU.SKU容量；分销订单行.行内商品容量；虚假分销订单行.行内商品容量
- `sales_clfc_type_name`（varchar）：行销类目 → 门店.期间金额活跃标记；门店.期间本品数量活跃标记；门店.期间分销SKU数；门店.期间活跃SKU数；商品.行销类目；分销订单行.行内行销类目；虚假分销订单行.行内行销类目
- `sales_ana_type_name`（varchar）：行销品类 → 商品.行销品类
- `sales_new_type_name`（varchar）：行销新品 → 商品.行销新品类别
- `cust_name`（varchar）：终端客户 → 门店.门店名称；子门店.记录所附门店名称
- `channel_name`（varchar）：子渠道 → 子门店.子渠道
- `p_channel_name`（varchar）：生动化渠道 → 子门店.生动化渠道
- `p2_channel_name`（varchar）：渠道群 → 子门店.渠道群；分销订单行.记录渠道群；虚假分销订单行.记录渠道群
- `group_name`（varchar）：组别 → 门店.组别
- `tx_name`（varchar）：子条系 → 门店.条系
- `p_tx_name`（varchar）：条系 → 门店.上级条系
- `place_name`（varchar）：场所 → 门店.场所
- `p_place_name`（varchar）：上级场所 → 门店.上级场所
- `market_level`（varchar）：行政区划类别 → 门店.行政区划类别；子门店.记录所附行政区划类别
- `mkt_level_name`（varchar）：市场级别 → 门店.市场级别；子门店.记录所附市场层级
- `country_name`（varchar）：国家 → 门店.国家
- `province_name`（varchar）：省 → 门店.省份
- `city_name`（varchar）：市 → 门店.城市
- `town_name`（varchar）：区县 → 门店.区县
- `street_name`（varchar）：乡镇街道 → 门店.乡镇街道
- `village`（varchar）：村 → 门店.村
- `village_population_scope`（varchar）：村人口区间 → 门店.村人口区间
- `off_code`（varchar）：办事处编码 → 子门店.归属办事处编码；公司组织.组织编码；办事处.组织编码；分销订单行.明细附带办事处编码；虚假分销订单行.明细附带办事处编码
- `off_name`（varchar）：办事处 → 子门店.归属办事处名称；公司组织.组织名称；办事处.组织名称
- `dis_code`（varchar）：大区编码 → 子门店.归属大区编码；公司组织.组织编码；大区.组织编码；分销订单行.明细附带大区编码；虚假分销订单行.明细附带大区编码
- `dis_name`（varchar）：大区 → 子门店.归属大区名称；公司组织.组织名称；大区.组织名称
- `reg_name`（varchar）：区域 → 子门店.归属区域名称；公司组织.组织名称；分销订单行.明细附带区域；虚假分销订单行.明细附带区域
- `cust_status_name`（varchar）：终端客户状态 → 门店.门店状态；子门店.对应门店状态
- `level_name`（varchar）：终端客户等级 → 门店.门店等级；子门店.记录所附门店等级
- `dealer_range_code`（varchar）：所属销售客户编码 → 子门店.所属销售客户范围编码；经销商.销售范围编码；分销订单行.明细附带所属客户编码；虚假分销订单行.明细附带所属客户编码
- `dealer_name`（varchar）：所属销售客户 → 子门店.所属销售客户名称；经销商.经销商名称
- `dealer_sap_code`（varchar）：所属销售客户SAP编码 → 子门店.所属销售客户SAP编码；经销商.SAP客户编码；分销订单行.明细附带所属客户SAP编码；虚假分销订单行.明细附带所属客户SAP编码
- `dealer_type_name`（varchar）：所属销售客户类型 → 子门店.记录所附所属客户类型；经销商.销售客户类型
- `serv_dealer_range_code`（varchar）：服务销售客户编码 → 子门店.服务销售客户范围编码；经销商.销售范围编码；分销订单行.明细附带服务客户编码；虚假分销订单行.明细附带服务客户编码
- `serv_dealer_name`（varchar）：服务销售客户 → 子门店.服务销售客户名称；经销商.经销商名称
- `serv_dealer_sap_code`（varchar）：服务销售客户SAP编码 → 子门店.记录所附服务客户SAP编码；经销商.SAP客户编码；分销订单行.明细附带服务客户SAP编码；虚假分销订单行.明细附带服务客户SAP编码
- `serv_dealer_type_name`（varchar）：服务销售客户类型 → 子门店.记录所附服务客户类型；经销商.销售客户类型
- `route_code`（varchar）：线路号 → 子门店.业代服务线路编码；线路.线路编码；分销订单行.明细附带线路编码；虚假分销订单行.明细附带线路编码
- `std_pos_name`（varchar）：业代基准岗 → 员工.基准岗名称；业代.基准岗名称
- `emp_code`（varchar）：业代编码 → 子门店.负责业代编码；员工.员工编码；业代.员工编码；分销订单行.明细附带业代编码；虚假分销订单行.明细附带业代编码
- `emp_name`（varchar）：业代 → 子门店.负责业代姓名；员工.员工姓名；业代.员工姓名
- `p_emp_std_pos_name`（varchar）：主管基准岗 → 员工.基准岗名称；主任.基准岗名称
- `p_emp_code`（varchar）：主管编码 → 员工.员工编码；主任.员工编码；分销订单行.明细附带主管编码；虚假分销订单行.明细附带主管编码
- `p_emp_name`（varchar）：主管 → 员工.员工姓名；主任.员工姓名
- `is_ydt`（varchar）：是否一店通标记 → 门店.一店通标记编码；子门店.一店通标记
- `chl_actv_code`（varchar）：渠道活动编码 → 分销订单行.渠道活动编码；虚假分销订单行.渠道活动编码；营销活动.活动编码；分销套餐.活动编码
- `chl_actv_name`（varchar）：渠道活动 → 分销订单行.渠道活动名称；虚假分销订单行.渠道活动名称；营销活动.活动名称；分销套餐.活动名称
- `chl_actv_status_name`（varchar）：渠道活动状态 → 分销订单行.记录渠道活动状态；虚假分销订单行.记录渠道活动状态
- `chl_actv_type_name`（varchar）：渠道活动类型 → 分销订单行.渠道活动类型；虚假分销订单行.渠道活动类型；营销活动.活动类型；分销套餐.活动类型
- `cmpy_bear_ratio`（varchar）：我司承担比例 → 分销订单行.我司承担比例；虚假分销订单行.我司承担比例
- `max_fee_rate`（double）：最高费率 → 分销订单行.最高费率；虚假分销订单行.最高费率
- `act_create_time`（datetime）：订单时间 → 分销订单行.订单时间；虚假分销订单行.订单时间
- `act_sign_time`（datetime）：签收时间 → 分销订单行.签收时间；虚假分销订单行.签收时间
- `etl_time`（datetime）：发货时间 → 分销订单行.发货时间；虚假分销订单行.发货时间
- `cooperate_start_date`（datetime）：开始合作日期 → 子门店.记录所附开始合作日期
- `cooperate_end_date`（datetime）：结束合作日期 → 子门店.记录所附结束合作日期
- `dealer_self_ratio`（double）：经销商自有费率 → 分销订单行.经销商自有费率；分销订单行.自有费用分摊金额；虚假分销订单行.经销商自有费率；虚假分销订单行.自有费用分摊金额
- `fight_ratio`（double）：打仗费率 → 分销订单行.大区打仗费率；分销订单行.大区打仗费用分摊金额；虚假分销订单行.大区打仗费率；虚假分销订单行.大区打仗费用分摊金额
- `hq_ratio`（double）：总部费率 → 分销订单行.总部费率；分销订单行.总部费用分摊金额；虚假分销订单行.总部费率；虚假分销订单行.总部费用分摊金额
- `profit_ratio`（double）：经销商毛利率 → 分销订单行.经销商毛利率参数；分销订单行.毛利分摊金额；虚假分销订单行.经销商毛利率参数；虚假分销订单行.毛利分摊金额
- `cmdt_box_price`（double）：分销供价 → 分销订单行.分销供价；虚假分销订单行.分销供价
- `cmdt_bottle_price`（double）：ERP分销货价 → 分销订单行.ERP分销货价；虚假分销订单行.ERP分销货价
- `dist_sign_amt`（double）：签收供价金额（含税） → 分销订单行.签收供价金额；虚假分销订单行.签收供价金额
- `sign_pure_amt`（double）：签收净价金额（含税） → 分销订单行.签收净价金额；虚假分销订单行.签收净价金额
- `sign_pure_net_amt`（double）：签收净价金额 → 分销订单行.签收净价金额（未标税）；虚假分销订单行.签收净价金额（未标税）
- `gift_sign_net_amt`（double）：分销赠品金额 → 分销订单行.分销赠品金额；虚假分销订单行.分销赠品金额
- `sign_net_amt_gift_share`（double）：赠品分摊金额 → 分销订单行.赠品分摊金额；分销订单行.总部费用分摊金额；分销订单行.大区打仗费用分摊金额；分销订单行.自有费用分摊金额；分销订单行.毛利分摊金额；分销订单行.搭赠下沉分摊金额；虚假分销订单行.赠品分摊金额；虚假分销订单行.总部费用分摊金额；虚假分销订单行.大区打仗费用分摊金额；虚假分销订单行.自有费用分摊金额；虚假分销订单行.毛利分摊金额；虚假分销订单行.搭赠下沉分摊金额
- `sink_ratio`（double）：下沉承担比例 → 分销订单行.下沉承担比例；分销订单行.搭赠下沉分摊金额；虚假分销订单行.下沉承担比例；虚假分销订单行.搭赠下沉分摊金额
- `sign_sales_amt_550_6d1_share`（double）：550搭赠分摊 → 分销订单行.550搭赠分摊金额；虚假分销订单行.550搭赠分摊金额
- `dist_gross_profit`（double）：分销毛利 → 分销订单行.分销毛利；虚假分销订单行.分销毛利
- `dist_gross_profit_witax`（double）：分销毛利（含税） → 分销订单行.含税分销毛利；虚假分销订单行.含税分销毛利
- `origin_order_no`（varchar）：原始订单号 → 分销订单行.原始订单号；虚假分销订单行.原始订单号
- `charge_off_tag`（varchar）：红冲标记 → 分销订单行.红冲标记；虚假分销订单行.红冲标记
- `sug_offer_price`（double）：建议供价 → 分销订单行.建议供价；虚假分销订单行.建议供价
- `off_price_amt_zp_share`（double）：赠品分摊供价金额 → 分销订单行.赠品分摊供价金额；虚假分销订单行.赠品分摊供价金额
- `out_ord_no`（varchar）：参考凭证号 → 分销订单行.参考凭证号；虚假分销订单行.参考凭证号
- `food_dev_cnt`（int）：终端品柜数量 → 分销订单行.记录终端品柜数量；虚假分销订单行.记录终端品柜数量
- `cold_dev_cnt`（int）：冰柜数量 → 分销订单行.记录冰柜数量；虚假分销订单行.记录冰柜数量
- `item_type_name`（varchar）：商品明细分类 → 分销订单行.商品明细分类；虚假分销订单行.商品明细分类
- `cust_pay_type`（varchar）：门店付费类型 → 分销订单行.记录门店付费类型；虚假分销订单行.记录门店付费类型
- `mlzf_share_off_price`（double）：毛利赠品折后价 → 分销订单行.毛利赠品折后价；虚假分销订单行.毛利赠品折后价
- `discounted_cmdt_box_price`（double）：折后供价 → 分销订单行.折后供价；虚假分销订单行.折后供价

## `v_trd_dist_ord_target_emp_1m_df`

业代、主任、公司组织、办事处、员工、大区、月度分销目标

- `stat_month`（varchar）：年月 → 月度分销目标.目标月份；月度分销目标.目标分销财年；月度分销目标.截止日折算目标金额；月度分销目标.截止日折算水目标金额；月度分销目标.截止日折算东方树叶目标金额
- `business_code`（varchar）：事业部编号
- `off_code`（varchar）：办事处编号 → 公司组织.组织编码；办事处.组织编码；月度分销目标.目标归属办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；月度分销目标.目标归属办事处名称
- `dis_code`（varchar）：大区编号 → 公司组织.组织编码；大区.组织编码；月度分销目标.目标归属大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；月度分销目标.目标归属大区名称
- `p_emp_code`（varchar）：主任编码 → 员工.员工编码；业代.对应主任编码；主任.员工编码；月度分销目标.目标所属主任编码
- `p_emp_name`（varchar）：主任名称 → 员工.员工姓名；业代.对应主任姓名；主任.员工姓名；月度分销目标.目标所属主任名称
- `emp_code`（varchar）：业代编码 → 员工.员工编码；业代.员工编码；月度分销目标.目标业代编码
- `emp_name`（varchar）：业代名称 → 员工.员工姓名；业代.员工姓名；月度分销目标.目标业代名称
- `pos_code`（varchar）：人员职位 → 员工.岗位编码；业代.岗位编码；月度分销目标.目标主体职位编码
- `pos_name`（varchar）：职位 → 员工.岗位名称；业代.岗位名称；月度分销目标.目标主体职位名称
- `target`（varchar）：分销目标金额
- `actv_cust_target`（varchar）：活跃门店数目标 → 月度分销目标.活跃门店数目标
- `actv_cust_sku_target`（varchar）：门店sku数目标 → 月度分销目标.门店SKU数目标
- `water_target`（double）：水分销目标金额
- `leaf_target`（double）：树叶分销目标金额

## `v_trd_dist_ord_target_mgr_1m_df`

主任、公司组织、办事处、员工、大区、月度分销目标

- `stat_month`（varchar）：统计月 → 月度分销目标.目标月份；月度分销目标.目标分销财年；月度分销目标.截止日折算目标金额；月度分销目标.截止日折算水目标金额
- `business_code`（varchar）：事业部编号
- `dis_code`（varchar）：大区编号 → 公司组织.组织编码；大区.组织编码；月度分销目标.目标归属大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；月度分销目标.目标归属大区名称
- `off_code`（varchar）：办事处编号 → 公司组织.组织编码；办事处.组织编码；月度分销目标.目标归属办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；月度分销目标.目标归属办事处名称
- `p_emp_code`（varchar）：主任编码 → 员工.员工编码；主任.员工编码；月度分销目标.目标主任编码
- `p_emp_name`（varchar）：主任名称 → 员工.员工姓名；主任.员工姓名；月度分销目标.目标主任名称
- `target_amt`（double）：分销目标金额 → 月度分销目标.月度分销目标金额；月度分销目标.单日分销目标金额；月度分销目标.截止日折算目标金额
- `etl_load_time`（varchar）：数据加载时间
- `director_pos_code`（varchar）：主任职位编码 → 员工.岗位编码；主任.岗位编码；月度分销目标.目标主体职位编码
- `actv_cust_target`（double）：活跃门店数目标 → 月度分销目标.活跃门店数目标
- `actv_cust_sku_target`（double）：门店sku数目标 → 月度分销目标.门店SKU数目标
- `water_target_amt`（double）：水分销目标金额 → 月度分销目标.月度水目标金额；月度分销目标.单日水目标金额；月度分销目标.截止日折算水目标金额

## `v_trd_dist_target_dealer_df`

公司组织、办事处、大区、月度分销目标、经销商

- `month_id`（varchar）：年月 → 月度分销目标.目标月份；月度分销目标.截止日折算目标金额；月度分销目标.截止日折算水目标金额；月度分销目标.截止日折算东方树叶目标金额
- `fin_year`（varchar）：财年 → 月度分销目标.目标分销财年
- `reg_code`（varchar）：区域编码 → 公司组织.组织编码；月度分销目标.目标归属区域编码
- `reg_name`（varchar）：区域名称 → 公司组织.组织名称；月度分销目标.目标归属区域名称
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；月度分销目标.目标归属大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；月度分销目标.目标归属大区名称
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；月度分销目标.目标归属办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；月度分销目标.目标归属办事处名称
- `dealer_range_code`（varchar）：销售客户销售范围编码 → 经销商.销售范围编码；月度分销目标.目标经销商范围编码
- `dealer_name`（varchar）：销售客户名称 → 经销商.经销商名称；月度分销目标.目标经销商名称
- `target_amt`（double）：总分销目标金额 → 月度分销目标.月度分销目标金额；月度分销目标.单日分销目标金额；月度分销目标.截止日折算目标金额
- `water_target_amt`（double）：水分销目标金额 → 月度分销目标.月度水目标金额；月度分销目标.单日水目标金额；月度分销目标.截止日折算水目标金额
- `leaf_target_amt`（double）：东方树叶分销目标金额 → 月度分销目标.月度东方树叶目标金额；月度分销目标.单日东方树叶目标金额；月度分销目标.截止日折算东方树叶目标金额

## `v_trd_dist_target_org_df`

公司组织、办事处、大区、月度分销目标

- `ym`（varchar）：年月 → 月度分销目标.目标月份；月度分销目标.目标分销财年；月度分销目标.截止日折算目标金额；月度分销目标.截止日折算水目标金额；月度分销目标.截止日折算东方树叶目标金额
- `reg_code`（varchar）：区域编码 → 公司组织.组织编码；月度分销目标.目标归属区域编码
- `reg_name`（varchar）：区域名称 → 公司组织.组织名称；月度分销目标.目标归属区域名称
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；月度分销目标.目标归属大区编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；月度分销目标.目标归属大区名称
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；月度分销目标.目标办事处编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；月度分销目标.目标办事处名称
- `target_amt`（double）：总分销目标金额 → 月度分销目标.月度分销目标金额；月度分销目标.单日分销目标金额；月度分销目标.截止日折算目标金额
- `water_target_amt`（double）：水分销目标金额 → 月度分销目标.月度水目标金额；月度分销目标.单日水目标金额；月度分销目标.截止日折算水目标金额
- `leaf_target_amt`（double）：东方树叶分销目标金额 → 月度分销目标.月度东方树叶目标金额；月度分销目标.单日东方树叶目标金额；月度分销目标.截止日折算东方树叶目标金额

## `v_trd_sales_adjust_df`

SKU、公司组织、办事处、品类、商品、大区、实际销售考核明细、组织销售目标、经销商、销售预算目标

- `ass_fin_year`（varchar）：考核财年；当期统计与ass_fin_month_id配套使用，不直接按自然年推算财年。同期对比使用yty_fin_year及yty_*口径。 → 实际销售考核明细.考核财年；销售预算目标.目标财年；组织销售目标.目标财年
- `ass_fin_month_id`（varchar）：考核财务月，格式yyyyMM；月度考核及目标统计使用本列。与ass_date_id所属自然月可能不同，不默认追加日期同月条件。 → 实际销售考核明细.考核财务月；销售预算目标.目标月份；组织销售目标.截止日折算目标金额；组织销售目标.目标月份
- `ass_date_id`（varchar）：考核日期ID，格式yyyyMMdd；日粒度或截止日实际销售统计使用本列。预算目标行为空，目标期间按ass_fin_month_id选取，不用实际销售的日期过滤误删目标。同期日期使用yty_date_id。 → 实际销售考核明细.考核日期
- `ass_date`（datetime）：考核日期，与ass_date_id对应；预算目标行为空。按日期筛实际销售，按财务月筛目标，两类条件分别处理。 → 实际销售考核明细.考核日期
- `ass_sales_range_code`（varchar）：考核销售组织范围编码，属于ass_sales_*组织口径；与ass_org_code、dealer_range_code含义不同，不作为通用关联键。 → 实际销售考核明细.当期考核销售组织范围编码
- `ass_sales_off_name`（varchar）：考核销售办事处，属于ass_sales_*口径；可能与ass_org_name不同，预算目标行可能为空，不直接用本列筛选销售目标。 → 公司组织.组织名称；办事处.组织名称；实际销售考核明细.当期考核销售办事处
- `ass_sales_dis_name`（varchar）：考核销售大区，属于ass_sales_*口径；可能与ass_dis_name或售达方大区不同，不直接替代目标归属组织。 → 公司组织.组织名称；大区.组织名称；实际销售考核明细.当期考核销售大区
- `ass_sales_org_name`（varchar）：考核销售组织名称，属于ass_sales_*口径；不同于dealer_sales_org_name售达方组织、send_sales_org_name送达方组织。 → 公司组织.组织名称；实际销售考核明细.当期考核销售组织
- `ass_org_code`（varchar）：考核办事处编码；与ass_org_name配套。按考核组织汇总当期销售与目标时使用该口径，仍须核目标覆盖及所选维度一致。 → 公司组织.组织编码；办事处.组织编码；实际销售考核明细.当期考核办事处编码；销售预算目标.办事处引用编码；组织销售目标.办事处引用编码
- `ass_org_name`（varchar）：考核办事处名称，配套ass_org_code；与ass_sales_off_name、dealer_sales_off_name可能不同，不按名称相似互换组织口径。 → 公司组织.组织名称；办事处.组织名称；实际销售考核明细.当期考核办事处名称；销售预算目标.办事处引用名称；组织销售目标.办事处引用名称
- `ass_dis_code`（varchar）：考核大区编码 → 公司组织.组织编码；大区.组织编码；实际销售考核明细.当期考核大区编码；销售预算目标.大区引用编码；组织销售目标.大区引用编码
- `ass_dis_name`（varchar）：考核大区名称，配套ass_dis_code；销售与目标按该组织口径对齐，不自动替代考核销售大区或售达方大区。 → 公司组织.组织名称；大区.组织名称；实际销售考核明细.当期考核大区名称；销售预算目标.大区引用名称；组织销售目标.大区引用名称
- `ass_reg_name`（varchar）：区域 → 公司组织.组织名称；实际销售考核明细.当期考核区域名称；组织销售目标.目标考核区域名称
- `ass_flag`（varchar）：当期考核标记。计算当期实际考核销售取ass_flag=Yes且target_flag=No；预算目标行也为Yes，不能仅凭本列判断实际销售。No不自动解释为无效单、取消或退货。 → 实际销售考核明细.当期考核标记
- `yty_fin_year`（varchar）：同期对齐财年；与yty_ass_flag、yty_fin_month_id配套，表示原销售映射到对比期间后的财年，不再机械减一年。 → 实际销售考核明细.同期对齐财年
- `yty_fin_month_id`（varchar）：同期对齐财务月。计算某期间的同期销售时按该对比期间筛本列，并取yty_ass_flag=Yes，金额仍用ass_amt；不要同时要求ass_fin_month_id等于本列。 → 实际销售考核明细.同期对齐财务月
- `yty_date_id`（varchar）：同期对齐日期ID，格式yyyyMMdd；同期日粒度及截止日统计使用本列，不用ass_date_id替代；预算目标行为空。 → 实际销售考核明细.同期对齐日期
- `yty_date`（datetime）：同期对齐日期，与yty_date_id对应；与原考核日期ass_date分别解释。 → 实际销售考核明细.同期对齐日期
- `yty_sales_range_code`（varchar）：同期销售组织范围编码 → 实际销售考核明细.同期销售组织范围编码
- `yty_sales_off_name`（varchar）：同期销售办事处名称 → 公司组织.组织名称；办事处.组织名称；实际销售考核明细.同期销售办事处
- `yty_sales_dis_name`（varchar）：同期销售大区名称 → 公司组织.组织名称；大区.组织名称；实际销售考核明细.同期销售大区
- `yty_sales_org_name`（varchar）：同期销售组织名称 → 公司组织.组织名称；实际销售考核明细.同期销售组织
- `yty_org_code`（varchar）：同期对齐办事处编码；同期销售按yty_*期间及组织归属统计，与当期同层级组织编码对齐后比较。 → 公司组织.组织编码；办事处.组织编码；实际销售考核明细.同期对齐办事处编码
- `yty_org_name`（varchar）：同期对齐办事处名称；配套yty_org_code，不默认沿用ass_org_name原考核归属。 → 公司组织.组织名称；办事处.组织名称；实际销售考核明细.同期对齐办事处名称
- `yty_dis_code`（varchar）：同期大区编码 → 公司组织.组织编码；大区.组织编码；实际销售考核明细.同期对齐大区编码
- `yty_dis_name`（varchar）：同期大区名称 → 公司组织.组织名称；大区.组织名称；实际销售考核明细.同期对齐大区名称
- `yty_reg_name`（varchar）：同期区域名称 → 公司组织.组织名称；实际销售考核明细.同期对齐区域名称
- `yty_ass_flag`（varchar）：同期考核标记；同期实际销售取Yes且target_flag=No，用yty_*期间和组织，金额仍取ass_amt。预算目标行为空；当期与同期作为两个指标分别计算，不能直接相加。 → 实际销售考核明细.同期考核标记
- `ass_cnt`（double）：考核数量，基本单位见basic_unit_desc_orgn；在明确商品及单位口径后汇总，不直接混加不同单位，也不把基本单位数量当箱数或标箱数。 → 实际销售考核明细.考核数量
- `basic_unit_desc_orgn`（varchar）：考核数量的基本单位；用于解释ass_cnt，跨商品统计须确认单位一致或使用已核定的换算口径。 → 实际销售考核明细.考核数量基本单位
- `ass_price`（double）：考核单价（上单价），不是可直接求和的金额；不能用SUM(ass_price)表示销售额。金额优先使用已加工ass_amt或ass_amt_witax，不能仅按数量乘单价替代。 → 实际销售考核明细.考核上单价
- `ass_amt_witax`（double）：考核含税金额；预算目标行为0。与ass_amt分别解释，勿两列相加，也不在缺少税率时自行反推另一金额。 → 实际销售考核明细.考核含税金额
- `ass_amt`（double）：考核金额，可按明确期间、组织、客户和商品口径SUM汇总，保留原始正负号及NULL；不按金额去重。实际当期取target_flag=No且ass_flag=Yes；同期取target_flag=No且yty_ass_flag=Yes并使用yty_*期间和组织，仍汇总本列。预算目标行为0；本列不是目标、回款或钱包变动金额。销售进度和达成的分子取相应期间实际考核金额，分母口径见target_amt；不能只保留正数或重复折算汇率。 → 实际销售考核明细.销售考核金额
- `dlc_rcd_tag`（varchar）：出库记录标识，预算目标行为空；不是本视图已保证的唯一键。ass_fin_year、ass_fin_month_id、dlc_rcd_tag、cmdt_code、ass_org_code组合也不保证全历史唯一；关联前核基数，不据该组合去重或任取一行，展开后不得重复累计原金额。 → 实际销售考核明细.出库记录标识
- `ass_dealer_sap_code_orgn`（varchar）：考核方SAP编码，与ass_dealer_name_orgn配套；不同于售达方和送达方。源可能有NaN等无值占位，不能作为真实客户编码关联。 → 经销商.SAP客户编码；实际销售考核明细.考核方SAP编码
- `ass_dealer_name_orgn`（varchar）：考核方（源表注释：导入-考核售达方） → 经销商.经销商名称；实际销售考核明细.考核方名称
- `dlv_ord_code`（varchar）：交货单编码 → 实际销售考核明细.交货单编码
- `cmdt_code`（varchar）：商品编码 → 商品.商品编码；实际销售考核明细.考核商品编码；组织销售目标.目标商品编码
- `batch_orgn`（varchar）：批次 → 实际销售考核明细.记录批次
- `invoice_type_orgn`（varchar）：发票类型 → 实际销售考核明细.记录发票类型
- `sales_ord_code`（varchar）：订单编码 → 实际销售考核明细.销售订单编码
- `sales_ord_type_orgn`（varchar）：订单类型编码 → 实际销售考核明细.销售订单类型编码
- `ord_reason_desc_orgn`（varchar）：订单原因 → 实际销售考核明细.销售订单原因
- `dealer_type_desc_orgn`（varchar）：销售客户类型-原始 → 实际销售考核明细.原始销售客户类型
- `dealer_sap_code_orgn`（varchar）：售达方SAP编码 → 经销商.SAP客户编码；实际销售考核明细.售达方SAP编码
- `dealer_name_orgn`（varchar）：售达方 → 经销商.经销商名称；实际销售考核明细.售达方名称
- `send_dealer_sap_code_orgn`（varchar）：送达方SAP编码 → 经销商.SAP客户编码；实际销售考核明细.送达方SAP编码
- `send_dealer_name_orgn`（varchar）：送达方 → 经销商.经销商名称；实际销售考核明细.送达方名称
- `plan_dlv_date_orgn`（datetime）：导入-预计到货日期 → 实际销售考核明细.导入预计到货日期
- `trsp_type_desc_orgn`（varchar）：运输方式 → 实际销售考核明细.记录运输方式
- `load_trsp_type_desc_orgn`（varchar）：装运类型 → 实际销售考核明细.记录装运类型
- `share_ord_code_orgn`（varchar）：股份订单 → 实际销售考核明细.股份订单引用
- `voucher_no_orgn`（varchar）：参考凭证号 → 实际销售考核明细.参考凭证号
- `sales_org_code`（varchar）：导入-销售组织 → 公司组织.组织编码；实际销售考核明细.导入销售组织编码
- `factory_orgn`（varchar）：SAP交货工厂编码 → 实际销售考核明细.SAP交货工厂编码
- `inv_place_orgn`（varchar）：库存地编码 → 实际销售考核明细.记录库存地编码
- `chl_name_orgn`（varchar）：销售客户类型分类-原始 → 实际销售考核明细.原始客户类型分类
- `ass_remark`（varchar）：备注 → 实际销售考核明细.销售调整备注
- `ass_submitter`（varchar）：提交人 → 实际销售考核明细.记录提交人
- `cmdt_name`（varchar）：商品 → 商品.商品名称；实际销售考核明细.记录商品名称；组织销售目标.目标商品名称
- `cmdt_sap_code`（varchar）：商品SAP编码 → 商品.SAP商品编码；实际销售考核明细.考核商品SAP编码
- `cmdt_sap_name`（varchar）：商品SAP名称 → 商品.SAP商品名称
- `cmdt_sname`（varchar）：商品简称 → 商品.商品简称
- `cmdty_type_name`（varchar）：商品类型 → 商品.商品类型；实际销售考核明细.记录商品类型；组织销售目标.目标商品类型
- `brand_name`（varchar）：品牌 → 商品.品牌名称；组织销售目标.目标品牌
- `clfc_name`（varchar）：三级类目（最细一层，上级为p_clfc_name二级、p2_clfc_name一级） → 商品.三级类目
- `p_clfc_name`（varchar）：二级类目 → 商品.二级类目
- `p2_clfc_name`（varchar）：一级类目（最粗一层，如水、饮料） → 商品.一级类目
- `ctg_name`（varchar）：品类 → 商品.品类名称；品类.品类名称；实际销售考核明细.考核品类名称；组织销售目标.目标品类名称
- `item_name`（varchar）：品项 → 商品.品项
- `sku_code`（varchar）：SKU编码 → 商品.所属SKU编码；SKU.SKU编码；实际销售考核明细.考核SKU编码；组织销售目标.目标SKU编码
- `sku_name`（varchar）：SKU → 商品.所属SKU名称；SKU.SKU名称；实际销售考核明细.记录SKU名称；组织销售目标.目标SKU名称
- `spec_desc`（varchar）：包装规格 → 商品.包装规格；实际销售考核明细.记录包装规格；组织销售目标.目标包装规格
- `package_spec`（varchar）：箱规 → 商品.箱规；实际销售考核明细.记录箱规；组织销售目标.目标箱规
- `pack_type`（varchar）：包装类型 → 商品.包装类型
- `store_trans_type_name`（varchar）：储运类型 → 商品.储运类型
- `sales_ana_type_name`（varchar）：行销品类 → 商品.行销品类；实际销售考核明细.记录行销品类
- `sales_clfc_type_name`（varchar）：行销类目 → 商品.行销类目；实际销售考核明细.记录行销类目；组织销售目标.目标行销类目
- `dealer_range_code`（varchar）：考核方销售范围编码，与SAP客户编码不是同一种编码；可与原售达方不同。空值不自行用售达方填充，关联客户资料前核编码体系和目标键唯一性。 → 经销商.销售范围编码；实际销售考核明细.考核方销售范围编码
- `capacity`（varchar）：容量 → 商品.容量；SKU.SKU容量；实际销售考核明细.记录商品容量
- `contract_ctg_code`（varchar）：合同品类编码 → 商品.所附合同品类编码；实际销售考核明细.合同品类编码
- `contract_ctg_name`（varchar）：合同品类 → 商品.所附合同品类；实际销售考核明细.合同品类名称
- `sales_new_type_code`（varchar）：行销新品类代码 → 商品.行销新品类别编码；实际销售考核明细.行销新品类代码
- `sales_new_type_name`（varchar）：行销新品 → 商品.行销新品类别；实际销售考核明细.行销新品分类
- `dealer_type_group_name`（varchar）：销售客户类型分类-导入 → 实际销售考核明细.导入客户类型分类
- `target_amt`（double）：销售预算目标金额，取target_flag=Yes；实际销售行本列为0。按目标财务月、组织及可用业务维度汇总，与实际销售先分别汇总到共同维度再比较，不能按每条实际明细关联并重复累计目标。沿用当前报表定义：销售进度=考核金额合计/销售目标合计；销售达成=考核金额合计/截止日折算目标合计，显示百分数时乘100。报表称年累目标的折算值逐目标行计算为target_amt*销售进度系数/sales_day_cnt，系数规则见sales_day_rn；按所选累计期间求和。实际销售截止条件与目标选月条件分别处理；分母为0或缺失时结果未定义，不自动填0或100%。 → 销售预算目标.整期销售目标金额；组织销售目标.截止日折算目标金额；组织销售目标.整期销售目标金额
- `sales_day_cnt`（int）：目标所属财务月的销售天数，是目标折算分母；实际销售明细行为0，不参与目标折算。须在目标行且本值大于0时计算，缺失或非正数不能直接除。 → 组织销售目标.目标月销售天数；组织销售目标.截止日折算目标金额
- `sales_day_rn`（int）：销售天序号；实际销售明细行为0，预算目标行值来自加工时点，不能视为任意查询截止日的天序。沿用报表目标折算：先从db_ontology_mkt.v_trd_time_prg_df按截止日期date_id取得唯一一行，读取sales_fin_month_id及sales_day_rn作为截止财务月、截止日销售天序。目标ass_fin_month_id等于截止财务月取截止日天序，早于取本行sales_day_rn，晚于取0，所得系数用于target_amt备注的公式。日期维表零行或多行先诊断，不任取一行、不按明细展开。parm_date_id、parm_date_day只是原报表参数别名，不是本视图字段。 → 组织销售目标.记录销售天序；组织销售目标.截止日折算目标金额
- `target_flag`（varchar）：数据类型标记：No为实际销售调整明细，Yes为销售预算目标。两类记录粒度和时间字段不同；实际金额用ass_amt，目标用target_amt，不能两列相加。分析完成率时分别选取两类数据，不能用target_flag=No过滤整个数据集后再计算目标。
- `platform_item_name`（varchar）：平台项目 → 实际销售考核明细.平台项目
- `dealer_type_code_new`（varchar）：新财年客户类型编码。原Tableau按此列匹配人员权限配置；本视图不包含登录账号或该权限过滤，访问控制须由调用系统实施。 → 实际销售考核明细.新财年客户类型编码
- `dealer_type_name_new`（varchar）：销售客户类型 → 实际销售考核明细.新财年客户类型名称
- `type_group_name_new`（varchar）：销售客户类型分类 → 实际销售考核明细.新财年客户类型分类
- `dealer_sales_org_name`（varchar）：售达方销售组织 → 公司组织.组织名称；实际销售考核明细.售达方销售组织
- `dealer_sales_dis_name`（varchar）：销售大区 → 公司组织.组织名称；大区.组织名称；实际销售考核明细.售达方销售大区
- `dealer_sales_off_name`（varchar）：销售办事处 → 公司组织.组织名称；办事处.组织名称；实际销售考核明细.售达方销售办事处
- `send_sales_org_name`（varchar）：送达方销售组织 → 公司组织.组织名称；实际销售考核明细.送达方销售组织
- `send_sales_dis_name`（varchar）：送达方销售大区 → 公司组织.组织名称；大区.组织名称；实际销售考核明细.送达方销售大区
- `send_sales_off_name`（varchar）：送达方销售办事处 → 公司组织.组织名称；办事处.组织名称；实际销售考核明细.送达方销售办事处
- `fin_std_coe`（varchar）：标箱系数 → 商品.所附标箱系数；实际销售考核明细.标箱系数
- `exchange_rate`（double）：汇率，可能为空；本视图未提供完整币种及换算方向说明，不默认补1，也不对已加工考核金额再次换算；币种转换须另核适用口径。 → 实际销售考核明细.记录汇率

## `v_trd_sales_target_dealer_mi`

公司组织、办事处、大区、经销商、经销商销售目标、销售预算目标

- `fin_year`（varchar）：财年 → 销售预算目标.目标财年；经销商销售目标.目标财年
- `month_id`（varchar）：年月 → 销售预算目标.目标月份；经销商销售目标.截止日折算月目标金额；经销商销售目标.目标月份
- `dealer_range_code`（varchar）：经销商编码 → 经销商.销售范围编码；经销商销售目标.目标经销商编码
- `dealer_range_name`（varchar）：经销商 → 经销商.经销商名称；经销商销售目标.目标经销商名称
- `reg_name`（varchar）：区域 → 公司组织.组织名称；经销商销售目标.目标归属区域名称
- `reg_code`（varchar）：区域编码 → 公司组织.组织编码；经销商销售目标.目标归属区域编码
- `dis_name`（varchar）：大区 → 公司组织.组织名称；大区.组织名称；销售预算目标.大区引用名称；经销商销售目标.大区引用名称
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；销售预算目标.大区引用编码；经销商销售目标.大区引用编码
- `off_name`（varchar）：办事处 → 公司组织.组织名称；办事处.组织名称；销售预算目标.办事处引用名称；经销商销售目标.办事处引用名称
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；销售预算目标.办事处引用编码；经销商销售目标.办事处引用编码
- `target_months`（int）：计划月数 → 经销商销售目标.计划月数
- `target_total`（double）：合计销售目标（元） → 经销商销售目标.合计销售目标金额
- `turnover_amt`（double）：约定周转金（元） → 经销商销售目标.约定周转金金额
- `cvt_target_cy`（double）：折算为年度销售目标（元） → 经销商销售目标.折算年度销售目标金额
- `target_type`（varchar）：目标类型 → 经销商销售目标.目标类型
- `target_item`（varchar）：目标项目 → 经销商销售目标.目标项目
- `target_amt`（double）：销售目标金额 → 销售预算目标.整期销售目标金额；经销商销售目标.截止日折算月目标金额；经销商销售目标.整期销售目标金额

## `v_trd_sales_target_org_mi`

SKU、公司组织、办事处、品类、商品、大区、组织销售目标、销售预算目标

- `fin_year`（varchar）：财年 → 销售预算目标.目标财年；组织销售目标.目标财年
- `month_id`（varchar）：年月 → 销售预算目标.目标月份；组织销售目标.目标月份
- `off_code`（varchar）：办事处编码 → 公司组织.组织编码；办事处.组织编码；销售预算目标.办事处引用编码；组织销售目标.办事处引用编码
- `off_name`（varchar）：办事处名称 → 公司组织.组织名称；办事处.组织名称；销售预算目标.办事处引用名称；组织销售目标.办事处引用名称
- `dis_code`（varchar）：大区编码 → 公司组织.组织编码；大区.组织编码；销售预算目标.大区引用编码；组织销售目标.大区引用编码
- `dis_name`（varchar）：大区名称 → 公司组织.组织名称；大区.组织名称；销售预算目标.大区引用名称；组织销售目标.大区引用名称
- `cmdt_sap_id`（varchar）：商品编码sapid → 商品.SAP商品编码
- `cmdt_code`（varchar）：商品编码 → 商品.商品编码；组织销售目标.目标商品编码
- `cmdt_name`（varchar）：商品名称 → 商品.商品名称；组织销售目标.目标商品名称
- `target_amt`（double）：销售目标金额 → 销售预算目标.整期销售目标金额；组织销售目标.整期销售目标金额
- `cmdt_sname`（varchar）：商品简称 → 商品.商品简称
- `cmdt_type_name`（varchar）：商品类型 → 商品.商品类型；组织销售目标.目标商品类型
- `brand_name`（varchar）：品牌 → 商品.品牌名称；组织销售目标.目标品牌
- `clfc_name`（varchar）：三级类目 → 商品.三级类目
- `p_clfc_name`（varchar）：二级类目 → 商品.二级类目
- `p2_clfc_name`（varchar）：一级类目 → 商品.一级类目
- `ctg_name`（varchar）：品类 → 商品.品类名称；品类.品类名称；组织销售目标.目标品类名称
- `item_name`（varchar）：品项 → 商品.品项
- `sku_code`（varchar）：SKU编码 → 商品.所属SKU编码；SKU.SKU编码；组织销售目标.目标SKU编码
- `sku_name`（varchar）：SKU → 商品.所属SKU名称；SKU.SKU名称；组织销售目标.目标SKU名称
- `spec_desc`（varchar）：包装规格 → 商品.包装规格；组织销售目标.目标包装规格
- `package_spec`（varchar）：箱规 → 商品.箱规；组织销售目标.目标箱规
- `pack_type`（varchar）：包装类型 → 商品.包装类型
- `store_trans_type_name`（varchar）：储运类型 → 商品.储运类型
- `sales_ana_type_name`（varchar）：行销分析类 → 商品.行销分析类
- `sales_clfc_type_name`（varchar）：行销类目 → 商品.行销类目；组织销售目标.目标行销类目
- `ctg_code`（varchar）：品类编码 → 商品.品类编码；品类.品类编码；组织销售目标.目标品类编码
- `capacity`（varchar）：容量单位 → 商品.所附容量单位
- `sales_day_cnt`（varchar）：财务月销售天数 → 组织销售目标.目标月销售天数
- `sales_day_rn`（varchar）：销售天序号数 → 组织销售目标.记录销售天序
- `target_flag`（varchar）：销售预算目标标记

## `v_trd_time_prg_df`

业务日历日、月度分销目标、组织销售目标、经销商销售目标

- `date_fmt`（varchar）：日期yyyy-MM-dd → 业务日历日.日期
- `date_id`（varchar）：日期yyyyMMdd → 业务日历日.日期
- `year_id`（varchar）：自然年 → 业务日历日.自然年
- `month_id`（varchar）：自然月 → 业务日历日.自然月；经销商销售目标.截止日折算月目标金额；月度分销目标.截止日折算目标金额；月度分销目标.截止日折算水目标金额；月度分销目标.截止日折算东方树叶目标金额
- `fin_year`（varchar）：分销财年 → 业务日历日.分销财年
- `dist_day_cnt`（int）：月分销天数 → 业务日历日.月分销天数；经销商销售目标.截止日折算月目标金额；月度分销目标.单日分销目标金额；月度分销目标.单日水目标金额；月度分销目标.单日东方树叶目标金额；月度分销目标.截止日折算目标金额；月度分销目标.截止日折算水目标金额；月度分销目标.截止日折算东方树叶目标金额
- `if_dist`（int）：是否分销1是0否 → 业务日历日.是否分销日
- `dist_day_rn`（int）：分销天序号数 → 业务日历日.月分销天序号；经销商销售目标.截止日折算月目标金额；月度分销目标.截止日折算目标金额；月度分销目标.截止日折算水目标金额；月度分销目标.截止日折算东方树叶目标金额
- `dist_time_prg`（double）：分销时间进度 → 业务日历日.月分销时间进度；月度分销目标.截止日折算目标金额；月度分销目标.截止日折算水目标金额；月度分销目标.截止日折算东方树叶目标金额
- `sales_fin_year`（varchar）：销售财年 → 业务日历日.销售财年
- `sales_fin_month_id`（varchar）：销售财年月 → 业务日历日.销售财务月；组织销售目标.截止日折算目标金额
- `sales_day_cnt`（int）：月销售天数 → 业务日历日.月销售天数
- `sales_day_rn`（int）：销售天序号数 → 业务日历日.月销售天序号；组织销售目标.截止日折算目标金额
- `sales_time_prg`（double）：销售时间进度 → 业务日历日.月销售时间进度
- `year_sales_day_cnt`（int）：年销售天数 → 业务日历日.年销售天数
- `year_sales_day_rn`（int）：年销售天序号数 → 业务日历日.年销售天序号
- `year_sales_time_prg`（double）：年销售时间进度 → 业务日历日.年销售时间进度
- `year_dist_day_cnt`（int）：年分销天数 → 业务日历日.年分销天数
- `year_dist_day_rn`（int）：年分销天序号数 → 业务日历日.年分销天序号
- `year_dist_time_prg`（double）：年分销时间进度 → 业务日历日.年分销时间进度
