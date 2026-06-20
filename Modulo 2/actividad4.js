const invitados = ["Ana", "Alberto", "Beatriz", "Carlos", "Carmen", "David"];

const encontrarParInvitados = (invitados) => {
    if (invitados.length < 2) return null;

    let p1 = 0;
    let p2 = 1;

    while (p2 < invitados.length) {
        if (invitados[p1].charAt(0).toLowerCase() === invitados[p2].charAt(0).toLowerCase()) {
            return [invitados[p1], invitados[p2]];
        }
        p1++;
        p2++;
    }
    return null;
};

const par = encontrarParInvitados(invitados);
if (par) {
    console.log(`Los invitados que pueden sentarse juntos son: ${par[0]} y ${par[1]}`);
} else {
    console.log("No se encontraron invitados consecutivos con la misma inicial.");
}
