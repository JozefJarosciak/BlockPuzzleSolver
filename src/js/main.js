var tetronimos = [];
var orig_tetronimos = [];
var t0, t1 = 0;
var numofperm = 0;
var gridWidth = 0;
var gridHeight = 0;
var total_blocks_with_rotation = 1;
var I = new Array(1);
var J = new Array(3);
var L = new Array(3);
var O = new Array(0);
var T = new Array(3);
var S = new Array(1);
var Z = new Array(1);

// checkerboard count
var Ic = 2;
var Jc = 2;
var Lc = 2;
var Oc = 2;
var Tc = 3;
var Sc = 2;
var Zc = 2;


var count01 = new Array(1);
var usedBlocks = [];
var usedBlockColors = new Array(15);
var countUsedBlocks, countUsedPositions = 0;
var testedPositions = 0;
var errorRate = 10;
var processingBlockNumber = 0;
var countCombinations = 0;

var worker;
// initialize array

var gridItems = [[]];

//letters

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


// J
J[0] = [
    [1, 0, 0],
    [1, 1, 1]
];

J[1] = [
    [0, 1],
    [0, 1],
    [1, 1]
];

J[2] = [
    [1, 1, 1],
    [0, 0, 1]
];


J[3] = [
    [1, 1],
    [1, 0],
    [1, 0]
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


// Z
Z[0] = [
    [1, 1, 0],
    [0, 1, 1]
];

Z[1] = [
    [0, 1],
    [1, 1],
    [1, 0]
];


/*


 V[0] = [
 [1, 1],
 [0, 1]
 ];

 V[1] = [
 [1, 1],
 [1, 0]
 ];

 V[2] = [
 [0, 1],
 [1, 1]
 ];

 V[3] = [
 [1, 0],
 [1, 1]
 ];



 X[0] = [
 [0, 1, 0],
 [1, 1, 1],
 [0, 1, 0]
 ];

 */



//console.log(sizeAr(L[3]));

function stopworker() {
    worker.terminate();
    document.getElementById("clean_button").style.display = "block";
    document.getElementById("calculate_button").disabled = false;
    document.getElementById("calculate_button").innerHTML = "Solve";
    document.getElementById("calculate_button").style.display = "block";
    document.getElementById("configuration3").style.display = "block";
    document.getElementById("configuration").style.pointerEvents = "auto";
    document.getElementById("stop_button").style.display = "none";
    document.getElementById("result").innerHTML = "";
    reload();
}

function calculate() {
    reload();
    t0 = performance.now();
    testedPositions = 0;
    processingBlockNumber = 0;

    function timeoutLoop() {
        var count = 0;

        errorRate = parseInt(document.getElementById("errorRate").value);
        var c_canvas = document.getElementById("canvas");
        var context = c_canvas.getContext("2d");


        // START CALCULATION IN SEP WORKER
        worker = new Worker("js/calculateCombinations.js");

        worker.onmessage = function (event) {

            if (event.data.aTopic === "reload") {
                reload();
            }

            if (event.data.aTopic === "processing") {
                document.getElementById("stop_button").style.display = "block";
                document.getElementById("configuration3").style.display = "none";
                document.getElementById("configuration").style.pointerEvents = "none";
                document.getElementById("clean_button").style.display = "none";
                document.getElementById("calculate_button").disabled = true;
                document.getElementById("calculate_button").innerHTML = "Processing...";
                document.getElementById("calculate_button").style.display = "none";
            }

            if (event.data.aTopic === "message") {
                document.getElementById("result").innerHTML = event.data.aBuf;
            }


            if (event.data.aTopic === "error") {
                document.getElementById("result").innerHTML = event.data.aBuf;
            }


            if (event.data.aTopic === "placeBlock") {
                // document.getElementById("result").innerHTML = event.data.block;

                gridItems[(event.data.placeAtPosition0)][(event.data.placeAtPosition1)] = 1;
                context.fillStyle = event.data.blockColor;
                context.fillRect(((event.data.placeAtPosition1) * 25) + 1, ((event.data.placeAtPosition0) * 25) + 1, 23, 23);
                context.fillStyle = "#ffffff";
                context.fillText(event.data.block, ((event.data.placeAtPosition1) * 25) + 10, ((event.data.placeAtPosition0) * 25) + 15);
                countOccurenceInArray();
                worker.postMessage({'count01': count01[0]});
            }

            if (event.data.aTopic === "Finished") {
                usedBlocks = event.data.usedBlocks;
                usedBlockColors = event.data.usedBlockColors;
                countUsedBlocks = event.data.countUsedBlocks;
                countCombinations = event.data.countCombinations;
                testedPositions = event.data.testedPositions;
                endResult();
            }

            if (event.data.aTopic === "Finished-Bad") {
                countCombinations = event.data.countCombinations;
                testedPositions = event.data.testedPositions;
                endResultbad();
            }
        };

        // pass required variables to worker
        worker.postMessage({'gridWidth': gridWidth});
        worker.postMessage({'gridHeight': gridHeight});
        worker.postMessage({'tetronimos': tetronimos});
        worker.postMessage({'total_possible_combinations': total_blocks_with_rotation});
        worker.postMessage({'errorRate': errorRate});

        if (document.getElementById("calculation_Type").value === "random") {
            worker.postMessage({'type_of_calculation': "random"});
        }

        if (document.getElementById("calculation_Type").value === "all") {
            worker.postMessage({'type_of_calculation': "all"});
        }

        // start worker
        worker.postMessage({'start': 'start'});
        countCombinations = 0;
    }

    setTimeout(timeoutLoop, 200);
    countOccurenceInArray();
    //endResult();
    document.getElementById("clean_button").style.display = "block";
    document.getElementById("calculate_button").disabled = false;
    document.getElementById("calculate_button").innerHTML = "Solve";
    document.getElementById("calculate_button").style.display = "block";
}


function endResult() {
    t1 = performance.now();

    display("<h2> RESULTS </h2>");
    display("<h3>Solution</h3>" + usedBlocks.join(' - '));
    display("<h3>Details</h3><b>Used:</b>" + countUsedBlocks + " of " + tetronimos.length + " blocks");
    display("<br><b>Tested: </b>" + countCombinations.toLocaleString() + " board configurations and " + testedPositions.toLocaleString() + " block positions");
    display("<br><b>Length of Calculation: </b>" + msToTime(t1 - t0));
    display("<br><b>Calculation Speed: </b>" + (Math.round((testedPositions / ((t1 - t0) / 1000)))).toLocaleString() + "</b> positions per second");


    document.getElementById("clean_button").style.display = "block";
    document.getElementById("calculate_button").disabled = false;
    document.getElementById("calculate_button").innerHTML = "Solve";
    document.getElementById("calculate_button").style.display = "block";
    document.getElementById("configuration3").style.display = "block";
    document.getElementById("configuration").style.pointerEvents = "auto";

    create01Grid();
    countCombinations = 0;

    document.getElementById("stop_button").style.display = "none";
}


function endResultbad() {
    t1 = performance.now();
    display("<h2> RESULTS </h2>");
    //display("Selected: " + orig_tetronimos);
    display("Found No Solution!");
    display("<br>Tested all combinations!");
    display("<br>Length of Calculation: <b>" + msToTime(t1 - t0)) + "</b>";
    display("<br>Calculation Speed: <b>" + (Math.round((testedPositions / ((t1 - t0) / 1000)))).toLocaleString() + "</b> positions per second");


    document.getElementById("clean_button").style.display = "block";
    document.getElementById("calculate_button").disabled = false;
    document.getElementById("calculate_button").innerHTML = "Solve";
    document.getElementById("calculate_button").style.display = "block";
    document.getElementById("configuration3").style.display = "block";
    document.getElementById("configuration").style.pointerEvents = "auto";

    create01Grid();
    createGrid();
    countCombinations = 0;

    document.getElementById("stop_button").style.display = "none";
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100)
        , seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + "h:" + minutes + "m:" + seconds + "." + milliseconds + "s";
}

function countOccurenceInArray() {
    var count0 = 0;
    var count1 = 0;
    for (var y = 0; y < gridHeight; y += 1) {
        for (var x = 0; x < gridWidth; x += 1) {
            if (gridItems[y][x] === 0) {
                count0 = count0 + 1;
            } else {
                count1 = count1 + 1;
            }
        }
    }
    count01[0] = count0;
    count01[1] = count1;
}

function display(str) {
    var div = document.getElementById('msgs');
    div.innerHTML += str;
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//on Load
function onLoad() {
    var c_canvas = document.getElementById("canvas");
    var context = c_canvas.getContext("2d");


    reload();
    calculateTotals();

    makeGridItemsArray(gridWidth, gridHeight, 0);

    document.getElementById("stop_button").style.display = "none";

    // On mouse click

    canvas.addEventListener('click', function (event) {
        var pos = getNearestSquare(getMousePos(c_canvas, event));
        var pixelData = context.getImageData(pos.x, pos.y, 1, 1).data;
        var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
        var color2letter = "";
        for (var i = 0; i <= 15; i++) {
            //console.log(usedBlockColors[i])
            if (usedBlockColors[i] === hex) {
                color2letter = usedBlocks[i];
                break;
            }
        }
        document.getElementById('pixColor').innerHTML = color2letter;
        document.getElementById('xPos').innerHTML = ((pos.y - 1) / 25);// + " | " + pos.x;
        document.getElementById('yPos').innerHTML = ((pos.x - 1) / 25); // + " | " + pos.y;
    });


    createGrid();
}

function sizeAr(ar) {
    var row_count = ar.length;
    var row_sizes = []
    for (var i = 0; i < row_count; i++) {
        row_sizes.push(ar[i].length)
    }
    return [row_count, Math.min.apply(null, row_sizes)]
}


function reload() {
    numofperm = 0;
    countUsedBlocks = 0;
    countUsedPositions = 0;
    usedBlocks = [];

    makeGridItemsArray(gridWidth, gridHeight, 0);
    createGrid();
    create01Grid();


    document.getElementById("msgs").innerHTML = "";
    document.getElementById("xPos").innerHTML = "";
    document.getElementById("yPos").innerHTML = "";
    document.getElementById("pixColor").innerHTML = "";
}

function makeGridItemsArray(w, h, val) {
    gridItems = [];
    for (var i = 0; i < h; i++) {
        gridItems[i] = [];
        for (var j = 0; j < w; j++) {
            gridItems[i][j] = val;
        }
    }
    return gridItems;
}

function ifExists(arr1, arr2) {
    var aStr = JSON.stringify(arr1);
    var doesExists = !!arr2.find(s => JSON.stringify(s) == aStr);
    return doesExists;
}

function createGrid() {
    var c_canvas = document.getElementById("canvas");
    c_canvas.width = ((25 * gridWidth) + 1);
    c_canvas.height = ((25 * gridHeight) + 1);
    c_canvas.background = "#ddd";

    var context = c_canvas.getContext("2d");
    context.strokeStyle = "#ddd";
    context.stroke();

    for (var x = 0; x < ((25 * gridWidth) + 2); x += 25) {
        for (var y = 0; y < ((25 * gridHeight) + 2); y += 25) {
            context.moveTo(x, 0);
            context.lineTo(x, ((25 * gridHeight) + 1));
            context.moveTo(0, y);
            context.lineTo(((25 * gridWidth) + 1), y);
            context.fillStyle = "#fff";
            context.fillRect(x, y, 23, 23);
        }
    }
}

function create01Grid() {
    var grid01 = '';
    /*
     for (var y = 0; y < gridHeight; y += 1) {
     for (var x = 0; x < gridWidth; x += 1) {
     //  grid01 = grid01 + gridItems[y][x] + ' &nbsp;&nbsp;&nbsp;';
     }
     // grid01 = grid01 + "<br>"
     }

     */
    countOccurenceInArray();
    grid01 = grid01 + "<br> <b>Unused:</b>" + count01[0] + " | <b>Used:</b>" + count01[1];
    document.getElementById('01Grid').innerHTML = grid01;
}


function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getNearestSquare(position) {
    var x = position.x;
    var y = position.y;
    if (x < 0 || y < 0) return null;
    x = (Math.floor(x / 25) * 25) + 1
    y = (Math.floor(y / 25) * 25) + 1
    return {
        x: x,
        y: y
    };
}


function test() {

}

function isInt(value) {
    var x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
}

var combinations = (function () {
    return function (n, r) {
        return Math.factorial(n) / (Math.factorial(r) * Math.factorial(n - r));
    };
})();


Math.factorial = function (_x) {
    return _x == 1 ? _x : _x * Math.factorial(--_x);
}

function calculateTotals1() {

    gridWidth = parseInt(document.getElementById("X-zone").value);
    gridHeight = parseInt(document.getElementById("Y-zone").value);

    document.getElementById("board_value").innerHTML = (gridWidth * gridHeight).toString();

    if (parseInt(document.getElementById("block_value").innerHTML) !== gridWidth * gridHeight) {
        document.getElementById("calculate_button").style.visibility = "hidden";
        document.getElementById("clean_button").style.display = "none";
        document.getElementById("result").innerHTML = "Tetronimo Area and Board Area must equal!";
    } else {
        document.getElementById("calculate_button").style.visibility = "visible";
        document.getElementById("clean_button").style.display = "none";
        document.getElementById("result").innerHTML = "";
    }

    createGrid();
}

function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
        var item = a[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    return out;
}


function numberOfUnigue(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}


function multiplyFactorial(array) {
    var sum = 1;
    for (var i = 0; i < array[0].length; i++) {
        sum = sum * Math.factorial(array[0][i]);
    }
    return sum;
}



function calculateTotals() {
    total_blocks_with_rotation = 1;

    var total_value_blocks = parseInt(document.getElementById("I-letter").value) * 4
        + parseInt(document.getElementById("J-letter").value) * 4
        + parseInt(document.getElementById("L-letter").value) * 4
        + parseInt(document.getElementById("O-letter").value) * 4
        + parseInt(document.getElementById("T-letter").value) * 4
        + parseInt(document.getElementById("S-letter").value) * 4
        + parseInt(document.getElementById("Z-letter").value) * 4;

    for (var i = (parseInt(Math.sqrt(total_value_blocks))); i > 2; i--) {

        if (isInt(total_value_blocks / i) === true) {
            // console.log(i);
            document.getElementById("Y-zone").value = i;
            document.getElementById("X-zone").value = total_value_blocks / i;
            gridWidth = parseInt(document.getElementById("X-zone").value);
            gridHeight = parseInt(document.getElementById("Y-zone").value);
            createGrid();
            break;
        }
    }

    if (isNaN(total_value_blocks)) {
        total_value_blocks = "";
        document.getElementById("calculate_button").style.display = "none";
        document.getElementById("clean_button").style.display = "none";
        document.getElementById("result").innerHTML = "Block selection must be a number!";


    } else {
        document.getElementById("calculate_button").style.visibility = "visible";
        document.getElementById("clean_button").style.display = "block";
        document.getElementById("result").innerHTML = "";
        tetronimos = [];
        orig_tetronimos = [];


        for (var i = 0; i < parseInt(document.getElementById("I-letter").value); i++) {
            tetronimos.push("I");
            orig_tetronimos.push("I");
        }

        for (var i = 0; i < parseInt(document.getElementById("J-letter").value); i++) {
            tetronimos.push("J");
            orig_tetronimos.push("J");
        }

        for (var i = 0; i < parseInt(document.getElementById("L-letter").value); i++) {
            tetronimos.push("L");
            orig_tetronimos.push("L");
        }

        for (var i = 0; i < parseInt(document.getElementById("O-letter").value); i++) {
            tetronimos.push("O");
            orig_tetronimos.push("O");
        }

        for (var i = 0; i < parseInt(document.getElementById("T-letter").value); i++) {
            tetronimos.push("T");
            orig_tetronimos.push("T");
        }

        for (var i = 0; i < parseInt(document.getElementById("S-letter").value); i++) {
            tetronimos.push("S");
            orig_tetronimos.push("S");
        }

        for (var i = 0; i < parseInt(document.getElementById("Z-letter").value); i++) {
            tetronimos.push("Z");
            orig_tetronimos.push("Z");
        }

    }


    var total_value_board = parseInt(document.getElementById("X-zone").value) * parseInt(document.getElementById("Y-zone").value);


    if (isNaN(total_value_board)) {
        total_value_board = "";
        document.getElementById("calculate_button").style.visibility = "hidden";
    } else {

        document.getElementById("calculate_button").style.visibility = "visible";

        gridWidth = parseInt(document.getElementById("X-zone").value);
        gridHeight = parseInt(document.getElementById("Y-zone").value);

        reload();
    }

    var counter = 0;

    for (var i = 0; i < tetronimos.length; i++) {
        var blockTurns = 0;

        if (tetronimos[i] === "I") {
            blockTurns = 2
        }
        if (tetronimos[i] === "J") {
            blockTurns = 4
        }
        if (tetronimos[i] === "L") {
            blockTurns = 4
        }
        if (tetronimos[i] === "O") {
            blockTurns = 1
        }
        if (tetronimos[i] === "T") {
            blockTurns = 4
        }
        if (tetronimos[i] === "S") {
            blockTurns = 2
        }
        if (tetronimos[i] === "Z") {
            blockTurns = 2
        }

        //  console.log(tetronimos[i] + " - " + blockTurns + " - " + parseInt(document.getElementById(tetronimos[i]+"-letter").value));

        total_blocks_with_rotation = total_blocks_with_rotation * blockTurns;
    }


    document.getElementById("block_value").innerHTML = total_value_blocks.toString();
    document.getElementById("board_value").innerHTML = total_value_board.toString();
    document.getElementById("totalBlocksWithRotation").innerHTML = total_blocks_with_rotation.toLocaleString();


    var total_number_of_letters = tetronimos.length;
    //console.log("total_number_of_letters: " + total_number_of_letters);


    // calculate the possible number of combinations
    var numofUniqueLetters = numberOfUnigue(tetronimos);
    //console.log("Number of Unique Letters: " + numofUniqueLetters[0]);
    //console.log("Count of Unique Letters: " + numofUniqueLetters[1]);


    var groupCountTotal = 1;
    var groupStateTotal = 1;
    var checkerBoardBlockCount = 0;

    for (var z = 0; z < numofUniqueLetters[0].length; z++) {
        //console.log(numofUniqueLetters[1][z] + " : " + numofUniqueLetters[0][z] + " - " + this[numofUniqueLetters[0][z]].length);
        var a = (Math.factorial(numofUniqueLetters[1][z]));
        groupCountTotal = groupCountTotal * a;
        //console.log("groupCountTotal - " + a);
        var b = (Math.pow(this[numofUniqueLetters[0][z]].length,numofUniqueLetters[1][z]));
        groupStateTotal = groupStateTotal * b;
        //console.log("groupStateTotal - " + b);
        // get letter + c and its value times number of letter occurences to get checkerboard count
        checkerBoardBlockCount = checkerBoardBlockCount + (parseInt(this[numofUniqueLetters[0][z]+"c"]) * numofUniqueLetters[1][z]);
        console.log("checkerBoardBlockCount - " + checkerBoardBlockCount);
    }

    //console.log(groupCountTotal + " + " + groupStateTotal);

    var finalNumberOfDistinctPermutations = (Math.factorial(total_number_of_letters) / groupCountTotal) * groupStateTotal;

//    document.getElementById("possibleCombinations").innerHTML = (numofUniqueLettersWithFactorial/factorialsForEachLetter).toString();
    document.getElementById("possibleCombinations").innerHTML = finalNumberOfDistinctPermutations.toLocaleString();
   // document.getElementById("possibleCombinations").innerHTML = numofUniqueLettersWithFactorial / numofUniqueLetters- );



    if (total_value_blocks != total_value_board) {
        document.getElementById("calculate_button").style.display = "none";
        document.getElementById("clean_button").style.display = "none";
        document.getElementById("result").innerHTML = "Tetronimo Area and Board Area must equal!";
    } else {
        document.getElementById("calculate_button").style.display = "block";
        document.getElementById("clean_button").style.display = "block";
        document.getElementById("result").innerHTML = "";
    }


    if (tetronimos) {
        document.getElementById("selectedBlocks").innerHTML = tetronimos.toString();
        document.getElementById("selectedBlocksLen").innerHTML = tetronimos.length.toString();

    } else {
        document.getElementById("selectedBlocks").innerHTML = "";
    }

/*
    // check if board can be calculated
    if (checkerBoardBlockCount !== (total_value_board/2)) {
        document.getElementById("calculate_button").style.visibility = "hidden";
    }
*/
}
