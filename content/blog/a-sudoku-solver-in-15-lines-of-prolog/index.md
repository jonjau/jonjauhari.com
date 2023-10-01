---
title: "A Sudoku Solver in 15 Lines of Prolog"
date: "2020-10-26T18:22:55+11:00"
description: "Appreciating a sudoku solver in 15 lines of Prolog, a classic
example of declarative programming."
---

The title says it all. I came across this Prolog code in a lecture recently,
and it seems to come from [here](https://www.metalevel.at/sudoku/). If this
isn't peak abstraction, I don't know what is.

Honestly though, can anyone even claim this is computer code? Seems to me like
a line-by-line translation from the rules of Sudoku _that actually runs_ (!!).

I've added some annotations below -- it really is just precise English.

```prolog
:- use_module(library(clpfd)).                          %*

sudoku(Rows) :-
    length(Rows, 9), maplist(same_length(Rows), Rows),  %1
    append(Rows, Vs), Vs ins 1..9,                      %2
    maplist(all_distinct, Rows),                        %3
    transpose(Rows, Columns),                           %4
    maplist(all_distinct, Columns),                     %5
    Rows = [A,B,C,D,E,F,G,H,I],
    blocks(A, B, C), blocks(D, E, F), blocks(G, H, I).  %6

blocks([], [], []).
blocks([A,B,C|Bs1], [D,E,F|Bs2], [G,H,I|Bs3]) :-        %7
    all_distinct([A,B,C,D,E,F,G,H,I]),
    blocks(Bs1, Bs2, Bs3).
```

\* This is the secret sauce:
[Constraint Logic Programming over Finite Domains](https://www.swi-prolog.org/man/clpfd.html),
which is as far as I know, needed for the `Vs ins 1..9` bit.

A list of lists `Rows` is a solved Sudoku puzzle when all of these statements
hold:

1. There are 9 rows, each row is 9 elements long, i.e. the board is square.
2. The concatenation of the rows (that is, the entire board) only contains
   numbers 1 to 9.
3. In each row the values contained are distinct.
4. Columns are the rows of the board transposed.
5. In each column the values contained are distinct.
6. Letting the rows from the first to the ninth be named A to I,
   rows A,B,C, and D,E,F, and G,H,I form "blocks".
7. Three rows form "blocks" if the first three values from each of the three
   rows (a 3x3 on the board) altogether contain only distinct values, and
   that this is true for the following group of three values. Three empty rows
   are considered to form "blocks".

If only project specifications in the real world were as precise as
logic puzzles!

Essentially, you define what makes a solution a solution, and Prolog
(at least, in the interactive `swipl` prompt) will:

- If given a complete solution, verify that it truly is a solution
  (outputting true if so, false otherwise).
- If given a partial solution, try different
  variable bindings to make it a correct solution (outputting each set of
  such bindings).
  If it fails in doing so, it spits out false.
- If given nothing i.e. an unbound variable, binds that variable to all the
  possible completed Sudoku puzzles (maybe not in the way you expect,
  `swipl` showed them "bound" in terms of variables, not numbers).

## Running the code

Sure enough it actually runs. In a vanilla
[SWI-Prolog](https://www.swi-prolog.org/) session:

```_
(manually formatted swipl output)

?- Puzzle=[[5,3,_, _,7,_, _,_,_],
|          [6,_,_, 1,9,5, _,_,_],
|          [_,9,8, _,_,_, _,6,_],
|
|          [8,_,_, _,6,_, _,_,3],
|          [4,_,_, 8,_,3, _,_,1],
|          [7,_,_, _,2,_, _,_,6],
|
|          [_,6,_, _,_,_, 2,8,_],
|          [_,_,_, 4,1,9, _,_,5],
|          [_,_,_, _,8,_, _,7,9]],
|    sudoku(Puzzle),
|    write(Puzzle).
[[5,3,4, 6,7,8, 9,1,2],
 [6,7,2, 1,9,5, 3,4,8],
 [1,9,8, 3,4,2, 5,6,7],

 [8,5,9, 7,6,1, 4,2,3],
 [4,2,6, 8,5,3, 7,9,1],
 [7,1,3, 9,2,4, 8,5,6],

 [9,6,1, 5,3,7, 2,8,4],
 [2,8,7, 4,1,9, 6,3,5],
 [3,4,5, 2,8,6, 1,7,9]]
Puzzle=(omitted)
```
