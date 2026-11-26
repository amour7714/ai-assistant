const app = document.querySelector("#app");

const state = {
  catalog: null,
  byName: new Map(),
  page: "graph",
  id: "",
  extra: "",
  neighborsOnly: true,
  hiddenGroups: new Set(),
  ontologyQuery: "",
  metricMode: "number",
  metricClass: "",
  metricQuery: "",
  datasetQuery: "",
  knowledgeQuery: "",
  expanded: false,
};

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function numeric(prop) {
  return prop.datatype === "decimal" || prop.datatype === "integer";
}

async function load() {
  try {
    const response = await fetch("data/catalog.json");
    if (!response.ok) throw new Error(String(response.status));
    state.catalog = await response.json();
    state.byName = new Map(state.catalog.classes.map((cls) => [cls.name, cls]));
    mount();
    route();
    window.addEventListener("hashchange", route);
  } catch (error) {
    app.className = "boot";
    app.textContent = "没有读到 data/catalog.json。在仓库里执行 ./ontology-studio/serve.sh 后再打开。";
  }
}

function mount() {
  const meta = state.catalog.meta;
  app.className = "";
  app.innerHTML = `
    <div class="shell">
      <aside class="side">
        <div class="brand">
          <div class="mark">本</div>
          <div>
            <h1>营销费用本体</h1>
            <p>${esc(meta.name)}</p>
          </div>
        </div>
        <nav class="nav">
          <a href="#/graph" data-page="graph">图谱 <span>${meta.classCount}</span></a>
          <a href="#/ontology" data-page="ontology">本体 <span>${meta.propertyCount}</span></a>
          <a href="#/knowledge" data-page="knowledge">知识库 <span>${meta.classCount}</span></a>
          <a href="#/metrics" data-page="metrics">指标 <span>${meta.metricCount}</span></a>
          <a href="#/datasets" data-page="datasets">数据集 <span>${meta.datasetCount}</span></a>
        </nav>
        <p class="side-note">库 ${esc(meta.database)}。${meta.mappedDatasetCount} 张视图已挂到本体，明细数据仍在 StarRocks，这里只保留结构和口径。</p>
      </aside>
      <div class="main-col">
        <header class="top">
          <div class="search">
            <input id="finder" type="search" placeholder="搜类、关系、属性、字段" autocomplete="off" />
            <div id="suggest"></div>
          </div>
          <div class="counts">${meta.classCount} 类 · ${meta.relationCount} 关系 · ${meta.metricCount} 指标 · ${meta.datasetCount} 视图</div>
        </header>
        <div id="view"></div>
      </div>
    </div>`;
  const finder = document.querySelector("#finder");
  finder.addEventListener("input", () => renderSuggest(finder.value.trim()));
  finder.addEventListener("keydown", (event) => {
    if (event.key === "Escape") document.querySelector("#suggest").innerHTML = "";
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search")) document.querySelector("#suggest").innerHTML = "";
  });
}

function route() {
  const suggest = document.querySelector("#suggest");
  if (suggest) suggest.innerHTML = "";
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  state.page = parts[0] || "graph";
  state.id = decodeURIComponent(parts[1] || "");
  state.extra = decodeURIComponent(parts[2] || "");
  state.expanded = false;
  document.querySelectorAll(".nav a").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === state.page);
  });
  const view = document.querySelector("#view");
  if (state.page === "ontology") renderOntology(view);
  else if (state.page === "knowledge") renderKnowledge(view);
  else if (state.page === "metrics") renderMetrics(view);
  else if (state.page === "datasets") renderDatasets(view);
  else renderGraph(view);
  const hit = view.querySelector(".hit");
  if (hit) hit.scrollIntoView({ block: "center" });
}

function renderSuggest(query) {
  const box = document.querySelector("#suggest");
  if (!query) {
    box.innerHTML = "";
    return;
  }
  const q = query.toLowerCase();
  const hits = [];
  const push = (html, href) => {
    if (hits.length < 10) hits.push({ html, href });
  };
  for (const cls of state.catalog.classes) {
    if (`${cls.label} ${cls.name}`.toLowerCase().includes(q)) {
      push(`<strong>${esc(cls.label)}</strong> <span class="mono">${esc(cls.name)}</span><small>类 · ${esc(cls.group)}</small>`, `#/ontology/${cls.name}`);
    }
  }
  for (const rel of state.catalog.relations) {
    if (`${rel.label} ${rel.name}`.toLowerCase().includes(q)) {
      const from = state.byName.get(rel.domain);
      const to = state.byName.get(rel.range);
      push(`<strong>${esc(rel.label)}</strong><small>关系 · ${esc(from.label)} → ${esc(to.label)}</small>`, `#/graph/${rel.domain}`);
    }
  }
  for (const cls of state.catalog.classes) {
    for (const prop of cls.properties) {
      if (hits.length >= 10) break;
      if (`${prop.label} ${prop.name}`.toLowerCase().includes(q)) {
        push(`<strong>${esc(prop.label)}</strong><small>${numeric(prop) ? "指标" : "属性"} · ${esc(cls.label)}</small>`, `#/ontology/${cls.name}/${encodeURIComponent(prop.name)}`);
      }
    }
  }
  for (const ds of state.catalog.datasets) {
    if (ds.table.toLowerCase().includes(q)) {
      push(`<strong class="mono">${esc(ds.table)}</strong><small>数据集</small>`, `#/datasets/${encodeURIComponent(ds.table)}`);
    }
    for (const col of ds.columns) {
      if (hits.length >= 10) break;
      if (`${col.name} ${col.comment}`.toLowerCase().includes(q)) {
        push(`<strong class="mono">${esc(col.name)}</strong><small>${esc(ds.table)} · ${esc(col.comment)}</small>`, `#/datasets/${encodeURIComponent(ds.table)}`);
      }
    }
  }
  box.innerHTML = hits.length
    ? `<div class="suggest">${hits.map((hit) => `<button type="button" data-href="${esc(hit.href)}">${hit.html}</button>`).join("")}</div>`
    : `<div class="suggest"><button type="button">没有匹配</button></div>`;
  box.querySelectorAll("[data-href]").forEach((button) => {
    button.addEventListener("click", () => {
      location.hash = button.dataset.href;
      box.innerHTML = "";
      document.querySelector("#finder").value = "";
    });
  });
}

function renderGraph(view) {
  const selected = state.byName.get(state.id);
  const key = [...state.hiddenGroups].sort().join("|");
  const keep = state.graphKey === key && view.querySelector("#graph");
  if (!keep) {
    state.graphKey = key;
    view.innerHTML = `
      <div class="toolbar" id="graph-tools"></div>
      <div class="graph-layout">
        <div class="stage"><canvas id="graph"></canvas></div>
        <aside class="panel" id="graph-panel"></aside>
      </div>`;
    drawGraph();
  }
  const tools = document.querySelector("#graph-tools");
  tools.innerHTML = state.catalog.groups.map((group) => {
    const on = !state.hiddenGroups.has(group.label);
    return `<button type="button" class="chip ${on ? "on" : ""}" data-group="${esc(group.label)}" style="${on ? `background:${group.color}` : ""}">${esc(group.label)}</button>`;
  }).join("") + `
    <button type="button" class="btn ${state.neighborsOnly ? "primary" : ""}" id="neighbors">只看相邻关系</button>
    <button type="button" class="btn" id="fit">回到全图</button>`;
  tools.querySelectorAll("[data-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const label = button.dataset.group;
      if (state.hiddenGroups.has(label)) state.hiddenGroups.delete(label);
      else state.hiddenGroups.add(label);
      state.graphKey = "";
      renderGraph(view);
    });
  });
  document.querySelector("#neighbors").addEventListener("click", () => {
    state.neighborsOnly = !state.neighborsOnly;
    graphApi.paint();
    renderGraph(view);
  });
  document.querySelector("#fit").addEventListener("click", () => graphApi.fit());
  graphApi.paint();
  renderGraphPanel(selected);
}

let graphApi = { fit() {} };

function drawGraph() {
  const canvas = document.querySelector("#graph");
  const ctx = canvas.getContext("2d");
  const visible = new Set(
    state.catalog.classes.filter((cls) => !state.hiddenGroups.has(cls.group)).map((cls) => cls.name)
  );
  const homes = new Map();
  state.catalog.groups.forEach((group, index) => {
    const angle = (index / state.catalog.groups.length) * Math.PI * 2 - Math.PI / 2;
    homes.set(group.label, { x: Math.cos(angle) * 560, y: Math.sin(angle) * 380 });
  });
  const nodes = state.catalog.classes.filter((cls) => visible.has(cls.name)).map((cls) => {
    const group = state.catalog.groups.find((item) => item.label === cls.group);
    const members = group.classes.filter((name) => visible.has(name));
    const mi = members.indexOf(cls.name);
    const home = homes.get(cls.group);
    const col = mi % 4;
    const row = Math.floor(mi / 4);
    return {
      id: cls.name,
      label: cls.label,
      color: group.color,
      home,
      x: home.x + (col - 1.5) * 128,
      y: home.y + (row - 1.2) * 76,
      vx: 0,
      vy: 0,
    };
  });
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const links = [];
  for (const rel of state.catalog.relations) {
    const source = byId.get(rel.domain);
    const target = byId.get(rel.range);
    if (source && target) links.push({ source, target, label: rel.label, kind: "rel" });
  }
  for (const cls of state.catalog.classes) {
    if (!cls.parent || !byId.has(cls.name) || !byId.has(cls.parent)) continue;
    links.push({ source: byId.get(cls.name), target: byId.get(cls.parent), label: "继承", kind: "parent" });
  }
  const buckets = new Map();
  for (const link of links) {
    const key = link.source.id < link.target.id ? `${link.source.id}|${link.target.id}` : `${link.target.id}|${link.source.id}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(link);
  }
  for (const bucket of buckets.values()) bucket.forEach((link, index) => {
    link.curve = (index - (bucket.length - 1) / 2) * 26;
  });

  for (let step = 0; step < 260; step += 1) {
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const rawX = b.x - a.x;
        const rawY = b.y - a.y;
        const dist = Math.hypot(rawX, rawY) || 0.1;
        const unitX = rawX / dist;
        const unitY = rawY / dist;
        const force = 9000 / (dist * dist);
        a.vx -= unitX * force; a.vy -= unitY * force;
        b.vx += unitX * force; b.vy += unitY * force;
        if (dist < 108) {
          const push = (108 - dist) / 2;
          a.x -= unitX * push; a.y -= unitY * push;
          b.x += unitX * push; b.y += unitY * push;
        }
      }
    }
    for (const link of links) {
      if (link.source === link.target) continue;
      const dx = link.target.x - link.source.x;
      const dy = link.target.y - link.source.y;
      const dist = Math.hypot(dx, dy) || 0.1;
      const force = (dist - (link.kind === "parent" ? 90 : 130)) * 0.003;
      link.source.vx += (dx / dist) * force;
      link.source.vy += (dy / dist) * force;
      link.target.vx -= (dx / dist) * force;
      link.target.vy -= (dy / dist) * force;
    }
    for (const node of nodes) {
      node.vx = (node.vx + (node.home.x - node.x) * 0.08) * 0.55;
      node.vy = (node.vy + (node.home.y - node.y) * 0.08) * 0.55;
      node.vx = Math.max(-16, Math.min(16, node.vx));
      node.vy = Math.max(-16, Math.min(16, node.vy));
      node.x += node.vx;
      node.y += node.vy;
    }
  }

  const cam = { x: 0, y: 0, scale: 1 };
  const fit = () => {
    if (!nodes.length) {
      paint();
      return;
    }
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity;
    nodes.forEach((node) => {
      minX = Math.min(minX, node.x); minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x); maxY = Math.max(maxY, node.y);
    });
    const scale = Math.min((width - 140) / ((maxX - minX) + 80 || 1), (height - 120) / ((maxY - minY) + 70 || 1), 1.2);
    cam.scale = scale;
    cam.x = width / 2 - ((minX + maxX) / 2) * scale;
    cam.y = height / 2 - ((minY + maxY) / 2) * scale;
    paint();
  };

  const paint = () => {
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.max(1, width * dpr);
    canvas.height = Math.max(1, height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(cam.x, cam.y);
    ctx.scale(cam.scale, cam.scale);
    const focus = state.byName.has(state.id) && byId.has(state.id) ? state.id : "";
    for (const link of links) {
      const incident = focus && (link.source.id === focus || link.target.id === focus);
      if (state.neighborsOnly && focus && !incident && link.kind !== "parent") continue;
      if (!focus && state.neighborsOnly && link.kind !== "parent") continue;
      ctx.beginPath();
      ctx.strokeStyle = incident ? "#9a3412" : link.kind === "parent" ? "#a8a29e" : "rgba(120,113,108,0.45)";
      ctx.lineWidth = incident ? 1.6 : 1;
      ctx.setLineDash(link.kind === "parent" ? [4, 4] : []);
      if (link.source === link.target) {
        ctx.arc(link.source.x + 22, link.source.y - 18, 12, 0, Math.PI * 2);
      } else {
        const mx = (link.source.x + link.target.x) / 2;
        const my = (link.source.y + link.target.y) / 2;
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const len = Math.hypot(dx, dy) || 1;
        ctx.moveTo(link.source.x, link.source.y);
        ctx.quadraticCurveTo(mx + (-dy / len) * link.curve, my + (dx / len) * link.curve, link.target.x, link.target.y);
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);
    for (const node of nodes) {
      const on = node.id === focus;
      ctx.beginPath();
      ctx.fillStyle = node.color;
      ctx.arc(node.x, node.y, on ? 16 : 12, 0, Math.PI * 2);
      ctx.fill();
      if (on) {
        ctx.strokeStyle = "#1c1917";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.font = "12px PingFang SC, sans-serif";
      ctx.textAlign = "center";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#fffcf8";
      ctx.strokeText(node.label, node.x, node.y + 28);
      ctx.fillStyle = "#1c1917";
      ctx.fillText(node.label, node.x, node.y + 28);
    }
    ctx.restore();
  };

  const world = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left - cam.x) / cam.scale,
      y: (event.clientY - rect.top - cam.y) / cam.scale,
    };
  };
  const hit = (point) => nodes.find((node) => Math.hypot(node.x - point.x, node.y - point.y) <= 16);

  let drag = null;
  canvas.addEventListener("pointerdown", (event) => {
    const point = world(event);
    const node = hit(point);
    drag = node
      ? { kind: "node", node, x: event.clientX, y: event.clientY, moved: false }
      : { kind: "pan", x: event.clientX, y: event.clientY, camX: cam.x, camY: cam.y, moved: false };
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add("drag");
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!drag) return;
    drag.moved = drag.moved || Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 3;
    if (drag.kind === "node" && drag.moved) {
      const point = world(event);
      drag.node.x = point.x;
      drag.node.y = point.y;
      paint();
    } else if (drag.kind === "pan" && drag.moved) {
      cam.x = drag.camX + event.clientX - drag.x;
      cam.y = drag.camY + event.clientY - drag.y;
      paint();
    }
  });
  canvas.addEventListener("pointerup", (event) => {
    if (drag && !drag.moved) {
      const node = drag.kind === "node" ? drag.node : hit(world(event));
      location.hash = node ? `#/graph/${node.id}` : "#/graph";
    }
    drag = null;
    canvas.classList.remove("drag");
  });
  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    const next = Math.min(2.4, Math.max(0.35, cam.scale * (event.deltaY > 0 ? 0.92 : 1.08)));
    cam.x = px - ((px - cam.x) / cam.scale) * next;
    cam.y = py - ((py - cam.y) / cam.scale) * next;
    cam.scale = next;
    paint();
  }, { passive: false });

  if (state.onResize) window.removeEventListener("resize", state.onResize);
  state.onResize = () => paint();
  window.addEventListener("resize", state.onResize);
  graphApi = { fit, paint };
  requestAnimationFrame(fit);
}

function renderGraphPanel(selected) {
  const panel = document.querySelector("#graph-panel");
  if (!selected) {
    panel.innerHTML = `
      <div class="kicker">图谱</div>
      <h2>${esc(state.catalog.meta.name)}</h2>
      <p class="comment">${esc(state.catalog.meta.description)}</p>
      <p class="muted">点一个类看它的关系。虚线是继承。默认只画继承，选中类后再展开它自己的关系。</p>`;
    return;
  }
  const outs = state.catalog.relations.filter((rel) => rel.domain === selected.name);
  const ins = state.catalog.relations.filter((rel) => rel.range === selected.name);
  const relItem = (rel, other) => `
    <li>
      <button type="button" data-id="${esc(other.name)}">${esc(rel.label)} → ${esc(other.label)}</button>
      <div class="muted">${esc(rel.comment)}</div>
    </li>`;
  panel.innerHTML = `
    <div class="kicker">${esc(selected.group)} · ${esc(selected.name)}</div>
    <h2>${esc(selected.label)}</h2>
    <div class="actions">
      <a class="btn" href="#/ontology/${esc(selected.name)}">本体</a>
      <a class="btn" href="#/knowledge/${esc(selected.name)}">知识</a>
      <a class="btn" href="#/metrics/${esc(selected.name)}">指标</a>
    </div>
    <p class="comment ${state.expanded ? "" : "clamp"}">${esc(selected.comment)}</p>
    ${selected.comment.length > 180 ? `<button type="button" class="linkish" id="expand">${state.expanded ? "收起" : "展开说明"}</button>` : ""}
    <h3>指出 ${outs.length}</h3>
    <ul class="rel-list">${outs.map((rel) => relItem(rel, state.byName.get(rel.range))).join("") || "<li class='muted'>无</li>"}</ul>
    <h3>指入 ${ins.length}</h3>
    <ul class="rel-list">${ins.map((rel) => relItem(rel, state.byName.get(rel.domain))).join("") || "<li class='muted'>无</li>"}</ul>`;
  panel.querySelectorAll("[data-id]").forEach((button) => {
    button.addEventListener("click", () => { location.hash = `#/graph/${button.dataset.id}`; });
  });
  const expand = document.querySelector("#expand");
  if (expand) expand.addEventListener("click", () => { state.expanded = !state.expanded; renderGraphPanel(selected); });
}

function classButtons(active) {
  return state.catalog.groups.map((group) => `
    <div class="group-label">${esc(group.label)}</div>
    ${group.classes.map((name) => {
      const cls = state.byName.get(name);
      return `<button type="button" class="item ${name === active ? "on" : ""}" data-id="${esc(name)}"><strong>${esc(cls.label)}</strong><small>${esc(name)}</small></button>`;
    }).join("")}`).join("");
}

function bindClassButtons(page) {
  document.querySelectorAll(".list [data-id]").forEach((button) => {
    button.addEventListener("click", () => { location.hash = `#/${page}/${button.dataset.id}`; });
  });
}

function mappingLinks(prop) {
  if (!prop.mapping.length) return `<span class="muted">无</span>`;
  return `<div class="maps">${prop.mapping.map((item) => `<a class="map mono" href="#/datasets/${encodeURIComponent(item.table)}">${esc(item.table)}.${esc(item.field)}</a>`).join("")}</div>`;
}

function renderOntology(view) {
  const selected = state.byName.get(state.id) || state.catalog.classes[0];
  const query = state.ontologyQuery.trim().toLowerCase();
  const props = selected.properties.filter((prop) => !query || `${prop.label} ${prop.name} ${prop.comment} ${prop.mapping.map((m) => `${m.table}.${m.field}`).join(" ")}`.toLowerCase().includes(query));
  view.innerHTML = `
    <div class="split">
      <div class="list">${classButtons(selected.name)}</div>
      <div class="detail">
        <div class="head-row">
          <div>
            <div class="kicker">${esc(selected.group)} · ${esc(selected.name)}${selected.parent ? ` · 继承 ${esc(selected.parent)}` : ""}</div>
            <h2>${esc(selected.label)}</h2>
          </div>
          <div class="badges"><span class="badge">${selected.properties.length} 个属性</span></div>
        </div>
        <p class="comment">${esc(selected.comment)}</p>
        <div class="filters"><input id="prop-filter" placeholder="筛选属性、口径、字段" value="${esc(state.ontologyQuery)}" /></div>
        <div class="table-wrap"><table>
          <thead><tr><th>属性</th><th>类型</th><th>字段</th><th>口径</th></tr></thead>
          <tbody>
            ${props.map((prop) => `
              <tr class="${prop.name === state.extra ? "hit" : ""}" data-prop="${esc(prop.name)}">
                <td><strong>${esc(prop.label)}</strong><div class="mono muted">${esc(prop.name)}</div>${prop.inherited ? `<div class="muted">继承自 ${esc(prop.inheritedFrom)}</div>` : ""}</td>
                <td>${esc(prop.datatype)}</td>
                <td>${mappingLinks(prop)}</td>
                <td class="comment">${esc(prop.comment)}</td>
              </tr>`).join("")}
          </tbody>
        </table></div>
      </div>
    </div>`;
  bindClassButtons("ontology");
  const filter = document.querySelector("#prop-filter");
  filter.addEventListener("input", () => {
    state.ontologyQuery = filter.value;
    const pos = filter.selectionStart;
    renderOntology(view);
    const next = document.querySelector("#prop-filter");
    next.focus();
    next.setSelectionRange(pos, pos);
  });
}

function renderKnowledge(view) {
  const articles = [
    { id: "model", title: "建模说明", group: "总则", body: state.catalog.meta.description },
    ...state.catalog.classes.map((cls) => ({ id: cls.name, title: cls.label, group: cls.group, body: cls.comment, cls })),
  ];
  const query = state.knowledgeQuery.trim().toLowerCase();
  const shown = articles.filter((item) => !query || `${item.title} ${item.body} ${item.group}`.toLowerCase().includes(query));
  const current = articles.find((item) => item.id === state.id) || shown[0] || articles[0];
  const cls = current.cls;
  view.innerHTML = `
    <div class="filters"><input id="know-filter" placeholder="搜知识说明" value="${esc(state.knowledgeQuery)}" /></div>
    <div class="split">
      <div class="list">
        ${shown.map((item) => `<button type="button" class="item ${item.id === current.id ? "on" : ""}" data-id="${esc(item.id)}"><strong>${esc(item.title)}</strong><small>${esc(item.group)}</small></button>`).join("") || `<p class="muted">没有匹配</p>`}
      </div>
      <article class="article">
        <div class="kicker">${esc(current.group)}</div>
        <h2>${esc(current.title)}</h2>
        <p class="prose">${esc(current.body || "本体没有写这段说明。")}</p>
        ${cls ? knowledgeExtra(cls) : ""}
      </article>
    </div>`;
  document.querySelectorAll(".list [data-id]").forEach((button) => {
    button.addEventListener("click", () => { location.hash = `#/knowledge/${button.dataset.id}`; });
  });
  const filter = document.querySelector("#know-filter");
  filter.addEventListener("input", () => {
    state.knowledgeQuery = filter.value;
    const pos = filter.selectionStart;
    renderKnowledge(view);
    const next = document.querySelector("#know-filter");
    next.focus();
    next.setSelectionRange(pos, pos);
  });
}

function knowledgeExtra(cls) {
  const outs = state.catalog.relations.filter((rel) => rel.domain === cls.name);
  const metrics = cls.properties.filter(numeric);
  return `
    <h3>关系</h3>
    <ul class="rel-list">${outs.map((rel) => `<li>${esc(rel.label)} → ${esc(state.byName.get(rel.range).label)}<div class="muted">${esc(rel.comment)}</div></li>`).join("") || "<li>无</li>"}</ul>
    <h3>数值属性 ${metrics.length}</h3>
    <p><a href="#/metrics/${esc(cls.name)}">在指标里查看</a></p>`;
}

function renderMetrics(view) {
  state.metricClass = state.byName.has(state.id) ? state.id : "";
  const query = state.metricQuery.trim().toLowerCase();
  const rows = [];
  for (const cls of state.catalog.classes) {
    if (state.metricClass && cls.name !== state.metricClass) continue;
    for (const prop of cls.properties) {
      const modeOk = state.metricMode === "all"
        || (state.metricMode === "number" && numeric(prop))
        || prop.datatype === state.metricMode;
      if (!modeOk) continue;
      const blob = `${cls.label} ${prop.label} ${prop.name} ${prop.comment} ${prop.mapping.map((m) => `${m.table}.${m.field}`).join(" ")}`.toLowerCase();
      if (query && !blob.includes(query)) continue;
      rows.push({ cls, prop });
    }
  }
  view.innerHTML = `
    <div class="head-row"><div><div class="kicker">指标</div><h2>数值属性口径</h2></div><span class="badge">${rows.length} 条</span></div>
    <p class="muted">指标就是本体里的整数和小数属性。口径用属性说明，这里不另写公式。</p>
    <div class="filters">
      <select id="metric-mode">
        <option value="number">整数和小数</option>
        <option value="decimal">小数</option>
        <option value="integer">整数</option>
        <option value="boolean">是否标记</option>
        <option value="all">全部属性</option>
      </select>
      <select id="metric-class"><option value="">全部类</option>
        ${state.catalog.classes.map((cls) => `<option value="${esc(cls.name)}">${esc(cls.label)}</option>`).join("")}
      </select>
      <input id="metric-query" placeholder="搜指标、口径、字段" value="${esc(state.metricQuery)}" />
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>指标</th><th>类</th><th>类型</th><th>来源</th><th>口径</th></tr></thead>
      <tbody>
        ${rows.slice(0, 500).map(({ cls, prop }) => `
          <tr>
            <td><a href="#/ontology/${esc(cls.name)}/${encodeURIComponent(prop.name)}">${esc(prop.label)}</a><div class="mono muted">${esc(prop.name)}</div></td>
            <td><a href="#/ontology/${esc(cls.name)}">${esc(cls.label)}</a></td>
            <td>${esc(prop.datatype)}</td>
            <td>${mappingLinks(prop)}</td>
            <td>${esc(prop.comment)}</td>
          </tr>`).join("")}
      </tbody>
    </table></div>
    ${rows.length > 500 ? `<p class="muted">还有 ${rows.length - 500} 条，请再用类或关键词收窄。</p>` : ""}`;
  document.querySelector("#metric-mode").value = state.metricMode;
  document.querySelector("#metric-class").value = state.metricClass;
  document.querySelector("#metric-mode").addEventListener("change", (event) => { state.metricMode = event.target.value; renderMetrics(view); });
  document.querySelector("#metric-class").addEventListener("change", (event) => {
    const next = event.target.value ? `#/metrics/${event.target.value}` : "#/metrics";
    if (location.hash === next) {
      state.metricClass = event.target.value;
      renderMetrics(view);
    } else location.hash = next;
  });
  const input = document.querySelector("#metric-query");
  input.addEventListener("input", () => {
    state.metricQuery = input.value;
    const pos = input.selectionStart;
    renderMetrics(view);
    const next = document.querySelector("#metric-query");
    next.focus();
    next.setSelectionRange(pos, pos);
  });
}

function renderDatasets(view) {
  const query = state.datasetQuery.trim().toLowerCase();
  const datasets = state.catalog.datasets.filter((ds) => !query || `${ds.table} ${ds.classes.map((c) => c.label).join(" ")} ${ds.columns.map((c) => `${c.name} ${c.comment}`).join(" ")}`.toLowerCase().includes(query));
  const current = state.catalog.datasets.find((ds) => ds.table === state.id) || datasets[0];
  view.innerHTML = `
    <div class="filters"><input id="ds-filter" placeholder="搜视图、字段、字段说明" value="${esc(state.datasetQuery)}" /></div>
    <div class="split">
      <div class="list">
        ${datasets.map((ds) => `<button type="button" class="item ${current && ds.table === current.table ? "on" : ""}" data-id="${esc(ds.table)}"><strong class="mono">${esc(ds.table)}</strong><small>${ds.mapped ? ds.classes.map((c) => esc(c.label)).join("、") : "未挂接"} · ${ds.columns.length} 列</small></button>`).join("")}
      </div>
      <div class="detail">
        ${current ? datasetDetail(current, query) : `<p>没有匹配的数据集</p>`}
      </div>
    </div>`;
  document.querySelectorAll(".list [data-id]").forEach((button) => {
    button.addEventListener("click", () => { location.hash = `#/datasets/${encodeURIComponent(button.dataset.id)}`; });
  });
  const filter = document.querySelector("#ds-filter");
  filter.addEventListener("input", () => {
    state.datasetQuery = filter.value;
    const pos = filter.selectionStart;
    renderDatasets(view);
    const next = document.querySelector("#ds-filter");
    next.focus();
    next.setSelectionRange(pos, pos);
  });
}

function datasetDetail(ds, query) {
  const cols = ds.columns.filter((col) => !query || `${col.name} ${col.comment} ${ds.table}`.toLowerCase().includes(query) || ds.table.toLowerCase().includes(query));
  return `
    <div class="head-row">
      <div>
        <div class="kicker">db_ontology_mkt</div>
        <h2 class="mono">${esc(ds.table)}</h2>
      </div>
      <div class="badges">
        <span class="badge ${ds.mapped ? "ok" : "warn"}">${ds.mapped ? "已挂接" : "未挂接本体"}</span>
        <span class="badge">${ds.columns.length} 列</span>
      </div>
    </div>
    <p>${ds.classes.map((cls) => `<a href="#/ontology/${esc(cls.name)}">${esc(cls.label)}</a>`).join("、") || "这张视图在库里，2026-11-06 这版本体没有把属性映到它。"}</p>
    <div class="table-wrap"><table>
      <thead><tr><th>字段</th><th>类型</th><th>说明</th><th>本体属性</th></tr></thead>
      <tbody>
        ${cols.map((col) => `
          <tr>
            <td class="mono">${esc(col.name)}</td>
            <td>${esc(col.type)}</td>
            <td>${esc(col.comment)}</td>
            <td>${col.properties.map((prop) => `<a href="#/ontology/${esc(prop.class)}/${encodeURIComponent(prop.name)}">${esc(prop.classLabel)}.${esc(prop.label)}</a>`).join("<br>") || `<span class="muted">—</span>`}</td>
          </tr>`).join("")}
      </tbody>
    </table></div>`;
}

load();
