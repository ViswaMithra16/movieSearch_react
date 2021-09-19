import styled from "styled-components";

const MovieContainer = styled.div`
display:flex;
flex-direction:column;
padding:10px;
width:  280px;
box-shadow:0 3px 10px 0 #aaa;
cursor:pointer;
`;

const MovieImage = styled.img`
object-fit:cover;
height:362px;
`;

const MovieName = styled.span`
font-size:18px;
font-weight:600;
color:black;
margin:15px 0;
white-space:nowrap;
text-overflow:ellipsis;
overflow:hidden;
`;

const Info = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
text-overflow: ellipsis;
`;
const MovieInfo = styled.span`
font-size: 16px;
font-weight: 500;
color: black;
white-space: nowrap;
overflow:hidden;
text-transform:capitalize;

`;
const MovieComponent =(props) =>{
    const {Title, Year, imdbID, Type, Poster} = props.movie;

    return (
        <MovieContainer onClick={()=>{
                props.onMovieSelect(imdbID)
        }}>
            <MovieImage src ={Poster}/>
            <MovieName>{Title}</MovieName>
            <Info>
                <MovieInfo>Year: {Year}</MovieInfo>
                <MovieInfo>Type: {Type}</MovieInfo>
            </Info>
        </MovieContainer>
    );
}

export default MovieComponent;