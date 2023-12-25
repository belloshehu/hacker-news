import "./Link.scss";
import { FeedType, LinkProp } from "../../types";
import { Badge } from "../Badge/Badge";
import { timeDifferenceForDate } from "../../utils";
import { useMutation, gql } from "@apollo/client";
import { FEED_QUERY } from "../LinkList/LinkList";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../context/auth-context";
import { AuthContextType } from "../../context/types";
import { FEED_PER_PAGE } from "../../constants";
import { toast } from "react-hot-toast";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        description
      }
      user {
        name
      }
    }
  }
`;

export const Link = ({ link, text }: { link: LinkProp; text: number }) => {
  const navigate = useNavigate();
  const { token } = useAuthProvider() as AuthContextType;

  const skip = 0;
  const take = FEED_PER_PAGE;
  const orderBy = { createdAt: "desc" };

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: { linkId: link.id },
    onCompleted: () => {
      toast.success("You have voted!");
    },
    onError: () => {
      toast.error("Voting failed");
    },
    update: (cache, { data: { vote } }) => {
      // update feed query cache with new vote
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          skip,
          take,
          orderBy,
        },
      }) as FeedType;
      const updatedLinks = feed.links.map((feedLink: LinkProp) => {
        if (feedLink.id === link.id) {
          return { ...feedLink, votes: [...feedLink.votes, vote] };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: { links: updatedLinks },
        },
        variables: {
          take,
          skip,
          orderBy,
        },
      });
    },
  });

  const handleVote = () => {
    if (!token) {
      navigate("/auth");
    } else {
      vote();
    }
  };

  return (
    <li
      className="link"
      onClick={() => {
        navigate(`/feed/${link.id}`);
      }}>
      <h3 className="link__url">{link.url}</h3>
      <p className="link__description">{link.description}</p>
      <footer className="link__footer">
        <h4 className="link__footer--votes">{link.votes.length} votes</h4>{" "}
        <button className="btn" type="button" onClick={handleVote}>
          vote
        </button>
        |
        <h4 className="link__footer--posted-by">
          <i>Posted by</i> {link.postedBy.name}
        </h4>{" "}
        <h4 className="link__footer--date">
          | {timeDifferenceForDate(link.createdAt)}
        </h4>
      </footer>
      <Badge text={text} />
    </li>
  );
};
