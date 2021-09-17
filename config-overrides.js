const {
  override,
} = require("customize-cra");


module.exports = override(
  (config) => {
    return {
      ...config,
      node: {
        ...config.node,

        // Using __filename and __dirname will have the real value
        __filename: true,
        __dirname: true,
      },
    };
  },
);
