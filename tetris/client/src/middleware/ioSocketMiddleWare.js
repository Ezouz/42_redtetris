export const ioSocketMiddleWare = () => {
  return next => (action) => {
    if (action.type === 'START') {
      action.socket.emit('start', action.room);
      return next(action);
    }
    else if (action.type === 'END') {
      action.socket.emit('end', action.room);
      return next(action);
    }
    else if (action.type === 'UPDATE_PLAYERS') {
      return next(action);
    }
    else if (action.type === 'COLLISION') {
      action.socket.emit('collision', action.player, action.room);
      return next(action);
    }
    else if (action.type === 'REFILL') {
      return next(action);
    }
    else if (action.type === 'CURRENT_PLAYER') {
      return next(action);
    }
    else if (action.type === 'GAME_OVER') {
      action.socket.emit('game_over', action.player, action.room);
      return next(action);
    }
    else if (action.type === 'SMASH') {
      action.socket.emit('smash', action.player, action.room);
      return next(action);
    }
    else if (action.type === 'WINNER') {
      action.socket.emit('end', action.room);
      return next(action);
    }
    else if (action.type === 'RESET') {
      action.socket.emit('reset', action.room);
      return next(action);
    }
    else if (action.type === 'ADD_ROUND') {
      return next(action);
    }
    else if (action.type === 'TOGGLE_RUNNING') {
      return next(action);
    }
    else if (action.type === 'SET_SCORE') {
      action.socket.emit('set_score', action.player, action.room);
      return next(action);
    }
    return;
  }
}