import { useState } from "react";

function QuestionForm() {
    const [inputValue, setInputValue] = useState('This is a question');
    return <div>
        <textarea
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
        ></textarea>
    </div>
}

export default QuestionForm;