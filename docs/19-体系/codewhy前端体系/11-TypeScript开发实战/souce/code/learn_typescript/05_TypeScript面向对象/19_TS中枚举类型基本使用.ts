// 定义枚举类型
enum Direction {
  LEFT,
  RIGHT
}

const d1: Direction = Direction.LEFT

function turnDirection(direction: Direction) {
  switch(direction) {
    case Direction.LEFT:
      console.log("角色向左移动一个格子")
      break
    case Direction.RIGHT:
      console.log("角色向右移动一个格子")
      break
  }
}

// 监听键盘的点击
turnDirection(Direction.LEFT)

export {}

