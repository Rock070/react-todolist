import React, { Component, useState, useRef, useEffect, useLayoutEffect } from "react";
import "./app.css";



function App() {
  return (
    <div className='all'>
        <div className="type">
            <div className="btn btn-my-task">My Tasks</div>
            <div className="btn btn-in-progress">In Progress</div>
            <div className="btn btn-completed">Completed</div>
        </div>
        <div className="title">Todo List</div>
        <input className="add" type="text" placeholder="Add somethig to do here !"/>
        <div className="task-list">
            <div className="task" data-value="1">
            <input className="check" id="task-1" type="checkbox" status='in-progress' data-value="1"/>
            <input for="task-1" className='task-input' data-value="1" value='Basketball'/>
            <div className="cancel" data-value="1">x</div>
            </div>
        </div>
        <div className="function">
            <div className="btn clear-all">Clear All Tasks</div>
            <div className="btn save">Save</div>
        </div>
    </div>
  )
}
export default App;
