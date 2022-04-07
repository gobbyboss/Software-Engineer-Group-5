import React, {Fragment, useEffect, useState} from "react";
import EditPlayer from "./EditPlayer";
import { useNavigate } from "react-router-dom";
import '../App.css';

const ScoresScreen = () => {
   
    const [players, setPlayers] = useState([]);

    const [playersGreen, setPlayersGreen] = useState([]);

    const deletePlayer = async (id, status) => {
        try{
            const deletePlayer = await fetch(`players/${id}`,{
                method: "DELETE"
            });

            setPlayers(players.filter(player => player.id !== id));
            setPlayersGreen(playersGreen.filter(player => player.id !== id));
        }catch(err){
            console.error(err.message);
        }
    }

    const getPlayers = async (player_status) => {
        try{
            const response = await fetch('/player_status/' + player_status)
            const jsonData = await response.json();

            return jsonData
        }catch(err){
            console.error(err.message);
        }
        return () => {
            console.log("component unmounted");
        }
    }

    const [dataRec, setDataRec] = useState([]);

useEffect(()=>{

    getPlayers('red').then((jsonData) => setPlayers(jsonData))
    getPlayers('green').then((jsonData) => setPlayersGreen(jsonData))
    
              
    return () => {
        
       console.log("component unmounted");
   }

}, []);  


const [showDataReceived, setShowDataReceived] = useState([]);
useEffect(()=>{
           

    var ws = new WebSocket("ws://127.0.0.1:8888/");
       
    

    ws.onopen = () => {
        console.log('Opened Connection!');
    };

        

    ws.onmessage = (event) => {
      
        setDataRec(JSON.parse(event.data)); //array1
                
        
      
        console.log(dataRec);
      
    };
        
    
    ws.onclose = () => {

        console.log('Closed Connection!');
    };
       
    return () => {
        ws.close();
   }

})


return (<Fragment>
    <br/>
    <div class="row">
    <div class="col-sm-6 bg-danger table-striped text-white table-responsive table-sm">
            <table className="table table-danger table-bordered table-curved mt-2 text-center">
        <thead>
        <tr>
        <th>Id</th>
        <th>Codename</th>
        <th>Points</th>
       
        </tr>
        </thead>
        <tbody>
        {players.map(player => (
            <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.codename}</td>
                <td>{dataRec[player.id] != null ? dataRec[player.id] : 0}</td>
            </tr>
         ))}
    </tbody>
  </table></div>

  <div class="col-sm-6 bg-success text-white table-striped table-responsive table-sm">
            <table className="table mt-2 table-bordered table-curved table-success text-center">
        <thead>
        <tr>
            <th>Id</th>
            <th>Codename</th>
            <th>Points</th>
            
        </tr>
        </thead>
        <tbody>
        {playersGreen.map(player => (
            <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.codename}</td>
                <td>{dataRec[player.id] != null ? dataRec[player.id] : 0}</td>
            </tr>
         ))}
    </tbody>
  </table></div>
   
    </div>
    
</Fragment>);
};

export default ScoresScreen;
