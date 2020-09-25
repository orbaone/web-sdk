import { OrbaOneConfig } from "./helpers/types";

import {
    getButton,
    createIframe,
    createLoader,
    getApplicationId,
    getSessionUrl,
    isValidConfig,
    OrbaOne,
    applyDefaultButtonStyle,
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
        .then((response: Response) => {
            response
                .json()
                .then((data) => {
                    const url = getSessionUrl(verificationUrl, apiKey, data.applicantId, steps);
                    const iframe = createIframe(url);
                    const orbaOne = OrbaOne(iframe, onSuccess, onError);
                    orbaOne.connect();
                })
                .catch((err) => {
                    onError(err.message);
                });
        })
        .catch((err) => {
            orbaOneloader.hide();
            onError(err.message);
        });
}

export function renderButton(config: OrbaOneConfig): void {
    const { target, disableStyle } = config;

    if (isValidConfig(["apiKey", "target", "onSuccess", "onError", "steps"], config)) {
        const button = disableStyle ? getButton(target) : applyDefaultButtonStyle(getButton(target));

        button.onclick = () => {
            initializeVerification(config);
        };
    }
}

export { OrbaOneConfig };
