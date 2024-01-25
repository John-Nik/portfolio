'use client';

import './tetris.scss'
import { useEffect, useState } from 'react';
import Square from './square.js'

export default function Tetris() {
    let [buttons, setButtons] = useState([]);
    let [k, setk] = useState(0);
    let [matrixProcessed, setMatrixProcessed] = useState([])
    let [renderComponent, setRenderComponent] = useState(false)


    useEffect(() => {
        let matrix = [];
        let count = 0;

        const tetrisContainer = document.querySelector('#tetris-container');
        let containerHeight = tetrisContainer.offsetHeight;
        let containerWidth = tetrisContainer.offsetWidth;
        let columnsToFit = Math.floor(containerWidth / 32);
        let columnsWidth = containerWidth / columnsToFit;
        columnsWidth = columnsWidth.toFixed(2);
        let rowsToFit = Math.floor(containerHeight / columnsWidth);



        tetrisContainer.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(32px, 1fr))`;
        tetrisContainer.style.gridTemplateRows = `repeat(${rowsToFit}, minmax(32px, 1fr))`
        
        for (let i = 0; rowsToFit > i; i++) {
            matrix.push([]);
        }

        
        matrix.forEach((row) => {
            for (let i = 0; i < columnsToFit; i++) {
                row.push(count);
                count++;
            }
        })

        setMatrixProcessed(matrix)
    }, [])

    function buttonClicked() {
        setk(k + 1);
        setButtons([...buttons, k])
        console.log(buttons)
    }

    useEffect(() => {
        setRenderComponent(true);
    }, [matrixProcessed])

    if (renderComponent) {
        const rows = matrixProcessed.map((row) => {
            return <div>{row}</div>
        })

        console.log(rows)

        function randomizeBombChance() {
            if (Math.floor(Math.random() * 10) < 2) {
                return true;
            } else {
                return false;
            }
        }

        return (
            rows.map((row) => {
                return (
                    row.props.children.map((element) => {
                        return <Square key={element} isSafe={randomizeBombChance()} />
                    })
                )
            })
        )
    }
}