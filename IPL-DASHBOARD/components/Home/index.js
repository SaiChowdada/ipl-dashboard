
import "./index.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Component } from "react";
import TeamCard from "../TeamCard";

class Home extends Component {
  state = {
    teamData: [],
    isLoading: true,
  };
  componentDidMount() {
    this.getTeamsList();
  }
  getTeamsList = async () => {
    const response = await fetch("https://apis.ccbp.in/ipl");
    const fetchData = await response.json();
    const updatedData = fetchData.teams.map((eachData) => {
      return {
        name: eachData.name,
        imageUrl: eachData.team_image_url,
        id: eachData.id,
      };
    });
    this.setState({ teamData: updatedData, isLoading: false });
  };

  renderTeamsList = () => {
    const { teamData } = this.state;
    return (
      <div testid="loader">
        <ul className="team-list-items">
          {teamData.map((team) => {
            return <TeamCard key={team.id} teamData={team} />;
          })}
        </ul>
      </div>
    );
  };
  renderLoader = () => {
    return (
      <div className="loader-container" testid="loader" >
        <Loader type="Rings" color="#00BFFF" height={80} width={80} />
      </div>
    );
  };
  render() {
    const { isLoading } = this.state;
    return (
      <div className="app-container" testid="loader">
        <div className="ipl-container">
          <div className="header-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
              alt="ipl logo"
            />
            <h1 className="header-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    );
  }
}

export default Home;
