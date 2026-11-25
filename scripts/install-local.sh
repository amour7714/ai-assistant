#!/bin/bash
# 把 ai-kit 复制到本机 Cursor 的本地插件目录。复制完成后在 Cursor 里执行
# Developer: Reload Window，规则和技能才会在其他项目里出现。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${HOME}/.cursor/plugins/local/ai-kit"

mkdir -p "${HOME}/.cursor/plugins/local"
rm -rf "${DEST}"
mkdir -p "${DEST}"
cp -R "${ROOT}/ai-kit/." "${DEST}/"

echo "已安装到 ${DEST}"
echo "请在 Cursor 命令面板执行 Developer: Reload Window"
