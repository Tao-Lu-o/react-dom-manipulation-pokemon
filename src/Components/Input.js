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

    function getPokemon(newName){
        fetch(`https://pokeapi.co/api/v2/pokemon/${newName}`)
            .then(request => request.json())
            .then(pokemon => {
                console.log("name before setEdit: " + newName);
                object.pokeID = pokemon.id;
                object.text = pokemon.name;
                object.image = <img src={pokemon.sprites.front_default} alt={`picture of ${object.text}`}/>;
                // setObject({
                //     pokeID: pokemon.id,
                //     text: pokemon.name,
                //     image: <img src={pokemon.sprites.front_default} alt={`picture of ${object.text}`}/>
                // })
                console.log(pokemon);
                console.log(object);
                let newPokemon = <PokemonCard object={object}/>;
                const updatedList = [newPokemon, ...list];
                setList(updatedList);
            })
            .catch(rejected => console.log(rejected))
    }

    const handleChange = (e) => {
        setInput(e.target.value);
        console.log("input: " + input);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("input submit: " + input);
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