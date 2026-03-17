import express, { json, urlencoded } from 'express';
import { productsRouter } from './routes/products.router.js';
import * as dotenv from 'dotenv'
import { cartRouter } from './routes/cart.router.js';
import cors from "cors"
import { swaggerSpec } from "./docs/swagger.js"

dotenv.config()
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors())

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`server started in http://localhost:${PORT}`));
server.on('error', (error) => console.log(`Error en el servidor: `, error.message));


//Routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.get("/api/docs.json", (req, res) => {
        res.json(swaggerSpec)
})

app.get("/api/docs", (req, res) => {
        res.setHeader("Content-Type", "text/html")
        res.send(`<!doctype html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>API Docs</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
        <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
        <script>
            window.onload = function () {
                window.ui = SwaggerUIBundle({
                    url: '/api/docs.json',
                    dom_id: '#swagger-ui',
                    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
                    layout: 'StandaloneLayout'
                });
            };
        </script>
    </body>
</html>`)
})


app.use((req, res) => {
    res.status(404).json({error: "Not Found", description: `route ${req.baseUrl}${req.url} method ${req.method} not implement`});
});
