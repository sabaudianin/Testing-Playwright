import React from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { FormErrors } from "../components";
import { useAuth } from "../hooks";

export function Auth() {
  const data = useAuthPage();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              Sign {data.isRegister ? "up" : "in"}
            </h1>
            <p className="text-xs-center">
              <Link to="/register">
                {data.isRegister ? "Have" : "Need"} an account?
              </Link>
            </p>
            <Formik
              onSubmit={data.handleSubmit}
              initialValues={
                data.isRegister
                  ? { ...LOGIN_INITIAL_VALUES, username: "" }
                  : LOGIN_INITIAL_VALUES
              }
            >
              {({ isSubmitting }) => (
                <>
                  <FormErrors />
                  <Form>
                    {data.isRegister && (
                      <fieldset className="form-group">
                        <Field
                          type="text"
                          name="username"
                          className="form-control form-control-lg"
                          placeholder="Your Name"
                        />
                      </fieldset>
                    )}
                    <fieldset className="form-group">
                      <Field
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                      />
                    </fieldset>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn btn-lg btn-primary pull-xs-right"
                    >
                      Sign {data.isRegister ? "up" : "in"}
                    </button>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

function useAuthPage() {
  const navigate = useNavigate();
  const isRegister = useMatch("/register");
  const { login } = useAuth();

  const handleSubmit = async (values, actions) => {
    try {
      const { data } = await axios.post(`/users${isRegister ? "" : "/login"}`, {
        user: values,
      });

      login(data.user);

      navigate("/");
    } catch (error) {
      const { status, data } = error.response;

      if (status === 422) {
        actions.setErrors(data.errors);
      }
    }
  };

  return { handleSubmit, isRegister };
}

const LOGIN_INITIAL_VALUES = { email: "", password: "" };
