import React, { Component, useState, useRef, useEffect, useLayoutEffect } from "react";
import "./App.css";
import styled from 'styled-components';


function App() {

  const Root = styled.div`
    padding: 30px;
    box-shadow: 0 4px 4px 0 #C8C8C8;
    background-color: #FFF2DC;
    margin: 10px auto;
    width: 60%;
  `

  const StatusButtonsList = styled.div`
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
  `

  const StatusButton = styled.div`
    padding: 0px 10px;
    cursor: pointer;
    /* background-color: white; */
    color: #4A90E2;
    border-radius: 5px;
    transition: 0.5s;

    &:hover {
      transform: scale(1.15);
    }
  `

  const Title = styled.div`
    font-size: 54px;
    color: #4A90E2;
    text-align: center;
    margin-bottom: 20px;
  `
  const Submit = styled.input`
    margin-bottom: 30px;
    width: 80%;
    padding: 10px 15px;
    left: 50%;
    font-size: 18px;
    transform: translate(-50%, 0);
    border: none;
    background-color: #FFF2DC;
    transition-property: width;
    width: 85%;
    margin: 0;
    transition: 0.5s;

    &:focus {
      outline: none;
      border-bottom: 2px solid #4A90E2;
      transition-property: width;
      width: 95%;
      transition: 0.5s;
    }
  `

  const TodoList = styled.div`
    top: 50%;
    width: 100%;
    color: #4A90E2;
    margin-top: 30px;
  `
  const Todo = styled.div`
    width: 100%;
    padding: 10px 5px;
    cursor: pointer;
    display: block;

    &:hover {
      background-color: #FFFFFF;
    }
  `

  const TodoInput = styled.input`
    font-size: 20px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 80%;
    color: #4A90E2;


    &:focus {
      outline: none;
    }
  `
  const TodoCheckInput = styled.input`
    color: #4A90E2;
    border: 1px #4A90E2 solid;
  `

  const CancelButton = styled.div`
    font-size: 30px;
    position: absolute;
    padding: 0px 15px;
    right: 20px;
    bottom: 5px;
    cursor: pointer;
  `

  const FunctionButtonsList = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;

  `

  const FunctionButton = styled.div`
    padding: 1px 5px;
    cursor: pointer;
    color: white;
    border-radius: 5px;
    transition: 0.5s;
    background-color: #DD0000;
    border: 1px solid #DD0000;

    &:hover {
      transform: scale(1.15);
    }
  `


  const [todos, setTodos] = useState([
    { 
      id: 1,
      status: 'in-progress',
      task: 'basketball'
    },
    { 
      id: 2,
      status: 'completed',
      task: '曬衣服'
    },

  ])

  const [nowStatus, setNowStatus] = useState("all")
  const [id , setId] = useState(3)

  return (
    <Root>
        <StatusButtonsList>
            <StatusButton onClick={() => {setNowStatus('all')}}>My Tasks</StatusButton>
            <StatusButton onClick={() => {setNowStatus('in-progress')}} >In Progress</StatusButton>
            <StatusButton onClick={() => {setNowStatus('completed')}} >Completed</StatusButton>
        </StatusButtonsList>
        <Title>Todo List</Title>
        <Submit type="text" placeholder="Add somethig to do here !" 
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              setTodos([...todos, {
                id,
                status: 'in-progress',
                task: e.target.value
              }])
              setId( id + 1)
            }
        }} />
        <TodoList>

        {nowStatus === 'all' && todos.filter(todo => todo.status ==='in-progress' || todo.status === 'completed')
          .map(todo => (
            <Todo> 
              <TodoCheckInput type="checkbox"/>
              <TodoInput value={todo.task}/>
              <CancelButton onClick={ () => { 
                setTodos(todos.filter( data => data.id !== todo.id)) 
              } }>x</CancelButton>
          </Todo>
          ))}

        {nowStatus !== 'all' && todos.filter(todo => todo.status === nowStatus)
          .map(todo => (
            <Todo>  
              <TodoCheckInput type="checkbox"/>
              <TodoInput value={todo.task}/>
              <CancelButton onClick={ () => { 
                setTodos(todos.filter( data => data.id !== todo.id)) 
              } }>x</CancelButton>
          </Todo>
          ))}
          
        </TodoList>
        <FunctionButtonsList>
          <FunctionButton onClick={()=> {
            setTodos([])
          }}>Clear All Tasks</FunctionButton>
          <FunctionButton>Save</FunctionButton>
        </FunctionButtonsList>
      </Root>
  )
}
export default App;
