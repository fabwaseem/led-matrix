# Easy LED Matrix

Easily turn a div into a beautiful LED matrix with full customizations.

## Installation

```
npm install @fabwaseem/easy-led-matrix
# or
$ yarn add @fabwaseem/easy-led-matrix
```

## Usage

```
import { LedMatrix } from 'easy-led-matrix';
#or
import { LedMatrix } from "https://www.unpkg.com/easy-led-matrix@1.1.1/index.min.js";

const container = document.querySelector(".container");
const matrix = new LedMatrix(container, config);
matrix.init()


```

## Config

```
{
  shape: "square" | "circle";
  size: number;
  color: string;
  amount: number;
  gap: number;
  litColor: string;
  fps: number;
  noise: number;
  background: string;
}
```

## Demo

Visit [demo ](https://fabwaseem.github.io/easy-led-matrix)for a working example of Matrix in action, then check out its [source on github](https://github.com/fabwaseem/led-matrix).
