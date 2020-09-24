import { OrbaOneConfig } from "./helpers/types";

import {
    createButton,
    createIframe,
    createLoader,
    getApplicationId,
    getSessionUrl,
    isValidConfig,
    OrbaOne,
} from "./helpers/utils";

function initializeVerification(config: OrbaOneConfig): void {
    const { apiKey, onSuccess, onError, steps } = config;
    const apiUrl = "https://app.t3std3v.orbaone.com/api/v1";
    const verificationUrl = "https://verify.orbaone.com/";
    const orbaOneLoaderId = "#orba-one-loader";

    //Set Loading state
    const orbaOneloader = createLoader(orbaOneLoaderId);
    orbaOneloader.show();

    getApplicationId(apiUrl, apiKey)
        .then(async (response: Response) => {
            const { applicantId } = await response.json();
            const url = getSessionUrl(verificationUrl, apiKey, applicantId, steps);
            const iframe = createIframe(url);
            const orbaOne = OrbaOne(iframe, onSuccess, onError);
            try {
                orbaOne.connect();
            } catch (err) {
                onError(err.message);
                orbaOne.disconnect();
            }
        })
        .catch((err) => {
            orbaOneloader.hide();
            onError(err.message);
        });
}

export function renderButton(config: OrbaOneConfig): void {
    const { target, disableStyle } = config;

    if (isValidConfig(["apiKey", "target", "onSuccess", "onError", "steps"], config)) {
        const button = createButton(target, disableStyle);
        button.onclick = () => {
            initializeVerification(config);
        };
    }
}

export { OrbaOneConfig };
