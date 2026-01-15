---
title: "數位電子乙級"
description: ""
date: 2025-11-10
tags: ["cpp"]
---

## 學科

- ~~[乙級學科題庫線上測驗](https://onlinetest3-1.onlinetest.tw/bestcontent.asp?examid=t11700)~~ (有未修復的題目錯誤)
- [手機 技能檢定題庫 APP](https://play.google.com/store/apps/details?id=com.SkillExamination&hl=zh_TW)

<hr>

## 術科

### 🔹 測試資料

- [術科簡章](https://owinform.wdasec.gov.tw/owInform/DLowFile/117002B13.pdf?13)
- [術科資料 (Library & 燒錄檔)](https://owinform.wdasec.gov.tw/owInform/DLowFile/117002B14.7z?13)
- [KiCad](https://www.kicad.org/)
- [Quartus](https://www.intel.com.tw/content/www/tw/zh/software-kit/711791/intel-quartus-ii-web-edition-design-software-version-13-0sp1-for-windows.html)

### 🔹 題目

<font color="#ff7000">未使用的規定接角 每隻扣10分</font>

![qustion](../../../src/assets/notes/digital_electronic/q_pin.png)

![qustion](../../../src/assets/notes/digital_electronic/q_seg.png)

### 🔹 規範

#### KiCad 圖框

<font color="#ff7000">未完成每項扣10分</font>

Title: `[術科測試編號(8碼)]-[崗位編號]`<br>
Date: `測試日期`

#### 資料夾

<font color="#ff7000">未完成每項扣10分</font>

要求在 `D:\` 放置兩資料夾

- `[崗位編號]_CPLD` : KiCad 專案
- `[崗位編號]_Layout` : Quartus 專案

```text
(建議)
(假設工作崗位為 01)

D:
├── 01_CPLD
│   └── cpld      : Quartus 專案
└── 01_Layout
    ├── layout    : KiCad 專案
    ├── sch_f.pdf : 正面佈線圖
    └── sch_b.pdf : 背面佈線圖
```

由於專案名稱不能以 數字 開頭<br>
所以完成後再將整個專案複製進資料夾

### 🔹 流程

|  | 內容 | 描述 | 建議花費時間 |
|---|---|---|:-:|
| 一 | 檢查材料 |  | |
| 二 | KiCad | 1. 原理圖<br>2. 佈線圖<br>3. 列印 | < 1 hr |
| 三 | 焊接 | 1. 子板<br>2. 母板 | < 2.5 hr |
| 四 | Quartus | 1. verilog<br>2. 腳位配置<br>3. 燒入 | < 0.5 hr |
| 五 | 評分 | | |

### 🔸 試題一、四位數顯示

#### Layout

b f a e d c<br>
g dp

![schematic](../../../src/assets/notes/digital_electronic/schematic_q1.png)

![layout](../../../src/assets/notes/digital_electronic/layout_q1.png)

#### CPLD

共陰極七段顯示:<br>
對於 `output reg[6:0] seg`<br>

- 1 = ON
- 0 = OFF

```verilog
module cpld(
    input clk,
    output reg[3:0] scan
    output reg[7:0] seg
);

reg[11:0] div;
always @(posedge clk) begin
    div <= div + 1'b1;
end

always @(posedge div[11]) begin
    case(scan)
        4'b0001: begin scan <= 4'b0010; seg <= 8'b11111111; end // 8
        4'b0010: begin scan <= 4'b0100; seg <= 8'b11111111; end // 8
        4'b0100: begin scan <= 4'b1000; seg <= 8'b11111111; end // 8
        default: begin scan <= 4'b0001; seg <= 8'b11111111; end // 8
    endcase
end

endmodule
```

### 🔸 試題二、鍵盤輸入顯示

#### Layout

b a f g e d c<br>

![schematic](../../../src/assets/notes/digital_electronic/schematic_q2.png)

![layout](../../../src/assets/notes/digital_electronic/layout_q2.png)

#### CPLD

共陽極七段顯示:<br>
對於 `output reg[6:0] seg`<br>

- 0 = ON
- 1 = OFF

```verilog
module cpld(
    input clk,
    input [2:0] receive, 
    output reg[3:0] scan,
    output reg[6:0] seg
);

always @(posedge clk) begin
    case(scan)
        4'b1110: begin
                scan <= 4'b1101;
                if     (receive == 3'b110) seg <= 7'b1001111; // 1
                else if(receive == 3'b101) seg <= 7'b0010010; // 2
                else if(receive == 3'b011) seg <= 7'b0000110; // 3
        end
            
        4'b1101: begin
                scan <= 4'b1011;
                if     (receive == 3'b110) seg <= 7'b1001100; // 4
                else if(receive == 3'b101) seg <= 7'b0100100; // 5
                else if(receive == 3'b011) seg <= 7'b0100000; // 6
        end
            
        4'b1011: begin
                scan <= 4'b0111;
                if     (receive == 3'b110) seg <= 7'b0001101; // 7
                else if(receive == 3'b101) seg <= 7'b0000000; // 8
                else if(receive == 3'b011) seg <= 7'b0001100; // 9
        end
            
        default: begin
                scan <= 4'b1110;
                if     (receive == 3'b110) seg <= 7'b1111110; // -
                else if(receive == 3'b101) seg <= 7'b0000001; // 0
                else if(receive == 3'b011) seg <= 7'b1111110; // -
        end
    endcase
end

endmodule
```
