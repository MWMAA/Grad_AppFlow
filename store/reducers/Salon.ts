import { AnyAction } from "redux";
import { Salon } from "../../interfaces/salon";

interface stateInterface {
  salonData: Salon[] | null;
}

const initialState: stateInterface = {
  salonData: [
    {
      _id: 1,
      name: "Lorem Ispum",
      owner: "7amada",
      address: {
        country: "Egypt",
        city: "6 October",
        street: "Omda street",
        building_number: 15,
      },
      contact_Info: {
        email: "Banana@Kevinnn.com",
        mobile: [0o115121213],
      },
      services: [
        { name: "7ela2a123", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
        { name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" },
      ],
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      open_hrs: {
        starting_hour: "12:30",
        closing_hour: "15:60",
      },
    },
    {
      _id: 2,
      name: "7ebooni",
      owner: "7amada",
      address: {
        country: "Egypt",
        city: "6 October",
        street: "15",
        building_number: 15,
      },
      contact_Info: {
        email: "Banana@Kevinnn.com",
        mobile: [0o115121213],
      },
      services: [{ name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" }],
      about: "yaaaaaaaaaah ya abdelsamad",
      open_hrs: {
        starting_hour: "12:30",
        closing_hour: "15:60",
      },
    },
    {
      _id: 3,
      name: "7ebooni",
      owner: "7amada",
      address: {
        country: "Egypt",
        city: "6 October",
        street: "15",
        building_number: 15,
      },
      contact_Info: {
        email: "Banana@Kevinnn.com",
        mobile: [0o115121213],
      },
      services: [{ name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" }],
      about: "yaaaaaaaaaah ya abdelsamad",
      open_hrs: {
        starting_hour: "12:30",
        closing_hour: "15:60",
      },
    },
    {
      _id: 4,
      name: "7ebooni",
      owner: "7amada",
      address: {
        country: "Egypt",
        city: "6 October",
        street: "15",
        building_number: 15,
      },
      contact_Info: {
        email: "Banana@Kevinnn.com",
        mobile: [0o115121213],
      },
      services: [{ name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" }],
      about: "yaaaaaaaaaah ya abdelsamad",
      open_hrs: {
        starting_hour: "12:30",
        closing_hour: "15:60",
      },
    },
    {
      _id: 5,
      name: "7ebooni",
      owner: "7amada",
      address: {
        country: "Egypt",
        city: "6 October",
        street: "15",
        building_number: 15,
      },
      contact_Info: {
        email: "Banana@Kevinnn.com",
        mobile: [0o115121213],
      },
      services: [{ name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" }],
      about: "yaaaaaaaaaah ya abdelsamad",
      open_hrs: {
        starting_hour: "12:30",
        closing_hour: "15:60",
      },
    },
    {
      _id: 6,
      name: "7ebooni",
      owner: "7amada",
      address: {
        country: "Egypt",
        city: "6 October",
        street: "15",
        building_number: 15,
      },
      contact_Info: {
        email: "Banana@Kevinnn.com",
        mobile: [0o115121213],
      },
      services: [{ name: "7ela2a", cost: 30.0, description: "Mesh 3aiezzzz" }],
      about: "yaaaaaaaaaah ya abdelsamad",
      open_hrs: {
        starting_hour: "12:30",
        closing_hour: "15:60",
      },
    },
  ],
};

export const salonReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "ADD_SALON":
      return { salonData: state.salonData!.push(action.salonData) };
    case "GET_ALL_SALONS":
      return state.salonData;
    case "GET_SALON":
      return state.salonData!.find((salon) => salon._id === action.id);
    case "UPDATE_SALON":
      return { ...state, token: action.accessToken };
    case "DELETE_SALON":
      return {
        salonData: state.salonData!.filter((salon) => salon._id !== action.id),
      };
    default:
      return state;
  }
};
