import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "../../components/Link/Link";
import { useLazyQuery, gql } from "@apollo/client";
import { LinkProp } from "../../types";
import "./SearchPage.scss";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export const FEED_SEARCH_QUERY = gql`
  query SearchFeed($filter: String!) {
    feed(filter: $filter) {
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
export const SearchPage = () => {
  const { key: searchTerm } = useParams();
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY, {
    variables: { filter: searchTerm },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    executeSearch();
  }, [searchTerm]);

  return (
    <div className="container">
      <div className="heading">
        {data && <h1 className="heading__text">{data.feed.links.length}</h1>}
        <h1 className="heading__text">
          Result with <q>{searchTerm}</q>
        </h1>
      </div>
      <ul className="list__items">
        {data &&
          data.feed.links.map((link: LinkProp, index: number) => (
            <Link link={link} text={index + 1} key={index} />
          ))}
      </ul>
    </div>
  );
};
