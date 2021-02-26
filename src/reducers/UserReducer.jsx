export const initialState = {
    id: '',
    avatar: '',
    favorites: [],
    appointments: [],
};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar };
        case 'setId':
            return { ...state, id: action.payload.id };
        case 'setAppointments':
            return { ...state, appointments: [...state.appointments, ...action.payload.appointments] }
        default:
            return state;
    };
};
