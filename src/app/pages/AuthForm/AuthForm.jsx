"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import "./AuthForm.css";
import Input from "../components/Input";
import Button from "../components/button";
import SocialActionButton from "../components/socialActionButton";

function AuthForm() {
  const [LogOrReg, setLogOrReg] = useState("LOGIN");
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const toggleLogOrReg = useCallback(() => {
    if (LogOrReg === "LOGIN") {
      setLogOrReg("REGISTER");
    } else {
      setLogOrReg("LOGIN");
    }
  }, [LogOrReg]);

  function onSubmit(data) {
    setLoading(true);

    if (LogOrReg === "LOGIN") {
      //api access login
      console.log("login");
    } else {
      //api access register
      console.log("register");
    }
  }

  function SocialLogin(action) {
    setLoading(true);
    //git hub or google account
  }

  return (
    <div className="authform_container">
      <div className="authform_container_header">
        <FaFacebookMessenger className="authform_container_header_logo" />
        <h1>Sign in to your account</h1>
      </div>

      <div className="authform_container_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {LogOrReg === "REGISTER" ? (
            <Input
              id="name"
              label="Name"
              register={register}
              type="input"
              error={errors}
              disabled={isLoading}
            />
          ) : null}
          <Input
            id="email"
            label="Email address"
            register={register}
            type="input"
            error={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            register={register}
            type="input"
            error={errors}
            disabled={isLoading}
          />
          <Button
            name={LogOrReg === "REGISTER" ? "Register" : "Sign In"}
            disabled={isLoading}
          />
        </form>
        <div className="authform_container_bottomtext">
          <span>or continue with</span>
        </div>
        <div className="authform_container_Socialaction">
          <SocialActionButton
            onclick={SocialLogin}
            icon={FaGithub}
            disabled={isLoading}
          />
          <SocialActionButton
            onclick={SocialLogin}
            icon={AiFillGoogleCircle}
            disabled={isLoading}
          />
        </div>
        <div className="authform_container_toggling">
          {LogOrReg === "LOGIN" ? 
            <span onClick={toggleLogOrReg}>New to Messenger ? Create</span>

            :

            <span onClick={toggleLogOrReg}>Already have account ? Login</span>
            
          }
        </div>

      </div>
    </div>
  );
}

export default AuthForm;
