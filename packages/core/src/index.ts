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
    <svg
    style="width: 100px; margin: 0 auto"
    viewBox="0 0 135 140"
    xmlns="http://www.w3.org/2000/svg"
    :height="height"
    :fill="primaryColor"
  >
    <rect y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.5s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.5s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="30" y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.25s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.25s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="60" width="15" height="140" rx="6">
      <animate
        attributeName="height"
        begin="0s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="90" y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.25s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.25s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="120" y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.5s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.5s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
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
