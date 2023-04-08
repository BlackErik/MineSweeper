var app = new Vue({
  el: "#app",
  data: {
    height_of_board: 15,
    width_of_board: 15,
    num_of_mines: 30,
    mine_positions: [],
    mine_positions_text: "",
    clicked_tiles: [],
    flagged_tiles: [],
    number_tiles: [],
    covered_tiles: [],
  },
  methods: {
    tileClick: function (index1, index2) {
      let tile_clicked = `x${index1 + 1}y${index2 + 1}`;
      if (
        !this.clicked_tiles.includes(tile_clicked) &&
        !this.flagged_tiles.includes(tile_clicked)
      ) {
        this.clicked_tiles.push(tile_clicked);
      } else {
        return;
      }
      console.log(`clicked tiles: ${this.clicked_tiles}`);
      console.log(`clicked tile: ${tile_clicked}`);

      let tile_x = index1 + 1;
      let tile_y = index2 + 1;

      this.adjacentTileCheck(tile_x, tile_y);
    },

    adjacentTileCheck: function (tile_x, tile_y) {
      if (
        tile_x >= 0 &&
        tile_x <= this.width_of_board &&
        tile_y >= 0 &&
        tile_y <= this.height_of_board
      ) {
        let tile_pos = `x${tile_x}y${tile_y}`;
        if (
          !this.number_tiles.includes(tile_pos) &&
          !this.mine_positions_text.includes(tile_pos)
        ) {
          let tile_pos_1 = `x${tile_x - 1}y${tile_y - 1}`;
          let tile_pos_2 = `x${tile_x}y${tile_y - 1}`;
          let tile_pos_3 = `x${tile_x + 1}y${tile_y - 1}`;

          let tile_pos_4 = `x${tile_x - 1}y${tile_y}`;
          let tile_pos_5 = `x${tile_x + 1}y${tile_y}`;

          let tile_pos_6 = `x${tile_x - 1}y${tile_y + 1}`;
          let tile_pos_7 = `x${tile_x}y${tile_y + 1}`;
          let tile_pos_8 = `x${tile_x + 1}y${tile_y + 1}`;

          if (
            !this.clicked_tiles.includes(tile_pos_1) &&
            !this.flagged_tiles.includes(tile_pos_1) &&
            !this.mine_positions_text.includes(tile_pos_1)
          ) {
            let y = tile_pos_1.indexOf("y");
            let x_pos = +tile_pos_1.slice(1, y);
            let y_pos = +tile_pos_1.slice(y + 1);
            this.clicked_tiles.push(tile_pos_1);
            this.adjacentTileCheck(x_pos, y_pos);
          }

          if (
            !this.clicked_tiles.includes(tile_pos_2) &&
            !this.flagged_tiles.includes(tile_pos_2) &&
            !this.mine_positions_text.includes(tile_pos_2)
          ) {
            let y = tile_pos_2.indexOf("y");
            let x_pos = +tile_pos_2.slice(1, y);
            let y_pos = +tile_pos_2.slice(y + 1);
            this.clicked_tiles.push(tile_pos_2);
            this.adjacentTileCheck(x_pos, y_pos);
          }

          if (
            !this.clicked_tiles.includes(tile_pos_3) &&
            !this.flagged_tiles.includes(tile_pos_3) &&
            !this.mine_positions_text.includes(tile_pos_3)
          ) {
            let y = tile_pos_3.indexOf("y");
            let x_pos = +tile_pos_3.slice(1, y);
            let y_pos = +tile_pos_3.slice(y + 1);
            this.clicked_tiles.push(tile_pos_3);
            this.adjacentTileCheck(x_pos, y_pos);
          }

          if (
            !this.clicked_tiles.includes(tile_pos_4) &&
            !this.flagged_tiles.includes(tile_pos_4) &&
            !this.mine_positions_text.includes(tile_pos_4)
          ) {
            let y = tile_pos_4.indexOf("y");
            let x_pos = +tile_pos_4.slice(1, y);
            let y_pos = +tile_pos_4.slice(y + 1);
            this.clicked_tiles.push(tile_pos_4);
            this.adjacentTileCheck(x_pos, y_pos);
          }

          if (
            !this.clicked_tiles.includes(tile_pos_5) &&
            !this.flagged_tiles.includes(tile_pos_5) &&
            !this.mine_positions_text.includes(tile_pos_5)
          ) {
            let y = tile_pos_5.indexOf("y");
            let x_pos = +tile_pos_5.slice(1, y);
            let y_pos = +tile_pos_5.slice(y + 1);
            this.clicked_tiles.push(tile_pos_5);
            this.adjacentTileCheck(x_pos, y_pos);
          }

          if (
            !this.clicked_tiles.includes(tile_pos_6) &&
            !this.flagged_tiles.includes(tile_pos_6) &&
            !this.mine_positions_text.includes(tile_pos_6)
          ) {
            let y = tile_pos_6.indexOf("y");
            let x_pos = +tile_pos_6.slice(1, y);
            let y_pos = +tile_pos_6.slice(y + 1);
            this.clicked_tiles.push(tile_pos_6);
            this.adjacentTileCheck(x_pos, y_pos);
          }

          if (
            !this.clicked_tiles.includes(tile_pos_7) &&
            !this.flagged_tiles.includes(tile_pos_7) &&
            !this.mine_positions_text.includes(tile_pos_7)
          ) {
            let y = tile_pos_7.indexOf("y");
            let x_pos = +tile_pos_7.slice(1, y);
            let y_pos = +tile_pos_7.slice(y + 1);
            this.clicked_tiles.push(tile_pos_7);
            this.adjacentTileCheck(x_pos, y_pos);
          }

          if (
            !this.clicked_tiles.includes(tile_pos_8) &&
            !this.flagged_tiles.includes(tile_pos_8) &&
            !this.mine_positions_text.includes(tile_pos_8)
          ) {
            let y = tile_pos_8.indexOf("y");
            let x_pos = +tile_pos_8.slice(1, y);
            let y_pos = +tile_pos_8.slice(y + 1);
            this.clicked_tiles.push(tile_pos_8);
            this.adjacentTileCheck(x_pos, y_pos);
          }
        }
      }
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
        if (!this.covered_tiles.includes(tile_pos)) {
          this.covered_tiles.push(tile_pos);
        }
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
      this.covered_tiles = [];
      this.mine_positions_text = "";
      this.generateMines();
      this.populateTileWithMine();
      this.populateTileWithNumber();
    },
  },
});

// example of what mine_positions should look like
// mine_positions = [ 1: { width: 0, height: 0 } ];
