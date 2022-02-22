import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import PokemonList from "./PokemonList";
import PokemonCard from "./PokemonCard";
import "./CSS/Input.css";

export default function Input(){
    const [input, setInput] = useState("");
    const [list, setList] = useState([]);

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newPokemon = <PokemonCard name={input}/>;
        const updatedList = [newPokemon, ...list];

        setList(updatedList);
        setInput("");
    }

    return(
        <>
            <div class="listForm">
                <TextField onChange={handleChange} variant="filled"/>
                <Button onClick={handleSubmit} variant="contained">Update</Button>
            </div>
            <PokemonList 
            masterList={list}
            />
        </>
    );
}