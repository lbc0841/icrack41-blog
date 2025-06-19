---
title: "二分搜 Binary Search"
chapter: 0
---

## 概念

***

### 從例子開始

某天我突然神經病犯了<br>
想測量我的手機<br>
**最高從多高的地方摔下來不會碎**<br>
(手機能承受的最大跌落高度)<br>

就開始了逆天實驗<br>
為了實驗準確性，每次摔都要用一支新手機<br>
並且在實驗前我通靈得知手機從 1000cm 摔下來一定會碎

我有幾種測試方法：

- 方法一<br>
從最低處開始摔<br>
1cm、2cm、3cm... 直到手機碎掉<br>
這樣可以找到手機能承受的最大跌落高度

- 方法二<br>
從最高處開始摔<br>
999cm、998cm、997cm... 直到手機不會碎掉<br>
這樣也可以找到手機能承受的最大跌落高度

- 方法三<br>
每次取中間點摔<br>
第一次：$\frac{0+1000}{2} = 500$<br>
第二次：$\frac{0+500}{2} = 250$ 或 $\frac{500+1000}{2} = 750$<br>
第三次：...<br>
(根據上次的結果判斷這次從哪摔)<br>
第一次碎了 → 往更低處試<br>
第一次沒碎 → 往更高處試

對於 方法一 & 方法二<br>
假設手機能承受的最大跌落高度為 $h$<br>
則需要摔手機的次數分別為 $h$ 與 $1000-h$<br>
很顯然我沒錢可以買這麼多手機<br>
而 方法三 的效率很顯然遠大於 方法一 & 方法二<br>

這就是二分搜的核心思想<br>
<font color="ff0000">根據每次的結果判斷下次搜索的範圍</font>

<br><br>

## 時間複雜度

***

暴力遍歷 $O(N)$<br>
二分搜索 $O(logN)$<br>

使用二分搜索的目的是提升速度<br>
通常在 **需要多次查詢** 或是 **查詢範圍很大** 時會很有優勢

*e.g.*<br>
對於 $10^{6}$ 筆資料的陣列而言<br>
要找到目標值<br>
暴力總共需要比較 $\color{Red} 10^{6}$ 次<br>
而二分搜索則是 $\left \lceil log_{2}10^{6} \right \rceil = \color{Red} 20$ 次

<br><br>

## 代碼實現

***

#### 模板

依照上面的例子<br>
代碼邏輯大概是

```cpp
while(/* 還沒得出實驗結果 */){
    int m = /* 計算中點 */;
    if(/* 手機沒碎 */) /* 往高處試 */
    else /* 往低處試 */
}
```

為了在其他場景下也能用這個模板<br>
需要稍微更改描述

```cpp
while(/* 區間不為空時執行 */){
    int m = /* 計算中點 */;
    if(/* 判斷條件 */) /* 縮區間 */
    else /* 縮區間 */
}
```

~~非常好，二分搜學完了~~

#### 區間模板

按區間可以分成不同寫法<br>
區間分為：

- 左閉右開 [l, r)
- 閉區間 [l, r]
- 開區間 (l, r)

不同區間的寫法略有不同

#### 以下代碼

二分搜以 lower_bound 舉例<br>
(lower_bound：找到第一個 ≥ 目標的數)

c++ algorithm 已經有 lower_bound()<br>
因此以下代碼的函數以 my_lower_bound 命名

- `l` 表示 left<br>
- `r` 表示 right<br>
- `m` 表示 middle<br>
- `nums` 為一個由小到大排好序的 vector<br>
- `target` 為要從中尋找的值

#### 惡補數學

閉區間 [l, r] 為 $\left\{ x \in \mathbb{R}, l \leq x \leq r \right\}$<br>
開區間 (l, r) 為 $\left\{ x \in \mathbb{R}, l < x < r \right\}$<br>
左閉右開 [l, r) 為 $\left\{ x \in \mathbb{R}, l \leq x < r \right\}$<br>
左開右閉 (l, r] 為 $\left\{ x \in \mathbb{R}, l < x \leq r \right\}$<br>
<br>
程式碼中因為索引只能是整數<br>
所以 $ x \in \mathbb{Z} $<br>

// 2 2 2 5 6 6 7 8 9 9 10

#### 加法溢位問題

m 為 l 與 r 的中點，也就是 $\left \lfloor \frac{l+r}{2}\right \rfloor$<br>
可以寫成<br>
`m = (l+r)/2;`<br>

但是數字過大時，l+r 會 <font color=#ff0000>溢位</font><br>
這時可以改寫成<br>
`m = l + (r-l)/2;`

<br>

### 左閉右開 [l, r)

包含 `l`：`nums[l]` 是有效的<br>
不包含 `r`：`nums[r]` 是無效的，不會被取到

`l == r` 時，[l, r) 區間是空的，所以跳出迴圈

```cpp
int my_lower_bound(vector<int>& nums, int target){

    // 左閉右開區間 [l, r)
    int l = 0;
    int r = nums.size();

    while(l < r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target) 
            l = m + 1; // 縮區間 -> [m+1, r)
        else  
            r = m; // 縮區間 -> [l, m)
    }

    return l; // 或 r 也可以
}
```

#### 誤解<br>
當 `nums[m] == target` 時，執行的是 `r = m;`<br>
但 r 是右開區間的邊界<br>
區間 [l, r) 更新成 [l, m)<br>
nums[m] 不就在區間外了嗎？<br>

所謂 **左閉右開** 指的是 <font color="#ff0000">搜索區間</font><br>
不是目標值存在的區間<br>
`nums[m] == target` 時 `r = m;`<br>
下一次就會在 [l, m) 中進行搜索

<br>

### 閉區間 [l, r]

包含 `l`：`nums[l]` 有效<br>
包含 `r`：`nums[r]` 有效

```cpp
int my_lower_bound(vector<int>& nums, int target){

    // 閉區間 [l, r]
    int l = 0, ;
    int r = nums.size()-1; 

    while(l <= r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target)
            l = m + 1;  // 縮區間 -> [m+1, r]
        else
            r = m - 1;  // 縮區間 -> [l, m-1]
    }

    return l;
}

```

<br>

### 開區間 (l, r)

不包含 `l`：`nums[l]` 不會被取到<br>
不包含 `r`：`nums[r]` 不會被取到

```cpp
int my_lower_bound(vector<int>& nums, int target){

    // 開區間 (l, r)
    int l = -1;
    int r = nums.size();

    while(l+1 < r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target)
            l = m; // 縮區間 -> (m, r)
        else
            r = m; // 縮區間 -> (r, m)
    }

    return 
}
```

#### 總結：閉 → m±1，開 → m

<br><br>

## 尋找其他目標

***

要尋找的目標不一定是 **第一個 ≥ 目標的數**<br>
也有可能是<br>
**第一個 > 目標的數**<br>
`...`

upper_bound：找到第一個 > 目標的值<br>
lower_bound：找到第一個 ≥ 目標的值

<br><br>

## 選擇什麼? 開區間? 閉區間?

***

個人喜歡用什麼就用什麼<br>
沒有規定，只要能 AC 都可以

不過我是喜歡用 **左閉右開**，符合 C++ 的習慣<br>
像是 sort 就是左閉右開<br>
`sort(v.begin(), v.end());`

<br><br>

## if 中的判斷條件

***

實際上寫題目不可能只有簡單的 `nums[m] < target`<br>
就能判斷要縮 `l` 或是縮 `r`

這時候可以寫成一個函數

```cpp
bool f(/* 傳入相關的值 */){
    bool result;

    // 處理判斷

    return result;
}
```

根據 f 的回傳值做判斷

```cpp
while(/* 區間不為空時執行 */){
    int m = l + (r-l)/2;
    if( f(/* 傳入相關的值 */) ) /* 縮區間 */
    else /* 縮區間 */
}
```

<br><br>

### 需要注意的東西

***

#### 處理找不到目標的情況

找不到目標時二分搜會返回 `nums.size()` (如果你用的是前一種模板)<br>
直接帶入 `nums[nums.size()]` 會發生錯誤

#### 縮區間判斷

判斷條件 `f()` 比較複雜時<br>
仔細判斷你寫的判斷是<br>
**upper_bound** 或是 **lower_bound**

<br><br>

## 題目<br>

***

### Leetcode

[704. 二分查找](https://leetcode.cn/problems/binary-search/description/)<br>
[35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/description/)<br>
[744. 寻找比目标字母大的最小字母](https://leetcode.cn/problems/find-smallest-letter-greater-than-target/description/)<br>
[1351. 统计有序矩阵中的负数](https://leetcode.cn/problems/count-negative-numbers-in-a-sorted-matrix/description/)<br>
[852. 山脉数组的峰顶索引](https://leetcode.cn/problems/peak-index-in-a-mountain-array/description/)

[153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/)
[33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/solutions/)

[436. 寻找右区间](https://leetcode.cn/problems/find-right-interval/description/)


### Zerojudge

[c575. APCS 2017-0304-4基地台](https://zerojudge.tw/ShowProblem?problemid=c575)
