import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import PokemonList from "./PokemonList";
import PokemonCard from "./PokemonCard";
import "./CSS/Input.css";

export default function Input(){
    const [input, setInput] = useState("");
    const [list, setList] = useState([]);
    const [object, setObject] = useState(
        {
            pokeID: null,
            text: "",
            image: null,
        }
    )

    // Function to get the Pokemon, same as PokemonCard component but without the use of a setter
    function getPokemon(newName){
        fetch(`https://pokeapi.co/api/v2/pokemon/${newName}`)
            .then(request => request.json())
            .then(pokemon => {
                // I know this is terrible use of Hooks but setObject wasn't working for whatever reason
                // Therefore I opted out to just edit the object's attributes directly.
                object.pokeID = pokemon.id;
                object.text = pokemon.name;
                object.image = <img src={pokemon.sprites.front_default} alt={`picture of ${object.text}`}/>;
                console.log(object);

                // A new PokemonCard is created, added to the list
                let newPokemon = <PokemonCard object={object}/>;
                const updatedList = [newPokemon, ...list];
                setList(updatedList);
            })
            .catch(rejected => console.log(rejected))
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getPokemon(input);
    }

    return(
        <>
            <div class="listForm" onSubmit={handleSubmit}>
                <TextField onInput={handleChange} variant="filled"/>
                <Button onClick={handleSubmit} variant="contained">Find</Button>
            </div>
            <PokemonList 
            masterList={list}
            />
        </>
    );
}