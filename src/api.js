export const API_URL = 'http://localhost:5032/api';

export const API_SUCCESS_RESPONSE_CODES = [200, 201];
export const API_BUSINESS_ERROR_CODES = [400, 404];


export function handleAPIError(error) {
    if (API_BUSINESS_ERROR_CODES.includes(error.response.status)) {
        const responseErrors = error.response.data.errors;

        let errors = '';
        for(const key in responseErrors) {
            errors += responseErrors[key] + '\n';
        }

        if (errors === '') {
            errors = "Nieoczekiwany błąd aplikacji";
        }

        throw new Error(errors);
    }
    else {
        throw new Error("Nieoczekiwany błąd aplikacji");
    }
}