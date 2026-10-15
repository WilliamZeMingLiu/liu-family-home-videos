// A "random run" starts when a video is opened from the Memories row.
// → always plays a video not yet seen in this run; ← walks back through what was watched.
//
// run = {
//   trail:    ids watched, in order (← moves back along it)
//   cursor:   index in trail of the video playing now
//   queue:    the rest of the Memories row, played first by →
//   seen:     ids → must not repeat (reset once everything has been seen)
//   upcoming: the id → will play, picked ahead so its title can be shown
// }

const randomFrom = (list) => list[Math.floor(Math.random() * list.length)];

function withUpcoming(run, allIds) {
  const seen = new Set(run.seen);
  const fromRow = run.queue.find((id) => !seen.has(id));
  if (fromRow) return { ...run, upcoming: fromRow };

  let pool = allIds.filter((id) => !seen.has(id));
  let nextSeen = run.seen;
  if (pool.length === 0) {
    // Everything has been seen: start over, counting only the current video.
    const current = run.trail[run.cursor];
    nextSeen = [current];
    pool = allIds.filter((id) => id !== current);
  }
  return { ...run, seen: nextSeen, upcoming: randomFrom(pool) };
}

export function startRandomRun(clickedId, rowIds, allIds) {
  return withUpcoming(
    {
      trail: [clickedId],
      cursor: 0,
      queue: rowIds.slice(rowIds.indexOf(clickedId) + 1),
      seen: [clickedId],
      upcoming: undefined,
    },
    allIds,
  );
}

// → : play the upcoming video. After going ← it still plays something new; the
// videos ahead of the cursor stay "seen", so they won't come back through →.
export function stepForward(run, allIds) {
  const id = run.upcoming;
  const trail = [...run.trail.slice(0, run.cursor + 1), id];
  return withUpcoming(
    {
      trail,
      cursor: trail.length - 1,
      queue: run.queue.filter((queued) => queued !== id),
      seen: [...run.seen, id],
      upcoming: undefined,
    },
    allIds,
  );
}

export const stepBack = (run) => ({ ...run, cursor: run.cursor - 1 });

export const currentId = (run) => run.trail[run.cursor];

export const previousId = (run) =>
  run.cursor > 0 ? run.trail[run.cursor - 1] : undefined;
