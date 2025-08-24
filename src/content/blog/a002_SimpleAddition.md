---
title: "a002. 簡易加法"
description: ""
date: 2025-05-16
tags: ["cpp"]
---

## 解法一、直接相加

- 時間 O(1)
- 空間 O(1)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int a, b;
    cin >> a >> b;
    cout << a+b;

    return 0;
}
```
