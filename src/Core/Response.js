/**
 * Response class for the all responses
 */
import {StringBuilder} from "./Helper";

/**
 * genel response yapısıdır.
 */
export class Response {
    constructor() {
        this.success = true;
        this.value = {};
        this.results = [];
    }

    /**
     * hata ekler
     * @param message {string}
     * @param severity {number}
     * @param errorCode {string}
     */
    addResult = (message, severity, errorCode = "no code") => {
        //todo severity bilgisine göre log işlenecek..
        console.log("pushed error result:",message);
        if (message && message.length > 0) {
            this.results.push(new Result(errorCode, message, severity))
            if (this.results.length > 0) {
                this.success = false;
            }
        }
    }

    /**
     * api tarafından gelen resultları alır.
     * @param results
     */
    addCoreResults(results){
        for (let result of results) {
            this.addResult(result.errorMessage,result.severity,result.errorCode );
        }
    }
    /**
     * getting string formatted.
     * @returns {string}
     */
    getResultsStringFormat = () => {
        let string = new StringBuilder();

        if (this.results.length > 0) {
            for (let result of this.results) {
                if (result.ErrorMessage.length > 1)
                    string.appendLine(result.ErrorMessage);
            }
        }
        return string.toString();
    }
}

/**
 * the result
 */
class Result {
    constructor(code, message, severity) {
        this.ErrorCode = code;
        this.ErrorMessage = message;
        this.Severity = severity;
    }
}

/**
 * the severity
 * hata seviyeleri
 */
export const Severity = {
    /**
     * düşük derecede hata (kullanıcı hatası, geçersiz input değeri gibi..)
     */
    Low: 1,
    /**
     * geliştiriciyi ilgilendiren hata türü...
     */
    High: 2,
};
