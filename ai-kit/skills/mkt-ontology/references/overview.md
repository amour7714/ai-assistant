# 营销费用本体-20261106

这份说明由 `ontology-studio/build_catalog.py` 生成。口径以本体属性说明为准。

## 建模说明

建模范围为数据设计的“数据范围”工作表列出的37张表。业务知识和指标补充范围内表的业务语义，范围外表引用不扩充建模范围。用户已确认：销售考核表以数据设计为准；陈列签约表以知识文档为准；其余表以数据设计为结构基础。仅有元数据与文档，无表数据。用户于2026-11-06确认：本轮材料中的疑似异常就是确认虚假；AC表v_chl_ac_nf_sku_mi.distnm表示大区，覆盖原文中省份或城市的冲突解释。付费客户和付费陈列门店可能是不同范围。

## 规模

- 库：`db_ontology_mkt`
- 类 55，关系 306，属性 1846
- 数值指标 380（整数或小数属性，没有单独的计算公式）
- 视图 40，其中 37 张已挂到本体

查数用 `db_ontology_mkt` 里的视图。不要改去查底层大宽表，除非用户明确要求。

## 类

| 分组 | 类 | 中文 | 父类 | 属性 |
| --- | --- | --- | --- | --- |
| 渠道 | `Store` | 门店 |  | 49 |
| 渠道 | `StoreScope` | 子门店 |  | 94 |
| 渠道 | `Dealer` | 经销商 |  | 35 |
| 渠道 | `VisitRoute` | 线路 |  | 3 |
| 渠道 | `PlannedStoreVisit` | 计划门店拜访 |  | 14 |
| 渠道 | `StoreVisit` | 门店拜访 |  | 102 |
| 组织 | `Organization` | 公司组织 |  | 16 |
| 组织 | `SalesOffice` | 办事处 | Organization | 16 |
| 组织 | `SalesDistrict` | 大区 | Organization | 16 |
| 组织 | `BusinessLine` | 事业线 |  | 2 |
| 组织 | `Employee` | 员工 |  | 22 |
| 组织 | `SalesRepresentative` | 业代 | Employee | 24 |
| 组织 | `SalesSupervisor` | 主任 | Employee | 22 |
| 商品 | `Product` | 商品 |  | 66 |
| 商品 | `SKU` | SKU |  | 3 |
| 商品 | `ProductCategory` | 品类 |  | 2 |
| 交易 | `DistributionOrderLine` | 分销订单行 |  | 95 |
| 交易 | `FalseDistributionOrderLine` | 虚假分销订单行 | DistributionOrderLine | 121 |
| 交易 | `SalesAssessment` | 实际销售考核明细 |  | 86 |
| 交易 | `DealerInventory` | 经销商商品库存 |  | 45 |
| 目标 | `SalesTarget` | 销售预算目标 |  | 7 |
| 目标 | `DealerSalesTarget` | 经销商销售目标 | SalesTarget | 18 |
| 目标 | `OfficeSalesTarget` | 组织销售目标 | SalesTarget | 22 |
| 目标 | `DistributionTarget` | 月度分销目标 |  | 39 |
| 目标 | `BusinessCalendarDay` | 业务日历日 |  | 19 |
| 稽查 | `StoreInspectionMonth` | 门店月度稽查结果 |  | 119 |
| 稽查 | `ACMarketObservation` | AC月度市场指标 |  | 16 |
| 稽查 | `DuplicateStoreFinding` | 虚假重复客资认定 |  | 16 |
| 稽查 | `FalseDisplayFinding` | 虚假陈列认定 |  | 15 |
| 活动 | `MarketingActivity` | 营销活动 |  | 5 |
| 活动 | `DisplayActivity` | 陈列活动 | MarketingActivity | 16 |
| 活动 | `DistributionPackage` | 分销套餐 | MarketingActivity | 16 |
| 活动 | `UnifiedCampaign` | 统案活动 | MarketingActivity | 15 |
| 活动 | `GiftWithGoodsCampaign` | 随货搭赠活动 | MarketingActivity | 8 |
| 活动 | `ActivityPlanDetail` | 活动计划明细 |  | 75 |
| 活动 | `DisplaySigning` | 陈列签约 |  | 67 |
| 活动 | `DisplayItem` | 陈列项 |  | 6 |
| 活动 | `DisplayPaymentCoupon` | 陈列支付卡券 |  | 5 |
| 活动 | `PackageExecutionCost` | 套餐门店执行费用 |  | 39 |
| 活动 | `DisplayItemInspection` | 月度陈列项检查结果 |  | 23 |
| 活动 | `DisplayExecutionSummary` | 门店陈列执行统计 |  | 73 |
| 活动 | `GiftSinkDetail` | 搭赠下沉明细 |  | 39 |
| 费用 | `ExpenseBudgetItem` | 营销费用预算项 |  | 17 |
| 费用 | `ReservedExpenseAccount` | 预留费用账户 |  | 16 |
| 费用 | `CustomerPlanQuota` | 客户自有计划额度 |  | 19 |
| 费用 | `CustomerVerificationQuota` | 客户自有核销额度 |  | 25 |
| 费用 | `ExpenseWallet` | 费用钱包 |  | 28 |
| 费用 | `WalletEntry` | 钱包分录 |  | 62 |
| 费用 | `ExpenseEvent` | 营销费用业务事件 |  | 33 |
| 费用 | `WalletTraceRule` | 钱包业务追溯规则 |  | 24 |
| 费用 | `ExpensePackage` | 费用包 |  | 34 |
| 费用 | `DisplayExpensePackage` | 陈列费用包 | ExpensePackage | 34 |
| 费用 | `UnifiedSupportItem` | 统案支持费用项 |  | 24 |
| 费用 | `UnifiedCustomerAllocation` | 统案客户分配 |  | 23 |
| 费用 | `ExpenseSource` | 费用来源 |  | 16 |

## 关系

- 子门店 → 对应门店 → 门店 (`StoreScope_of_store`)
- 子门店 → 所属销售客户 → 经销商 (`StoreScope_owned_by_dealer`)
- 子门店 → 服务销售客户 → 经销商 (`StoreScope_served_by_dealer`)
- 子门店 → 配送销售客户 → 经销商 (`StoreScope_delivered_by_dealer`)
- 子门店 → 负责业代 → 业代 (`StoreScope_sales_representative`)
- 子门店 → 负责主任 → 主任 (`StoreScope_supervisor`)
- 子门店 → 负责理货员 → 员工 (`StoreScope_merchandiser`)
- 子门店 → 业代服务线路 → 线路 (`StoreScope_sales_route`)
- 子门店 → 理货服务线路 → 线路 (`StoreScope_merchandising_route`)
- 子门店 → 归属办事处 → 办事处 (`StoreScope_office`)
- 子门店 → 归属大区 → 大区 (`StoreScope_district`)
- 办事处 → 所属大区 → 大区 (`SalesOffice_district`)
- 大区 → 所属区域 → 公司组织 (`SalesDistrict_region`)
- 经销商 → 归属办事处 → 办事处 (`Dealer_office`)
- 经销商 → 归属大区 → 大区 (`Dealer_district`)
- 经销商 → 上级经销商 → 经销商 (`Dealer_parent_dealer`)
- 经销商 → 负责主任 → 主任 (`Dealer_supervisor`)
- 员工 → 任职组织 → 公司组织 (`Employee_organization`)
- 员工 → 上级员工 → 员工 (`Employee_superior`)
- 业代 → 对应主任 → 主任 (`SalesRepresentative_supervisor`)
- 商品 → 归入SKU → SKU (`Product_sku`)
- 商品 → 所属品类 → 品类 (`Product_category`)
- 分销订单行 → 交易商品 → 商品 (`DistributionOrderLine_product`)
- 分销订单行 → 交易SKU → SKU (`DistributionOrderLine_sku`)
- 分销订单行 → 交易品类 → 品类 (`DistributionOrderLine_category`)
- 分销订单行 → 交易门店 → 门店 (`DistributionOrderLine_store`)
- 分销订单行 → 交易子门店 → 子门店 (`DistributionOrderLine_store_scope`)
- 分销订单行 → 当时所属销售客户 → 经销商 (`DistributionOrderLine_original_dealer`)
- 分销订单行 → 当时服务销售客户 → 经销商 (`DistributionOrderLine_original_service_dealer`)
- 分销订单行 → 记录所属销售客户 → 经销商 (`DistributionOrderLine_current_dealer`)
- 分销订单行 → 明细附带服务客户 → 经销商 (`DistributionOrderLine_current_service_dealer`)
- 分销订单行 → 当时业代 → 业代 (`DistributionOrderLine_original_representative`)
- 分销订单行 → 明细附带业代 → 业代 (`DistributionOrderLine_current_representative`)
- 分销订单行 → 明细附带主管 → 员工 (`DistributionOrderLine_current_supervisor`)
- 分销订单行 → 当时线路 → 线路 (`DistributionOrderLine_original_route`)
- 分销订单行 → 明细附带线路 → 线路 (`DistributionOrderLine_current_route`)
- 分销订单行 → 当时所属办事处 → 办事处 (`DistributionOrderLine_original_office`)
- 分销订单行 → 当时所属大区 → 大区 (`DistributionOrderLine_original_district`)
- 分销订单行 → 当时服务办事处 → 办事处 (`DistributionOrderLine_service_office`)
- 分销订单行 → 当时服务大区 → 大区 (`DistributionOrderLine_service_district`)
- 分销订单行 → 记录办事处 → 办事处 (`DistributionOrderLine_current_office`)
- 分销订单行 → 记录大区 → 大区 (`DistributionOrderLine_current_district`)
- 分销订单行 → 参与渠道活动 → 营销活动 (`DistributionOrderLine_channel_activity`)
- 虚假分销订单行 → 认定记录销售人员 → 员工 (`FalseDistributionOrderLine_recorded_representative`)
- 虚假分销订单行 → 最近派发人 → 员工 (`FalseDistributionOrderLine_dispatcher`)
- 虚假分销订单行 → 派发检查人 → 员工 (`FalseDistributionOrderLine_assigned_inspector`)
- 虚假分销订单行 → 实际检查人 → 员工 (`FalseDistributionOrderLine_actual_inspector`)
- 实际销售考核明细 → 考核商品 → 商品 (`SalesAssessment_product`)
- 实际销售考核明细 → 考核SKU → SKU (`SalesAssessment_sku`)
- 实际销售考核明细 → 考核品类 → 品类 (`SalesAssessment_category`)
- 实际销售考核明细 → 考核方 → 经销商 (`SalesAssessment_assessed_dealer`)
- 实际销售考核明细 → 售达方 → 经销商 (`SalesAssessment_sold_to_dealer`)
- 实际销售考核明细 → 送达方 → 经销商 (`SalesAssessment_ship_to_dealer`)
- 实际销售考核明细 → 当期考核办事处 → 办事处 (`SalesAssessment_assessment_office`)
- 实际销售考核明细 → 当期考核大区 → 大区 (`SalesAssessment_assessment_district`)
- 实际销售考核明细 → 同期对齐办事处 → 办事处 (`SalesAssessment_comparison_office`)
- 实际销售考核明细 → 同期对齐大区 → 大区 (`SalesAssessment_comparison_district`)
- 实际销售考核明细 → 当期考核销售办事处 → 办事处 (`SalesAssessment_sales_office`)
- 实际销售考核明细 → 当期考核销售大区 → 大区 (`SalesAssessment_sales_district`)
- 实际销售考核明细 → 当期考核销售组织 → 公司组织 (`SalesAssessment_sales_organization`)
- 实际销售考核明细 → 同期销售办事处 → 办事处 (`SalesAssessment_comparison_sales_office`)
- 实际销售考核明细 → 同期销售大区 → 大区 (`SalesAssessment_comparison_sales_district`)
- 实际销售考核明细 → 同期销售组织 → 公司组织 (`SalesAssessment_comparison_sales_organization`)
- 实际销售考核明细 → 售达方销售办事处 → 办事处 (`SalesAssessment_sold_to_office`)
- 实际销售考核明细 → 售达方销售大区 → 大区 (`SalesAssessment_sold_to_district`)
- 实际销售考核明细 → 售达方销售组织 → 公司组织 (`SalesAssessment_sold_to_organization`)
- 实际销售考核明细 → 送达方销售办事处 → 办事处 (`SalesAssessment_ship_to_office`)
- 实际销售考核明细 → 送达方销售大区 → 大区 (`SalesAssessment_ship_to_district`)
- 实际销售考核明细 → 送达方销售组织 → 公司组织 (`SalesAssessment_ship_to_organization`)
- 经销商销售目标 → 目标经销商 → 经销商 (`DealerSalesTarget_dealer`)
- 经销商销售目标 → 目标归属办事处 → 办事处 (`DealerSalesTarget_office`)
- 经销商销售目标 → 目标归属大区 → 大区 (`DealerSalesTarget_district`)
- 组织销售目标 → 目标办事处 → 办事处 (`OfficeSalesTarget_office`)
- 组织销售目标 → 目标大区 → 大区 (`OfficeSalesTarget_district`)
- 组织销售目标 → 目标商品 → 商品 (`OfficeSalesTarget_product`)
- 组织销售目标 → 目标SKU → SKU (`OfficeSalesTarget_sku`)
- 组织销售目标 → 目标品类 → 品类 (`OfficeSalesTarget_category`)
- 组织销售目标 → 截止日折算依据 → 业务日历日 (`OfficeSalesTarget_cutoff_calendar`)
- 月度分销目标 → 业代目标承担人 → 业代 (`DistributionTarget_representative`)
- 月度分销目标 → 主任目标承担人 → 主任 (`DistributionTarget_supervisor`)
- 月度分销目标 → 业代目标所属主任 → 主任 (`DistributionTarget_managing_supervisor`)
- 月度分销目标 → 经销商目标主体 → 经销商 (`DistributionTarget_dealer`)
- 月度分销目标 → 办事处目标主体 → 办事处 (`DistributionTarget_office_subject`)
- 月度分销目标 → 门店进货目标主体 → 子门店 (`DistributionTarget_store_scope`)
- 月度分销目标 → 进货目标对应门店 → 门店 (`DistributionTarget_store`)
- 月度分销目标 → 目标归属办事处 → 办事处 (`DistributionTarget_attribution_office`)
- 月度分销目标 → 目标归属大区 → 大区 (`DistributionTarget_attribution_district`)
- 月度分销目标 → 分销日历依据 → 业务日历日 (`DistributionTarget_calendar`)
- 门店月度稽查结果 → 被检查门店 → 门店 (`StoreInspectionMonth_store`)
- 门店月度稽查结果 → 记录所属销售客户 → 经销商 (`StoreInspectionMonth_dealer`)
- 门店月度稽查结果 → 记录服务销售客户 → 经销商 (`StoreInspectionMonth_service_dealer`)
- 门店月度稽查结果 → 记录业代 → 业代 (`StoreInspectionMonth_representative`)
- 门店月度稽查结果 → 记录主任 → 主任 (`StoreInspectionMonth_supervisor`)
- 门店月度稽查结果 → 记录线路 → 线路 (`StoreInspectionMonth_route`)
- 门店月度稽查结果 → 月度办事处 → 办事处 (`StoreInspectionMonth_office`)
- 门店月度稽查结果 → 月度大区 → 大区 (`StoreInspectionMonth_district`)
- 门店月度稽查结果 → 当前办事处 → 办事处 (`StoreInspectionMonth_current_office`)
- 门店月度稽查结果 → 当前大区 → 大区 (`StoreInspectionMonth_current_district`)
- AC月度市场指标 → 适用组织 → 公司组织 (`ACMarketObservation_applicable_organization`)
- AC月度市场指标 → 统计大区 → 大区 (`ACMarketObservation_district`)
- 活动计划明细 → 所属活动计划 → 营销活动 (`ActivityPlanDetail_activity`)
- 活动计划明细 → 关联销售客户 → 经销商 (`ActivityPlanDetail_dealer`)
- 活动计划明细 → 关联门店 → 门店 (`ActivityPlanDetail_store`)
- 活动计划明细 → 关联子门店 → 子门店 (`ActivityPlanDetail_store_scope`)
- 活动计划明细 → 涉及商品 → 商品 (`ActivityPlanDetail_product`)
- 活动计划明细 → 涉及SKU → SKU (`ActivityPlanDetail_sku`)
- 活动计划明细 → 涉及品类 → 品类 (`ActivityPlanDetail_category`)
- 活动计划明细 → 约定陈列项 → 陈列项 (`ActivityPlanDetail_display_item`)
- 活动计划明细 → 钱包归属预留账户 → 预留费用账户 (`ActivityPlanDetail_reserved_account`)
- 活动计划明细 → 计划归属办事处 → 办事处 (`ActivityPlanDetail_office`)
- 活动计划明细 → 计划归属大区 → 大区 (`ActivityPlanDetail_district`)
- 活动计划明细 → 支持部门 → 公司组织 (`ActivityPlanDetail_supporting_department`)
- 陈列签约 → 签约活动 → 陈列活动 (`DisplaySigning_activity`)
- 陈列签约 → 签订陈列项 → 陈列项 (`DisplaySigning_item`)
- 陈列签约 → 签约门店 → 门店 (`DisplaySigning_store`)
- 陈列签约 → 签约子门店 → 子门店 (`DisplaySigning_store_scope`)
- 陈列签约 → 所属销售客户 → 经销商 (`DisplaySigning_dealer`)
- 陈列签约 → 服务经销商 → 经销商 (`DisplaySigning_service_dealer`)
- 陈列签约 → 上游销售客户 → 经销商 (`DisplaySigning_upstream_dealer`)
- 陈列签约 → 签约业代 → 业代 (`DisplaySigning_signing_representative`)
- 陈列签约 → 门店所属业代 → 业代 (`DisplaySigning_store_representative`)
- 陈列签约 → 所属主任 → 主任 (`DisplaySigning_supervisor`)
- 陈列签约 → 所属线路 → 线路 (`DisplaySigning_route`)
- 陈列签约 → 签约品类 → 品类 (`DisplaySigning_category`)
- 陈列签约 → 关联支付卡券 → 陈列支付卡券 (`DisplaySigning_coupon`)
- 陈列签约 → 卡券关联商品 → 商品 (`DisplaySigning_coupon_product`)
- 陈列签约 → 卡券关联品类 → 品类 (`DisplaySigning_coupon_category`)
- 陈列签约 → 占用陈列费用包 → 陈列费用包 (`DisplaySigning_expense_package`)
- 陈列签约 → 行政办事处 → 办事处 (`DisplaySigning_office`)
- 陈列签约 → 行政大区 → 大区 (`DisplaySigning_district`)
- 陈列签约 → 门店大区 → 大区 (`DisplaySigning_store_district`)
- 套餐门店执行费用 → 执行套餐 → 分销套餐 (`PackageExecutionCost_package`)
- 套餐门店执行费用 → 对应计划明细 → 活动计划明细 (`PackageExecutionCost_plan_detail`)
- 套餐门店执行费用 → 执行销售客户 → 经销商 (`PackageExecutionCost_dealer`)
- 套餐门店执行费用 → 执行门店 → 门店 (`PackageExecutionCost_store`)
- 套餐门店执行费用 → 执行商品 → 商品 (`PackageExecutionCost_product`)
- 套餐门店执行费用 → 执行归属办事处 → 办事处 (`PackageExecutionCost_office`)
- 套餐门店执行费用 → 执行归属大区 → 大区 (`PackageExecutionCost_district`)
- 套餐门店执行费用 → 支持部门 → 公司组织 (`PackageExecutionCost_supporting_department`)
- 月度陈列项检查结果 → 检查陈列项 → 陈列项 (`DisplayItemInspection_item`)
- 月度陈列项检查结果 → 检查子门店 → 子门店 (`DisplayItemInspection_store_scope`)
- 月度陈列项检查结果 → 检查门店 → 门店 (`DisplayItemInspection_store`)
- 月度陈列项检查结果 → 记录销售客户 → 经销商 (`DisplayItemInspection_dealer`)
- 月度陈列项检查结果 → 记录办事处 → 办事处 (`DisplayItemInspection_office`)
- 月度陈列项检查结果 → 记录大区 → 大区 (`DisplayItemInspection_district`)
- 门店陈列执行统计 → 执行门店 → 门店 (`DisplayExecutionSummary_store`)
- 门店陈列执行统计 → 执行陈列项 → 陈列项 (`DisplayExecutionSummary_item`)
- 门店陈列执行统计 → 执行专项活动 → 陈列活动 (`DisplayExecutionSummary_special_activity`)
- 门店陈列执行统计 → 记录销售客户 → 经销商 (`DisplayExecutionSummary_dealer`)
- 门店陈列执行统计 → 记录业代 → 业代 (`DisplayExecutionSummary_representative`)
- 门店陈列执行统计 → 记录主任 → 主任 (`DisplayExecutionSummary_supervisor`)
- 门店陈列执行统计 → 记录理货员 → 员工 (`DisplayExecutionSummary_merchandiser`)
- 门店陈列执行统计 → 业代线路 → 线路 (`DisplayExecutionSummary_sales_route`)
- 门店陈列执行统计 → 理货员线路 → 线路 (`DisplayExecutionSummary_merchandising_route`)
- 门店陈列执行统计 → 执行品类 → 品类 (`DisplayExecutionSummary_category`)
- 门店陈列执行统计 → 记录办事处 → 办事处 (`DisplayExecutionSummary_office`)
- 门店陈列执行统计 → 记录大区 → 大区 (`DisplayExecutionSummary_district`)
- 营销费用预算项 → 预算经销商主体 → 经销商 (`ExpenseBudgetItem_dealer`)
- 营销费用预算项 → 预算办事处主体 → 办事处 (`ExpenseBudgetItem_office_subject`)
- 营销费用预算项 → 预算归属办事处 → 办事处 (`ExpenseBudgetItem_attribution_office`)
- 营销费用预算项 → 预算归属大区 → 大区 (`ExpenseBudgetItem_district`)
- 营销费用预算项 → 预算事业线 → 事业线 (`ExpenseBudgetItem_business_line`)
- 预留费用账户 → 账户事业线 → 事业线 (`ReservedExpenseAccount_business_line`)
- 预留费用账户 → 账户行政办事处 → 办事处 (`ReservedExpenseAccount_office`)
- 预留费用账户 → 账户行政大区 → 大区 (`ReservedExpenseAccount_district`)
- 客户自有计划额度 → 计划额度客户 → 经销商 (`CustomerPlanQuota_dealer`)
- 客户自有计划额度 → 计划额度事业线 → 事业线 (`CustomerPlanQuota_business_line`)
- 客户自有计划额度 → 计划额度办事处 → 办事处 (`CustomerPlanQuota_office`)
- 客户自有计划额度 → 计划额度大区 → 大区 (`CustomerPlanQuota_district`)
- 客户自有核销额度 → 核销额度客户 → 经销商 (`CustomerVerificationQuota_dealer`)
- 客户自有核销额度 → 核销额度来源 → 费用来源 (`CustomerVerificationQuota_source`)
- 客户自有核销额度 → 核销额度事业线 → 事业线 (`CustomerVerificationQuota_business_line`)
- 客户自有核销额度 → 核销额度办事处 → 办事处 (`CustomerVerificationQuota_office`)
- 客户自有核销额度 → 核销额度大区 → 大区 (`CustomerVerificationQuota_district`)
- 费用钱包 → 钱包事业线 → 事业线 (`ExpenseWallet_business_line`)
- 费用钱包 → 钱包归属客户 → 经销商 (`ExpenseWallet_dealer`)
- 费用钱包 → 钱包行政办事处 → 办事处 (`ExpenseWallet_office`)
- 费用钱包 → 钱包行政大区 → 大区 (`ExpenseWallet_district`)
- 费用钱包 → 钱包费用来源 → 费用来源 (`ExpenseWallet_source`)
- 费用钱包 → 归属预留账户 → 预留费用账户 (`ExpenseWallet_reserved_account`)
- 费用钱包 → 对应自有计划额度 → 客户自有计划额度 (`ExpenseWallet_plan_quota`)
- 费用钱包 → 对应自有核销额度 → 客户自有核销额度 (`ExpenseWallet_verification_quota`)
- 钱包分录 → 记入钱包 → 费用钱包 (`WalletEntry_wallet`)
- 钱包分录 → 由业务事件触发 → 营销费用业务事件 (`WalletEntry_event`)
- 钱包分录 → 记账事业线 → 事业线 (`WalletEntry_business_line`)
- 钱包分录 → 分录钱包归属客户 → 经销商 (`WalletEntry_wallet_dealer`)
- 钱包分录 → 分录钱包办事处 → 办事处 (`WalletEntry_wallet_office`)
- 钱包分录 → 分录钱包大区 → 大区 (`WalletEntry_wallet_district`)
- 钱包分录 → 分录钱包费用来源 → 费用来源 (`WalletEntry_wallet_source`)
- 钱包分录 → 分录钱包预留账户 → 预留费用账户 (`WalletEntry_wallet_reserved_account`)
- 钱包分录 → 主追溯规则 → 钱包业务追溯规则 (`WalletEntry_main_trace_rule`)
- 钱包分录 → 补充追溯规则 → 钱包业务追溯规则 (`WalletEntry_overlay_trace_rule`)
- 钱包业务追溯规则 → 适用事业线 → 事业线 (`WalletTraceRule_business_line`)
- 营销费用业务事件 → 事件事业线 → 事业线 (`ExpenseEvent_business_line`)
- 营销费用业务事件 → 事件归属客户 → 经销商 (`ExpenseEvent_dealer`)
- 营销费用业务事件 → 事件上游客户 → 经销商 (`ExpenseEvent_upstream_dealer`)
- 营销费用业务事件 → 事件预留账户 → 预留费用账户 (`ExpenseEvent_reserved_account`)
- 营销费用业务事件 → 事件请求费用来源 → 费用来源 (`ExpenseEvent_source`)
- 营销费用业务事件 → 事件产品品类 → 品类 (`ExpenseEvent_category`)
- 营销费用业务事件 → 事件涉及活动 → 营销活动 (`ExpenseEvent_activity`)
- 营销费用业务事件 → 事件涉及陈列签约 → 陈列签约 (`ExpenseEvent_display_signing`)
- 营销费用业务事件 → 事件陈列月包 → 陈列费用包 (`ExpenseEvent_display_package`)
- 营销费用业务事件 → 事件统案客户分配 → 统案客户分配 (`ExpenseEvent_unified_customer_allocation`)
- 费用包 → 分配销售客户 → 经销商 (`ExpensePackage_dealer`)
- 费用包 → 分配业代 → 业代 (`ExpensePackage_representative`)
- 费用包 → 分配线路 → 线路 (`ExpensePackage_route`)
- 费用包 → 关联统案活动 → 统案活动 (`ExpensePackage_unified_campaign`)
- 费用包 → 费用包来源 → 费用来源 (`ExpensePackage_source`)
- 费用包 → 费用包事业线 → 事业线 (`ExpensePackage_business_line`)
- 费用包 → 费用包办事处 → 办事处 (`ExpensePackage_office`)
- 费用包 → 费用包大区 → 大区 (`ExpensePackage_district`)
- 统案支持费用项 → 所属统案 → 统案活动 (`UnifiedSupportItem_campaign`)
- 统案支持费用项 → 支持部门 → 公司组织 (`UnifiedSupportItem_supporting_department`)
- 统案支持费用项 → 记录办事处 → 办事处 (`UnifiedSupportItem_office`)
- 统案支持费用项 → 记录大区 → 大区 (`UnifiedSupportItem_district`)
- 统案支持费用项 → 支持品类 → 品类 (`UnifiedSupportItem_category`)
- 统案客户分配 → 分配自支持费用项 → 统案支持费用项 (`UnifiedCustomerAllocation_support_item`)
- 统案客户分配 → 所属统案活动 → 统案活动 (`UnifiedCustomerAllocation_campaign`)
- 统案客户分配 → 获得分配的客户 → 经销商 (`UnifiedCustomerAllocation_dealer`)
- 统案客户分配 → 分配大区 → 大区 (`UnifiedCustomerAllocation_district`)
- 统案客户分配 → 记录办事处 → 办事处 (`UnifiedCustomerAllocation_office`)
- 统案客户分配 → 关联执行计划 → 营销活动 (`UnifiedCustomerAllocation_execution_plan`)
- 统案客户分配 → 关联执行门店 → 门店 (`UnifiedCustomerAllocation_store`)
- 费用来源 → 费用来源事业线 → 事业线 (`ExpenseSource_business_line`)
- 虚假重复客资认定 → 主门店 → 门店 (`DuplicateStoreFinding_primary_store`)
- 虚假重复客资认定 → 重复配对门店 → 门店 (`DuplicateStoreFinding_duplicate_store`)
- 虚假重复客资认定 → 主门店经销商 → 经销商 (`DuplicateStoreFinding_primary_dealer`)
- 虚假重复客资认定 → 配对门店经销商 → 经销商 (`DuplicateStoreFinding_duplicate_dealer`)
- 虚假重复客资认定 → 主门店业代 → 业代 (`DuplicateStoreFinding_primary_representative`)
- 虚假重复客资认定 → 配对门店业代 → 业代 (`DuplicateStoreFinding_duplicate_representative`)
- 虚假重复客资认定 → 主门店线路 → 线路 (`DuplicateStoreFinding_primary_route`)
- 虚假重复客资认定 → 配对门店线路 → 线路 (`DuplicateStoreFinding_duplicate_route`)
- 虚假重复客资认定 → 主门店大区 → 大区 (`DuplicateStoreFinding_primary_district`)
- 虚假重复客资认定 → 配对门店大区 → 大区 (`DuplicateStoreFinding_duplicate_district`)
- 虚假陈列认定 → 涉及陈列签约 → 陈列签约 (`FalseDisplayFinding_signing`)
- 虚假陈列认定 → 涉及陈列项 → 陈列项 (`FalseDisplayFinding_item`)
- 虚假陈列认定 → 认定门店 → 门店 (`FalseDisplayFinding_store`)
- 虚假陈列认定 → 记录销售客户 → 经销商 (`FalseDisplayFinding_dealer`)
- 虚假陈列认定 → 记录业代 → 业代 (`FalseDisplayFinding_representative`)
- 虚假陈列认定 → 记录办事处 → 办事处 (`FalseDisplayFinding_office`)
- 虚假陈列认定 → 记录大区 → 大区 (`FalseDisplayFinding_district`)
- 经销商商品库存 → 库存销售客户 → 经销商 (`DealerInventory_dealer`)
- 经销商商品库存 → 库存商品 → 商品 (`DealerInventory_product`)
- 经销商商品库存 → 库存SKU → SKU (`DealerInventory_sku`)
- 经销商商品库存 → 库存品类 → 品类 (`DealerInventory_category`)
- 经销商商品库存 → 记录办事处 → 办事处 (`DealerInventory_recorded_office`)
- 经销商商品库存 → 记录大区 → 大区 (`DealerInventory_recorded_district`)
- 经销商商品库存 → 当时办事处 → 办事处 (`DealerInventory_original_office`)
- 经销商商品库存 → 当时大区 → 大区 (`DealerInventory_original_district`)
- 搭赠下沉明细 → 搭赠活动 → 随货搭赠活动 (`GiftSinkDetail_campaign`)
- 搭赠下沉明细 → 执行经销商 → 经销商 (`GiftSinkDetail_dealer`)
- 搭赠下沉明细 → 下沉分销行 → 分销订单行 (`GiftSinkDetail_order_line`)
- 搭赠下沉明细 → 下沉套餐 → 分销套餐 (`GiftSinkDetail_package`)
- 搭赠下沉明细 → 下沉交易商品 → 商品 (`GiftSinkDetail_product`)
- 搭赠下沉明细 → 搭赠商品 → 商品 (`GiftSinkDetail_gift_product`)
- 搭赠下沉明细 → 下沉归属办事处 → 办事处 (`GiftSinkDetail_office`)
- 搭赠下沉明细 → 下沉归属大区 → 大区 (`GiftSinkDetail_district`)
- 计划门店拜访 → 计划拜访门店 → 门店 (`PlannedStoreVisit_store`)
- 计划门店拜访 → 计划线路 → 线路 (`PlannedStoreVisit_route`)
- 计划门店拜访 → 计划执行业代 → 业代 (`PlannedStoreVisit_representative`)
- 计划门店拜访 → 计划所属主任 → 主任 (`PlannedStoreVisit_supervisor`)
- 计划门店拜访 → 计划所属销售客户 → 经销商 (`PlannedStoreVisit_dealer`)
- 计划门店拜访 → 计划办事处 → 办事处 (`PlannedStoreVisit_office`)
- 门店拜访 → 被拜访门店 → 门店 (`StoreVisit_store`)
- 门店拜访 → 拜访线路 → 线路 (`StoreVisit_route`)
- 门店拜访 → 拜访执行人 → 员工 (`StoreVisit_employee`)
- 门店拜访 → 被协访人员 → 员工 (`StoreVisit_assisted_employee`)
- 门店拜访 → 记录上级人员 → 员工 (`StoreVisit_superior`)
- 门店拜访 → 所属销售客户 → 经销商 (`StoreVisit_dealer`)
- 门店拜访 → 服务销售客户 → 经销商 (`StoreVisit_service_dealer`)
- 门店拜访 → 当时办事处 → 办事处 (`StoreVisit_original_office`)
- 门店拜访 → 当时大区 → 大区 (`StoreVisit_original_district`)
- 门店拜访 → 另附办事处 → 办事处 (`StoreVisit_current_office`)
- 门店拜访 → 另附大区 → 大区 (`StoreVisit_current_district`)
- 子门店 → 当前所属事业部 → 事业线 (`StoreScope_business_line`)
- 经销商 → 当前所属事业部 → 事业线 (`Dealer_business_line`)
- 月度分销目标 → 目标事业部 → 事业线 (`DistributionTarget_business_line`)
- 子门店 → 归属区域 → 公司组织 (`StoreScope_region`)
- 分销订单行 → 当时所属区域 → 公司组织 (`DistributionOrderLine_original_region`)
- 分销订单行 → 当时服务区域 → 公司组织 (`DistributionOrderLine_original_service_region`)
- 分销订单行 → 明细附带区域 → 公司组织 (`DistributionOrderLine_recorded_region`)
- 实际销售考核明细 → 当期考核区域 → 公司组织 (`SalesAssessment_assessment_region`)
- 实际销售考核明细 → 同期对齐区域 → 公司组织 (`SalesAssessment_comparison_region`)
- 组织销售目标 → 目标考核区域 → 公司组织 (`OfficeSalesTarget_region`)
- 经销商销售目标 → 目标归属区域 → 公司组织 (`DealerSalesTarget_region`)
- 月度分销目标 → 目标归属区域 → 公司组织 (`DistributionTarget_attribution_region`)
- 门店月度稽查结果 → 月度区域 → 公司组织 (`StoreInspectionMonth_region`)
- 门店月度稽查结果 → 当前区域 → 公司组织 (`StoreInspectionMonth_current_region`)
- 经销商商品库存 → 记录区域 → 公司组织 (`DealerInventory_recorded_region`)
- 经销商商品库存 → 当时区域 → 公司组织 (`DealerInventory_original_region`)
- 门店拜访 → 当时区域 → 公司组织 (`StoreVisit_original_region`)
- 门店拜访 → 另附区域 → 公司组织 (`StoreVisit_current_region`)
- 活动计划明细 → 计划归属区域 → 公司组织 (`ActivityPlanDetail_region`)
- 陈列签约 → 签约行政区域 → 公司组织 (`DisplaySigning_region`)
- 套餐门店执行费用 → 执行归属区域 → 公司组织 (`PackageExecutionCost_region`)
- 月度陈列项检查结果 → 检查记录区域 → 公司组织 (`DisplayItemInspection_region`)
- 门店陈列执行统计 → 执行统计记录区域 → 公司组织 (`DisplayExecutionSummary_region`)
- 费用包 → 费用包归属区域 → 公司组织 (`ExpensePackage_region`)
- 搭赠下沉明细 → 下沉归属区域 → 公司组织 (`GiftSinkDetail_region`)
- 实际销售考核明细 → 导入销售组织 → 公司组织 (`SalesAssessment_imported_sales_organization`)
- 门店月度稽查结果 → 记录销售总监 → 员工 (`StoreInspectionMonth_sales_director`)
- 随货搭赠活动 → 活动商品 → 商品 (`GiftWithGoodsCampaign_activity_product`)
- 搭赠下沉明细 → 活动商品 → 商品 (`GiftSinkDetail_activity_product`)
- 陈列支付卡券 → 关联商品 → 商品 (`DisplayPaymentCoupon_associated_product`)
- 陈列支付卡券 → 关联商品品类 → 品类 (`DisplayPaymentCoupon_associated_product_category`)
- 钱包分录 → 记账业务引用分配 → 统案客户分配 (`WalletEntry_business_unified_allocation`)

## 数据集

- `v_ads_ai_chl_sus_display_fee_detail`：15 列，业代、公司组织、办事处、员工、大区、经销商、虚假陈列认定、门店、陈列签约、陈列项
- `v_ai_mid_chl_sus_duplicate_cust_mi`：16 列，业代、公司组织、员工、大区、线路、经销商、虚假重复客资认定、门店
- `v_ai_sus_ord_inspect_detail`：36 列，公司组织、分销套餐、分销订单行、办事处、员工、商品、大区、经销商、营销活动、虚假分销订单行、门店
- `v_chl_ac_nf_sku_mi`：19 列，AC月度市场指标、公司组织、大区
- `v_chl_jc_cust_mi`：135 列，业代、主任、公司组织、办事处、员工、大区、线路、经销商、门店、门店月度稽查结果
- `v_chl_route_plan_cust_cnt_1d_df`：13 列，业代、主任、公司组织、办事处、员工、线路、经销商、计划门店拜访、门店
- `v_chl_visit_dtl`：104 列，业代、主任、公司组织、办事处、员工、大区、线路、经销商、门店、门店拜访
- `v_dim_chl_dealer`：35 列，主任、事业线、公司组织、办事处、员工、大区、经销商
- `v_dim_chl_sub_cust_df`：87 列，业代、主任、事业线、公司组织、办事处、员工、大区、子门店、线路、经销商、门店
- `v_dim_chl_sub_cust_indct_mi`：69 列，业代、主任、公司组织、办事处、员工、大区、子门店、月度分销目标、经销商、门店
- `v_dim_cmdt_cmdt`：62 列，SKU、品类、商品
- `v_dim_hr_emp`：19 列，业代、主任、公司组织、办事处、员工、大区
- `v_dim_hr_emp_with_org`：6 列，未挂接
- `v_dim_hr_org`：18 列，公司组织、办事处、大区
- `v_fin_expense_quota_balance_df`：38 列，事业线、公司组织、办事处、大区、客户自有核销额度、客户自有计划额度、经销商、费用来源、预留费用账户
- `v_fin_expense_wallet_change_dtl_mi`：65 列，事业线、公司组织、分销套餐、办事处、品类、大区、经销商、统案客户分配、统案活动、营销活动、营销费用业务事件、费用包、费用来源、费用钱包、钱包分录、陈列费用包、预留费用账户
- `v_fin_expense_wallet_df`：27 列，事业线、公司组织、办事处、大区、经销商、费用来源、费用钱包、预留费用账户
- `v_fin_expense_wallet_route_df`：24 列，事业线、钱包业务追溯规则
- `v_inv_dealer_cmdt_di`：71 列，SKU、公司组织、办事处、品类、商品、大区、经销商、经销商商品库存
- `v_market_activity_inspire_expense_df`：15 列，未挂接
- `v_mkt_actv_inspect_result`：21 列，公司组织、办事处、大区、子门店、月度陈列项检查结果、经销商、门店、陈列项
- `v_mkt_budget_snapshot_df`：17 列，事业线、公司组织、办事处、大区、经销商、营销费用预算项
- `v_mkt_cost_package_df`：34 列，业代、事业线、公司组织、办事处、员工、大区、线路、经销商、统案活动、营销活动、费用包、费用来源、陈列费用包
- `v_mkt_dsp_actv_info_mi`：95 列，业代、主任、公司组织、办事处、员工、品类、商品、大区、子门店、线路、经销商、营销活动、门店、陈列支付卡券、陈列活动、陈列签约、陈列费用包、陈列项
- `v_mkt_dsp_execute_mi`：73 列，业代、主任、公司组织、办事处、员工、品类、大区、线路、经销商、营销活动、门店、门店陈列执行统计、陈列活动、陈列项
- `v_mkt_expen_src_dtl_df`：21 列，事业线、费用来源
- `v_mkt_market_actv_plan_verify_cost`：77 列，SKU、公司组织、分销套餐、办事处、品类、商品、大区、子门店、活动计划明细、经销商、营销活动、门店、陈列活动、陈列项、预留费用账户
- `v_mkt_media_plan_dtl_df`：51 列，未挂接
- `v_mkt_package_cust_cost_mi`：38 列，公司组织、分销套餐、办事处、商品、大区、套餐门店执行费用、活动计划明细、经销商、营销活动、门店
- `v_mkt_shdz_sink_dtl_df`：42 列，公司组织、分销套餐、分销订单行、办事处、商品、大区、搭赠下沉明细、经销商、营销活动、虚假分销订单行、随货搭赠活动
- `v_mkt_unity_apply_alloc_df`：58 列，公司组织、办事处、品类、大区、经销商、统案客户分配、统案支持费用项、统案活动、营销活动、门店
- `v_trd_dist_ord_dtl`：140 列，SKU、业代、主任、公司组织、分销套餐、分销订单行、办事处、员工、品类、商品、大区、子门店、线路、经销商、营销活动、虚假分销订单行、门店
- `v_trd_dist_ord_target_emp_1m_df`：17 列，业代、主任、公司组织、办事处、员工、大区、月度分销目标
- `v_trd_dist_ord_target_mgr_1m_df`：14 列，主任、公司组织、办事处、员工、大区、月度分销目标
- `v_trd_dist_target_dealer_df`：13 列，公司组织、办事处、大区、月度分销目标、经销商
- `v_trd_dist_target_org_df`：10 列，公司组织、办事处、大区、月度分销目标
- `v_trd_sales_adjust_df`：101 列，SKU、公司组织、办事处、品类、商品、大区、实际销售考核明细、组织销售目标、经销商、销售预算目标
- `v_trd_sales_target_dealer_mi`：17 列，公司组织、办事处、大区、经销商、经销商销售目标、销售预算目标
- `v_trd_sales_target_org_mi`：31 列，SKU、公司组织、办事处、品类、商品、大区、组织销售目标、销售预算目标
- `v_trd_time_prg_df`：20 列，业务日历日、月度分销目标、组织销售目标、经销商销售目标
