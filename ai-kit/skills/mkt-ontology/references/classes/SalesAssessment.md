# 实际销售考核明细 `SalesAssessment`

- 分组：交易
- 父类：无

## 说明

公司向经销商销售后形成的实际销售调整考核明细，仅包括target_flag为No的行，不包括预算目标。按财年、财务月、出库记录、商品及考核组织等维度解释，但该组合不保证全历史唯一。当前考核取ass_flag为Yes，同期取yty_ass_flag为Yes并使用yty期间及组织，两者金额均用ass_amt，不能相加。日统计使用相应考核日期，财务月统计不叠加自然日期同月条件；保留金额正负及空值，不重新乘汇率或用数量乘单价替代已加工金额。

## 指出的关系

- 考核商品 → 商品 `SalesAssessment_product`
  cmdt_code记录实际销售考核的商品；数量单位由basic_unit_desc_orgn解释，不自动当箱或标箱。
- 考核SKU → SKU `SalesAssessment_sku`
  实际考核明细直接记录sku_code、sku_name，用于同口径销售统计。
- 考核品类 → 品类 `SalesAssessment_category`
  ctg_name直接记录考核商品品类，与合同品类及行销类目区分。
- 考核方 → 经销商 `SalesAssessment_assessed_dealer`
  ass_dealer_sap_code_orgn、ass_dealer_name_orgn及dealer_range_code按考核方身份解释；无值占位不作为客户，不以售达方补齐。
- 售达方 → 经销商 `SalesAssessment_sold_to_dealer`
  dealer_sap_code_orgn和dealer_name_orgn记录销售售达方，与考核方和送达方分别保留。
- 送达方 → 经销商 `SalesAssessment_ship_to_dealer`
  send_dealer_sap_code_orgn和send_dealer_name_orgn记录销售送达方，不因名称相同而并入售达方身份。
- 当期考核办事处 → 办事处 `SalesAssessment_assessment_office`
  ass_org_code、ass_org_name记录当期考核归属，与当期财务期间配套，也是销售和目标对齐的组织口径。
- 当期考核大区 → 大区 `SalesAssessment_assessment_district`
  ass_dis_code、ass_dis_name直接记录当期考核大区，不用考核销售大区或售达方大区替代。
- 同期对齐办事处 → 办事处 `SalesAssessment_comparison_office`
  yty_org_code、yty_org_name记录同期对齐组织，与yty期间和标记配套，不沿用原ass_org归属。
- 同期对齐大区 → 大区 `SalesAssessment_comparison_district`
  yty_dis_code、yty_dis_name记录同期对齐大区，仅在相应同期口径使用。
- 当期考核销售办事处 → 办事处 `SalesAssessment_sales_office`
  ass_sales_off_name表示ass_sales组织口径的办事处，不与ass_org_name或售达方办事处互换。
- 当期考核销售大区 → 大区 `SalesAssessment_sales_district`
  ass_sales_dis_name直接表示ass_sales口径的大区。
- 当期考核销售组织 → 公司组织 `SalesAssessment_sales_organization`
  ass_sales_org_name记录当期考核销售组织，不把ass_sales_range_code用作任意组织外键。
- 同期销售办事处 → 办事处 `SalesAssessment_comparison_sales_office`
  yty_sales_off_name记录同期销售组织口径的办事处，与同期考核办事处yty_org_name区分。
- 同期销售大区 → 大区 `SalesAssessment_comparison_sales_district`
  yty_sales_dis_name记录同期销售组织口径的大区。
- 同期销售组织 → 公司组织 `SalesAssessment_comparison_sales_organization`
  yty_sales_org_name直接记录同期销售组织，配套同期期间使用。
- 售达方销售办事处 → 办事处 `SalesAssessment_sold_to_office`
  dealer_sales_off_name表示本笔销售售达方的销售办事处，不替代考核组织。
- 售达方销售大区 → 大区 `SalesAssessment_sold_to_district`
  dealer_sales_dis_name表示售达方销售大区，与送达方及考核归属分别保留。
- 售达方销售组织 → 公司组织 `SalesAssessment_sold_to_organization`
  dealer_sales_org_name直接记录本笔销售售达方组织。
- 送达方销售办事处 → 办事处 `SalesAssessment_ship_to_office`
  send_sales_off_name直接记录本笔销售送达方的销售办事处。
- 送达方销售大区 → 大区 `SalesAssessment_ship_to_district`
  send_sales_dis_name直接记录本笔销售送达方的销售大区。
- 送达方销售组织 → 公司组织 `SalesAssessment_ship_to_organization`
  send_sales_org_name直接记录本笔销售送达方组织，不与售达方组织合并。
- 当期考核区域 → 公司组织 `SalesAssessment_assessment_region`
  本笔实际销售在当期考核组织口径下归属的公司销售管理区域，由v_trd_sales_adjust_df中target_flag为No的同一行ass_reg_name直接记录，复用SalesAssessment_current_assessment_region_name。区域引用与该行ass_fin_year、ass_fin_month_id及当期考核组织配套；当期考核统计另按ass_flag为Yes选取。它不同于同期对齐区域，不沿大区当前所属区域推导，也不以名称引用推造组织编码。
- 同期对齐区域 → 公司组织 `SalesAssessment_comparison_region`
  本笔实际销售映射到同期比较口径后归属的公司销售管理区域，由v_trd_sales_adjust_df中target_flag为No的同一行yty_reg_name直接记录，复用SalesAssessment_comparison_assessment_region_name。区域引用与该行yty_fin_year、yty_fin_month_id及同期对齐组织配套；同期考核统计另按yty_ass_flag为Yes选取，日粒度使用对应的同期对齐日期。不沿用当期ass_reg_name，不机械减一年或通过大区当前层级替代，也不以名称引用推造组织编码。
- 导入销售组织 → 公司组织 `SalesAssessment_imported_sales_organization`
  本笔实际销售调整明细直接引用的导入销售组织，由v_trd_sales_adjust_df同一行的sales_org_code记录，复用SalesAssessment_imported_sales_organization_code属性。仅适用于target_flag为No且sales_org_code有实际组织引用的记录，保留该行考核期间和明细范围。不将本编码自动等同于ass_sales_range_code，也不以现有考核销售、售达方或送达方组织关系替代；不使用本行其他组织名称为该引用配名。该联系不表示已完成与组织主数据编码的对应或实例匹配。

## 指入的关系

无

## 属性

### 考核财务月 `SalesAssessment_current_financial_month`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_fin_month_id`
- 口径：本笔实际销售的考核财务月，格式为yyyyMM，与同一行的考核财年及当期考核组织配套。按财务月统计时，不追加考核日期所属自然月必须相同的条件。

### 同期对齐财务月 `SalesAssessment_comparison_financial_month`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_fin_month_id`
- 口径：原销售被映射到的同期对比财务月，与同一行的同期对齐财年、同期考核标记及同期对齐组织配套。不再机械减一年，也不要求等于原考核财务月。

### 考核财年 `SalesAssessment_current_financial_year`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_fin_year`
- 口径：本笔实际销售的当期考核财年，与考核财务月及当期考核组织配套。财年通常为上年12月至本年11月，但本属性直接采用记录值，不从考核日期的自然年推算。

### 同期对齐财年 `SalesAssessment_comparison_financial_year`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_fin_year`
- 口径：原销售映射到同期对比期间后的财年，与同期对齐财务月、同期考核标记及同期组织配套，不通过原考核财年减一年取得。

### 考核日期 `SalesAssessment_current_assessment_date`

- 类型：date
- 字段：`v_trd_sales_adjust_df.ass_date`、`v_trd_sales_adjust_df.ass_date_id`
- 口径：本笔实际销售的当期考核日期，用于日粒度和按截止日期统计实际销售。其自然月可能不同于考核财务月，不是订单创建日期或预计到货日期。

### 同期对齐日期 `SalesAssessment_comparison_assessment_date`

- 类型：date
- 字段：`v_trd_sales_adjust_df.yty_date`、`v_trd_sales_adjust_df.yty_date_id`
- 口径：原销售映射到同期对比期间后的日期，用于同期日粒度及截止日期统计。与同期组织和同期考核标记配套，不用原考核日期替代或再次减一年。

### 当期考核标记 `SalesAssessment_current_assessment_flag`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_flag`
- 口径：本笔实际销售是否进入当期考核统计的原始标记。当期实际考核取Yes；No不自动表示无效单、取消、退货或未发货。预算行也可能为Yes，因此不能仅凭本标记区分实际与目标。

### 同期考核标记 `SalesAssessment_comparison_assessment_flag`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_ass_flag`
- 口径：本笔实际销售是否进入同期考核统计的原始标记。同期实际考核取Yes并采用同期对齐期间及组织；不能据此改写当期考核标记，也不能将当期与同期金额相加。

### 出库记录标识 `SalesAssessment_dispatch_record_tag`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dlc_rcd_tag`
- 口径：本笔实际销售调整明细引用的出库记录标识。本列及其与考核财年、财务月、商品、考核组织组成的组合均未保证全历史唯一，不能据此任取一行或直接去重金额。

### 考核数量 `SalesAssessment_assessment_quantity`

- 类型：decimal
- 字段：`v_trd_sales_adjust_df.ass_cnt`
- 口径：本笔实际销售调整明细的考核数量，基本单位由同一行的基本单位说明解释。只在商品和单位口径明确后汇总，不直接混加不同单位，不自动认定为箱数、标箱数或已排除赠品的本品数量。

### 考核数量基本单位 `SalesAssessment_quantity_basic_unit`

- 类型：string
- 字段：`v_trd_sales_adjust_df.basic_unit_desc_orgn`
- 口径：本笔考核数量采用的基本单位说明，与同一行考核数量和商品配套，不作为所有商品统一使用的数量单位。

### 考核上单价 `SalesAssessment_assessment_unit_price`

- 类型：decimal
- 字段：`v_trd_sales_adjust_df.ass_price`
- 口径：本笔实际销售记录的考核单价，即上单价。单价不是可直接求和的销售额；金额优先采用已加工考核金额或考核含税金额，不仅凭数量乘本单价替代。资料未明确其计价单位及税口径。

### 销售考核金额 `SalesAssessment_assessment_amount`

- 类型：decimal
- 字段：`v_trd_sales_adjust_df.ass_amt`
- 口径：本笔实际销售调整后的考核金额，是销售进度和销售达成的实际金额依据。指标清单将销售考核金额定义为已发货本品的不含税金额，赠品不计；交货单货物移动状态C表示已发货，但本视图未提供该状态及本品、赠品标记，不用考核标记反推这些状态。采用已加工金额，保留正负和空值，不按金额去重，不以数量乘单价或再次乘汇率替代。

### 考核含税金额 `SalesAssessment_assessment_tax_inclusive_amount`

- 类型：decimal
- 字段：`v_trd_sales_adjust_df.ass_amt_witax`
- 口径：本笔实际销售调整明细已经加工的含税考核金额，与销售考核金额采用不同税口径，两列不能相加，也不能在缺少税率依据时自行互相反推。保留原始正负和空值。

### 标箱系数 `SalesAssessment_standard_case_factor`

- 类型：decimal
- 字段：`v_trd_sales_adjust_df.fin_std_coe`
- 口径：本笔销售考核明细记录的标箱系数。资料未给出它与考核基本单位数量的完整换算公式，因此本属性只保留系数原值，不据此直接声明可取得标箱销量。

### 记录汇率 `SalesAssessment_exchange_rate`

- 类型：decimal
- 字段：`v_trd_sales_adjust_df.exchange_rate`
- 口径：本笔销售调整明细所记录的汇率，可能为空。资料未提供完整币种和换算方向，不默认补1，也不对已加工考核金额再次换算。

### 考核商品编码 `SalesAssessment_product_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.cmdt_code`
- 口径：本笔实际销售考核引用的公司商品编码，是明细商品范围的一部分，不与SKU编码或商品SAP编码混用。

### 考核商品SAP编码 `SalesAssessment_product_sap_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.cmdt_sap_code`
- 口径：本笔考核明细记录的商品SAP编码，与公司商品编码分别保留，不自行认定两种编码可以互换。

### 记录商品名称 `SalesAssessment_product_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.cmdt_name`
- 口径：本笔销售考核明细所附的商品名称，与本行商品编码配套，不以名称相同认定不同商品编码属于同一商品。

### 考核SKU编码 `SalesAssessment_sku_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.sku_code`
- 口径：本笔实际销售考核直接记录的SKU引用编码，表示商品统计规格范围，不与商品编码去重粒度混同。

### 记录SKU名称 `SalesAssessment_sku_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.sku_name`
- 口径：本笔考核明细所附的SKU名称，与同一行SKU编码配套，用于解释本明细的统计规格。

### 考核品类名称 `SalesAssessment_category_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ctg_name`
- 口径：本笔销售考核直接记录的商品品类名称，不同于合同品类和行销类目。天然水也称红瓶水、红水，东方树叶也简称树叶。

### 记录商品类型 `SalesAssessment_product_type_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.cmdty_type_name`
- 口径：本笔考核明细所附的商品类型名称，用于区分成品、终端品、包材等商品范围。分销明细的全局考核筛选不能仅因字段相似而直接套用到本实体。

### 记录行销类目 `SalesAssessment_marketing_class_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.sales_clfc_type_name`
- 口径：本笔考核明细的行销类目，水、饮料按此字段识别，不等同商品品类或合同品类。大包装水口径同时限定本列为水且容量为4L、4.5L、5L、6L或12.9L。

### 记录行销品类 `SalesAssessment_marketing_category_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.sales_ana_type_name`
- 口径：本笔销售考核明细所附的行销品类，不与商品品类或行销类目合并。指标清单的销售考核金额统计排除本列为文本NaN的记录，文本占位与数据库空值不混为同一取值。

### 记录商品容量 `SalesAssessment_product_capacity`

- 类型：string
- 字段：`v_trd_sales_adjust_df.capacity`
- 口径：本笔销售考核明细所附的商品容量，可与行销类目配套识别大包装水等商品范围。保留记录提供的容量表示，不默认统一为升或毫升数值。

### 合同品类编码 `SalesAssessment_contract_category_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.contract_ctg_code`
- 口径：本笔销售考核明细直接记录的合同品类引用编码，与合同品类名称配套，不等同商品品类编码或SKU编码。

### 合同品类名称 `SalesAssessment_contract_category_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.contract_ctg_name`
- 口径：本笔销售考核明细记录的合同品类名称，用于解释合同品类范围，不用商品品类名称替代。

### 行销新品类代码 `SalesAssessment_marketing_new_product_type_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.sales_new_type_code`
- 口径：本笔销售考核明细所附的行销新品分类代码，与行销新品名称配套，不自行把它解释为商品上市日期或本财年新品标记。

### 行销新品分类 `SalesAssessment_marketing_new_product_type_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.sales_new_type_name`
- 口径：本笔考核明细记录的行销新品分类名称，按同一行分类代码解释，不从名称反推商品永久类别或上市时间。

### 记录包装规格 `SalesAssessment_packaging_specification`

- 类型：string
- 字段：`v_trd_sales_adjust_df.spec_desc`
- 口径：本笔销售考核明细所附的商品包装规格说明。包装规格用于解释商品，不直接作为考核数量已经按箱计量的依据。

### 记录箱规 `SalesAssessment_case_specification`

- 类型：string
- 字段：`v_trd_sales_adjust_df.package_spec`
- 口径：本笔考核明细所附的商品箱规说明，与包装规格分别保留。未提供明确数量换算公式时，不据此自行转换考核基本单位数量。

### 考核方销售范围编码 `SalesAssessment_assessed_dealer_sales_range_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dealer_range_code`
- 口径：本笔实际销售的考核方销售范围引用编码，与考核方SAP编码属于不同标识体系。考核方可以不同于原售达方，空值不自行用售达方填充。

### 考核方SAP编码 `SalesAssessment_assessed_dealer_sap_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_dealer_sap_code_orgn`
- 口径：本笔销售调整明细直接记录的考核方SAP引用编码，与考核方名称配套。NaN等无值占位不能作为真实客户编码关联，不以售达方或送达方编码补齐。

### 考核方名称 `SalesAssessment_assessed_dealer_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_dealer_name_orgn`
- 口径：本笔销售调整明细记录的考核方名称，源注释称导入考核售达方，但本模型按考核方身份解释，与普通售达方及送达方分别保留。

### 售达方SAP编码 `SalesAssessment_sold_to_dealer_sap_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dealer_sap_code_orgn`
- 口径：本笔公司销售记录中的售达方SAP引用编码，不同于考核方和送达方编码，不自行转换成销售范围编码。

### 售达方名称 `SalesAssessment_sold_to_dealer_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dealer_name_orgn`
- 口径：本笔销售记录直接提供的售达方名称，按售达身份解释，不因名称相同而并入考核方或送达方。

### 送达方SAP编码 `SalesAssessment_ship_to_dealer_sap_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.send_dealer_sap_code_orgn`
- 口径：本笔销售记录中的送达方SAP引用编码，与售达方及考核方身份分别保留，不自行补成送达方销售范围编码。

### 送达方名称 `SalesAssessment_ship_to_dealer_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.send_dealer_name_orgn`
- 口径：本笔销售记录直接提供的送达方名称，不用售达方或考核方名称替代。

### 原始销售客户类型 `SalesAssessment_original_dealer_type`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dealer_type_desc_orgn`
- 口径：本笔销售调整明细保存的原始销售客户类型说明。资料未明确它描述考核方、售达方还是送达方，不将其提升为任一参与客户的通用类型属性。

### 原始客户类型分类 `SalesAssessment_original_dealer_type_group`

- 类型：string
- 字段：`v_trd_sales_adjust_df.chl_name_orgn`
- 口径：本笔销售调整明细保存的原始销售客户类型分类。与导入分类、新财年分类分别读取，资料不足以认定三者可以互换。

### 导入客户类型分类 `SalesAssessment_imported_dealer_type_group`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dealer_type_group_name`
- 口径：本笔销售调整明细所附、标注为导入的销售客户类型分类，不与原始客户类型分类或新财年客户类型分类自行合并。

### 新财年客户类型编码 `SalesAssessment_new_financial_year_dealer_type_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dealer_type_code_new`
- 口径：本笔考核明细所附的新财年销售客户类型编码，不覆盖原始客户类型。原报表用本列匹配人员权限配置，但本视图没有登录账号及完整权限过滤，字段存在不表示访问控制已经实施。

### 新财年客户类型名称 `SalesAssessment_new_financial_year_dealer_type_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dealer_type_name_new`
- 口径：本笔销售考核明细所附的新财年销售客户类型名称，与对应新财年类型编码配套，不自行解释为交易发生时的原始客户类型。

### 新财年客户类型分类 `SalesAssessment_new_financial_year_dealer_type_group`

- 类型：string
- 字段：`v_trd_sales_adjust_df.type_group_name_new`
- 口径：本笔销售考核明细所附的新财年销售客户类型分类，与原始和导入分类分别解释，不从当前客户主数据覆盖本记录值。

### 当期考核办事处编码 `SalesAssessment_current_assessment_office_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_org_code`
- 口径：本笔实际销售当期考核归属办事处的引用编码，与当期考核期间及办事处名称配套，是销售与目标按考核组织对齐时采用的组织口径。

### 当期考核办事处名称 `SalesAssessment_current_assessment_office_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_org_name`
- 口径：本笔实际销售的当期考核办事处名称，与对应考核办事处编码配套，不与考核销售办事处或售达方销售办事处互换。

### 当期考核大区编码 `SalesAssessment_current_assessment_district_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_dis_code`
- 口径：本笔实际销售直接记录的当期考核大区引用编码，不由当前办事处组织层级反推，也不以考核销售大区或售达方大区替代。

### 当期考核大区名称 `SalesAssessment_current_assessment_district_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_dis_name`
- 口径：本笔销售的当期考核大区名称，与当期考核大区编码配套。销售与目标采用该归属口径比较时，仍须保持期间和目标覆盖范围一致。

### 当期考核区域名称 `SalesAssessment_current_assessment_region_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_reg_name`
- 口径：本笔实际销售在当期考核组织口径下直接记录的区域名称，表示大区上层的区域组织，不是省市行政区划，也不由当前组织层级覆盖。

### 同期对齐办事处编码 `SalesAssessment_comparison_assessment_office_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_org_code`
- 口径：本笔销售映射到同期比较口径后的考核办事处引用编码，与同期对齐期间和同期考核标记配套，不默认沿用原当期考核归属。

### 同期对齐办事处名称 `SalesAssessment_comparison_assessment_office_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_org_name`
- 口径：本笔销售的同期对齐考核办事处名称，与同期办事处编码配套，不等同原考核办事处或同期销售组织口径的办事处。

### 同期对齐大区编码 `SalesAssessment_comparison_assessment_district_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_dis_code`
- 口径：本笔销售在同期对齐考核口径下直接记录的大区引用编码，与同期期间配套，不用当期大区编码覆盖。

### 同期对齐大区名称 `SalesAssessment_comparison_assessment_district_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_dis_name`
- 口径：本笔销售的同期对齐考核大区名称，与同期大区编码配套，区别于同期销售大区及原当期考核大区。

### 同期对齐区域名称 `SalesAssessment_comparison_assessment_region_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_reg_name`
- 口径：本笔销售在同期对齐考核组织口径下直接记录的上层区域组织名称，与同期期间配套，不沿用当期考核区域或当前组织架构。

### 当期考核销售组织范围编码 `SalesAssessment_current_sales_organization_scope_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_sales_range_code`
- 口径：本笔销售在当期考核销售组织口径下记录的范围编码，属于ass_sales_*口径，不等同考核办事处编码或考核方销售范围编码，也不是任意组织的通用编码。

### 当期考核销售办事处 `SalesAssessment_current_sales_office_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_sales_off_name`
- 口径：本笔实际销售在当期考核销售组织口径下记录的办事处名称，可能不同于当期考核办事处，不能直接替代销售目标归属组织。

### 当期考核销售大区 `SalesAssessment_current_sales_district_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_sales_dis_name`
- 口径：本笔销售在当期考核销售组织口径下记录的大区名称，与当期考核大区及售达方销售大区分别保留。

### 当期考核销售组织 `SalesAssessment_current_sales_organization_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_sales_org_name`
- 口径：本笔销售记录的当期考核销售组织名称，与售达方销售组织和送达方销售组织不是同一参与身份。

### 同期销售组织范围编码 `SalesAssessment_comparison_sales_organization_scope_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_sales_range_code`
- 口径：本笔销售在同期销售组织口径下记录的范围编码，与同期销售组织名称及同期期间配套，不等同同期对齐考核办事处编码。

### 同期销售办事处 `SalesAssessment_comparison_sales_office_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_sales_off_name`
- 口径：本笔销售在同期销售组织口径下记录的办事处名称，与同期对齐考核办事处分别解释。

### 同期销售大区 `SalesAssessment_comparison_sales_district_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_sales_dis_name`
- 口径：本笔销售在同期销售组织口径下直接记录的大区名称，配套同期期间，不与同期对齐考核大区混用。

### 同期销售组织 `SalesAssessment_comparison_sales_organization_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.yty_sales_org_name`
- 口径：本笔销售直接记录的同期销售组织名称，与同期销售组织范围及同期对齐期间配套，不采用原当期销售组织补齐。

### 售达方销售办事处 `SalesAssessment_sold_to_sales_office_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dealer_sales_off_name`
- 口径：本笔销售直接记录的售达方销售办事处名称，属于售达方组织口径，不替代考核办事处或送达方办事处。

### 售达方销售大区 `SalesAssessment_sold_to_sales_district_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dealer_sales_dis_name`
- 口径：本笔销售直接记录的售达方销售大区名称，与考核归属和送达方销售大区分别保留，不从当前客户主数据覆盖。

### 售达方销售组织 `SalesAssessment_sold_to_sales_organization_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dealer_sales_org_name`
- 口径：本笔销售直接记录的售达方销售组织名称，不因组织名称相同而与考核销售组织或送达方销售组织合并。

### 送达方销售办事处 `SalesAssessment_ship_to_sales_office_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.send_sales_off_name`
- 口径：本笔销售直接记录的送达方销售办事处名称，属于送达方组织口径，不用售达方或考核办事处替代。

### 送达方销售大区 `SalesAssessment_ship_to_sales_district_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.send_sales_dis_name`
- 口径：本笔销售直接记录的送达方销售大区名称，保留送达身份，与售达方和考核组织的大区范围分别解释。

### 送达方销售组织 `SalesAssessment_ship_to_sales_organization_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.send_sales_org_name`
- 口径：本笔销售直接记录的送达方销售组织名称，与送达方客户及其销售办事处、大区配套。

### 导入销售组织编码 `SalesAssessment_imported_sales_organization_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.sales_org_code`
- 口径：本笔销售调整明细导入时记录的销售组织引用编码。资料尚未明确它与考核销售组织、售达方组织或送达方组织的身份对应，不将其直接映射为其中任一口径的编码。

### 销售订单编码 `SalesAssessment_sales_order_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.sales_ord_code`
- 口径：本笔实际销售调整明细引用的公司销售订单编码，属于公司向经销商销售的订单，不是经销商向门店分销的订单编码，也不作为本考核明细的唯一标识。

### 销售订单类型编码 `SalesAssessment_sales_order_type_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.sales_ord_type_orgn`
- 口径：本笔销售调整明细记录的销售订单类型编码，与本行公司销售订单配套，不套用分销订单类型枚举判断退货或有效性。

### 交货单编码 `SalesAssessment_delivery_order_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.dlv_ord_code`
- 口径：本笔实际销售调整明细引用的交货单编码。交货单引用值本身不提供货物移动状态，不能只凭编码非空判断交货单已完全处理。

### 记录批次 `SalesAssessment_batch`

- 类型：string
- 字段：`v_trd_sales_adjust_df.batch_orgn`
- 口径：本笔销售调整明细记录的批次值，与同一行商品和出库记录对应，不据此补建批次生产或库存过程。

### 记录发票类型 `SalesAssessment_invoice_type`

- 类型：string
- 字段：`v_trd_sales_adjust_df.invoice_type_orgn`
- 口径：本笔销售调整明细所附的发票类型，不表示已经提供发票号码、开票金额或回款事实，也不凭类型名称推导金额税率。

### 销售订单原因 `SalesAssessment_order_reason`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ord_reason_desc_orgn`
- 口径：本笔销售调整明细保存的订单原因说明，用于解释对应销售业务，不将其自动转换为取消、退货或有效性状态。

### 导入预计到货日期 `SalesAssessment_expected_arrival_date`

- 类型：date
- 字段：`v_trd_sales_adjust_df.plan_dlv_date_orgn`
- 口径：本笔销售调整明细导入时记录的预计到货日期，不是实际到货、签收或考核日期，不能用作实际销售考核的默认时间归属。

### 记录运输方式 `SalesAssessment_transportation_mode`

- 类型：string
- 字段：`v_trd_sales_adjust_df.trsp_type_desc_orgn`
- 口径：本笔销售调整明细所附的运输方式说明，只描述该销售记录的运输安排，不表示运输已经完成。

### 记录装运类型 `SalesAssessment_loading_type`

- 类型：string
- 字段：`v_trd_sales_adjust_df.load_trsp_type_desc_orgn`
- 口径：本笔销售调整明细记录的装运类型，与运输方式分别保留，不仅凭名称判断发货或到货状态。

### 股份订单引用 `SalesAssessment_share_order_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.share_ord_code_orgn`
- 口径：本笔销售调整明细中标注为股份订单的原始引用值，不自行认定与销售订单编码、交货单编码或分销订单编码等价。

### 参考凭证号 `SalesAssessment_reference_voucher_number`

- 类型：string
- 字段：`v_trd_sales_adjust_df.voucher_no_orgn`
- 口径：本笔销售调整明细保存的参考凭证引用号，用于追溯对应销售记录，不作为本明细唯一标识，也不据此认定已经回款或付款。

### SAP交货工厂编码 `SalesAssessment_delivery_factory_sap_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.factory_orgn`
- 口径：本笔销售调整明细直接记录的SAP交货工厂引用编码，不作为公司考核组织或经销商编码使用。

### 记录库存地编码 `SalesAssessment_inventory_location_code`

- 类型：string
- 字段：`v_trd_sales_adjust_df.inv_place_orgn`
- 口径：本笔销售调整明细记录的库存地引用编码，不表示本行已提供该库存地的库存余额或经销商库存数量。

### 平台项目 `SalesAssessment_platform_project_name`

- 类型：string
- 字段：`v_trd_sales_adjust_df.platform_item_name`
- 口径：本笔销售调整明细记录的平台项目名称，不自动解释为营销活动、销售目标项目或费用项目的同一对象。

### 销售调整备注 `SalesAssessment_adjustment_remark`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_remark`
- 口径：本笔销售调整考核明细的备注原文，用于解释该明细，不凭备注关键词自动生成考核状态或金额调整规则。

### 记录提交人 `SalesAssessment_submitter`

- 类型：string
- 字段：`v_trd_sales_adjust_df.ass_submitter`
- 口径：本笔销售调整明细记录的提交人文本。资料未说明它采用员工编码、域账号还是姓名，不直接当作已匹配员工的标识。
