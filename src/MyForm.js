import React, {useState, useEffect} from 'react';
import axios from "axios";
import { withFormik, Form, Field } from 'formik';
import * as Yup from "yup";

function MyForm({values, errors, touched, status}){

    const [members, setMembers]= useState([]);

    useEffect(() => {

        console.log('status',status);
        status && setMembers([...members, status]);

    },[status]);
    console.log('members', members)
return(

    <div className ="noboardingForm">
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (<p className="errors">{errors.name}</p>)}
            <Field type= "email" name="email" placeholder="email" />
            {touched.email && errors.email && (<p className="errors">{errors.email}</p>)}
            <Field type= "password" name="password" placeholder="password" />
            {touched.password && errors.password && (<p className="errors">{errors.password}</p>)}
            <Field as="select" name="membership" className="membership">
                <option>Please Choose an Option</option>
                <option value="anunal">Anual Membership</option>
                <option value="monthly">Monthly Membership</option>
                <option value ="weekly">Weekly Membership</option>
                <option value="ontime">Onetime Membership</option>

            </Field>
            <label htmlFor="tos" className="checkbox-container">Term of Services</label>
            <Field id="tos" type="checkbox" name="tos" checked={values.tos} />

           
  
            <button type="submit">Submit!</button>
            

        </Form>

        {members.map( member => 
                <ul key = {member.id}>
                    <li>Name: {member.name}</li>
                    <li>email: {member.email}</li>
                    <li>Membership: {member.membership}</li>
                    <li>Term of Services: {(member.tos) ? "yes" : "no"}</li>
                </ul>
                )}



    </div>



)

}

const FormikForm = withFormik({
    mapPropsToValues({name, email, password, membership, tos}) {
        
        
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            membership: membership || "",
            tos: tos || false

        };


    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('please enter your name'),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
        membership: Yup.string()
      

    }),

    handleSubmit(values, {setStatus}) {
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            console.log('data', res.data);
            setStatus(res.data);

        })
        .catch(err => console.log(err.response));

    }



})(MyForm);

export default FormikForm;