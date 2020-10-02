import Citas from './class/Citas.js';
import UI from './class/UI.js';

import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

let editando = false;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e){
    citaObj[e.target.name] = e.target.value; // En funcion del event, selecciona el name y le asigna el valor(lo ingresado)
}

// Agrega una cita, ya sea directa o por modificación > Valida, agrega, limpia y muestra
export function nuevaCita(e){
    e.preventDefault(); 
        
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj; 

    if(mascota === ''|| propietario === ''|| telefono === ''|| fecha === ''|| hora === ''|| sintomas === '') {

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando) { // Si editando es true, estaría en modo edición
        ui.imprimirAlerta('Editado correctamente'); // El tipo es indiferente.. 
        administrarCitas.editarCita({...citaObj})// No pasa el objeto global, sino una copia de el
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita'; // vuelve a su valor normal
        editando = false;
    } else {
        citaObj.id = Date.now();
        administrarCitas.agregarCita({...citaObj}); // No pasa el objeto global, sino una copia de el 
        ui.imprimirAlerta('Se agregó correctamente');
    }
    
    reiniciarObjeto(); // Vacía el objeto!!
    formulario.reset(); // Limpia los input
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto(){ 
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id){
    administrarCitas.eliminarCita(id);

    ui.imprimirAlerta('La cita se eliminó correctamente');

    ui.imprimirCitas(administrarCitas);
}

// Vuelve a llenar el formulario y el objeto y entra a modo edición
export function cargarEdicion(cita){
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}





