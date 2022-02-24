import React, { Fragment, useState } from "react";

const InputPlayer = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [codename, setCodename] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { first_name,last_name,codename };
      //proxy is only use in development so it will be ignored in production
      //so if there is no http://localhost:5000 then by default it is going to use heroku domain
      //remember this heroku app is just our server serving the build static content and also holding the restful api

      //https://pern-player-app-demo.herokuapp.com/players
      const response = await fetch("/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Input Player</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Add Player First Name"
          className="form-control"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add Player Last Name"
          className="form-control"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add Player Codename"
          className="form-control"
          value={codename}
          onChange={(e) => setCodename(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputPlayer;
