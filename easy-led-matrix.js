export class LedMatrix {
  constructor(container, config = {}) {
    this.shape = config.shape || "square";
    this.size = config.size || 12;
    this.color = config.color || "#161819";
    this.amount = config.amount || 1000;
    this.gap = config.gap || 3;
    this.litColor = config.litColor || "#0080FF";
    this.fps = config.fps || 24;
    this.noise = config.noise || 0.01;
    this.background = config.background || "#000000";

    this.container = container;
    this.initialized = false;
    this.canvas = null;
    this.context = null;
    this.gridContext = null;
    this.litColors = null;
    this.gridCanvas = null;
    this.hOffset = null;
    this.vOffset = null;
    this.columns = null;
    this.rows = null;
    this.interval = null;
  }

  updateCells() {
    this.litColors = this.litColors.map(([x, y]) => {
      return [
        Math.random() > 1 - this.noise
          ? Math.floor(Math.random() * this.columns)
          : x,
        Math.random() > 1 - this.noise
          ? Math.floor(Math.random() * this.rows)
          : y,
      ];
    });
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(
      this.gridCanvas,
      0,
      0,
      this.gridCanvas.width,
      this.gridCanvas.height
    );
    this.updateCells();

    for (let i = 0; i < this.litColors.length; i++) {
      const [x, y] = this.litColors[i];
      this.context.fillStyle = this.litColor;

      // shape
      switch (this.shape) {
        case "square":
          this.context.fillRect(
            x * this.size + this.hOffset,
            y * this.size + this.vOffset,
            this.size - this.gap,
            this.size - this.gap
          );
          break;

        case "circle":
          this.context.beginPath();
          this.context.arc(
            x * this.size + this.hOffset,
            y * this.size + this.vOffset,
            this.size * 0.5 - this.gap,
            0,
            Math.PI * 2
          );
          this.context.fill();
          break;
      }
    }
  }

  setGrid() {
    this.gridContext.clearRect(
      0,
      0,
      this.gridCanvas.width,
      this.gridCanvas.height
    );
    this.gridContext.fillStyle = this.color;
    this.columns = Math.ceil(this.gridCanvas.width / this.size);
    this.hOffset = (this.gridCanvas.width % this.size) * 0.5;
    this.rows = Math.ceil(this.gridCanvas.height / this.size);
    this.vOffset = (this.gridCanvas.height % this.size) * 0.5;

    // shape
    switch (this.shape) {
      case "square":
        for (let h = 0; h < this.columns; h++) {
          for (let v = 0; v < this.rows; v++) {
            this.gridContext.fillRect(
              h * this.size + this.hOffset,
              v * this.size + this.vOffset,
              this.size - this.gap,
              this.size - this.gap
            );
          }
        }
        break;

      case "circle":
        for (let h = 0; h < this.columns; h++) {
          for (let v = 0; v < this.rows; v++) {
            this.gridContext.beginPath();
            this.gridContext.arc(
              h * this.size + this.hOffset,
              v * this.size + this.vOffset,
              this.size * 0.5 - this.gap,
              0,
              Math.PI * 2
            );
            this.gridContext.fill();
          }
        }
        break;
    }

    this.litColors = new Array(this.amount)
      .fill(0)
      .map(() => [
        Math.floor(Math.random() * this.columns),
        Math.floor(Math.random() * this.rows),
      ]);
  }

  refresh() {
    this.container.style.setProperty("background-color", this.background);
    this.canvas.width = this.gridCanvas.width = this.container.clientWidth;
    this.canvas.height = this.gridCanvas.height = this.container.clientHeight;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.setGrid();
    requestAnimationFrame(() => this.draw());
    clearInterval(this.interval);
    this.interval = setInterval(() => this.draw(), 1000 / this.fps);
  }

  init() {
    if (this.initialized) return;
    let canvas = document.createElement("canvas");
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.gridCanvas = document.createElement("canvas");
    this.gridContext = this.gridCanvas.getContext("2d");
    this.container.appendChild(canvas);

    window.addEventListener("resize", () => this.refresh());
    this.refresh();
    this.initialized = true;
  }

  updateConfig(config) {
    this.shape = config.shape;
    this.size = config.size;
    this.color = config.color;
    this.amount = config.amount;
    this.gap = config.gap;
    this.litColor = config.litColor;
    this.fps = config.fps;
    this.noise = config.noise;
    this.background = config.background;
    this.refresh();
  }
}
