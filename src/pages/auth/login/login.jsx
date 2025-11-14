import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AxiosInstance from "../../../../api/axios/axios";
import { endPoints } from "../../../../api/endPoints/endPoints";

const schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "password must be at least 6 characters")
    .max(20, "password cannot exceed 20 characters")
    .required("password is required"),
});
export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleClick = async(data) => {
    console.log("Clicked");
    let loginData ={
      email: data.email,
      password: data.password
    }
    try{
      const response = await AxiosInstance.post(
        endPoints.auth.sign_in, loginData
      );
      if(response.data.status === true){
        alert(response.data.message);
      } else{
        alert(response.data.message);
      }
    }catch(error){
      console.log("error");
      
    }
  };

  

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleClick)}>
        <input {...register("email", { required: true })} style={{marginBottom: "10px",marginLeft: "10px"}} placeholder="Enter your Email"/> 
        {errors.email && <span style={{color: "red", marginBottom: "10px", marginLeft: "10px"}}>{errors.email.message}</span>}<br/>

        <input {...register("password", { required: true })} style={{marginBottom: "10px",marginLeft: "10px"}} placeholder="Enter your password"/>
        {errors.password && <span style={{color: "red", marginBottom: "10px", marginLeft: "10px"}}>{errors.password.message}</span>}<br/>

        <input type="submit" />
        <p>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/register")}
            style={{ border: "none", background: "none", color: "lightblue", cursor: "pointer", textDecoration: "underline" }}
          >
            Create an acount
          </button>
        </p>
      </form>
    </>
  );
}
