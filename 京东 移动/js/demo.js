// addLoadEvent(headerScroll);
addLoadEvent(scTime);

// function headerScroll () {
//     // 获取搜索框
//     var headerDom = document.querySelector('.jd_header');
//     var navDom = document.querySelector('.jd_nav');

//     // 计算总距离
//     var total_Height = navDom.offsetHeight + getElementPosition(navDom).top;

//     document.onscroll = function () {
//         // 计算滚动距离
//         var scrollH = getScrollOffset().y;
//         // 得出百分比作为透明度的值
//         var percent = scrollH / total_Height;
//         // 判断值是否符合要求
//         if(percent > 1) {
//             percent = 1;
//         }
//         // 赋值
//         headerDom.style.background = 'rgba(250,0,0,'+percent+')';
//     }
// }

function scTime() {
    // 获取数字
    var timeDom = document.querySelector('.sc_time');
    var span = timeDom.children;
    // 赋初始值
    // span[1].innerText = 4;
    // span[3].innerText = 0;
    // span[4].innerText = 0;
    // span[6].innerText = 0;
    // span[7].innerText = 0;
    // 定时器，每秒减一，零到九循环
    // var timer = setInterval(function () {
    //     span[7].innerText--;
    //     if(span[7].innerText < 0) {
    //         span[7].innerText = 9;
    //         span[6].innerText--;
    //         if(span[6].innerText < 0) {
    //             span[6].innerText = 5;
    //             span[4].innerText--;
    //             if(span[4].innerText < 0) {
    //                 span[4].innerText = 9;
    //                 span[3].innerText--;
    //                 if(span[3].innerText < 0) {
    //                     span[3].innerText = 5;
    //                     span[1].innerText--;
    //                     if(span[1].innerText < 0) {
    //                         span[1].innerText = 0;
    //                         span[3].innerText = 0;
    //                         span[4].innerText = 0;
    //                         span[6].innerText = 0;
    //                         span[7].innerText = 0;
    //                         clearInterval(timer);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }, 1000);

    //另一种方法
    var time = 3 * 60 * 60;
    var hour = Math.floor(time / 3600);
    var min = Math.floor(time % 3600 / 60);
    var sec = Math.floor(time % 60);

    span[1].innerHTML = hour;
    span[3].innerHTML = Math.floor(min / 10);
    span[4].innerHTML = min % 10;
    span[6].innerHTML = Math.floor(sec / 10);
    span[7].innerHTML = sec % 10;
    var timer = setInterval(function () {
        time--;
        if (time < 0) {
            clearInterval(timer);
        }
        hour = Math.floor(time / 3600);
        min = Math.floor(time % 3600 / 60);
        sec = Math.floor(time % 60);

        span[1].innerHTML = hour;
        span[3].innerHTML = Math.floor(min / 10);
        span[4].innerHTML = min % 10;
        span[6].innerHTML = Math.floor(sec / 10);
        span[7].innerHTML = sec % 10;
    }, 1000)
}