import React ,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate,useLocation } from 'react-router-dom';

import { getCards } from '../../actions/cards'
import Autocompletee from './Autocomplete/Autocomplete';
import ActionAreaCard from '../Card/Card'
import LoaderSmall from '../Loader/LoaderSmall';
import Navbar from '../Navbar/Navbar'
import { options } from '../options';
import './HomeStyles.css'

import { Pagination, PaginationItem } from '@material-ui/lab';
import {TextField,Autocomplete} from '@mui/material';
import Loader from '../Loader/Loader';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const ref = React.createRef();
  const page = query.get('page') || 1;

  const {isLoading,cards,numberOfPages} = useSelector((state) => state.cards);

  const [inputValue, setInputValue] = useState(options[0]);
  const [category, setCategory] = useState('All');

  const dispatch = useDispatch();
  const navigate=useNavigate()
  
  useEffect(() => {
    dispatch(getCards(category,page));
  }, [ dispatch,page]);
  useEffect(()=>{
    dispatch(getCards(category,1))
  },[])
  useEffect(() => {
    dispatch(getCards(category,1))
    navigate(`/card?category=${category}&page=1`);
  }, [ dispatch,category,navigate]);
  useEffect(()=>{
    console.log(category,page,typeof(category),typeof(page))
    if(page==="1" && category==="All"){
      window.scrollTo(0, 0)
    }else{
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }  
  },[page])
  if(isLoading){
    return(
      <>
        <Loader/>
      </>
    )
  }
  return (
    <>
      <Navbar/>
      <div className='home'>
        <div className='hero'>
          <div className='hero-content'>
            <h3 style={{textShadow:"2px 1px black"}}>Explore over <b style={{textShadow:"1px 1px black"}}>150,000+</b> Best Recipes over the world.</h3>
            <br/>
            <Autocompletee />
            <br/>
            <h6 style={{textShadow:"2px 1px black",textAlign:"center"}}>Can't think of any Recipe? <span className='lightfont'>Try out this Popular tags.</span></h6>
            <div className="tags">
              <span onClick={()=>setCategory('Dessert')}>Dessert</span>
              <span onClick={()=>setCategory('< 60 Mins')}>Quick & Easy</span>
              <span onClick={()=>setCategory('Lunch/Snacks')}>Lunch/Snacks</span>
              <span onClick={()=>setCategory('Chicken')}>Chicken</span>
            </div>
          </div>
        </div>
        <br/>
        <div className="autocomplete-div" ref={ref}>
          <Autocomplete
            className='autocomplete'
            value={category}
            onChange={(event, newCategory) => {
              setCategory(newCategory);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="disable-clearable"
            disableClearable
            options={options}
            sx={{ width: 500 }}
            renderInput={(params) => <TextField {...params} value='All' label="Select Category" />}
          />
        </div>
        <div className='card-container'>
          {isLoading?(<LoaderSmall/>):(<>{cards &&
            cards.map((card) => (
              <ActionAreaCard card={card} key={card._id} />
            ))
            }</>)
          }
        </div>
        <div className='pagination'>
          <Pagination
            className="pagination-ul"
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            size='small'
            color="primary"
            renderItem={(item) => (
              <PaginationItem {...item} component={Link} to={`/card?category=${category}&page=${item.page}`} />
            )}
          />
        </div>
      </div>
    </>
  )
}

export default Home
