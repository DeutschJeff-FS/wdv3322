const options = {
  origin: "*",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Requested-With",
    "Origin",
  ],
  methods: "GET, POST, PUT, PATCH, DELETE",
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

module.exports = options;
