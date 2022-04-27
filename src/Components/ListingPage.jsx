import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { loginAuthenticated } from "../Redux/Login/action";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Div = styled.div`
  .background {
    width: 100%;
    height: 400px;
    background-image: url(https://media.istockphoto.com/photos/christmas-dogs-and-cats-over-white-web-header-picture-id1085114580?k=20&m=1085114580&s=612x612&w=0&h=I168HiLBk03-mx7B9JpJBDl-I2nV2-A0lrUu5zGB5hU=);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .items {
    display: flex;
    width: 80%;
    margin: auto;
    justify-content: space-between;
    margin-top: 40px;
  }
  .book_now {
    background-color: white;
    width: 30%;
    height: 250px;
    box-sizing: border-box;
    padding: 30px;
    text-align: center;
    border-radius: 8px;
    button {
      background-color: blue;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 8px 20px;
      font-size: 20px;
      cursor: pointer;
    }
    h4 {
      font-size: 24px;
    }
  }
  .details {
    background-color: white;
    width: 60%;
    margin: auto;
    box-sizing: border-box;
    padding: 50px;
    text-align: center;
    border-radius: 8px;
  }
`;
export const ListingPage = () => {
  const [data, setData] = useState({});
  const { token, isAuthenticated } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loginAuthenticated());
  }, [dispatch]);

  useEffect(() => {
    findData();
  }, []);
  const findData = () => {
    fetch(`https://pet-boarding-server.herokuapp.com/listing/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData({ ...res.pet });
      })
      .catch((error) => console.log(error));
  };

  const handleBook = () => {
    token != "" ? navigate("/pets/create") : navigate("/login");
  };

  return (
    <Div>
      <Navbar />
      <div className="background"></div>
      <div className="items">
        <div className="details">
          <h1>About Wiggle Bubble Pets Services</h1>
          <h3>Summery</h3>
          <p>{data.summary}</p>
          <h3>Number of pets that will be watched at one time: 8</h3>
          <h2>City : {data.city}</h2>
          <h2>Capacity : {data.capacity}</h2>

          <h3>Accepted Pet Types</h3>
          <p>Dog, Cats Rabbits</p>
          <h3>Accepted Pet size</h3>
          <p>1-5kg, 5-10kg, 10-20kg, 20-40kg, 40kg+</p>
          <h3>Level of adult supervision.</h3>
          <p>Pets will never be left unattended</p>
          <h3>
            The place your pet will be if they are left unsupervised at home.
          </h3>
          <p>Free roam of the house</p>
          <h3>The place your pet will sleep at night.</h3>
          <p>Wherever they want</p>
          <h3>The number of potty breaks provided per day.</h3>
          <p>Full access outside</p>
          <h3>The number of walks provided per day : 22</h3>

          <h3>The type of home I stay in : House</h3>

          <h3>My outdoor area size : Large</h3>
          <h3>Emergency transport : Yes</h3>
        </div>
        <div className="book_now">
          <h4>Book And Care Your Pets</h4>
          <button onClick={handleBook}>Book Now</button>
        </div>
      </div>
      <Footer />
    </Div>
  );
};
