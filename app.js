var app = new Vue({
  el: "#app",
  data: {
    // easy: 9x9 10m
    // medium: 16x16 40m
    // hard: 30x16 99m
    // extreme: 30x24 160m
    height_of_board: 9,
    width_of_board: 9,
    num_of_mines: 10,
    mine_positions: [],
    mine_positions_text: "",
    clicked_tiles: [],
    flagged_tiles: [],
    number_tiles: [],
    covered_tiles: [],
    win_lose_text: "",
    flagged_mines: 0,
    initial_click: true,
  },
  methods: {
    easyMode() {
      this.height_of_board = 9;
      this.width_of_board = 9;
      this.num_of_mines = 10;
      this.startGame();
    },
    mediumMode() {
      this.height_of_board = 16;
      this.width_of_board = 16;
      this.num_of_mines = 40;
      this.startGame();
    },
    hardMode() {
      this.height_of_board = 30;
      this.width_of_board = 16;
      this.num_of_mines = 99;
      this.startGame();
    },
    extremeMode() {
      this.height_of_board = 30;
      this.width_of_board = 24;
      this.num_of_mines = 160;
      this.startGame();
    },
    firstClick: function (index1, index2) {
      if (this.initial_click === true) {
        let tile_clicked = `x${index1 + 1}y${index2 + 1}`;

        this.tileClick(index1, index2);
        if (
          this.mine_positions_text.includes(tile_clicked) ||
          this.clicked_tiles.length < 9
        ) {
          this.startOverFirstClick(index1, index2);
          this.firstClick(index1, index2);
        } else {
          this.initial_click = false;
        }
      }
    },

    tileClick: function (index1, index2) {
      let tile_clicked = `x${index1 + 1}y${index2 + 1}`;
      if (
        !this.clicked_tiles.includes(tile_clicked) &&
        !this.flagged_tiles.includes(tile_clicked)
      ) {
        this.clicked_tiles.push(tile_clicked);
        let index = this.covered_tiles.indexOf(tile_clicked);
        this.covered_tiles.splice(index, 1);

        this.winCheck();

        if (this.mine_positions_text.includes(tile_clicked)) {
          this.win_lose_text = "YOU LOST";
        }
      } else {
        return;
      }

      let tile_x = index1 + 1;
      let tile_y = index2 + 1;

      this.adjacentTileCheck(tile_x, tile_y);
    },

    tileDoubleClick: function (index1, index2) {
      let tile_x = index1;
      let tile_y = index2;

      let tile_pos_1 = `x${tile_x - 1}y${tile_y - 1}`;
      let tile_pos_2 = `x${tile_x}y${tile_y - 1}`;
      let tile_pos_3 = `x${tile_x + 1}y${tile_y - 1}`;

      let tile_pos_4 = `x${tile_x - 1}y${tile_y}`;
      let tile_pos_5 = `x${tile_x + 1}y${tile_y}`;

      let tile_pos_6 = `x${tile_x - 1}y${tile_y + 1}`;
      let tile_pos_7 = `x${tile_x}y${tile_y + 1}`;
      let tile_pos_8 = `x${tile_x + 1}y${tile_y + 1}`;

      var tile_pos_array = [
        tile_pos_1,
        tile_pos_2,
        tile_pos_3,
        tile_pos_4,
        tile_pos_5,
        tile_pos_6,
        tile_pos_7,
        tile_pos_8,
      ];

      for (let i = 0; i < tile_pos_array.length; i++) {
        if (!this.flagged_tiles.includes(tile_pos_array[i])) {
          let y = tile_pos_array[i].indexOf("y");
          let x_pos = +tile_pos_array[i].slice(1, y);
          let y_pos = +tile_pos_array[i].slice(y + 1);

          this.tileClick(x_pos, y_pos);
        }
      }
    },

    adjacentTileCheck: function (tile_x, tile_y) {
      if (
        tile_x >= 0 &&
        tile_x <= this.width_of_board + 1 &&
        tile_y >= 0 &&
        tile_y <= this.height_of_board + 1 &&
        tile_x - 1 >= 0 &&
        tile_y - 1 >= 0 &&
        tile_x + 1 <= this.width_of_board + 1 &&
        tile_y + 1 <= this.height_of_board + 1
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

          let tile_pos_array = [
            tile_pos_1,
            tile_pos_2,
            tile_pos_3,
            tile_pos_4,
            tile_pos_5,
            tile_pos_6,
            tile_pos_7,
            tile_pos_8,
          ];

          for (let i = 0; i < tile_pos_array.length; i++) {
            if (
              !this.clicked_tiles.includes(tile_pos_array[i]) &&
              !this.flagged_tiles.includes(tile_pos_array[i]) &&
              !this.mine_positions_text.includes(tile_pos_array[i])
            ) {
              let y = tile_pos_array[i].indexOf("y");
              let x_pos = +tile_pos_array[i].slice(1, y);
              let y_pos = +tile_pos_array[i].slice(y + 1);

              let index = this.covered_tiles.indexOf(tile_pos_array[i]);
              this.covered_tiles.splice(index, 1);

              this.clicked_tiles.push(tile_pos_array[i]);

              this.adjacentTileCheck(x_pos, y_pos);
            }
          }
        }
      }
      this.winCheck();
    },

    tileRightClick: function (index1, index2, e) {
      e.preventDefault();
      let tile_flagged = `x${index1 + 1}y${index2 + 1}`;
      if (!this.flagged_tiles.includes(tile_flagged)) {
        this.flagged_tiles.push(tile_flagged);
        this.flagged_mines++;
      } else {
        let existingFlag = this.flagged_tiles.indexOf(tile_flagged);
        this.flagged_tiles.splice(existingFlag, 1);
        this.flagged_mines--;
      }
      this.winCheck();
    },

    preventRightClick(e) {
      e.preventDefault();
    },

    generateMines: function () {
      var mines = [];
      var i = 0;
      var mine = [];
      while (i < this.num_of_mines) {
        let width = Math.floor(Math.random() * this.width_of_board) + 1;
        let height = Math.floor(Math.random() * this.height_of_board) + 1;
        mine = `x${width}y${height}`;
        if (mines.length != 0) {
          if (mines.includes(mine)) {
          } else {
            mines.push(mine);
            i++;
          }
        } else {
          mines.push(mine);
          i++;
        }
      }
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

      var tile_pos_array = [
        tile_pos_1,
        tile_pos_2,
        tile_pos_3,
        tile_pos_4,
        tile_pos_5,
        tile_pos_6,
        tile_pos_7,
        tile_pos_8,
      ];

      for (let i = 0; i < tile_pos_array.length; i++) {
        if (this.mine_positions_text.includes(tile_pos_array[i])) {
          adjacent_mines++;
        }
      }

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

    winCheck: function () {
      var x = [...this.mine_positions_text];
      var y = [...this.covered_tiles];

      var count = 0;

      for (let i = 0; i < x.length; i++) {
        if (x.length === y.length) {
          if (x.includes(y[i])) {
            count++;
            if (count == x.length) {
              this.win_lose_text = "YOU WIN";
            }
          }
        }
      }
    },

    startGame: function () {
      this.mine_positions = [];
      this.clicked_tiles = [];
      this.flagged_tiles = [];
      this.number_tiles = [];
      this.covered_tiles = [];
      this.mine_positions_text = "";
      this.win_lose_text = "";
      this.flagged_mines = 0;
      this.generateMines();
      this.populateTileWithMine();
      this.populateTileWithNumber();
      this.initial_click = true;
    },

    startOverFirstClick: function (index1, index2) {
      this.mine_positions = [];
      this.clicked_tiles = [];
      this.flagged_tiles = [];
      this.number_tiles = [];
      this.covered_tiles = [];
      this.mine_positions_text = "";
      this.win_lose_text = "";
      this.flagged_mines = 0;
      this.generateMines();
      this.populateTileWithMine();
      this.populateTileWithNumber();
    },
  },
});
