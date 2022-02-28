import React, { useState, useEffect } from "react";
import "./CSS/Pokemon.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function PokemonCard( {object} ){
    const [edit, setEdit] = useState(
        {
            pokeID: object.pokeID,
            text: object.text,
            image: object.image,
        }
    )
    const [update, setUpdate] = useState("");

    function getPokemon(newName){
        fetch(`https://pokeapi.co/api/v2/pokemon/${newName}`)
            .then(request => request.json())
            .then(pokemon => {
                console.log("name before setEdit: " + newName);
                setEdit({
                pokeID: pokemon.id,
                text: pokemon.name,
                image: <img src={pokemon.sprites.front_default} alt={`picture of ${edit.text}`}/>
                })
            })
            .catch(rejected => console.log(rejected))
    }

    const handleChange = (e) => {
        setUpdate(e.target.value);
        console.log(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("update in Submit: " + update);
        getPokemon(update);
    }

    return(
        <div>
        {/* {console.log(edit)} */}
            {edit.image}
            <h1>{edit.pokeID} - {edit.text}</h1>
            <div class="updateForm" onSubmit={handleSubmit}>
                <TextField onInput={handleChange} variant="filled" />
                <Button onClick={handleSubmit} variant="contained">Change</Button>
            </div>
        </div>
    );
}