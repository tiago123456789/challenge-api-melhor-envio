import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
    info: {
        title: "Desafio Melhor envio",
        version: "1.0.0",
    }
};

const swaggerSpec =  swaggerJsDoc({
    swaggerDefinition: swaggerDefinition,
    apis: [process.env.SWAGGER_PATH_ROUTES],
});

export default swaggerSpec;