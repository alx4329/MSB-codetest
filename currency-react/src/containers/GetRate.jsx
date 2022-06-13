import React from 'react';
import axios from 'axios';


//component
const GetRate = () => {
    const [symbols, setSymbols] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [conversion, setConversion]=React.useState('')
    const [state, setState] = React.useState({
        amount: '',
        from: '',
        'to': '',
        date:''
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(state.amount === '' || state.from === '' || state.to === '' || state.date === ''){
            setError('Please fill all the fields')
        }else {
            const answer = await axios.post(`http://localhost:8888/api/0.1/`,state)
            setConversion(answer.data.result)
        }
    }
    React.useEffect(()=>{
        alert(error)
    },[error])
    const fetchSymbols = async () => {
        var myHeaders = new Headers();
    myHeaders.append("apikey", "Rmub1m2UmgY3OigTJUF1dt5nQP2ZkhTs");
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
    
    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
      .then(response => response.text())
      .then(result => {
        result.symbols? setSymbols(result.symbols) : setError(result.error)
        })
      .catch(error => {return setError(error)});
    
    }
    const bringSymbols = async () => {
        const fetchedSymbols = await fetchSymbols()
        console.log(symbols)
    }
    React.useEffect(()=>{
        bringSymbols()
    },[])

    return (
        <div>
            <h1>Currency</h1>
            <div className='form-container'>
                <form onSubmit={(e)=>handleSubmit(e)} >
                    
                    <label for="amount">From</label>
                    <input name="amount" value={state.amount} onChange={handleChange}></input>
                    
                    <label for="from">From</label>
                    <select name="from" id="from" > 
                        {Object.keys(symbols).map((symbol)=> <option>{symbol}</option> )}
                    </select>
                    
                    <label for="to">To</label>
                    <select name="to" id="to" > 
                        {Object.keys(symbols).map((symbol)=> <option>{symbol}</option> )}
                    </select>
                
                </form>
                {
                    conversion? <div>{conversion}</div> : null
                }
            </div>
        </div>
    )
}

export default GetRate