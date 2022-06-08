import React from "react"

export const BookCard = ({index, item}) =>{
    return(
        <div class="card mb-3" key={index}>
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src={item.volumeInfo.imageLinks.thumbnail} alt="..."/>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{item.volumeInfo.title}</h5>
              <p class="card-text">{item.volumeInfo.description}</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
    )
}