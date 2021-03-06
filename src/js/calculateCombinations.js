self.importScripts('globalVariables.js');

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
            randomizeBlocks();
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

    data = null;

}, false);


function randomizeBlocks() {

    postMessage({aTopic: 'processing'});


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
                //aBuf: (countCombinations + " - " + tetronimoCombination)
                aBuf: (" Combination: " + countCombinations)
            }
        );


        // countOccurenceInArray();
        var goToNextBlock = 0;

        for (var s = 0; s < tetronimoCombination.length; s++) {


            if (goToNextBlock === 0) {


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

                                // sleep(1000);

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
                                    if (count01[0] <= errorRate) {
                                        finished();
                                        throw "exit";
                                    }
                                }
                            }
                        }
                    }
                }

                // abandon this combination if it creates enclosed space
                if (foundEmptySpace() === 1) {
                    // console.log("WE MUST STOP");
                    goToNextBlock = 1;
                }

            }
        }
    }
    return;
}

function foundEmptySpace() {

    for (var y = 0; y < gridHeight; y += 1) {
        for (var x = 0; x < gridWidth; x += 1) {
            var posLeft = x-1;
            var posRight = x+1;
            var posUp = y-1;
            var posDown = y+1;

            var countAval = 0;
            var countOnes = 0;

            if (gridItems[y][x] === 0) {

                try {
                    if (gridItems[y][posLeft] === 1) {
                        countAval++;
                        countOnes++;
                    } else if (gridItems[y][posLeft] === 0) {
                        countAval++;
                    }
                } catch (err1) {
                }
                // console.log('gridItems[' + y + '][' + posLeft + '] - countAval=' + countAval + ' - countOnes=' + countOnes);

                try {
                    if (gridItems[y][posRight] === 1) {
                        countAval++;
                        countOnes++;
                    } else if (gridItems[y][posRight] === 0) {
                        countAval++;
                    }
                } catch (err2) {
                }
                // console.log('gridItems[' + y + '][' + posRight + '] - countAval=' + countAval + ' - countOnes=' + countOnes);

                try {
                    if (gridItems[posUp][x] === 1) {
                        countAval++;
                        countOnes++;
                    } else if (gridItems[posUp][x] === 0) {
                        countAval++;
                    }
                } catch (err3) {
                }
                //  console.log('gridItems[' + posUp + '][' + x + '] - countAval=' + countAval + ' - countOnes=' + countOnes);

                try {
                    if (gridItems[posDown][x] === 1) {
                        countAval++;
                        countOnes++;
                    } else if (gridItems[posDown][x] === 0) {
                        countAval++;
                    }
                } catch (err4) {
                }
                //   console.log('gridItems[' + posDown + '][' + x + '] - countAval=' + countAval + ' - countOnes=' + countOnes);


            }

            // sleep(400);
            if (tetronimos.indexOf('A') === -1) {
                if ((countOnes >= 2) && (countAval === countOnes)) {
                    //     console.log('gridItems[' + y + '][' + x + ']=0 - | - countAval=' + countAval + ' - countOnes=' + countOnes);
                    return 1;
                }
            }
        }
    }
    return 0;
}

var contains = function (needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if (!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (needle) {
            var i = -1, index = -1;

            for (i = 0; i < this.length; i++) {
                var item = this[i];

                if ((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
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
                    //aBuf: ("Combination: <b>" + countCombinations + " of " + total_possible_combinations + "</b> (" + d + " of " + tetronimoSpecificCombination1.length + ") - " + tetronimoCombination);
                    aBuf: (" Combination: <b>" + countCombinations + " of " + total_possible_combinations + "</b> (" + d + " of " + tetronimoSpecificCombination1.length + ")")
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
                                    if (count01[0] <= errorRate) {
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
