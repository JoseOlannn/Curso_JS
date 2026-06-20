const itinerario = [];

export const registrarDestino = (destino, fecha, transporte) => {
    itinerario.push({ destino, fecha, transporte });
};

export const calcularCosto = (destino, transporte) => {
    let costoBase = 0;
    if (destino === 'Paris') costoBase = 1000;
    else if (destino === 'Tokio') costoBase = 1500;
    else costoBase = 500;

    let costoTransporte = 0;
    if (transporte === 'Avion') costoTransporte = 800;
    else if (transporte === 'Tren') costoTransporte = 200;
    else costoTransporte = 50;
    
    return costoBase + costoTransporte;
};

export const mostrarItinerario = () => {
    console.log("--- Itinerario de Viaje ---");
    itinerario.forEach((viaje, index) => {
        const costo = calcularCosto(viaje.destino, viaje.transporte);
        console.log(`${index + 1}. Destino: ${viaje.destino}, Fecha: ${viaje.fecha}, Transporte: ${viaje.transporte}, Costo Estimado: $${costo}`);
    });
};
