const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
        plugin:CracoAlias,
        options:{
            source : "tsconfig",
            tsConfigPath : "./tsconfig.json",
        }
    }
  ],
  babel: {
    plugins: [
      process.env.NODE_ENV === 'development' && 'react-refresh/babel',
    ].filter(Boolean),
  },
};
