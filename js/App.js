const ingresos = [
    new Ingresos("Salario", 8300),
    new Ingresos("Venta de coche", 4000)
];

const egresos = [
    new Egresos("Renta Casa", 8000),
    new Egresos("Compra de ropa", 600)

];

let cargarApp  = () => {
    
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}


let totalIngresos = () => {
    let ingresoTotal = 0;

    for (ingreso of ingresos){
        ingresoTotal += ingreso.valor

    }
    return ingresoTotal;
}

let totalEgresos = () => {
    let totalEgresos = 0;

    for (egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let cargarCabecero = () =>{

    let presupuestoTotal = totalIngresos() - totalEgresos();

    let porcentajeEgreso =  totalEgresos() / totalIngresos();

    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuestoTotal);

    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());

    document.getElementById("egresos").innerHTML = formatoMoneda (totalEgresos());

    document.getElementById("porcentaje").innerHTML = formatoPorcentaje (porcentajeEgreso);



}

const formatoMoneda = (valor) => {

  return valor.toLocaleString('es-DO',{style: "currency", currency :"DOP", minimumFractionDigits : 2});


}

const formatoPorcentaje = (valor) => {

    return valor.toLocaleString("es-DO", {style:"percent", minimumFractionDigits: 2} )
    
}

const cargarIngresos = () => { 
    let ingresosHTML = "" ;

    for (ingreso of ingresos){
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    document.getElementById("lista_ingresos").innerHTML = ingresosHTML; 

} 

const crearIngresosHTML = (ingreso) => {
    let ingresosHTML = `

    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">+ ${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="trash-outline" 
                    onclick = "eliminarIngreso(${ingreso.idIngreso})"></ion-icon>
                </button>
            </div>
        </div>
   </div> `;

return ingresosHTML;
}

const eliminarIngreso = (idIngreso) => {

   let indiceEliminar = ingresos.findIndex(ingreso => ingreso.idIngreso === idIngreso);

   ingresos.splice(indiceEliminar, 1);
   cargarCabecero();
   cargarIngresos();


}



const cargarEgresos = () => {
    let egresosHTML = "";

    for (egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso);
    }

    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}


const crearEgresosHTML = (egreso) => {
    let egresosHTML = `
    <div id="lista-egresos">
            <div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${egreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}  </div>
                    <div class="elemento_porcentaje"> ${formatoPorcentaje (egreso.valor / totalEgresos())} </div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="trash-outline"
                            onclick = "eliminarEgreso(${egreso.idEgresos})"></ion-icon>
                        </button>
                    </div>
                </div>

            </div>
    `;

    return egresosHTML;
}

const eliminarEgreso = (idEgreso) => {

  let indiceEliminar =  egresos.findIndex(egreso => egreso.idEgresos === idEgreso);

  egresos.splice(indiceEliminar, 1);
  
  cargarCabecero();
  cargarEgresos();




}

const agregarDato = () => {

   let forms = document.forms["forma"];
   let tipo = forma["tipo"];
   let descripcion = forma["descripcion"];
   let valor = forma["valor"];

   if (descripcion.value !== "" && valor.value !== ""){

    if (tipo.value === "ingreso"){
        ingresos.push(new Ingresos(descripcion.value, +valor.value));
        cargarCabecero();
        cargarIngresos();

    }
    else if(tipo.value === "egreso") {
        egresos.push(new Egresos(descripcion.value, +valor.value));
        cargarCabecero();
        cargarEgresos();
    
    }
       
   }

}