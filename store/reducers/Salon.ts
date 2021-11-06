import { AnyAction } from "redux";
import { Salon } from "../../interfaces/salon";

interface stateInterface {
  salonData: Salon[] | null;
}

const initialState: stateInterface = { salonData: [] };

export const salonReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "ADD_SALON":
      return state.salonData!.push(action.salonData);
    case "SET_SALONS":
      return { salonData: [...action.salonData] };
    case "UPDATE_SALON":
      return state.salonData!.map((salon) => {
        if (salon._id === action.id) {
          return {
            ...salon,
            ...action.updates,
          };
        } else {
          return salon;
        }
      });
    case "DELETE_SALON":
      return state.salonData!.filter((salon) => salon._id !== action.id);
    default:
      return state;
  }
};
