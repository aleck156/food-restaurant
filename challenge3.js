const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2.
console.log(gameEvents);
gameEvents.delete(64);

// 3.
const counter = 90 / gameEvents.size;
console.log(`An event happened, on average, every ${counter} minutes`);

// 4.
for (const [time, action] of gameEvents) {
  console.log(`[${time <= 45 ? 'FIRST' : 'SECOND'} HALF] ${time}: ${action}`);
}
