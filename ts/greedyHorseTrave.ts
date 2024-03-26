/**
 * 马踏棋盘
 * 马走日,探究马走多少步走完整个期盼
 */

class HouseTraveList {
  x!: number; // 棋盘列数
  y!: number; // 棋盘行数
  visited: any;
  finished!: boolean;  // 标识,标志马儿是否走完所有棋盘
  
  // 递增排序  主要找出当前贪心策略最小代价的下一步
  sort = (v1: any, v2: any) => {
    let count1 = this.next(v1).length
    let count2 = this.next(v2).length
    if(count1 < count2) {
      return -1;
    } else if (count1 == count2) {
      return 0
    } else {
      return -1
    }
  }

  /**
   * 
   * @param chessboard 棋盘
   * @param row 行
   * @param col 列
   * @param step 步数
   */
  // 贪心策略
  traveGreedy(chessboard: any, row: any, col: any, step = 1) {
    // 标记格子是第几步
    chessboard[row][col] = step;
    console.log('棋盘走的步骤2：', chessboard);
    // 标记访问
    this.visited[row * this.x + col] = true
    // 获取当前下一步集合
    let pointNextList = this.next(new Point(col, row))
    // 执行递增排序
    pointNextList.sort(this.sort)
    // 递归执行
    while (pointNextList.length > 0) {
      console.log('pointNextList', pointNextList)
      // 取最小集合
      let p = pointNextList.shift()
      // 判断是否访问
      if (!this.visited[p.y * this.x + p.x]) {
        // 未访问  递归到下一步
        this.traveGreedy(chessboard, p.y, p.x, step + 1)
      }
    }
    //判断马儿是否完成了任务
    //如果没有达到数量，则表示没有完成任务，将整个棋盘置0
    //说明：step < this.x * this.y成立的情况有两种
    //1.棋盘到目前位置，棋盘没有走完
    //2。棋盘处于一个回溯过程
    // if (step < this.x * this.y && !this.finished) {
    //   chessboard[row][col] = 0;
    //   this.visited[row * this.x + col] = false;
    // } else {
    //     this.finished = true;
    // }
  }

  // next  下一步集合
  next(currentPoint: any) {
    let list: any = [];
    // let p1 = new Point()
    // 左二上一位置
    if(currentPoint.x - 2 >= 0 && currentPoint.y - 1 >= 0) {
      list.push(new Point(currentPoint.x - 2, currentPoint.y - 1))
    }
    // 左一上二位置
    if(currentPoint.x - 1 >= 0 && currentPoint.y - 2 >= 0) {
      list.push(new Point(currentPoint.x - 1, currentPoint.y - 2))
    }
    // 左二下一位置
    if(currentPoint.x - 2 >= 0 && currentPoint.y + 1 <= this.y) {
      list.push(new Point(currentPoint.x - 2, currentPoint.y + 1))
    }
    // 左一下二位置
    if(currentPoint.x - 1 >= 0 && currentPoint.y + 2 <= this.y) {
      list.push(new Point(currentPoint.x - 1, currentPoint.y + 2))
    }
    // 右一下二位置
    if(currentPoint.x + 1 <= this.x && currentPoint.y + 2 <= this.y) {
      list.push(new Point(currentPoint.x + 1, currentPoint.y + 2))
    }
    // 右二下一位置
    if(currentPoint.x + 2 <= this.x && currentPoint.y + 1 <= this.y) {
      list.push(new Point(currentPoint.x + 2, currentPoint.y + 1))
    }
    // 右二上一位置
    if(currentPoint.x + 2 <= this.x && currentPoint.y - 1 >= 0) {
      list.push(new Point(currentPoint.x + 2, currentPoint.y - 1))
    }
    // 右一上二位置
    if(currentPoint.x + 1 <= this.x && currentPoint.y - 2 >= 0) {
      list.push(new Point(currentPoint.x + 1, currentPoint.y - 2))
    }
    return list;
  }
}

class Point {
  x: number;
  y: number;
  constructor(x: any, y: any) {
    this.x = x;
    this.y = y;
  }
}
//测试骑士周游算法
let x = 3, y = 3;
let test = new HouseTraveList();
test.x = x;
test.y = y;

let row = 2;//马儿初始位置的行，1
let column = 2;//马儿初始位置的列，1
//创建棋盘
let chessboard = new Array(y);
for (let i = 0; i < y; i++) {
    chessboard[i] = new Array(x).fill(0);
}
console.log('棋盘走的步骤：', chessboard);
test.visited = new Array(x * y).fill(false);
test.traveGreedy(chessboard, row - 1, column - 1, 1);
//输出棋盘
// console.log('棋盘走的步骤：', chessboard);
console.log(test);
