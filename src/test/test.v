module test0 (   input       d,
              input       clk,
              input       rstn,
              output reg  q);

module abcd_test2
  # (parameter N = 4)
 
  (  input   clk,
  input   rstn,
  output reg [N-1:0] out);

  module test1 #
(
    parameter RYS_EG_TRPE = {S_COUNT{2'd2}},
    parameter RYM_EG_TBPE = {M_COUNT{2'd0}},
    parameter TM_REG_AYPE = {M_COUNT{2'd1}},
    parameter YM_EG_TRPE = {M_COUNT{2'd0}}
)
(
    input  wire                             clk,
    input  wire                             rst,
    input  wire [S_COUNT*S_ID_WIDTH-1:0]    s_axi_awid,
    input  wire [S_COUNT*ADDR_WIDTH-1:0]    s_axi_awaddr,
    input  wire [S_COUNT*8-1:0]             s_axi_awlen,
    input  wire [S_COUNT*3-1:0]             s_axi_awsize,
    input  wire [S_COUNT*2-1:0]             s_axi_awburst,
    output wire [S_COUNT*S_ID_WIDTH-1:0]    s_axi_rid,
    output wire [S_COUNT*DATA_WIDTH-1:0]    s_axi_rdata,
    output wire [S_COUNT*2-1:0]             s_axi_rresp,
    output wire [S_COUNT-1:0]               s_axi_rlast,
    output wire [S_COUNT*RUSER_WIDTH-1:0]   s_axi_ruser,
    output wire [S_COUNT-1:0]               s_axi_rvalid,
    input  wire [S_COUNT-1:0]               s_axi_rready,
);