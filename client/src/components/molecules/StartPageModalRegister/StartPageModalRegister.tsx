import React, { useState } from "react";
import { IRegisterForm } from "../../../types";
import { registerUser } from "../../../redux/thunk/auth/registerUser";
import { useAppDispatch } from "../../../redux/typesRedux";
import Button from "../../atoms/Button/Button";
import "./StartPageModalRegister.css";

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

  const dispatch = useAppDispatch();

  const inputsChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputValues: React.Dispatch<React.SetStateAction<IRegisterForm>>
  ) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Действия при отправке формы
    console.log("Form submitted");
    console.log("name:", inputValues.user_name);
    console.log("email:", inputValues.user_email);
    console.log("password:", inputValues.user_password);
    dispatch(registerUser(inputValues));
    setShowRegisterModal(false);
  };

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
