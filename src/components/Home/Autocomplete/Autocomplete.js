import React ,{useState}from 'react'
import Autocompletee from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import '../HomeStyles.css'
import { useNavigate } from 'react-router-dom';
const Autocomplete = () => {
	const [searchResults, setSearchResults] = useState([])
    const onChangeone=async(e)=>{
        if(e.target.value){
            const url = 'https://recipenewserver1.onrender.com/card/autocompletesearch'
            const { data } = await axios.get(url, {
                    params: {
                        name: e.target.value,
                    },
                })
             setSearchResults(data)   
        }
    }
   const navigate=useNavigate()
      
  return (
    <>
    <Autocompletee
        sx={{
            '& label.Mui-focused': {
                color: 'black',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
        }}
        className='autocompletee'
        freeSolo
        filterOptions={(x)=>x}
        onChange={(e,value)=>navigate(`/recipe/${value?._id}`)}
        options={searchResults}
        getOptionLabel={(option) => option.Name}
        renderInput={(params) => <TextField {...params} hiddenLabel placeholder='Search Recipe...' variant="outlined" className='autocomplete-text' onChange={(e)=>onChangeone(e)}  />}
      />
    </>
  )
}

export default Autocomplete
