var app = new Vue({
  el: "#app",
  data: {
    height_of_board: 10,
    width_of_board: 10,
    num_of_mines: 10,
    mine_positions: [],
  },
  methods: {
    testClick: function (index1, index2) {
      console.log(`X: ${index1 + 1}, Y: ${index2 + 1}`);
    },

    generateMines: function () {
      for (let i = 0; i < this.num_of_mines; i++) {
        let width = Math.floor(Math.random() * this.width_of_board) + 1;
        let height = Math.floor(Math.random() * this.height_of_board) + 1;
        this.mine_positions.push({ mine_x: width, mine_y: height });
      }
    },

    // v-if index1,index2 is equal to the position of any mine, show mine
    populateTileWithMine: function (index1, index2) {
      // return true or false
      for (let i = 0; i < this.mine_positions.length; i++) {
        if (
          this.mine_positions[i].mine_x == index1 + 1 &&
          this.mine_positions[i].mine_y == index2 + 1
        ) {
          console.log("mine HERE");
          return true;
        } else {
          console.log("mine NOT HERE");
        }
      }
      return false;
    },
    startGame: function () {
      this.mine_positions = [];
      this.generateMines();
      this.populateTileWithMine();
    },
  },
});

// example of what mine_positions should look like
// mine_positions = [ 1: { width: 0, height: 0 } ];
