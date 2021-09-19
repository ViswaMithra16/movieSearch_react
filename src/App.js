import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MovieComponent from './MovieResultComponent';
import axios from 'axios';
import MovieInfoComponent from './MovieInfoComponent';

export const API_KEY ='813863c';

const Container = styled.div`
display:flex;
flex-direction:column;
`;

const Header = styled.div`
display:flex;
flex-direction: row;
background-color:black;
color:white;
padding:10px;
font-size:30px;
font-weight:bold;
box-shadow:0 3px 6px 0 #555;
justify-content: space-between;
height:45px;
align-items:center;
`;

const MovieIcon = styled.img`
width: 50px;
height: 48px;
margin:15px;`;

const AppName=styled.div`
display:flex;
flex-direction:row;
align-items:center;
`;

const SearchBar = styled.div`
display:flex;
flex-direction:row;
padding:10px 10px;
background-color:white;
border-radius:6px;
margin-left:20px;
width:50px;
background-color:white;
border-radius:6px;
margin-left:20px;
width:50%;
background-color:white;
align-items:center;
`;

const SearchIcon =styled.img`
width:32px;
height:32px;
`;

const SearchText =styled.input`
color:black;
font-size:16px;
font-weight:regular;
border:none;
outline:none;
margin-left:15px;
`;

const SearchResultsContainer =styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
padding:30px;
justify-content:space-evenly;
gap: 24px;
`;


function App() {

  const [searchQuery, updateSearchQuery] = useState('arjun');
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState();

  useEffect(() => {
    initialLoad();
  }, [])

  const fetchData = async (searchString)=>{
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    console.log(response);
    updateMovieList(response.data.Search)
  }

  const onTextChange = (event)=>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout= setTimeout(()=>fetchData(event.target.value),500);
    updateTimeoutId(timeout);
  }

  const initialLoad = () => {
    clearTimeout(timeoutId);
    const timeout= setTimeout(()=>fetchData(searchQuery),500);
    updateTimeoutId(timeout);
  }
  return (
   <Container>
      <Header>
            <AppName>
              <MovieIcon src="/movie-icon.jpeg"/>
              Movie Search
            </AppName>
            <SearchBar>
              <SearchIcon src="/search-icon.png"/>
              <SearchText placeholder="Search Movie" value={searchQuery} onChange={onTextChange}/>
            </SearchBar>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <SearchResultsContainer>
        {movieList?.length?movieList.map((movie, index)=><MovieComponent key ={index} movie ={movie} 
        onMovieSelect={onMovieSelect}/>):"No Movie Search"}
      </SearchResultsContainer>
   </Container>
  );
}

export default App;
