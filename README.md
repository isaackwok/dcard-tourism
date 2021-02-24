## How to run

3. First, install dependencies for the project.
```bash
npm install
# or
yarn
```

2. (Optional) You can replace the ***AppID*** and ***ApiKey*** with your own, in **/utils/apiAuth.js.
```javascript
const getAuthorizationHeader = () => {
    // Get authorization header for MOTC API. 
    let AppID = {YOUR_APP_ID};
    let ApiKey = {YOUR_API_KEY};

    // ...
    // ...
}
```

3. Then, build the project and start the server:

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
