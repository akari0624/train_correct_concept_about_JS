console.log(1)
async function async1(){
  console.log(2)
  await async2()
  console.log(3)
}

async function async2() {
  console.log(4)
}

process.nextTick(function(){
  console.log(5)
})

setTimeout(function(){
  console.log(6)
  process.nextTick(function(){
  console.log(7)
})

  new Promise(function(resolve){
    console.log(8)
    resolve()  
  }).then(function(){

    console.log(9)
  })
})

async1()

new Promise(function(resolve) {
  console.log(10)  // 這行code是同步的
  resolve()
}).then(function(){
  console.log(11)
})

console.log(12)


// the print order of console.log should be ??

//    1
//    2
//    4
//    10
//    12
//    5
//    11
//    3
//    6
//    8
//    7
//    9


// 現今的瀏覽器的event queue的實作有分為 macroTaskQueue跟 microTaskQueue,
// 在程式執行的一開始當然是先執行macroTask裡的任務，在執行下一個macroTask任務前  會去看microTaskQueue， microTask沒做完前，不會去做下一個macroTask任務來做，一但microTask有新任務，macroTask那裡在做完一個任務之後 
//   執行順序會先中止，先繼續做microTask

// new Promise(.....)  裡的任務是microTask的  new Promise(....)裡的任務是 一定義完就會先執行,
// ＊＊＊＊＊ promise裡的 cb裡程式碼 有同步的片段的時候  照樣會先執行，並不是整個cb被加到 microTask裡
// then(...)裡的是`再`被加到microTask裡 (用`再` 就是代表說，其實不是接連著做，是把一個任務丟到microTaskQueue裡)

//  setTimeout裡的任務是屬於 macroTask
// async/await裡的任務一樣是 microTask  async/await就是 new Promise(...).then的 syntax sugar
// process.nextTick 裡的任務也是被加到microTask
//  process.nextTick被設計出來的目的是要等js的code都被parse完才做事的async API

// 在處理一個macroTask的當下，那個task可能也在持續往microTask裡加任務