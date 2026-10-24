from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any, TypedDict


class Strike(TypedDict, total=False):
    id: str
    time: str
    lat: float
    lon: float
    type: str  # cg | ic | unknown
    energy: float
    source: str  # goes-glm | mtg-li | xweather


class LightningProvider(ABC):
    """Every lightning data source implements this interface."""

    name: str

    @abstractmethod
    def fetch_new(self) -> list[Strike]:
        """Return newly detected strikes since the last successful poll."""
