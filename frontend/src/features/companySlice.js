import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({

    name:"company",
    initialState:{
        loading:false,
        singleCompany:null,
        allCompany:[]

    },
    reducers:{
        //actions

        setLoading:(state, action) =>{
            state.loading = action.payload

        },

        setSingleCompany: (state, action) =>{
            state.singleCompany = action.payload;

        },
         setAllCompany: (state, action) =>{
            state.allCompany = action.payload;

        }




    }
})


export const {setLoading, setSingleCompany, setAllCompany} = companySlice.actions;
export default companySlice.reducer