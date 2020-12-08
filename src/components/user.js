import React, { Component } from "react";
import EventDataService from "../services/events.service";

const EventRow = props => (
    <tr>
        <td>{props.events.name}</td>
        <td>{props.events.description}</td>
        <td>{props.events.start}</td>
        <td>{props.events.end}</td>
        <td>{props.events.address}</td>
        <td>{props.events.city}</td>
        <td>
        <input value ={'Attend'} type='button' onClick={() =>{props.attend(props.events.id,localStorage.getItem('userid'))}}/>
        </td>
        <td>
            <input value ={'Leave'} type='button' onClick={() =>{props.unattend(props.events.id,localStorage.getItem('userid'))}}/>
        </td>
    </tr>
)

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.refresh = this.refresh.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.state = {
            active: false,
            start:'',
            end:'',
            searchText: "",
            events: []
        };



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
    attend(eventId,userId)
    {
        const data = {
            eventId: eventId,
            userId: userId
        }
        EventDataService.attendEvent(data)
            .then((res) =>{

        }).catch((err) => console.log(err))
    }

    unattend(eventId,userId)
    {

        const data = {
            eventId: eventId,
            userId: userId
        }
        EventDataService.unattendEvent(data)
            .then((res) =>{

            }).catch((err) => console.log(err))
    }

    refresh(){

        EventDataService.getAll()
            .then(response => {
                console.log(response.data);
                this.setState({events : response.data})
            }).catch(e => {
                console.log(e);
            });
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
         const search = ((e.city.toString().toLowerCase().indexOf(t) > -1) ||
             (e.name.toString().toLowerCase().indexOf(t) > -1) ||
             (e.address.toString().toLowerCase().indexOf(t) > -1) ||
             (e.description.toString().toLowerCase().indexOf(t) > -1))
         const activeButton = ((this.state.active === true)? (new Date(e.start)  <= today && new Date(e.end) > today) : true)
         const dateSearch = (start && end)
         return (search && activeButton   && dateSearch)
     }
    render() {
        return (
            <main className="container my-5">
                <h1 className="text-primary text-center">Events</h1>
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
                        <th scope="col"> Name</th>
                        <th scope="col"> Description</th>
                        <th scope="col"> Start Date</th>
                        <th scope="col"> End Date</th>
                        <th scope="col"> Address </th>
                        <th scope="col"> City </th>
                        <th scope="col"> Actions </th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.events.filter(this.search).map(events => {
                            return (

                               <EventRow key={events.id}  attend = {this.attend} unattend = {this.unattend} events = {events}/>
                            );
                        })}
                    </tbody>
                </table>
            </main>
        );
    }
}