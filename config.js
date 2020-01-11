const config = {
  hashingSecret: 'someSecret',
  port: 3000,
  stripe: {
    publicKey: 'pk_test_cImC2vMLnl6VtqQhqgcAas2R00PkLaKtdr',
    privateKey: 'sk_test_PoJXwv4H9R70pSvcRJsaSH0n00XZ8eod3e',
    apiProtocol: 'https:',
    apiHost: 'api.stripe.com',
    createTokenPath: '/v1/tokens',
    createChargePath: '/v1/charges',
    apiMethod: 'POST',
    currency: 'usd',
  },
};

module.exports = config;
