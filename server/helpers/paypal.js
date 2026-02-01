const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", 
  client_id: "AfHa5zkXzuhecnAPYuWb3LVsO4UV-cfEwZ81ovdbOsDdL-mzgGwHs4QrFTPfz5XfGpgXbln_4YZpP__p",
  client_secret: "EDFdkQ1A8-AU4PNJSmAwGxY6j8UUgnzb3l6ffNGDrRQw9DT_5uUv6Y4eHkvsa0JVqzrp5Td-40JlONIm",
});

module.exports = paypal;