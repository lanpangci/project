//阻止默认事件
function cancelHeadler(event) {
    if(event.preventDefault) {
        event.preventDefault();
    }else {
        event.returnValue = false;
    }
}

//取消冒泡
function stopBubble(event) {
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble  = true;
    }
}

//事件原对象
function srcElem(event) {
    var target;
    target = event.target || event.srcElement;
    return target;
}

//拖拽
function drag(elem) {
    
}

//异步加载
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if(script.readState) { //ie
        script.onreadstatechange = function () {
            if(script.readState == 'complete' || script.readState == 'loaded') {
                tools[callback]; //要调用url里的函数tools
            }else {
                script.onload = function () {
                    tools[callback]();
                }
            }
        }
    }
    script.src = url;
    document.head.appendChild(script);
}

//使用onload加载多个函数
function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof(window.onload) != "function") {
        window.onload = func;
    }else {
        window.onload = function () {
            oldonload();
            func();
        }
    }

}

//insertAfter()
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    // if(targetElement.nextElementSibling) {
    //     parent.insertBefore(newElement, targetElement.nextElementSiBling);
    // }else {
    //     parent.appendChild(newElement);
    // }
    if(parent.lastElementChild == targetElement) {
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement, targetElement.nextElementSiBling);
    }
}

//给标签增加样式
function addClass(element, value) {
    //检查className属性值是否为null
    if(!elment.className) {
        //结果为真，把value直接赋给element
        element.className = value;
    }else {
        //结果为假，把value添加到element
        element.className += " " + value;
    }
}

//最大数与最小数中间的随机数
function randomMM(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//hasChild方法 子代中有没有元素节点
function haschild(node) {
    var child = node.childNodes;
    var len = child.length;
    for(var i = 0; i < len; i++){
        if(child[i].nodeType == 1){
            return true;
        }
    }
    if(i == len){
        return false;
    }
     
}

//可视窗口尺寸兼容性
function getViewportOffset() {
    if(window.innerWidth){
        return {
            w : window.innerWidth,
            h : window.innerHeight
        }
    }else{
        if(document.compatMode === 'BackCompat'){
            return {
                w : document.body.clientWidth,
                h : document.body.clientHeight
            }
        }else{
            return {
                w : document.documentElement.clientWidth,
                h : document.documentElement.clientHeight
            }
        }
    }
}

//兼容性 滚动条距离
function getScrollOffset() {
    if(window.pageXOffset) {
        return {
            x : window.pageXOffset,
            y : window.pageYOffset
        }
    }else{
        return {
            x : document.body.scrollLeft + document.documentElement.scrollLeft,
            y : document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

//元素相对于文档的距离
function getElementPosition(domElem) { 
    var actualLeft = domElem.offsetLeft;
    var actualTop = domElem.offsetTop;
    var current = domElem.offsetParent;

    while(current) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return {
        left : actualLeft,
        top : actualTop
    }
}

//元素相对于文档的距离
function getPosition(domElem) {
    var rec = domElem.getBoundingClientRect();
    var x = rec.x;
    var y = rec.y;

    x += getScrollOffset(domElem).x;
    y += getScrollOffset(domElem).y;

    return {
        left : x,
        top : y
    }
}

//兼容性 getElementsByClassName
Document.prototype.getClassName = function (className) {
    //存储符合条件的标签的数组
    var arr = [];
    // 获取全部标签 转化成数组
    var totalTag = Array.prototype.slice.call(document.getElementsByTagName('*'));  //只是类数组
    // 将classname提出，并排序
    function sortClassName(dom) {
        var reg = /\s+/;
        var classStr = dom.className.replace(reg,' ').trim();
        // 将classname分割
        var classArr = classStr.split(' ');
        return classArr;
    }
    
    // 遍历数组
    totalTag.forEach(function(ele, index) {
        var class_arr = sortClassName(ele); 
        for(var i = 0; i < class_arr.length; i++) {
            // 判断是否含有classname
            if(class_arr[i] == className) {
                arr.push(ele);
                // 有便直接退出
                break;
            }
        }
    });
    return arr;
}

//兼容性 返回样式
function getStyle(elem, prop) {
    if(window.getComputedStyle){
        return window.getComputedStyle(elem, null)[prop];
    }else{
        //ie8及ie8以下
        return elem.currentStyle[prop];
    }
}

//运动框架
function startMove(dom, fin, fun) {
    clearInterval(dom.timer);
    var iSpeed;
    var iCur;
    dom.timer = setInterval(function () { //加dom是为了防止点击其它元素取消当前时间函数
        var flag = true; //每次循环都会刷新，判断当前样式是否达到了标准
        for (var key in fin) {
            //获取各样式的当前值
            //透明度和其他事件不一样，需要扩大100倍
            if (key == 'opacity') {
                iCur = parseFloat(getStyle(dom, 'opacity')) * 100;
            } else {
                iCur = parseFloat(getStyle(dom, key));
            }
            //判断样式是否达到了要求
            if (iCur != fin[key]) {
                flag = false;
            }
            //计算速度
            iSpeed = (fin[key] - iCur) / 7;
            //速度取整
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //改变当前样式
            //透明度另外处理
            if (key == 'opacity') {
                dom.style[key] = (iCur + iSpeed) / 100;
            } else {
                dom.style[key] = iCur + iSpeed + 'px';
            }
        }
        //判断时间函数是否可以结束
        if (flag == true) {
            clearInterval(dom.timer);
            fun();  //需要等第一个元素运动结束后执行
        }
    }, 30);
}