def quick(arr: list[int]):
    if len(arr) <= 1:
        return arr
    base = arr[0]

    left = []
    right = []

    for i in range(1, len(arr)):
        if arr[i] < base:
            left.append(arr[i])
        else:
            right.append(arr[i])

    b = quick(left)
    b.append(base)
    b.extend(quick(right))
    return b


print(quick([4, 234, 645, 214, 324, 567, 2, 341, -1]))
