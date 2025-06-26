---
title: "基礎"
chapter: 0
---

## C++ 基礎模板

***

如果你使用 cin / cout

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

signed main(){

    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // code

    return 0;
}
```

<br>

如果你使用 scanf / printf

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

signed main(){

    // code

    return 0;
}
```

<br>

建議平常使用 cin / cout<br>
需要特殊輸入輸出時再用 scanf / printf<br>

<br><br>

## 雷區

***

### overflow

由於已經 `#define int long long` 了<br>
比較不會有 overflow 的問題

<br>

### 字串

這是錯的

```cpp
string s = "ABC" + "DEF";
```

"ABC" 型別是 `const char[4]` ("ABC\0")<br>
`"ABC" + "DEF"` 就相當於 `const char* + const char*`<br>
肯定炸 (UB)

這時通常需要把其中一個轉成 `std::string`<br>
有 3 種轉換方式

```cpp
string s = "ABC"s + "DEF";
string s = (string)"ABC" + "DEF";
string s = string("ABC") + "DEF";
```

<br>

### 浮點數

這是一個經典的例子

```cpp
double x = 0.1, y = 0.2;
bool eq = (x+y == 0.3);
if(eq) cout << "0.2+0.1 == 0.3";
else cout << "0.2+0.1 != 0.3";
```

輸出是 `0.2+0.1 != 0.3`

浮點數在電腦是以二進制近似值儲存的<br>
二進制也是會有無限循環小數，有誤差<br>
所以 `b` 會是 `false`
$0.2 + 0.1 = 0.30000000000000004$<br>
$0.3 = 0.29999999999999999$<br>

解決的方法是使用「容差」比較<br>
避免直接使用 `==`

```cpp
double x = 0.1, y = 0.2;
bool eq = fabs(0.3 - (x+y)) < 1e-9;
```

相差 $< 10^{-9}$ 就將倆浮點數視為相等

也可以封裝成函數

```cpp
bool equal(double a, double b) {
    return fabs(a - b) < 1e-9;
}
```

然後 `equal(x+y, 0.3);`

建議浮點數用 `double`<br>
如果用 `float` 需要改 `1e-6`<br>
(float 精度較低)

<br><br>

## 一些技巧

***

### 除以2

有時候要記算 /2 時使用右移<br>
例如找中點

慢

```cpp
int m = (l+r)/2;

```

快

```cpp
int m = (l+r)>>1;

```

×÷ 2 的倍數都可以用左右移

<br>

### 取2餘數

慢

```cpp
int r = x%2;
```

快

```cpp
int r = x&1;
```

( `x&1` 只會保留二進制最後一位元就相當於 `x%2` )

<br>

### 善用 `&`

多使用 `&`，避免不必要的複製<br>
(優化代碼速度)

```cpp
for(int& num : nums){
    // ...
}
```

如果只讀取，不修改元素<br>
可以使用 `const&`

```cpp
for(const int& num : nums){
    // ...
}
```

<br>

簡化陣列輸入代碼

```cpp
vector<int> nums(10);
for(int& i : nums) cin >> i;

/*
否則你的 code 可能長成這樣：
for(int i=0; i<10; i++){
    int temp;
    cin >> temp;
    nums[i] = temp;
}
*/
```

