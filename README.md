# AI 工具仓库

这个仓库专门存放给 Cursor Agent 用的个人内容：skill、rule、MCP、知识笔记。仓库是一份可以提交、换电脑后克隆的源文件。Cursor 不会在别的项目里按 Git 地址远程读取这里的文件，需要先安装到本机。

## 目录

```text
ai-kit/
├── rules/          规则，.mdc 文件
├── skills/         技能，每个技能一个目录，里面有 SKILL.md
├── commands/       输入 / 才会执行的命令
├── agents/         子代理
├── hooks/          需要时再加 hooks.json
└── mcp.example.json
```

知识笔记放在 `ai-kit/skills/personal-knowledge/references/`。对话里输入 `/personal-knowledge` 再说明要查或要记的内容。

营销费用本体在 `ontology/`。本地查阅平台在 `ontology-studio/`，Agent 技能是 `ai-kit/skills/mkt-ontology/`。

```bash
./ontology-studio/serve.sh
```

浏览器打开 http://127.0.0.1:8765/ 。图谱、本体、知识库、指标、数据集都从这份本体和 `db_ontology_mkt` 的视图结构生成。改完本体后重新执行 `python3 ontology-studio/build_catalog.py`，再跑一次 `./scripts/install-local.sh`。

## 在这台电脑上启用

```bash
./scripts/install-local.sh
```

然后在 Cursor 命令面板执行 **Developer: Reload Window**。插件会出现在 Customize 里，对之后打开的项目生效。

改完仓库后重新执行上面的脚本，再 Reload 一次。

## 以后怎么往里加

| 内容 | 放哪里 | 注意 |
| --- | --- | --- |
| 规则 | `ai-kit/rules/某个名字.mdc` | 必须是 `.mdc`，并带 frontmatter |
| 技能 | `ai-kit/skills/技能名/SKILL.md` | `name` 与文件夹名一致 |
| 知识笔记 | `ai-kit/skills/personal-knowledge/references/*.md` | 用 `/personal-knowledge` 调用 |
| 命令 | `ai-kit/commands/某个名字.md` | 只有输入 `/` 时执行 |
| 子代理 | `ai-kit/agents/某个名字.md` | 单独上下文，做完把结论交回主对话 |
| MCP | 复制 `mcp.example.json` 为 `ai-kit/mcp.json` | 密钥用 `${env:变量名}`，不要写真实口令 |

规则示例：

```markdown
---
description: 何时使用这条规则
globs: models/**/*.sql
alwaysApply: false
---

- 规则正文保持简短。
```

`alwaysApply: true` 会进入每一次 Agent 对话。只约束某类文件时用 `globs`。

## 换一台电脑

1. 安装并登录 Cursor 的 `origin` 命令行工具。
2. 克隆这个仓库。
3. 执行 `./scripts/install-local.sh`，然后 Reload Window。

企业版可能关闭「允许本地插件导入」。那种环境要改用团队插件市场，不能靠本机目录加载。

## 不要放进 Git 的东西

口令、token、连接串、`.env`。MCP 只提交带 `${env:...}` 的配置。
