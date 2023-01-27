import { SiweMessage } from 'siwe';

export function createSiweMessage (address, statement, domain, origin) {
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: '1',
  });
  return message.prepareMessage();
}