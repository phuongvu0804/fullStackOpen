sequenceDiagram
    participant browser
    participant server

    browser->>server: GET "https://studies.cs.helsinki.fi/exampleapp/spa"
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET "https://studies.cs.helsinki.fi/exampleapp/main.css"
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET "https://studies.cs.helsinki.fi/exampleapp/spa.js"
    activate server
    server-->>browser: Javascript file
    deactivate server

    browser->>server: GET "https://studies.cs.helsinki.fi/exampleapp/data.json"
    activate server
    server-->>browser: JSON data 
    Note over browser,server: The browser executes the event handler that renders the note
    deactivate server

  
