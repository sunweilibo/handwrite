# %%
def guibing(arr: list[int]):
    if len(arr) <= 1:
        return arr
    arr_len = len(arr)
    left = arr[: arr_len // 2]
    right = arr[arr_len // 2 :]
    return gb(guibing(left), guibing(right))


def gb(arr1: list[int], arr2: list[int]):
    res = []
    while len(arr1) > 0 and len(arr2) > 0:
        if arr1[0] < arr2[0]:
            res.append(arr1.pop(0))
        else:
            res.append(arr2.pop(0))
    if len(arr1) > 0:
        res.extend(arr1)
    if len(arr2) > 0:
        res.extend(arr2)
    return res


print(guibing([56, 34, 123, 123, 765, 1234, 23, 2138, 1, 1, 65, 21]))
