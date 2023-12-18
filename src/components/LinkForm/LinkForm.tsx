import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { LinkFormValues, formProps } from "./types";
import "./LinkForm.scss";
import { useMutation, gql } from "@apollo/client";
import { useLinkContext } from "../../context/link-context";
import { LinkContextType } from "../../context/types";
import { FEED_QUERY } from "../LinkList/LinkList";
import { FeedType } from "../../types";
import { FEED_PER_PAGE } from "../../constants";

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      url
      description
      createdAt
      postedBy {
        name
      }
      votes {
        id
        user {
          id
          name
        }
        link {
          id
          url
        }
      }
    }
  }
`;
export const LinkForm = ({ submitBtnRef }: formProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [link, setLink] = useState<LinkFormValues>({
    url: "",
    description: "",
  });
  const { setLinks, links } = useLinkContext() as LinkContextType;

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: { url: link?.url, description: link?.description },
    onCompleted: ({ post }) => {
      setLinks([...links, post.link]);
    },
    onError: (error) => {
      console.log(error);
    },
    update: (cache, { data: { post } }) => {
      const { feed } = cache.readQuery({ query: FEED_QUERY }) as FeedType;
      const skip = 0;
      const take = FEED_PER_PAGE;
      const orderBy = { createdAt: "desc" };
      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: { links: [...feed.links, post] },
        },
        variables: {
          take,
          skip,
          orderBy,
        },
      });
    },
  });

  return (
    <div>
      <Formik
        initialValues={{ url: "", description: "" }}
        validationSchema={yup.object({
          url: yup.string().required("Url is required"),
          description: yup.string().required("description is required"),
        })}
        onSubmit={(values: LinkFormValues, { resetForm }) => {
          setSubmitting(true);
          try {
            createLink();
            resetForm();
          } catch (error) {
          } finally {
            setSubmitting(false);
          }
        }}>
        {({ handleChange }) => (
          <Form>
            <div className="form">
              <div className="form__control">
                <label htmlFor="url" className="form__control--label">
                  Url
                </label>
                <Field
                  type="text"
                  name="url"
                  className="form__control--input"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    handleChange(e);
                    setLink((prev: LinkFormValues) => {
                      return { ...prev, url: e.currentTarget.value };
                    });
                  }}
                />
                <ErrorMessage
                  name="url"
                  render={(message) => (
                    <small className="form__control--error">{message}</small>
                  )}
                />
              </div>
              <div className="form__control">
                <label htmlFor="description" className="form__control--label">
                  Description
                </label>
                <Field
                  as="textarea"
                  cols="25"
                  rows="10"
                  name="description"
                  className="form__control--input"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    handleChange(e);
                    setLink((prev: LinkFormValues) => {
                      return { ...prev, description: e.currentTarget.value };
                    });
                  }}
                />
                <ErrorMessage
                  name="description"
                  render={(message) => (
                    <small className="form__control--error">{message}</small>
                  )}
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="btn"
                  hidden
                  ref={submitBtnRef}
                  disabled={submitting}>
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
