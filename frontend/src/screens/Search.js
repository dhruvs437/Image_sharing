import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';
import { API_URL } from '../config/api';

const Search = () => {
    const {search}=useParams();
    const [arr,setArr]=useState([]);
    
    const filter=async()=>{
        console.log(search);
        try{
            let result=await fetch(`${API_URL}/filter/${search}`, {
                method: "get",
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
              })
              result=await result.json();
              setArr(result);
        }
        catch(err)
        {
            console.log(err);
        }
        
    
      }
      useEffect(() => {
       filter();
      }, []);
  return (
    <div>
  
    {
        arr.map((user)=>(
            <UserCard user={user} />
        ))
    }

    </div>
  )
}

export default Search
