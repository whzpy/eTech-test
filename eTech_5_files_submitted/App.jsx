import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import DetailsComp from '/DetailsComp'
import EditSaveComp from '/EditSaveComp'

function App() {

  const [rows, setRows] = useState([])
  const [details, setDetails] = useState(null)
  const [editsave, setEditsave] = useState(null)

  useEffect(() => {
    let localStatus = localStorage.getItem("recipeData")
    if(!localStatus){
      fetch("https://dummyjson.com/recipes")
      .then(result => result.json())
      .then(json => {setRows(json.recipes);
        localStorage.setItem('recipeData', JSON.stringify(json.recipes));
      })
    } else {
      setRows(JSON.parse(localStatus));
    }
  }, [])

const detailHandler = (id) =>{
  let detailsItem = rows.filter(item => item.id === id)
  let extraDetail = {
    "ingredients": detailsItem[0].ingredients,
    "instructions": detailsItem[0].instructions,
    "tags": detailsItem[0].tags,
    "reviewCount": detailsItem[0].reviewCount,
    "mealType": detailsItem[0].mealType,
  }
  setDetails(extraDetail)
}

const editHandler = (id) => {
  let editItem = rows.filter(item => item.id === id)
  setEditsave(editItem[0])
}
    
const saveHandler = (updatedData) => {
console.log("updatedData: ", updatedData);
let newObj = rows.splice(updatedData.id -1, 1, updatedData)
setRows(newObj)
localStorage.setItem('recipeData', JSON.stringify(rows));
console.log("rows - new - ", rows)

 }

if(details){
  return (
  <DetailsComp 
    ingredients =  {details.ingredients}
    instructions =  {details. instructions}
    tags =  {details.tags}
    reviewCount =  {details.reviewCount}
    mealType =  {details.mealType}
  />)
} else if(editsave){
  return (
  <EditSaveComp 
    editdata = {editsave}
    saveHandler = {saveHandler}
  />)
} else {
  return (
    <div>
    <Table className="table table-striped">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>prepTimeMinutes</th>
          <th>cookTimeMinutes</th>
          <th>servings</th>
          <th>difficulty</th>
          <th>cuisine</th>
          <th>rating</th>
          <th> Details</th>
          <th> Edit</th>
          
        </tr>
      </thead>
      <tbody>
        {rows.map(ele =>
          <tr key = {ele.id} >
            <td>{ele.id}</td>
            <td>{ele.name}</td>
            <td>{ele.prepTimeMinutes}</td>
            <td>{ele.cookTimeMinutes}</td>
            <td>{ele.servings}</td>
            <td>{ele.difficulty}</td>
            <td>{ele.cuisine}</td>
            <td>{ele.rating}</td>
            <td><Button type='button'  className="btn btn-success" onClick={() => detailHandler(ele.id)}>Details</Button></td>
            <td><Button type='button' className="btn btn-primary"  onClick={() => editHandler(ele.id) }>Edit & Save</Button></td>
          </tr>)
        }
      </tbody>
      </Table>
    </div>
  )
}
}
export default App