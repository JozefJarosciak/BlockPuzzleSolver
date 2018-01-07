var tetronimos = [];
var orig_tetronimos = [];

var t0, t1 = 0;
var numofperm = 0;

var gridWidth = 0;
var gridHeight = 0;

var I = new Array(1);
var O = new Array(0);
var L = new Array(7);
var T = new Array(3);
var Z = new Array(3);
var X = new Array(0);
var V = new Array(3);

var count01 = new Array(1);
var usedBlocks = [];
var usedBlockColors = new Array(15);
var countUsedBlocks, countUsedPositions = 0;
var testedPositions = 0;
var errorRate = 10;
var processingBlockNumber = 0;
var countCombinations = 0;

// initialize array

var gridItems = [[]];

//letters

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

Z[0] = [
    [1, 1, 0],
    [0, 1, 1]
];

Z[1] = [
    [0, 1, 1],
    [1, 1, 0]
];

Z[2] = [
    [0, 1],
    [1, 1],
    [1, 0]
];

Z[3] = [
    [1, 0],
    [1, 1],
    [0, 1]
];

I[0] = [
    [1, 1, 1]
];

I[1] = [
    [1],
    [1],
    [1]
];

O[0] = [
    [1, 1],
    [1, 1]
];

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

L[0] = [
    [1, 1, 1],
    [0, 0, 1]
];

L[1] = [
    [1, 1, 1],
    [1, 0, 0]
];

L[2] = [
    [0, 0, 1],
    [1, 1, 1]
];

L[3] = [
    [1, 0, 0],
    [1, 1, 1]
];

L[4] = [
    [1, 0],
    [1, 0],
    [1, 1]
];

L[5] = [
    [1, 1],
    [1, 0],
    [1, 0]
];

L[6] = [
    [0, 1],
    [0, 1],
    [1, 1]
];

L[7] = [
    [1, 1],
    [0, 1],
    [0, 1]
];

//console.log(sizeAr(L[3]));

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}


function calculate() {



    // start the timer
    t0 = performance.now();
    var delay = 200;
    testedPositions = 0;
    processingBlockNumber = 0;

    reload();


    function timeoutLoop() {
        var count = 0;

        document.getElementById("clean_button").style.visibility = "hidden";
        document.getElementById("calculate_button").disabled = true;
        document.getElementById("calculate_button").innerHTML = "Processing...";

        errorRate = parseInt(document.getElementById("errorRate").value);
        // console.log("errorRate: " + errorRate)
        var c_canvas = document.getElementById("canvas");
        var context = c_canvas.getContext("2d");


        var finArr = [];
        // convert tetronimos to a word array of all combinations
        for (var y = 0; y < tetronimos.length; y += 1) {
            finArr[y] = [];
            for (var x = 0; x < this[tetronimos[y]].length; x += 1) {
                finArr[y][x] = tetronimos[y] + x;
            }
        }

        countCombinations = 0;

        function iteration(i, tetronimoSpecificCombination) {
            if (i === finArr.length) {
                countCombinations++;
                result.push(tetronimoSpecificCombination);

                //console.log(tetronimoSpecificCombination);

                console.log(countCombinations + " - " + tetronimoSpecificCombination);

                var tetronimoSpecificCombination1 = uniq_fast(permute(tetronimoSpecificCombination));

                //throw "exit";







                for (var d = 0; d < tetronimoSpecificCombination1.length; d++) {
                    //    reload();

                    var tetronimoCombination = tetronimoSpecificCombination1[d];
                   //    console.log(tetronimoSpecificCombination1[d]);

                   // reload();

                    // try specific block if it fits
                    for (var s = 0; s < tetronimoCombination.length; s++) {
                        var block = tetronimoCombination[s].charAt(0);
                        var blockLength = parseInt(tetronimoCombination[s].substr(1));

                        count = count + 1;
                        var foundOne = 0;

                        var blockColor = getRandomColor();
                        testedPositions++;
                        for (var y = 0; y < gridHeight; y += 1) {
                            for (var x = 0; x < gridWidth; x += 1) {

                                var cube = this[block][blockLength];
                                var myPlacingArray = "";

                                var isFreetoPlace = 0;
                                var countOnes = 0;

                                // try specific block if it fits
                                for (var j = 0; j < cube.length; j++) {

                                    for (var l = 0; l < sizeAr(this[block][blockLength])[1]; l++) {
                                        if (((x + l) < (gridWidth + 1)) && ((y + j) < (gridHeight + 1))) {
                                            if (cube[j][l] === 1) {
                                                countOnes++;
                                            }
                                            try {
                                                if (gridItems[y + j][x + l] === 0) {

                                                    if (cube[j][l] === 1) {
                                                        isFreetoPlace++;
                                                        myPlacingArray = myPlacingArray + (y + j) + "," + (x + l) + " | ";
                                                    }
                                                }
                                            } catch (err) {
                                            }
                                        }
                                    }
                                }

                                // check if there is any single empty position blocked
                                if ((isFreetoPlace === countOnes) && (foundOne === 0) && ((isFreetoPlace > 0) && (countOnes > 0))) {
                                    if (((x + l) < (gridWidth + 1)) && ((y + j) < (gridHeight + 1))) {
                                        var placingPosition = myPlacingArray.split(" | ");
                                        for (var f = 0; f < placingPosition.length - 1; f++) {
                                            var placeAtPosition = placingPosition[f].split(",");
                                            gridItems[(placeAtPosition[0])][(placeAtPosition[1])] = 1;
                                            context.fillStyle = blockColor;
                                            context.fillRect(((placeAtPosition[1]) * 25) + 1, ((placeAtPosition[0]) * 25) + 1, 23, 23);
                                        }
                                        foundOne = 1;
                                        isFreetoPlace = 0;
                                        countUsedPositions = countUsedPositions + countOnes;
                                        countOnes = 0;
                                        usedBlocks[countUsedBlocks] = block;
                                        usedBlockColors[countUsedBlocks] = blockColor;
                                        countUsedBlocks++;
                                    }
                                    countOccurenceInArray();
                                    if (count01[0] === 0) {
                                        endResult();
                                        throw "exit";
                                    } else {
                                        if (errorRate > 0) {
                                            if (count01[0] <= errorRate) {
                                                endResult();
                                                throw "exit";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //  throw "exit";
                }






                return;
            }
            finArr[i].forEach(function (a) {
                iteration(i + 1, tetronimoSpecificCombination.concat(a));
            });
        }

        var result = [];
        iteration(0, []);
        finArr = [];

    }


    setTimeout(timeoutLoop, delay);
    countOccurenceInArray();
    reload;
  //endResult();
    document.getElementById("clean_button").style.visibility = "visible";
    document.getElementById("calculate_button").disabled = false;
    document.getElementById("calculate_button").innerHTML = "Solve";


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

function endResult() {
    t1 = performance.now();

    display(" ------------------");
    display(" --- RESULT ---");
    display(" ------------------ ");
    display("Selected: " + orig_tetronimos);
    display("Solution: <b>" + usedBlocks + "<b>");
    display("Used: " + countUsedBlocks + " of " + tetronimos.length + " blocks");
    display("Length of Calculation: <b>" + msToTime(t1 - t0)) + "</b>";
    display("Tested: <b>" + countCombinations + "</b> board configurations and <b>" + testedPositions.toLocaleString() + "</b> block positions");
    display("Speed of Calculation: <b>" + (Math.round((testedPositions / ((t1 - t0) / 1000)))).toLocaleString() + "</b> positions per second");


    document.getElementById("clean_button").style.visibility = "visible";
    document.getElementById("calculate_button").disabled = false;
    document.getElementById("calculate_button").innerHTML = "Solve";

    create01Grid();
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100)
        , seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    //  hours = (hours < 10) ? "0" + hours : hours;
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

function getRandomColor() {
    var letters = '0123456789abcdef';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function display(str) {
    var div = document.getElementById('msgs');
    div.innerHTML += str + '<br>';
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


function arrayCalculator() {


}


function getCombinations(array) {
    var count = 0;

    function iter(i, p) {
        if (i === array.length) {
            count++;
            result.push(p); // <==================== use the items
            console.log(count + " - " + p);
            return;
        }
        array[i].forEach(function (a) {
            iter(i + 1, p.concat(a));
        });
    }

    var result = [];

    iter(0, []);
    return result;
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

function calculateTotals() {
    var total_value_blocks = parseInt(document.getElementById("Z-letter").value) * 4
        + parseInt(document.getElementById("L-letter").value) * 4
        + parseInt(document.getElementById("T-letter").value) * 4
        + parseInt(document.getElementById("I-letter").value) * 3
        + parseInt(document.getElementById("O-letter").value) * 4
        + parseInt(document.getElementById("X-letter").value) * 5
        + parseInt(document.getElementById("V-letter").value) * 3;

    if (isNaN(total_value_blocks)) {
        total_value_blocks = "";
        document.getElementById("calculate_button").style.visibility = "hidden";
    } else {
        document.getElementById("calculate_button").style.visibility = "visible";
        tetronimos = [];
        orig_tetronimos = [];

        for (var i = 0; i < parseInt(document.getElementById("I-letter").value); i++) {
            tetronimos.push("I");
            orig_tetronimos.push("I");
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
        for (var i = 0; i < parseInt(document.getElementById("Z-letter").value); i++) {
            tetronimos.push("Z");
            orig_tetronimos.push("Z");
        }
        for (var i = 0; i < parseInt(document.getElementById("X-letter").value); i++) {
            tetronimos.push("X");
            orig_tetronimos.push("X");
        }
        for (var i = 0; i < parseInt(document.getElementById("V-letter").value); i++) {
            tetronimos.push("V");
            orig_tetronimos.push("V");
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


    if (total_value_blocks != total_value_board) {
        document.getElementById("calculate_button").style.visibility = "hidden";
    } else {
        document.getElementById("calculate_button").style.visibility = "visible";
    }


    document.getElementById("block_value").innerHTML = total_value_blocks.toString();
    document.getElementById("board_value").innerHTML = total_value_board.toString();

    if (tetronimos) {
        document.getElementById("selectedBlocks").innerHTML = tetronimos.toString();
        document.getElementById("selectedBlocksLen").innerHTML = tetronimos.length.toString();

    } else {
        document.getElementById("selectedBlocks").innerHTML = "";
    }


}


// UNUSED LOGIC


/*
 var checkBadlyPlacedFin = checkBadlyPlaced(block);
 if (checkBadlyPlacedFin>0) {
 for (var f = 0; f < placingPosition.length - 1; f++) {
 //display(block+" - " + placingPosition[f]);
 var placeAtPosition = placingPosition[f].split(",");
 context.fillStyle = blockColor;
 context.fillRect(((placeAtPosition[1]) * 25) + 1, ((placeAtPosition[0]) * 25) + 1, 24, 24);
 }
 display(block + ": " + myPlacingArray.substring(0, myPlacingArray.length - 2));
 foundOne = 1;
 isFreetoPlace = 0;
 countUsedPositions = countUsedPositions + countOnes;
 countOnes = 0;
 usedBlocks[countUsedBlocks] = block;
 usedBlockColors[countUsedBlocks] = blockColor;
 countUsedBlocks++;
 checkBadlyPlacedFin = 0;
 } else {
 for (var f = 0; f < placingPosition.length - 1; f++) {
 //display(block+" - " + placingPosition[f]);
 var placeAtPosition = placingPosition[f].split(",");
 gridItems[(placeAtPosition[0])][(placeAtPosition[1])] = 0;
 }
 }
 */



//}


/*
 // place specific block on 01 grid and board
 if ((isFreetoPlace === countOnes) && (foundOne === 0) && ((isFreetoPlace > 0) && (countOnes > 0))) {
 //display("isFreetoPlace: " + isFreetoPlace + " - countOnes:" + countOnes + " = " + (isFreetoPlace - countOnes));
 //if (((x + l) < 7) && ((y + j) < 11)) {
 for (var j = 0; j < cube.length; j++) {
 for (var l = 0; l < sizeAr(this[block][i])[1]; l++) {
 if ((gridItems[y + j][x + l] === 0)) {
 if (cube[j][l] === 1) {
 context.fillStyle = blockColor;
 context.fillRect(((x + l) * 25) + 1, ((y + j) * 25) + 1, 24, 24);
 gridItems[(y + j)][(x + l)] = 1;
 //display("Placing: " + block + "[" + (x + l) + "][" + (y + j) + "]");
 // display("gridItems[" + (x + l) + "][" + (y + j) + "]=" + gridItems[(x + l)][(y + j)] + " + Cube[" + j + "][" + l + "]=" + cube[j][l] + " ==> " + isFreetoPlace);
 }

 }
 }
 }
 foundOne = 1;
 isFreetoPlace = 0;
 countUsedPositions = countUsedPositions + countOnes;
 countOnes = 0;
 usedBlocks[countUsedBlocks] = block;
 usedBlockColors[countUsedBlocks] = blockColor;
 countUsedBlocks++;
 // }
 }

 */


//var pixelData = context.getImageData((x * 25) + 1, (y * 25) + 1, 1, 1).data;
//var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
//if ((hex === "#000000") || (hex === "#ffffff")) {
//  gridItems[y][x] = 0;
//} else {
//   gridItems[y][x] = 1;
//}


// console.log("GRID ITEMS:");
// console.log(gridItems);
// $('#01table').hide().show(0);

//if (hex === "#000000") {            hex = "#ffffff";        }
/*
 if (pos != null) {
 if (hex === "#ffffff") {
 context.fillStyle = "#ff0000";
 context.fillRect(pos.x, pos.y, 24, 24);
 } else {
 context.fillStyle = "#ffffff";
 context.fillRect(pos.x, pos.y, 24, 24);
 }
 }
 */

//if (gridItems[0][0] === 0) {
//            countOccurenceInArray();

/*
 L.forEach(function (letter) {
 console.log(letter);
 var splitLetters = letter.split("");
 splitLetters.forEach(function (direction) {
 console.log(direction);
 });
 });
 */

// display("RELOADING:" + count01[0])

/*

 function checkBadlyPlaced(block) {
 var returnValue = 0;
 var endFoundOneBad = 0;
 // console.log("----"+ block +"-----");

 for (var y = 0; y < 10; y += 1) {
 for (var x = 0; x < 6; x += 1) {

 if (gridItems[y][x] === 0) {
 // found first 0
 returnValue = 0;
 try {
 if (gridItems[y - 1][x] === 0) {
 returnValue++
 }
 ;
 } catch (err) {
 }
 try {
 if (gridItems[y + 1][x] === 0) {
 returnValue++
 }
 ;
 } catch (err) {
 }
 //  try {if (gridItems[y-2][x] === 0) {returnValue++};} catch (err) {}
 //  try {if (gridItems[y+2][x] === 0) {returnValue++};} catch (err) {}
 try {
 if (gridItems[y][x - 1] === 0) {
 returnValue++
 }
 ;
 } catch (err) {
 }
 try {
 if (gridItems[y][x + 1] === 0) {
 returnValue++
 }
 ;
 } catch (err) {
 }
 //  try {if (gridItems[y][x-2] === 0) {returnValue++};} catch (err) {}
 //  try {if (gridItems[y][x+2] === 0) {returnValue++};} catch (err) {}

 //   console.log("gridItems["+y+"]["+x+"] = " + returnValue);

 if (returnValue === 0) {
 endFoundOneBad++;

 }
 }
 }
 }

 if (endFoundOneBad > 0) {
 returnValue = 0;
 return returnValue;
 } else {
 return returnValue
 }
 ;

 }

 */
