import {  useState } from "react";
import { Modal,Button} from "react-bootstrap";



export default function Example() {
    const [show, setShow] = useState(false);
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    return (
      <>
        <Button variant="primary" onClick={handleShow} style={{marginTop :"15px" , backgroundColor:"black", borderRadius:"20px"}}>
          Edit Product  
        </Button>



       
 
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
         
          {/* <label for="fname">First name:</label>
  <input type="text" id="fname" name="fname" value="John"><br><br>
  <label for="lname">Last name:</label>

  <input type="text" id="lname" name="lname" value="Doe"><br><br> */}

  {/* <label for ="itemname">Item Name:</label>
        <input type="text" value="Glass photo frame">

        </input>
          </div> */}
<form className="form-model" style={{margin: "50px ",width:"250px", borderRadius: "20px"}} >

<label htmlFor="fname">Item Name:</label>
  <input type="text" id="fname" name="fname"
  defaultValue="change" ></input><br></br><br></br>
<label htmlFor="fname">Price:</label>
<br></br>
  <input type="text" id="fname" name="fname"
  defaultValue="change"></input><br></br><br></br>
  <label htmlFor="fname">Category:</label>
  <input type="text" id="fname" name="fname"
  defaultValue="change"></input><br></br><br></br>







  </form>
          </Modal.Body>
          <Modal.Footer>
           
            <Button variant="primary" onClick={handleClose} style={{marginTop :"15px" , backgroundColor:"black", borderRadius:"20px"}} >Update item</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }