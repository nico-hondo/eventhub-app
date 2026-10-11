export const selectSession = (state) => state.activeState.user;
export const selectRole = (state) => state.activeState.user?.role ?? "guest";
export const selectUser = (state) => state.registState.registeredUser;