import axios from "axios";
export const createGuestAccount = async () => {
  const createAccount = async () => {
    try {
      const authToken = await axios.post(
        `${process.env.REACT_APP_API_URL}authentication/guest`
      );
      console.log("authToken", authToken);
      localStorage.setItem("token", authToken.data.authToken);
    } catch (e) {
      console.log(e);
    }
  };
  let token = localStorage.getItem("token");

  if (!token) {
    createAccount();
  }
};
