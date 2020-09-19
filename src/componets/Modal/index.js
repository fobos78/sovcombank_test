import React from 'react';

import './Modal.css';

function Modal({ dataModal, setModal }) {
  return (
    <>
      <div className="Modal">
        <h3>word:&nbsp;<b>{{ ...dataModal }.word}</b></h3>
&nbsp;
                <h3>fl:&nbsp;<i>{{ ...dataModal }.fl}</i></h3>
&nbsp;
                <h3 >shortdef:&nbsp;{{ ...dataModal }.shortdef}</h3>
                &nbsp;
                <h3 >uuid:&nbsp;{{ ...dataModal }.uuid}</h3>
        <button type="button" onClick={() => setModal(false)}>close</button>
      </div>
    </>
  );
}

export default Modal;
