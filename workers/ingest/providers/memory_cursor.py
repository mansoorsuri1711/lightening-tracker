"""Tiny file-backed cursor store when Redis is unavailable."""

from __future__ import annotations

import json
from pathlib import Path

CURSOR_FILE = Path(__file__).resolve().parents[1] / ".glm_cursors.json"


class MemoryCursorStore:
    def __init__(self) -> None:
        self._keys: set[str] = set()
        if CURSOR_FILE.exists():
            try:
                data = json.loads(CURSOR_FILE.read_text())
                if isinstance(data, list):
                    self._keys = set(str(x) for x in data[-200:])
            except Exception:  # noqa: BLE001
                self._keys = set()

    def smembers(self, _key: str) -> set[str]:
        return set(self._keys)

    def sadd(self, _key: str, *members: str) -> int:
        before = len(self._keys)
        self._keys.update(members)
        self._persist()
        return len(self._keys) - before

    def scard(self, _key: str) -> int:
        return len(self._keys)

    def srem(self, _key: str, *members: str) -> int:
        n = 0
        for m in members:
            if m in self._keys:
                self._keys.remove(m)
                n += 1
        self._persist()
        return n

    def pipeline(self):
        return _Pipe(self)

    def _persist(self) -> None:
        ordered = sorted(self._keys)[-200:]
        self._keys = set(ordered)
        CURSOR_FILE.write_text(json.dumps(ordered))


class _Pipe:
    def __init__(self, store: MemoryCursorStore) -> None:
        self.store = store
        self.ops: list[tuple] = []

    def sadd(self, key: str, *members: str):
        self.ops.append(("sadd", key, members))
        return self

    def scard(self, key: str):
        self.ops.append(("scard", key))
        return self

    def execute(self):
        out = []
        for op in self.ops:
            if op[0] == "sadd":
                out.append(self.store.sadd(op[1], *op[2]))
            elif op[0] == "scard":
                out.append(self.store.scard(op[1]))
        self.ops.clear()
        return out
