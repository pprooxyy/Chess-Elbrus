import React, { useState } from "react";
import { ILoginForm } from "../../../types";
import "./LoginModal.css";
import { useAppDispatch } from "../../../redux/typesRedux";
import { loginUser } from "../../../redux/thunk/auth/loginUser";
import Button from "../../atoms/Button/Button";

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

  const dispatch = useAppDispatch();

  const inputsChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputValues: React.Dispatch<React.SetStateAction<ILoginForm>>
  ) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Действия при отправке формы
    console.log("Login form submitted");
    console.log("email:", inputValues.user_email);
    console.log("password:", inputValues.user_password);
    dispatch(loginUser(inputValues));
    setShowLoginModal(false);
  };

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
          <br />
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
