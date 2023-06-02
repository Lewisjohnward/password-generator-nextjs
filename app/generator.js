'use client'

import styles from './generator.module.css'
import Image from  'next/image'
import copyIcon from "./copy.svg"
import arrowIcon from "./arrow-right.svg"
import { useState, useEffect } from "react"
import { generate } from 'generate-password'
import { passwordStrength } from 'check-password-strength'



export default function Generator() {
    const [password, setPassword] = useState("password")
    const [length, setLength] = useState(10)
    const [uppercase, setUppercase] = useState(false)
    const [lowercase, setLowercase] = useState(true)
    const [numbers, setNumbers] = useState(false)
    const [symbols, setSymbols] = useState(false)
    const [strength, setStrength] = useState("weak")

    let strengthArr = new Array(3).fill("")

    useEffect(() => {
        // Prevents trying to create a password with no params
        if (lowercase || uppercase || numbers || symbols){
            generatePassword()
        }
        else setLowercase(true)
    }, [length, uppercase, lowercase, numbers, symbols])

    const generatePassword = () => {
        let generatedPassword = generate({
            length,
            uppercase,
            lowercase,
            symbols,
            numbers
        })
        setStrength(passwordStrength(generatedPassword).value)
        setPassword(generatedPassword)
    }

    const copyPassword = () => {
        navigator.clipboard.writeText(password)
    }

    const getStrengthStyle = (i) => {
        switch(strength){
            case "Too weak":
                if (i > 0) return styles.strength_box
                return styles.strength_box, styles.strength_box_too_weak
            case "Weak":
                if (i > 1) return styles.strength_box
                return styles.strength_box, styles.strength_box_weak
            case "Strong":
                if (i > 2) return styles.strength_box
                return styles.strength_box, styles.strength_box_strong
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.password_container}>
                <div className={styles.password}>
                    {password}
                </div>
                <div>
                    <Image
                        className={styles.copy_icon}
                        src={copyIcon}
                        alt="Copy icon"
                        onClick={() => copyPassword()}
                    />
                </div>
            </div>
            <div className={styles.options_container}>

                <div className={styles.character_length}>
                    <div className={styles.character_length_text}> 
                        Character Length
                    </div>
                    <div className={styles.character_length_number}> 
                        {length}
                    </div>
                </div>

                <div className={styles.slider_container}>
                    <input 
                        className={styles.slider}
                        type="range" 
                        min={10}
                        max={25}
                        value={length}
                        onChange={e => setLength(parseInt(e.target.value))}
                    />
                </div>

                <label 
                    className={styles.container_check}
                >
                    Include Uppercase Letters
                    <input 
                        type="checkbox" 
                        checked={uppercase}
                        onChange={() => setUppercase(prev => !prev)}
                    />
                    <span className={styles.mark}></span>
                </label>
                <label 
                    className={styles.container_check}
                >
                    Include Lowercase Letters
                    <input 
                        type="checkbox" 
                        checked={lowercase}
                        onChange={() => setLowercase(prev => !prev)}
                    />
                    <span className={styles.mark}></span>
                </label>
                <label 
                    className={styles.container_check}
                >
                    Include Numbers
                    <input 
                        type="checkbox" 
                        checked={numbers}
                        onChange={() => setNumbers(prev => !prev)}
                    />
                    <span className={styles.mark}></span>
                </label>
                <label 
                    className={styles.container_check}
                >
                    Include Symbols
                    <input 
                        type="checkbox" 
                        checked={symbols}
                        onChange={() => setSymbols(prev => !prev)}
                    />
                    <span className={styles.mark}></span>
                </label>


                <div className={styles.strength_container}>
                    <text className={styles.strength_text}>
                        STRENGTH
                    </text>
                    <div className={styles.strength_display}>
                        <div>
                            {strength.toUpperCase()}
                        </div>
                        {strengthArr.map((d, i) => (
                            <div 
                                key={i} 
                                className={getStrengthStyle(i)} 
                            />
                        ))}
                    </div>
                </div>

                <div
                    className={styles.generate_btn}
                    onClick={() => generatePassword()}
                >
                    GENERATE
                    <Image
                        className={styles.arrow_icon}
                        src={arrowIcon}
                        alt="Copy icon"
                    />
                </div>

            </div>
        </div>
    )
}
