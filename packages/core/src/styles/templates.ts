export const logo = `
<svg style="height: 2.0rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 211.35 209.02">
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path
        d="M3,70.2C18.43,9,88.83-7.82,135.38,4.16c55.55,14.3,87.56,73.07,72.06,128.37s-53.6,88.8-128.1,71.06C19.92,189.43-10,126.57,3,70.2Zm165.29,70.27c29.81-52,1.71-100.12-40-111.81S47.31,42,35.61,83.8s6.84,84,47.36,95.6c15.41,4.41,24.32,7.28,42,.92C145.61,172.9,156.47,161.14,168.31,140.47Z"
        style="fill:#598fef"
      />
      <path
        d="M3.29,84.33C13.36,23,69.77-7.4,123.4,1.54,180.05,11,219,63.94,210,120.67c-7.43,47-38.07,98.44-119.13,86.63C35.57,199.24-4.48,141.65,3.29,84.33Zm178.2,28.23c6.73-42.61-19.65-78.7-62.25-85.42s-78.46,22-87.36,64.24c-8.74,41.44,20.35,83.56,63,90.29S174.34,157.82,181.49,112.56Z"
        style="fill:#3d71e3"
      />
      <path
        d="M3,104.43A104.16,104.16,0,1,1,107.18,208.58,104.27,104.27,0,0,1,3,104.43Zm187.18,0a83,83,0,1,0-83,83A83.13,83.13,0,0,0,190.2,104.43Z"
        style="fill:#33332e"
      />
    </g>
  </g>
</svg>
`;

export const loader = `
<svg
  data-testid="loader"
  style="height: 25px; width: 100px; margin: 0 auto;"
  viewBox="0 0 135 140"
  xmlns="http://www.w3.org/2000/svg"
  fill="#3d71e3"
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
`;

export const iframeLoader = `
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
${loader}
</div>
`;
