
// This file contains the actual board array
// and all the logic to set and/or evolve the board

// All work on this object is performaed on the cells[].
// No display is implied.  
// This is the M in an MVC model

var gameoflife = {
  cells: [],  // array to store all the live/dead cell positions
  numSteps: 0,  // keeps track of the number of steps run through so far.
  population: 0,  // Keeps the current # of live cells

  // creates an n x n array to store 0/1 = dead/live cells
  setBoardSize: function(n) {  
    var i,j;

    this.cells.push([]);
    for (i=0; i<n; i++) {
      this.cells[i] = [];
      for (j=0; j<n; j++) {
        this.cells[i].push(0);
     }
    }
    this.numSteps = 0;
  },



  // Once a board is initialized, this method will fill it in with pct percent chance
  // of a cell being alive (1)

  setRandomBoard: function(pct) {
    var i,j;
    var value;

    this.population = 0;
    for (i=0; i<this.cells.length; i++) {
      for (j=0; j<this.cells[i].length; j++) {
        this.cells[i][j] = (Math.random() < pct) ? 1 : 0;
        if (this.cells[i][j] === 1) {
          this.population++;
        }
      }
    }
    this.numSteps = 0;
  },

  // Implements the following rules:
  //
  // Live Cells:
  //
  // 1.  Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  // 2.  Any live cell with two or three live neighbours lives on to the next generation.
  // 3.  Any live cell with more than three live neighbours dies, as if by overcrowding.
  //
  // Dead Cells
  // 1.  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  step: function() {
    var i,j;
    var deltai, deltaj;
    var targeti, targetj;
    var numLiveNeighbors;
    var tempCells, newCells;

    newCells = this.initializeNewCells();
    //console.log(newCells);

// There are more efficient ways of doing this, but as long as the board is
// a reasonable size all is good. (100 x 100 was fine).
//
// The more efficient ways include not having to go all the way around a cell
// when you already went 1/2 of the way around on the previous cell.

    this.population = 0;
    for (i=0; i<this.cells.length; i++) {
      for (j=0; j<this.cells[i].length; j++) {
        numLiveNeighbors = 0;
        // Start going all around -1, 0, +1 in X direction
        for (deltai=-1; deltai<=1; deltai++) {
          targeti = i+deltai;
          if (targeti >= 0 && targeti < this.cells[i].length) {  // if the i coord is on the board
            // go all around -1, 0, +1 in the Y direction
            for (deltaj=-1; deltaj<=1; deltaj++) {
              targetj = j+deltaj;
              if ( targetj >= 0&& targetj < this.cells.length) {
                if (deltai != 0 || deltaj !=0 ) {
                  //console.log(targeti+","+targetj);
                  if (this.cells[targeti][targetj] === 1) {
                    numLiveNeighbors++;
                  }
                }
              }
            }
          }
        }
        //console.log(i+","+j+"  = "+numLiveNeighbors);
        newCells[i][j] = this.cells[i][j];
        if (this.cells[i][j] === 1) {  // this is a live cell
          if (numLiveNeighbors <= 1 ||  // lonely
              numLiveNeighbors >= 4     // over-crowded
             ) {
            newCells[i][j] = 0;
          }
        } else {   // this is a dead cell
          if (numLiveNeighbors === 3) {  // new cell is born
            newCells[i][j] = 1;
          }
        }
        if (newCells[i][j] === 1) {  // Tabulate the population while you're traversing
          this.population++;
        }
      }
    }
    //console.log(newCells);

    // Swap the cells array (try to only use 2 sets of arrays by swapping them
    // rather than making a new one each cycle
    // Saves a bit of a memory leak

    this.tempCells = this.cells;
    this.cells = newCells;
    this.newCells = this.tempCells;

    // increment the step count
    this.numSteps++;
  },

  initializeNewCells: function() {
    var i,j;
    var newCells;

    newCells = [];
    newCells.push([]);
    for (i=0; i<this.cells.length; i++) {
      newCells[i] = [];
      for (j=0; j<this.cells[i].length; j++) {
        newCells[i].push(0);
      }
    }
    return(newCells);
  },

};
