//Loading
const scene0 = new Scene({
    ".observation": {
        0: {
            opacity: "0"
        },
        0.8: {
            opacity: "1"
        },
        options: {
            easing: "ease-in-out"
        }
    },
    ".semibody": {
        1.2: {
            opacity: "0"
        },
        1.6: {
            opacity: "1"
        },
        options: {
            easing: "ease-in-out"
        }
    },
    ".body": {
        1.2: {
            opacity: "0"
        },
        1.6: {
            opacity: "1"
        },
        options: {
            easing: "ease-in-out"
        }
    },
    ".bagom": {
        1.2: {
            opacity: "0"
        },
        1.6: {
            opacity: "1"
        },
        options: {
            easing: "ease-in-out"
        }
    },
    ".kontakt": {
        1.2: {
            opacity: "0"
        },
        1.6: {
            opacity: "1"
        },
        options: {
            easing: "ease-in-out"
        }
    },
    ".underlined": {
        0.4: {
            width: "0%"
        },
        1: {
            width: "100%"
        }, options: {
            easing: "ease-in-out"
        }
    }
}, {
    selector: true
}).play()

//Story1
//Create raindrops
function createRaindrops(n){
    const raindrops = [];

    for(i = n; i >= 1; i--){
        raindrops.push('<img class="raindrop" width="40" style="left: '+Math.floor(Math.random()*100)+'%" src="img/story1/Raindrop'+i%4+'.svg">')
    }
    return raindrops.join("");
}
const mouseTitle1 = document.getElementsByClassName("mouseTitle1")[0];
const story1 = document.getElementsByClassName("story1")[0];
story1.innerHTML += createRaindrops(20);

//Raindrop scene
const scene1 = new Scene({
    ".raindrop": () => ({
        0: {
            top: "-20%",
        },
        2.5: {
            top: "120%",
        },
        options: {
            playSpeed: (Math.random() * 0.4) + 1,
            delay: Math.random() * 10,
            iterationCount: "infinite",
        }
    }),
}, {
    selector: true,
    iterationCount: "infinite"
}).play()

//Stop scene on hover
var raindrops = document.getElementsByClassName("raindrop");
story1.addEventListener("mouseenter", function(e){
    for(var i = 0; i < raindrops.length; i++){
        raindrops[i].style.opacity = 0;
    }
    story1.style.backgroundImage = "url('img/story1/VejretGlad.svg')"
})
//Play again if leaving
story1.addEventListener("mouseleave", function(e){
    for(var i = 0; i < raindrops.length; i++){
        raindrops[i].style.opacity = 0.7;
    }
    story1.style.backgroundImage = "url('img/story1/Vejret.svg')"
})
