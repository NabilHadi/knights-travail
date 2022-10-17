function getAdjacentNodes(x, y, forwardSteps, sideSteps) {
  let possibleMoves = [];

  possibleMoves.push(
    [x + forwardSteps, y + sideSteps],
    [x + forwardSteps, y - sideSteps],
    [x - forwardSteps, y + sideSteps],
    [x - forwardSteps, y - sideSteps],
    [x + sideSteps, y + forwardSteps],
    [x + sideSteps, y - forwardSteps],
    [x - sideSteps, y + forwardSteps],
    [x - sideSteps, y - forwardSteps]
  );

  possibleMoves = possibleMoves.filter((move) => {
    if (move[0] < 0 || move[0] > 7 || move[1] < 0 || move[1] > 7) {
      return false;
    }
    return true;
  });

  return possibleMoves;
}

function knightMoves(start, end) {
  let adjacentNodes = getAdjacentNodes(start[0], start[1], 2, 1);

  // Check for end position in possible moves
  let endNode = adjacentNodes.find((node) => {
    return node[0] === end[0] && node[1] === end[1];
  });
  if (endNode) {
    return [start, endNode];
  }

  let bfsInfo = [];

  bfsInfo.push({
    x: start[0],
    y: start[1],
    distance: 0,
    predecessor: null,
  });

  const queue = [start];

  let distance = 1;
  while (queue.length > 0) {
    let u = queue.shift();
    let adjV = getAdjacentNodes(u[0], u[1], 2, 1);
    adjV = adjV.filter((arr) => {
      return !bfsInfo.some((n) => {
        return n.x === arr[0] && n.y === arr[1];
      });
    });
    adjV.forEach((arr) => {
      bfsInfo.push({
        x: arr[0],
        y: arr[1],
        distance,
        predecessor: u,
      });
    });
    distance++;
    queue.push(...adjV);
  }

  let last = bfsInfo.find((obj) => {
    return obj.x === end[0] && obj.y === end[1];
  });

  let moves = [];
  let current = last;
  while (current) {
    moves.unshift([current.x, current.y]);
    if (!current.predecessor) {
      break;
    }
    current = bfsInfo.find((obj) => {
      return (
        current.predecessor[0] === obj.x && current.predecessor[1] === obj.y
      );
    });
  }

  return moves;
}

console.log(knightMoves([7, 7], [7, 6]));
