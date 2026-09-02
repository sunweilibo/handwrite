# Python 练习环境

这个目录用于用 Python 重新实现现有的 JS/TS 手写练习，原有代码不受影响。

## 初始化

从仓库根目录进入 Python 子项目：

```bash
cd python
mise run install
mise run sync
```

Python 子项目通过当前目录下的 `mise.toml` 固定使用 Python 3.12.13。进入 `python/`
目录后，mise 会自动选择该版本；
`uv sync` 会使用它在 `python/` 目录创建 `.venv` 并安装开发工具。

确认当前版本：

```bash
mise current python
mise exec -- python --version
```

如果使用 VS Code/PyCharm，请选择解释器：

```text
<项目目录>/python/.venv/bin/python
```

## 常用命令

```bash
# 运行测试
mise run test

# 检查代码
cd python && uv run ruff check .

# 自动格式化
cd python && uv run ruff format .
```

## 目录对应关系

```text
ts/api/                          -> python/handwrite/api/
ts/algorithm/DFS.js              -> python/handwrite/algorithms/traversal.py
ts/algorithm/sort/               -> python/handwrite/algorithms/sort/
ts/design-mode/publish-subscribe -> python/handwrite/design_patterns/
ts/test/                         -> python/tests/
```

新增实现时，在 `python/handwrite/` 下创建模块，并在 `python/tests/` 下添加对应测试即可。
