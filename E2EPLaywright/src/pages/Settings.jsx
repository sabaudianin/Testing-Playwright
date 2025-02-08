import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import axios from "axios";
import { useAuth, useUserQuery } from "../hooks";
import { FormErrors } from "../components";

export function Settings() {
  const data = useSettings();

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <Formik
              onSubmit={data.handleSubmit}
              initialValues={data.user}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <>
                  <FormErrors />
                  <Form>
                    <fieldset disabled={isSubmitting}>
                      <fieldset className="form-group">
                        <Field
                          name="image"
                          className="form-control"
                          type="text"
                          placeholder="URL of profile picture"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field
                          name="username"
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Your Name"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field
                          as="textarea"
                          name="bio"
                          className="form-control form-control-lg"
                          rows={8}
                          placeholder="Short bio about you"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field
                          name="email"
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Email"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field
                          name="password"
                          className="form-control form-control-lg"
                          type="password"
                          placeholder="Password"
                        />
                      </fieldset>
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary pull-xs-right"
                      >
                        Update Settings
                      </button>
                    </fieldset>
                  </Form>
                </>
              )}
            </Formik>
            <hr />
            <button
              onClick={data.handleLogout}
              type="button"
              className="btn btn-outline-danger"
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function useSettings() {
  const {
    data: { user },
  } = useUserQuery();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const { data } = await axios.put(`/user`, { user: values });
      const updatedUsername = data?.user?.username;

      login(data?.user);

      queryClient.invalidateQueries(`/profiles/${updatedUsername}`);
      queryClient.invalidateQueries(`/user`);

      navigate(`/profile/${updatedUsername}`);
    } catch (error) {
      const { status, data } = error.response;

      if (status === 422) {
        setErrors(data.errors);
      }
    }
  };

  const handleLogout = () => logout(queryClient);

  return {
    user,
    handleLogout,
    handleSubmit,
  };
}
