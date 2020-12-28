class canvasElement{
    constructor(x, y){
        this.ga = 0;
        this.x = x;
        this.y = y;
        this.oldGa = 0;
        this.noise = 0;
    }
    setGa(v){
        this.oldGa = this.ga;
        var rand = Math.random();
        if(v > 0.99 && rand > 0.9){
            this.ga = [0.96, 0.99][Math.floor(Math.random()*2)];
        } else {
            if(rand > 0.9){
                this.ga = rand;
            } else {
                this.ga = v;
            }
        }
    }
    updateGa(){
        this.oldGa = (Math.abs(this.ga-this.oldGa)>0.01) ? (this.ga-this.oldGa)/5+this.oldGa : this.ga;
    }
    
}