class Ficha {
    constructor(posX, posY, fill, context,name) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoEstilo = 'blue';
        this.bordeEstilo = 'black';
        this.bordeAncho = 2;
        this.context = context;
        this.name = name;
        this.disponible=true;

 
    }
    getDisponible(){
        return this.disponible;
    }

    setDisponible(){
        this.disponible = false;
    }

    setFill(fill) {
        this.fill = fill;
    }
    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getFill() {
        return this.fill;
    }

    draw() {
        this.context.fillStyle = this.fill;
    }

    setResaltado(resaltado){
        this.resaltado = resaltado;
    }
    
    isPointInside(x, y){
    
    };
    getName(){
        }

}
