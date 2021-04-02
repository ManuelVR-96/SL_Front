/**
 * Clase para el DTO de citas
 */

export class CitaDTO {
    
    idCita : number;
    fechaCita?: string;
    nombrePaciente? : string;
    apellidosPaciente? : string;
    sintomaDesc? : string;
    valorCuota? : string;
    especialidadDesc? : string;
    centroMedicoNombre? : string;
    nombreMedico? : string;
    tipoCita? : string;
    apellidosMedico? : string;
    nombreCompleto? : string;
    idTurno: number;
    prioridad?: number;

}