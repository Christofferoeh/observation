class think {
    constructor(canvas, image, slide, frames){
        this.c = document.getElementById(canvas);
        this.ctx = this.c.getContext("2d");
        
        //Memory canvas NOT USING
        this.memoryCanvas = new OffscreenCanvas(0, 0);
        this.memoryCanvas.width = this.c.width;
        this.memoryCanvas.height = this.c.height;
        this.memoryCtx = this.memoryCanvas.getContext("2d");
        
        this.image = image;
        
        this.slide = slide;

        //Current slide
        this.frames = frames;
        this.currentFrame = this.frames[0].frame;
        console.log(this.currentFrame)
        
        this.chars = "$@B%8&WM#*oahkbdpywmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,`'. ";

    }
    
    init(){
        //Resize when the window resize
        window.addEventListener("resize", () => {this.resize()});
        
        //Update when scrolling
        document.addEventListener("scroll", () => {this.scrollUpdate()})
        
        window.requestAnimationFrame(() => {this.drawCanvasArray()});
        //Draw first image
        this.drawImageToMemory();
        
        //Set canvas size
        var width = this.c.parentElement.offsetWidth;
        var height = this.c.parentElement.offsetHeight;
        this.c.width = width;
        this.c.height = height;
    }

    //Resize on size change
    resize(){
        var width = this.c.parentElement.offsetWidth;
        var height = this.c.parentElement.offsetHeight;
        this.c.width = width;
        this.c.height = height;
        this.ctx.clearRect(0,0,this.c.width,this.c.height);
        this.updateCanvasArray(this.currentFrame);
    }
    
    drawImageToMemory(){
        //Clearing
        this.ctx.clearRect(0,0,this.c.width,this.c.height);
        var imageWidth = 60;
        var imageHeight = 75;
        
        //CanvasElement array
        this.canvasArray = new Array();
        for(var i = 0; i < imageHeight*imageHeight; i++){
            this.canvasArray.push(new canvasElement(i%imageWidth, Math.floor(i/imageHeight)));
        }

        //Calculate and draw image
        var img = new Image(imageWidth*4, imageHeight);
        
        img.addEventListener("load", () => {
            //Set memoryCanvas to image
            this.memoryCanvas.width = img.width;
            this.memoryCanvas.height = img.height;
            this.memoryCtx.drawImage(img, 0, 0);
            this.oldImageData = this.memoryCtx.getImageData(0, 0, imageWidth, imageHeight).data;
            this.updateCanvasArray(this.currentFrame);
        });
        img.src = this.image;
    }

    updateCanvasArray(num){
        this.ctx.clearRect(0,0,this.c.width,this.c.height);
        var imageWidth = 60;
        var imageHeight = 75;
        var iter = 3;
        
        var imageData = this.memoryCtx.getImageData(imageWidth*num,0, imageWidth, imageHeight).data;
        var offset;
        var r;
        var g;
        var b;
        var ga;
        //SHOULD BE DYNAMIC
        this.ctx.font = "11px 'Courier New'";
        this.ctx.fillStyle = "white";
        //while(!this.compareImageData(imageData, this.oldImageData)){
        this.ctx.clearRect(0,0,this.c.width,this.c.height);

        //update ga in canvasArray
        for(var i = 0; i < this.canvasArray.length; i++){
            var x = i%imageWidth;
            var y = Math.floor(i/imageHeight);

            var offsetR = 4 * (y * imageWidth + x);
            var offsetG = ++offsetR;
            var offsetB = ++offsetG;
            
            r = imageData[offsetR];
            g = imageData[offsetG];
            b = imageData[offsetB];
            ga = 1 - (r + g + b) / 3 / 255;
            this.canvasArray[i].setGa(ga);
        }
        //this.drawCanvasArray();
    //}
    }

    //Drawing canvasArray
    drawCanvasArray(){
        if(!this.compareImageData(this.canvasArray)){
            this.ctx.clearRect(0,0,this.c.width,this.c.height);
            for(var i = 0; i < this.canvasArray.length; i++){
                this.canvasArray[i].updateGa();
                this.ctx.save();
                //SHOULD BE DYNAMIC
                this.ctx.translate(this.canvasArray[i].x*this.c.width/60, this.canvasArray[i].y*this.c.height/75+10)
                this.ctx.fillText(this.chars[Math.floor(this.canvasArray[i].oldGa*66)], 0, 0);
                this.ctx.restore();
            }
        }
        window.requestAnimationFrame(() => {this.drawCanvasArray()})
    }
    
    scrollUpdate(destination){
        if(this.slide){
            this.currentFrame = destination.index;
            this.updateCanvasArray(this.currentFrame);
        } else {
            window.clearTimeout(this.isScrolling);
            this.isScrolling = setTimeout(() => {
                for(var i = 0; i < this.frames.length; i++){
                    if(window.scrollY <= this.frames[i].stop && window.scrollY >= this.frames[i].start){
                        if(this.currentFrame != this.frames[i].frame){
                            this.currentFrame = this.frames[i].frame;
                            this.updateCanvasArray(this.currentFrame);
                        }
                    }
                }
            }, 66);
        }
    }

    //OLD IMPLEMENTATION
    compareImageData(a){
        for(var i = 0; i < a.length; i++){
            if(Math.abs(a[i].ga - a[i].oldGa) > 0) return false;
        }
        return true;
    }
}

/*
                if(this.oldImageData[offsetR] != undefined){
                    oldR = this.oldImageData[offsetR];
                    this.oldImageData[offsetR] = (Math.abs(r-oldR) > 20) ? r-oldR/2+oldR : r;
                    oldG = this.oldImageData[offsetG];
                    this.oldImageData[offsetG] = (Math.abs(g-oldG) > 20) ? g-oldG/2+oldG : g;
                    oldB = this.oldImageData[offsetB];
                    this.oldImageData[offsetB] = (Math.abs(b-oldB) > 20) ? b-oldB/2+oldB : b;
                    oldGa = 1 - (oldR + oldG + oldB) / 3 / 255;
                } else {
                    oldGa = 1;
                }*/