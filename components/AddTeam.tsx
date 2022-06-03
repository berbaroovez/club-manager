import { url } from "inspector";
import { useEffect, useState } from "react";
import { addNewTeam } from "../util/firebase";
import { ageGroups, leagues, seasons, years } from "../util/form-information";
import { LeagueURL, TeamInfo } from "../util/types";



const AddTeam = () => {
    const newLeagueURL:LeagueURL = {
        league: leagues[0],
        url: "",
    }

    const [teamName, setTeamName] = useState('Inter FC 20');
    const[season, setSeason] = useState(seasons[0]);
    //return year that matches new Date().getFullYear()
    const [seasonYear, setSeasonYear] = useState(   years.filter(year => year === new Date().getFullYear())[0]  );
    const[birthYear, setBirthYear] = useState(new Date().getFullYear());
    const [ageGroup, setAgeGroup] = useState('');
    const [coachName, setCoachName] = useState('');
    const [coachEmail, setCoachEmail] = useState('');
    const [coachPhone, setCoachPhone] = useState('');
    const [leagueURL, setLeagueURL] = useState<LeagueURL[]>([
        newLeagueURL,
    ]);


    useEffect(() => {
    
var fourDigitRegex = /^[0-9]{4}$/;

            const words = teamName.split(' ');
            for (let i = 0; i < words.length; i++) {
                const date = words[i].match(fourDigitRegex)
                if (date) {

                    console.log("found a date", date);
                    setBirthYear(parseInt(date[0]));
                    
                }
            }
        // for(words in teamName.split(" ")){
        //     if(words.match(date_regex)){
        //         setBirthYear(words);
        //     }
        // }
      
        // if(teamName.match(/^(19|20)[\d]{2,2}$/)){
        //     console.log('teamName contains a valid year');
        // }


    }, [teamName])

    const addLeagueURL = () => {
        setLeagueURL([...leagueURL, newLeagueURL]);

    }

    const removeLeagueURL = (index:number) => {
        const newLeagueURLs = [...leagueURL];
        newLeagueURLs.splice(index, 1);
        setLeagueURL(newLeagueURLs);
    }

    const handleLeagueURLChange = (index:number, event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newLeagueURLs = [...leagueURL];
            console.log(event.target.value);
        if(event.target.name === 'league'){
            newLeagueURLs[index].league = event.target.value;
        }
        else if(event.target.name === 'url'){
            newLeagueURLs[index].url = event.target.value;
        }
        setLeagueURL(newLeagueURLs);
    }

    //handle form submit
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault();
            var team =  {} as TeamInfo;
            if(birthYear !==null){
               team = {
                longName: teamName,
                season,
                seasonYear,
                birthYear,
                ageGroup,
                coach: coachName,
                coachEmail,
                coachPhone,
                leagueURLS: [...leagueURL],
        }
            }
      
    
        try {
            await addNewTeam(team);
            setTeamName('');
            setSeason('');
            setBirthYear(new Date().getFullYear());
            setAgeGroup('');
            setCoachName('');
            setCoachEmail('');
            setCoachPhone('');
            setLeagueURL([
                {
                    league: leagues[0],
                    url: ''
                }
            ]);

        }
        catch (error) {
            console.error(error);
        }
     


    }
            
           
    return (
        <div className="w-full max-w-sm mx-auto">

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="form-group mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamName">Team Name</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="teamName" placeholder="Enter team name" onChange={
                    (e) => {
                        setTeamName(e.target.value);
                    }
                } 
                 value={teamName}
                />
            </div>
            <div className="form-group mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="season">Season</label>
             
<select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  mb-2" value={season} onChange={(e)=>{
    setSeason(e.target.value);
}}>
                    {
                        seasons.map((season) => {
                            return <option key={season}>{season}</option>
                        }
                        )
                    }
                </select>
<select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " value={seasonYear} onChange={e=>{
    setSeasonYear( parseInt(e.target.value));
}}>
                    {
                        years.map((year) => {
                            return <option key={year}>{year}</option>
                        }
                        )
                    }
                </select>
            </div>
            <div className="form-group mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthYear">Birth Year</label>
                <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="birthYear" placeholder="Enter birth year" onChange={
                    (e) => {
                        setBirthYear(parseInt(e.target.value));
                    }
                }
                    value={birthYear}
                />
            </div>
            <div className="form-group mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ageGroup">Age Group</label>
                {/* <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="ageGroup" placeholder="Enter age group" onChange={
                    (e) => {
                        setAgeGroup(e.target.value);
                    }
                }
                    value={ageGroup}
                /> */}

                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" value={ageGroup} onChange={
                    e=>{
                        setAgeGroup(e.target.value);
                    }
                }>
                    {
                        ageGroups.map((ageGroup) => {
                            return <option key={ageGroup}>{ageGroup}</option>
                        }
                        )
                    }
                </select>
            </div>
            <div className="form-group mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coachName">Coach Name</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="coachName" placeholder="Enter coach name" onChange={
                    (e) => {
                        setCoachName(e.target.value);
                    }
                }
                    value={coachName}
                />
            </div>
            <div className="form-group mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coachEmail">Coach Email</label>
                <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="coachEmail" placeholder="Enter coach email" onChange={
                    (e) => {
                        setCoachEmail(e.target.value);
                    }
                }
                    value={coachEmail}
                />
            </div>
            <div className="form-group mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coachPhone">Coach Phone</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="coachPhone" placeholder="Enter coach phone" onChange={
                    (e) => {
                        setCoachPhone(e.target.value);
                    }
                }
                    value={coachPhone}
                />
            </div>
            <div className="form-group mb-4 flex flex-col gap-y-2 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leagueURL">League & URL To Schedule</label>
              
                {
                    leagueURL.map((league, index) => 

                        <div className="flex gap-x-1.5 relative">
                        <select className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight" name="league" value={league.league  }
                        
                            onChange={e => handleLeagueURLChange(index, e)}
                        >
                            {
                                leagues.map((league) => {
                                    return <option key={league}>{league}</option>
                                }
                                )
                            }
                        </select>
                          <input required type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " name="url" id="leagueURL" placeholder="Enter URL to schedule" onChange={
                            (e) => 
                                handleLeagueURLChange(index, e)
                                
                            
                        }
                            value={league.url}
                        />

                        {
                            index !== 0 && <div onClick={()=>removeLeagueURL(index) } className="text-red-300 hover:text-red-500 p-1 absolute -right-8 top-1  hover:cursor-pointer "><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg></div>
                        }
                       
                        </div>
                    )
                }
              
              <button onClick={addLeagueURL} className="bg-emerald-400 text-white  py-2 px-4 rounded  hover:cursor-pointer">Add Another Schedule</button>
            </div>
           
            <input type="submit" value="Add Team" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  hover:cursor-pointer"/>
        </form>
        </div>
    )


}

export default AddTeam;
