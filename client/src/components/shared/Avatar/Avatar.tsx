import "./Avatar.css";

export default function Avatar({ width, height, onClick, photo }: any) {
  return (
    <div className="avatar" style={{ width, height }} onClick={onClick}>
      {photo ? (
        <>
          (<img src={require(`../../../../../server/public/images${photo}`)} />)
        </>
      ) : (
        <>
          {" "}
          (<div className="avatar-head"></div>
          <div className="avatar-body"></div>)
        </>
      )}
    </div>
  );
}
