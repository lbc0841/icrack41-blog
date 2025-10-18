---
title: "電機電子群-資電類-專一"
description: ""
date: 2025-10-17
tags: [""]
---

<br>

<details>
<summary>前言 (廢話)</summary>

本筆記目標為<br>
以最少的文字盡可能的呈現詳細的全部章節<br>
=> 內容使勁用圖表以減少描述

內容有誤 用 Discord/Thread 聯絡我
</details>

***

<details>
<summary>工廠安全 & 衛生</summary>

## 工廠安全 & 衛生

### 🔸 火災

#### 分類

<div class="max-w-[100dvw] overflow-auto">

| 類別 | 描述 |
|---|---|
| 甲類 (A) | 一般火災 |
| 乙類 (B) | 油類火災 |
| 丙類 (C) | 電器火災 |
| 丁類 (D) | 金屬火災 |

</div>

#### 滅火器

<div class="max-w-[100dvw] overflow-auto">

| | 水 | 泡沫 | 二氧化碳 | 乾粉 |
|---|:-:|:-:|:-:|:-:|
| 甲類 (A) | ✅ | ✅ | | ✅ |
| 乙類 (B) | | ✅ | ✅ | ✅ |
| 丙類 (C) | | | ✅ | ✅ |
| 丁類 (D) | | | | |

</div>

🔹 電器類火災不可使用泡沫滅火器，但如切斷電源，則視同 A、B 類火災

[資料來源](http://localhost:4321/icrack41-blog/blog/professional_subjects_1)

#### 滅火器步驟

<div class="max-w-[100dvw] overflow-auto">

| 步驟 | 描述 |
|---|---|
| 拉 | 旋轉並拉開安全插梢 |
| 瞄 | 瞄準火源底部 |
| 壓 | 壓下手壓柄 |
| 掃 | 左右掃射火源 |

</div>

### 🔸 燒傷

#### 急救步驟

<div class="max-w-[100dvw] overflow-auto">

| 步驟 | 描述 |
|---|---|
| 沖 | 冷水沖 20~30 min |
| 脫 | 拖去衣物 |
| 泡 | 浸泡冷水 10~30 min |
| 蓋 | 紗布覆蓋傷口 |
| 送 | 送醫 |

</div>

#### 灼傷分級

<div class="max-w-[100dvw] overflow-auto">

| 級數 | 受傷層 | 特徵 |
|---|---|---|
| 一度灼傷 | 表皮層 | 皮膚紅腫、疼痛 |
| 二度灼傷 | 真皮層 | 產生水泡 |
| 三度灼傷 | 皮下組織層 | 皮膚呈焦黑色 或 蒼白色 |
| 四度灼傷 | 肌肉和骨骼 | 焦黑 且 碳化(焦炭狀) |

</div>

### 🔸 心肺復甦 CPR

<div class="max-w-[100dvw] overflow-auto">

| 步驟 | 描述 |
|---|---|
| 叫 | 叫患者，檢查意識 |
| 叫 | 叫救護車 |
| C | 胸部按摩 (每分鐘 100 次，深度 5 cm) |
| A | 暢通呼吸道 |
| B | 人工呼吸 |
| D | 使用 AED |

</div>

</details>

***

## 電子學

### 🔸 電子學發展史

真空管 → 電晶體 → 積體電路 → 微電腦

### 🔸 積體電路分類

<div class="max-w-[100dvw] overflow-auto">

| | 邏輯閘數 | 元件數 |
|---|---|---|
| SSI | $<12$ | $<10^{2}$ |
| MSI | $12 \sim 10^{2}$ | $10^{2} \sim 10^{3}$ |
| LSI | $10^{2} \sim 10^{3}$ | $10^{3} \sim 10^{4}$ |
| VLSI | $10^{3} \sim 10^{4}$ | $10^{4} \sim 10^{5}$ |
| ULSI | $>10^{4}$ | $>10^{5}$ |

</div>

### 🔸 波形

🔹 所有波形皆可以用弦波組成 ([wiki-傅立葉轉換](https://zh.wikipedia.org/zh-tw/%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2))

#### 有效值、平均值

<div class="w-full">

<div class="max-w-[100dvw] overflow-auto">

| | $\underset{\color{Teal} \text{有效值}}{V_{rms}}$ | $\underset{\color{Teal} \text{平均值}}{V_{av}}$ | $\underset{\color{Teal} \text{波峰因數}}{CF}$ | $\underset{\color{Teal} \text{波形因數}}{FF}$ |
|---|:-:|:-:|:-:|:-:|
| 方波 | $V_{m}$ | $V_{m}$ | 1 | 1 |
| 正弦波 | $\underset{\color{Teal} 0.707 V_{m}}{\frac{1}{\sqrt{2}} V_{m}}$ | $\underset{\color{Teal} 0.636 V_{m}}{\frac{2}{\pi} V_{m}}$ | $\underset{\color{Teal} 1.414}{\sqrt{2}}$ | $\underset{\color{Teal} 1.11}{\frac{\pi}{2\sqrt{2}}}$ |
| 三角波 | $\underset{\color{Teal} 0.577 V_{m}}{\frac{1}{\sqrt{3}} V_{m}}$ | $\underset{\color{Teal} 0.5 V_{m}}{\frac{1}{2} V_{m}}$ | $\underset{\color{Teal} 1.732}{\sqrt{3}}$ | $\underset{\color{Teal} 1.154}{\frac{2}{\sqrt{3}}}$ |

</div>

$\underset{\color{Teal} Crest Factor}{CF} = \frac{V_{m}}{V_{rms}}$<br><br>
$\underset{\color{Teal} Form Factor}{FF} = \frac{V_{rms}}{V_{av}}$

#### 工作週期 D%

$\underset{\color{Teal} Duty Cycle}{D\%} = \frac{T_{H}}{T_{H}+T_{L}}$

### 🔸 原子

<div class="max-w-[100dvw] overflow-auto">

| | 導體 | 半導體 | 絕緣體 |
|:-:|:-:|:-:|:-:|
| $\underset{\color{Teal} \text{最外層軌道的電子}}{\text{價電子數}}$ | $<4$ | $4$ | $>4$ |
| $\text{能隙}$ | $0eV$ | $1eV$ | $9eV$ |
| $\text{電阻溫度係數}$ | $+$ | $-$ | $-$ |

</div>

$\underset{\color{Teal} \text{電子伏特(能量)}}{1 eV} = 1.6 \times 10^{-19} J$

$\text{軌道上電子數} = \underset{\color{Teal} \text{n:\:第n層軌道}}{2n^{2}}$

### 🔸 半導體

<div class="max-w-[100dvw] overflow-auto">

| | N 型半導體 | P 型半導體 |
|---|:-:|:-:|
| 參雜 | 5價 | 3價 |
| 元素 | $\underset{\color{Teal} P}{\text{磷}}\text{、}\underset{\color{Teal} As}{\text{砷}}\text{、}\underset{\color{Teal} Sb}{\text{銻}}$ | $\underset{\color{Teal} B}{\text{硼}}\text{、}\underset{\color{Teal} Al}{\text{鋁}}\text{、}\underset{\color{Teal} Ga}{\text{鎵}}\text{、}\underset{\color{Teal} In}{\text{銦}}$ |
| 別稱 | $\underset{\color{Teal} \text{給別人電子}}{\text{施體}}$ | $\underset{\color{Teal} \text{接受別人的電子}}{\text{受體}}$ |
| 離子 | $\underset{\color{Teal} \text{失去一個電子: 正}}{+}$ | $\underset{\color{Teal} \text{接受一個電子: 負}}{-}$ |
| 電性 | 電中性 | 電中性 |
| 多數載子 | 電子 | 電洞 |

</div>

本質半導體: $n_{i} = n = p$<br>
雜質半導體: $\underset{\color{Teal} \text{本質濃度}}{n_{i}^{2}} = \underset{\color{Teal} \text{電子濃度}}{n} \times \underset{\color{Teal} \text{電洞濃度}}{p}$

#### 載子移動方式

$\underset{\color{Teal} Diffusion}{\text{擴散}}$: 載子濃度不均引起<br>
$\underset{\color{Teal} Drift}{\;\; \text{飄移}}$: 外加電壓引起

<div class="max-w-[100dvw] overflow-auto">

| | 擴散電流 | 飄移電流 |
|---|:-:|:-:|
| 導體 | | ✅ |
| 半導體 | ✅ | ✅ |

</div>

### 🔸 二極體

#### 材質

<div class="max-w-[100dvw] overflow-auto">

| | $\underset{\color{Teal} Ge}{\text{鍺}}$ | $\underset{\color{Teal} Si}{\text{矽}}$ | $\underset{\color{Teal} GaAs}{\text{砷化鎵}}$ |
|---|:-:|:-:|:-:|
| $\text{能隙}$ | $0.66eV$ | $1.1eV$ | $1.42eV$ |
| $\underset{\color{Teal} V_{D}}{\text{障壁電壓}}$ | $0.2V \sim 0.3V$ | $0.6V \sim 0.7V$ | $1.1V \sim 1.2V$ |

</div>

#### 外加偏壓

順向偏壓⬆ => 障壁電壓⬇、空乏區寬度⬇

逆向偏壓⬆ => 障壁電壓⬆、空乏區寬度⬆

<div class="w-0">

$$
\begin{aligned}
\underset{\color{Teal} \text{順向導通電流}}{I_{d}} &= \underset{\color{Teal} \text{逆向飽和電流(漏電流)}}{I_{s}} \times (e^{\frac{V_{D}}{\eta V_{T}}}-1) \\
&= \; \underset{\color{Teal} \text{當} \;  V_{D}>>\eta V_{T}}{I_{s} \times e^{\frac{V_{D}}{\eta V_{T}}}}
\end{aligned}
$$

</div>

#### 參雜濃度

參雜濃度⬆ => 障壁電壓⬆、空乏區寬度⬇

#### 溫度效應

溫度每上升 1℃，$\underset{\color{Teal} \text{切入電壓}}{V_{t}}$ 下降 $1mV \sim 2.5mV$<br>
溫度每上升 10℃，$\underset{\color{Teal} \text{漏電流}}{I_{s}}$ 增加 1 倍

#### 電阻效應

$\underset{\color{Teal} \text{靜態電阻} \; R_{DC}}{R_{D}} = \frac{V_{D}}{I_{D}}$<br>
$\underset{\color{Teal} \text{動態電阻} \; r_{ac}}{r_{d}} = \frac{\eta V_{T}}{I_{D}}$<br>

$\;\; K = ^\circ\text{C} + 273$<br>
$\underset{\color{Teal} \text{熱電壓}}{V_{T}} = \frac{K}{11600}$<br>

#### 電容效應

<div class="max-w-[100dvw] overflow-auto">

| 偏壓 | 電容 |
|---|---|
| 順偏 | $I_{D} \uparrow \;\; \Rightarrow \underset{\color{Teal} \text{擴散電容}}{C_{D} \uparrow}$ |
| 逆偏 | $\text{逆偏壓} \uparrow \;\; \Rightarrow \underset{\color{Teal} \text{過度電容}}{C_{T} \downarrow}$ |

</div>

### 🔸 稽納二極體

<div class="max-w-[100dvw] overflow-auto">

| 偏壓 | 稽納二極體 |
|---|---|
| 順偏 | $\text{視同一般二極體}$ |
| 逆偏 | $\text{逆偏壓} > \underset{\color{Teal} \text{稽納電壓}}{V_{Z}} \Rightarrow \underset{\color{Teal} \text{兩端電壓維持在}V_{Z}}{\text{稽納二極體崩潰}}$ |

</div>

### 🔸 整流電路

<div class="max-w-[100dvw] overflow-auto">

| | 半波整流 | 中間抽頭 | 橋式整流 |
|---|---|---|---|
| 輸出波形 | - | - | - |
| 頻率 | $f$ | $2f$ | $2f$ |
| $PIV$ | $V_{m}$ | $2V_{m}$ | $V_{m}$ |
| $V_{dc}$ | $0.318V_{m}$ | $0.636V_{m}$ | $0.636V_{m}$ |
| $V_{rms}$ | $0.5V_{m}$ | $0.707V_{m}$ | $0.707V_{m}$ |
| $V_{r(rms)}$ | $0.385V_{m}$ | $0.308V_{m}$ | $0.308V_{m}$ |
| $r\%$ | $121\%$ | $48.4\%$ | $48.4\%$ |

</div>

$\underset{\color{Teal} \text{漣波有效值}}{V_{r(rms)}} = \sqrt{V_{rms}^{2} - V_{dc}^{2}}$

$\underset{\color{Teal} \text{漣波因數}}{r\%} = \frac{V_{r(rms)}}{V_{dc}}$

### 🔸 濾波電路

<div class="max-w-[100dvw] overflow-auto">

| | 半波整流 | 中間抽頭 | 橋式整流 |
|---|:-:|:-:|:-:|
| 輸出波形 | - | - | - |
| $PIV$ | $2V_{s(m)}$ | $2V_{s(m)}$ | $V_{s(m)}$ |
| $V_{r(p-p)}$ | $\frac{V_{o(m)}}{R_{L} \times C \times f_{o}}$ | $\frac{V_{o(m)}}{R_{L} \times C \times f_{o}}$ | $\frac{V_{o(m)}}{R_{L} \times C \times f_{o}}$ |
| $V_{r(rms)}$ | $\frac{V_{o(m)}}{2 \sqrt{3} \times R_{L} \times C \times f_{o}}$ | $\frac{V_{o(m)}}{4 \sqrt{3} \times R_{L} \times C \times f_{o}}$ | $\frac{V_{o(m)}}{4 \sqrt{3} \times R_{L} \times C \times f_{o}}$ |

</div>

### 🔸 BJT

<div class="max-w-[100dvw] overflow-auto">

| 極性 | 描述 |
|---|---|
| E | 發射載子 |
| C | 控制載子流 |
| B | 收集載子 |

</div>

<div class="max-w-[100dvw] overflow-auto">

| 模式 | 偏壓 | 功能 | 電流/電壓 |
|---|---|---|---|
| 順向主動區 | - | 放大器 | $I_{C} = \beta I_{B}$ |
| 逆向主動區 | - | 邏輯交換電路 | |
| 飽和區 | - | 開關-ON | $I_{C} \leq \beta I_{B}, \; V_{CE} = 0.2V$ |
| 截止區 | - | 開關-OFF | $I_{C} = I_{B} = 0$ |

</div>

#### 組態腳位

<div class="max-w-[100dvw] overflow-auto">

| 組態 | 共接腳 | 輸入腳 | 輸出腳 | 電流增益 $\frac{I_{o}}{I_{i}}$ |
|---|:-:|:-:|:-:|:-:|
| CE | E | B | C | $\beta$ |
| CC | C | B | E | $\gamma$ |
| CB | B | E | C | $\alpha$ |

</div>

🔹 C 極不當輸入端、B 極不當輸出端

#### 組態比較

<div class="max-w-[100dvw] overflow-auto">

| | CE | CC | CB |
|---|:-:|:-:|:-:|
| 別稱 | | $\underset{\color{Teal} V_{o} \approx V_{i}}{\text{電壓緩衝器}}$ | $\underset{\color{Teal} I_{o} \approx I_{i}}{\text{電流緩衝器}}$ |
| | | | |
| $R_{i}$ | $\text{中}$ | $\text{大}$ | $\text{小}$ |
| $R_{o}$ | $\text{中}$ | $\text{小}$ | $\text{大}$ |
| | | | |
| $A_{v}$ | $\underset{\color{Teal} A_{v} > 1}{\text{中}}$ | $\underset{\color{Teal} A_{v} \approx 1}{\text{小}}$ | $\underset{\color{Teal} A_{v} > 1}{\text{大}}$ |
| $A_{i}$ | $\underset{\color{Teal} A_{i} > 1}{\text{中}}$ | $\underset{\color{Teal} A_{i} > 1}{\text{大}}$ | $\underset{\color{Teal} A_{i} \approx 1}{\text{小}}$ |
| $A_{p}$ | $\underset{\color{Teal} A_{v} > 1, \; A_{i} > 1}{\text{大}}$ | $\text{小}$ | $\text{中}$ |
| | | | |
| 頻寬 | $\text{小}$ | $\text{中}$ | $\text{大}$ |
| 相位 | 反 | 同 | 同 |

</div>

#### $R_{i}, \; R_{o}$

<div class="max-w-[100dvw] overflow-auto">

| 放大器 | $R_{i}$ | $R_{o}$ |
|---|---|---|
| 電壓放大器 | 越大越好 | 越小越好 |
| 電流放大器 | 越小越好 | 越大越好 |

</div>

#### $\alpha , \; \beta$

<div class="max-w-[100dvw] overflow-auto">

| 增益 | 公式 | 範圍 |
|---|---|---|
| $\alpha$ | $\alpha = \frac{I_{C}}{I_{E}} = \frac{\beta}{1 + \beta}$ | $\alpha \leq 1$ |
| $\beta$ | $\beta = \frac{I_{C}}{I_{B}} = \frac{\alpha}{1 - \alpha}$ | |
| $\gamma$ | $\gamma  = \beta + 1$ | |

</div>

$I_{E} = I_{C} + I_{B}$

#### 增益

<div class="max-w-[100dvw] overflow-auto">

| 增益 | 公式 |
|---|---|
| 電壓增益 | $A_{v} = \frac{V_{o}}{V_{i}}$ |
| 電流增益 | $A_{i} = \frac{I_{o}}{I_{i}} = A_{v} \times \frac{R_{i}}{R_{o}}$ |
| 功率增益 | $A_{p} = A_{v} \times A_{i}$ |

</div>






***

## 基本電學

### 🔸 色碼電阻

<div class="max-w-[100dvw] overflow-auto">

| 顏色 | 數值 | 倍數 | 誤差 |
|---|---|---|---|
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-black"></div> 黑 | $0$ | $10^{0}$ | |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-amber-900"></div> 棕 | $1$ | $10^{1}$ | $\pm 1 \%$ |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-red-600"></div> 紅 | $2$ | $10^{2}$ | $\pm 2 \%$ |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-orange-600"></div> 橙 | $3$ | $10^{3}$ | |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-yellow-400"></div> 黃 | $4$ | $10^{4}$ | |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-green-500"></div> 綠 | $5$ | $10^{5}$ | $\pm 0.5 \%$ |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-blue-600"></div> 藍 | $6$ | $10^{6}$ | $\pm 0.25 \%$ |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-purple-600"></div> 紫 | $7$ | $10^{7}$ | $\pm 0.1 \%$ |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-gray-500"></div> 灰 | $8$ | $10^{8}$ | $\pm 0.05 \%$ |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-white"></div> 白 | $9$ | $10^{9}$ | |
| | | | |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-yellow-200"></div> 金 | | $10^{-1}$ | $\pm 5 \%$ |
| <div class="inline-block h-3 w-3 rounded-full border border-white bg-gray-300"></div> 銀 | | $10^{-2}$ | $\pm 10 \%$ |

</div>
