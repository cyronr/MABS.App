import store from './store/index.js';

export const API_URL = 'http://54.37.232.214:8080/api';

export const API_SUCCESS_RESPONSE_CODES = [200, 201];
export const API_BUSINESS_ERROR_CODES = [400, 404, 409];


export function handleAPIError(error) {
    console.log(error);
    if (API_BUSINESS_ERROR_CODES.includes(error.response.status)) {
        const responseErrors = error.response.data.errors;

        let errors = '';
        for (const key in responseErrors) {
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

export function handleAPIErrorWithMessage(error) {
    console.log(error);
    if (API_BUSINESS_ERROR_CODES.includes(error.response.status)) {
        const responseErrors = error.response.data.errors;

        let errors = '';
        for (const key in responseErrors) {
            errors += responseErrors[key] + '\n';
        }

        if (errors === '') {
            errors = "Nieoczekiwany błąd aplikacji";
        }

        store.commit('setErrorMessage', errors);
        store.commit('setIsPageLoading', false);
    }
    else {
        store.commit('setErrorMessage', "Nieoczekiwany błąd aplikacji");
        store.commit('setIsPageLoading', false);
    }
}