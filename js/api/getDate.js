/**
 * 获取每个月的天数
 */

// 第一种方法
// 利用溢出的逻辑
function getMonthDays(year, month) {
  return 32 - new Date(year, month-1, 32).getDate();
}

// 第二种方法
// 第 0 天即上个月的最后一天
function getMonthDays2(year, month) {
  return new Date(year, month, 0).getDate()
}