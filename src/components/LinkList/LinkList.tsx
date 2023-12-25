import { FeedType, LinkProp } from "../../types";
import { Link } from "../Link/Link";
import { useQuery, gql } from "@apollo/client";
import "./LinkList.scss";
import { useLinkContext } from "../../context/link-context";
import { LinkContextType } from "../../context/types";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FEED_PER_PAGE } from "../../constants";
import { Pagination } from "../Pagination/Pagination";

export const FEED_QUERY = gql`
  query FeedQuery($skip: Int, $take: Int, $orderBy: LinkOrderByInput) {
    feed(skip: $skip, take: $take, orderBy: $orderBy) {
      count
      links {
        id
        url
        description
        createdAt
        postedBy {
          name
        }
        votes {
          id
        }
      }
    }
  }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      user {
        id
        name
      }
      link {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const getQueryVariables = (isNewPage: Boolean, page: number) => {
  const skip = isNewPage ? (page - 1) * FEED_PER_PAGE : 0;
  const take = isNewPage ? FEED_PER_PAGE : 100;
  const orderBy = { createdAt: "desc" };
  return { skip, take, orderBy };
};

const getLinksToRender = (isNewPage: Boolean, data: FeedType) => {
  if (isNewPage) return data.feed.links;
  return data.feed.links
    .slice()
    .sort((link1, link2) => link2.votes.length - link1.votes.length);
};

export const LinkList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isNewPage = pathname.includes("new");
  const pageIndexParams = pathname.split("/");
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);

  // fetch data from backend
  const { data, loading, error, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page),
  });
  const { setLinks } = useLinkContext() as LinkContextType;

  // subscription for new link
  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData) return prev;
      const newLink = subscriptionData.data.newLink;
      const existingLink = prev.feed.links.find(
        (link: LinkProp) => link.id === newLink.id
      );

      if (existingLink) return existingLink;
      toast.success("New link added!");
      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });

  // subscription for new vote
  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
    updateQuery: (_, { subscriptionData }) => {
      const { newVote } = subscriptionData.data;
      toast.success(`${newVote.user.name} voted for ${newVote.link.url}`);
    },
  });
  useEffect(() => {
    if (data) {
      setLinks(data.feed.links);
    }
  }, []);

  const handleNextPage = () => {
    if (page < data.feed.count / FEED_PER_PAGE) {
      navigate(`/new/${page + 1}`);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      navigate(`/new/${page - 1}`);
    }
  };

  if (loading) return <h3 className="loading">Loading...</h3>;
  if (error) return <h3 className="error">{error.extraInfo}</h3>;
  return (
    <>
      <ul className="list__items">
        {data &&
          getLinksToRender(isNewPage, data).map(
            (link: LinkProp, index: number) => (
              <Link link={link} key={link.id} text={index + 1} />
            )
          )}
      </ul>
      {isNewPage && (
        <Pagination
          nextPageHandler={handleNextPage}
          previousPageHandler={handlePreviousPage}
        />
      )}
    </>
  );
};
