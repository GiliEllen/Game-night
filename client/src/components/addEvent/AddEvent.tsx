import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import Calendar from "../calender/ReactCalender";
import { useState, useEffect } from "react";
import { GameModel } from "../../views/myGames/MyGames";
import axios from "axios";
import { login } from "./../../features/loggedInUser/userAPI";
import { useAppDispatch } from "./../../app/hooks";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddEventProps {
  setEvents: CallableFunction;
}

export const AddEvent: FC<AddEventProps> = ({ setEvents }) => {
  useEffect(() => {
    dispatch(login());
    getUserGames();
  }, []);
  const loggedInUser = useAppSelector(userSelector);
  const [games, setGames] = useState<GameModel[]>([]);
  const [date, setDate] = useState(new Date());
  const dispatch = useAppDispatch();
  const [addedevent, setAddedEvent] = useState<boolean>(false);
  const navigate = useNavigate();

  async function getUserGames() {
    try {
      const { data } = await axios.post("/api/games/find-game-by-user", {
        loggedInUser,
      });
      if (!data) throw new Error("no data from serever");
      const { results } = data;
      setGames(results);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddEvent(ev: any) {
    try {
      ev.preventDefault();
      const eventDateDay = date.getDate();
      const eventDateMonth = date.getMonth() + 1;
      const eventDateYear = date.getFullYear();
      //@ts-ignore
      const userId = loggedInUser?._id;
      const eventTime = ev.target.eventTime.value;
      const eventLocationCity = ev.target.location.value;
      const eventLocationAddress = ev.target.address.value;
      const eventSpots = ev.target.spots.value;
      const SelectedGameId = ev.target.elements.gamesList.value;

      const { data } = await axios.post("/api/game-nights/add-event", {
        eventDateDay,
        eventDateMonth,
        eventDateYear,
        eventTime,
        eventLocationCity,
        eventLocationAddress,
        eventSpots,
        SelectedGameId,
        userId,
      });
      const { results } = data;
      setEvents((prev: any) => [...prev, results]);

      toast("Event Added successfully!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="add_event">
      <form onSubmit={handleAddEvent}>
        <Calendar setDate={setDate} date={date} />
        <input type="time" name="eventTime" />
        <input
          type="text"
          name="location"
          placeholder="Enter Game Location City"
        />
        <input
          type="text"
          name="address"
          placeholder="Enter Game Location Address"
        />
        <input type="number" name="spots" placeholder="Enter Avilable Spots" />
        <label htmlFor="gamesList">Choose from your games:</label>
        <select className="select" name="gamesList">
          {games.map((game, idx) => {
            return (
              //@ts-ignore
              <option className="options" key={idx} value={game.gameId._id}>
                {/*//@ts-ignore*/}
                {game.gameId.gameName}
              </option>
            );
          })}
        </select>
        <button className="button_main" type="submit">
          Add Event
        </button>
        {addedevent && <p className="good">Event Added Successfully!</p>}
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
