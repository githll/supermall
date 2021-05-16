export function debounce(func, delay) {
  //用于接收每次进来的变量
  let  timer = null
  //返回一个函数，可以进行传值 ...代表可传入多个参数
  return function (...args) {
    //判断是否有值，如果有就先清空,没有值就执行setTimeout
    if(timer) clearTimeout(timer)
    //延时执行传入进来的函数，赋值给timer
    timer = setTimeout( () => {
      //执行传入进来的函数
      func.apply(this,args)
    },delay)
  }
}

export function formatDate(date, fmt) {
  //1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4-RegExp.$1.length));
  }
  let  o = {
    'M+' : date.getMonth() + 1,
    'd+' : date.getDate(),
    'h+' : date.getHours(),
    'm+' : date.getMinutes(),
    's+' : date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let  str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
