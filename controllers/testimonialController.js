import {Testimonial} from '../models/Testimonial.js';

const guardarTestimonial = async (request, response) => {

    // Validacion
    const { nombre, correo, mensaje } = request.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre esta vacio' });
    }

    if (correo.trim() === '') {
        errores.push({ mensaje : 'El correo esta vacio'});
    }

    if (mensaje.trim() === '') {
        errores.push({ mensaje : 'El mensaje esta vacio'});
    }

    // Render para errorr
    if (errores.length > 0) {
        // Importar
        const testimoniales = await Testimonial.findAll();

        // Mostrar errores
        response.render('testimoniales',{
            pagina : "Testimoniales",
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    }else{
        // Almacenarlo en una base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje,
            })
            response.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }  
}

export {
    guardarTestimonial
}