import React, { useState } from "react";

// import api from "../../services/api";
import { setUserInfo } from "../../services/auth";
import { fakeUser, notifyError } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";
import { Input } from "antd";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      name: name,
    };

    try {
      // const response = await api.post("login", data);
      // setUserInfo(response.data);
      console.log(data)
      setUserInfo(fakeUser)
      navigate("/home")
    } catch (error) {
      setLoading(false);
      notifyError(error);
    }
  }


  return (
    <div className="flex-column flex-axis-center flex-crossaxis-center min-height-100vh">
      <span className="color-tertiary bold size-xxlarge">ZWallet</span>
      <p className="size-small">Preencha seus dados</p>
      <form
        className="padding-medium flex-column margin-bottom-small"
        onSubmit={handleSubmit}
      >
        <Input
          required
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="large"
        />
        <Input
          required
          className="margin-top-small"
          placeholder="Email"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="large"
        />
        <Input
          required
          className="margin-top-small"
          type="password"
          placeholder="Senha"
          value={password}
          size="large"
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton
          standardButton={<button className="margin-top-medium button1" type="submit">Registrar</button>}
          loadingButton={<button className="flex-row flex-crossaxis-center margin-top-medium button-tertiary-disabled" value="click" disabled>Loading...</button>}
          isLoading={loading}
        />
      </form>
      <p>Já é registrado? <Link className="underline" to="/login">Faça login!</Link></p>
    </div>
  );
}
