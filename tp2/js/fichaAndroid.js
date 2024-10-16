class fichaAndroid extends Ficha {
    constructor(posX, posY, radius, fill, context,name) {
        super(posX, posY, fill, context,name);
        this.radius = radius;
        this.image = new Image();
        this.image.src ='images/android.svg';
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = 'transparent'; // Establece el fondo transparente
        this.context.strokeStyle = 'transparent'; // Establece el borde transparente
        this.context.fill();
        this.context.stroke();

        this.context.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
    }

    getRadius() {
        return this.radius;
    }
    getName(){
        return this.name;
    }

    isPointInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y)<this.radius;
    }
}