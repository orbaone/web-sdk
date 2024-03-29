import { createButton } from "./elements/button";
import { createIframe } from "./elements/iframe";
import { orbaOneUrls } from "./helpers/defaultConfig";
import { OrbaOneConfig } from "./helpers/types";

import { getSessionUrl, isValidConfig } from "./helpers/utils";

function initializeVerification(config: OrbaOneConfig, button: ReturnType<typeof createButton>): void {
    const { apiKey, applicantId, onSuccess, onCancelled, onError, steps, companyId, useAudioInstructions } = config;

    //Set Loading state
    button.setState("loading");
    const verificationUrl = config.environment == "staging" ? orbaOneUrls.staging.verify : orbaOneUrls.prod.verify;
    const url = getSessionUrl({verificationUrl, apiKey, steps, companyId, applicantId, useAudioInstructions});
    const iframe = createIframe({url, applicantId, companyId, useAudioInstructions, onSuccess, onCancelled, onError, onChange:(state) => {
        button.setState(state);
    }});
    iframe.connect();
}

export function renderButton(config: OrbaOneConfig): void {
    const { target, disableStyle, onChange } = config;

    if (isValidConfig(["apiKey", "target", "onSuccess", "onCancelled", "onError", "steps"], config)) {
        const button = createButton(target, disableStyle, onChange);

        button.el.onclick = () => {
            initializeVerification(config, button);
        };
    }
}

export { OrbaOneConfig };
