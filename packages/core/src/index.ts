import { createButton } from "./elements/button";
import { createIframe } from "./elements/iframe";
import { apiUrl, verificationUrl } from "./helpers/defaultConfig";
import { OrbaOneConfig } from "./helpers/types";

import { getApplicationId, getSessionUrl, isValidConfig } from "./helpers/utils";

function initializeVerification(config: OrbaOneConfig, button: ReturnType<typeof createButton>): void {
    const { apiKey, onSuccess, onError, steps } = config;

    //Set Loading state
    button.setState("loading");

    getApplicationId(apiUrl, apiKey)
        .then((response: Response) => {
            response
                .json()
                .then((data) => {
                    const url = getSessionUrl(verificationUrl, apiKey, data.applicantId, steps);
                    const iframe = createIframe(url, onSuccess, onError);
                    iframe.connect();

                    button.setState("success");
                })
                .catch((err) => {
                    onError(err.message);
                });
        })
        .catch((err) => {
            button.setState("error");
            onError(err.message);
        });
}

export function renderButton(config: OrbaOneConfig): void {
    const { target, disableStyle } = config;

    if (isValidConfig(["apiKey", "target", "onSuccess", "onError", "steps"], config)) {
        const button = createButton(target, disableStyle);

        button.el.onclick = () => {
            initializeVerification(config, button);
        };
    }
}

export { OrbaOneConfig };
