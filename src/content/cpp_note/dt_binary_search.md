---
title: "二分搜 Binary Search"
chapter: 0
---

二分搜索是在有序序列中透過每次折半縮小搜尋範圍<br>
高效(對數時間複雜度)找到目標值

<br><br>

## 時間複雜度

***

暴力遍歷 $O(N)$<br>
二分搜索 $O(logN)$<br>

*e.g.*<br>
對於 $10^{6}$ 筆資料的陣列<br>
要找到目標值<br>
暴力(最多)需要比較 $\color{Red} 10^{6}$ 次<br>
而二分搜索則是 $\left \lceil log_{2}10^{6} \right \rceil = \color{Red} 20$ 次

<br><br>

## 代碼實現

***

<br><br>

## 模版

***

### 預備知識

<details>
<summary>惡補數學 (不至於把區間忘了吧)</summary>

(實心表示包含，空心表示不包含)

- 閉區間 [l, r] 為 $\left\{ x \in \mathbb{R}, l \leq x \leq r \right\}$<br>
-----●————●------>

- 開區間 (l, r) 為 $\left\{ x \in \mathbb{R}, l < x < r \right\}$<br>
-----○————○------>

- 左閉右開 [l, r) 為 $\left\{ x \in \mathbb{R}, l \leq x < r \right\}$<br>
-----●————○------>

- 左開右閉 (l, r] 為 $\left\{ x \in \mathbb{R}, l < x \leq r \right\}$<br>
-----○————●------>

程式碼中因為索引只能是整數<br>
所以 $x \in \mathbb{Z}$
</details>

<details>
<summary>代碼解釋</summary>

以下二分搜模板以 lower_bound 示範<br>
(lower_bound：找到第一個 ≥ 目標的數)

- `l` 表示 left<br>
- `r` 表示 right<br>
- `m` 表示 middle<br>
- `nums` 為一個由小到大排好序的 vector<br>
- `target` 為要從中尋找的值

找不到值時會 `return -1`
</details>

<br>

### 超通用模板

```cpp
// 幾乎全部的二分搜都是按這個邏輯寫的
while(/* 區間不為空時執行 */){
    int m = /* 計算中點 */;
    if(/* 判斷條件 */) /* 縮區間 */
    else /* 縮區間 */
}
```

<br>

### 普通模板 (最常見的)

#### 普通模板 - 左閉右開 [l, r)

```cpp
// 包含 l, 不包含 r
// l==r 時，[l, r) 區間是空的，跳出迴圈
int my_lower_bound(vector<int>& nums, int target){

    // 左閉右開區間 [l, r)
    int l = 0, r = nums.size();

    while(l < r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target) l = m + 1; // 縮區間 -> [m+1, r)
        else r = m; // 縮區間 -> [l, m)
    }

    return l<nums.size() ? l : -1; // 或 r 也可以
}
```

#### 普通模板 - 閉區間 [l, r]

```cpp
// 包含 l, 包含 r
// l>r 時，[l, r] 區間是空的，跳出迴圈
int my_lower_bound(vector<int>& nums, int target){

    // 閉區間 [l, r]
    int l = 0, r = nums.size()-1;

    while(l <= r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target) l = m + 1;  // 縮區間 -> [m+1, r]
        else r = m - 1;  // 縮區間 -> [l, m-1]
    }

    return l<nums.size() ? l : -1;
}
```

#### 普通模板 - 開區間 (l, r)

```cpp
// 包含 l, 包含 r
// l+1==r 時，(l, r) 區間是空的，跳出迴圈
int my_lower_bound(vector<int>& nums, int target){

    // 開區間 (l, r)
    int l = -1, r = nums.size();

    while(l+1 < r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target) l = m; // 縮區間 -> (m, r)
        else r = m; // 縮區間 -> (r, m)
    }

    return l+1<nums.size() ? l+1 : -1; // 注意 l+1 (或者直接用 r)
}
/*
l 要 +1 的原因是
因為最後迴圈結束時 l+1 == r
l 是最後一個使 nums[l] < target 成立的 index (或 -1)
r 是第一個使 nums[r] >= target 成立的 index (也就是我們要的答案)
*/
```

<br>

### 提前縮右區間

<details>
<summary>解釋</summary>

提前縮右區間一格<br>
<font color="#ff0000">不搜索最後一個值</font><br>
之後再判斷 nums[l] 符不符合目標條件<br>
(`l` 可能是 `nums.size()-1`)

這麼做可以避免迴圈結束時 `l == nums.size()`<br>
可以直接 `nums[l]`
</details>

#### 提前縮右區間 - 左閉右開 [l, r)

```cpp
int my_lower_bound(vector<int>& nums, int target){

    int l = 0, r = nums.size()-1; // r 提前縮一格

    while(l < r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target) l = m + 1; // 縮區間 -> [m+1, r)
        else r = m; // 縮區間 -> [l, m)
    }

    return nums[l]>=target ? l : -1; // 判斷返回值
}
```

#### 提前縮右區間 - 閉區間 [l, r]

```cpp
int my_lower_bound(vector<int>& nums, int target){

    int l = 0, r = nums.size()-2; // r 提前縮一格

    while(l <= r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target) l = m + 1;  // 縮區間 -> [m+1, r]
        else r = m - 1;  // 縮區間 -> [l, m-1]
    }

    return nums[l]>=target ? l : -1;
}
```

#### 提前縮右區間 - 開區間 (l, r)

```cpp
int my_lower_bound(vector<int>& nums, int target){

    int l = -1, r = nums.size()-1; // r 提前縮一格

    while(l+1 < r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target) l = m; // 縮區間 -> (m, r)
        else r = m; // 縮區間 -> (r, m)
    }

    return nums[l+1]>=target ? l+1 : -1;
}
```

<br><br>

## 尋找其他目標

***

要尋找的目標不一定是 **第一個 ≥ 目標的數**<br>
也有可能是其他，比如

<details>
<summary>第一個 < 目標的數</summary>

```cpp
// 左閉右開後 l-1
// 因為先前找到的是 第一個≥target的數 的下標
// 所以 nums[l-1] 一定是 第一個<target的數
int my_binary_search(vector<int>& nums, int target){
    int l = 0, r = nums.size();

    while(l < r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target) l = m + 1; // 縮區間 -> [m+1, r)
        else r = m; // 縮區間 -> [l, m)
    }

    return l-1>=0 ? l-1 : -1; // 判斷返回值
}
```

```cpp
// 用開區間 (l, r)
// 直接返回 l
int my_binary_search(vector<int>& nums, int target){
    int l = -1, r = nums.size();

    while(l+1 < r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target) l = m; // 縮區間 -> (m, r)
        else r = m; // 縮區間 -> (r, m)
    }

    return l;
}
```

</details>

另外還有

- 找 第一個 > 目標的數 (upper_bound)
- 找 第$n$個 > 目標的數...

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

## 需要注意的東西

***

<details>
<summary>找不到目標時</summary>

注意處理找不到目標的情況<br>
小心被卡 WA
</details>

<details>
<summary>縮區間判斷</summary>

判斷條件 `f()` 比較複雜時<br>
仔細判斷你寫的是<br>
**upper_bound** 還是 **lower_bound**<br>
(又或者其他東西)
</details>

<details>
<summary>加法溢位問題</summary>

`l`, `r` 過大時，運算過程會 <font color=#ff0000>Overflow</font>

```cpp
// 解決方法
int m = l + (r-l)/2;
```

</details>

<br><br>

## 總結

***

區間不為空 → 跑迴圈<br>
閉 → m±1<br>
開 → m

### 二分搜核心

總結來說<br>
二分搜的核心在於<br>
<font color="#ff0000">如何每次淘汰一半的資料</font><br>
我們需要基於這個思想找淘汰策略<br>
這就是二分搜的關鍵

<details>
<summary>二分搜 4 步驟</summary>

### 確定區間

確定要在甚麼區間搜索<br>
<font color="#ff0000">注意 while 什麼時候結束</font><br>
(注意區間甚麼時候是空的)

<br>

### 條件判斷

什麼時後縮左區間<br>
什麼時後縮右區間<br>
尤其注意 `nums[m] == target` 時

<br>

### 縮區間

<font color="#ff0000">注意縮區間時</font><br>
`l = m;` 還是 `l = m+1;`<br>
`r = m;` 還是 `r = m-1;`<br>

<br>

### 處理結果

找不到目標值時怎麼處理<br>
找到之後要做什麼
</details>

<details>
<summary>各區間結束時 r, l 位置</summary>

假設 target = 11

- 左閉右開 [l, r)<br>
l == r 時，[l, r) 區間是空的

<div style="overflow-x: auto;">

|   |   |   |   |   |   |l, r|    |    |    |
|---|---|---|---|---|---| ---| ---| ---| ---|
| 2 | 4 | 5 | 6 | 8 | 9 | 11 | 12 | 14 | 17 |

</div>

- 閉區間 [l, r]<br>
l-1 == r 時，[l, r] 區間是空的

<div style="overflow-x: auto;">

|   |   |   |   |   | r | l  |    |    |    |
|---|---|---|---|---|---| ---| ---| ---| ---|
| 2 | 4 | 5 | 6 | 8 | 9 | 11 | 12 | 14 | 17 |

</div>

- 開區間 (l, r)<br>
l+1 == r 時，(l, r) 區間是空的

<div style="overflow-x: auto;">

|   |   |   |   |   | l | r  |    |    |    |
|---|---|---|---|---|---| ---| ---| ---| ---|
| 2 | 4 | 5 | 6 | 8 | 9 | 11 | 12 | 14 | 17 |

</div>

</details>

<details>
<summary>可能的誤解 (以左閉右開舉例)</summary>

當 `nums[m] == target` 時，執行的是 `r = m;`<br>
但 r 是右<font color="#ff0000">開區間</font>的邊界<br>
區間 [l, r) 更新成 [l, m)<br>
要找的目標值 nums[m]<br>
不就在區間外了嗎？

所謂「左閉右開」指的是 <font color="#ff0000">搜索區間</font><br>
不是目標值存在的區間<br>
`nums[m] == target` 時 `r = m;`<br>
下一次就會在 [l, m) 中進行搜索
</details>

<br><br>

## Debug

***

<br><br>

## 題解

***

<details>
<summary>153. 寻找旋转排序数组中的最小值</summary>

### 題目簡述

給一個變換後的升序數組<br>
變換：將前 $n$ 個元素放到數組後

*e.g.*<br>
[1,3,4,5,7,9,10] 將前 4 個元素放到數組後<br>
[7,9,10, 1,3,4,5]

求其中的最小元素<br>
[Leetcode](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/)<br>

<br>

### 各種代碼

```cpp
// 左閉右開
// 提前縮右區間
// 以 nums[r] 判斷怎麼縮區間
int findMin(vector<int>& nums) {
    int l=0, r=nums.size()-1;
    while(l < r){
        int m = l+(r-l)/2;
        if(nums[m]<nums[r]) r = m;
        else l = m+1;
    }

    return nums[l];
}

/*

*/
```

```cpp
// 左閉右開
// 提前縮右區間
// 以 nums[r] 判斷怎麼縮區間
int findMin(vector<int>& nums) {
    int l=0, r=nums.size()-1;
    while(l < r){
        int m = l+(r-l)/2;
        if(nums[m]<nums[r]) r = m;
        else l = m+1;
    }

    return nums[l];
}
```

```cpp
int findMin(vector<int>& nums) {

}
```

</details>

<br><br>

## 題目

***

### 基礎題

#### 基礎題

`Leetcode` [704. 二分查找](https://leetcode.cn/problems/binary-search/description/)<br>
`Leetcode` [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/description/)<br>
`Leetcode` [744. 寻找比目标字母大的最小字母](https://leetcode.cn/problems/find-smallest-letter-greater-than-target/description/)<br>
`Leetcode` [1351. 统计有序矩阵中的负数](https://leetcode.cn/problems/count-negative-numbers-in-a-sorted-matrix/description/)<br>

<br>

### 變化題

- 排好序的序列，但不完全排好<br>
- 二維陣列

`Leetcode` [153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/)<br>
`Leetcode` [33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/solutions/)<br>
`Leetcode` [852. 山脉数组的峰顶索引](https://leetcode.cn/problems/peak-index-in-a-mountain-array/description/)

`Leetcode` [436. 寻找右区间](https://leetcode.cn/problems/find-right-interval/description/)

<br>

### 進階題

`Zerojudge` [c575. APCS 2017-0304-4基地台](https://zerojudge.tw/ShowProblem?problemid=c575)
