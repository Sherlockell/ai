export interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export interface Connection {
  from: number;
  to: number;
}