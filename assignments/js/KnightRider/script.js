let colours = ["#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#923600","#bb4500", "#ec5800", "#ff721e", "#ff904f"];
let revColours = ["#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#eeeeee","#ff904f","#ff721e","#ec5800","#bb4500","#923600"];
let ids = document.querySelectorAll(".id");
let btnStart = document.querySelector("#start");
let btnStop = document.querySelector("#stop");
let meterInput = document.getElementById("meter");
let count = 0;
let reverse = true;
let interval;
let stop;
let isMusicPlaying = false;
let txtSpeed=document.querySelector("#speed");
let txtTime=document.querySelector("#time");

btnStart.addEventListener("click",function (){
    task();
});
btnStop.addEventListener("click",function (){
    clearInterval(stop);
    if (isMusicPlaying) {
        stopMusic();
    }
});
meterInput.addEventListener("input",function (){
    task();
    value = 100 - parseInt(meterInput.value);
    txtSpeed.innerText=((100-(value*0.5)/1.5)).toFixed(0)+"%";
    txtTime.innerText=(100 - parseInt(meterInput.value))*10;
});
function task(){
    clearInterval(stop);

    let limit = 50;
    let meterValue = meterInput.value;

    if (meterValue >= 0 && meterValue <= 100) {
        limit = 100 - meterValue;
    }
    if (!isMusicPlaying) {
        playMusic();
    }
    stop=setInterval(function() {
        if(reverse){
            var color = colours.pop();
            colours.unshift(color);
            ids.forEach(function(element, index) {
                element.style.backgroundColor = colours[index];
            });
            count++;
            if(count==22){
                reverse=false;
            }
        } if(reverse==false){
            var revCo = revColours.shift();
            revColours.push(revCo);
            ids.forEach(function(element, index) {
                element.style.backgroundColor = revColours[index];
            });
            count--;
            if (count == 1) {
                reverse = true;
            }
        }
    }, limit);
}
function playMusic() {
    audio.play();
    isMusicPlaying = true;
}
function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    isMusicPlaying = false;
}
musicStart.addEventListener("click", function () {
    if (!isMusicPlaying) {
        playMusic();
    }
});
musicStop.addEventListener("click", function () {
    if (isMusicPlaying) {
        stopMusic();
    }
});