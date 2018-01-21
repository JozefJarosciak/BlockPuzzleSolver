# Block Puzzle Solver

[![Build Status](https://travis-ci.org/h5bp/html5-boilerplate.svg)](https://travis-ci.org/h5bp/html5-boilerplate)
[![devDependency Status](https://david-dm.org/h5bp/html5-boilerplate/dev-status.svg)](https://david-dm.org/h5bp/html5-boilerplate#info=devDependencies)

# Description
The Block Puzzle Solver calculates the solutions to monomino, domino, triomino, tetromino and pentomino(1) based rectangular or square tangram puzzle in a user-defined area, with support for block rotation and reflection. 

The fast version uses a random unique block combinations. 

The slow version tests all possible block combinations and permutations (there can be quite a lot of them). 

The plan for future is to include more pentominoes, heptominoes, octominoes & other polyominoes; as well as support user defined areas of any shape. 

# Demo
[http://www.BlockPuzzleSolver.com/](http://www.BlockPuzzleSolver.com/)

# Screenshots
In the following article:
[https://www.joe0.com/2018/01/03/n-block-tetromino-tangram-puzzle-solver-in-javascript/](https://www.joe0.com/2018/01/03/n-block-tetromino-tangram-puzzle-solver-in-javascript/)

![Screenshot1](https://www.joe0.com/wp-content/uploads/2018/01/Capture.jpg)


## Browser support
* Chrome *(latest 2)*
* Edge *(latest 2)*
* Firefox *(latest 2)*
* Opera *(latest 2)*
* Safari *(latest 2)*

*This doesn't mean that the program cannot be used in older browsers,
just that I'll ensure compatibility with the ones mentioned above.*

## Contributing
Anyone is welcome to contribute to this project.
Currently I am looking for a equation based approach of eliminating early cases where no solution exist: https://math.stackexchange.com/questions/2602742/tetronimo-tiling-with-given-tiles-how-to-eliminate-early-cases-where-no-soluti

## Resources
* Wikipedia Tetromino - https://en.wikipedia.org/wiki/Tetromino
* Polyomino - https://en.wikipedia.org/wiki/Polyomino
* Wolfram Math Polyomino - http://mathworld.wolfram.com/Polyomino.html
* Federico Dossena's Tetromino Solver - https://github.com/adolfintel/tetrispuzzlesolver-html5 (only calculates blocks in order defined)
* George Martin' Polyominoes: A Guide to Puzzles and Problems in Tiling - https://books.google.sk/books?id=D8KbnTGXDWEC&pg=PA49&lpg=PA49&dq=tetronimo+tiling+formula+math+checkerboard&source=bl&ots=gPiYck0dIW&sig=TvCK7UkhMlhWyfi5hlhGrPhm-uY&hl=en&sa=X&ved=0ahUKEwjO292DlNPYAhXGjywKHYv3BSEQ6AEIODAF#v=onepage&q=tetronimo%20tiling%20formula%20math%20checkerboard&f=false
* Distinguishable Permutations: https://onlinecourses.science.psu.edu/stat414/node/31
* Counting distinct n- letter long array permutations: https://math.stackexchange.com/questions/2612013/formula-for-counting-distinct-n-letter-long-array-permutations

## License
The code is available under the [MIT license](LICENSE.txt).
