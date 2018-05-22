var personArr = [
    { name: '王岗', src: '3.png', des: '颈椎不好', sex: 'm' },
    { name: '刘莹', src: '5.png', des: '我是谁', sex: 'f' },
    { name: '王秀英', src: '4.png', des: '我很好看', sex: 'f' },
    { name: '刘金磊', src: '1.png', des: '你没有见过陌生的脸', sex: 'm' },
    { name: '刘飞翔', src: '2.png', des: '瓜皮刘', sex: 'm' },
]

var oUl = document.getElementsByTagName('ul')[0];
var oInput = document.getElementsByTagName('input')[0];
var oP = document.getElementsByTagName('p')[0];

//选中插入
function renderList(list) {
    var str = '';
    for (var i in list) {
        str += '<li>\
                    <img src="./img/'+ list[i].src + '">\
                    <p>'+ list[i].name + '</p>\
                    <p>'+ list[i].des + '</p>\
                </li>'
    }
    oUl.innerHTML = str;
}

renderList(personArr);

//react槽
var store = createStore({
    text: '',
    sex: 'a'
})

store.subscribe(function () {
    renderList(lastFilterFunc());
})

//获取input输入的数值
oInput.oninput = function () {
    // state.text = this.value;
    // // combineFilterFunc(obj);
    // renderList(lastFilterFunc(personArr));
    store.dispatch({type: 'text', value: this.value});
}

//sex点击事件
oP.addEventListener('click', function (e) {
    var event = e || window.event;
    if (event.target.tagName == 'SPAN') {
        var oSpan = document.getElementsByClassName('checked')[0];
        oSpan.classList.remove('checked');
        event.target.classList.add('checked');
        // state.sex = event.target.getAttribute('sex');
        store.dispatch({type: 'sex', value: event.target.getAttribute('sex')});
    }
    // combineFilterFunc(obj);
    // renderList(lastFilterFunc(personArr));
})

//根据text筛选
function filterText(text, arr) {
    return (arr.filter(function (ele, index) {
        if (ele.name.indexOf(text) != -1) {
            return true;
        }
    }));
}

//根据sex进行筛选
function filterSex(sex, arr) {
    if (sex == 'a') {
        return arr;
    } else {
        return (arr.filter(function (ele, index) {
            if (ele.sex == sex) {
                return true;
            }
        }))
    }
}


//将两个方法集中在一个函数里实现,可以满足多个要求
function combineFilterFunc(obj, arr) {
    // var arr = personArr;
    // for(var prop in obj) {
    //     arr = (obj[prop](state[prop], arr));
    // }
    // renderList(arr);
    return (function() {
        var lastArr = arr;
        for(var prop in obj) {
            lastArr = obj[prop](store.getState()[prop], lastArr); //数组没有作用域，所以继承不到state，需要自己调用
        }
        return lastArr;
    })

}

// var obj = {text: filterText, sex: filterSex};
var lastFilterFunc = combineFilterFunc({text: filterText, sex: filterSex}, personArr);

function createStore(initState) {
    var state = initState || {};
    var list = [];
    function getState () {
        return state;
    }

    function dispatch(action) {
        state[action.type] = action.value;
        list.forEach(function(ele, index) {
            ele();
        })
    }

    function subscribe(handler) {
        list.push(handler);
    }

    return {
        getState: getState,
        dispatch: dispatch,
        subscribe: subscribe
    }
}