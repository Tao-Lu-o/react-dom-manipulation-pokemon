import React from "react";
import "./CSS/Pokemon.css";

export default function PokemonList({masterList}){
    return masterList.map((card, index) => (
        <div class="pokeball" key={index}>
            {card}
        </div>
    ));
}