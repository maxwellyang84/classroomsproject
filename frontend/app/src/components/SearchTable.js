import React, {useState} from "react"

function SearchTable(){
    const [date, setDate] = useState('1999-10-01')
    const [startTime, setStartTime] = useState('2:19')
    const [endTime, setEndTime] = useState('2:10')
    return(
        <form onSubmit={(e) =>handleSubmit(e, date, startTime, endTime)}>
            Date: <input type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
            Start Time: <input type="time" value={startTime} onChange= {(e)=> setStartTime(e.target.value)}/>
            End Time: <input type="time" value={endTime} onChange= {(e)=> setEndTime(e.target.value)} min={startTime}/>
            <button type="submit"> Submit </button>
        </form>
    )
}

const handleSubmit = (e, date, startTime, endTime)=>{
    e.preventDefault()
    console.log(date)
    console.log(startTime)
    console.log(endTime)
    console.log("Submitted");
}


export default SearchTable