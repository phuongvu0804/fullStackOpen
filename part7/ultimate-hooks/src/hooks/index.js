import axios from "axios";
import { useEffect, useState } from "react";

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl)
            .then((response) => {
                setResources(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [baseUrl]);

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource);
        setResources(resources.concat(response.data));
    };

    const service = {
        create,
    };

    return [resources, service];
};

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
