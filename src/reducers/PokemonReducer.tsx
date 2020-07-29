import {createSlice,configureStore} from '@reduxjs/toolkit'
import {Dispatch} from 'redux'
import axios from 'axios'

// payloadAction is default
// ts types 

export interface pokomenType {
    abilities :PokeMonAbility[],   //types we are assigning , it is a array so we gave []
    sprites:PokemonSprites,     //this is not an array
    Starts:PokemonStarts[]
}
export interface PokeMonAbility {
    ability:{
        name: string;
        url: string;
    }
   
}
export type PokemonSprites = {
    front_default:string;
}

// array and object type
export type PokemonStarts = {
    base_stat:number;
    stat : {
        name:string
    }
}

// type for initial state 

interface DefaultSateI{
    loading: boolean,
    pokemon?:pokomenType   // opitional value

}

// initial state
const defaultSate: DefaultSateI ={
    loading:false
}


// creating slice
const PokemonReducer=createSlice({
    name:'pokemons',
    initialState:defaultSate,
    reducers:{
            getload:(state) =>{
               state.loading=true
            },
            getfail:(state)=>{
                state.loading=false
            },
            getSuccess:(state,{payload})=>{
                state.pokemon= payload
                state.loading=false

            },
            
    }
})






export  const Getpoken = (pokemon:string)=> async (dispatch:Dispatch) =>{
//fetch api data
    try{
        dispatch(getload())
        const res= await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const response=res.data
        dispatch(getSuccess(response))
    }
    catch(e){
        dispatch(getfail())
    }

}

export const {getload,getfail,getSuccess }= PokemonReducer.actions

const reducer={
    pokemons:PokemonReducer.reducer
}

export default configureStore({
    reducer   // reducer name is diffrent means reducer:reducername
})