import React, { useEffect, useState } from "react";
import { IRegisterForm } from "../../../types";
import { registerUser } from "../../../redux/thunk/auth/registerUser";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import Button from "../../atoms/Button/Button";
import "./StartPageModalRegister.css";
import { useNavigate } from "react-router";

const initialState: IRegisterForm = {
  user_name: "",
  user_email: "",
  user_password: "",
};

type registerModalProps = {
  setShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RegisterModal({
  setShowRegisterModal,
}: registerModalProps) {
  const [inputValues, setInputValues] = useState(initialState) as [
    IRegisterForm,
    React.Dispatch<React.SetStateAction<IRegisterForm>>
  ];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  

  const inputsChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputValues: React.Dispatch<React.SetStateAction<IRegisterForm>>
  ) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isAuth = useAppSelector(state => state.authSlicer.isAuthenticated)
  const message = useAppSelector(state => state.authSlicer.msg)
  
  const [displayMessage, setDisplayMessage] = useState(true);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Действия при отправке формы
    
    dispatch(registerUser(inputValues));
    
  };
  useEffect(() => {
    if (message) {
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
      }, 3000);
    }
  }, [message]);
  // redirect to home if user is logged in
  useEffect(() => {
    setTimeout(() => {
      if (isAuth) navigate('/home')
    }, 1000)
  }, [isAuth, navigate])

  return (
    <div className="modal-overlay-register">
      <div className="modal-register">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="user_name"
            value={inputValues.user_name}
            onChange={(e) => inputsChangeHandler(e, setInputValues)}
            placeholder="name"
          />
          <br />
          <input
            type="email"
            name="user_email"
            value={inputValues.user_email}
            onChange={(e) => inputsChangeHandler(e, setInputValues)}
            placeholder="email"
          />
          <br />
          <input
            type="password"
            name="user_password"
            value={inputValues.user_password}
            onChange={(e) => inputsChangeHandler(e, setInputValues)}
            placeholder="password"
          />
          <br />
          { displayMessage && isAuth && <div className="messageDiv">{message} </div>} 
          { 
            displayMessage && !isAuth && <div className="messageDiv">{message} </div>
          }
          <div className="button-container">
            <Button text="Submit" width="150px" height="40px" />
            <Button
              text="Cancel"
              width="150px"
              height="40px"
              onClick={() => setShowRegisterModal(false)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
