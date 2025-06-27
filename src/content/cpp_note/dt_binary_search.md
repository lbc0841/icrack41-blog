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

### 超通用模板

```cpp
while(/* 區間不為空時執行 */){
    int m = /* 計算中點 */;
    if(/* 判斷條件 */) /* 縮區間 */
    else /* 縮區間 */
}
```

<br>

### 區間模板

按區間分成不同寫法(模板)<br>

- 左閉右開 [l, r)
- 閉區間 [l, r]
- 開區間 (l, r)

<details>
<summary>惡補數學 (不至於把區間忘了吧)</summary>

閉區間 [l, r] 為 $\left\{ x \in \mathbb{R}, l \leq x \leq r \right\}$<br>
開區間 (l, r) 為 $\left\{ x \in \mathbb{R}, l < x < r \right\}$<br>
左閉右開 [l, r) 為 $\left\{ x \in \mathbb{R}, l \leq x < r \right\}$<br>
左開右閉 (l, r] 為 $\left\{ x \in \mathbb{R}, l < x \leq r \right\}$<br>
<br>
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

#### 左閉右開 [l, r)

```cpp
// 包含 l (nums[l] 有效)
// 不包含 r (nums[r] 無效，不會被取到)
// l==r 時，[l, r) 區間是空的，跳出迴圈

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

    return l<nums.size() ? l : -1; // 或 r 也可以

    /*
    如果不要 lower_bound
    只要找 == target 的值(的下標)

    if(l >= nums.size() || nums[l] != target)
        return -1;
    else
        return l;
    */
}
```

#### 閉區間 [l, r]

```cpp
// 包含 l (nums[l] 有效)
// 包含 r (nums[r] 有效)
// l>r 時，[l, r] 區間是空的，跳出迴圈

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

    return l<nums.size() ? l : -1;

    /*
    如果不要 lower_bound
    只要找 == target 的值(的下標)

    if(l >= nums.size() || nums[l] != target)
        return -1;
    else
        return l;
    */
}
```

#### 開區間 (l, r)

```cpp
// 包含 l (nums[l] 無效)
// 包含 r (nums[r] 無效)
// l+1==r 時，(l, r) 區間是空的，跳出迴圈

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

    return l+1<nums.size() ? l+1 : -1; // 注意 +1

    /*
    如果不要 lower_bound
    只要找 == target 的值(的下標)

    if(l+1 >= nums.size() || nums[l+1] != target)
        return -1;
    else
        return l+1;
    */

    /*
    l 要 +1 的原因是當 nums[m] == target 時
    縮的是右區間
    但結束時 l 在 r 左邊 1 格

    (也可以把 if 的條件改成 nums[m] <= target，避免最後 +1)
    */
}
```

<details>
<summary>可能有的誤解 (以左閉右開舉例)</summary>

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

◇ 閉 → m±1，開 → m

<br>

### 提前縮右區間

提前縮右區間一格<br>
避免之後用 `nums[l]`<br>
還要判斷 `l` 有沒有 < `nums.size()`<br>

這種方法很方便<br>
尤其是在要查 `nums[l]` 值時

#### 左閉右開 [l, r)

```cpp
int my_lower_bound(vector<int>& nums, int target){

    // 左閉右開區間 [l, r)
    int l = 0;
    int r = nums.size()-1; // 提前縮一格

    while(l < r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] < target) 
            l = m + 1; // 縮區間 -> [m+1, r)
        else  
            r = m; // 縮區間 -> [l, m)
    }

    return nums[l]>=target ? l : -1; // 判斷返回值

    /*
    如果不要 lower_bound
    只要找 == target 的值(的下標)

    return nums[l]==target ? l : -1;
    */
}
```

#### 閉區間 [l, r]

```cpp
// 略...
```

#### 開區間 (l, r)

```cpp
// 略...
```

<br><br>

## 尋找其他目標

***

要尋找的目標不一定是 **第一個 ≥ 目標的數**<br>
也有可能是其他

<br>

### 第一個 > 目標的數 (upper_bound)<br>

```cpp
int my_upper_bound(vector<int>& nums, int target){

    // 左閉右開區間 [l, r)
    int l = 0;
    int r = nums.size()-1; // 提前縮一格

    while(l < r){ // 區間不為空
        int m = l + (r-l)/2;

        if(nums[m] <= target) // nums[m] == target 時也縮左區間
            l = m + 1; // 縮區間 -> [m+1, r)
        else  
            r = m; // 縮區間 -> [l, m)
    }

    return nums[l]>target ? l : -1; // 判斷返回值
}
```

<br>

### 第一個 < 目標的數

```cpp
// 左閉右開後 l-1
// 因為先前找到的是 第一個≥target的數 的下標
// 所以 nums[l-1] 一定是 第一個<target的數
int my_binary_search(vector<int>& nums, int target){

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

    return l-1>=0 ? l-1 : -1; // 判斷返回值
}
```

```cpp
// 也可以用開區間 (l, r)
// 直接返回 l
int my_binary_search(vector<int>& nums, int target){

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

    return l;
}
```

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

## 題目

***

### Leetcode

[704. 二分查找](https://leetcode.cn/problems/binary-search/description/)<br>
[35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/description/)<br>
[744. 寻找比目标字母大的最小字母](https://leetcode.cn/problems/find-smallest-letter-greater-than-target/description/)<br>
[1351. 统计有序矩阵中的负数](https://leetcode.cn/problems/count-negative-numbers-in-a-sorted-matrix/description/)<br>
[852. 山脉数组的峰顶索引](https://leetcode.cn/problems/peak-index-in-a-mountain-array/description/)

[153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/)<br>
[33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/solutions/)

[436. 寻找右区间](https://leetcode.cn/problems/find-right-interval/description/)

<br>

### Zerojudge

[c575. APCS 2017-0304-4基地台](https://zerojudge.tw/ShowProblem?problemid=c575)
