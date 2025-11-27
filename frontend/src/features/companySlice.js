import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({

    name:"company",
    initialState:{
        loading:false,
        singleCompany:null

    },
    reducers:{
        //actions

        setLoading:(state, action) =>{
            state.loading = action.payload

        },

        setSingleCompany: (state, action) =>{
            state.singleCompany = action.payload;

        }


    }
})


export const {setLoading, setSingleCompany} = companySlice.actions;
export default companySlice.reducer