import React, { useState, useEffect } from "react";

const Post = (props) => {
  const isPostLikedByMe = props.post.likes.includes(props.userName);
  let likeButtonText = "Like";
  if (isPostLikedByMe) {
    likeButtonText = "Liked";
  }

  const [showInput, setShowInput] = useState("none");
  const [inputVal, setInputVal] = useState("");
  const [arr, setArr] = useState({});

  // useEffect(() =>{setTimeout(() => { setInputComm("none")} ,5000)}, [inputComm]);
  const showCommentInput = () => {
    setShowInput("flex");
  };

  const addItemToArray = () => {
    const newArrItem = { comm: inputVal, id: Math.floor(Math.random() * 1000) }
    setArr(newArrItem);
    props.post.comments.push(newArrItem);
    console.log(props.post.comments);
    setInputVal("");
    console.log(arr.id);
  };

  useEffect(() => {
    console.log(props.post);
  }, []);
  // console.log(props.post)

  return (
    <div className="post" onClick={showCommentInput}>
      <img className="post-img" src={props.post.imageUrl}></img>

      <div className="post-buttons">
        <button
          onClick={() => {
            props.likeHandler(props.post.id);
          }}
        >
          {likeButtonText}
        </button>
        <button
          onClick={() => {
            if (inputVal !== "") {
              addItemToArray();
            }
          }}
        >
          Comment
        </button>
        <button
          onClick={() => {
            console.log("share");
          }}
        >
          Share
        </button>
      </div>

      <div style={{ width: 652 }}>
        <p className="post-likes">{props.post.likes.length} and others</p>
        <p className="post-description">
          <span className="username">{props.post.username}</span>{" "}
          <span>{props.post.description}</span>
        </p>
        
      </div>
      <input
        type="text"
        style={{ display: showInput }}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        placeholder="Leave your comment"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addItemToArray();
          }
        }}
      />
      <p className="post-comments" style={{display:showInput}}>comments: {props.post.comments.length}</p>
      <div className="user-comment" style={{display:showInput}}>
        {props.post.comments.map((item, index) => {
          return (
            <p key={item.id}>
              {" "}
              <span
                style={{ fontSize: 10, fontWeight: "bold", marginRight: 5 }}
              >
                comment:
              </span>{" "}
              {item.comm}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Post;