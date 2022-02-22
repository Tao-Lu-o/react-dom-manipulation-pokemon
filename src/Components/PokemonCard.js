import React, { useState } from "react";
import "./CSS/Pokemon.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material";

export default function PokemonCard({name}){
    const [edit, setEdit] = useState(
        {
            pokeID: null,
            text: "",
            image: null
        }
    )
    const [update, setUpdate] = useState("");

    function getPokemon(){
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(request => request.json())
            .then(pokemon => {
                setEdit({
                pokeID: pokemon.id,
                text: pokemon.name,
                image: pokemon.sprites.front_default
                })
            })
            .catch(rejected => console.log(rejected))
    }

    const handleChange = (e) => {
        setUpdate(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        name = update;
        getPokemon();
        setUpdate("");
    }

    return(
        <div>
            {edit.image}
            <h1>{edit.pokeID} - {edit.name}</h1>
            <div class="updateForm">
                <TextField onChange={handleChange} variant="filled" />
                <AddCircleIcon onClick={handleSubmit} />
            </div>
        </div>
    );
}