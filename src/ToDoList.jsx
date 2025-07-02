
import { useState } from "react";
import "./styles/ToDoList.css"
const ToDoList = () => {
    
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    const addToList = () => {
        if(input.trim() === "") return;
        setList(l => ([...l, input]));
        setInput("");
    }

    const removeFromList = indexToRemove => {   
        setList(l => (l.filter((_, i) => i !== indexToRemove)))
    }

    const updateItem = indexToUpdate => {
     setInput(list[indexToUpdate])
      setEditingIndex(indexToUpdate)
      
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleUpdateOk = () => {
        if(input.trim() === "") return;
        setList(l => (l.map((li, index) => index === editingIndex ? input : li)))
        setEditingIndex(null);
        setInput("");

    }
   const moveItemUp = index => {
    if(index > 0){
        const updatedList = [...list];
        [updatedList[index], updatedList[index - 1]] = [updatedList[index - 1], updatedList[index]];
        setList(updatedList);
    }
        
   }

   const moveItemDown = index => {
    if(index < list.length - 1){
        const updatedList = [...list];
        [updatedList[index], updatedList[index + 1]] = [updatedList[index + 1], updatedList[index]];
       setList(updatedList)
    }
       

   }
        return(
       <div className="todolist-main-container">
            <p id="title">To Do List (React)</p>
            <div className="input-container">
            <input type="text" id="input-list" value={input} onChange={handleInputChange} />
           
            {editingIndex === null ? (
                 <button id="input-btn" onClick={addToList}>Add</button>) :
                 (<button id="ok-btn" onClick={handleUpdateOk}>Ok</button>)}
            </div>   
          
            <div className="list-container">
                {list.map((l, i) => <div className="list-card" key={i} style={editingIndex === i ? {border: "5px solid rgb(25, 255, 102)"} : {}}>{l}
                    <div className="function-btns">

                         <button id="remove-btn" onClick={() => removeFromList(i)}>remove</button>
                        <button id="update-btn" onClick={() => updateItem(i)}>Update</button>
                        <div key={i} onClick={() => moveItemUp(i)} id="move-item-up">☝️</div>
                         <div key={i} onClick={() => moveItemDown(i)} id="move-item-down">👇</div>
                          
                    </div>
                   
                </div>)}
                
            </div>
            <div id="footer">{new Date().getFullYear() + " Karl Bautista"}</div>

       </div>

      
    )
}

export default ToDoList;