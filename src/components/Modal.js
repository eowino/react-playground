import React, { Component } from 'react';
import styled from 'react-emotion';

const ContentWrapper = styled('div')({
  padding: 15,
});

const StyledModalBody = styled('div')({
  boxShadow: '0 5px 15px rgba(0,0,0,.5)',
  borderRadius: 3,
});

class ModalHeader extends Component {
  render() {
    return <ContentWrapper {...this.props} />;
  }
}

class ModalBody extends Component {
  render() {
    return <ContentWrapper {...this.props} />;
  }
}

class ModalFooter extends Component {
  render() {
    return <ContentWrapper {...this.props} />;
  }
}

export class Modal extends Component {
  static Body = ModalBody;
  static Footer = ModalFooter;
  static Header = ModalHeader;

  render() {
    return <StyledModalBody {...this.props} role="dialog" />;
  }
}

export default Modal;
