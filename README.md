# Block Puzzle Solver

[![Build Status](https://travis-ci.org/h5bp/html5-boilerplate.svg)](https://travis-ci.org/h5bp/html5-boilerplate)
[![devDependency Status](https://david-dm.org/h5bp/html5-boilerplate/dev-status.svg)](https://david-dm.org/h5bp/html5-boilerplate#info=devDependencies)

# Description
The following Block Tangram Puzzle Solver calculates every possibility to solve the puzzle on a user defined X*Y sized board.

There are two available types of calculation. The faster version uses a random unique block combinations, whereas the slower model goes through all possible block combinations.

Currently the block solver script supports only tetronimo types of blocks, but it should be fairly simply to to adjust it to also support monominoes, dominoes, trominoes, pentominoes and other types of polyominoes.

# Demo
[http://www.BlockPuzzleSolver.com/](http://www.BlockPuzzleSolver.com/)

# Screenshots
In the following article:
[https://www.joe0.com/2018/01/03/16-block-tetronimo-tangram-puzzle-solver-in-javascript/](https://www.joe0.com/2018/01/03/16-block-tetronimo-tangram-puzzle-solver-in-javascript/)

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
* Wikipedia Tetronimo - https://en.wikipedia.org/wiki/Tetromino
* Polyomino - https://en.wikipedia.org/wiki/Polyomino
* Wolfram Math Polyomino - http://mathworld.wolfram.com/Polyomino.html
* Federico Dossena's Tetronimo Solver - https://github.com/adolfintel/tetrispuzzlesolver-html5 (only calculates blocks in order defined)
* George Martin' Polyominoes: A Guide to Puzzles and Problems in Tiling - https://books.google.sk/books?id=D8KbnTGXDWEC&pg=PA49&lpg=PA49&dq=tetronimo+tiling+formula+math+checkerboard&source=bl&ots=gPiYck0dIW&sig=TvCK7UkhMlhWyfi5hlhGrPhm-uY&hl=en&sa=X&ved=0ahUKEwjO292DlNPYAhXGjywKHYv3BSEQ6AEIODAF#v=onepage&q=tetronimo%20tiling%20formula%20math%20checkerboard&f=false

## License
The code is available under the [MIT license](LICENSE.txt).
