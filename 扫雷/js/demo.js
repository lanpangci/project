// 生成100个方格
// 生成10个雷
// 左击--》雷，游戏结束
// 左击--》非0，出现数字，代表周围雷数
// 左击--》零，扩散
// 右击--》红旗
// 有数字的地方不能插红旗，有红旗的地方不能左击
// 插一个红旗，score减一，如果雷全部被标记，游戏结束
var box = document.getElementById('box');
var btn = document.getElementById('btn');
var alertBox = document.getElementById('alertBox');
var alertImg = document.getElementById('alertImg');
var score = document.getElementById('score');
var close = document.getElementById('close');
var isLei;
var key = true;

gameStart();


function gameStart() {
    if (key) {
        key = false;
        btn.onclick = function () {
            init();
            //取消默认右击事件
            box.oncontextmenu = function () {
                return false;
            }
            // 点击事件
            box.onmousedown = function (event) {
                var event = event || window.event;
                var target = event.target;
                if (event.which == 1) {
                    leftClick(target);
                } else if (event.which == 3) {
                    rightClick(target);
                }
            }
            close.onclick = function () {
                alertBox.style.display = 'none';
                box.style.display = 'none';
                score.innerText = 10;
                score.style.display = 'none'
                judge = [];
                box.innerHTML = '';
                key = true;
            }
        }
    }
}
function init() {
    var mineNum = 10;
    //显示边框
    box.style.display = 'block';
    score.style.display = 'inline';
    var judge = [];
    // 生成100个格子
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var div = document.createElement('div');
            div.classList.add('smallBox');
            div.setAttribute('id', i + '-' + j);
            box.appendChild(div);
            judge.push({ isLei: 0 });
        }
    }
    // 生成10个雷
    while (mineNum) {
        var mineSerial = Math.floor(Math.random() * 100);
        if (judge[mineSerial].isLei == 0) {
            judge[mineSerial].isLei = 1;
            box.children[mineSerial].classList.add('isLei');
            mineNum--;
        }
    }
    isLei = document.getElementsByClassName('isLei');
}

//左击事件
function leftClick(dom) {
    if (dom.classList.contains('check')) {
        return false;
    }
    if (dom.classList.contains("isLei")) {
        //点击的是雷
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add("show");
        }
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = "url(img/end0.png)";
        }, 1000);
    }
    //点击的不是雷
    else {
        //数字不为0，直接显示
        var num = 0;
        var numX = +dom.id.split('-')[0]; //取出的是字符
        var numY = +dom.id.split('-')[1];
        for (var i = numX - 1; i <= numX + 1; i++) {
            for (var j = numY - 1; j <= numY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isLei')) {
                    num++;
                }
            }
        }
        dom.classList.add('num');
        dom.innerText = num;
        if (num == 0) {
            for (var i = numX - 1; i <= numX + 1; i++) {
                for (var j = numY - 1; j <= numY + 1; j++) {
                    var aroundBox = document.getElementById(i + '-' + j); //即使没有取到值，还是会返回null
                    if (aroundBox && !aroundBox.classList.contains('checked')) {
                        aroundBox.classList.add('checked');
                        leftClick(aroundBox);
                    }
                }
            }
        }
    }
}

function rightClick(dom) {
    var success = true;
    if (dom.classList.contains('num')) {
        return false;
    }
    if (score.innerText > 0 && !dom.classList.contains('check')) {
        dom.classList.toggle('check');
        score.innerText--;
    } else if (dom.classList.contains('check')) {
        dom.classList.toggle('check');
        score.innerText++;
    }
    if (score.innerText == 0) {
        for (var i = 0; i < isLei.length; i++) {
            if (!isLei[i].classList.contains('check')) {
                success = false;
            }
        }
        if (success) {
            setTimeout(function () {
                alertBox.style.display = 'block';
                alertImg.style.backgroundImage = 'url(img/success.png)';
            }, 500)
        }
    }

}
