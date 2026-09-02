# %%


def bubble(arr: list[int]):
    if len(arr) <= 1:
        return arr
    for i in range(0, len(arr)):
        for j in range(0, len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    return arr


print(bubble([10, 3, 2, 6, -1, 0]))
