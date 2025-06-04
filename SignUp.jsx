import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Container = styled.div`
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Title = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;
const Sub = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const Helper = styled.span`
  font-size: 13px;
  margin-top: 4px;
  ${({ error, theme }) =>
    error
      ? css`
          color: #e53935;
        `
      : css`
          color: ${theme.text_secondary + 90};
        `}
`;

const MeterWrap = styled.div`
  height: 6px;
  width: 100%;
  border-radius: 8px;
  background: ${({ theme }) => theme.text_secondary + 20};
  overflow: hidden;
`;
const MeterBar = styled.div`
  height: 100%;
  width: ${({ strength }) => strength}%;
  transition: width 0.3s ease;
  ${({ strength }) => {
    if (strength < 25)
      return css`
        background: #e53935;
      `;
    if (strength < 50)
      return css`
        background: #ff9800;
      `;
    if (strength < 75)
      return css`
        background: #cddc39;
      `;
    return css`
      background: #4caf50;
    `;
  }}
`;

const SignUp = ({ setOpenAuth }) => {
  const dispatch = useDispatch();

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [serverEmailError, setServerEmailError] = useState(""); // NEW
  const [matchError, setMatchError] = useState("");
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      email && !emailPattern.test(email)
        ? "Please enter a valid email address"
        : ""
    );

    const calcStrength = (pwd) => {
      if (!pwd || pwd.length < 6) return 0;
      const classes =
        (/[a-z]/.test(pwd) ? 1 : 0) +
        (/[A-Z]/.test(pwd) ? 1 : 0) +
        (/\d/.test(pwd) ? 1 : 0) +
        (/[!@#$%^&*(),.?":{}|<>]/.test(pwd) ? 1 : 0);
      return (classes / 4) * 100;
    };
    setStrength(calcStrength(password));

    setMatchError(
      confirm && password !== confirm ? "Passwords do not match" : ""
    );
  }, [email, password, confirm]);

  const isFormValid = () => {
    if (!first || !last || !email || !password || !confirm) {
      dispatch(
        openSnackbar({
          message: "Please fill in all fields",
          severity: "error",
        })
      );
      return false;
    }
    if (password.length < 6) {
      dispatch(
        openSnackbar({
          message: "Password must be at least 6 characters",
          severity: "error",
        })
      );
      return false;
    }
    if (emailError || matchError) return false;
    return true;
  };

  const handleSignUp = async () => {
    if (!isFormValid()) return;

    setLoading(true);
    setDisabled(true);

    try {
      const res = await UserSignUp({
        name: `${first.trim()} ${last.trim()}`,
        email: email.trim().toLowerCase(),
        password,
      });
      dispatch(loginSuccess(res.data));
      dispatch(
        openSnackbar({ message: "Sign-up successful!", severity: "success" })
      );
      setOpenAuth(false);
    } catch (err) {
      if (err.response?.status === 409) {
        setServerEmailError(
          err.response.data?.message || "Email already registered"
        );
      } else {
        const msg =
          err.response?.data?.message ||
          (err.message?.includes("Network")
            ? "Network error, please check your connection"
            : "Something went wrong. Try again.");
        dispatch(openSnackbar({ message: msg, severity: "error" }));
      }
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Create Account 👗</Title>
        <Sub>Join us for exclusive deals &amp; updates</Sub>
      </Header>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <TextInput
            label="First Name"
            placeholder="Jane"
            value={first}
            handelChange={(e) => setFirst(e.target.value)}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            value={last}
            handelChange={(e) => setLast(e.target.value)}
          />
        </div>

        <div>
          <TextInput
            label="Email Address"
            placeholder="jane.doe@example.com"
            value={email}
            handelChange={(e) => {
              setEmail(e.target.value);
              setServerEmailError("");
            }}
            error={!!(emailError || serverEmailError)}
          />
          {(emailError || serverEmailError) && (
            <Helper error>{emailError || serverEmailError}</Helper>
          )}
        </div>

        <div>
          <TextInput
            label="Password"
            placeholder="••••••••"
            password
            value={password}
            handelChange={(e) => setPassword(e.target.value)}
          />
          <MeterWrap>
            <MeterBar strength={strength} />
          </MeterWrap>
          <Helper>
            Strength:&nbsp;
            {strength === 100
              ? "Strongest"
              : strength >= 75
              ? "Strong"
              : strength >= 50
              ? "Fair"
              : strength >= 25
              ? "Weak"
              : "Very weak"}
          </Helper>
        </div>

        <div>
          <TextInput
            label="Confirm Password"
            placeholder="Repeat your password"
            password
            value={confirm}
            handelChange={(e) => setConfirm(e.target.value)}
            error={!!matchError}
          />
          {matchError && <Helper error>{matchError}</Helper>}
        </div>

        <Button
          text="Sign Up"
          onClick={handleSignUp}
          isLoading={loading}
          isDisabled={disabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;
