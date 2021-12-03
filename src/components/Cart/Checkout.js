import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const isEmpty = (value) => value.trim() === "";
const isfiveChars = (value) => value.trim().length ===6;

const Checkout = (props) => {
  const [formInputValidity, setformInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalcode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredname = nameInputRef.current.value;
    const enteredstreet = streetInputRef.current.value;
    const enteredpostal = postalInputRef.current.value;
    const enteredcity = cityInputRef.current.value;

    const enteredNameisvalid = !isEmpty(enteredname);
    const enteredStreetisvalid = !isEmpty(enteredstreet);
    const enteredpostalisvalid = isfiveChars(enteredpostal);
    const enteredcityisvalid = !isEmpty(enteredcity);

    setformInputValidity({
      name: enteredNameisvalid,
      street: enteredStreetisvalid,
      city: enteredcityisvalid,
      postalcode: enteredpostalisvalid,
    });

    const formIsvalid =
      enteredNameisvalid &&
      enteredStreetisvalid &&
      enteredpostalisvalid &&
      enteredcityisvalid;

    if (!formIsvalid) {
      return;
    }
    props.onConfirm({
        name: enteredname,
        street: enteredstreet,
        city: enteredcity,
        postalcode: enteredpostal
    });
  };
  

  const nameControlclasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlclasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;

  const postalControlclasses = `${classes.control} ${
    formInputValidity.postalcode ? "" : classes.invalid
  }`;
  const cityControlclasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlclasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Name should not be left empty.</p>}
      </div>
      <div className={streetControlclasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && 
          <p>Streetname should not be left empty.</p>
        }
      </div>
      <div className={postalControlclasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postalcode && 
          <p>Please enter a valid postal code.</p>
        }
      </div>
      <div className={cityControlclasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>City should not be left empty.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
