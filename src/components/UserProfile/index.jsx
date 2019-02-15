import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import ProfileAvatar from './ProfileAvatar';
import FullName from './FullName';
import UserLocation from './UserLocation';
import Education from './Education';
import SocialLinks from './SocialLinks';
import Bio from './Bio';
import MyCertificates from './MyCertificates';


class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: { value: null, visibility: null },
      userLocation: { value: null, visibility: null },
      education: { value: null, visibility: null },
      bio: { value: null, visibility: null },
      socialLinks: { value: null, visibility: null },
    };


    this.onCancel = this.onCancel.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
  }

  onCancel() {
    this.props.closeEditableField(this.props.currentlyEditingField);
  }

  onEdit(fieldName) {
    this.props.openEditableField(fieldName);
  }

  onSave(fieldName, value) {
    const userAccountData = {
      [fieldName]: value || this.state[fieldName].value,
    };
    this.props.saveUserProfile(this.props.username, userAccountData, 'Everyone', fieldName);
  }

  onChange(fieldName, value) {
    this.setState({
      [fieldName]: {
        value,
        visibility: this.state[fieldName].visibility,
      },
    });
  }
  onVisibilityChange(fieldName, visibility) {
    this.setState({
      [fieldName]: {
        value: this.state[fieldName].value,
        visibility,
      },
    });
  }

  render() {
    const {
      saveState,
      error,
      profileImage,
      username,
      fullName,
      userLocation,
      bio,
      education,
      socialLinks,
      certificates,
    } = this.props;

    const commonProps = {
      onSave: this.onSave,
      onEdit: this.onEdit,
      onCancel: this.onCancel,
      onChange: this.onChange,
      onVisibilityChange: this.onVisibilityChange,
      saveState,
      error,
    };

    const getMode = (name) => {
      if (name === this.props.currentlyEditingField) return 'editing';
      if (!this.props[name] || !this.props[name].length) return 'empty';
      return 'editable';
    };

    return (
      <div>
        <div className="bg-banner bg-program-micro-masters d-none d-md-block p-relative" />
        <Container fluid>
          <Row>
            <Col md={4} lg={3}>
              <div className="d-flex align-items-center d-md-block mt-4 mt-md-0">
                <ProfileAvatar
                  className="mb-md-3"
                  src={profileImage}
                  {...commonProps}
                />
                <div>
                  <h2 className="mb-0">{username}</h2>
                  <p className="mb-0">Member since 2017</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ order: 2 }} md={{ size: 4, order: 1 }} lg={3} className="mt-md-4">

              <FullName
                fullName={fullName}
                editMode={getMode('fullName')}
                {...commonProps}
              />

              <UserLocation
                userLocation={userLocation}
                editMode={getMode('userLocation')}
                {...commonProps}
              />

              <Education
                education={education}
                editMode={getMode('education')}
                {...commonProps}
              />

              <SocialLinks
                socialLinks={socialLinks}
                editMode={getMode('socialLinks')}
                {...commonProps}
              />

            </Col>
            <Col xs={{ order: 1 }} md={{ size: 8, order: 2 }} lg={{ size: 8, offset: 1 }} className="mt-4 mt-md-n5">

              <Bio
                bio={bio}
                editMode={getMode('bio')}
                {...commonProps}
              />

              <MyCertificates
                certificates={certificates}
                editMode={getMode('certificates')}
                {...commonProps}
              />

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserProfile;

UserProfile.propTypes = {
  currentlyEditingField: PropTypes.string,
  saveState: PropTypes.oneOf([null, 'pending', 'complete', 'error']),
  error: PropTypes.string,
  profileImage: PropTypes.string,
  fullName: PropTypes.string,
  username: PropTypes.string,
  userLocation: PropTypes.string,
  education: PropTypes.string,
  socialLinks: PropTypes.arrayOf(PropTypes.shape({
    platform: PropTypes.string,
    socialLink: PropTypes.string,
  })),
  aboutMe: PropTypes.string,
  bio: PropTypes.string,
  certificates: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })),
  saveUserProfile: PropTypes.func,
  openEditableField: PropTypes.func.isRequired,
  closeEditableField: PropTypes.func.isRequired,
};

UserProfile.defaultProps = {
  currentlyEditingField: null,
  saveState: null,
  error: null,
  profileImage: null,
  fullName: null,
  username: null,
  userLocation: null,
  education: null,
  socialLinks: [],
  aboutMe: null,
  bio: null,
  certificates: null,
  saveUserProfile: null,
};
