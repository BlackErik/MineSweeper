var app = new Vue({
  el: "#app",
  data: {
    height_of_board: 10,
    width_of_board: 10,
    num_of_mines: 10,
    mine_positions: [],
    mine_positions_text: "",
    clicked_tiles: [],
    flagged_tiles: [],
    number_tiles: [],
  },
  methods: {
    tileClick: function (index1, index2) {
      let tile_clicked = `x${index1 + 1}y${index2 + 1}`;
      if (
        !this.clicked_tiles.includes(tile_clicked) &&
        !this.flagged_tiles.includes(tile_clicked)
      ) {
        this.clicked_tiles.push(tile_clicked);
      }
      console.log(`clicked tiles: ${this.clicked_tiles}`);
    },

    tileRightClick: function (index1, index2, e) {
      e.preventDefault();
      console.log("rightclicked");
      let tile_flagged = `x${index1 + 1}y${index2 + 1}`;
      if (!this.flagged_tiles.includes(tile_flagged)) {
        this.flagged_tiles.push(tile_flagged);
      } else {
        let existingFlag = this.flagged_tiles.indexOf(tile_flagged);
        this.flagged_tiles.splice(existingFlag, 1);
      }
      console.log(`flagged tiles: ${this.flagged_tiles}`);
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
      console.log(`mines: ${mines}`);
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
      if (adjacent_mines > 0) {
        if (!this.number_tiles.includes(tile_pos)) {
          this.number_tiles.push(tile_pos);
        }
      }
      return adjacent_mines;
    },

    tileCovered: function (index1, index2) {
      let tile_pos = `x${index1 + 1}y${index2 + 1}`;
      if (!this.clicked_tiles.includes(tile_pos)) {
        return true;
      }
    },

    tileFlagged: function (index1, index2) {
      let tile_pos = `x${index1 + 1}y${index2 + 1}`;
      if (this.flagged_tiles.includes(tile_pos)) {
        return true;
      }
    },

    startGame: function () {
      this.mine_positions = [];
      this.clicked_tiles = [];
      this.flagged_tiles = [];
      this.number_tiles = [];
      this.mine_positions_text = "";
      this.generateMines();
      this.populateTileWithMine();
      this.populateTileWithNumber();
    },
  },
});

// example of what mine_positions should look like
// mine_positions = [ 1: { width: 0, height: 0 } ];
