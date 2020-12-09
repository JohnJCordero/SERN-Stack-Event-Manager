import React, { Component } from "react";
import EventDataService from '../services/events.service'
import UserDataService from '../services/user.service'
const EventRow = props => (
    <tr>
        <td>{props.events.user.username}</td>
        <td>{props.events.name}</td>
        <td>{props.events.description}</td>
        <td><a href=''>{props.events.url}</a></td>
        <td>{props.events.start}</td>
        <td>{props.events.end}</td>
        <td>{props.events.address}</td>
        <td>{props.events.city}</td>

    </tr>
)
const UsersRow = props => (
    <tr>
        <td>{props.users.username}</td>
        <td>{props.attended.map( (event) => {
            return event.name;
        }).join(', ')}</td>

    </tr>
)

export default class Superadmin extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.refresh = this.refresh.bind(this);

        this.state = {

            active:false,
            start:"",
            end:"",
            searchText: "",
            users: [],
            events: [],
            attended:[]
        };



    }

     jsonToURI(json){ return encodeURIComponent(JSON.stringify(json)); }

    listAttended(userid) {
        const data ={
            id: userid
        }
        EventDataService.listAttendedEvents(data)
            .then((res) => {

        }).catch((err) => console.log(err))

    }

    getAllAttended(){
        return new Promise((resolve,reject) => {
            UserDataService.findAll()
                .then(response => Promise.all(response.data.map(user => {
                    const data = {
                        id: user.id
                    }
                    return EventDataService.listAttendedEvents(data)
                    }))
                    .then(array => {
                        var li = [];
                        for( var i in array){
                            if(array[i].data.user.length  > 0)
                            li.push(array[i].data.user[0])
                        }
                  //      console.log(array)
                        resolve(li)
                    })
                )
        })
    }

    refresh(){

        EventDataService.findAll()
            .then(response => {
               console.log(response.data);
                this.setState({events : response.data})
            }).catch(e => {
           console.log(e);
        });

         UserDataService.findAll()
            .then(response => {
                console.log(response.data);
                this.setState({users : response.data})
            }).catch(e => {
            console.log(e);
        });

        this.getAllAttended().then(output => {
            this.setState({attended: output})
            console.log(output)
        })


    }
    onChangeStart = (e) => {
        this.setState({
            start: e.target.value
        });
    }

    onChangeEnd = (e) => {
        this.setState({
            end: e.target.value
        });
    }
    onChangeActive = e =>{
        this.setState({
            active: !this.state.active
        })
    }
    onChangeSearch = e =>{
        this.setState({
            searchText: e.target.value
        })
    }

    componentDidMount(){
        this.refresh();
    }
    search = (e) =>
    {
        const today = new Date((new Date()).toString().substring(0,15));
        const start = (this.state.start !== '') ? new Date(this.state.start)  <= new Date(e.start): true;
        const end = (this.state.end !== '') ? new Date(this.state.end)  >= new Date(e.end): true;
        const t = this.state.searchText.toLowerCase()
        const search = ((e.user.username.toString().toLowerCase().indexOf(t) > -1) ||
            (e.city.toString().toLowerCase().indexOf(t) > -1) ||
            (e.url.toString().toLowerCase().indexOf(t) > -1) ||
            (e.name.toString().toLowerCase().indexOf(t) > -1) ||
            (e.address.toString().toLowerCase().indexOf(t) > -1) ||
            (e.description.toString().toLowerCase().indexOf(t) > -1))
        const activeButton = ((this.state.active === true)? (new Date(e.start)  <= today && new Date(e.end) > today) : true)
        const dateSearch = (start && end)
        return (search && activeButton && dateSearch)

    }
    render() {
    console.log(this.state.attended)
        return (

            <main className="container my-5">

                <h1 className="text-primary text-center">Super Admin </h1>

                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitch1"
                        value = {this.state.active}
                        onChange={this.onChangeActive}
                    />
                    <label className="custom-control-label" htmlFor="customSwitch1">Active Events Only</label>
                </div>
                <input
                    type="text"
                    className="form-control"
                    id="searchText"
                    required
                    value={this.state.searchText}
                    onChange={this.onChangeSearch}
                    name="searchText"
                /><br/>

                <div className="form-group">
                    <label htmlFor="start">Event Start Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="start"
                        value={this.state.start}
                        onChange={this.onChangeStart}
                        name="start"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end">Event End Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="end"
                        value={this.state.end}
                        onChange={this.onChangeEnd}
                        name="end"
                    />
                </div>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col"> Owner </th>
                        <th scope="col"> Name</th>
                        <th scope="col"> Description</th>
                        <th scope="col"> URL</th>
                        <th scope="col"> Start Date</th>
                        <th scope="col"> End Date</th>
                        <th scope="col"> Address </th>
                        <th scope="col"> City </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.events.filter(this.search).map(events => {
                        return (

                            <EventRow key={events.id} events = {events}/>
                        );
                    })}
                    </tbody>
                </table>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col"> User </th>
                        <th scope="col"> Attended Events</th>

                    </tr>
                    </thead>
                    <tbody>

                    {

                        this.state.attended.map((user) => {
                        return (

                            <UsersRow key={user.id} users = {user} attended = {user.attendedEvents}/>
                        );
                    })}
                    </tbody>
                </table>
            </main>
        );
    }
}