import "./FeedDetail.scss";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "../../components/Link/Link";
import { LinkProp } from "../../types";
import { timeDifferenceForDate } from "../../utils";

const SINGLE_LINK_QUERY = gql`
  query SingleFeedQuery($id: Int!) {
    link(id: $id) {
      singleLink {
        id
        url
        description
        createdAt
        votes {
          id
        }
      }
      topVotedLinks {
        id
        url
        description
        createdAt
        postedBy {
          name
          id
        }
        votes {
          id
        }
      }
    }
  }
`;

export const FeedDetail = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(SINGLE_LINK_QUERY, {
    variables: { id: parseInt(id as string) },
    onCompleted: ({ link }) => {
      console.log(link);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (loading)
    return (
      <div className="container">
        <h3>Loading...</h3>
      </div>
    );
  if (error)
    return (
      <div className="container">
        <h3 className="error">{error.message}</h3>
      </div>
    );

  return (
    <div className="feed-detail">
      {data && (
        <>
          <div className="feed-detail__description">
            <h1>{data.link.singleLink.url}</h1>
            <div>
              <p>{data.link.singleLink.description}</p>
            </div>

            <div className="feed-detail__wrapper">
              <div className="feed-detail__vote">
                <h3>{data.link.singleLink.votes.length} votes</h3>
                <button type="button" className="btn">
                  Vote now
                </button>
              </div>
              <small className="feed-detail__date">
                Created {timeDifferenceForDate(data.link.singleLink.createdAt)}
              </small>
            </div>
          </div>

          <h3 className="feed-detail__top-voted__heading">Top voted links</h3>
          <div className="feed-detail__top-voted">
            <ul>
              {data.link.topVotedLinks.map((link: LinkProp, index: number) => (
                <Link link={link} key={link.id} text={index + 1} />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
