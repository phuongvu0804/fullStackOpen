import { useEffect, useState } from "react";
import countryService from "../services/country";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name.length) {
      console.log("running useEffect");
      countryService
        .getByName(name)
        .then((country) => {
            country.found = true;

            setCountry(country);
        })
        .catch(error => {
            setCountry({
                found: false
            });
            console.log('error', error)
        })
    }
  }, [name]);

  return country;
};
