const config = require('config.json');
const fs = require('fs');
const sendEmail = require ('helpers/send-email');

module.exports = {
    reportProblem
}

async function reportProblem(body,origin){
    let message;
    if(origin){
        message = `<p>Usted tiene un petición sobre un problema que ha ocurrido en DiscoverIT
            <h4>Información del problema:</h4>
            <span style="color:#0099CC">Url: </span>  ${body.url}<br>
            <span style="color:#0099CC">Correo: </span>  ${body.mail}<br>
            <span style="color:#0099CC">Problema: </span>  ${body.description}<br>
        </p><br>
        <p style="text-align: center"> Agradecemos su pronta respuesta.</p>`
    }

    else{
        message = `<p>Esta es una prueba de que el correo no llego</p>`
    }
    await sendEmail({
        to: 'discoverIT@virwo.com',
        subject: 'Reporte de problema',
        html: `<h4>Reporte de problema</h4> ${message}`
    });
}