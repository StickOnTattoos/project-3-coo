import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Input from "../../common/Input";
// import authActions from "../../../redux/actions/auth";
import * as fromCounter from "../../../redux/actions/counter";

class AddMaintenance extends React.Component {
  constructor() {
    super();

    var AddMaintenance = React.createClass({
      getInitialState: function () {
        return {
          MaintenanceType: null,
          Month: null,
          Day: null,
          Year: null,
          Time: null
        }
      },

      handleVinInput: function (event) {

      }
    
  
    
  
    
  
    render: function () {
        return (
          <div className="addMaintenance">
            <div className="addMaintenance">
              <h1>Add a Maintenance Reminder</h1>

              <form onSubmit={this.saveAndContinue}>
                <div className="column is-12">
                  <Input
                    text="Maintenance Type"
                    ref="maintenanceType"
                    type="text"
                    defaultValue={this.state.MaintenanceType}
                    validate={this.validateMaintenanceType}
                    value={this.state.MaintenanceType}
                    onChange={this.handleMaintenanceInput}
                    emptyMessage="Message field cannot be empty"
                    errorVisible={this.state.showVinError}
                  />
                </div>

                <div className="column is-12"></div>
                <Input
                  text="Month"
                  ref="month"
                  type="text"
                  validate={this.state.validateMonth}
                  value={this.state.month}
                  onChange={this.handleMonthInput}
                  emptyMessage="Month can't be empty"
                /> 
                </div>

              <div className="column is-12">
                <Input
                  text="Day"
                  ref="day"
                  type="text"
                  validate={this.state.validatDay}
                  value={this.state.day}
                  onChange={this.handleDayInput}
                  emptyMessage="Day can't be empty"
                />
              </div>

              <div className="column is-12">
                <Input
                  text="Year"
                  ref="year"
                  type="text"
                  validate={this.state.validateYear}
                  value={this.state.year}
                  onChange={this.handleYearInput}
                  emptyMessage="Year can't be empty"
                />
              </div>




              <button
                type="submit"
                className="button button_wide">
                Add Maintenance Reminder
              </button>
  
            </form>


          </div>
  
       
      );
<<<<<<< HEAD
    }
  
  });

}}
      
  module.exports = AddVehicle;
=======
  }

});

module.exports = AddVehicle;

>>>>>>> 450eefa719d1099d8f6865583042b44eebf0c467
