import "./aboutuscss.css";
import Dropdown from "./Dropdown";
import React, { useEffect, useRef,useCallback, useState, useMemo } from 'react';
import $ from 'jquery';


import {
    Navigate,
} from "react-router-dom";

import { ClientSignUp, ClientSetProfileImage, ClientList, CreateDirectTask, GetDirectTaskList, GetTaskDetails } from "../services/clientServices.js";

//const [count, setCount] = useState(0);
// hook multiple states

// create new team ,  also show my teams
let exteam ={
    "teamid1":{
        "teamid":"teamid1",
        "teamname":"teamname",
        "teamleader":"teamleader",
        "taskid":["t1","t2","t3"],
        "teamparticipants":["p1","p2","p3"],
    },
    "teamid2": {
        "teamid": "teamid2",
        "teamname": "teamname",
        "teamleader": "teamleader",
        "taskid": ["t1", "t2", "t3"],
        "teamparticipants": ["p1", "p2", "p3"],
    },
    "teamid3": {
        "teamid": "teamid3",
        "teamname": "teamname",
        "teamleader": "teamleader",
        "taskid": ["t1", "t2", "t3"],
        "teamparticipants": ["p1", "p2", "p3"],
    },
};



function IndividualTeam(props) {

    // const [count, setCount] = useState(null); // can be used as toggle
        const isMounted = useRef(true)
        


    return (
        <div >
            <ul id="progressbara" >
                <li style={{"z-index":"5","box-shadow":"-3px -8px 11px -2px"}} className="active">
                    <div >
                        {props.teamname}
                        {/* {props.val.teamleader} */}
                    </div>
                </li>
            </ul>
        </div>
    );
}

function TeamFilter(props) {

    const [count, setCount] = useState(1); // can be used as toggle
    let teammarray = [];
    // useEffect((count) => {

    // });
    const sendRequest = useCallback(async (event) => {
        props.set(true)

    }, []) 
    Object.entries(exteam).forEach(([key, value]) => {

        teammarray.push(<IndividualTeam className teamname={key} val={value} />);
    });


    return (
        <>
        <div className="team">
                <form id="updatert" >
                    <ul id="progressbart" className="filterc">
                        <li style={{ "z-index": "4" }} onClick={sendRequest}>
                            <div id="1st">
                                CREATE A NEW TEAM
                            </div>

                        </li>
                        <li style={{ "z-index": "4" }}>

                            <div >
                                Direct task reminder
                            </div>

                        </li>

                    </ul>
                </form>
                <div class="flex-containert">

                    {(count) ? teammarray : <></>}

                </div>

        </div>


        </>

    );
}

function IndividualDirect(props) {

    // const [count, setCount] = useState(null); // can be used as toggle
    const isMounted = useRef(true)



    return (
        <div >
            <ul id="progressbara" >
                <li style={{ "z-index": "5", "box-shadow": "-3px -8px 11px -2px" }} className="active">
                    <div >
                        {props.teamname}
                        {/* {props.val.teamleader} */}
                    </div>
                </li>
            </ul>
        </div>
    );

}
function DirectFilter(props) {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(null); // can be used as toggle

    let taskarray = [];
    // useEffect((count) => {

    // });
    const sendRequest = useCallback(async (event) => {
        props.set(true)

    }, [])
    Object.entries(exteam).forEach(([key, value]) => {

        taskarray.push(<IndividualDirect className teamname={key} val={value} />);
    });

    return (
        <>
            <div className="team">
                <form id="updatert" >
                    <ul id="progressbart" className="filterc">
                        <li style={{ "z-index": "4" }} onClick={sendRequest}>
                            <div id="1st">
                                CREATE A DIRECT TASK
                            </div>

                        </li>

                    </ul>
                </form>
                <div class="flex-containert">

                    {(count) ? taskarray : <></>}

                </div>

            </div>


        </>
    );
}

function IndividualTask(props) {

    // const [count, setCount] = useState(null); // can be used as toggle
    const isMounted = useRef(true)



    return (
        <div style={
            {
                    "background-color": "#f1f1f1",
    "margin": "10px",
    "width": "19em",
                "height": "fit-content",

    "max-width": "21em",
                "font-size": "1em",

            }
        } >
           
          
                {/* <li>
                    {props.task.milestone[0]}
                </li>
                                <div style={{ "z-index": "5", "box-shadow": "-3px -8px 11px -2px" }} className="active">

                       
                       {/* Task AssignedBy{props.task.taskLeader} */}
            Task Name : {props.task.taskName}<br /> 
                MileStone1: {props.task.milestone[0]}
                <br />
                MileStone2: {props.task.milestone[1]}
                <br />
                Task By: {props.task.taskLeader}

                {/* {props.val.teamleader} */}

        
          </div>

    );

}
function TaskFilter(props) {
    const [count, setCount] = useState(true); // can be used as toggle

    let [taskarray, settaskarray] = useState([]); 
    // useEffect((count) => {

    // });
    
    const sendRequest = useCallback(async (event) => {
        props.set(true)

    }, [])
    // Object.entries(exteam).forEach(([key, value]) => {

    //     taskarray.push(<IndividualTask className teamname={key} val={value} />);
    // });
    let loaded = useMemo(() => ({
        isloaded: false,
    }), []);
    useEffect(() => {
        async function fetchData() {
            // You can await here
            // const response = await MyAPI.getData(someId);
            // ...
            let response = await GetDirectTaskList({clientid:localStorage.getItem("clientid")});
            
            if (response['status'] !== "nc") {
                // console.log(response['status'])
                response["status"].map(async (val) => {
                // console.log(val)
                let task = await GetTaskDetails({taskid:val});
                // console.log(task[0].)
                // taskarray.push(<IndividualTask teamname={task[0].teamName}  />);
                    
                    settaskarray(oldArray => [...oldArray, <IndividualTask task={task[0]} />]);
                
                // console.log(task[0])
                })

            }

        }
        if (loaded.isloaded === false) {
            fetchData();
            loaded.isloaded = true;
        }},[loaded])

    return (
        <>
            <div className="team">
                {/* <form id="updatert" >
                    <ul id="progressbart" className="filterc">
                        <li style={{ "z-index": "4" }} onClick={sendRequest}>
                            <div id="1st">
                                CREATE A DIRECT TASK
                            </div>

                        </li>

                    </ul>
                </form> */}
                <div class="flex-containert">

                    {(count) ? taskarray : <></>}

                </div>

            </div>


        </>
    );
}

function CreateTeam() {
    console.log("df")
    const [state, setState] = useState(

        {

            iswrong: true,

        }
    );
    let state1 = useMemo(() => ({
        teamId:"",
        teamName: "",
        teamLeader: "",
        taskid:[],
        teamParticipants: [],
        iswrong: false,

    }), []);
    const handleChange_acc_details = useCallback(async (event) => {

        if (event.target.name === "teamName") {
            // setState({ emailId: event.target.value });
            state1.teamName = event.target.value;

        }

    })
    const submit = useCallback(async (event) => {

        console.log("blue",state1.teamParticipants);

    })    
    let options = useState([]);
    let loaded = useMemo(() => ({
        isloaded: false,
    }), []);
    useEffect(() => {
        async function fetchData() {
            // You can await here
            // const response = await MyAPI.getData(someId);
            // ...
            const response = await ClientList();
            if (response['status']!=="nc")
            {
                response["status"].map((val) => {
                    // if (options.length!=0)
                    //     options.length = 0
                    // let i=0
                    // options.length = 0
                    // while (options.length > 0) {
                    //     options.pop();
                    // }
                    options.push({ value: val.clientid, label: val.firstname+" "+val.lastname });
                })

            }
                
        }
        if (loaded.isloaded===false)
            {
                fetchData();
                loaded.isloaded=true;
            }
        
        console.log("blue1",state1.teamParticipants);
    }, [state1.teamParticipants])



    return (

        <form id="msform" style={

            {
                "position": "absolute",
                "z-index": "3",
    "left": "0%",
}
        }>

            <fieldset>
                <h2 className="fs-title">Create your account</h2>
                <h3 className="fs-subtitle">Account Details</h3>
                <input type="text" name="teamName" placeholder="TeamName" onChange={handleChange_acc_details} />
                {/* <input id="pwd1" type="password" name="password" placeholder="TeamParticipants" onChange={handleChange_acc_details} /> */}
                <Dropdown
                    isSearchable
                    isMulti
                    placeHolder="Select..."
                    options={options}
                    updater={state1}
                    onChange={(value) => console.log(value)}
                />
                {/* <input id="pwd2" type="password" name="cpassword" placeholder="Confirm Password" style={{ border: state.iswrong ? '0.1em solid #f00' : '0.1em solid #ccc', }}onChange={handleChange_acc_details} /> */}
                <button id="sub" type="button" name="submit" className="save" onClick={submit} >Submit</button>

            </fieldset>

        </form>
    )
}
function CreateDirect() {
    console.log("df")
    const [state, setState] = useState(

        {

            iswrong: true,

        }
    );
    let state1 = useMemo(() => ({
        taskId: "",
        taskName: "",
        taskLeader: "",
        milestone: [],
        milestone1:"",
        milestone2:"",
        teamParticipants: [],
        iswrong: false,

    }), []);
    const handleChange_acc_details = useCallback(async (event) => {

        if (event.target.name === "taskName") {
            // setState({ emailId: event.target.value });
            state1.taskName = event.target.value;

        }
        if (event.target.name === "milestone1") {
            // setState({ emailId: event.target.value });
            state1.milestone1 = event.target.value;

        }
        if (event.target.name === "milestone2") {
            // setState({ emailId: event.target.value });
            state1.milestone2 = event.target.value;

        }

    })
    const submit = useCallback(async (event) => {
        state1.milestone=[state1.milestone1,state1.milestone2]
        let submitval = await CreateDirectTask(state1);

        console.log("red", state1.teamParticipants);

        

    })
    let options = useState([]);
    let loaded = useMemo(() => ({
        isloaded: false,
    }), []);
    useEffect(() => {
        async function fetchData() {
            // You can await here
            // const response = await MyAPI.getData(someId);
            // ...
            const response = await ClientList();
            if (response['status'] !== "nc") {
                response["status"].map((val) => {
                    // if (options.length!=0)
                    //     options.length = 0
                    // let i=0
                    // options.length = 0
                    // while (options.length > 0) {
                    //     options.pop();
                    // }
                    options.push({ value: val.clientid, label: val.firstname + " " + val.lastname });
                })

            }

        }
        if (loaded.isloaded === false) {
            fetchData();
            loaded.isloaded = true;
        }

        console.log("blue1", state1.teamParticipants);
    }, [state1.teamParticipants])



    return (

        <form id="msform" style={

            {
                "position": "absolute",
                "z-index": "3",
                "left": "0%",
            }
        }>

            <fieldset>
                <h2 className="fs-title">Create your account</h2>
                <h3 className="fs-subtitle">Account Details</h3>
                <input type="text" name="taskName" placeholder="TaskName" onChange={handleChange_acc_details} />
                <input type="text" name="milestone1" placeholder="milestone1" onChange={handleChange_acc_details} />
                <input type="text" name="milestone2" placeholder="milestone2" onChange={handleChange_acc_details} />
                {/* <input id="pwd1" type="password" name="password" placeholder="TeamParticipants" onChange={handleChange_acc_details} /> */}
                <Dropdown
                    isSearchable
                    isMulti
                    placeHolder="Participants..."
                    options={options}
                    updater={state1}
                    onChange={(value) => console.log(value)}
                />
                {/* <input id="pwd2" type="password" name="cpassword" placeholder="Confirm Password" style={{ border: state.iswrong ? '0.1em solid #f00' : '0.1em solid #ccc', }}onChange={handleChange_acc_details} /> */}
                <button id="sub" type="button" name="submit" className="save" onClick={submit} >Submit</button>

            </fieldset>

        </form>
    )
}
export const AboutUs = ()=>{


        let file = null;
        const [dmounted,setdmounted]=useState(false);
        const [blur,setblur] = useState(false);
        const [directblur,setdirectblur] = useState(false);
        const [state, setState] = useState(
            
            {
                success: false,
                restart: false,
                iswrong: false,
                imagepresent: false,
                emailId: "",
                password: "",
                cpassword: "",
                firstname: "",
                lastname: "",
                designation: "",
                phoneno: "",
                state: "",
                city: "",
                profileNote: "",
                loginup: false,
                teamfilter: true,
                taskfilter: false,
                directfilter: false,
            }
        );


    const handleChange_LoginUp = (event) =>{

        setblur(false);
        setdirectblur(false);
        // console.log("blur", blur)
        // setState({ loginup: true });

    }

    const handleChange_teamfilter = useCallback(async (event) => {
        setState({ teamfilter: true, taskfilter: false, directfilter: false });
        let team = event.target;
        team.classList.add('filtercenabler');

        $(team).parent().siblings().each(function () {
            $(this).children().first().removeClass("filtercenabler");

        });
    })

    const handleChange_directfilter = useCallback(async (event) => {
        setState({ teamfilter: false, taskfilter: false, directfilter: true });
        let direct = event.target;
        direct.classList.add('filtercenabler');
        $(direct).parent().siblings().each(function () {

            $(this).children().first().removeClass("filtercenabler")
        });
    })
    const handleChange_taskfilter = useCallback(async (event) => {
        setState({ teamfilter: false, taskfilter: true, directfilter: false });
        let task = event.target;
        task.classList.add('filtercenabler');

        $(task).parent().siblings().each(function () {

            $(this).children().first().removeClass("filtercenabler")

        });
    })

    const handleChange_personal_details = useCallback(async (event) => {


        if (event.target.name === "firstname") {
            setState({ firstname: event.target.value });
        }
        else if (event.target.name === "lastname") {
            setState({ lastname: event.target.value });

        } else if (event.target.name === "designation") {
            setState({ designation: event.target.value });
        }
        else if (event.target.name === "phoneno") {
            setState({ phoneno: event.target.value });
        }
    })
    const handleChange_location_details = useCallback(async (event) => {

        if (event.target.name === "state") {
            setState({ state: event.target.value });
        } else if (event.target.name === "city") {
            setState({ city: event.target.value });
        }
        else if (event.target.name === "profileNote") {
            setState({ profileNote: event.target.value });
        }
    })
    const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
        // eslint-disable-next-line
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });



    const handleChange_submit = useCallback(async (event) => {


        if (event.target.name === "submit") {


            ClientSignUp(state).then(
                (result) => {
                    if (result === "accepted") {
                        if (state.imagepresent) {
                            // let myImage = new Image();
                            // myImage.src = this.file;
                            let this_temp = this;

                            fetch(file).then(r => r.blob()).then(
                                (temp) => {
                                    this_temp.convertBlobToBase64(temp).then((str) => {
                                        ClientSetProfileImage(str).then(
                                            (result2) => {

                                                if (result2 === "set") {
                                                    localStorage.setItem('search', '');
                                                    temp.setState({ success: true });
                                                }
                                                else {

                                                    window.alert('Update Error');

                                                }


                                            }

                                        );
                                    });

                                });


                        }
                        else
                            setState({ success: true });
                    }
                    else {

                        window.alert('User Already exists');
                        window.location.replace("/signUp");

                    }


                }

            );

        }
    })
    const handleChange_nextclick = useCallback(async (event) => {
        let current_fs, next_fs; //fieldsets
        current_fs = event.target.parentElement;
        next_fs = event.target.parentElement.nextSibling;
        $("#progressbar li").eq($("fieldset").index($(next_fs))).addClass("active");
        $(next_fs).show();
        $(current_fs).hide();
    })
    const handleChange_previousclick = useCallback(async (event) => {
        let current_fs, previous_fs; //fieldsets
        current_fs = event.target.parentElement;
        previous_fs = event.target.parentElement.previousSibling;
        $("#progressbar li").eq($("fieldset").index($(current_fs))).removeClass("active");
        $(current_fs).hide();
        $(previous_fs).show();

    })
    const handleChange_profileupload = useCallback(async (event) => {
        // profileimg = event.target.files[0]
        file = URL.createObjectURL(event.target.files[0]);
        setState({ imagepresent: true });
    })

    useEffect(() => {
        setdmounted(true);
        
        if (!dmounted)
            {console.log("mounted")
            $('#1st').addClass("filtercenabler");
        }
    }, [dmounted]);

        return (
            <>

                {(state.success) ? <Navigate to="/AboutUs" /> : <></>}
                {(state.loginup) ? <Navigate to="/Login" /> : <></>}
                {/* {(state.restart) ? <Navigate to="/signUp" /> : <div></div>} */}

                <button style={{
                    "border-radius": "0em 0em 1em 1em",
                    "position": "absolute",
                    "top": "-1.1em",
                    "left": "83%",
                    "z-index": "1",
                    display: blur||directblur ? 'block' : 'None',

                }} id="sub" type="button" name="submit" className="save" onClick={handleChange_LoginUp}>Exit</button>

                {/* <h2 className="title">Create your account</h2> */}
                {(blur) ? <CreateTeam ></CreateTeam>:<></>}
                {(directblur)?<CreateDirect></CreateDirect>:<></>}

                <div className="AboutUs" style={{ filter: blur ? 'blur(1.2px)' : '', }}>

                    {/* style={(state.blur) ? { "filter": "blur(1.2px)" } : ""} */}
                    {/* {()?<></>:<div className="desktop"></div>} */}
                    <div className="desktop" >
                        <div className="yellow"></div>
                        <div className="orange">
                            <form id="updatera" >
                                <ul id="progressbara" >
                                    <li style={{
                                        "z-index": "5", "box-shadow": "-3px -8px 11px -2px"
                                    }} className="active">
                                        <div >
                                            Choose Filters

                                        </div>
                                    </li>
                                </ul>
                            </form>
                            <form id="updatera" >
                                <ul id="progressbara" className="filterc">
                                    <li style={{ "z-index": "4" }} >
                                        <div id="1st" onClick={handleChange_teamfilter}>
                                            Teams created by you
                                        </div>

                                    </li>
                                    <li style={{ "z-index": "4" }}>

                                        <div onClick={handleChange_directfilter}>
                                            Direct task reminder
                                        </div>

                                    </li>
                                    <li style={{ "z-index": "4" }}>

                                        <div onClick={handleChange_taskfilter}>

                                            Task assigned to you

                                        </div>

                                    </li>


                                </ul>
                            </form>

                        </div>
                        <div className="purple">

                            

                                {(state.teamfilter) ? <TeamFilter set={setblur}/> : <></>}
                                {(state.directfilter) ? <DirectFilter set={setdirectblur}></DirectFilter> : <></>}
                                {(state.taskfilter) ? <TaskFilter></TaskFilter> : <></>}

                            
                        </div>

                    </div>
                </div>

            </>

        );
}

