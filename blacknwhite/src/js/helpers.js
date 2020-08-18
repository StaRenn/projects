// because scrollintoview behavior smooth works only in chrome opera and firefox, i had to implement this duct tape
// to get it working in microsoft edge etc. code snippet from stackoverflow.com/questions/51599677
export function scrollToSmoothly(pos, time){
    /*Time is only applicable for scrolling upwards*/
    /*Code written by hev1*/
    /*pos is the y-position to scroll to (in pixels)*/
    if(isNaN(pos)){
        throw "Position must be a number";
    }
    if(pos<0){
        throw "Position can not be negative";
    }
    let currentPos = window.scrollY||window.screenTop;
    if(currentPos<pos){
        let t = 10;
        for(let i = currentPos; i <= pos; i+=10){
            t+=10;
            setTimeout(function(){
                window.scrollTo(0, i);
            }, t/2);
        }
    } else {
        time = time || 2;
        let i = currentPos;
        let x;
        x = setInterval(function(){
            window.scrollTo(0, i);
            i -= 10;
            if(i<=pos){
                clearInterval(x);
            }
        }, time);
    }
}