import React, {useState,useEffect} from 'react';
function App(){
    const[numbers,setNumbers]=useState([]);
    const[average,setAverage]=useState(null);
    const[error,setError]=useState(null);
   

    const handleChange=event=>{
        const newNumbers=event.target.value.split(',').map(Number);
        setNumbers(newNumbers);
    }
    const calculateAverage=async()=>{
        try{
            const response=await fetch('http:20.244.56.144/numbers/e',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({numbers})
        });
        if(!response.ok){
            throw new error(`API Error:${response.statusText}`);
        }
        const data=await response.json();
        setAverage(data.average);
        setError(null);
        }
        catch(error){
            
            setError(error.message);
        }
    }
    useEffect(()=>{
        calculateAverage();
    },[numbers]);

    return(
        <div>
            <input type="text"placeholder="enter only comma seperated values" onChange={handleChange}/>
            <button onClick={calculateAverage}>Calculate Average</button>
            {average!=null && <p>Average:{average}</p>}
            {error && <p style={{color:'yellowgreen'}}>ERROR!:{error}</p>}
        </div>
    )
};
export default App;
