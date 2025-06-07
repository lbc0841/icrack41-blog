---
title: "數學常用計算"
---

`#include <cmath>`

## 絕對值

`abs(x)`<br>
返回 x 的絕對值

## 次方

`pow(x, y)`<br>
返回 x 的 y 次方

## 平方根

`sqrt(x)`<br>
返回 x 的平方根

## 無條件進位

`ceil(x)`<br>
返回不小於 x 的最小整数<br>
(注意負數進位方式)

*e.g.*<br>
`ceil(2.3)` = 3<br>
`ceil(5.0)` = 5<br>
`ceil(-6.1)` = -6

## 無條件捨去

`floor(x)`<br>
返回不大於 x 的最大整數

`trunc(x)`<br>
返回去除小數部分的整数值

## 四捨五入

`round(x)`<br>
返回四捨五入到最接近的整數

`lround(x)`<br>
返回四捨五入到最接近的整數 (long)

`llround(x)`<br>
返回四捨五入到最接近的整數 (long long)
