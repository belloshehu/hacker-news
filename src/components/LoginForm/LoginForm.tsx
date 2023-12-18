import { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import { useLinkContext } from "../../context/link-context";
import { AuthContextType, LinkContextType } from "../../context/types";
import { useMutation, gql } from "@apollo/client";
import { useAuthProvider } from "../../context/auth-context";

const LOG_USER_MUTATION = gql`
  mutation CreateUserMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        email
      }
    }
  }
`;

export const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { setLinks } = useLinkContext() as LinkContextType;
  const { setToken, setUser } = useAuthProvider() as AuthContextType;

  const [userMutation] = useMutation(LOG_USER_MUTATION, {
    variables: data,
    onCompleted: ({ login }) => {
      setToken(login.token);
      setUser(login.user);
      localStorage.setItem("token", login.token);
    },
  });
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={yup.object({
          email: yup.string().email("Invalid email").required("Email required"),
          password: yup
            .string()
            .required("Password required")
            .min(8, "Password must be atleast 8 characters")
            .matches(/[a-z]+/, "Must contain atleast one lowercase character")
            .matches(/\d+/, "Must contain atleast one number"),
        })}
        onSubmit={async (values, { resetForm }) => {
          setData(values);
          try {
            userMutation();
            resetForm();
          } catch (error) {
            console.log(error);
          } finally {
            console.log("User logged in!");
          }
        }}>
        <Form>
          <div className="form">
            <div className="form__control">
              <label htmlFor="email" className="form__control--label">
                Email
              </label>
              <Field
                name="email"
                className="form__control--input"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                render={(message) => (
                  <small className="form__control--error">{message}</small>
                )}
              />
            </div>
            <div className="form__control">
              <label htmlFor="password" className="form__control--label">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="form__control--input"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                render={(message) => (
                  <small className="form__control--error">{message}</small>
                )}
              />
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
