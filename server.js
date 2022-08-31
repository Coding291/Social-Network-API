// Instantiate packages
const mongoose = require('mongoose');
const express = require('express');

// Initialize app and PORT
const app = express();
const PORT = process.env.PORT || 3001;

// configure app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
app.use(require('./routes'));

// configure mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on http://localhost:${PORT}/`));