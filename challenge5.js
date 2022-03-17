const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

/* expected outcome

Delayed Departure from FAO to TXL (11h25)
Arrival from BRU to FAO (11h45)
Delayed Departure from HEL to FAO (12h05)
Departure from FAO to LIS (12h30)

*/

const flightArray = flights.split('+');

const getFlightCode = function (flight) {
  return flight.slice(0, 3).toUpperCase();
};

for (const flightData of flightArray) {
  [flightStatus, flightSource, flightDestination, eventTime] =
    flightData.split(';');
  // console.log(flightStatus, flightSource, flightDestination, eventTime);

  const finalStr = `${flightStatus.split('_').join(' ')} from ${getFlightCode(
    flightSource
  )} to ${getFlightCode(flightDestination)} (${eventTime.replace(
    ':',
    'h'
  )})`.padStart(50);
  console.log(finalStr);
}
