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

// receive vars
self.addEventListener('message', function (e) {
    var data = e.data;

    if (data.tetronimos) {
        tetronimos = data.tetronimos;
        // postMessage(tetronimos);
    }

    if (data.start === "start") {
        // start the calculation
        if (type_of_calculation === "random") {
            random();
        } else {
            iteration(0, []);
        }


    }

    if (data.type_of_calculation) {
        type_of_calculation = data.type_of_calculation;
    }


    if (data.gridWidth) {
        gridWidth = data.gridWidth;
    }

    if (data.gridHeight) {
        gridHeight = data.gridHeight;
    }

    if (data.total_possible_combinations) {
        total_possible_combinations = data.total_possible_combinations;
    }

    if (data.count01) {
        count01[0] = data.count01;
    }

    if (data.errorRate) {
        errorRate = data.errorRate;
    }


}, false);


function random() {

    postMessage(
        {
            aTopic: 'processing'
        }
    );


    makeGridItemsArray(gridWidth, gridHeight, 0);
    countOccurenceInArray();


    while (count01[0] >= errorRate) {

        if (count01[0] > 0) {
            makeGridItemsArray(gridWidth, gridHeight, 0);
            postMessage({aTopic: 'reload'});
            numofperm = 0;
            countUsedBlocks = 0;
            countUsedPositions = 0;
            usedBlocks = [];
        }

        countCombinations++;

        var tetronimoCombination = shuffle(tetronimos);

        postMessage(
            {
                aTopic: 'message',
                aBuf: (countCombinations + " - " + tetronimoCombination)
            }
        );
        countOccurenceInArray();

        for (var s = 0; s < tetronimoCombination.length; s++) {
            var block = tetronimoCombination[s];
            var blockLength = Math.floor((Math.random() * parseInt(this[tetronimoCombination[s]].length)));

            // count = count + 1;
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

                    // place if it fits
                    if ((isFreetoPlace === countOnes) && (foundOne === 0) && ((isFreetoPlace > 0) && (countOnes > 0))) {
                        //if (((x + l) < (gridWidth + 1)) && ((y + j) < (gridHeight + 1))) {
                        var placingPosition = myPlacingArray.split(" | ");
                        for (var f = 0; f < placingPosition.length - 1; f++) {
                            var placeAtPosition = placingPosition[f].split(",");

                            gridItems[(placeAtPosition[0])][(placeAtPosition[1])] = 1;


                            postMessage(
                                {
                                    aTopic: 'placeBlock',
                                    placeAtPosition0: placeAtPosition[0],
                                    placeAtPosition1: placeAtPosition[1],
                                    blockColor: blockColor,
                                    block: block
                                }
                            );


                            countOccurenceInArray();


                        }
                        foundOne = 1;
                        isFreetoPlace = 0;
                        countUsedPositions = countUsedPositions + countOnes;
                        countOnes = 0;
                        usedBlocks[countUsedBlocks] = block + "[" + blockLength + "]";
                        usedBlockColors[countUsedBlocks] = blockColor;
                        countUsedBlocks++;
                        //}

                        //     console.log(count01[0])
                        if (count01[0] === 0) {
                            finished();
                            throw "exit";
                        } else {
                            if (errorRate > 0) {
                                if (count01[0] === errorRate) {
                                    finished();
                                    throw "exit";
                                }
                            }
                        }


                    }


                    /*
                     if (d === (tetronimoSpecificCombination1.length)) {

                     if ((total_possible_combinations === countCombinations) && (count01[0] > 0)) {

                     postMessage(
                     {
                     aTopic: 'Finished-Bad',
                     countCombinations: countCombinations,
                     testedPositions: testedPositions
                     }
                     );

                     postMessage(
                     {
                     aTopic: 'message',
                     aBuf: ("")
                     }
                     );

                     throw "exit";
                     }

                     if ((total_possible_combinations === countCombinations) && (count01[0] === 0)) {
                     finished();
                     throw "exit";
                     }

                     }
                     */


                }

            }
        }
        //  throw "exit";
        /*
         if ((d === 0) && (tetronimoSpecificCombination1.length === 1)) {
         postMessage(
         {
         aTopic: 'Finished-Bad',
         countCombinations: countCombinations,
         testedPositions: testedPositions
         }
         );

         postMessage(
         {
         aTopic: 'message',
         aBuf: ("")
         }
         );
         }
         */
        // }

    }
    return;
}


function iteration(i, tetronimoSpecificCombination) {

    postMessage(
        {
            aTopic: 'processing'
        }
    );


    makeGridItemsArray(gridWidth, gridHeight, 0);

    var finArr = [];
    // convert tetronimos to a word array of all combinations
    for (var y = 0; y < tetronimos.length; y += 1) {
        finArr[y] = [];
        for (var x = 0; x < this[tetronimos[y]].length; x += 1) {
            finArr[y][x] = tetronimos[y] + x;
        }
    }

    if (i === finArr.length) {
        countCombinations++;
        result.push(tetronimoSpecificCombination);

        //console.log(tetronimoSpecificCombination);

        postMessage(
            {
                aTopic: 'message',
                aBuf: ("Calculating Unique Permutations. Please Wait!")
            }
        );


        var tetronimoSpecificCombination1 = uniq_fast(permute(tetronimoSpecificCombination));


        //var tetronimoSpecificCombination1 = tetronimoSpecificCombination;

        //throw "exit";



        for (var d = 0; d < tetronimoSpecificCombination1.length; d++) {


            var tetronimoCombination = tetronimoSpecificCombination1[d];
            // var tetronimoCombination = tetronimoSpecificCombination;
            //    console.log(tetronimoSpecificCombination1[d]);
            //console.log(countCombinations + " - " + tetronimoSpecificCombination + " - " + tetronimoSpecificCombination1.length + " - " + tetronimoCombination);

            countOccurenceInArray();

            countEachTest.push(tetronimoSpecificCombination1[d]);
            //var sum = countEachTest.reduce(add, 0);
           //console.log(countEachTest.length + " - " + uniq_fast(countEachTest).length);


            postMessage(
                {
                    aTopic: 'message',
                    //aBuf: ("<b>" + countCombinations + " of " + total_possible_combinations + "</b> (" + d + " of " + tetronimoSpecificCombination1.length + ") - " + tetronimoCombination)
                    aBuf: ("Testing Combination: <b>" + countCombinations + " of " + total_possible_combinations + "</b> (" + d + " of " + tetronimoSpecificCombination1.length + ") - " + tetronimoCombination)
                    //aBuf: (countCombinations + " - " + tetronimoSpecificCombination + " - " + tetronimoSpecificCombination1.length + " - " + tetronimoCombination)
                }
            );



            makeGridItemsArray(gridWidth, gridHeight, 0);
            postMessage({aTopic: 'reload'});

            numofperm = 0;
            countUsedBlocks = 0;
            countUsedPositions = 0;
            usedBlocks = [];

            for (var s = 0; s < tetronimoCombination.length; s++) {

                var block = tetronimoCombination[s].charAt(0);
                var blockLength = parseInt(tetronimoCombination[s].substr(1));
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

                        // place if it fits
                        if ((isFreetoPlace === countOnes) && (foundOne === 0) && ((isFreetoPlace > 0) && (countOnes > 0))) {
                            //if (((x + l) < (gridWidth + 1)) && ((y + j) < (gridHeight + 1))) {
                            var placingPosition = myPlacingArray.split(" | ");
                            for (var f = 0; f < placingPosition.length - 1; f++) {
                                var placeAtPosition = placingPosition[f].split(",");

                                gridItems[(placeAtPosition[0])][(placeAtPosition[1])] = 1;
                                postMessage(
                                    {
                                        aTopic: 'placeBlock',
                                        placeAtPosition0: placeAtPosition[0],
                                        placeAtPosition1: placeAtPosition[1],
                                        blockColor: blockColor,
                                        block: block
                                    }
                                );
                                countOccurenceInArray();

                            }
                            foundOne = 1;
                            isFreetoPlace = 0;
                            countUsedPositions = countUsedPositions + countOnes;
                            countOnes = 0;
                            usedBlocks[countUsedBlocks] = block + "[" + blockLength + "]";
                            usedBlockColors[countUsedBlocks] = blockColor;
                            countUsedBlocks++;

                            if (count01[0] === 0) {
                                finished();
                                throw "exit";
                            } else {
                                if (errorRate > 0) {
                                    if (count01[0] === errorRate) {
                                        finished();
                                        throw "exit";
                                    }
                                }
                            }

                        }

                        var countComb = 0;
                        if (tetronimoSpecificCombination1.length === 1) {
                            countComb = 0;
                        } else {
                            countComb = 1;
                        }
                        if ((d + countComb) === (tetronimoSpecificCombination1.length)) {
                            if ((total_possible_combinations === countCombinations) && (count01[0] > 0)) {

                                postMessage(
                                    {
                                        aTopic: 'Finished-Bad',
                                        countCombinations: countCombinations,
                                        testedPositions: testedPositions
                                    }
                                );

                                postMessage(
                                    {
                                        aTopic: 'message',
                                        aBuf: ("")
                                    }
                                );

                                throw "exit";
                            }

                            if ((total_possible_combinations === countCombinations) && (count01[0] === 0)) {
                                finished();
                                throw "exit";
                            }
                        }

                    }

                }
            }

            if ((d === 0) && (tetronimoSpecificCombination1.length === 1)) {
                postMessage(
                    {
                        aTopic: 'Finished-Bad',
                        countCombinations: countCombinations,
                        testedPositions: testedPositions
                    }
                );

                postMessage(
                    {
                        aTopic: 'message',
                        aBuf: ("")
                    }
                );
            }
        }
        return;
    }
    finArr[i].forEach(function (a) {
        iteration(i + 1, tetronimoSpecificCombination.concat(a));
    });
}


function finished() {
    postMessage(
        {
            aTopic: 'Finished',
            usedBlocks: usedBlocks,
            usedBlockColors: usedBlockColors,
            countUsedBlocks: countUsedBlocks,
            countCombinations: countCombinations,
            testedPositions: testedPositions
        }
    );

    postMessage(
        {
            aTopic: 'message',
            aBuf: ("")
        }
    );
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

function add(a, b) {
    return a + b;
}

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


function getRandomColor() {
    var letters = '0123456789abcd';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 14)];
    }
    return color;
}

function sizeAr(ar) {
    var row_count = ar.length;
    var row_sizes = []
    for (var i = 0; i < row_count; i++) {
        row_sizes.push(ar[i].length)
    }
    return [row_count, Math.min.apply(null, row_sizes)]
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
