import pytest

from handwrite.algorithms.sort.quick import quick


@pytest.mark.parametrize(
    ("values", "expected"),
    [
        ([], []),
        ([1], [1]),
        ([3, 1, 2], [1, 2, 3]),
        ([1, 2, 3, 4], [1, 2, 3, 4]),
        ([4, 3, 2, 1], [1, 2, 3, 4]),
        ([3, 1, 3, 2, 1], [1, 1, 2, 3, 3]),
        ([0, -5, 3, -1, 2], [-5, -1, 0, 2, 3]),
    ],
)
def test_quick_sorts_integer_lists(values: list[int], expected: list[int]) -> None:
    assert quick(values) == expected


def test_quick_does_not_modify_input() -> None:

    values = [4, 2, 3, 1]
    original = values.copy()

    quick(values)

    assert values == original
