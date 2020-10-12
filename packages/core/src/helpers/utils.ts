import { OrbaOneConfig } from "./types";

export function isDomElement(obj: any): obj is HTMLElement | Element {
    //! check if obj is not null explicitly because null is a type of object
    return !!(obj !== null && typeof obj === "object" && obj.nodeType !== undefined);
}

export function isValidConfig(requiredProps: Array<keyof Omit<OrbaOneConfig, "disableStyle">>, config: any) {
    if (!config) {
        throw "Configuration object not found, please see https://docs.orbaone.com";
    }
    const validationSchema = {
        target: (val: any) => {
            if (typeof val !== "string" && !isDomElement(val)) {
                throw `target ${val} must be of type string or DOM Element, please see https://docs.orbaone.com`;
            }
        },
        applicantId: (val: any) => {
            if (typeof val !== "string") {
                throw `applicantId key required, please see https://docs.orbaone.com`;
            }
        },
        apiKey: (val: any) => {
            if (typeof val !== "string") {
                throw `apiKey required, please see https://docs.orbaone.com`;
            }
        },
        onSuccess: (val: any) => {
            if (typeof val !== "function") {
                throw `onSuccess must be a function, please see https://docs.orbaone.com`;
            }
        },
        onError: (val: any) => {
            if (typeof val !== "function") {
                throw `onError must be a function, please see https://docs.orbaone.com`;
            }
        },
        steps: (val: any) => {
            if (!Array.isArray(val)) {
                throw `Verification steps field missing, please see https://docs.orbaone.com`;
            }
        },
    };
    requiredProps.forEach((prop) => {
        validationSchema[prop](config[prop]);
    });

    return true;
}

export function getSessionUrl(verificationUrl: string, apiKey: string, applicantId: any, steps: string[]) {
    return `${verificationUrl}?publicKey=${apiKey}&applicantId=${applicantId}&steps=${steps.join("&steps=")}`;
}

export function getApplicationId(apiUrl: string, apiKey: string) {
    return fetch(`${apiUrl}/applicants/request`, {
        headers: {
            Accept: "application/json",
            "Accept-Enconding": "gzip, deflate, br",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            PublicKey: apiKey,
        },
        method: "POST",
        body: JSON.stringify({
            publicKey: apiKey,
        }),
    });
}
