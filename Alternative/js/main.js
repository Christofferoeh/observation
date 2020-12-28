var frames = [{start: 0, stop: 400, frame: 0}, {start: 401, stop: 600, frame: 3}, {start: 601, stop: 700, frame: 2}, {start: 701, stop: 1000, frame: 3}, {start: 1001, stop: 5000, frame: 4}]
const scene = new think("canvas", "img/Weather.png", true, frames);
scene.init();

new fullpage('#fullpage', {
	//options here
	autoScrolling:true,
    scrollHorizontally: true,
    onLeave: function(origin, destination, direction){
        scene.scrollUpdate(destination);
    },
    navigation: true,
    navigationPosition: 'left'
});