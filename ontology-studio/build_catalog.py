#!/usr/bin/env python3
"""把营销费用本体和视图字段编成平台目录，以及给 Agent 读的说明。"""

import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ONTOLOGY_PATH = ROOT / "ontology" / "营销费用本体-20261106.json"
COLUMNS_PATH = ROOT / "ontology-studio" / "data" / "columns.json"
CATALOG_PATH = ROOT / "ontology-studio" / "data" / "catalog.json"
SKILL_REF = ROOT / "ai-kit" / "skills" / "mkt-ontology" / "references"

GROUPS = [
    ("渠道", "#0f766e", ["Store", "StoreScope", "Dealer", "VisitRoute", "PlannedStoreVisit", "StoreVisit"]),
    ("组织", "#1d4ed8", ["Organization", "SalesOffice", "SalesDistrict", "BusinessLine", "Employee", "SalesRepresentative", "SalesSupervisor"]),
    ("商品", "#b45309", ["Product", "SKU", "ProductCategory"]),
    ("交易", "#be123c", ["DistributionOrderLine", "FalseDistributionOrderLine", "SalesAssessment", "DealerInventory"]),
    ("目标", "#6d28d9", ["SalesTarget", "DealerSalesTarget", "OfficeSalesTarget", "DistributionTarget", "BusinessCalendarDay"]),
    ("稽查", "#c2410c", ["StoreInspectionMonth", "ACMarketObservation", "DuplicateStoreFinding", "FalseDisplayFinding"]),
    ("活动", "#0e7490", ["MarketingActivity", "DisplayActivity", "DistributionPackage", "UnifiedCampaign", "GiftWithGoodsCampaign", "ActivityPlanDetail", "DisplaySigning", "DisplayItem", "DisplayPaymentCoupon", "PackageExecutionCost", "DisplayItemInspection", "DisplayExecutionSummary", "GiftSinkDetail"]),
    ("费用", "#166534", ["ExpenseBudgetItem", "ReservedExpenseAccount", "CustomerPlanQuota", "CustomerVerificationQuota", "ExpenseWallet", "WalletEntry", "ExpenseEvent", "WalletTraceRule", "ExpensePackage", "DisplayExpensePackage", "UnifiedSupportItem", "UnifiedCustomerAllocation", "ExpenseSource"]),
]

METRIC_TYPES = {"decimal", "integer"}


def md(text):
    return (text or "").replace("\r\n", "\n").strip()


def main():
    ontology = json.loads(ONTOLOGY_PATH.read_text())["ontology"]
    columns = json.loads(COLUMNS_PATH.read_text())
    known = {item["name"] for item in ontology["classes"]}
    group_of = {}
    groups = []
    for label, color, names in GROUPS:
        groups.append({"label": label, "color": color, "classes": names})
        for name in names:
            if name not in known:
                raise SystemExit(f"分组里的类不存在: {name}")
            if name in group_of:
                raise SystemExit(f"类重复分组: {name}")
            group_of[name] = label

    classes = []
    by_name = {}
    for item in ontology["classes"]:
        if item["name"] not in group_of:
            raise SystemExit(f"类未分组: {item['name']}")
        props = []
        for prop in item["dataProperties"]:
            props.append({
                "name": prop["name"],
                "label": prop["label"],
                "comment": prop.get("comment") or "",
                "datatype": prop.get("datatype") or "",
                "inherited": bool(prop.get("inherited")),
                "inheritedFrom": prop.get("inheritedFrom"),
                "mapping": [
                    {"table": m.get("table") or "", "field": m.get("field") or ""}
                    for m in (prop.get("mapping") or [])
                ],
            })
        cls = {
            "name": item["name"],
            "label": item["label"],
            "comment": item.get("comment") or "",
            "parent": item.get("parent"),
            "group": group_of[item["name"]],
            "properties": props,
        }
        classes.append(cls)
        by_name[cls["name"]] = cls

    relations = []
    for rel in ontology["relations"]:
        if rel["domain"] not in by_name or rel["range"] not in by_name:
            raise SystemExit(f"关系端点不存在: {rel['name']}")
        relations.append({
            "name": rel["name"],
            "label": rel["label"],
            "comment": rel.get("comment") or "",
            "domain": rel["domain"],
            "range": rel["range"],
        })

    prop_by_field = defaultdict(list)
    for cls in classes:
        for prop in cls["properties"]:
            for mapping in prop["mapping"]:
                prop_by_field[(mapping["table"], mapping["field"])].append({
                    "class": cls["name"],
                    "classLabel": cls["label"],
                    "name": prop["name"],
                    "label": prop["label"],
                })

    by_table = defaultdict(list)
    for col in columns:
        by_table[col["table"]].append(col)

    datasets = []
    for table in sorted(by_table):
        cols = sorted(by_table[table], key=lambda c: c["pos"])
        linked = {}
        out_cols = []
        for col in cols:
            refs = prop_by_field.get((table, col["name"]), [])
            for ref in refs:
                linked[ref["class"]] = ref["classLabel"]
            out_cols.append({
                "name": col["name"],
                "type": col["type"],
                "comment": col.get("comment") or "",
                "properties": refs,
            })
        datasets.append({
            "table": table,
            "mapped": bool(linked),
            "classes": [{"name": n, "label": linked[n]} for n in sorted(linked, key=lambda n: by_name[n]["label"])],
            "columns": out_cols,
        })

    metric_count = sum(
        1 for cls in classes for prop in cls["properties"] if prop["datatype"] in METRIC_TYPES
    )
    catalog = {
        "meta": {
            "name": ontology["name"],
            "description": ontology.get("description") or "",
            "database": "db_ontology_mkt",
            "sourceFile": "ontology/营销费用本体-20261106.json",
            "classCount": len(classes),
            "relationCount": len(relations),
            "propertyCount": sum(len(c["properties"]) for c in classes),
            "metricCount": metric_count,
            "datasetCount": len(datasets),
            "mappedDatasetCount": sum(1 for d in datasets if d["mapped"]),
        },
        "groups": groups,
        "classes": classes,
        "relations": relations,
        "datasets": datasets,
    }
    CATALOG_PATH.write_text(json.dumps(catalog, ensure_ascii=False, separators=(",", ":")))
    write_agent_refs(catalog)
    print(
        f"classes={catalog['meta']['classCount']} relations={catalog['meta']['relationCount']} "
        f"properties={catalog['meta']['propertyCount']} metrics={metric_count} "
        f"datasets={catalog['meta']['datasetCount']} catalog_bytes={CATALOG_PATH.stat().st_size}"
    )


def write_agent_refs(catalog):
    ref = SKILL_REF
    class_dir = ref / "classes"
    class_dir.mkdir(parents=True, exist_ok=True)
    for old in class_dir.glob("*.md"):
        old.unlink()

    meta = catalog["meta"]
    by_name = {c["name"]: c for c in catalog["classes"]}
    lines = [
        f"# {meta['name']}",
        "",
        "这份说明由 `ontology-studio/build_catalog.py` 生成。口径以本体属性说明为准。",
        "",
        "## 建模说明",
        "",
        md(meta["description"]),
        "",
        "## 规模",
        "",
        f"- 库：`{meta['database']}`",
        f"- 类 {meta['classCount']}，关系 {meta['relationCount']}，属性 {meta['propertyCount']}",
        f"- 数值指标 {meta['metricCount']}（整数或小数属性，没有单独的计算公式）",
        f"- 视图 {meta['datasetCount']}，其中 {meta['mappedDatasetCount']} 张已挂到本体",
        "",
        "查数用 `db_ontology_mkt` 里的视图。不要改去查底层大宽表，除非用户明确要求。",
        "",
        "## 类",
        "",
        "| 分组 | 类 | 中文 | 父类 | 属性 |",
        "| --- | --- | --- | --- | --- |",
    ]
    for group in catalog["groups"]:
        for name in group["classes"]:
            cls = by_name[name]
            parent = cls["parent"] or ""
            lines.append(f"| {group['label']} | `{cls['name']}` | {cls['label']} | {parent} | {len(cls['properties'])} |")

    lines += ["", "## 关系", ""]
    for rel in catalog["relations"]:
        lines.append(
            f"- {by_name[rel['domain']]['label']} → {rel['label']} → {by_name[rel['range']]['label']}"
            f" (`{rel['name']}`)"
        )

    lines += ["", "## 数据集", ""]
    for ds in catalog["datasets"]:
        labels = "、".join(c["label"] for c in ds["classes"]) or "未挂接"
        lines.append(f"- `{ds['table']}`：{len(ds['columns'])} 列，{labels}")

    (ref / "overview.md").write_text("\n".join(lines) + "\n")

    incoming = defaultdict(list)
    outgoing = defaultdict(list)
    for rel in catalog["relations"]:
        outgoing[rel["domain"]].append(rel)
        incoming[rel["range"]].append(rel)

    for cls in catalog["classes"]:
        parts = [
            f"# {cls['label']} `{cls['name']}`",
            "",
            f"- 分组：{cls['group']}",
            f"- 父类：{cls['parent'] or '无'}",
            "",
            "## 说明",
            "",
            md(cls["comment"]) or "本体未写类说明。",
            "",
            "## 指出的关系",
            "",
        ]
        outs = outgoing.get(cls["name"], [])
        ins = incoming.get(cls["name"], [])
        if not outs:
            parts.append("无")
        for rel in outs:
            parts.append(f"- {rel['label']} → {by_name[rel['range']]['label']} `{rel['name']}`")
            if rel["comment"]:
                parts.append(f"  {md(rel['comment'])}")
        parts += ["", "## 指入的关系", ""]
        if not ins:
            parts.append("无")
        for rel in ins:
            parts.append(f"- {by_name[rel['domain']]['label']} → {rel['label']} `{rel['name']}`")
            if rel["comment"]:
                parts.append(f"  {md(rel['comment'])}")
        parts += ["", "## 属性", ""]
        for prop in cls["properties"]:
            maps = "、".join(f"`{m['table']}.{m['field']}`" for m in prop["mapping"]) or "无"
            inherit = f"，继承自 {prop['inheritedFrom']}" if prop["inherited"] else ""
            parts.append(f"### {prop['label']} `{prop['name']}`")
            parts.append("")
            parts.append(f"- 类型：{prop['datatype']}{inherit}")
            parts.append(f"- 字段：{maps}")
            if prop["comment"]:
                parts.append(f"- 口径：{md(prop['comment'])}")
            parts.append("")
        (class_dir / f"{cls['name']}.md").write_text("\n".join(parts))

    ds_lines = ["# 数据集字段", "", "库：`db_ontology_mkt`。箭头后面是本体属性。", ""]
    for ds in catalog["datasets"]:
        labels = "、".join(c["label"] for c in ds["classes"]) or "未挂接本体"
        ds_lines.append(f"## `{ds['table']}`")
        ds_lines.append("")
        ds_lines.append(labels)
        ds_lines.append("")
        for col in ds["columns"]:
            refs = "；".join(f"{p['classLabel']}.{p['label']}" for p in col["properties"])
            arrow = f" → {refs}" if refs else ""
            comment = f"：{col['comment']}" if col["comment"] else ""
            ds_lines.append(f"- `{col['name']}`（{col['type']}）{comment}{arrow}")
        ds_lines.append("")
    (ref / "datasets.md").write_text("\n".join(ds_lines))


if __name__ == "__main__":
    main()
