export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Backend API - Tienda",
    version: "1.0.0",
    description:
      "Documentacion basica para consumir el backend desde React.",
  },
  servers: [
    {
      url: "/",
      description: "Servidor actual",
    },
  ],
  tags: [
    { name: "Products", description: "Gestion de productos" },
    { name: "Carts", description: "Gestion de carritos" },
  ],
  components: {
    schemas: {
      Product: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Mouse G502" },
          description: { type: "string", example: "Mouse gamer" },
          stock: { type: "integer", example: 8 },
          image: { type: "string", example: "/image/g502.webp" },
          price: { type: "number", example: 450 },
          category: { type: "string", example: "mouse" },
          timestamp: { type: "string", example: "17/03/2026 10:00" },
        },
      },
      ProductInput: {
        type: "object",
        required: ["name", "description", "stock", "image", "price", "category"],
        properties: {
          name: { type: "string", example: "Teclado G213" },
          description: { type: "string", example: "Teclado mecanico" },
          stock: { type: "integer", example: 4 },
          image: { type: "string", example: "/image/g213.png" },
          price: { type: "number", example: 700 },
          category: { type: "string", example: "teclados" },
        },
      },
      Cart: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          timestamp: { type: "string", example: "17/03/2026 10:00" },
          products: {
            type: "array",
            items: { $ref: "#/components/schemas/Product" },
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: { type: "string", example: "Not Found" },
          ruta: { type: "string", example: "/api/products" },
          metodo: { type: "string", example: "GET" },
        },
      },
    },
  },
  paths: {
    "/api/products": {
      get: {
        tags: ["Products"],
        summary: "Listar productos",
        responses: {
          "200": {
            description: "Listado de productos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
          "400": {
            description: "Archivo corrupto u otro error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Crear producto (requiere ADMIN=true)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductInput" },
            },
          },
        },
        responses: {
          "200": { description: "Lista actualizada de productos" },
          "401": { description: "Unauthorized" },
          "400": { description: "Error en la solicitud" },
        },
      },
    },
    "/api/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Obtener producto por id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          "200": {
            description: "Producto encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "400": {
            description: "No encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      put: {
        tags: ["Products"],
        summary: "Actualizar producto por id (requiere ADMIN=true)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", example: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductInput" },
            },
          },
        },
        responses: {
          "200": { description: "Lista actualizada de productos" },
          "401": { description: "Unauthorized" },
          "400": { description: "Error en la solicitud" },
        },
      },
      delete: {
        tags: ["Products"],
        summary: "Eliminar producto por id (requiere ADMIN=true)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          "200": { description: "Lista actualizada de productos" },
          "401": { description: "Unauthorized" },
          "400": { description: "No encontrado" },
        },
      },
    },
    "/api/carts": {
      post: {
        tags: ["Carts"],
        summary: "Crear carrito",
        responses: {
          "200": { description: "Devuelve id del carrito creado" },
          "400": { description: "Error al crear carrito" },
        },
      },
    },
    "/api/carts/{id}": {
      delete: {
        tags: ["Carts"],
        summary: "Eliminar carrito por id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          "200": { description: "Carrito eliminado" },
          "400": { description: "No encontrado" },
        },
      },
    },
    "/api/carts/{id}/productos": {
      get: {
        tags: ["Carts"],
        summary: "Listar productos de un carrito",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          "200": { description: "Listado de productos del carrito" },
          "400": { description: "Carrito no encontrado" },
        },
      },
      post: {
        tags: ["Carts"],
        summary: "Agregar un producto a un carrito",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", example: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductInput" },
            },
          },
        },
        responses: {
          "200": { description: "Productos actualizados del carrito" },
          "400": { description: "Error al agregar" },
        },
      },
    },
    "/api/carts/{id}/productos/{id_prod}": {
      delete: {
        tags: ["Carts"],
        summary: "Eliminar producto del carrito",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", example: 1 },
          },
          {
            name: "id_prod",
            in: "path",
            required: true,
            schema: { type: "integer", example: 2 },
          },
        ],
        responses: {
          "200": { description: "Productos actualizados del carrito" },
          "400": { description: "Error al eliminar" },
        },
      },
    },
  },
};
