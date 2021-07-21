require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

  constructor() {
    // Start server
    this.app = express();

    // Server port
    this.port = process.env.PORT || 4000;

    // Path routes
    this.path = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads'
    }

    // Conexion mongo local
    this.databaseConnect();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async databaseConnect() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Parse body
    this.app.use(express.json({ extended: true }));

    // Directorio publico
    this.app.use(express.static('public'))

    // Manejo del file upload
    // Note that this option available for versions 1.0.0 and newer. 
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use(this.path.auth, require('../routes/auth.routes'));
    this.app.use(this.path.users, require('../routes/user.routes'));
    this.app.use(this.path.categories, require('../routes/categories.routes'));
    this.app.use(this.path.products, require('../routes/product.routes'));
    this.app.use(this.path.search, require('../routes/search.routes'));
    this.app.use(this.path.uploads, require('../routes/uploads.routes'));
  }

  listem() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto:', this.port);
    })
  }
}

module.exports = Server;