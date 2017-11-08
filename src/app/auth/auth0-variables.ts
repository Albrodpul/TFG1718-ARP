interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

var host = window.location.host;
var http = window.location.protocol;

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'XZJuYq4_-9ZBYQzhmlQafZC0boAbeAgI',
  domain: 'tfg1718-arp.eu.auth0.com',
  callbackURL: http+'//'+host+'/callback'
};
