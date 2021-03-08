
import InvalidDatasException from "../exceptions/InvalidDatasException";

class Endpoint {

    isValid(values, rules) {
        const errors = rules
            .validate(values, { abortEarly: false, allowUnknown: true });

        if (errors.error) {
            const validationErrors = {};
            errors.error.details.forEach(item => {
                validationErrors[item.context.label] = item.message.replace(/"/g, "");
            });

            throw new InvalidDatasException(JSON.stringify(validationErrors));
        }
    }
}

export default Endpoint;