import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { submitStep1, submitStep2 } from './_actions';

const schemaValidation1 = yup.object().shape({
  email: yup
    .string()
    .email('invalid_email')
    .required('required'),
  mobile: yup.string().required('required')
});

const schemaValidation2 = yup.object().shape({
  digit1: yup
    .number()
    .min(0)
    .max(9)
    .required('required'),
  digit2: yup.string().required('required'),
  digit3: yup.string().required('required'),
  digit4: yup.string().required('required')
});

class Untrust extends Component {
  constructor() {
    super();

    this.state = { step: 1, email: '', mobile: '' };
  }

  handleSubmit(formData) {
    if (this.state.step == 1) {
      this.props.submitStep1(formData).then(response => {
        if (response)
          if (response.success) {
            this.setState({ step: 2, email: formData.email, mobile: formData.mobile });
          }
      });
    } else if (this.state.step == 2) {
      let code =
        formData.digit1.toString() +
        formData.digit2.toString() +
        formData.digit3.toString() +
        formData.digit4.toString();

      this.props.submitStep2(code, this.state.email, this.state.mobile).then(response => {
        if (response)
          if (response.success) {
            this.setState({ step: 3 });
          }
      });
    }
  }

  handleKeyUp(e) {
    e.target.nextSibling.focus();
  }

  render() {
    return (
      <div className="untrust-wrapper d-flex align-items-center justify-content-center">
        <div
          className={
            'form-wrapper ' +
            (this.state.step == 1 ? 'form-1' : this.state.step == 2 ? 'form-2' : 'form-3')
          }
        >
          {this.state.step <= 2 && <h1>Untrust your devices</h1>}
          {this.state.step == 1 && (
            <Fragment>
              <p>
                If you believe that your devices might be compromised, fill in the fields <br /> you
                assigned in your account and untrust any existing trusted device.
              </p>
              <Formik
                initialValues={{ email: '', mobile: '' }}
                validationSchema={schemaValidation1}
                onSubmit={values => {
                  this.handleSubmit(values);
                }}
                render={({ handleChange, values, touched, errors, isValid }) => (
                  <Form>
                    <div className="form-group">
                      <input
                        id="email_form_input"
                        className="form-control"
                        type="email"
                        value={values.email}
                        label="Email"
                        name="email"
                        placeholder="Fill in your email"
                        onChange={handleChange}
                        touched={touched.email ? touched.email.toString() : 'false'}
                        error={errors.email}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="mobile_form_input"
                        className="form-control"
                        type="text"
                        value={values.mobile}
                        label="Mobile"
                        name="mobile"
                        placeholder="Your mobile number associated with your account"
                        onChange={handleChange}
                        touched={touched.mobile ? touched.mobile.toString() : 'false'}
                        error={errors.mobile}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary px-4" disabled={!isValid}>
                        Send Verification Pin
                      </button>
                    </div>
                  </Form>
                )}
              />
            </Fragment>
          )}
          {this.state.step == 2 && (
            <Fragment>
              <p>Fill in the verification code you recieved in your email</p>
              <Formik
                initialValues={{ digit1: '', digit2: '', digit3: '', digit4: '' }}
                validationSchema={schemaValidation2}
                onSubmit={values => {
                  this.handleSubmit(values);
                }}
                render={({ handleChange, values, touched, errors, isValid }) => (
                  <Form>
                    <div className="form-group">
                      <input
                        id="digit1_form_input"
                        className={'form-control' + (values.digit1 === '' ? ' empty' : '')}
                        type="text"
                        maxLength="1"
                        value={values.digit1}
                        label="Digit1"
                        name="digit1"
                        onChange={handleChange}
                        onKeyUp={this.handleKeyUp}
                        touched={touched.digit1 ? touched.digit1.toString() : 'false'}
                        error={errors.digit1}
                      />
                      <input
                        id="digit2_form_input"
                        className={'form-control' + (values.digit2 === '' ? ' empty' : '')}
                        type="text"
                        maxLength="1"
                        value={values.digit2}
                        label="Digit2"
                        name="digit2"
                        onChange={handleChange}
                        onKeyUp={this.handleKeyUp}
                        touched={touched.digit2 ? touched.digit2.toString() : 'false'}
                        error={errors.digit2}
                      />
                      <input
                        id="digit3_form_input"
                        className={'form-control' + (values.digit3 === '' ? ' empty' : '')}
                        type="text"
                        maxLength="1"
                        value={values.digit3}
                        label="Digit3"
                        name="digit3"
                        onChange={handleChange}
                        onKeyUp={this.handleKeyUp}
                        touched={touched.digit3 ? touched.digit3.toString() : 'false'}
                        error={errors.digit3}
                      />
                      <input
                        id="digit4_form_input"
                        className={'form-control' + (values.digit4 === '' ? ' empty' : '')}
                        type="text"
                        maxLength="1"
                        value={values.digit4}
                        label="Digit4"
                        name="digit4"
                        onChange={handleChange}
                        touched={touched.digit4 ? touched.digit4.toString() : 'false'}
                        error={errors.digit4}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary px-4" disabled={!isValid}>
                        Untrust Devices
                      </button>
                    </div>
                  </Form>
                )}
              />
            </Fragment>
          )}
          {this.state.step == 3 && (
            <Fragment>
              <h1>Successfully untrusted devices</h1>
              <p>
                All your trusted devices in the associated account have been untrusted.<br /> If
                your email was also logged in inside your devices you should also keep it safe by
                changing your email password.
              </p>
              <Link to="/">
                <button className="btn btn-primary px-5">Done</button>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  submitStep1,
  submitStep2
})(Untrust);
