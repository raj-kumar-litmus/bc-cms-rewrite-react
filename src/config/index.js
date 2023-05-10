const configurations = {
  development: {
    hostnameClient: "http://localhost:3000",
    hostnameServer: "http://localhost:3010",
    msGraphHostName: "https://graph.microsoft.com/v1.0",
    msLoginHostName: "https://login.microsoftonline.com",
    tenantId: "420b9f05-caaa-4e33-9309-3eeb115514fd",
    clientId: "f7fdabfa-274a-4401-852d-b448a62f70d6",
    azureUserGroups: {
      "2e4ef0ca-1fb2-4d42-83a1-1b07a58b1eb5": "Sizing app",
      "c1346560-4ac5-4256-a3e8-b4021eb183fb": "Data Normalization app"
    }
  },
  staging: {
    hostnameClient: "https://bc-cms-rewrite-react.vercel.app",
    hostnameServer: "bc-cms-rewrite-node-ms.vercel.app",
    msGraphHostName: "https://graph.microsoft.com/v1.0",
    msLoginHostName: "https://login.microsoftonline.com",
    tenantId: "420b9f05-caaa-4e33-9309-3eeb115514fd",
    clientId: "f7fdabfa-274a-4401-852d-b448a62f70d6",
    azureUserGroups: {
      "2e4ef0ca-1fb2-4d42-83a1-1b07a58b1eb5": "Sizing app",
      "c1346560-4ac5-4256-a3e8-b4021eb183fb": "Data Normalization app"
    }
  },
  production: {

  }
};

export default configurations;
