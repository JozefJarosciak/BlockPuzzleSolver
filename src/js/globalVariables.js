//letters
var A = new Array(0);
var B = new Array(1);
var C = new Array(1);
var D = new Array(3);
var I = new Array(1);
var L = new Array(7);
var O = new Array(0);
var T = new Array(3);
var S = new Array(3);
var U = new Array(3);
var X = new Array(0);

//letters

// A
A[0] = [
    [1]
];

// B
B[0] = [
    [1, 1]
];

B[1] = [
    [1],
    [1]
];

// C
C[0] = [
    [1, 1, 1]
];

C[1] = [
    [1],
    [1],
    [1]
];

// D
D[0] = [
    [1, 1],
    [1, 0]
];

D[1] = [
    [1, 1],
    [0, 1]
];

D[2] = [
    [1, 0],
    [1, 1]
];

D[3] = [
    [1, 1],
    [1, 0]
];


// I
I[0] = [
    [1, 1, 1, 1]
];

I[1] = [
    [1],
    [1],
    [1],
    [1]
];


// L
L[0] = [
    [1, 1, 1],
    [1, 0, 0]
];

L[1] = [
    [1, 0],
    [1, 0],
    [1, 1]
];

L[2] = [
    [0, 0, 1],
    [1, 1, 1]
];


L[3] = [
    [1, 1],
    [0, 1],
    [0, 1]
];

L[4] = [
    [1, 0, 0],
    [1, 1, 1]
];

L[5] = [
    [0, 1],
    [0, 1],
    [1, 1]
];

L[6] = [
    [1, 1, 1],
    [0, 0, 1]
];


L[7] = [
    [1, 1],
    [1, 0],
    [1, 0]
];


// O
O[0] = [
    [1, 1],
    [1, 1]
];


// T
T[0] = [
    [1, 1, 1],
    [0, 1, 0]
];

T[1] = [
    [0, 1, 0],
    [1, 1, 1]
];

T[2] = [
    [1, 0],
    [1, 1],
    [1, 0]
];

T[3] = [
    [0, 1],
    [1, 1],
    [0, 1]
];


// S
S[0] = [
    [0, 1, 1],
    [1, 1, 0]
];

S[1] = [
    [1, 0],
    [1, 1],
    [0, 1]
];

S[2] = [
    [1, 1, 0],
    [0, 1, 1]
];

S[3] = [
    [0, 1],
    [1, 1],
    [1, 0]
];


// X
X[0] = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
];


// U
U[0] = [
    [1, 0, 1],
    [1, 1, 1]
];

U[1] = [
    [1, 1, 1],
    [1, 0, 1]
];

U[2] = [
    [1, 1],
    [1, 0],
    [1, 1]
];

U[3] = [
    [1, 1],
    [0, 1],
    [1, 1]
];


// define other global vars
var countCombinations = 0;
var result = [];
var testedPositions = 0;
var gridWidth = 0;
var gridHeight = 0;
var total_possible_combinations = 1;
var count01 = new Array(1);
var gridItems = [[]];
var tetronimos = [];
var usedBlocks = [];
var usedBlockColors = new Array(15);
var countUsedBlocks, countUsedPositions = 0;
var errorRate = 0;
var type_of_calculation = "";
var countEachTest = [];
var orig_tetronimos = [];
var t0, t1 = 0;
var numofperm = 0;
var total_blocks_with_rotation = 1;

// checkerboard count
var Ac = 1;
var Bc = 1;
var Cc = 2;
var Dc = 2;
var Ic = 2;
var Lc = 2;
var Oc = 2;
var Tc = 3;
var Sc = 2;
var Xc = 1;

var processingBlockNumber = 0;
var worker;
