/** In redux we setUp a data layer where we push the required information into the dataLayer
 * in this dataLayer we can setUp different Slices like an onion where we can push required information
 * in the respective Slice
 * And the pushed information could be accessed anywhere in the instead of deep prop drilling
 */

//this is the store where we push the users information into it

import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../features/userSlice";
export default configureStore({
  reducer: {
    user: useReducer,
  },
});
