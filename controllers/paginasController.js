import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimonial.js';

const paginaInicio = async (req, res) => {

    const promiseDB = [];
    promiseDB.push( Viaje.findAll( { limit :3 } ) );
    promiseDB.push( Testimonial.findAll( { limit :3 } ) );
    // Consular 3 viajes del modelo viaje

    try {
        const resultado = await Promise.all(promiseDB)

        res.render('inicio', {
            pagina: "Inicio", 
            clase: 'home',
            viajes : resultado[0],
            testimoniales : resultado[1]
        });
        
    } catch (error) {
        console.log(error);
    }


}

const paginaNosotros = (req, res) => {
    res.render('nosotros',{
        pagina : "Nosotros"
    })
}

const paginaViajes = async (request, response) => {

    const viajes = await Viaje.findAll();

    response.render('viajes',{
        pagina : "Próximos viajes",
        viajes
    })
}

const paginaTestimoniales = async (request, response) => {

    try {
        const testimoniales = await Testimonial.findAll();

        response.render('testimoniales', {
            pagina : "Testimoniales",
            testimoniales
        });

    } catch (error) {
        console.log(error);
    }

}

// Muestra un viaje por su slug
// params se asocia a el comodin
const paginaDetalleViaje = async (request, response) => {
    const {slug} = request.params;
    
    try {
        const viaje = await Viaje.findOne({ where : { slug }});
        
        response.render('viaje',{
            pagina: 'Informacion viaje',
            viaje
        })
            
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}