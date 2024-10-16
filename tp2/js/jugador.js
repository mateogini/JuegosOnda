class Jugador{
    constructor(Ficha){
        this.Ficha = Ficha;
        this.esJugadorActual = false;
    }

    setJugadorActual(){
        this.esJugadorActual = true;
    }

    desactivarJugador(){
        this.esJugadorActual = false;
    }

    esTurno(){
        return this.esJugadorActual;
    }
}