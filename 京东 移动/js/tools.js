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