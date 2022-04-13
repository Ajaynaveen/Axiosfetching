import React, { useState } from "react";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "react-bootstrap/esm/Modal";

function SearchBar({ placeholder, data, setposts }) {
  // data.map((el)=>{console.log(el.id)});
  console.log(setposts);
  const [filteredData, setFilteredData] = useState([]);
  // const [show, setShow] = useState(false);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    // console.log(data[0])

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            console.log(value);
            return (
              <div key={value.id} className="dataItem">
                <Card style={{ width: "18rem", border: "1px solid black" }}>
                  <Card.Body>
                    <Card.Title>{value.title}</Card.Title>
                    <Card.Text>{value.body}</Card.Text>

                    {/* <Button variant="primary" >Update</Button>
    <Button variant="primary" onClick={()=>{handleShow(value.id)}}>Delete</Button> */}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
