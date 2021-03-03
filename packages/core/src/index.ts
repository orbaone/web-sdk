import { createButton } from "./elements/button";
import { createIframe } from "./elements/iframe";
import { verificationUrl } from "./helpers/defaultConfig";
import { loadingDiv } from "./helpers/elements";
import { OrbaOneConfig } from "./helpers/types";

import { getSessionUrl, isValidConfig } from "./helpers/utils";

function initializeVerification(config: OrbaOneConfig, button: ReturnType<typeof createButton>): void {
    const { apiKey, applicantId, onSuccess, onCancelled, onError, steps } = config;

    //Set Loading state
    button.setState("loading");
    loadingDiv.innerHTML = `
    <div 
        style="
            position:absolute; 
            top:0;
            bottom:0; 
            left:0; 
            right:0; 
            display:flex; 
            align-items:center; 
            justify-content:center;
            background-color: rgba(255, 255, 255, 0.8); 
    ">
        <p>Loading...</p>
        <img src="../loader.svg" alt="Loader" />
    </div>
    `;

    document.body.appendChild(loadingDiv);
    const url = getSessionUrl(verificationUrl, apiKey, applicantId, steps);
    const iframe = createIframe(url, applicantId, onSuccess, onCancelled, onError, (state) => {
        button.setState(state);
    });
    iframe.connect();
}

export function renderButton(config: OrbaOneConfig): void {
    const { target, disableStyle, onChange } = config;

    if (isValidConfig(["apiKey", "applicantId", "target", "onSuccess", "onCancelled", "onError", "steps"], config)) {
        const button = createButton(target, disableStyle, onChange);

        button.el.onclick = () => {
            initializeVerification(config, button);
        };
    }
}

export { OrbaOneConfig };
