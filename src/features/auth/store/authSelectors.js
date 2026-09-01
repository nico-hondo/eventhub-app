export const selectSession = (state) => state.activeState.user;
export const selectRole = (state) => state.activeState.user?.role ?? "guest";