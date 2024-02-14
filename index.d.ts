export class LedMatrix {
  constructor(container: HTMLElement, config?: LedMatrixConfig);
  updateCells(): void;
  draw(): void;
  setGrid(): void;
  refresh(): void;
  init(): void;
  updateConfig(config: LedMatrixConfig): void;
}

export interface LedMatrixConfig {
  shape?: "square" | "circle";
  size?: number;
  color?: string;
  amount?: number;
  gap?: number;
  litColor?: string;
  fps?: number;
  noise?: number;
  background?: string;
}
