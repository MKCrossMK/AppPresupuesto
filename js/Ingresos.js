class Ingresos extends Datos{
    static contadorIngreso = 0;

    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._idIngreso = ++Ingresos.contadorIngreso;
        
    }

    get idIngreso(){
        return this._idIngreso;
    }

}