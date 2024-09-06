require('rootpath')();
const exec = require('child_process');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('middleware/error-handler');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
// allow cors requests from any origin and with credentials
app.use(cors({origin: (origin, callback) => callback(null, true), credentials: true}));

// api routes
app.use('/accounts', require('./routes/accounts.routes'));
app.use('/inventario', require('./routes/inventory.routes'));
app.use('/alux', require('./routes/nagios.routes'));
app.use('/alarms', require('./routes/alarm.routes'));
app.use('/tickets', require('./routes/ticket.routes'));
app.use('/graphics', require('./routes/graphics.routes'));
app.use('/knowledgeBase', require('./routes/knowledge-base.routes'));
app.use('/help-center', require('./routes/help-center.routes'));
app.use('/report-problem', require('./routes/report-problem.routes'));
app.use('/ticket-alert', require('./routes/ticket-alert.routes'));
app.use('/customerQuiz', require('./routes/customerQuiz.routes'));
app.use('/parts-werehouse', require('./routes/parts-werehouse.routes'));
app.use('/map-geolocations', require('./routes/map-geolocations.routes'));
app.use('/contract', require('./routes/contract.routes'));
app.use('/client', require('./routes/client.routes'));
app.use('/support', require('./routes/support-operator.routes'));
app.use('/dataCenter', require('./routes/data-center.routes'));
app.use('/discovery', require('./routes/discovery.routes'));
app.use('/quote', require('./routes/quote.routes'));
app.use('/order-purchase', require('./routes/order-purchase.routes'));
app.use('/task', require('./routes/task.routes'));
app.use('/brand', require('./routes/brand.routes'));
app.use('/provider', require('./routes/provider.routes'));

// swagger docs route
app.use('/api-docs', require('helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'development' ? process.env.PORT || 80 : 7000;
app.listen(port, () => {
	console.log('Server listening on port ' + port);
});
