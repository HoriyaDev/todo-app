import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatDate() {
  const today = new Date();
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; 

  return `${date} ${month} ${year} ${formattedHours}:${formattedMinutes}${ampm}`;
}

function TODO() {
  const [inputValue, setInputValue] = useState("");
  const [itemsArray, setItemsArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addItem = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a task");
    } else if (editIndex === null) {
      setItemsArray([...itemsArray, { 
        text: inputValue, 
        createdAt: formatDate(), 
        updatedAt: null 
      }]);
      setInputValue("");
    } else {
      const updatedArray = [...itemsArray];
      updatedArray[editIndex] = { 
        ...updatedArray[editIndex],
        text: inputValue, 
        updatedAt: formatDate() 
      };
      setItemsArray(updatedArray);
      setEditIndex(null);
    }
    setInputValue("");
  };

  const handleDelete = (index) => {
    const newArray = itemsArray.filter((_, i) => i !== index);
    setItemsArray(newArray);
  };

  const editTask = (index) => {
    setInputValue(itemsArray[index].text);
    setEditIndex(index);
  };

  return (
    <div className="App bg-slate-500 min-h-screen p-4">
  <div className="mob:flex fixed top-0 left-0 w-full p-4 bg-slate-500 z-10 items-center justify-between">
    <h1 className="font-bold text-2xl text-white mx-auto">TODO</h1>
  </div>

  <div className="mob:flex fixed top-14 left-0 w-full mob:ml-4 z-10">
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter item"
      className="rounded-xl px-2   ml-7 h-11 mr-7  mob:mr-8  mob:-ml-0 mob:w-[500px] w-[660px] mob:h-14 relative"
    />
    <button
  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-2xl text-sm px-5 py-2 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mob:px-4 absolute mob:right-14 mob:ml-64 mob:mt-2 -ml-28 mt-1"
  onClick={addItem}
>
  <span className="inline mob:hidden">{editIndex !== null ? "Update" : "ADD"}</span>
  <span className="hidden mob:inline">{editIndex !== null ? "Update" : "+"}</span>
</button>

  </div>

  <ul className="mt-32 pt-4 overflow-y-auto">
    {itemsArray.map((item, index) => (
      <li
        key={index}
        className="bg-white m-2 p-4 w-1/2 mx-auto flex flex-wrap justify-between items-center rounded-xl mob:w-full"
      >
         <div>
          <p className="font-bold text-2xl text-left mb-2">{item.text}</p>
          <p className="text-sm font-semibold text-left">
            {item.updatedAt ? "Updated at" : "Created at"}{" "}
            
          </p>
          <span className="text-xs text-left">
              {item.updatedAt ? item.updatedAt : item.createdAt}
            </span>
        </div>

        <div className="flex space-x-2 mob:ml-56">
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mob:bg-transparent mob:text-green-800 mob:hover:bg-transparent mob:hover:dark:bg-transparent"
            onClick={() => editTask(index)}
          >
            <CiEdit size={25} />
          </button>

          <button
  className="focus:outline-none text-white bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-red-600 dark:focus:ring-red-800 hover:bg-red-800 dark:hover:bg-red-700 mob:bg-transparent mob:text-red-800 mob:hover:bg-transparent mob:hover:dark:bg-transparent"
  onClick={() => handleDelete(index)}
>
  <MdDelete size={25} />
</button>

        </div>
      </li>
    ))}
  </ul>
</div>


  );
}

export default TODO;
