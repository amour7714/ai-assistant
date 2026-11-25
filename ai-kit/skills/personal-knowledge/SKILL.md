---
name: personal-knowledge
description: Reads and updates the user's personal knowledge notes stored beside this skill. Use when the user asks to look up, save, or organize notes they keep for the AI.
disable-model-invocation: true
---

# 个人知识库

笔记放在本技能目录的 `references/` 下，每篇一个 Markdown 文件。

## 查阅

1. 列出 `references/` 里的 Markdown 文件。
2. 只打开和问题相关的文件，不要一次读完全部笔记。
3. 用笔记里的说法回答，并标明来自哪个文件。笔记没写到的内容，直接说明笔记里没有。

## 新增或修改

1. 按用户的原意写入 `references/`，文件名用简短英文或拼音，例如 `warehouse-naming.md`。
2. 不改写用户没有要求改的笔记。
3. 不把密钥、口令、连接串写进笔记。
