﻿import { DefaultErrorMessages } from './config';

export class MessageProvider {
    constructor(private defaultMessages: DefaultErrorMessages) { }

    /**
     * Provides the message that will be shown to the user.
     * There are default messages and user defined ones.
     * Strings with placeholders are also supported for given errors.
     * E.g. "Minimum length is {0}" where "{0}" will be replaced with the provided min length value.
     * @param errorType The type of the error. E.g. "required", "minlength" etc.
     * @param errorPayload Provides custom message and/or the required value. E.g. for ValidationExtensions.minNumber(18) the payload will contain the value "18"
     */
    getErrorMessage(errorType: string, errorPayload: any): string {
        switch (errorType) {
            case 'required':
                return errorPayload.message ? errorPayload.message : this.defaultMessages.required;

            case 'email':
                return errorPayload.message ? errorPayload.message : this.defaultMessages.email;

            case 'minlength':
                return errorPayload.message ? this._stringFormat(errorPayload.message, errorPayload.requiredLength) : this._stringFormat(this.defaultMessages.minLength, errorPayload.requiredLength);

            case 'maxlength':
                return errorPayload.message ? this._stringFormat(errorPayload.message, errorPayload.requiredLength) : this._stringFormat(this.defaultMessages.maxLength, errorPayload.requiredLength);

            case 'minNumber':
                return errorPayload.message ? this._stringFormat(errorPayload.message, errorPayload.requiredRange) : this._stringFormat(this.defaultMessages.minNumber, errorPayload.requiredRange);

            case 'maxNumber':
                return errorPayload.message ? this._stringFormat(errorPayload.message, errorPayload.requiredRange) : this._stringFormat(this.defaultMessages.maxNumber, errorPayload.requiredRange);

            case 'pattern':
                return errorPayload.message ? errorPayload.message : this.defaultMessages.pattern;

            case 'noEmpty':
                return errorPayload.message ? errorPayload.message : this.defaultMessages.noEmpty;

            default:
                // TODO: Test this
                if (errorPayload.message) {
                    let placeholderValues: any[] = [];

                    for (let key in errorPayload) {
                        if (key !== 'message') {
                            placeholderValues.push(errorPayload[key]);
                        }
                    }

                    return this._stringFormat(errorPayload.message, placeholderValues);
                } else {
                    return this.defaultMessages.unknownError;
                }
        }
    }

    /**
     * Replaces the placeholders in the string with the provided values. The order of the values must match the number of the placeholder.
     * @param text Text with placeholders. E.g: "Hello {0}"
     * @param params The params that will replace the placeholders. E.g: ['World'] or when single value only 'World'
     */
    private _stringFormat(text: string, ...params: any[]): string {
        params.forEach((value: any, index: number) => {
            text = text.replace(new RegExp('\\{' + index + '\\}', 'g'), value);
        });

        return text;
    }
}
