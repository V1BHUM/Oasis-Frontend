import IconButton from "@/components/icon-buttons/icon-button";
import React from "react";
import css from "./login.module.css";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { Input } from "@/components/input/input";
import clsx from "clsx";
import Button from "@/components/button/button";
import { useLoginUserMutation, useRegisterUserMutation } from "@/graphql/generated/generated";
import withApollo from '@/apollo/client';
import { useRouter } from "next/router";


function LoginPage() {
  const router = useRouter();

  const [signUpPageActive, setSignupPageActive] =
    React.useState<boolean>(false);
  const [signUpUser, setSignUpUser] = React.useState("");
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");
  const [loginUserName, setLoginUserName] = React.useState("");
  const [loginUserPassword, setLoginUserPassword] = React.useState("");

  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const a = await loginUser({
        variables: { loginDetails: { username: loginUserName, password: loginUserPassword } }
      });
      setLoginUserName("");
      setLoginUserPassword("");
      await router.push("/dashboard");
    }
    catch (e) {
      console.log(e.message);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    await registerUser({
      variables: {
        registerDetails: {
          username: signUpUser,
          password: signUpPassword,
          email: signUpEmail
        }
      }
    });
    setSignUpEmail("");
    setSignUpUser("");
    setSignUpPassword("");
  }

  return (
    <div className={css["login-root"]}>
      <div
        className={clsx([
          css["container"],
          signUpPageActive && css["right-panel-active"],
        ])}
        id="container"
      >
        <div
          className={clsx([css["form-container"], css["sign-up-container"]])}
        >
          <form onSubmit={handleRegister}>
            <h1 className="text-black text-3xl font-bold">Create Account</h1>
            <div
              className={clsx([
                css["social-container"],
                "flex justify-around w-6/12",
              ])}
            >
              <IconButton size={16} Icon={FaFacebookF} />
              <IconButton size={16} Icon={FaGoogle} />
              <IconButton size={16} Icon={FaLinkedinIn} />
            </div>
            <span className="text-black">
              or use your email for registration
            </span>
            <Input
              placeholder="Name"
              onChange={(e) => {
                setSignUpUser(e.currentTarget.value);
              }}
              value = {signUpUser}
            />
            <Input
              placeholder="Email"
              onChange={(e) => {
                setSignUpEmail(e.currentTarget.value);
              }}
              value = {signUpEmail}
            />
            <Input
              placeholder="Password"
              type={"password"}
              onChange={(e) => {
                setSignUpPassword(e.currentTarget.value);
              }}
              value = {signUpPassword}

            />
            <Button
              label="Sign Up"
              type="submit"
            ></Button>
          </form>
        </div>
        <div
          className={[css["form-container"], css["sign-in-container"]].join(
            " "
          )}
        >
          <form onSubmit={handleLogin} >
            <h1 className="text-black text-3xl font-bold">Sign in</h1>
            <div
              className={clsx([
                css["social-container"],
                "flex justify-around w-6/12",
              ])}
            >
              <IconButton size={16} Icon={FaFacebookF} />
              <IconButton size={16} Icon={FaGoogle} />
              <IconButton size={16} Icon={FaLinkedinIn} />
            </div>
            <span className="text-black">or use your account</span>
            <Input placeholder="Username" onChange={(e) => setLoginUserName(e.currentTarget.value)} 
              value={loginUserName}/>
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setLoginUserPassword(e.currentTarget.value)}
              value={loginUserPassword}
            />
            <a href="#">Forgot your password?</a>
            <Button label="Sign In" type="submit" />
          </form>
        </div>
        <div className={css["overlay-container"]}>
          <div className={css["overlay"]}>
            <div
              className={[css["overlay-panel"], css["overlay-left"]].join(" ")}
            >
              <h1 className="text-white text-3xl font-bold">Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <Button
                outlined={true}
                label="Sign In"
                onClick={() => setSignupPageActive(false)}
              />
            </div>
            <div
              className={[css["overlay-panel"], css["overlay-right"]].join(" ")}
            >
              <h1 className="text-3xl font-bold">Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Button
                outlined={true}
                label="Sign Up"
                onClick={() => setSignupPageActive(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withApollo({ ssr: true })(LoginPage);