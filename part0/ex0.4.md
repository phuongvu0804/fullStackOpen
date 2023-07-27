sequenceDiagram
    participant browser
    participant server

    browser->>server: POST "https://studies.cs.helsinki.fi/exampleapp/new_note"
    activate server
    server-->>browser: status code 302 REDIRECT
    deactivate server

    browser->>server: GET "https://studies.cs.helsinki.fi/exampleapp/notes"
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET "https://studies.cs.helsinki.fi/exampleapp/main.css"
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET "https://studies.cs.helsinki.fi/exampleapp/main.js"
    activate server
    server-->>browser: Javascript file
    deactivate server

    browser->>server: GET "https://studies.cs.helsinki.fi/exampleapp/data.json"
    activate server
    server-->>browser: JSON data
    Note over browser,server: The browser executes the callback function that renders the note
    deactivate server