var tetronimos = ["I", "I", "L", "L", "O", "O", "T", "T", "Z", "Z", "X", "X", "V", "V", "V", "V"];

var I = new Array(1);
var O = new Array(0);
var L = new Array(7);
var T = new Array(3);
var Z = new Array(3);
var X = new Array(0);
var V = new Array(3);

var count01 = new Array(1);
var usedBlocks = new Array(15);
var usedBlockColors = new Array(15);
var countUsedBlocks, countUsedPositions = 0;
var testedPositions = 0;

// initialize array

var gridItems = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];




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


function calculate() {

    var t0 = performance.now();
    var delay = 100;
    testedPositions = 0;

    reload();

    //  document.getElementById("clean_button").style.visibility = "hidden";
    document.getElementById("calculate_button").disabled = true;
    document.getElementById("calcText").innerHTML = "Processing...";

    function timeoutLoop() {
        var errorRate = document.getElementById("errorRate").value;
       // console.log("errorRate: " + errorRate)

        while (count01[0] >= errorRate) {

            // randomly draw available blocks from tetronimo selection
            var shuffledTetronimoArray = shuffle(tetronimos);
            while (shuffledTetronimoArray[0] === "X") {
                shuffledTetronimoArray = shuffle(tetronimos);
            }


            if (count01[0] > 0) {
                //  display("RELOADING...")

                reload();
            }

            var count = 0;
            var c_canvas = document.getElementById("c");
            var context = c_canvas.getContext("2d");


            shuffledTetronimoArray.forEach(function (block) {
                count = count + 1;
                var foundOne = 0;

                if (foundOne === 0) {
                    var blockColor = getRandomColor();

                    // test all available board positions for the specific block
                    for (var y = 0; y < 10; y += 1) {
                        for (var x = 0; x < 6; x += 1) {

                            // scroll through a specific block options
                            for (var i = 0; i < this[block].length; i++) {
                                var cube = this[block][i];
                                var myPlacingArray = "";

                                var isFreetoPlace = 0;
                                var countOnes = 0;


                                // try specific block if it fits
                                for (var j = 0; j < cube.length; j++) {
                                    for (var l = 0; l < sizeAr(this[block][i])[1]; l++) {
                                        testedPositions++;
                                        if (((x + l) < 7) && ((y + j) < 11)) {
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
                                    //if (((x + l) < 7) && ((y + j) < 11)) {



                                        var placingPosition = myPlacingArray.split(" | ");

                                        for (var f = 0; f < placingPosition.length - 1; f++) {
                                            //display(block+" - " + placingPosition[f]);
                                            var placeAtPosition = placingPosition[f].split(",");
                                            gridItems[(placeAtPosition[0])][(placeAtPosition[1])] = 1;
                                        }


                                    var checkBadlyPlacedFin = checkBadlyPlaced(block);
                                   // display("checkBadlyPlaced: " + checkBadlyPlacedFin);

                                    //display("--");

                                        if (checkBadlyPlacedFin>0) {
                                             for (var f = 0; f < placingPosition.length - 1; f++) {
                                                //display(block+" - " + placingPosition[f]);
                                                var placeAtPosition = placingPosition[f].split(",");
                                                context.fillStyle = blockColor;
                                                context.fillRect(((placeAtPosition[1]) * 50) + 1, ((placeAtPosition[0]) * 50) + 1, 48, 48);
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



                                    //}
                                }

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
                                                        context.fillRect(((x + l) * 50) + 1, ((y + j) * 50) + 1, 48, 48);
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



                            }
                        }
                    }
                }
            });

            //if (gridItems[0][0] === 0) {
            countOccurenceInArray();

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
        }

        create01Grid();
        var t1 = performance.now();

        display(" --- ");
        display("Random Order: " + shuffledTetronimoArray);
        display("Used Solution : " + usedBlocks);
        display("Used: " + countUsedBlocks + " of 16 blocks");
        display("Length of Calculation: " + msToTime(t1 - t0));
        display("Tested: " + testedPositions.toLocaleString() + " block positions");

        document.getElementById("calculate_button").disabled = false;
        document.getElementById("calcText").innerHTML = "Solve";



        // document.getElementById("clean_button").style.visibility = "visible";
        // display("Available Tetronimo Blocks: I,I,L,L,O,O,T,T,Z,Z,X,X,V,V,V,V");
        //display("Solution Color Order: " + usedBlockColors);


    }

    setTimeout(timeoutLoop, delay);
}


function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100)
        , seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    //  hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + "h:" + minutes + "m:" + seconds + "s";
}

function checkBadlyPlaced(block) {
    var returnValue = 0;
    var endFoundOneBad = 0;
   // console.log("----"+ block +"-----");

    for (var y = 0; y < 10; y += 1) {
        for (var x = 0; x < 6; x += 1) {

            if (gridItems[y][x] === 0) {
                // found first 0
                returnValue = 0;
                try {if (gridItems[y-1][x] === 0) {returnValue++};} catch (err) {}
                try {if (gridItems[y+1][x] === 0) {returnValue++};} catch (err) {}
              //  try {if (gridItems[y-2][x] === 0) {returnValue++};} catch (err) {}
              //  try {if (gridItems[y+2][x] === 0) {returnValue++};} catch (err) {}
                try {if (gridItems[y][x-1] === 0) {returnValue++};} catch (err) {}
                try {if (gridItems[y][x+1] === 0) {returnValue++};} catch (err) {}
              //  try {if (gridItems[y][x-2] === 0) {returnValue++};} catch (err) {}
              //  try {if (gridItems[y][x+2] === 0) {returnValue++};} catch (err) {}

             //   console.log("gridItems["+y+"]["+x+"] = " + returnValue);

                if (returnValue === 0) {
                    endFoundOneBad++;

                }
            }
        }
    }

    if (endFoundOneBad>0) {returnValue=0;return returnValue;} else {return returnValue};

}


function countOccurenceInArray() {
    var count0 = 0;
    var count1 = 0;
    for (var y = 0; y < 10; y += 1) {
        for (var x = 0; x < 6; x += 1) {
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
    $('#msgs').append($('<div>').text(str));
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
    var c_canvas = document.getElementById("c");
    var context = c_canvas.getContext("2d");

    createGrid();
    reload();

    // On mouse click
    $(c_canvas).click(function (evt) {
        var pos = getNearestSquare(getMousePos(c_canvas, evt));
        var pixelData = context.getImageData(pos.x, pos.y, 1, 1).data;
        var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
        //if (hex === "#000000") {            hex = "#ffffff";        }
        /*
         if (pos != null) {
         if (hex === "#ffffff") {
         context.fillStyle = "#ff0000";
         context.fillRect(pos.x, pos.y, 48, 48);
         } else {
         context.fillStyle = "#ffffff";
         context.fillRect(pos.x, pos.y, 48, 48);
         }
         }
         */
        var color2letter = "";
        for (var i = 0; i <= 15; i++) {
            //console.log(usedBlockColors[i])
            if (usedBlockColors[i] === hex) {
                color2letter = usedBlocks[i];
                break;
            }
        }
        document.getElementById('pixColor').innerHTML = color2letter;
        document.getElementById('xPos').innerHTML = ((pos.y - 1) / 50);// + " | " + pos.x;
        document.getElementById('yPos').innerHTML = ((pos.x - 1) / 50); // + " | " + pos.y;
        //paint 0-1 grid
        //create01Grid();
    });

    context.strokeStyle = "#ddd";
    context.stroke();
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

    countUsedBlocks = 0;
    countUsedPositions = 0;
    gridItems = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];

    createGrid();
    create01Grid();

    document.getElementById("msgs").innerHTML = "";
    document.getElementById("xPos").innerHTML = "";
    document.getElementById("yPos").innerHTML = "";
    document.getElementById("pixColor").innerHTML = "";
}


function createGrid() {
    var c_canvas = document.getElementById("c");
    var context = c_canvas.getContext("2d");
    for (var x = 0; x < 302; x += 50) {
        for (var y = 0; y < 502; y += 50) {
            context.moveTo(x, 0);
            context.lineTo(x, 502);
            context.moveTo(0, y);
            context.lineTo(502, y);
            context.fillStyle = "#FFFFFF";
            context.fillRect(x + 1, y + 1, 48, 48);
        }
    }
}

function create01Grid() {
    var c_canvas = document.getElementById("c");
    var context = c_canvas.getContext("2d");
    var grid01 = '';

    for (var y = 0; y < 10; y += 1) {
        for (var x = 0; x < 6; x += 1) {

            //var pixelData = context.getImageData((x * 50) + 1, (y * 50) + 1, 1, 1).data;
            //var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
            //if ((hex === "#000000") || (hex === "#ffffff")) {
            //  gridItems[y][x] = 0;
            //} else {
            //   gridItems[y][x] = 1;
            //}
            grid01 = grid01 + gridItems[y][x] + ' &nbsp;&nbsp;&nbsp;';
        }
        grid01 = grid01 + "<br>"
    }
    countOccurenceInArray();
    grid01 = grid01 + "<br> <b>Unused:</b>" + count01[0] + " | <b>Used:</b>" + count01[1];
    document.getElementById('01Grid').innerHTML = grid01;

    // console.log("GRID ITEMS:");
    // console.log(gridItems);
    // $('#01table').hide().show(0);

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
    x = (Math.floor(x / 50) * 50) + 1
    y = (Math.floor(y / 50) * 50) + 1
    return {
        x: x,
        y: y
    };
}
