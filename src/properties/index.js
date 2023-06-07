const properties = {
  postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI,
  clientId: process.env.VITE_CLIENT_ID,
  tenantId: process.env.VITE_TENANT_ID,
  sizingGroupName: process.env.VITE_SIZING_GROUP_NAME,
  adminGroupName: process.env.VITE_ADMIN_GROUP_NAME,
  writerGroupName: process.env.VITE_WRITER_GROUP_NAME,
  editorGroupName: process.env.VITE_EDITOR_GROUP_NAME,
  adminGroupId: process.env.VITE_ADMIN_GROUP_ID,
  serverHostName: process.env.VITE_SERVER_HOST_NAME
};

export default properties;
