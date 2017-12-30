//var tetronimos = "IILLOOTTZZXXllll";
var tetronimos = ["L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L"];

var count01 = new Array(1)

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

var L = new Array(7)

//letters
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

console.log(sizeAr(L[3]));


function calculate() {
    var count = 0;
    var c_canvas = document.getElementById("c");
    var context = c_canvas.getContext("2d");


    // randomly draw available blocks from tetronimo selection
    var shuffledTetronimoArray = shuffle(tetronimos);
    display(" Shuffled ");
    display(shuffledTetronimoArray);
    shuffledTetronimoArray.forEach(function (block) {
        count = count + 1;
        display(" -- ");
        display(" BLOCK " + count);

        // scroll through a specific block options
        for (var i = 0; i < this[block].length; i++) {
            var cube = this[block][i];
            display(" -- ");

            // try specific block
            for (var j = 0; j < cube.length; j++) {


                display("L[" + i + "][" + j + "] = " + cube[j]);


                context.fillStyle = "#ff0000";
                context.fillRect(i, j, 48, 48);

                //gridItems[y+j][x+i] = 1;


            }

        }

    });


    create01Grid();


    /*
     L.forEach(function (letter) {
     console.log(letter);
     var splitLetters = letter.split("");
     splitLetters.forEach(function (direction) {
     console.log(direction);
     });
     });
     */

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

function findEmptyPositioninGrid() {
    for (var y = 0; y < 10; y += 1) {
        for (var x = 0; x < 6; x += 1) {
            if (gridItems[y][x] === 0) {
                return (y, x);
                break;
            }
        }
    }
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
        if (hex === "#000000") {
            hex = "#ffffff";
        }

        if (pos != null) {
            if (hex === "#ffffff") {
                context.fillStyle = "#ff0000";
                context.fillRect(pos.x, pos.y, 48, 48);
            } else {
                context.fillStyle = "#ffffff";
                context.fillRect(pos.x, pos.y, 48, 48);
            }
        }
        document.getElementById('pixColor').innerHTML = hex;
        document.getElementById('xPos').innerHTML = ((pos.x - 1) / 50);
        document.getElementById('yPos').innerHTML = ((pos.y - 1) / 50);

        //paint 0-1 grid
        create01Grid();
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
    createGrid();
    create01Grid();
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
            var pixelData = context.getImageData((x * 50) + 1, (y * 50) + 1, 1, 1).data;
            var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
            if ((hex === "#000000") || (hex === "#ffffff")) {
                gridItems[y][x] = 0;
            } else {
                gridItems[y][x] = 1;
            }
            grid01 = grid01 + gridItems[y][x] + ' &nbsp;&nbsp;&nbsp;';
        }
        grid01 = grid01 + "<br>"
    }
    countOccurenceInArray();
    grid01 = grid01 + "<br><br> <b>Zero:</b>" + count01[0] + " | <b>One:</b>" + count01[1];
    document.getElementById('01Grid').innerHTML = grid01;

    console.log("GRID ITEMS:");
    console.log(gridItems);


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
