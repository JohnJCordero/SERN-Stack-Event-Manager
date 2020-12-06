import React, { Component } from "react";
import EventDataService from "../services/events.service";

const EventRow = props => (
    <tr>
        <td>{props.events.name}</td>
        <td>{props.events.description}</td>
        <td>{props.events.start}</td>
        <td>{props.events.end}</td>
        <td>{props.events.address}</td>
    </tr>
)

export default class Superadmin extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.refresh = this.refresh.bind(this);

        this.state = {
            searchText: "",
            events: []
        };



    }
    onChangeActive = e =>{
        this.setState({
            searchText: e.target.value
        })
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
        const t = this.state.searchText.toLowerCase()
        return ((e.name.toString().toLowerCase().indexOf(t) > -1) ||
            (e.address.toString().toLowerCase().indexOf(t) > -1) ||
            (e.description.toString().toLowerCase().indexOf(t) > -1)) &&
            (e.user == 0);
    }
    render() {
        return (
            <main className="container my-5">
                <h1 className="text-primary text-center">Super Admin </h1>


                <input
                    type="text"
                    className="form-control"
                    id="searchText"
                    required
                    value={this.state.searchText}
                    onChange={this.onChangeSearch}
                    name="searchText"
                /><br/>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col"> Name</th>
                        <th scope="col"> Description</th>
                        <th scope="col"> Start Date</th>
                        <th scope="col"> End Date</th>
                        <th scope="col"> Address </th>
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
            </main>
        );
    }
}