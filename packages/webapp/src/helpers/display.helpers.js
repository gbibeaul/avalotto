const getAddressFirstCharacters = (address) => address.slice(0, 5);

const getAddressLateCharacters = (address) =>
    address.slice(address.length - 4, address.length - 1);

export const getShortenedAddress = (address) =>
    `${getAddressFirstCharacters(address)}...${
    getAddressLateCharacters(
      address,
    )
  }`;