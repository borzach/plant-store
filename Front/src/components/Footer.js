import { useState } from 'react'
import '../styles/footer.css'



function Footer() {
    const [inputValue, setInputValue] = useState('');

    function handleInput(e) {
        setInputValue(e.target.value);
    }
    function checkMail() {
        if (!inputValue.includes('@'))
            alert("Invalid mail")
    }
    return (
        <footer className='lmj-footer'>
            <div className='lmj-footer-elem'>
                Pour les passionné·e·s de plantes 🌿🌱🌵
            </div>
            <div className='lmj-footer-elem'>Laissez-nous votre mail :</div>
            <input
                 onChange={(e)=> handleInput(e)}
                value={inputValue}
                onBlur={checkMail}
            />
        </footer>
    )
}

export default Footer