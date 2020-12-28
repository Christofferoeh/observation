//Scroll horizontally
const articles = document.getElementsByClassName("articles")[0]
const img = document.getElementsByClassName("img")
var scrolling = false;
var onFront = false;

document.body.addEventListener("wheel", function(e){
    if(onFront){
        e.preventDefault();
    }
    if(!scrolling){
        scrolling = true;
        var x = img[0].offsetWidth + 62;
        if(e.deltaY < 0){
            x = x*-1;
        }
        articles.scrollBy({
            left: x,
            behavior: 'smooth'
        });
        scrolling = false;
    }
    //articles.scrollBy(e.deltaY, 0)
})

window.addEventListener("scroll", function(){
    var overhead = document.getElementsByClassName("overhead")[0];
    if(window.scrollY == 0){
        overhead.style.opacity = 1;
    } else {
        overhead.style.opacity = 0;
    }
})