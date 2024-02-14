export class LedMatrix {
  constructor(t, s) {
    (this.shape = s.shape || "square"),
      (this.size = s.size || 12),
      (this.color = s.color || "#161819"),
      (this.amount = s.amount || 1000),
      (this.gap = s.gap || 3),
      (this.litColor = s.litColor || "#0080FF"),
      (this.fps = s.fps || 24),
      (this.noise = s.noise || 0.01),
      (this.background = s.background || "#000000"),
      (this.container = t),
      (this.canvas = null),
      (this.context = null),
      (this.gridContext = null),
      (this.litColors = null),
      (this.gridCanvas = null),
      (this.hOffset = null),
      (this.vOffset = null),
      (this.columns = null),
      (this.rows = null),
      (this.interval = null),
      this.init();
  }
  updateCells() {
    this.litColors = this.litColors.map(([t, s]) => [
      Math.random() > 1 - this.noise
        ? Math.floor(Math.random() * this.columns)
        : t,
      Math.random() > 1 - this.noise
        ? Math.floor(Math.random() * this.rows)
        : s,
    ]);
  }
  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
      this.context.drawImage(
        this.gridCanvas,
        0,
        0,
        this.gridCanvas.width,
        this.gridCanvas.height
      ),
      this.updateCells();
    for (let t = 0; t < this.litColors.length; t++) {
      let [s, i] = this.litColors[t];
      switch (((this.context.fillStyle = this.litColor), this.shape)) {
        case "square":
          this.context.fillRect(
            s * this.size + this.hOffset,
            i * this.size + this.vOffset,
            this.size - this.gap,
            this.size - this.gap
          );
          break;
        case "circle":
          this.context.beginPath(),
            this.context.arc(
              s * this.size + this.hOffset,
              i * this.size + this.vOffset,
              0.5 * this.size - this.gap,
              0,
              2 * Math.PI
            ),
            this.context.fill();
      }
    }
  }
  setGrid() {
    switch (
      (this.gridContext.clearRect(
        0,
        0,
        this.gridCanvas.width,
        this.gridCanvas.height
      ),
      (this.gridContext.fillStyle = this.color),
      (this.columns = Math.ceil(this.gridCanvas.width / this.size)),
      (this.hOffset = (this.gridCanvas.width % this.size) * 0.5),
      (this.rows = Math.ceil(this.gridCanvas.height / this.size)),
      (this.vOffset = (this.gridCanvas.height % this.size) * 0.5),
      this.shape)
    ) {
      case "square":
        for (let t = 0; t < this.columns; t++)
          for (let s = 0; s < this.rows; s++)
            this.gridContext.fillRect(
              t * this.size + this.hOffset,
              s * this.size + this.vOffset,
              this.size - this.gap,
              this.size - this.gap
            );
        break;
      case "circle":
        for (let i = 0; i < this.columns; i++)
          for (let h = 0; h < this.rows; h++)
            this.gridContext.beginPath(),
              this.gridContext.arc(
                i * this.size + this.hOffset,
                h * this.size + this.vOffset,
                0.5 * this.size - this.gap,
                0,
                2 * Math.PI
              ),
              this.gridContext.fill();
    }
    this.litColors = Array(this.amount)
      .fill(0)
      .map(() => [
        Math.floor(Math.random() * this.columns),
        Math.floor(Math.random() * this.rows),
      ]);
  }
  refresh() {
    (this.canvas.width = this.gridCanvas.width = this.container.clientWidth),
      (this.canvas.height = this.gridCanvas.height =
        this.container.clientHeight),
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
      this.setGrid(),
      requestAnimationFrame(() => this.draw()),
      clearInterval(this.interval),
      (this.interval = setInterval(() => this.draw(), 1e3 / this.fps));
  }
  init() {
    let t = this.container;
    (t.innerHTML = ""),
      t.style.setProperty("background-color", this.background),
      (t.className = "container");
    let s = document.createElement("canvas");
    (this.gridCanvas = document.createElement("canvas")),
      (this.gridContext = this.gridCanvas.getContext("2d")),
      t.appendChild(s),
      (this.canvas = s),
      (this.context = s.getContext("2d")),
      window.addEventListener("resize", () => this.refresh()),
      this.refresh();
  }
  updateConfig(t) {
    (this.shape = t.shape),
      (this.size = t.size),
      (this.color = t.color),
      (this.amount = t.amount),
      (this.gap = t.gap),
      (this.litColor = t.litColor),
      (this.fps = t.fps),
      (this.noise = t.noise),
      (this.background = t.background),
      this.refresh();
  }
}