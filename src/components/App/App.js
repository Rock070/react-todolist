import React, { useState, useRef } from "react";
import styled from "styled-components";

function TodoItem({ todo, todos, setTodos }) {
  const Todo = styled.div`
    width: 100%;
    padding: 10px 5px;
    cursor: pointer;
    display: block;
    position: relative;

    &:hover {
      background-color: #ffffff;
    }
  `;

  const TodoInput = styled.input`
    font-size: 20px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 80%;
    color: #4a90e2;

    &:focus {
      outline: none;
    }
  `;
  const TodoCheckInput = styled.input`
    color: #4a90e2;
    border: 1px #4a90e2 solid;
  `;

  const CancelButton = styled.div`
    font-size: 30px;
    position: absolute;
    padding: 0px 15px;
    right: 20px;
    bottom: 5px;
    cursor: pointer;
  `;

  const inputEl = useRef(null);
  function handleChangeStatus(status) {
    return setTodos(
      todos.map((data) => {
        if (data.id !== todo.id) {
          return data;
        }
        return {
          ...data,
          status,
        };
      })
    );
  }

  function handleChangeTask(task) {
    return setTodos(
      todos.map((data) => {
        if (data.id !== todo.id) {
          return data;
        }
        return {
          ...data,
          task,
        };
      })
    );
  }

  return (
    <Todo>
      <TodoCheckInput
        defaultChecked={todo.status === "completed"}
        onClick={(e) => {
          if (e.target.checked) {
            handleChangeStatus("completed");
            return;
          }
          handleChangeStatus("in-progress");
          return;
        }}
        type="checkbox"
      />
      <TodoInput
        ref={inputEl}
        defaultValue={todo.task}
        onChange={(e) => {
          console.log("changing");
        }}
        onBlur={(e) => handleChangeTask(inputEl.current.value)}
      />
      <CancelButton
        onClick={() => {
          setTodos(todos.filter((data) => data.id !== todo.id));
        }}
      >
        x
      </CancelButton>
    </Todo>
  );
}

function App() {
  const Root = styled.div`
    width: 60%;
    padding: 30px;
    box-shadow: 0 4px 4px 0 #c8c8c8;
    background-color: #fff2dc;
    margin: 0px auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
  `;

  const StatusButtonsList = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  `;

  const StatusButton = styled.div`
    padding: 0px 10px;
    cursor: pointer;
    /* background-color: white; */
    color: #4a90e2;
    border-radius: 5px;
    transition: 0.5s;

    &:hover {
      transform: scale(1.15);
    }

    ${(props) =>
      props.$active &&
      `
      background: rgba(0, 0, 0, 0.03);
      border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    `}
  `;

  const Title = styled.div`
    font-size: 54px;
    color: #4a90e2;
    text-align: center;
    margin-bottom: 20px;
  `;
  const Submit = styled.input`
    margin-bottom: 30px;
    width: 80%;
    padding: 10px 15px;
    font-size: 18px;
    transform: translate(0%, 0);
    border: none;
    background-color: #fff2dc;
    transition-property: width;
    width: 85%;
    margin: 0;
    transition: 0.5s;

    &:focus {
      outline: none;
      border-bottom: 2px solid #4a90e2;
      transition-property: width;
      width: 95%;
      transition: 0.5s;
    }
  `;

  const TodoList = styled.div`
    top: 50%;
    width: 100%;
    color: #4a90e2;
    margin-top: 30px;
  `;

  const FunctionButtonsList = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
  `;

  const FunctionButton = styled.div`
    padding: 1px 5px;
    cursor: pointer;
    color: white;
    border-radius: 5px;
    transition: 0.5s;
    background-color: #dd0000;
    border: 1px solid #dd0000;

    &:hover {
      transform: scale(1.15);
    }
  `;

  function writeTodoToLocalStorage(todo) {
    window.localStorage.setItem("todos", JSON.stringify(todo));
  }

  const [nowStatus, setNowStatus] = useState("all");
  const [id, setId] = useState(1);

  const [todos, setTodos] = useState(() => {
    let todoData = JSON.parse(localStorage.getItem("todos")) || "";
    if (todoData != false) {
      setId(todoData[todoData.length - 1].id + 1);
      return todoData;
    }

    todoData = [];
    setId(1);

    return todoData;
  });

  return (
    <Root>
      <StatusButtonsList>
        <StatusButton
          $active={nowStatus === "all"}
          onClick={() => {
            setNowStatus("all");
          }}
        >
          My Tasks
        </StatusButton>
        <StatusButton
          $active={nowStatus === "in-progress"}
          onClick={() => {
            setNowStatus("in-progress");
          }}
        >
          In Progress
        </StatusButton>
        <StatusButton
          $active={nowStatus === "completed"}
          onClick={() => {
            setNowStatus("completed");
          }}
        >
          Completed
        </StatusButton>
      </StatusButtonsList>
      <Title>Todo List</Title>
      <Submit
        type="text"
        placeholder="Add somethig to do here !"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTodos([
              ...todos,
              {
                id,
                status: "in-progress",
                task: e.target.value,
              },
            ]);
            setId(id + 1);
          }
        }}
      />
      <TodoList>
        {nowStatus === "all" &&
          todos
            .filter(
              (todo) =>
                todo.status === "in-progress" || todo.status === "completed"
            )
            .map((todo) => (
              <TodoItem todos={todos} setTodos={setTodos} todo={todo} />
            ))}

        {nowStatus !== "all" &&
          todos
            .filter((todo) => todo.status === nowStatus)
            .map((todo) => (
              <TodoItem todos={todos} setTodos={setTodos} todo={todo} />
            ))}
      </TodoList>
      <FunctionButtonsList>
        <FunctionButton
          onClick={() => {
            setTodos([]);
          }}
        >
          Clear All Tasks
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            alert("儲存成功！");
            writeTodoToLocalStorage(todos);
          }}
        >
          Save
        </FunctionButton>
      </FunctionButtonsList>
    </Root>
  );
}
export default App;
