import React from 'react'

export default function Search(props) {
    return (
        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center',flexDirection:'column' , marginBottom:'40px'}}>
            <h2>Search Stock By Name:</h2>
            <form className='ui form'>
                    <div className='field'>
                    <input style = {{width:'500px'}} type='text' placeholder='Search By Stock Name...' value={props.searchTerm} onChange={props.handleSearch}>

                    </input>
                    </div>
                  </form>
        </div>
    )
}
