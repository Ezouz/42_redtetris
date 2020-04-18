const reducer = (state = { }, action) => {
  switch(action.type){
    case 'END':
        return {
          ...state,
          winner: {}
        };
    case 'UPDATE_PLAYERS':
        return {
          ...state,
          players: action.players
        }
    case 'CURRENT_PLAYER':
        return {
          ...state,
          currentPlayer: action.currentPlayer
        }
    case 'WINNER':
    return {
      ...state,
      winner: action.player
    }
    case 'RESET':
        return {
          ...state,
          winner: undefined
        }
    case 'ADD_ROUND':
      return {
        ...state,
        currentPlayer: action.currentPlayer
      }
    case 'TOGGLE_RUNNING':
      return {
        ...state,
        isRunning: action.isRunning,
      };
    default: 
      return state
  }
}

export default reducer