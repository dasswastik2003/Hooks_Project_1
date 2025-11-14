import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { endPoints } from "../../../../api/endPoints/endPoints";
import AxiosInstance from "../../../../api/axios/axios";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup
    .string()
    // .firstName("First is required")
    .required("FirstName is required"),
  address: yup
    .string()
    // .lastName("lastName is required")
    .required("lastName is required"),
  // .min(3, "lastName must be at least 3 characters"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "password cannot exceed 20 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(6, "Confirm Password must be at least 6 characters")
    .max(20, "Confirm password cannot exceed 20 characters")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
  profileImage: yup
    .mixed()
    .required("Image is required")
    .test(
      "fileExist",
      "Please select an image",
      (value) => value && value.length > 0
    )
    .test("fileType", "Unsupported file format", (value) =>
      value && value.length > 0
        ? ["image/jpeg", "image/jpg", "image/gif"].includes(value[0].type)
        : false
    ),
});
export default function Register() {
  const navigate= useNavigate()
  const [img, setImg] = useState();
  console.log("img", img);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const imageChange = (e) => {
    const file = e.target.files[0];

    console.log(file, "file");

    if (file && file.type.startsWith("image/")) {
      setImg(file);
      // setValue("profileImage");
      clearErrors("profileImage", file);
    } else {
      alert("please upload your img file");
    }
  };

  const handleClick = async (data) => {
    // console.log("firstName", data.firstName);
    // console.log("lastname", data.lastName);
    // console.log("email", data.email);
    // console.log("password", data.password);
    // console.log("confirm Password", data.password);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", img);
    try {
      const response = await AxiosInstance.post(
        endPoints.auth.sign_up,
        formData
      );
      console.log(response, "kk");
      if (response.data.status === true) {
        alert(response.data.message);
        localStorage.setItem("userId", response.data.user.id)
        localStorage.setItem("email", response.data.user.email)
        navigate("/auth/otp")
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit(handleClick)}
        // style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="name">First Name:</label>
        <input
          {...register("name", { required: true })}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
          placeholder="Enter your name"
        />
        {errors.name && (
          <span
            style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
          >
            {errors.name.message}
          </span>
        )}
        <br />

        <label htmlFor="address">Address:</label>
        <input
          {...register("address")}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
          placeholder="Enter your address"
        />
        {errors.address && (
          <span
            style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
          >
            {errors.address.message}
          </span>
        )}
        <br />

        <label htmlFor="email">Email:</label>
        <input
          {...register("email", { required: true })}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
          placeholder="Enter your Email"
        />
        {errors.email && (
          <span
            style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
          >
            {errors.email.message}
          </span>
        )}
        <br />

        <label htmlFor="password">Password:</label>
        <input
          {...register("password", { required: true })}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
          placeholder="Enter your Password"
        />
        {errors.password && (
          <span
            style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
          >
            {errors.password.message}
          </span>
        )}
        <br />
        {/* {errors.exampleRequired && <span>This field is required</span>} */}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          {...register("confirmPassword", { required: true })}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
          placeholder="Enter your Confirm Password"
        />
        {errors.confirmPassword && (
          <span
            style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
          >
            {errors.confirmPassword.message}
          </span>
        )}
        <br />
        {/* {errors.exampleRequired && <span>This field is required</span>} */}

        <label>File</label>
        <input
          type="file"
          placeholder="please select a file to upload"
          {...register("profileImage")}
          onChange={imageChange}
        />
        <div>
          {img && (
            <div className="mb-2">
              <img
                src={URL.createObjectURL(img)}
                alt="Preview"
                className="h-44 w-auto rounded-lg shadow-md"
              />
            </div>
          )}
          {errors.profileImage && (
            <span style={{ color: "red" }}>{errors.profileImage.message}</span>
          )}
                    
        </div>

        <input type="submit" />
        
        <Link to="/auth/otp"/>
      </form>
    </>
  );
}
