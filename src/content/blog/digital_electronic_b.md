---
title: "數位電子乙級"
description: ""
date: 2025-09-27
tags: ["cpp"]
---

## 學科

[乙級學科題庫線上測驗](https://onlinetest3-1.onlinetest.tw/bestcontent.asp?examid=t11700)

<hr>

## 術科

### 🔹 測試資料

- [術科簡章](https://owinform.wdasec.gov.tw/owInform/DLowFile/117002B13.pdf?13)
- [術科資料 (Library & 燒錄檔)](https://owinform.wdasec.gov.tw/owInform/DLowFile/117002B14.7z?13)
- [KiCad](https://www.kicad.org/)
- [Quartus](https://www.intel.com.tw/content/www/tw/zh/software-kit/711791/intel-quartus-ii-web-edition-design-software-version-13-0sp1-for-windows.html)

### 🔸 試題一、四位數顯示

```verilog
module XX_CPLD(clk, scan, seg);
input clk;

output [3:0]scan;
reg [3:0]scan;

output [7:0]seg;
reg [7:0]seg;

reg [11:0]div;
always @(posedge clk) begin div <= div + 1'b1; end

always @(posedge div[11]) begin
    case(scan)
        4'b0001: begin scan <= 4'b0010; seg <= 8'b11111111; end
        4'b0010: begin scan <= 4'b0100; seg <= 8'b11111111; end
        4'b0100: begin scan <= 4'b1000; seg <= 8'b11111111; end
        default: begin scan <= 4'b0001; seg <= 8'b11111111; end
    endcase
end

endmodule
```

### 🔸 試題二、鍵盤輸入顯示

```verilog
module XX_CPLD(clk, scan, receive, seg);

input clk;
input [2:0]receive;
output [3:0]scan;
output [6:0]seg;

wire [2:0]receive;
reg [3:0]scan;
reg [6:0]seg;

always @(posedge clk) begin
    case(scan)
        4'b1110: begin
                scan <= 4'b1101;
                if     (receive == 3'b110) seg <= 7'b1111001;
                else if(receive == 3'b101) seg <= 7'b1110100;
                else if(receive == 3'b011) seg <= 7'b0110000;
        end
            
        4'b1101: begin
                scan <= 4'b1011;
                if     (receive == 3'b110) seg <= 7'b0011001;
                else if(receive == 3'b101) seg <= 7'b0010010;
                else if(receive == 3'b011) seg <= 7'b0000010;
        end
            
        4'b1011: begin
                scan <= 4'b0111;
                if     (receive == 3'b110) seg <= 7'b1011000;
                else if(receive == 3'b101) seg <= 7'b0000000;
                else if(receive == 3'b011) seg <= 7'b0011000;
        end
            
        default: begin
                scan <= 4'b1110;
                if     (receive == 3'b110) seg <= 7'b1111111;
                else if(receive == 3'b101) seg <= 7'b1000000;
                else if(receive == 3'b011) seg <= 7'b1111111;
        end
    endcase
end

endmodule
```
