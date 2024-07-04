const propertyJson = require("./property.json");

const catchweekServerHost =
  process.env.catchweekServerHost || propertyJson["catchweekServerHost"];
const publicURL = process.env.catchweekClientHost || propertyJson["publicURL"];

const propertyConfigs = {
  catchweekServerHost,
  publicURL
};

export default propertyConfigs;
