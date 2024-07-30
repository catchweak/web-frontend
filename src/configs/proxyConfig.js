import createProxyMiddleware from "http-proxy-middleware";
import propertyConfigs from "./propertyConfig";

export default (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: propertyConfigs.catchweekServerHost,
      changeOrigin: true
    })
  );
};
