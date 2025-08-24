---
title: "a003. 兩光法師占卜術"
description: ""
date: 2025-05-16
tags: ["cpp"]
--- 

## 解法一、switch case

- 時間 O(1)
- 空間 O(1)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int a, b, s;
    cin >> a >> b;
    s = (a*2+b)%3;
    
    switch(s){
        case 0: cout << "普通"; break;
        case 1: cout << "吉"; break;
        case 2: cout << "大吉"; break;
    }
    
    return 0;
}
```
