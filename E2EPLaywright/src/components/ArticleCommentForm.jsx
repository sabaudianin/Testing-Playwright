import React from "react";
import { Formik, Form, Field } from "formik";
import { useAddCommentMutation, useArticleQuery, useAuth } from "../hooks";

export function ArticleCommentForm() {
  const { author, handleSubmit } = useArticleCommentForm();

  return (
    <Formik onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
      {({ isSubmitting }) => (
        <Form className="card comment-form">
          <div className="card-block">
            <Field
              name="body"
              as="textarea"
              required
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
            />
          </div>
          <div className="card-footer">
            <img src={author?.image} className="comment-author-img" />
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-sm btn-primary"
            >
              Post Comment
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function useArticleCommentForm() {
  const { data } = useArticleQuery();
  const { mutateAsync } = useAddCommentMutation();
  const { authUser } = useAuth();
  const { author } = data.article;

  const handleSubmit = async ({ body }, { resetForm }) => {
    await mutateAsync({
      articleId: data.article.id,
      authorId: authUser.id,
      comment: body,
    });

    resetForm();
  };

  return {
    author,
    handleSubmit,
  };
}

const INITIAL_VALUES = { body: "" };
