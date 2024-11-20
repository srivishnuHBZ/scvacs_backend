const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config({ path: './config/config.env' });

//declare routes
const validPassesRoutes=require('./routes/validPasses')
const vehicleHistoryRoutes= require('./routes/vehicleHistory')
const vehicleRoutes=require('./routes/vehicle')

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
	res.json('Welcome...');
});

//Mount Routes
app.use('/validpasses', validPassesRoutes)
app.use('/vehiclehistory', vehicleHistoryRoutes)
app.use('/vehilces', vehicleRoutes)



db.sequelize
	.sync({ force: false })
	.then(() => {
		console.log('Models Synced');
	})
	.catch(err => console.log(err.message));

app.listen(PORT, () => {
	console.log(`Server is running on port : ${PORT}`);
});
