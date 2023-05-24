import React, { useEffect, useState } from "react";
import { ILoginForm } from "../../../types";
import "./StartPageModalLogin.css";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import { loginUser } from "../../../redux/thunk/auth/loginUser";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router";

const initialState: ILoginForm = {
  user_email: "",
  user_password: "",
};

type loginModalProps = {
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginModal({ setShowLoginModal }: loginModalProps) {
  const [inputValues, setInputValues] = useState(initialState) as [
    ILoginForm,
    React.Dispatch<React.SetStateAction<ILoginForm>>
  ];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const inputsChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputValues: React.Dispatch<React.SetStateAction<ILoginForm>>
  ) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const isAuth = useAppSelector(state => state.authSlicer.isAuthenticated)
  const message = useAppSelector(state => state.authSlicer.msg)

  const [displayMessage, setDisplayMessage] = useState(true);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(inputValues));
    

  };
  useEffect(() => {
    if (message) {
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
      }, 3000);
    }
  }, [message]);

  useEffect(() => {
    setTimeout(() => {
      if (isAuth) navigate('/home')
    }, 1000)
  }, [isAuth, navigate])


  return (
    <div className="modal-overlay-login">
      <div className="modal-login">
        <form onSubmit={submitHandler}>
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
          <br/>
          { displayMessage && isAuth && <div className="messageDiv">{message} </div>} 
          { 
            displayMessage && !isAuth && <div className="messageDiv">{message} </div>
          }
         
          <div className="button-container">
            <Button text="Submit" width="150px" height="50px" />
            <Button
              text="Cancel"
              width="150px"
              height="50px"
              onClick={() => setShowLoginModal(false)}
            />
            
          </div>
        </form>
      </div>
    </div>
  );
}
