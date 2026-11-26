#!/bin/bash
# 生成本体目录并在本机打开查阅平台。
set -euo pipefail
cd "$(dirname "$0")"
python3 build_catalog.py
PORT="${1:-8765}"
echo "打开 http://127.0.0.1:${PORT}/"
exec python3 -m http.server "$PORT"
