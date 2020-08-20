const SearchIt = (term) => {
    return function(stock){
      return stock.name.toLowerCase().includes(term.toLowerCase())
    }
  }




  export default  SearchIt