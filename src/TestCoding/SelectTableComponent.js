import React from "react";
import APIService from '../Service/APIService'

class SelectTableComponent extends React.Component {
    state = {
        List: [],
        MasterChecked: false,
        SelectedList: [],
    }

    componentDidMount() {
        APIService.getPlan().then((res) => {
            this.setState({ List: res.data });
        });

    }


    onItemCheck(e, item) {
        let tempList = this.state.List;
        tempList.map((plan) => {
            if (plan.years + plan.semester + plan.courseId.course_id  + plan.groupId.group_id === item.years + item.semester + item.courseId.course_id  + item.groupId.group_id) {
                console.log(e.target.checked);
                plan.selected = e.target.checked;
            }
            return plan;
        });


        // Update State
        this.setState({
            List: tempList,
        });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={this.state.MasterChecked}
                                            id="mastercheck"
                                            onChange={(e) => this.onMasterCheck(e)}
                                        />
                                    </th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Website</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.List.map((plan) => {return(

                                    <tr key={plan.years + plan.semester + plan.courseId.course_id  + plan.groupId.group_id} className={plan.selected ? "selected" : ""}>
                                        <th scope="row">
                                            <input
                                                type="checkbox"
                                                checked={plan.selected}
                                                className="form-check-input"
                                                id="rowcheck{user.id}"
                                                onChange={(e) => this.onItemCheck(e, plan)}
                                            />
                                        </th>
                                        <td>{plan.years}</td>
                                        <td>{plan.semester}</td>
                                        <td>{plan.courseId.course_code}</td>
                                        <td>{plan.groupId.group_name}</td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.getSelectedRows()}
                        >
                            Get Selected Items {this.state.SelectedList.length}
                        </button>
                        <div className="row">
                            <b>All Row Items:</b>
                            <code>{JSON.stringify(this.state.List)}</code>
                        </div>
                        <div className="row">
                            <b>Selected Row Items(Click Button To Get):</b>
                            <code>{JSON.stringify(this.state.SelectedList)}</code>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectTableComponent;