//to get/set the TURN servers in our website

let turnServers = [];

export const getTurnServers = () => {
  return turnServers;
};

export const setTurnServers = (servers) => {
  turnServers = servers;
};
