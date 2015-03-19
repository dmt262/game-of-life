
// This file contains the actual board array
// and all the logic to set and/or evolve the board


var gameoflife = {
  cells: [],

  setBoardSize: function(n) {
    var i,j;

    this.cells.push([]);
    for (i=0; i<n; i++) {
      this.cells[i] = []
      for (j=0; j<n; j++) {
        this.cells[i].push(0);
      }
    }
  },

  setRandomBoard: function(pct) {
    var i,j;
    var value;

    for (i=0; i<this.cells.length; i++) {
      for (j=0; j<this.cells[i].length; j++) {
        value = 0;
        if (Math.random() < pct) {
          value = 1;
        }
        this.cells[i][j] = value;
      }
    }
  }

};
