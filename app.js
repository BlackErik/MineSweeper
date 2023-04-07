var app = new Vue({
  el: "#app",
  data: {
    height_of_board: 10,
    width_of_board: 10,
    num_of_mines: 10,
    mine_positions: [],
    mine_positions_text: "",
  },
  methods: {
    testClick: function (index1, index2) {
      console.log(`X: ${index1 + 1}, Y: ${index2 + 1}`);
    },

    generateMines: function () {
      var mines = [];
      var i = 0;
      var mine = [];
      while (i < this.num_of_mines) {
        let width = Math.floor(Math.random() * this.width_of_board) + 1;
        let height = Math.floor(Math.random() * this.height_of_board) + 1;
        mine = `x${width}y${height}`;
        console.log("mine " + mine);
        if (mines.length != 0) {
          if (mines.includes(mine)) {
            console.log("this mine is equal to an already created mine");
          } else {
            mines.push(mine);
            i++;
          }
        } else {
          mines.push(mine);
          i++;
        }
      }
      console.log(mines);
      for (i in mines) {
        let y = mines[i].indexOf("y");
        var x_pos = mines[i].slice(1, y);
        var y_pos = mines[i].slice(y + 1);
        this.mine_positions.push({ mine_x: x_pos, mine_y: y_pos });
      }
      this.mine_positions_text = mines;
    },

    // v-if index1,index2 is equal to the position of any mine, show mine
    populateTileWithMine: function (index1, index2) {
      // return true or false
      for (let i = 0; i < this.mine_positions.length; i++) {
        if (
          this.mine_positions[i].mine_x == index1 + 1 &&
          this.mine_positions[i].mine_y == index2 + 1
        ) {
          return true;
        }
      }
      return false;
    },

    populateTileWithNumber: function (index1, index2) {
      let tile_x = index1 + 1;
      let tile_y = index2 + 1;

      var adjacent_mines = 0;

      let tile_pos = `x${tile_x}y${tile_y}`;

      if (this.mine_positions_text.includes(tile_pos)) {
        return;
      }

      let tile_pos_1 = `x${tile_x - 1}y${tile_y - 1}`;
      let tile_pos_2 = `x${tile_x}y${tile_y - 1}`;
      let tile_pos_3 = `x${tile_x + 1}y${tile_y - 1}`;

      let tile_pos_4 = `x${tile_x - 1}y${tile_y}`;
      let tile_pos_5 = `x${tile_x + 1}y${tile_y}`;

      let tile_pos_6 = `x${tile_x - 1}y${tile_y + 1}`;
      let tile_pos_7 = `x${tile_x}y${tile_y + 1}`;
      let tile_pos_8 = `x${tile_x + 1}y${tile_y + 1}`;

      if (this.mine_positions_text.includes(tile_pos_1)) {
        adjacent_mines++;
      }
      if (this.mine_positions_text.includes(tile_pos_2)) {
        adjacent_mines++;
      }
      if (this.mine_positions_text.includes(tile_pos_3)) {
        adjacent_mines++;
      }
      if (this.mine_positions_text.includes(tile_pos_4)) {
        adjacent_mines++;
      }
      if (this.mine_positions_text.includes(tile_pos_5)) {
        adjacent_mines++;
      }
      if (this.mine_positions_text.includes(tile_pos_6)) {
        adjacent_mines++;
      }
      if (this.mine_positions_text.includes(tile_pos_7)) {
        adjacent_mines++;
      }
      if (this.mine_positions_text.includes(tile_pos_8)) {
        adjacent_mines++;
      }
      // console.log(`tile ${tile_pos} has ${adjacent_mines} adjacent mines`);
      return adjacent_mines;
    },

    startGame: function () {
      this.mine_positions = [];
      this.generateMines();
      this.populateTileWithMine();
      this.populateTileWithNumber();
    },
  },
});

// example of what mine_positions should look like
// mine_positions = [ 1: { width: 0, height: 0 } ];
