'use client';

import './tetris.scss'
import { useEffect, useState } from 'react';

export default function Tetris() {
    
    useEffect(() => {
        console.log('test')
    }, [])
    
    
    function populateContainer() {
        let matrix = [];

        const tetrisContainer = document.querySelector('#tetris-container');
        let containerHeight = tetrisContainer.offsetHeight;
        let containerWidth = tetrisContainer.offsetWidth;
        let columnsToFit = Math.floor(containerWidth / 60);


        tetrisContainer.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(60px, 1fr))`
        

    }

    return (
    
        <section id={'tetris-container'}>
            
        </section>
    )
}