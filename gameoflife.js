
// This file contains the actual board array
// and all the logic to set and/or evolve the board


var gameoflife = {
  cells: [],
  numSteps: 0,

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


  setRandomBoard: function(pct) {
    var i,j;
    var value;

    for (i=0; i<this.cells.length; i++) {
      for (j=0; j<this.cells[i].length; j++) {
        this.cells[i][j] = (Math.random() < pct) ? 1 : 0;
      }
    }
    this.numSteps = 0;
  },

  step: function() {
    var i,j;
    var deltai, deltaj;
    var targeti, targetj;
    var numLiveNeighbors;
    var newCells;

    newCells = this.initializeNewCells();
    //console.log(newCells);

    for (i=0; i<this.cells.length; i++) {
      for (j=0; j<this.cells[i].length; j++) {
        numLiveNeighbors = 0;
        for (deltai=-1; deltai<=1; deltai++) {
          targeti = i+deltai;
          if (targeti >= 0 && targeti < this.cells[i].length) {  // if the i coord is on the board
            for (deltaj=-1; deltaj<=1; deltaj++) {
              targetj = j+deltaj;
              if ( targetj >= 0&& targetj < this.cells.length) {
                if (deltai != 0 || deltaj !=0 ) {
                  //console.log(targeti+","+targetj);
                  if (this.cells[targeti][targetj] === 1) {
                    numLiveNeighbors++;
                  }
                  //console.log(i+","+j+" : "+targeti+","+targetj+" : "+numLiveNeighbors)                  
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
          if (numLiveNeighbors === 3) {
            newCells[i][j] = 1;
          }
        }
      }
    }
    //console.log(newCells);
    this.cells = newCells;
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
