import { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "./api";
import { validateForm } from "./ValidateForm";

export function UserForm({ userId }) {
  const { data: user, isLoading, isError } = useGetUserQuery(userId);
  const [updateUser, { isLoading: isSending, isSuccess }] =
    useUpdateUserMutation();

  useEffect(() => {
    console.log("Mutation success state:", isSuccess);
  }, [isSuccess]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!user) {
      return;
    }

    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      console.log("Sending update request...", formData);
      await updateUser(formData);
      setFormErrors({});

      return;
    }

    setFormErrors(errors);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading user data.</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {formErrors.firstName && <p>{formErrors.firstName}</p>}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {formErrors.lastName && <p>{formErrors.lastName}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <p>{formErrors.email}</p>}

        <button
          disabled={isSending}
          type="submit"
        >
          Update User
        </button>
      </form>
      {isSuccess && <p>User has been updated</p>}
    </>
  );
}
