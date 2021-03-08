import ReportEndpointFactory from "../factories/ReportEndpointFactory";
import handlerException from "../middlewares/HandlerException";

const reportEndpoint = ReportEndpointFactory()

export default (app) => {

    /**
    * @swagger
    * definitions:
    *  Report:
    *    properties:
    *        email: 
    *            type: string
    *            description: User's email to send report to email
    */

     /**
     * @swagger
     * /api/reports/consumers-requests/{id}:
     *   post:
     *     tags:
     *       - Report
     *     summary: Send request to generate report the request per consumer and send per email
     *     parameters:
     *      - name: id
     *        required: true
     *        type: string
     *        in: path
     *        description: The id of consumer authenticated. The field authenticated_entity.consumer_id.uuid.
     *      - name: limit
     *        required: false
     *        type: integer
     *        in: query
     *        description: The limit is quantity register used in query.
     *      - name: page
     *        required: false
     *        type: integer
     *        in: query
     *        description: The page is number page used in query.
     *      - name: body
     *        required: true
     *        type: object
     *        schema:
     *          $ref: "#/definitions/Report"
     *        in: body
     *     produces:
     *       - application/json
     *     responses:
     *        200: 
     *          description: Execute action with success.
     *        400:
     *          description: Data invalids.
     */
    app.post("/api/reports/consumers-requests/:id", reportEndpoint.getRequestsPerConsumer);


     /**
     * @swagger
     * /api/reports/services-requests/{id}:
     *   post:
     *     tags:
     *       - Report
     *     summary: Send request to generate report the request per service and send per email
     *     parameters:
     *      - name: id
     *        required: true
     *        type: string
     *        in: path
     *        description: The id of service. The field service.id.
     *      - name: limit
     *        required: false
     *        type: integer
     *        in: query
     *        description: The limit is quantity register used in query.
     *      - name: page
     *        required: false
     *        type: integer
     *        in: query
     *        description: The page is number page used in query.
     *      - name: body
     *        required: true
     *        type: object
     *        schema:
     *          $ref: "#/definitions/Report"
     *        in: body
     *     produces:
     *       - application/json
     *     responses:
     *        200: 
     *          description: Execute action with success.
     *        400:
     *          description: Data invalids.
     */
    app.post("/api/reports/services-requests/:id", reportEndpoint.getRequestsPerService)


     /**
     * @swagger
     * /api/reports/time-requests:
     *   post:
     *     tags:
     *       - Report
     *     summary: Send request to generate report the medium time request, proxy and gateway after send per email
     *     parameters:
     *      - name: limit
     *        required: false
     *        type: integer
     *        in: query
     *        description: The limit is quantity register used in query.
     *      - name: page
     *        required: false
     *        type: integer
     *        in: query
     *        description: The page is number page used in query.
     *      - name: body
     *        required: true
     *        type: object
     *        schema:
     *          $ref: "#/definitions/Report"
     *        in: body
     *     produces:
     *       - application/json
     *     responses:
     *        200: 
     *          description: Execute action with success.
     *        400:
     *          description: Data invalids.
     */
    app.post("/api/reports/time-requests", reportEndpoint.getMediaTimeOfRequestProxyAndGateway)

    // Handler exceptions the application.
    app.use(handlerException);
}