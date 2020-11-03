import React from 'react';

const Filter = (props) => {
    return (
        <div style={{color: "white", fontSize: "20px"}} className="container">
           <strong>Search: </strong> 
            <input type="text" name="search" placeholder="Search Toys..." onChange={(e) => props.handleSearch(e.target.value)} />
            <br></br>
          <strong>Sort by: </strong>
          <label>
            <input type="radio" value="alphabetically" checked={props.sort === 'alphabetically' ? true : false} onChange={(e) => props.handleSort(e.target.value)}/>
            Alphabetically
          </label>
          <label>
            <input type="radio" value="likes" checked={props.sort === 'likes' ? true : false} onChange={(e) => props.handleSort(e.target.value)}/>
            Likes
          </label>
          <br/>
    
          <label>
            <strong>Filter By Likes: </strong>
            <select onChange={(e) => props.handleFilter(e.target.value)}>
                <option value={0}>All</option>
              <option value={2}>0-2 Likes</option>
              <option value={5}>3-5 Likes</option>
              <option value={99999}>6+ Likes</option>
            </select>
          </label>
        </div>
    );
}

export default Filter;