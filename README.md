# Orba One

To integrate the Orba One SDK, follow this guide and use your
own API Key which you can obtain from the developer dashboard.

The integration of the Orba One Web SDK follows a few simple steps:

1. Install the SDK through NPM / Yarn
2. Get an API Key
3. Render a Orba One verification button and handle the result

Additionally, a non package manager dependant solution, based on HTML script tag, can be found at At [Orba One docs website](https://docs.orbaone.com/).

# 1. Install the SDK

```bash
# NPM
npm install --save @orbaone/verify

# Yarn
yarn add @orbaone/verify
```

# 2. Get an API Key

Orba One uses API keys to allow access to the API and show onboarded users in your dashboard. Login to your Orba One account and create a new Orba One API key here: [Developer Dashboard](https://vendor.orbaone.com).

# 3. Render the verification button

**Import the Orba One SDK**

```javascript
import { renderButton } from "@orbaone/verify";
```

## A. With a function

**Invoke the button rendering function**

```javascript
renderButton(mountingElement, cb, apiKey, (options = {}));
```

**target** _string_: The DOM element you want to mount the button on 

**apiKey** _string_: The OrbaOne Key you obtained from the dashboard.

**disableStyle** _boolean_ : The OrbaOne Key you obtained from the dashboard.  

**onSuccess** _function_ : Callback function after onboarding is complete.

**onError** _function_ : Callback function if onboarding has failed.

**steps** _array_ : Array of verification steps.     


