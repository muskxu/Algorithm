/**
 * 贪心策略
 * k1: [3, 6, 8, 7, 2, 1]
 * k2: [4, 6, 7, 5]
 * k3: [8, 2, 1, 6]
 * k4: [9, 6, 5, 1]
 * k5: [6, 2, 8, 4]
 * k6: [4, 6, 7, 2]
 * k7: [4, 3, 2, 1]
 * 以最小代价组合集合  该集合包含上述任意数组内所有值
 * 
 * 思想 以总集合listData为基准  每次从K1~k7中找出符合条件元素最多的集合  同时在listData中删除已找出的元素 依次类推直到 listData 长度为0
 */

// 创建集合
const mapData = {
  k1: [3, 6, 8, 7, 2, 1],
  k2: [4, 6, 7, 5],
  k3: [8, 2, 1, 6],
  k4: [9, 6, 5, 1],
  k5: [6, 2, 8, 4],
  k6: [4, 6, 7, 2],
  k7: [4, 3, 2, 1]
}

// 存放所有数字
let listData:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 空list 存放筛选出的集合
const selectList:string[] = []

// 临时集合用于对比最优子集
let tempSet:number[];

// 
let maxKey:string;

let maxSet:number[];

while (listData.length > 0) {
  maxKey = '';
  maxSet = [];
  tempSet = [];
  // 每次循环 找出含有 listData 中元素最多的集合  (maxSet maxKey 做为存储与索引标识)
  for (const [key, item] of Object.entries(mapData)) {
    // 取交集
    tempSet = item.filter(v => listData.includes(v))
    // maxKey 为null 是第一次取值   tempSet.length > maxSet.length 为后续取值做比较
    if (tempSet.length > 0 && (!maxKey || tempSet.length > maxSet.length)) {
      maxKey = key
      maxSet = tempSet
    }
  }
  console.log('maxSet', maxSet)
  // 每次循环找出的符合条件的最大集合放入selectList中, 同时删除 listData 和该集合重复的元素
  if(maxKey) {
    selectList.push(maxKey)
    listData = listData.filter(item => !(maxSet.includes(item)))
  }
}

console.log('selectList', selectList)