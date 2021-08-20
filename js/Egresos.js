class Egresos extends Datos{

    static contadorEgresos = 0;

    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._idEgresos = ++Egresos.contadorEgresos;
        
    }

    get idEgresos(){
        return this._idEgresos;
    }
}