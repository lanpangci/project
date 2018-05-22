var oBar = document.getElementsByClassName('bar')[0];
var oDiv = document.getElementsByClassName('wrapper')[0]; 
var per = 0;


var timer = setInterval(function () {
    per += 1;
    oBar.style.width = per + '%';

    if(per == 100) {
        oDiv.classList.add('content');
        // oDiv.className = 'content';
        setTimeout(function () {
            $(".monsterText").html("We are<br>SQUARE<br>MONSTER!");
        }, 3000);
        clearInterval(timer);
    }
}, 30)