# Block Puzzle Solver


# ⚠️ **Important Update** ⚠️

## 🚀 **New Version Available!** 🚀  
As of **November 23, 2024**, a new and improved version of the Tangram Puzzle Solver is available.  
Access it here: [Tangram Puzzle Solver (New Version)](https://github.com/JozefJarosciak/TangramPuzzleSolver)

🔗 **Why Update?**  - The new version includes enhanced algorithms, optimized performance, and improved features for solving puzzles efficiently.

---


# Description
The **Block Puzzle Solver** is a tool designed to calculate solutions for tangram-style puzzles based on monomino, domino, triomino, tetromino, and pentomino shapes within a user-defined rectangular or square area. It supports **block rotation** and **reflection** for maximum flexibility.

## Features

- **Fast Mode**: Generates solutions using random, unique block combinations for quick results.
- **Slow Mode**: Exhaustively tests all possible block combinations and permutations, ensuring comprehensive coverage (though this can involve a significant number of possibilities).

## Future Plans

- Expand support to include more complex shapes like **heptominoes**, **octominoes**, and other **polyominoes**.
- Enable support for user-defined areas of **any shape**, not limited to rectangles or squares.

This repository is ideal for puzzle enthusiasts, developers, or anyone interested in algorithmic problem-solving with polyomino-based puzzles.


# Demo

- **Live Demo**: [Block Puzzle Solver](https://www.joe0.com/blockpuzzlesolver.com/old)  
- **Project Details**: Learn more about the development of this project [here](https://www.joe0.com/2018/01/03/n-block-tetromino-tangram-puzzle-solver-in-javascript/).


# Screenshots

![image](https://github.com/user-attachments/assets/dc132d5c-ba8f-4abb-8980-cbbc2c04dd81)


# Browser Support

The Block Puzzle Solver is tested and compatible with the following browsers:

- **Chrome**
- **Edge**
- **Firefox**
- **Opera**
- **Safari**

*Note: While the program may work in other browsers, I've only tested it in those listed above.*


# Contributing

Contributions to this project are welcome and encouraged!  

Currently, I am seeking an **equation-based approach** to eliminate early cases where no solution exists efficiently. If you're interested, check out this discussion for more context: [Tetromino Tiling: How to Eliminate Early Cases with No Solution](https://math.stackexchange.com/questions/2602742/tetronimo-tiling-with-given-tiles-how-to-eliminate-early-cases-where-no-soluti).


# Resources
* Wikipedia Tetromino - https://en.wikipedia.org/wiki/Tetromino
* Polyomino - https://en.wikipedia.org/wiki/Polyomino
* Wolfram Math Polyomino - http://mathworld.wolfram.com/Polyomino.html
* Federico Dossena's Tetromino Solver - https://github.com/adolfintel/tetrispuzzlesolver-html5 (only calculates blocks in order defined)
* George Martin' Polyominoes: A Guide to Puzzles and Problems in Tiling - https://books.google.sk/books?id=D8KbnTGXDWEC&pg=PA49&lpg=PA49&dq=tetronimo+tiling+formula+math+checkerboard&source=bl&ots=gPiYck0dIW&sig=TvCK7UkhMlhWyfi5hlhGrPhm-uY&hl=en&sa=X&ved=0ahUKEwjO292DlNPYAhXGjywKHYv3BSEQ6AEIODAF#v=onepage&q=tetronimo%20tiling%20formula%20math%20checkerboard&f=false
* Distinguishable Permutations: https://onlinecourses.science.psu.edu/stat414/node/31
* Counting distinct n- n-letter long array permutations: https://math.stackexchange.com/questions/2612013/formula-for-counting-distinct-n-letter-long-array-permutations

## License
The code is available under the [MIT license](LICENSE.txt).
