// 定义枚举类型
// enum Direction {
//   LEFT = 0,
//   RIGHT = 1
// }

// enum Direction {
//   LEFT = 100,
//   RIGHT
// }

enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

enum Operation {
  Read = 1 << 0,
  Write = 1 << 1,
  foo = 1 << 2,
}

const d1: Direction = Direction.LEFT;

export {};
