import React, { useState, useEffect } from "react";
import {withFormik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";

//Things needed{
//Name, Email, Password, TOS(checkbox), Submit Button
//}

const NewUser = ({values, errors, touched, status}) => {

  const [user,setuser] = useState([]);

useEffect(() => {
  console.log("status has changed", status)
  
    status && setuser([...user, status])
  
}, [status]);

return(
  <div className="container">
    <Form>
      <div className="nameField">
        <label>Enter Name<Field type="text" name="name" placeholder="Name"/></label>
        {touched.name && errors.name && (<p className="error">{errors.email}</p>)}
      </div>

      <div className="emailField">
        <label>Enter Email<Field type="email" name="email" placeholder="Email"/></label>
        {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
      </div>

      <div className="passwordField">
        <label>Enter Password<Field type="password" name="password" placeholder="Password"/></label>
        {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
      </div>

      <div className="tosField">
        <label>I agree to the Terms of Services: <Field type="checkbox" name="terms" checked={values.terms}/></label>
        {touched.terms && errors.terms && (<p className="error">{errors.terms}</p>)}
        <button>Submit</button>
      </div>
    </Form>
    {user.map(person => (
      <ul key={person.id}>
        <li>Name: {person.name}</li>
        <li>Email: {person.email}</li>
    <li>Password: {"*".repeat(person.password.length)}</li>
      </ul>
    ))}
  </div>
)
}

const FormikNewUser = withFormik({
mapPropsToValues({ name, email, password, terms}) {
  return {
    name: name || "",
    email: email || "",
    password: password || "",
    terms: terms || false
  };
},

validationSchema: Yup.object().shape({
  name: Yup.string().min(2, "Name must be longer than one character.").required("Required Field."),
  email: Yup.string().email("Email not valid.").required("Required Field."),
  password: Yup.string().min(5, "Password must have at least 5 characters.").required("Required Field."),
  terms: Yup.boolean().oneOf([true], "Please accept Terms of Service.").required()
}),

handleSubmit(values, {setStatus}) {
  axios
  .post(" https://reqres.in/api/users/", values)
  .then(response => {
    console.log(response);
    setStatus(response.data);
  })
  .catch(error => console.log(error.response));
}

})(NewUser)

export default FormikNewUser
