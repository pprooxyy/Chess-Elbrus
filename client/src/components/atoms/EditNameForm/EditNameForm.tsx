import React, { useState } from "react";
import "./EditNameForm.css";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/typesRedux";
import { EditNameFormProps, IEditNameForm } from "../../../types";
import { editUser } from "../../../redux/thunk/auth/editUser";

export default function EditNameForm({ setEditName }: EditNameFormProps) {
  const user = useAppSelector((state: RootState) => state.authSlicer.user);
  const dispatch = useAppDispatch();

  const initialState: IEditNameForm = {
    user_name: user.user_name,
  };

  const [newName, setNewName] = useState(initialState) as [
    IEditNameForm,
    React.Dispatch<React.SetStateAction<IEditNameForm>>
  ];

  const submitEditFormHandler = (e: any) => {
    e.preventDefault();
    console.log(newName.user_name);
    dispatch(editUser({ newName: newName.user_name, newPic: "" }));
    setEditName(false);
  };

  return (
    <form className="edit-name-form" onSubmit={submitEditFormHandler}>
      <input
        name="user_name"
        value={newName.user_name}
        onChange={(e) =>
          setNewName({ ...newName, [e.target.name]: e.target.value })
        }
      />
      <button>
        <img alt="apply" src="/assets/profilePage/apply-icon.svg" />
      </button>
      <button onClick={() => setEditName(false)}>
        <img alt="cancel" src="/assets/profilePage/cancel-icon.svg" />
      </button>
    </form>
  );
}
