import React from "react";
import uuidv4 from "uuid/v4";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { action as toggleMenu } from "redux-burger-menu";
import { models, makes } from "../../../../../config/dropDownData";
import { getLocation, push } from "../../../redux/actions/router";
import { DropDown, Modal, TextBox, Icon } from "../../common";
import validation from "../../../../../services/validation";

import {
  addVehicle,
  clearVehicleError,
  getVehicle,
  getVehicleData,
  getVehicleError,
  getVehicleRequested
} from "../../../redux/actions/vehicles";

import {
  getFormValues,
  setFormValues
} from "../../../redux/actions/formValues";

class VehicleDetail extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    const { actions } = this.props;
    actions.toggleMenu(false, "left");
    actions.toggleMenu(false, "right");
    actions.setFormValues({
      vinNumber: null,
      year: null,
      make: null,
      model: null,
      color: null,
      name: null,
      mileage: null,
      showModal: false
    });
  };

  validateForm = () => {
    let isValid = true;
    const results = {};
    const { state, actions } = this.props;
    const { vinNumber, year, make, model, name, mileage } = state.formValues;

    results.nameValidation = this.validateField("name", name);
    if (!results.nameValidation.isValid) {
      isValid = false;
    }

    results.vinNumberValidation = this.validateField("vinNumber", vinNumber);
    if (!results.vinNumberValidation.isValid) {
      isValid = false;
    }

    results.makeValidation = this.validateField("make", make);
    if (!results.makeValidation.isValid) {
      isValid = false;
    }

    results.modelValidation = this.validateField("model", model);
    if (!results.modelValidation.isValid) {
      isValid = false;
    }

    results.yearValidation = this.validateField("year", year);
    if (!results.yearValidation.isValid) {
      isValid = false;
    }

    results.mileageValidation = this.validateField("mileage", mileage);
    if (!results.mileageValidation.isValid) {
      isValid = false;
    }

    actions.setFormValues(results);

    return isValid;
  };

  validateField = (fieldName, value) => {
    const results = validation.validationObject;

    switch (fieldName) {
      case "name":
        if (!value) {
          results.isValid = false;
          results.message = "Email is required.";
        }
        return results;

      case "make":
        if (!value) {
          results.isValid = false;
          results.message = "Vehicle Make is required.";
        }
        return results;

      case "model":
        if (!value) {
          results.isValid = false;
          results.message = "Vehicle Model is required.";
        }
        return results;

      case "mileage":
        return validation.validateMileage(value);

      case "year":
        if (!value) {
          results.isValid = false;
          results.message = "Vehicle Year is required.";
          return results;
        }
        return validation.validateYear(value);

      default:
        return results;
    }
  };

  handleInputChange = event => {
    const { actions } = this.props;
    const fieldValidationName = `${event.target.name}Validation`;
    const validationResults = this.validateField(
      event.target.name,
      event.target.value
    );

    actions.setFormValues({
      [event.target.name]: event.target.value,
      [fieldValidationName]: validationResults
    });
  };

  handleDropDownChange = (selectedOption, name) => {
    const { value } = selectedOption;
    const { actions } = this.props;
    const fieldValidationName = `${name}Validation`;
    const validationResults = this.validateField(name, value);

    actions.setFormValues({
      [name]: value,
      [fieldValidationName]: validationResults
    });
  };

  handleModalOkayClick = () => {
    const { actions } = this.props;
    actions.setFormValues({
      showModal: false
    });
    actions.clearAuthError();
  };

  saveAndContinue = event => {
    const { actions } = this.props;
    event.preventDefault();
  };

  // handleFormSubmit = event => {
  //   const { name, make, model, vinNumber, year, color, mileage } = this.state;

  //   event.preventDefault();
  //   if (model && make) {
  //     API.saveUserVehicle({
  //       vinNumber,
  //       year,
  //       make,
  //       model,
  //       color,
  //       name,
  //       mileage
  //     })
  //       .then(res => this.loadAddVehicle)
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    const { mode, actions, state } = this.props;
    const { requested, requestError, formValues } = state;
    const {
      vinNumber,
      year,
      make,
      model,
      color,
      name,
      mileage,
      showModal
    } = formValues;

    const errorMessages = [];

    if (requestError) {
      errorMessages.push(requestError);
    }

    return (
      <div className="page login">
        <div className="columns is-centered form-wrapper">
          <div className="column is-10-mobile is-8-tablet is-4-desktop">
            <form>
              <div className="form-header">
                <span className="form-title">{`${mode} Vehicle`}</span>
              </div>
              <div className="columns is-multiline is-centered form-content">
                <div className="column is-12">
                  <TextBox
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Vehicle Name"
                    icon={["far", "pencil-alt"]}
                    onChange={this.handleInputChange}
                    errorMessage="Name is required."
                  />
                </div>
                <div className="column is-12">
                  <TextBox
                    name="vinNumber"
                    type="text"
                    value={vinNumber}
                    icon={["fas", "hashtag"]}
                    placeholder="VIN Number"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="column is-12">
                  <DropDown
                    name="make"
                    value={make}
                    options={makes}
                    placeholder="Vehicle Make"
                    onChange={this.handleDropDownChange}
                    showValidation
                  />
                </div>
                <div className="column is-12">
                  <DropDown
                    name="model"
                    value={model}
                    options={models}
                    filter={make}
                    placeholder="Vehicle Model"
                    onChange={this.handleDropDownChange}
                    showValidation
                  />
                </div>
                <div className="column is-12">
                  <TextBox
                    type="text"
                    name="year"
                    value={year}
                    icon={["fas", "calendar-alt"]}
                    placeholder="Vehicle Year"
                    validate={this.validateRequired}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="column is-12">
                  <TextBox
                    type="text"
                    name="vehicleColor"
                    value={color}
                    placeholder="Vehicle Color"
                    icon={["fas", "paint-brush"]}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="column is-12">
                  <TextBox
                    type="text"
                    name="mileage"
                    value={mileage}
                    placeholder="Vehicle Mileage"
                    icon={["fas", "tachometer-alt"]}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="column is-12 is-clearfix button-bar">
                  <button
                    type="button"
                    disabled={requested}
                    className="button is-light is-pulled-right"
                    onClick={this.saveAndContinue}
                  >
                    <strong>Save Vehicle</strong>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Modal
          show={showModal || !!requestError}
          title="Authentication Error"
          handleModalOkayClick={this.handleModalOkayClick}
        >
          <ul>
            {errorMessages ? (
              [...new Set(errorMessages)].map(msg =>
                msg ? (
                  <li key={uuidv4()} className="error-message">
                    <div className="columns">
                      <div className="column is-1 has-text-right">
                        <Icon
                          icon={["far", "exclamation-circle"]}
                          className="has-text-danger"
                          size="s"
                        />
                      </div>
                      <div className="column is-11">{msg}</div>
                    </div>
                  </li>
                ) : null
              )
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: {
      burgerMenu: state.burgerMenu,
      formValues: getFormValues(state),
      vehicleData: getVehicleData(state),
      requestError: getVehicleError(state),
      requested: getVehicleRequested(state),
      location: getLocation(state)
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        clearVehicleError,
        addVehicle,
        getVehicle,
        push,
        setFormValues,
        toggleMenu
      },
      dispatch
    )
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehicleDetail);