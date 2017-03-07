import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

//var url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

/*const list = [
  {
    title:'React',
    url:'https://facebook.github.io/react/',
    author: 'Jordan walke',
    num_comments: 3,
    points: 4,
    objectID:0,
  },
  {
    title:'Redux',
    url:'https://github.com/reactjs/redux',
    author: 'Dan abramov, Andrew Clarck',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
];*/

const isSearched = (searchTerm)=>(item)=>!searchTerm || item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onSearchSubmit(event){
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  componentDidMount(){
    const {searchTerm} = this.state;
    console.log(searchTerm);
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result));
  }

  setSearchTopStories(result){
    this.setState({result});
  }

onSearchChange(event){
  this.setState({searchTerm:event.target.value});
}

  onDismiss(id){

    const isNotId = item=> item.objectID!==id;
    const updateList = this.state.result.hits.filter(isNotId);
    this.setState({
      result:{...this.state.result,hits:updateList}
    });
  }


  render() {
    const {searchTerm,result} = this.state;
    //console.log(result);
    if(!result){return null;}
    return (
      <div className="App">
      "hola buenas tardes"
      "hola buenas tardes"
        <Search value={searchTerm} onSubmit={this.onSearchSubmit} onChange={this.onSearchChange}>Search</Search>
        { result &&
          <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss}/>
        }

        <OtroSaludo/>
      </div>
    );
  }
}

const Search =  ({value,onChange,onSubmit,children} ) =>{
    return(<form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange}/>
      <button type="submit">{children}</button>
    </form>);
}


const Table =  ({list,pattern,onDismiss} ) =>{
  //console.log(list);
    return(
      <div>

      {list.map(item =>

            <div className='table-row' key={item.objectID}>
              <span><a href={item.url}>{item.title}</a></span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span ><Button onClick={()=>onDismiss(item.objectID)}>Dismiss</Button></span>
            </div>


      )}
      </div>
    );
}

const Button =  ({onClick,className='',children} ) =>{

    return(<button onClick={onClick} className={className} type="button">{children}</button>);
}


class OtroSaludo extends Component {
  render() {
    return (
      <p>Hola desde otro componente modificado</p>
    )
  }
}



export default App;
export {Button,Search,Table};
