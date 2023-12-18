import "./Badge.scss";

type BadgeProps = {
  text: number;
};
export const Badge = ({ text }: BadgeProps) => {
  return <div className="badge">{text}</div>;
};
