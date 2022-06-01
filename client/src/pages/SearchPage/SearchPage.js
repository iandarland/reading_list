import React, { useState } from "react"
import axios from "axios"
import { useSearchParams } from "react-router-dom"

export const SearchPage = () =>{
    const [searchParams, setSearchParams] = useSearchParams()
    const [bookData, setBookData] = useState([])
    const keyword = searchParams.get('q')
    const author = searchParams.get('author')
    const title = searchParams.get('title')

    const searchable = (data) => {
        return data.split(' ').join('+')
    }

    const searchData = {
        keyword: keyword && searchable(keyword),
        author: author && `+inauthor:${searchable(author)}`,
        title: title &&  `+intitle:${searchable(title)}`,
    }

    console.log(searchData)

    const searchBooks = async (data) =>{
        const bookSearch = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchData.keyword}${searchData.author}&key=AIzaSyB8Jvy0dfcWAybRKZyYUBicgxyetrhSaLw`)
        console.log(bookSearch)
        return setBookData(bookSearch.data.items)
    }

    return(
        <>
        <div>This Is the Search Page</div> 
        {author && <div>you searched for {author} as author</div>}
        {title && <div>you searched for {title} as title</div>}
        <button onClick={searchBooks}>search</button>
        {bookData && bookData.map((item, index) => (
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
        ))}
        
        </>
    )

}