interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

const host = window.location.host;
const http = window.location.protocol;

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'XZJuYq4_-9ZBYQzhmlQafZC0boAbeAgI',
  domain: 'tfg1718-arp.eu.auth0.com',
  callbackURL: 'https://tfg1718-arp.herokuapp.com/callback'
};
