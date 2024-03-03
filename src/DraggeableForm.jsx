import { useState } from "react";
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Roulette from "./Roulette";
// import Test from "./test";

const FormularioTexto = ({ userIP }) => {
  const [inputList, setInputList] = useState([
    {id: 1, text: "hhh" },
    {id: 2, text: "kkk" },
    {  text: "eee" },
    {  text: "yyy" },
    {  text: "ooo" },
    {  text: "ppp" },
    {  text: "www" },
    {  text: "rrr" },
    {  text: "mmm" },
    {  text: "ffff" },
    {  text: "llll" }
  ]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(inputList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInputList(items);
  }

  return (
    <div className="main-form">
      {/* <Test/> */}
      <div className="text-title">
        <h2>عجلة مسار</h2>
      </div>
      <div>
        {/* <p>Name: {name}</p> Display the name */}
      </div>
      <Roulette data={inputList} userIP={userIP} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <ul
              className="items"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: "none" }}
            >
              {/* {inputList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="list-item"
                    >
                      <div className="item">
                        {item.text}
                      </div>
                    </li>
                  )}
                </Draggable>
              ))} */}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
FormularioTexto.propTypes = {
  userIP: PropTypes.string.isRequired
};

export default FormularioTexto;
