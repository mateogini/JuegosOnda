class Tablero{
    constructor(medida, filas, columnas,canvasWidth){
        this.medida = medida;
        this.filas = filas;
        this.columnas = columnas;
        this.canvasWidth = 0;
    }

    setMedida(medida){
        this.medida = medida;
    }

    getMedida(){
        return this.medida;
    }

    setFilas(filas){
        this.filas = filas;
    }

    getFilas(){
        return this.filas;
    }

    setColumnas(columnas){
        this.columnas = columnas;
    }

    getColumnas(){
        return this.columnas;
    }

    setCanvasWidth(canvasWidth) {
        this.canvasWidth = canvasWidth;
    }


    //dibuja matriz(tablero)
    dibujarTablero(context,canvasWidth, canvasHeight){
        context.fillStyle = '#1D2429';
        context.fillRect(0,0,canvasWidth,canvasHeight);

        const startX = (canvasWidth - this.columnas * this.medida) / 2;
        const startY = (canvasHeight - this.filas * this.medida) / 2;

        for(let fila = 0; fila<this.filas; fila++){
            for(let col = 0; col<this.columnas; col++){
                this.dibujarCelda(context,fila,col,"#54616B",startX,startY)
            }
        }
    }

    dibujarCelda(context, fila, col, color, startX, startY) {
        context.fillStyle = color;
        context.fillRect(startX + col * this.medida, startY + fila * this.medida, this.medida, this.medida);
        context.strokeStyle = "#000";
        context.strokeRect(startX + col * this.medida, startY + fila * this.medida, this.medida, this.medida);
    }

    //calcula en que columna cae la ficha al soltarla
    calculateColumn(x) {
        const startX = 170 ;
        const columnWidth = this.medida;

        // Calcula la columna en función de la posición X
        const columnIndex = Math.floor((x - startX) / columnWidth);

        // Asegúrate de que columnIndex esté dentro del rango de columnas válidas
        if (columnIndex < 0) {
            return 0;
        } else if (columnIndex >= this.columnas) {
            return this.columnas - 1;
        }

        return columnIndex;
    }

}