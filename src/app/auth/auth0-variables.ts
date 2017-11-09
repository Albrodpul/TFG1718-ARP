interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

const http = window.location.protocol;
const host = window.location.host;

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'XZJuYq4_-9ZBYQzhmlQafZC0boAbeAgI',
  domain: 'tfg1718-arp.eu.auth0.com',
  callbackURL: http+'//'+host+'/callback'
};
