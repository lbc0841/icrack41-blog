---
title: "a004. 文文的求婚"
description: ""
date: 2025-05-16
tags: ["cpp"]
---

## 解法一、取模

- 時間 O(1)
- 空間 O(1)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int y;
    while(cin >> y){
        if((y%4==0 && y%100!=0) || y%400==0) cout << "閏年\n";
        else cout << "平年\n";
    }
    
    return 0;
}
```
