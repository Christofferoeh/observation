//Loading
const scene0 = new Scene({
    ".semibody": {
        0: {
            opacity: "0"
        },
        0.6: {
            opacity: "1"
        },
        options: {
            easing: "ease-in-out"
        }
    },
    ".body": {
        0: {
            opacity: "0"
        },
        0.6: {
            opacity: "1"
        },
        options: {
            easing: "ease-in-out"
        }
    }
}, {
    selector: true
}).play()