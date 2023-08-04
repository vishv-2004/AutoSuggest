
import "./App.css";
import { useDeferredValue, useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [TodoData, setTodoData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [InputValue, setInputValue] = useState("");
  const [SuggestData, setSuggestData] = useState([]);

  useEffect(()=>{
    (async function(){
      try {
        setLoading(true);
        const data  =await axios.get("https://jsonplaceholder.typicode.com/todos");
        
        console.log("Todo Data..",data);
        if(data.status !== 200)
        {
          throw new Error("Something went wronge");
        }
        
        setTodoData(data.data);
      } catch (error) {
        console.log("Todos Error...",error);
        alert("Something went wronge");
      }
      setLoading(false);
    }());
  },[]);

  function TodoInputChange(e)
  { 
    const {value} = e.target;
    setInputValue(value);
    SuggestValue(value);
  }
  //testing
 function SuggestValue(value){
  let temp=[...TodoData];
  const pattern = new RegExp(value);
  temp = temp.filter((todo)=>pattern.test(todo?.title))
  setSuggestData(temp);
  console.log("Temp",temp);
 }
  return (
    <div className="min-h-screen pt-5 flex flex-col gap-10 items-center">
      <h1 className="sm:text-4xl text-2xl text-center font-semibold">Search Your Todos</h1>
      <form onSubmit={(e)=>e.preventDefault()} className="w-[80%] mx-auto">
        <label className="relative">
          <input
          type="text"
          id="todo"
          placeholder="Search Todos"
          className="border-[2px] border-[#758283] focus:outline-none px-5  text-xl rounded-lg py-2 w-full"
          onChange={TodoInputChange}
          value={InputValue}
          />
          { InputValue && <div className="bg-[#e4e8e9] min-h-[50px]  max-h-[50vh] overflow-y-auto rounded-lg ">
            { Loading ? <div>loading....</div> : (SuggestData.length > 0  ? (<div className="p-3 ">{
              SuggestData.map((data,index)=>{
                return <div>
                  <div className="hover:bg-[#b1b7b9] px-2 rounded-lg cursor-pointer" onClick={()=>{setInputValue(data?.title);SuggestValue(data?.title)}}  key={index}>{data?.title}</div>
                 <div className="h-[1px] mx-auto bg-[rgba(255,255,255,0.6)] "></div>
                </div>

              })

            }</div>) : (<div className="text-center flex pt-2 w-full justify-center items-center ">No Result Found</div>))

            }
             
            
          </div>
          }
        </label>
      </form>
    </div>
  );
}

export default App;
