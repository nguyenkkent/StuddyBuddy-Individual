import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select"

// import { useAuthContext } from "../../hooks/useAuthContext";
import axiosClient from "../../axiosClient";
import TextField from "../common/TextField";
import "../../css/FirstTime.css";

function FirstTime() {
  const navigate = useNavigate();
  // const {dispatch} = useAuthContext();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    tags: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // First Name validation
    if (!user.firstname) {
      formIsValid = false;
      errors["firstname"] = "First name is required.";
    }

    // Last Name validation
    if (!user.lastname) {
      formIsValid = false;
      errors["lastname"] = "Last name is required.";
    }

    // Tags validation
    // if (!user.tags) {
    //   formIsValid = false;
    //   errors["username"] = "Tags are required.";
    // }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // FIXME: Please create api route for this action
        const response = await axiosClient.patch("/api/user", user);
        //console.log(response.data);
        if (response.status === 200) {
          // dispatch({ type: "LOGIN", payload: response.data });
          navigate("/dashboard");
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      alert("Missing fields");
    }
  };

  // tag options
  const options = [
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "political science", label: "Political Science" },
    { value: "english", label: "English" },
    { value: "computer engineering", label: "Computer Engineering" },
    { value: "computer science", label: "Computer Science" }
  ]

  return (
    <div className="first-time-container">
      <h1>We just need a bit more information</h1>
      <div className="first-time-field-wrapper">
        <form onSubmit={handleSubmit} className="first-time-field">
          <TextField
            label="First Name:"
            type="text"
            name="firstname"
            value={user.firstname}
            onChange={handleChange}
            errors={errors.firstname}
          />
          <TextField
            label="Last Name:"
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
            errors={errors.lastname}
          />
          <div>
            <p className="first-time-tags-label">Tags:</p>
            <Select
              className="first-time-tags"
              placeholder=""
              options={options}
              onChange={(t) => {
                setUser({
                  ...user,
                  tags: t.map(v => v.label)
                });
              }}
              isMulti
            />
          </div>
          <div className="first-time-update-wrapper">
            <button className="first-time-update" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FirstTime;