const getAddressFirstCharacters = (address: string) => address.slice(0, 5);

const getAddressLateCharacters = (address: string) =>
  address.slice(address.length - 4, address.length - 1);

export const getShortenedAddress = (address: string) =>
  `${getAddressFirstCharacters(address)}...${getAddressLateCharacters(
    address
  )}`;

// make a function that gives a random digit between 0 and 99
export const getRandom = () => Math.floor(Math.random() * 100);

