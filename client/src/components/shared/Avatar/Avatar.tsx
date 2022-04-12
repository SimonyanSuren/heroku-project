import "./Avatar.css";

export default function Avatar({ width, height, onClick }: any) {
  return (
    <div className="avatar" style={{ width, height }} onClick={onClick}>
      <div className="avatar-head"></div>
      <div className="avatar-body"></div>
    </div>
  );
}
