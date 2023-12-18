import { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import { useLinkContext } from "../../context/link-context";
import { AuthContextType, LinkContextType } from "../../context/types";
import { useMutation, gql } from "@apollo/client";
import { useAuthProvider } from "../../context/auth-context";

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        email
        name
      }
    }
  }
`;

export const SignupForm = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const { setLinks } = useLinkContext() as LinkContextType;
  const { setUser, setToken } = useAuthProvider() as AuthContextType;

  const [userMutation] = useMutation(CREATE_USER_MUTATION, {
    variables: data,
    onCompleted: ({ signup }) => {
      localStorage.setItem("token", signup.token);
      setUser(signup.user);
      setToken(signup.token);
    },
  });
  return (
    <div>
      <Formik
        initialValues={{ email: "", name: "", password: "" }}
        validationSchema={yup.object({
          email: yup.string().email("Invalid email").required("Email required"),
          name: yup.string().min(3, "Too short").required("Name required"),
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
            console.log("User created");
          }
        }}>
        <Form>
          <div className="form">
            <div className="form__control">
              <label htmlFor="name" className="form__control--label">
                Name
              </label>
              <Field
                name="name"
                className="form__control--input"
                placeholder="Name"
              />
              <ErrorMessage
                name="name"
                render={(message) => (
                  <small className="form__control--error">{message}</small>
                )}
              />
            </div>

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
                name="password"
                type="password"
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
